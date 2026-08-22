//00点38分

const $ = new Env("套路SM");

function resolveCleanUrl(host, vid) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v) => { if (!done) { done = true; resolve(v); } };
    setTimeout(() => finish(null), 6000);
    $.http.get({
      url: `${host}/download/${vid}`,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": `${host}/v/${vid}`,
        "Range": "bytes=0-0",
      },
      "auto-redirect": false,
      opts: { redirection: false },
      timeout: 6,
    }).then((resp) => {
      const headers = (resp && resp.headers) || {};
      let loc = "";
      for (const k in headers) {
        if (k.toLowerCase() === "location") { loc = headers[k]; break; }
      }
      if (loc && /\.mp4/i.test(loc)) finish(loc.split("?")[0]);
      else finish(null);
    }).catch(() => finish(null));
  });
}

!(async () => {
  const url = $request.url || "";
  const m = url.match(/\/v\/(\d+)/);
  if (!m) return $.done({ body: $response.body });

  const vid = m[1];
  let body = $response.body || "";
  if (!body) return $.done({});

  const host = (url.match(/^(https?:\/\/[^/]+)/) || [])[1] || "https://taolusm.com";

  const ogM = body.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const vodName = (ogM ? ogM[1] : `视频 ${vid}`).trim();

  const resolved = await resolveCleanUrl(host, vid);
  const videoUrl = resolved || `${host}/download/${vid}`;
  const fileName = vodName.replace(/[<>:"\/\\|?*]/g, "") + ".mp4";
  const senUrl = `SenPlayer://x-callback-url/download?url=${encodeURIComponent(videoUrl)}&name=${encodeURIComponent(fileName)}`;

  const oldLen = body.length;
  body = body.replace(
    /https?:\/\/cdn(?:-b2-taolu)?\.wefun\.world\/preview_mp4\/\d+\.mp4/g,
    videoUrl
  );
  const replaced = oldLen !== body.length;

  const buttonsHTML = `
<div class="flex gap-2 flex-wrap mt-2" id="tlsm-btns">
  <a class="px-3 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium no-underline" href="${senUrl}">SenPlayer 下载</a>
  <a class="px-3 py-1.5 rounded bg-green-500 hover:bg-green-600 text-white text-sm font-medium cursor-pointer no-underline" id="tlsm-copy" href="javascript:void(0)">复制链接</a>
  <a class="px-3 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium no-underline" href="${videoUrl}" target="_blank" rel="noopener">直链播放</a>
</div>
<script>
(function(){
  var btn=document.getElementById("tlsm-copy");
  if(!btn) return;
  btn.addEventListener("click",function(e){
    e.preventDefault();
    var u=${JSON.stringify(videoUrl)};
    var ok=function(){var old=btn.textContent;btn.textContent="已复制";setTimeout(function(){btn.textContent=old},1500)};
    if(navigator.clipboard){navigator.clipboard.writeText(u).then(ok).catch(fb)}else{fb()}
    function fb(){var a=document.createElement("textarea");a.value=u;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(_){}a.remove();ok()}
  });
})();
<\/script>`;

  let injected = false;
  body = body.replace(
    /(<div class="border text-secondary[^"]*"[^>]*>)\s*<div>\s*正在播放预览，[\s\S]*?可免费观看完整视频[\s\S]*?<\/div>\s*<\/div>/,
    (full, openDiv) => {
      injected = true;
      return openDiv +
        `<div class="text-green-400 font-medium">解析成功，直接点上面播放即可，如播放不了请下载</div>` +
        buttonsHTML +
        `</div>`;
    }
  );

  if (!injected) {
    body = body.replace(
      /(<video\s[^>]*id=["']player["'][^>]*>[\s\S]*?<\/video>)/i,
      (m1) => m1 + `<div class="my-3">${buttonsHTML}</div>`
    );
  }

  $.log(`vid=${vid} 解析=${resolved ? "ok" : "fallback"} 替换=${replaced} 注入=${injected}`);
  $.done({ body });
})();

function Env(e,t){class s{constructor(e){this.env=e}send(e,t="GET"){e="string"==typeof e?{url:e}:e;let s=this.get;"POST"===t&&(s=this.post);const i=new Promise((t,i)=>{s.call(this,e,(e,s,o)=>{e?i(e):t(s)})});return e.timeout?((e,t=1e3)=>Promise.race([e,new Promise((e,s)=>{setTimeout(()=>{s(new Error("请求超时"))},t)})]))(i,e.timeout):i}get(e){return this.send.call(this.env,e)}post(e){return this.send.call(this.env,e,"POST")}}return new class{constructor(e,t){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=e,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,t),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof Egern?"Egern":"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}isEgern(){return"Egern"===this.getEnv()}toObj(e,t=null){try{return JSON.parse(e)}catch{return t}}toStr(e,t=null,...s){try{return JSON.stringify(e,...s)}catch{return t}}getjson(e,t){let s=t;if(this.getdata(e))try{s=JSON.parse(this.getdata(e))}catch{}return s}setjson(e,t){try{return this.setdata(JSON.stringify(e),t)}catch{return!1}}getScript(e){return new Promise(t=>{this.get({url:e},(e,s,i)=>t(i))})}runScript(e,t){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=t&&t.timeout?t.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,(e,t,i)=>s(i))}).catch(e=>this.logErr(e))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),i=!s&&this.fs.existsSync(t);if(!s&&!i)return{};{const i=s?e:t;try{return JSON.parse(this.fs.readFileSync(i))}catch(e){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),i=!s&&this.fs.existsSync(t),o=JSON.stringify(this.data);s?this.fs.writeFileSync(e,o):i?this.fs.writeFileSync(t,o):this.fs.writeFileSync(e,o)}}lodash_get(e,t,s){const i=t.replace(/\[(\d+)\]/g,".$1").split(".");let o=e;for(const e of i)if(o=Object(o)[e],void 0===o)return s;return o}lodash_set(e,t,s){return Object(e)!==e?e:(Array.isArray(t)||(t=t.toString().match(/[^.[\]]+/g)||[]),t.slice(0,-1).reduce((e,s,i)=>Object(e[s])===e[s]?e[s]:e[s]=Math.abs(t[i+1])>>0==+t[i+1]?[]:{},e)[t[t.length-1]]=s,e)}getdata(e){let t=this.getval(e);if(/^@/.test(e)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(e),o=s?this.getval(s):"";if(o)try{const e=JSON.parse(o);t=e?this.lodash_get(e,i,""):t}catch(e){t=""}}return t}setdata(e,t){let s=!1;if(/^@/.test(t)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(t),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const t=JSON.parse(a);this.lodash_set(t,o,e),s=this.setval(JSON.stringify(t),i)}catch(t){const r={};this.lodash_set(r,o,e),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(e,t);return s}getval(e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":return $persistentStore.read(e);case"Quantumult X":return $prefs.valueForKey(e);case"Node.js":return this.data=this.loaddata(),this.data[e];default:return this.data&&this.data[e]||null}}setval(e,t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":return $persistentStore.write(e,t);case"Quantumult X":return $prefs.setValueForKey(e,t);case"Node.js":return this.data=this.loaddata(),this.data[t]=e,this.writedata(),!0;default:return this.data&&this.data[t]||null}}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}get(e,t=(()=>{})){switch(e.headers&&(delete e.headers["Content-Type"],delete e.headers["Content-Length"]),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":default:this.isSurge()&&this.isNeedRewrite&&(e.headers=e.headers||{},Object.assign(e.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(e,(e,s,i)=>{!e&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,i)});break;case"Quantumult X":this.isNeedRewrite&&(e.opts=e.opts||{},Object.assign(e.opts,{hints:!1})),$task.fetch(e).then(e=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=e;t(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)},e=>t(e&&e.error||"UndefinedError"));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(e),this.got(e).on("redirect",(e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}}).then(e=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=e,n=s.decode(a,this.encoding);t(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)},e=>{const{message:i,response:o}=e;t(i,o,o&&s.decode(o.rawBody,this.encoding))})}}post(e,t=(()=>{})){const s=e.method?e.method.toLocaleLowerCase():"post";switch(e.headers&&(delete e.headers["Content-Type"],delete e.headers["Content-Length"]),e.body&&e.headers&&!e.headers["Content-Type"]&&(e.headers["Content-Type"]="application/x-www-form-urlencoded"),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Egern":default:this.isSurge()&&this.isNeedRewrite&&(e.headers=e.headers||{},Object.assign(e.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](e,(e,s,i)=>{!e&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,i)});break;case"Quantumult X":e.method=s,this.isNeedRewrite&&(e.opts=e.opts||{},Object.assign(e.opts,{hints:!1})),$task.fetch(e).then(e=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=e;t(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)},e=>t(e&&e.error||"UndefinedError"));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(e);const{url:o,...r}=e;this.got[s](o,r).then(e=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=e,n=i.decode(a,this.encoding);t(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)},e=>{const{message:s,response:o}=e;t(s,o,o&&i.decode(o.rawBody,this.encoding))})}}time(e,t=null){const s=t?new Date(t):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in i)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?i[t]:("00"+i[t]).substr((""+i[t]).length)));return e}msg(t=e,s="",i="",o={}){const r=t=>{const{$open:s,$copy:i,$media:o,$mediaMime:r}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":case"Egern":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||s;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||i;n&&Object.assign(r,{action:"clipboard",text:n});if(o){let e,t,s;if(o.startsWith("http"))e=o;else if(o.startsWith("data:")){const[i]=o.split(";"),[,n]=o.split(",");t=n,s=i.replace("data:","")}else{t=o,s=(e=>{const t={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in t)if(0===e.indexOf(s))return t[s];return null})(o)}Object.assign(r,{"media-url":e,"media-base64":t,"media-base64-mime":r??s})}Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound});return r}case"Loon":{const s={};let i=t.openUrl||t.url||t["open-url"]||s;i&&Object.assign(s,{openUrl:i});let r=t.mediaUrl||t["media-url"];o?.startsWith("http")&&(r=o);r&&Object.assign(s,{mediaUrl:r});console.log(JSON.stringify(s));return s}case"Quantumult X":{const i={};let r=t["open-url"]||t.url||t.openUrl||s;r&&Object.assign(i,{"open-url":r});let a=t["media-url"]||t.mediaUrl;o?.startsWith("http")&&(a=o);a&&Object.assign(i,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard;n&&Object.assign(i,{"update-pasteboard":n});console.log(JSON.stringify(i));return i}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":default:$notification.post(t,s,i,r(o));break;case"Quantumult X":$notify(t,s,i,r(o));break;case"Node.js":}if(!this.isMuteLog){let o=["","==============📣系统通知📣=============="];o.push(t),s&&o.push(s),i&&o.push(i),console.log(o.join("\n")),this.logs=this.logs.concat(o)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.map(e=>e??String(e)).join(this.logSeparator))}logErr(e,t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){const t=(new Date).getTime(),s=(t-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(()=>{switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:$done(e);break;case"Node.js":process.exit(1)}})()}}(e,t)}
