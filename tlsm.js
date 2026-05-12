/*
 套路SM (tlsm.one) VIP 解锁
 @Yu9191  2026-05-12


[rewrite_local]
^https?:\/\/(?:www\.)?tlsm\.one\/v\/\d+(?:[\/?#]|$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/tlsm.js
^https?:\/\/(?:www\.)?itaolu\.com\/v\/\d+(?:[\/?#]|$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/tlsm.js

[mitm]
hostname = tlsm.one, www.tlsm.one, itaolu.com, www.itaolu.com
*/

const $ = new Env("套路SM");

!(async () => {
  const url = $request.url || "";
  const m = url.match(/\/v\/(\d+)/);
  if (!m) return $.done({ body: $response.body });

  const vid = m[1];
  const body = $response.body || "";
  const host = url.match(/^(https?:\/\/[^/]+)/)?.[1] || "https://tlsm.one";

  const titleM = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const vodName = (titleM ? titleM[1] : `视频 ${vid}`).replace(/<[^>]+>/g, "").trim();

  let videoUrl = "";
  try {
    const resp = await $.http.get({
      url: `${host}/download/${vid}`,
      headers: { "User-Agent": "Mozilla/5.0", Referer: `${host}/v/${vid}` },
      opts: { redirection: false },
      timeout: 10000,
    });
    const loc = (resp.headers && (resp.headers.Location || resp.headers.location)) || "";
    if (loc && /\.mp4/.test(loc)) videoUrl = loc.split("?")[0];
  } catch (e) {
    $.log(`download 接口失败: ${e && e.message || e}`);
  }

  if (!videoUrl) {
    $.log(`未拿到完整视频 vid=${vid}`);
    return $.done({ body });
  }

  const fileName = vodName.replace(/[<>:"\/\\|?*]/g, "") + ".mp4";
  const senUrl = `SenPlayer://x-callback-url/download?url=${encodeURIComponent(videoUrl)}&name=${encodeURIComponent(fileName)}`;

  $.log(`注入 vid=${vid} → ${videoUrl.slice(0, 80)}`);

  const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>${vodName}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:-apple-system,system-ui,sans-serif}
.wrap{max-width:960px;margin:0 auto}
.title{font-size:15px;font-weight:600;padding:10px 12px;background:#111}
video{width:100%;max-height:calc(100vw * 9 / 16);background:#000;display:block}
.bar{display:flex;gap:8px;padding:10px 12px;flex-wrap:wrap;background:#111}
.btn{display:inline-block;padding:8px 16px;border-radius:6px;
     font-size:13px;font-weight:500;text-decoration:none;color:#fff;border:none;cursor:pointer}
.btn-sen{background:#007AFF}
.btn-copy{background:#34C759}
.btn-open{background:#FF9500}
.info{color:#666;font-size:11px;padding:4px 12px;background:#111}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);
       color:#fff;padding:8px 24px;border-radius:20px;font-size:13px;opacity:0;transition:opacity .3s;z-index:9999}
.toast.on{opacity:1}
</style>
</head><body>
<div class="wrap">
  <div class="title">${vodName}</div>
  <video src="${videoUrl}" controls playsinline webkit-playsinline preload="auto"></video>
  <div class="bar">
    <a class="btn btn-sen" href="${senUrl}">SenPlayer 下载</a>
    <button class="btn btn-copy" id="copyBtn">复制链接</button>
    <a class="btn btn-open" href="${videoUrl}" target="_blank">直链播放</a>
  </div>
  <div class="info">${vodName} | vid:${vid}</div>
</div>
<div class="toast" id="toast"></div>
<script>
document.getElementById("copyBtn").onclick=function(){
  var u="${videoUrl}";
  if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){tt("已复制")}).catch(function(){fb(u)})}else{fb(u)}
};
function fb(u){var a=document.createElement("textarea");a.value=u;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();tt("已复制")}
function tt(m){var e=document.getElementById("toast");e.textContent=m;e.classList.add("on");setTimeout(function(){e.classList.remove("on")},1500)}
<\/script>
</body></html>`;

  $.done({ body: html });
})().catch(e => { $.logErr(e); $.done({}); });

function Env(e,t){class s{constructor(e){this.env=e}send(e,t="GET"){e="string"==typeof e?{url:e}:e;let s=this.get;"POST"===t&&(s=this.post);const i=new Promise((t,i)=>{s.call(this,e,(e,s,o)=>{e?i(e):t(s)})});return e.timeout?((e,t=1e3)=>Promise.race([e,new Promise((e,s)=>{setTimeout(()=>{s(new Error("请求超时"))},t)})]))(i,e.timeout):i}get(e){return this.send.call(this.env,e)}post(e){return this.send.call(this.env,e,"POST")}}return new class{constructor(e,t){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=e,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof Egern?"Egern":"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}isEgern(){return"Egern"===this.getEnv()}toObj(e,t=null){try{return JSON.parse(e)}catch{return t}}toStr(e,t=null,...s){try{return JSON.stringify(e,...s)}catch{return t}}getjson(e,t){let s=t;if(this.getdata(e))try{s=JSON.parse(this.getdata(e))}catch{}return s}setjson(e,t){try{return this.setdata(JSON.stringify(e),t)}catch{return!1}}getScript(e){return new Promise(t=>{this.get({url:e},(e,s,i)=>t(i))})}runScript(e,t){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=t&&t.timeout?t.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,(e,t,i)=>s(i))}).catch(e=>this.logErr(e))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),i=!s&&this.fs.existsSync(t);if(!s&&!i)return{};{const i=s?e:t;try{return JSON.parse(this.fs.readFileSync(i))}catch(e){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),i=!s&&this.fs.existsSync(t),o=JSON.stringify(this.data);s?this.fs.writeFileSync(e,o):i?this.fs.writeFileSync(t,o):this.fs.writeFileSync(e,o)}}lodash_get(e,t,s){const i=t.replace(/\[(\d+)\]/g,".$1").split(".");let o=e;for(const e of i)if(o=Object(o)[e],void 0===o)return s;return o}lodash_set(e,t,s){return Object(e)!==e?e:(Array.isArray(t)||(t=t.toString().match(/[^.[\]]+/g)||[]),t.slice(0,-1).reduce((e,s,i)=>Object(e[s])===e[s]?e[s]:e[s]=Math.abs(t[i+1])>>0==+t[i+1]?[]:{},e)[t[t.length-1]]=s,e)}getdata(e){let t=this.getval(e);if(/^@/.test(e)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(e),o=s?this.getval(s):"";if(o)try{const e=JSON.parse(o);t=e?this.lodash_get(e,i,""):t}catch(e){t=""}}return t}setdata(e,t){let s=!1;if(/^@/.test(t)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(t),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const t=JSON.parse(a);this.lodash_set(t,o,e),s=this.setval(JSON.stringify(t),i)}catch(t){const r={};this.lodash_set(r,o,e),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(e,t);return s}getval(e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":return $persistentStore.read(e);case"Quantumult X":return $prefs.valueForKey(e);case"Node.js":return this.data=this.loaddata(),this.data[e];default:return this.data&&this.data[e]||null}}setval(e,t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":return $persistentStore.write(e,t);case"Quantumult X":return $prefs.setValueForKey(e,t);case"Node.js":return this.data=this.loaddata(),this.data[t]=e,this.writedata(),!0;default:return this.data&&this.data[t]||null}}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}get(e,t=(()=>{})){switch(e.headers&&(delete e.headers["Content-Type"],delete e.headers["Content-Length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":default:this.isSurge()&&this.isNeedRewrite&&(e.headers=e.headers||{},Object.assign(e.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(e,(e,s,i)=>{!e&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,i)});break;case"Quantumult X":this.isNeedRewrite&&(e.opts=e.opts||{},Object.assign(e.opts,{hints:!1})),$task.fetch(e).then(e=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=e;t(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)},e=>t(e&&e.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(e),this.got(e).on("redirect",(e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}}).then(e=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=e,n=s.decode(a,this.encoding);t(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)},e=>{const{message:i,response:o}=e;t(i,o,o&&s.decode(o.rawBody,this.encoding))})}}post(e,t=(()=>{})){const s=e.method?e.method.toLocaleLowerCase():"post";switch(e.headers&&(delete e.headers["Content-Type"],delete e.headers["Content-Length"]),e.body&&e.headers&&!e.headers["Content-Type"]&&(e.headers["Content-Type"]="application/x-www-form-urlencoded"),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":default:this.isSurge()&&this.isNeedRewrite&&(e.headers=e.headers||{},Object.assign(e.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](e,(e,s,i)=>{!e&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,i)});break;case"Quantumult X":e.method=s,this.isNeedRewrite&&(e.opts=e.opts||{},Object.assign(e.opts,{hints:!1})),$task.fetch(e).then(e=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=e;t(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)},e=>t(e&&e.error||"UndefinedError"));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(e);const{url:o,...r}=e;this.got[s](o,r).then(e=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=e,n=i.decode(a,this.encoding);t(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)},e=>{const{message:s,response:o}=e;t(s,o,o&&i.decode(o.rawBody,this.encoding))})}}time(e,t=null){const s=t?new Date(t):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in i)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?i[t]:("00"+i[t]).substr((""+i[t]).length)));return e}msg(t=e,s="",i="",o={}){const r=t=>{const{$open:s,$copy:i,$media:o,$mediaMime:r}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":case"Egern":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||s;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||i;n&&Object.assign(r,{action:"clipboard",text:n});if(o){let e,t,s;if(o.startsWith("http"))e=o;else if(o.startsWith("data:")){const[i]=o.split(";"),[,n]=o.split(",");t=n,s=i.replace("data:","")}else{t=o,s=(e=>{const t={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in t)if(0===e.indexOf(s))return t[s];return null})(o)}Object.assign(r,{"media-url":e,"media-base64":t,"media-base64-mime":r??s})}Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound});return r}case"Loon":{const s={};let i=t.openUrl||t.url||t["open-url"]||s;i&&Object.assign(s,{openUrl:i});let r=t.mediaUrl||t["media-url"];o?.startsWith("http")&&(r=o);r&&Object.assign(s,{mediaUrl:r});console.log(JSON.stringify(s));return s}case"Quantumult X":{const i={};let r=t["open-url"]||t.url||t.openUrl||s;r&&Object.assign(i,{"open-url":r});let a=t["media-url"]||t.mediaUrl;o?.startsWith("http")&&(a=o);a&&Object.assign(i,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard;n&&Object.assign(i,{"update-pasteboard":n});console.log(JSON.stringify(i));return i}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$notification.post(t,s,i,r(o));break;case"Quantumult X":$notify(t,s,i,r(o));break;case"Node.js":}if(!this.isMuteLog){let o=["","==============📣系统通知📣=============="];o.push(t),s&&o.push(s),i&&o.push(i),console.log(o.join("\n")),this.logs=this.logs.concat(o)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.map(e=>e??String(e)).join(this.logSeparator))}logErr(e,t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){const t=(new Date).getTime(),s=(t-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(()=>{switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:$done(e);break;case"Node.js":process.exit(1)}})()}}(e,t)}
