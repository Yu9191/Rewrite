/*
 套路影视
 2026-05-06 17点42分

[rewrite_local]
^https?:\/\/[^\/]*taoluyingshi[^\/]*\/index\.php\/vod\/play\/id\/(\d+)\/sid\/(\d+)\/nid\/(\d+) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/taoluyingshi.js

[mitm]
hostname = *.taoluyingshi.vip, taoluyingshi.vip
*/

const $ = new Env("套路影视");

!(async () => {
  const url = $request.url || "";
  const m = url.match(/\/vod\/play\/id\/(\d+)\/sid\/(\d+)\/nid\/(\d+)/);
  if (!m) return $.done({ body: $response.body });

  const [, vid, sid, nid] = m;
  const body = $response.body || "";

  const vodNameM = body.match(/vod_name\s*=\s*'([^']+)'/);
  const vodName = vodNameM ? vodNameM[1] : `视频 ${vid}`;

  const host = url.match(/^(https?:\/\/[^/]+)/)?.[1] || "https://www.taoluyingshi.vip";
  const playerUrl = `${host}/index.php/vod/player/id/${vid}/sid/${sid}/nid/${nid}.html`;

  let videoUrl = "";
  try {
    const resp = await $.http.get({ url: playerUrl, timeout: 10000 });
    const pm = resp.body.match(/player_aaaa\s*=\s*(\{[\s\S]*?\})\s*;?\s*<\/script/);
    if (pm) {
      const data = $.toObj(pm[1]);
      if (data && data.url) videoUrl = data.url;
    }
  } catch (e) {
    $.log(`播放器请求失败: ${e && e.message || e}`);
  }

  if (!videoUrl) {
    $.log(`未获取到视频 URL vid=${vid}`);
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

function Env(e,t){class s{constructor(e){this.env=e}send(e,t="GET"){e="string"==typeof e?{url:e}:e;let s=this.get;"POST"===t&&(s=this.post);const i=new Promise((t,i)=>{s.call(this,e,(e,s,o)=>{e?i(e):t(s)})});return e.timeout?((e,t=1e3)=>Promise.race([e,new Promise((e,s)=>{setTimeout(()=>{s(new Error("请求超时"))},t)})]))(i,e.timeout):i}get(e){return this.send.call(this.env,e)}post(e){return this.send.call(this.env,e,"POST")}}return new class{constructor(e,t){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=e,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof Egern?"Egern":"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}isEgern(){return"Egern"===this.getEnv()}toObj(e,t=null){try{return JSON.parse(e)}catch{return t}}toStr(e,t=null,...s){try{return JSON.stringify(e,...s)}catch{return t}}getjson(e,t){let s=t;if(this.getdata(e))try{s=JSON.parse(this.getdata(e))}catch{}return s}setjson(e,t){try{return this.setdata(JSON.stringify(e),t)}catch{return!1}}getScript(e){return new Promise(t=>{this.get({url:e},(e,s,i)=>t(i))})}runScript(e,t){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs");if(i=i?JSON.parse(i):{},i.httpapi){i.httpapi_timeout=i.httpapi_timeout||20,i.httpapi_timeout=!/^\d+$/.test(i.httpapi_timeout)?20:1*i.httpapi_timeout;const[o,n]=i.httpapi.split("@"),a={url:`http://${n}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:i.httpapi_timeout},headers:{"X-Key":o,Accept:"*/*"},timeout:i.httpapi_timeout};this.post(a,(e,i,o)=>s(o))}else{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");i=i?1*i:20;const[o,n]=t.split("@"),a={url:`http://${n}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:i},headers:{"X-Key":o,Accept:"*/*"},policy:"DIRECT",timeout:i};this.post(a,(e,t,i)=>s(i))}}).catch(e=>this.logErr(e))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),i=!s&&this.fs.existsSync(t);if(!s&&!i)return{};{const i=s?e:t;try{return JSON.parse(this.fs.readFileSync(i))}catch(e){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile);this.fs.writeFileSync(e,JSON.stringify(this.data))}}lodash_get(e,t,s){const i=t.replace(/\[(\d+)\]/g,".$1").split(".");let o=e;for(const e of i)if(o=Object(o)[e],void 0===o)return s;return o}lodash_set(e,t,s){return Object(e)!==e?e:(Array.isArray(t)||(t=t.toString().match(/[^.[\]]+/g)||[]),t.slice(0,-1).reduce((e,s,i)=>Object(e[s])===e[s]?e[s]:e[s]=Math.abs(t[i+1])>>0==+t[i+1]?[]:{},e)[t[t.length-1]]=s,e)}getdata(e){let t=this.getval(e);if(/^@/.test(e)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(e),o=s?this.getval(s):"";if(o)try{const e=JSON.parse(o);t=e?this.lodash_get(e,i,""):t}catch(e){t=""}}return t}setdata(e,t){let s=!1;if(/^@/.test(t)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(t),n=this.getval(i),a=i?"null"===n?null:n||"{}":"{}";try{const t=JSON.parse(a);this.lodash_set(t,o,e),s=this.setval(JSON.stringify(t),i)}catch(t){const n={"":a};this.lodash_set(n,o,e),s=this.setval(JSON.stringify(n),i)}}else s=this.setval(e,t);return s}getval(e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":return $persistentStore.read(e);case"Quantumult X":return $prefs.valueForKey(e);case"Node.js":return this.data=this.loaddata(),this.data[e];default:return this.data&&this.data[e]||null}}setval(e,t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":return $persistentStore.write(e,t);case"Quantumult X":return $prefs.setValueForKey(e,t);case"Node.js":return this.data=this.loaddata(),this.data[t]=e,this.writedata(),!0;default:return this.data||(this.data={}),this.data[t]=e,!0}}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.headers.Cookie&&void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}get(e,t=(()=>{})){switch(e.headers&&(delete e.headers["Content-Type"],delete e.headers["Content-Length"],delete e.headers["content-type"],delete e.headers["content-length"]),e.params&&(e.url+="?"+Object.entries(e.params).map(([e,t])=>`${encodeURIComponent(e)}=${encodeURIComponent(t)}`).join("&")),void 0===e.followRedirect||e.followRedirect||((this.isSurge()||this.isLoon())&&(e["auto-redirect"]=!1),this.isQuanX()&&(e.opts?e.opts.redirection=!1:e.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$httpClient.get(e,(e,s,i)=>{!e&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,i)});break;case"Quantumult X":this.isNeedRewrite&&(e.opts=e.opts||{},Object.assign(e.opts,{hints:!1})),$task.fetch(e).then(e=>{const{statusCode:s,statusCode:i,headers:o,body:n,bodyBytes:a}=e;t(null,{status:s,statusCode:i,headers:o,body:n,bodyBytes:a},n)},e=>t(e&&e.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(e),this.got(e).on("redirect",(e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,""),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}}).then(e=>{const{statusCode:i,statusCode:o,headers:n,rawBody:a}=e,r=s.decode(a,this.encoding);t(null,{status:i,statusCode:o,headers:n,rawBody:a,body:r},r)},e=>{const{message:i,response:o}=e;t(i,o,o&&s.decode(o.rawBody,this.encoding))})}}post(e,t=(()=>{})){const s=e.method?e.method.toLocaleLowerCase():"post";switch(e.body&&e.headers&&!e.headers["Content-Type"]&&!e.headers["content-type"]&&(e.headers["content-type"]="application/x-www-form-urlencoded"),e.headers&&(delete e.headers["Content-Length"],delete e.headers["content-length"]),void 0===e.followRedirect||e.followRedirect||((this.isSurge()||this.isLoon())&&(e["auto-redirect"]=!1),this.isQuanX()&&(e.opts?e.opts.redirection=!1:e.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$httpClient[s](e,(e,s,i)=>{!e&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,i)});break;case"Quantumult X":e.method=s,this.isNeedRewrite&&(e.opts=e.opts||{},Object.assign(e.opts,{hints:!1})),$task.fetch(e).then(e=>{const{statusCode:s,statusCode:i,headers:o,body:n,bodyBytes:a}=e;t(null,{status:s,statusCode:i,headers:o,body:n,bodyBytes:a},n)},e=>t(e&&e.error||"UndefinedError"));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(e);const{url:o,...n}=e;this.got[s](o,n).then(e=>{const{statusCode:s,statusCode:o,headers:n,rawBody:a}=e,r=i.decode(a,this.encoding);t(null,{status:s,statusCode:o,headers:n,rawBody:a,body:r},r)},e=>{const{message:s,response:o}=e;t(s,o,o&&i.decode(o.rawBody,this.encoding))})}}time(e,t=null){const s=t?new Date(t):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in i)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?i[t]:("00"+i[t]).substr((""+i[t]).length)));return e}queryStr(e){let t="";for(const s in e){let i=e[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),t+=`${s}=${i}&`)}return t=t.substring(0,t.length-1),t}msg(e=t,t="",s="",i){const o=e=>{switch(typeof e){case void 0:return e;case"string":switch(this.getEnv()){case"Surge":case"Stash":case"Egern":default:return{url:e};case"Loon":case"Shadowrocket":return e;case"Quantumult X":return{"open-url":e};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:{let t={};return e.openUrl&&(t["action"]="open-url",t["url"]=e.openUrl),e.mediaUrl&&(t["media-url"]=e.mediaUrl),{url:e.openUrl,...t}}case"Loon":{let t={};return e.openUrl&&(t.openUrl=e.openUrl),e.mediaUrl&&(t.mediaUrl=e.mediaUrl),Object.keys(t).length>0?t:""}case"Quantumult X":{let t={};return e.openUrl&&(t["open-url"]=e.openUrl),e.mediaUrl&&(t["media-url"]=e.mediaUrl),Object.keys(t).length>0?t:void 0}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$notification.post(e,t,s,o(i));break;case"Quantumult X":$notify(e,t,s,o(i));break;case"Node.js":}if(!this.isMuteLog){let i=["","==============📣系统通知📣=============="];i.push(e),t&&i.push(t),s&&i.push(s),console.log(i.join("\n")),this.logs=this.logs.concat(i)}}debug(...e){this.logLevels[this.logLevel]<=this.logLevels.debug&&(this.isMuteLog||(this.logs=[...this.logs,...e]),console.log(`${this.logLevelPrefixs.debug}${e.map(e=>"string"==typeof e?e:JSON.stringify(e)).join(this.logSeparator)}`))}log(...e){this.logLevels[this.logLevel]<=this.logLevels.info&&(this.isMuteLog||(this.logs=[...this.logs,...e]),console.log(e.map(e=>"string"==typeof e?e:JSON.stringify(e)).join(this.logSeparator)))}warn(...e){this.logLevels[this.logLevel]<=this.logLevels.warn&&(this.isMuteLog||(this.logs=[...this.logs,...e]),console.log(`${this.logLevelPrefixs.warn}${e.map(e=>"string"==typeof e?e:JSON.stringify(e)).join(this.logSeparator)}`))}error(...e){this.logLevels[this.logLevel]<=this.logLevels.error&&(this.isMuteLog||(this.logs=[...this.logs,...e]),console.log(`${this.logLevelPrefixs.error}${e.map(e=>"string"==typeof e?e:JSON.stringify(e)).join(this.logSeparator)}`))}logErr(e,t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:this.log("",`❗️${this.name}, 错误!`,e);break;case"Quantumult X":this.log("",`❗️${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){const t=(new Date).getTime(),s=(t-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$done(e);break;case"Quantumult X":$done(e);break;case"Node.js":process.exit(1)}}}(e,t)}
