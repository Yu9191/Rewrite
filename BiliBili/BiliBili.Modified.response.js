
/**
 * Bilibili 扫码登录 Cookie 获取工具
 * 
 * 独立的 Cookie 获取页面，通过网页扫码登录获取 Bilibili 长期 Cookie
 * 获取后的 Cookie 可供 @ClydeTime 的每日任务脚本使用
 * 
 * 原作者: MartinsKing (@ClydeTime)
 * GitHub: https://github.com/ClydeTime/BiliBili
 * 任务脚本(V1.5): 登录/观看/分享/投币/直播签到/银瓜子转硬币/大会员积分签到/年度大会员B币券等
 * 
 * 使用本工具后，请关闭或注释原作者模块/插件/snippet 中的 Cookie 获取部分:
 *   # B站Cookie(扫码)
 *   ^https?:\/\/app\.bilibili\.com\/x\/resource\/fingerprint\? url script-response-body ...
 *   # B站Cookie(APP)  
 *   ^https?:\/\/app\.bilibili\.com\/x\/resource\/fingerprint\? url script-request-header ...
 * 原作者的每日任务/Boxjs 订阅等功能保持不变，无需修改
 * 
 * Boxjs 订阅(原作者):
 *   https://raw.githubusercontent.com/ClydeTime/BiliBili/main/boxjs/BiliBili.boxjs.json
 * 
* [rewrite_local]
* http://360.com/bilibili url script-analyze-echo-response https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/BiliBili/BiliBili.Modified.response.js
* [mitm]
* hostname = 360.com
**/

const $ = new Env("Bilibili登录");
const CONFIG = { PATH: "/bilibili", KEY: "bilibili_daily_bonus" };

// 工具函数

function md5(r){function n(r,n){return r<<n|r>>>32-n}function t(r,n){var t,o,e,u,f;return e=2147483648&r,u=2147483648&n,t=1073741824&r,o=1073741824&n,f=(1073741823&r)+(1073741823&n),t&o?2147483648^f^e^u:t|o?1073741824&f?3221225472^f^e^u:1073741824^f^e^u:f^e^u}function o(r,n,t){return r&n|~r&t}function e(r,n,t){return r&t|n&~t}function u(r,n,t){return r^n^t}function f(r,n,t){return n^(r|~t)}function i(r,e,u,f,i,a,c){return r=t(r,t(t(o(e,u,f),i),c)),t(n(r,a),e)}function a(r,o,u,f,i,a,c){return r=t(r,t(t(e(o,u,f),i),c)),t(n(r,a),o)}function c(r,o,e,f,i,a,c){return r=t(r,t(t(u(o,e,f),i),c)),t(n(r,a),o)}function C(r,o,e,u,i,a,c){return r=t(r,t(t(f(o,e,u),i),c)),t(n(r,a),o)}function g(r){for(var n,t=r.length,o=t+8,e=(o-o%64)/64,u=16*(e+1),f=Array(u-1),i=0,a=0;a<t;)n=(a-a%4)/4,i=a%4*8,f[n]=f[n]|r.charCodeAt(a)<<i,a++;return n=(a-a%4)/4,i=a%4*8,f[n]=f[n]|128<<i,f[u-2]=t<<3,f[u-1]=t>>>29,f}function h(r){var n,t,o="",e="";for(t=0;t<=3;t++)n=r>>>8*t&255,e="0"+n.toString(16),o+=e.slice(-2);return o}function d(r){r=r.replace(/\r\n/g,"\n");for(var n="",t=0;t<r.length;t++){var o=r.charCodeAt(t);o<128?n+=String.fromCharCode(o):o>127&&o<2048?(n+=String.fromCharCode(o>>6|192),n+=String.fromCharCode(63&o|128)):(n+=String.fromCharCode(o>>12|224),n+=String.fromCharCode(o>>6&63|128),n+=String.fromCharCode(63&o|128))}return n}var m,S,v,l,A,s,y,p,w,L=Array(),b=7,j=12,k=17,q=22,x=5,z=9,B=14,D=20,E=4,F=11,G=16,H=23,I=6,J=10,K=15,M=21;for(r=d(r),L=g(r),s=1732584193,y=4023233417,p=2562383102,w=271733878,m=0;m<L.length;m+=16)S=s,v=y,l=p,A=w,s=i(s,y,p,w,L[m+0],b,3614090360),w=i(w,s,y,p,L[m+1],j,3905402710),p=i(p,w,s,y,L[m+2],k,606105819),y=i(y,p,w,s,L[m+3],q,3250441966),s=i(s,y,p,w,L[m+4],b,4118548399),w=i(w,s,y,p,L[m+5],j,1200080426),p=i(p,w,s,y,L[m+6],k,2821735955),y=i(y,p,w,s,L[m+7],q,4249261313),s=i(s,y,p,w,L[m+8],b,1770035416),w=i(w,s,y,p,L[m+9],j,2336552879),p=i(p,w,s,y,L[m+10],k,4294925233),y=i(y,p,w,s,L[m+11],q,2304563134),s=i(s,y,p,w,L[m+12],b,1804603682),w=i(w,s,y,p,L[m+13],j,4254626195),p=i(p,w,s,y,L[m+14],k,2792965006),y=i(y,p,w,s,L[m+15],q,1236535329),s=a(s,y,p,w,L[m+1],x,4129170786),w=a(w,s,y,p,L[m+6],z,3225465664),p=a(p,w,s,y,L[m+11],B,643717713),y=a(y,p,w,s,L[m+0],D,3921069994),s=a(s,y,p,w,L[m+5],x,3593408605),w=a(w,s,y,p,L[m+10],z,38016083),p=a(p,w,s,y,L[m+15],B,3634488961),y=a(y,p,w,s,L[m+4],D,3889429448),s=a(s,y,p,w,L[m+9],x,568446438),w=a(w,s,y,p,L[m+14],z,3275163606),p=a(p,w,s,y,L[m+3],B,4107603335),y=a(y,p,w,s,L[m+8],D,1163531501),s=a(s,y,p,w,L[m+13],x,2850285829),w=a(w,s,y,p,L[m+2],z,4243563512),p=a(p,w,s,y,L[m+7],B,1735328473),y=a(y,p,w,s,L[m+12],D,2368359562),s=c(s,y,p,w,L[m+5],E,4294588738),w=c(w,s,y,p,L[m+8],F,2272392833),p=c(p,w,s,y,L[m+11],G,1839030562),y=c(y,p,w,s,L[m+14],H,4259657740),s=c(s,y,p,w,L[m+1],E,2763975236),w=c(w,s,y,p,L[m+4],F,1272893353),p=c(p,w,s,y,L[m+7],G,4139469664),y=c(y,p,w,s,L[m+10],H,3200236656),s=c(s,y,p,w,L[m+13],E,681279174),w=c(w,s,y,p,L[m+0],F,3936430074),p=c(p,w,s,y,L[m+3],G,3572445317),y=c(y,p,w,s,L[m+6],H,76029189),s=c(s,y,p,w,L[m+9],E,3654602809),w=c(w,s,y,p,L[m+12],F,3873151461),p=c(p,w,s,y,L[m+15],G,530742520),y=c(y,p,w,s,L[m+2],H,3299628645),s=C(s,y,p,w,L[m+0],I,4096336452),w=C(w,s,y,p,L[m+7],J,1126891415),p=C(p,w,s,y,L[m+14],K,2878612391),y=C(y,p,w,s,L[m+5],M,4237533241),s=C(s,y,p,w,L[m+12],I,1700485571),w=C(w,s,y,p,L[m+3],J,2399980690),p=C(p,w,s,y,L[m+10],K,4293915773),y=C(y,p,w,s,L[m+1],M,2240044497),s=C(s,y,p,w,L[m+8],I,1873313359),w=C(w,s,y,p,L[m+15],J,4264355552),p=C(p,w,s,y,L[m+6],K,2734768916),y=C(y,p,w,s,L[m+13],M,1309151649),s=C(s,y,p,w,L[m+4],I,4149444226),w=C(w,s,y,p,L[m+11],J,3174756917),p=C(p,w,s,y,L[m+2],K,718787259),y=C(y,p,w,s,L[m+9],M,3951481745),s=t(s,S),y=t(y,v),p=t(p,l),w=t(w,A);return(h(s)+h(y)+h(p)+h(w)).toLowerCase()}

function generateSign(params) {
    const sorted = Object.fromEntries(new Map(Array.from(Object.entries(params)).sort()));
    return md5(queryStr(sorted) + 'c2ed53a74eeefe3cf99fbd01d8c9c375');
}
function queryStr(obj) { return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&'); }
function string2object(cookie) { const o = {}; cookie.split(';').forEach(i => { const [k, v] = i.trim().split('='); if (k && v) o[k] = v; }); return o; }
function sbody(r) { try { return typeof r.body === 'object' ? r.body : JSON.parse(r.body); } catch (e) { return {}; } }
function ret(d) {
    const h = { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" };
    const b = JSON.stringify(d);
    $.isQX ? $done({ status: "HTTP/1.1 200 OK", headers: h, body: b }) : $done({ response: { status: 200, headers: h, body: b } });
}

// 主逻辑

(async () => {
    if (typeof $request !== "undefined") {
        const url = $request.url;
        if (url.indexOf(CONFIG.PATH) > -1) {
            if (url.indexOf("qrcode") > -1) await h_qrcode();
            else if (url.indexOf("poll") > -1) await h_poll();
            else await render();
        } else { $.done({}); }
    } else { $.done(); }
})();

// 二维码接口

async function h_qrcode() {
    try {
        const params = { appkey: "27eb53fc9058f8c3", local_id: 0, ts: Math.floor(Date.now() / 1000), mobi_app: 'iphone' };
        params.sign = generateSign(params);
        const response = await $.http.post({
            url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: queryStr(params)
        });
        const result = JSON.parse(response.body);
        if (result.code === 0 && result.data?.auth_code) {
            ret({ code: 0, msg: "ok", data: {
                auth_code: result.data.auth_code,
                qr_url: `https://passport.bilibili.com/x/passport-tv-login/h5/qrcode/auth?auth_code=${result.data.auth_code}&mobi_app=iphone`
            }});
        } else { ret({ code: -1, msg: result.message || "生成二维码失败" }); }
    } catch (e) { ret({ code: -1, msg: e.message }); }
}

// 轮询接口

async function h_poll() {
    try {
        const body = sbody($request);
        if (!body.auth_code) return ret({ code: -1, msg: "缺少 auth_code" });
        const params = { appkey: "27eb53fc9058f8c3", auth_code: body.auth_code, local_id: 0, ts: Math.floor(Date.now() / 1000) };
        params.sign = generateSign(params);
        const response = await $.http.post({
            url: "https://passport.bilibili.com/x/passport-tv-login/qrcode/poll",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: queryStr(params)
        });
        const result = JSON.parse(response.body);
        if (result.code === 0) {
            const cookieStr = result.data.cookie_info.cookies.map(c => `${c.name}=${c.value}`).join('; ');
            const cookieObj = string2object(cookieStr);
            $.setdata(JSON.stringify({ cookieStr, cookie: cookieObj, key: result.data.access_token, timestamp: Date.now() }), CONFIG.KEY);
            $.msg("Bilibili登录", "扫码登录成功", `Cookie 已保存, UID: ${cookieObj.DedeUserID || '未知'}`);
            ret({ code: 0, msg: "ok", data: { cookie: cookieStr, access_token: result.data.access_token } });
        } else { ret({ code: result.code, msg: result.message, data: null }); }
    } catch (e) { ret({ code: -1, msg: e.message }); }
}

// 页面渲染

async function render() {
    let clientType = "未知", clientColor = "#8e8e93";
    if ($.isQX) { clientType = "QuantumultX"; clientColor = "#0066cc"; }
    else if ($.isLoon) { clientType = "Loon"; clientColor = "#ff6b6b"; }
    else if ($.isSurge) { clientType = "Surge"; clientColor = "#00c4cc"; }

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
<title>Bilibili Cookie 获取工具</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#f2f2f7;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;padding:15px;color:#1c1c1e}
.card{background:#fff;padding:20px;border-radius:16px;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:12px}
.card-title{font-size:17px;font-weight:600;margin-bottom:4px;display:flex;align-items:center;gap:8px}
.card-desc{font-size:13px;color:#8e8e93;margin-bottom:16px}
.badge{display:inline-block;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:600;color:#fff}
.qr-area{text-align:center;padding:10px 0}
.qr-empty{width:240px;height:240px;border:2px dashed #d1d1d6;border-radius:12px;background:#fafafa;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#8e8e93;font-size:14px}
#qr-canvas{display:none;margin:0 auto 12px;border-radius:12px}
.btn{width:100%;padding:13px;border:none;border-radius:12px;font-weight:600;font-size:15px;cursor:pointer;margin:5px 0;transition:opacity .2s}
.btn:active{opacity:.7}
.btn-blue{background:#00a1d6;color:#fff}
.btn-green{background:#34c759;color:#fff;display:none}
.status{padding:10px 14px;border-radius:8px;margin:10px 0;text-align:center;font-size:13px;font-weight:500;display:none}
.s-wait{background:#fff8e1;color:#795600;border:1px solid #ffe082}
.s-ok{background:#e8f5e9;color:#2e7d32;border:1px solid #a5d6a7}
.s-err{background:#fce4ec;color:#c62828;border:1px solid #ef9a9a}
.ck-box{background:#e8f4fd;padding:14px;border-radius:10px;margin-top:12px;display:none}
.ck-box h4{color:#00a1d6;font-size:14px;margin-bottom:8px}
.ck-text{background:#fff;padding:10px;border-radius:6px;font-family:"SF Mono",Menlo,monospace;font-size:11px;word-break:break-all;border:1px solid #d1d1d6;max-height:120px;overflow-y:auto}
.info-section{margin-top:6px}
.info-section summary{font-size:14px;font-weight:600;color:#1c1c1e;cursor:pointer;padding:6px 0}
.info-section summary::-webkit-details-marker{color:#00a1d6}
.info-item{font-size:12px;color:#636366;line-height:1.8;padding:6px 0}
.info-item a{color:#00a1d6;text-decoration:none;word-break:break-all}
.info-item a:active{opacity:.6}
.info-item code{background:#f2f2f7;padding:2px 6px;border-radius:4px;font-size:11px;font-family:"SF Mono",Menlo,monospace;color:#e74c3c}
.warn{background:#fff3cd;border:1px solid #ffeaa7;border-radius:8px;padding:10px 12px;font-size:12px;color:#856404;line-height:1.6;margin:8px 0}
.warn b{color:#c0392b}
.tag{display:inline-block;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:500;margin:2px 4px 2px 0}
.tag-surge{background:#e0f7fa;color:#00838f}
.tag-qx{background:#e3f2fd;color:#1565c0}
.tag-loon{background:#fce4ec;color:#c62828}
#log{margin-top:10px;font-size:11px;color:#8e8e93;background:#f8f8f8;padding:10px;border-radius:8px;word-break:break-all;white-space:pre-wrap;max-height:150px;overflow-y:auto;line-height:1.5}
.credit{text-align:center;font-size:11px;color:#c7c7cc;padding:10px 0 20px}
.credit a{color:#00a1d6;text-decoration:none}
</style>
</head>
<body>

<!-- 登录卡片 -->
<div class="card">
  <div class="card-title">
    <span>Bilibili 扫码登录</span>
    <span class="badge" style="background:${clientColor}">${clientType}</span>
  </div>
  <div class="card-desc">通过网页扫码获取长期 Cookie，用于自动签到等功能</div>
  <div class="qr-area">
    <div class="qr-empty" id="qr-empty">点击下方按钮生成二维码</div>
    <canvas id="qr-canvas"></canvas>
    <div class="status" id="status"></div>
  </div>
  <button class="btn btn-blue" id="btn-gen">生成二维码</button>
  <button class="btn btn-green" id="btn-chk">检查登录状态</button>
  <div class="ck-box" id="ck-box">
    <h4>登录成功</h4>
    <p style="font-size:12px;color:#636366;margin-bottom:8px">Cookie 已自动保存，可配合每日任务脚本使用</p>
    <div class="ck-text" id="ck-text"></div>
  </div>
  <div id="log">等待操作...</div>
</div>

<!-- 使用说明 -->
<div class="card">
  <div class="card-title">使用说明</div>
  <div class="info-section">
    <details open>
      <summary>重要：关闭原脚本 Cookie 获取</summary>
      <div class="info-item">
        <div class="warn">
          使用本工具获取 Cookie 后，请<b>关闭或注释</b>原作者模块/插件/snippet 中的以下规则：<br><br>
          <code># B站Cookie(扫码)</code><br>
          <code>^https?:\\/\\/app\\.bilibili\\.com\\/x\\/resource\\/fingerprint\\?</code> <code>script-response-body</code><br><br>
          <code># B站Cookie(APP)</code><br>
          <code>^https?:\\/\\/app\\.bilibili\\.com\\/x\\/resource\\/fingerprint\\?</code> <code>script-request-header</code><br><br>
          其他部分（定时任务、Boxjs 设置等）<b>无需修改</b>，保持原样即可。
        </div>
      </div>
    </details>
  </div>

  <div class="info-section">
    <details>
      <summary>原作者每日任务脚本配置</summary>
      <div class="info-item">
        <p style="margin-bottom:6px">以下为 <b>@ClydeTime</b> 的每日等级任务脚本，请按对应客户端添加：</p>
        <p>
          <span class="tag tag-surge">Surge 模块</span><br>
          <a href="https://raw.githubusercontent.com/ClydeTime/BiliBili/main/modules/BiliBiliDailyBonus.sgmodule">BiliBiliDailyBonus.sgmodule</a>
        </p>
        <p style="margin-top:6px">
          <span class="tag tag-qx">QuantumultX 重写</span><br>
          <a href="https://raw.githubusercontent.com/ClydeTime/BiliBili/main/modules/BiliBiliDailyBonus.snippet">BiliBiliDailyBonus.snippet</a>
        </p>
        <p style="margin-top:6px">
          <span class="tag tag-loon">Loon 插件</span><br>
          <a href="https://raw.githubusercontent.com/ClydeTime/BiliBili/main/modules/BiliBiliDailyBonus.plugin">BiliBiliDailyBonus.plugin</a>
        </p>
      </div>
    </details>
  </div>

  <div class="info-section">
    <details>
      <summary>Boxjs 订阅 (投币设置等)</summary>
      <div class="info-item">
        <p>订阅地址（原作者）：</p>
        <a href="https://raw.githubusercontent.com/ClydeTime/BiliBili/main/boxjs/BiliBili.boxjs.json">BiliBili.boxjs.json</a>
        <p style="margin-top:6px;color:#8e8e93">可设置投币次数（置0即不投币）、充电目标等参数</p>
      </div>
    </details>
  </div>

  <div class="info-section">
    <details>
      <summary>功能说明</summary>
      <div class="info-item">
        <p><b>哔哩哔哩每日任务 V1.5</b> by MartinsKing (@ClydeTime)</p>
        <p>- 登录 / 观看 / 分享 / 投币 / 直播签到</p>
        <p>- 银瓜子转硬币 / 大会员积分签到</p>
        <p>- 年度大会员每月 B 币券领取 + 自动充电</p>
        <p style="margin-top:6px;color:#8e8e93">
          注意：账号内须有一定数量的关注数，否则无法完成投币；<br>
          当硬币不足5枚将停止投币；投币有重试机制（最多10次）；<br>
          B 币券在每月 1 号、15 号尝试领取。
        </p>
      </div>
    </details>
  </div>
</div>

<!-- 版权 -->
<div class="credit">
  Cookie 获取工具 | 任务脚本 by <a href="https://github.com/ClydeTime/BiliBili" target="_blank">@ClydeTime</a>
</div>

<script>
var QR=function(){function a(a){this.mode=c.MODE_8BIT_BYTE;this.data=a;this.parsedData=[];for(var b=0,d=this.data.length;b<d;b++){var e=[],f=this.data.charCodeAt(b);f>65536?(e[0]=240|(1835008&f)>>>18,e[1]=128|(258048&f)>>>12,e[2]=128|(4032&f)>>>6,e[3]=128|63&f):f>2048?(e[0]=224|(61440&f)>>>12,e[1]=128|(4032&f)>>>6,e[2]=128|63&f):f>128?(e[0]=192|(1984&f)>>>6,e[1]=128|63&f):e[0]=f;this.parsedData.push.apply(this.parsedData,e)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a;this.errorCorrectLevel=b;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a;this.dataCount=b}function k(){this.buffer=[];this.length=0}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;b<c;b++)a.put(this.parsedData[b],8)}};
b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c);this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},
setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=0<=c&&6>=c&&(0==d||6==d)||0<=d&&6>=d&&(0==c||6==c)||2<=c&&4>=c&&2<=d&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);if(0==c||a>d)a=d,b=c}return b},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2),null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},
setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(b>>c&1);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(c=0;18>c;c++)d=!a&&1==(b>>c&1),this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(d>>e&1);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(e=0;15>e;e++)g=!a&&1==(d>>e&1),8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g;this.modules[this.moduleCount-8][8]=!a},
mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;1<h;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(a[g]>>>e&1));f.getMask(b,d,h-i)&&(j=!j);this.modules[d][h-i]=j;e--;-1==e&&(g++,e=7)}d+=c;if(0>d||this.moduleCount<=d){d-=c;c=-c;break}}}};b.PAD0=236;b.PAD1=17;
b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4);g.put(i.getLength(),f.getLengthInBits(i.mode,a));i.write(g)}for(h=a=0;h<e.length;h++)a+=e[h].dataCount;if(g.getLengthInBits()>8*a)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*a+")");for(g.getLengthInBits()+4<=8*a&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;!(g.getLengthInBits()>=8*a);){g.put(b.PAD0,8);if(g.getLengthInBits()>=8*a)break;g.put(b.PAD1,8)}return b.createBytes(g,e)};
b.createBytes=function(a,b){for(var c=0,d=0,e=0,f=new Array(b.length),g=new Array(b.length),h=0;h<b.length;h++){var j=b[h].dataCount,k=b[h].totalCount-j;d=Math.max(d,j);e=Math.max(e,k);f[h]=new Array(j);for(var l=0;l<f[h].length;l++)f[h][l]=255&a.buffer[l+c];c+=j;l=i.getErrorCorrectPolynomial(k);j=(new i(f[h],l.getLength()-1)).mod(l);g[h]=new Array(l.getLength()-1);for(l=0;l<g[h].length;l++)k=l+j.getLength()-g[h].length,g[h][l]=0<=k?j.get(k):0}for(l=a=0;l<b.length;l++)a+=b[l].totalCount;a=new Array(a);for(l=c=0;l<d;l++)for(h=0;h<b.length;h++)l<f[h].length&&(a[c++]=f[h][l]);for(l=0;l<e;l++)for(h=0;h<b.length;h++)l<g[h].length&&(a[c++]=g[h][l]);return a};
var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8};var d={L:1,M:0,Q:3,H:2};var e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};
var f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,
getBCHTypeInfo:function(a){for(var b=a<<10;0<=f.getBCHDigit(b)-f.getBCHDigit(f.G15);)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;0<=f.getBCHDigit(b)-f.getBCHDigit(f.G18);)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},
getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw Error("bad maskPattern:"+a)}},
getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;c<a;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(1<=b&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10}else{if(!(41>b))throw Error("type:"+a+" num:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12}}},
getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;d<b;d++)for(var e=0;e<b;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||b<=d+h))for(var i=-1;1>=i;i++)0>e+i||b<=e+i||0==h&&0==i||g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(d=0;d<b-1;d++)for(e=0;e<b-1;e++)if(f=0,a.isDark(d,e)&&f++,a.isDark(d+1,e)&&f++,a.isDark(d,e+1)&&f++,a.isDark(d+1,e+1)&&f++,0==f||4==f)c+=3;for(d=0;d<b;d++)for(e=0;e<b-6;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(e=0;e<b;e++)for(d=0;d<b-6;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(e=f=0;e<b;e++)for(d=0;d<b;d++)a.isDark(d,e)&&f++;return c+=10*(Math.abs(100*f/b/b-50)/5)}};
var g={glog:function(a){if(1>a)throw Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;
i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(0>this.getLength()-a.getLength())return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return(new i(c,0)).mod(a)}};
i.getErrorCorrectPolynomial=function(a){for(var b=new i([1],0),c=0;c<a;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b};
j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];
j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;f<d;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;k<g;k++)e.push(new j(h,i));return e};j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return}};
k.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,b){for(var c=0;c<b;c++)this.putBit(1==(a>>>b-c-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0);a&&(this.buffer[b]|=128>>>this.length%8);this.length++}};
function makeQR(text){var t=4;for(var i=1;i<=40;i++){var q=new b(i,d.M);q.addData(text);try{q.make();t=i;break}catch(e){continue}}var qr=new b(t,d.M);qr.addData(text);qr.make();return qr}
function drawQR(canvas,text,size){var qr=makeQR(text);var cnt=qr.getModuleCount();var cs=Math.floor(size/cnt);var os=Math.floor((size-cs*cnt)/2);canvas.width=size;canvas.height=size;var ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,size,size);ctx.fillStyle='#000';for(var r=0;r<cnt;r++)for(var c=0;c<cnt;c++)if(qr.isDark(r,c))ctx.fillRect(os+c*cs,os+r*cs,cs,cs);canvas.style.display='block'}return{draw:drawQR}}();
</script>

<script>
(function(){
    var authCode='',poll=null;
    var logEl=document.getElementById('log'),stEl=document.getElementById('status');
    var qrEmpty=document.getElementById('qr-empty'),qrC=document.getElementById('qr-canvas');
    var btnG=document.getElementById('btn-gen'),btnC=document.getElementById('btn-chk');
    var ckBox=document.getElementById('ck-box'),ckText=document.getElementById('ck-text');

    function log(t){var d=new Date().toLocaleTimeString();logEl.textContent='['+d+'] '+t+'\\n'+logEl.textContent}
    function showSt(t,c){stEl.className='status s-'+c;stEl.textContent=t;stEl.style.display='block'}
    function hideSt(){stEl.style.display='none'}

    function genQR(){
        btnG.textContent='生成中...';btnG.disabled=true;hideSt();ckBox.style.display='none';
        fetch('${CONFIG.PATH}/qrcode?t='+Date.now()).then(function(r){return r.json()}).then(function(res){
            if(res.code===0){
                authCode=res.data.auth_code;
                try{QR.draw(qrC,res.data.qr_url,240);qrEmpty.style.display='none';btnC.style.display='block';showSt('请使用 Bilibili APP 扫描二维码','wait');log('二维码已生成');startPoll()}
                catch(e){log('绘制失败: '+e.message);showSt('二维码绘制失败','err')}
            }else{log('生成失败: '+res.msg);showSt(res.msg,'err')}
            btnG.textContent='重新生成';btnG.disabled=false;
        }).catch(function(e){log('网络错误: '+e.message);showSt('网络错误','err');btnG.textContent='重新生成';btnG.disabled=false});
    }

    function chkSt(){
        if(!authCode){log('请先生成二维码');return}
        btnC.textContent='检查中...';btnC.disabled=true;
        fetch('${CONFIG.PATH}/poll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({auth_code:authCode})})
        .then(function(r){return r.json()}).then(function(res){
            switch(res.code){
                case 0:log('登录成功');showSt('登录成功','ok');ckText.textContent=res.data.cookie;ckBox.style.display='block';stopPoll();btnC.style.display='none';break;
                case 86038:log('二维码已失效');showSt('二维码已失效，请重新生成','err');stopPoll();break;
                case 86039:log('等待扫码...');showSt('等待扫码确认...','wait');break;
                case 86090:log('已扫码，等待确认');showSt('已扫码，请在手机上确认','wait');break;
                default:log('状态: '+res.msg);showSt(res.msg||'未知状态','err')
            }
            btnC.textContent='检查登录状态';btnC.disabled=false;
        }).catch(function(e){log('检查失败: '+e.message);showSt('检查失败','err');btnC.textContent='检查登录状态';btnC.disabled=false});
    }

    function startPoll(){stopPoll();poll=setInterval(chkSt,3000);log('自动轮询中...')}
    function stopPoll(){if(poll){clearInterval(poll);poll=null}}

    btnG.addEventListener('click',genQR);
    btnC.addEventListener('click',chkSt);
    log('页面就绪');
})();
</script>
</body>
</html>`;

    $.isQX ?
        $.done({ status: "HTTP/1.1 200 OK", headers: { "Content-Type": "text/html;charset=utf-8" }, body: html }) :
        $.done({ response: { status: 200, headers: { "Content-Type": "text/html;charset=utf-8" }, body: html } });
}

// Env 

function Env(name) {
    const isLoon = typeof $loon !== "undefined";
    const isSurge = typeof $httpClient !== "undefined" && !isLoon;
    const isQX = typeof $task !== "undefined";
    const http = { get: o => send(o, 'GET'), post: o => send(o, 'POST') };
    const send = (o, m) => new Promise((r, j) => {
        if (isQX) { o.method = m; $task.fetch(o).then(res => r(res)).catch(j); }
        else { const c = m === 'POST' ? $httpClient.post : $httpClient.get; c({ url: o.url, headers: o.headers, body: o.body }, (e, res, b) => { if (e) j(e); else { res.body = b; r(res); } }); }
    });
    const setdata = (v, k) => isQX ? $prefs.setValueForKey(v, k) : $persistentStore.write(v, k);
    const getdata = k => isQX ? $prefs.valueForKey(k) : $persistentStore.read(k);
    const msg = (t, s, m) => { if (isSurge || isLoon) $notification.post(t, s, m); if (isQX) $notify(t, s, m); console.log(`${t}\n${s}\n${m}`); };
    const log = console.log;
    const done = v => { $done(v); };
    return { name, isLoon, isSurge, isQX, http, setdata, getdata, msg, log, done };
}
