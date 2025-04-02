/*
 * 炫图ai画图
 * 解锁ai功能 无限制
 * 2025-04-02 
 * 
 获取会员token ：我这里用的匹配URL 自动完成注册逻辑
 也可以使用Cron定时任务获取 自行配置选择

[rewrite_local]
# 个人中心 
^https:\/\/xuantu\.pro\/user\/getUserInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/xt3.js
# 会员
^https:\/\/xuantu\.pro\/(creation\/(generate\/(v2|v3)|memberships|getProgress|imageintent)|file\/aliyun\/sts)\/? url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/xt2.js
# 获取会员token 
^https:\/\/xuantu\.pro\/creation\/myworks url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/xt.js
# 无水印
^http://statica\.xuantu\.pro/x/prod/ReplaceBackgroundWithPrompt/(\d+-\d+)\.jpg\?.* url 302 http://statica.xuantu.pro/x/prod/ReplaceBackgroundWithPrompt/$1.jpg
[mitm]
hostname = xuantu.pro, statica.xuantu.pro
*/
const a = new Env("炫图生成Token");
const b = "xuantu_tokens";
const c = "xuantu_current_index";
// 不喜欢日志自己改
(async () => {
  a.log(`\n🔔${a.name}, 开始!`);
  a.setdata("[]", b);
  a.setdata("0", c);
  a.log(`🧹 已清空之前保存的所有Token`);
  const d = e().toUpperCase();
  a.log("🆔 设备ID：" + d);
  
  try {
    const f = await g();
    if (!f) {
      return a.log("❌ 获取临时邮箱失败"), a.done();
    }
    
    const h = f.email;
    const i = f.sessionId;
    a.log(`📧 临时邮箱: ${h}`);
    a.log(`🔑 邮箱Token: ${i.substring(0, 15)}...`);
    
    const j = await k(h, d);
    if (!j) {
      return a.log("❌ 发送验证码失败"), a.done();
    }
    a.log("📤 验证码发送成功，等待 5 秒后检查邮箱...");
    
    await a.wait(5000);
    
    let l = null;
    for (let m = 0; m < 8; m++) {
      a.log(`📨 第 ${m+1} 次检查邮箱...`);
      l = await n(i);
      if (l) {
        a.log(`🎯 成功提取验证码: ${l}`);
        break;
      } else {
        a.log(`⏳ 未收到邮件或未找到验证码`);
      }
      a.log(`⏳ 等待 5 秒后重试 (${m+1}/8)...`);
      await a.wait(5000);
    }
    
    if (!l) {
      return a.log("❌ 未能获取验证码"), a.done();
    }
    a.log(`🔑 获取到验证码: ${l}`);
    
    const o = await p(h, l, d);
    if (!o || !o.token) {
      return a.log("❌ 登录失败"), a.done();
    }
    
    await q(o.token);
    a.log(`✅ 登录成功，Token已保存: ${o.token.substring(0, 15)}...`);
    
  } catch (r) {
    a.log(`❌ 错误: ${r.message || r}`);
  }
  
  a.done();
})();

async function q(s) {
  const t = [s];
  a.setdata(JSON.stringify(t), b);
  a.setdata(s, "xuantu_current_token");
  a.log(`✅ Token已更新: ${s.substring(0, 15)}...`);
  return true;
}

async function g() {
  try {
    a.log(`🌐 请求临时邮箱...`);
    const u = await a.http.post({
      url: "https://api.evapmail.com/v1/accounts/create",
      headers: {
        "user-agent": "Dart/3.7 (dart:io)",
        "accept-encoding": "gzip",
        "em-subscriber-id": "$RCAnonymousID:c6c7b7d107034590bf95e0ad80a13b37",
        "host": "api.evapmail.com",
        "em-client-id": "c1dfa090-6c00-4661-bfe1-c51bc99ccbdb",
        "em-client-type": "mobile",
        "content-type": "application/json",
        "em-client-version": "1.3.2"
      },
      body: JSON.stringify({
        "expirationMinutes": 60
      })
    });
    
    a.log(`📝 邮箱API响应状态: ${u.statusCode}`);
    
    const v = JSON.parse(u.body);
    a.log(`📝 临时邮箱: ${v.email || "未找到"}`);
    
    if (!v.email || !v.token) {
      a.log(`❌ 邮箱信息不完整`);
      return null;
    }
    
    return {
      email: v.email,
      sessionId: v.token
    };
  } catch (w) {
    a.log(`❌ 获取临时邮箱错误: ${w.message || w}`);
    return null;
  }
}

async function k(h, d) {
  try {
    const x = await a.http.post({
      url: "https://xuantu.pro/account/sendCode",
      headers: {
        'user-agent': 'Dart/3.4 (dart:io)',
        'xt-mobile-brand': 'iPhone',
        'xt-lang-tag': 'zh',
        'accept-encoding': 'gzip',
        'content-type': 'application/json',
        'xt-device-id': d,
        'xt-app-build': '1045010',
        'xt-region-code': 'HK',
        'host': 'xuantu.pro',
        'xt-platform': 'ios',
        'xt-platform-version': 'Version 18.4 (Build 22E240)',
        'xt-flavor': 'null',
        'xt-app-version': '1.4.50',
        'xt-um-id': 'null'
      },
      body: JSON.stringify({
        "email": h
      })
    });
    
    a.log(`📤 验证码发送响应: ${x.statusCode}`);
    return x.statusCode === 200;
  } catch (y) {
    a.log(`❌ 发送验证码错误: ${y.message}`);
    return false;
  }
}

async function n(i) {
  try {
    const z = await a.http.get({
      url: "https://api.evapmail.com/v1/messages/inbox",
      headers: {
        "user-agent": "Dart/3.7 (dart:io)",
        "accept-encoding": "gzip",
        "em-subscriber-id": "$RCAnonymousID:c6c7b7d107034590bf95e0ad80a13b37",
        "host": "api.evapmail.com",
        "authorization": `Bearer ${i}`,
        "em-client-id": "c1dfa090-6c00-4661-bfe1-c51bc99ccbdb",
        "em-client-type": "mobile",
        "em-client-version": "1.3.2"
      }
    });
    
    const aa = JSON.parse(z.body) || [];
    a.log(`📬 收到 ${aa.length} 封邮件`);
    
    for (const ab of aa) {
      if (ab.subject && ab.subject.includes("verification code")) {
        a.log(`📬 找到验证码邮件: ${ab.subject} (ID: ${ab.id})`);
        
        if (ab.intro) {
          const ac = ab.intro.match(/code is (\d+)/);
          if (ac && ac[1]) {
            return ac[1];
          }
        }
      }
    }
    
    return null;
  } catch (ad) {
    a.log(`❌ 检查邮件错误: ${ad.message}`);
    return null;
  }
}

async function p(h, l, d) {
  try {
    const ae = "----dio-boundary-" + Math.random().toString().substr(2, 12);
    
    let af = `--${ae}\r\n`;
    af += `content-disposition: form-data; name="email"\r\n\r\n`;
    af += `${h}\r\n`;
    af += `--${ae}\r\n`;
    af += `content-disposition: form-data; name="code"\r\n\r\n`;
    af += `${l}\r\n`;
    af += `--${ae}--\r\n`;
    
    a.log(`🔐 尝试登录: ${h}, 验证码: ${l}`);
    
    const ag = await a.http.post({
      url: "https://xuantu.pro/account/login",
      headers: {
        'user-agent': 'Dart/3.4 (dart:io)',
        'xt-mobile-brand': 'iPhone',
        'xt-lang-tag': 'zh',
        'accept-encoding': 'gzip',
        'content-type': `multipart/form-data; boundary=${ae}`,
        'xt-device-id': d,
        'xt-app-build': '1045010',
        'xt-region-code': 'HK',
        'host': 'xuantu.pro',
        'xt-platform': 'ios',
        'xt-platform-version': 'Version 18.4 (Build 22E240)',
        'xt-flavor': 'null',
        'xt-app-version': '1.4.50',
        'xt-um-id': 'null'
      },
      body: af
    });
    
    a.log(`🔓 登录响应状态: ${ag.statusCode}`);
    
    const ah = JSON.parse(ag.body);
    
    if (ah.code === 0) {
      return { token: ah.data };
    }
    return null;
  } catch (ai) {
    a.log(`❌ 登录错误: ${ai.message}`);
    return null;
  }
}

function e() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (aj) {
    const ak = Math.random() * 16 | 0,
          al = aj === 'x' ? ak : (ak & 0x3 | 0x8);
    return al.toString(16);
  });
}


// 通用 Env 
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,a)=>{s.call(this,t,(t,s,r)=>{t?a(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const a=this.getdata(t);if(a)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,a)=>e(a))})}runScript(t,e){return new Promise(s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[i,o]=a.split("@"),n={url:`http://${o}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":i,Accept:"*/*"},timeout:r};this.post(n,(t,e,a)=>s(a))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):a?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of a)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,r]=/^@(.*?)\.(.*?)$/.exec(e),i=this.getval(a),o=a?"null"===i?null:i||"{}":"{}";try{const e=JSON.parse(o);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),a)}catch(e){const i={};this.lodash_set(i,r,t),s=this.setval(JSON.stringify(i),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:a,statusCode:r,headers:i,rawBody:o}=t,n=s.decode(o,this.encoding);e(null,{status:a,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:a,response:r}=t;e(a,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)});break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:a,headers:r,body:i,bodyBytes:o}=t;e(null,{status:s,statusCode:a,headers:r,body:i,bodyBytes:o},i,o)},t=>e(t&&t.error||"UndefinedError"));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:r,...i}=t;this.got[s](r,i).then(t=>{const{statusCode:s,statusCode:r,headers:i,rawBody:o}=t,n=a.decode(o,this.encoding);e(null,{status:s,statusCode:r,headers:i,rawBody:o,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&a.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}queryStr(t){let e="";for(const s in t){let a=t[s];null!=a&&""!==a&&("object"==typeof a&&(a=JSON.stringify(a)),e+=`${s}=${a}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",a="",r){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{let e=t.url||t.openUrl||t["open-url"];return{url:e}}case"Loon":{let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}case"Quantumult X":{let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,a=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":a}}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,a,i(r));break;case"Quantumult X":$notify(e,s,a,i(r));break;case"Node.js":}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),a&&t.push(a),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}

