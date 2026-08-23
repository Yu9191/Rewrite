/*
 套路SM (tlsm.one) VIP 解锁
 @Yu9191  2026-05-12

[rewrite_local]
^https?:\/\/(?:www\.)?tlsm\.one\/v\/\d+(?:[\/?#]|$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/tlsm.js
^https?:\/\/(?:www\.)?taolusm\.com\/v\/\d+(?:[\/?#]|$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/tlsm.js
^https?:\/\/(?:www\.)?itaolu\.com\/v\/\d+(?:[\/?#]|$) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/tlsm.js

[mitm]
hostname = tlsm.one, www.tlsm.one, taolusm.com, www.taolusm.com, itaolu.com, www.itaolu.com
*/

const $ = new Env("套路SM");

!(async () => {
  const url = $request.url || "";
  const m = url.match(/\/v\/(\d+)/);
  if (!m) return $.done({ body: $response.body });

  const vid = m[1];
  const host = (url.match(/^(https?:\/\/[^/]+)/) || [])[1] || "https://tlsm.one";
  const body = await decodeResponseBody($response);
  if (!body) return $.done({});

  const titleM = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || body.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const vodName = (titleM ? titleM[1] : `视频 ${vid}`).replace(/<[^>]+>/g, "").trim();
  const videoUrl = await resolveVideoUrl(host, vid);

  if (!videoUrl) {
    $.log(`未拿到完整视频 vid=${vid}`);
    return $.done({ body });
  }

  const fileName = vodName.replace(/[<>:"\/\\|?*]/g, "") + ".mp4";
  const senUrl = `SenPlayer://x-callback-url/download?url=${encodeURIComponent(videoUrl)}&name=${encodeURIComponent(fileName)}`;
  const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>${escapeHtml(vodName)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:-apple-system,system-ui,sans-serif}
.wrap{max-width:960px;margin:0 auto}
.title{font-size:15px;font-weight:600;padding:10px 12px;background:#111}
video{width:100%;max-height:calc(100vw * 9 / 16);background:#000;display:block}
.bar{display:flex;gap:8px;padding:10px 12px;flex-wrap:wrap;background:#111}
.btn{display:inline-block;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:500;text-decoration:none;color:#fff;border:none;cursor:pointer}
.btn-sen{background:#007AFF}.btn-copy{background:#34C759}.btn-open{background:#FF9500}
.info{color:#666;font-size:11px;padding:4px 12px;background:#111}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:8px 24px;border-radius:20px;font-size:13px;opacity:0;transition:opacity .3s;z-index:9999}
.toast.on{opacity:1}
</style>
</head><body>
<div class="wrap">
  <div class="title">${escapeHtml(vodName)}</div>
  <video src="${videoUrl}" controls playsinline webkit-playsinline preload="auto"></video>
  <div class="bar">
    <a class="btn btn-sen" href="${senUrl}">SenPlayer 下载</a>
    <button class="btn btn-copy" id="copyBtn">复制链接</button>
    <a class="btn btn-open" href="${videoUrl}" target="_blank">直链播放</a>
  </div>
  <div class="info">${escapeHtml(vodName)} | vid:${vid}</div>
</div>
<div class="toast" id="toast"></div>
<script>
document.getElementById("copyBtn").onclick=function(){var u=${JSON.stringify(videoUrl)};if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){tt("已复制")}).catch(function(){fb(u)})}else{fb(u)}};
function fb(u){var a=document.createElement("textarea");a.value=u;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();tt("已复制")}
function tt(m){var e=document.getElementById("toast");e.textContent=m;e.classList.add("on");setTimeout(function(){e.classList.remove("on")},1500)}
<\/script>
</body></html>`;

  $.log(`完成 vid=${vid} video=${videoUrl.slice(0, 100)}`);
  $.done({ body: html });
})().catch(e => { $.logErr(e); $.done({}); });

async function resolveVideoUrl(host, vid) {
  try {
    const resp = await $.http.get({
      url: `${host}/download/${vid}`,
      headers: { "User-Agent": "Mozilla/5.0", Referer: `${host}/v/${vid}` },
      followRedirect: false,
      timeout: 10000,
    });
    const loc = getHeader(resp.headers, "location") || findMp4Url(JSON.stringify(resp.headers || {})) || findMp4Url(resp.body || "");
    if (loc && /\.mp4/i.test(loc)) return String(loc).split("?")[0];
  } catch (e) {
    $.log(`download 接口失败: ${e && e.message || e}`);
  }
  return "";
}

async function decodeResponseBody(resp) {
  if (resp.body && typeof resp.body === "string" && looksHtml(resp.body)) return resp.body;

  const headers = resp.headers || {};
  const encoding = (getHeader(headers, "content-encoding") || "").toLowerCase();
  const bytes = toUint8Array(resp.bodyBytes) || toUint8Array(resp.body);

  if (!bytes || !bytes.length) return resp.body || "";
  if (encoding.includes("zstd") || isZstd(bytes)) {
    const out = await tryFzstd(bytes);
    return out ? utf8(out) : "";
  }

  return utf8(bytes);
}

async function tryFzstd(bytes) {
  try {
    let z = typeof fzstd !== "undefined" ? fzstd : (typeof globalThis !== "undefined" && globalThis.fzstd);
    if (!z) {
      await loadScript("https://cdn.jsdelivr.net/npm/fzstd@0.1.1/umd/index.js");
      z = typeof fzstd !== "undefined" ? fzstd : (typeof globalThis !== "undefined" && globalThis.fzstd);
    }
    if (z && typeof z.decompress === "function") return z.decompress(bytes);
    if (z && typeof z.decompressSync === "function") return z.decompressSync(bytes);
  } catch (e) {
    $.log(`zstd 解压失败: ${e && e.message || e}`);
  }
  return null;
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    $.http.get({ url, timeout: 10000 }).then(resp => {
      try {
        Function(resp.body || "").call(globalThis);
        resolve();
      } catch (e) {
        reject(e);
      }
    }).catch(reject);
  });
}

function toUint8Array(v) {
  if (!v) return null;
  if (v instanceof Uint8Array) return v;
  if (v instanceof ArrayBuffer) return new Uint8Array(v);
  if (Array.isArray(v)) return new Uint8Array(v);
  if (typeof v === "string") return new TextEncoder().encode(v);
  if (typeof v === "object") {
    if (v.bytes) return toUint8Array(v.bytes);
    if (v.data) return toUint8Array(v.data);
    if (v.buffer) return toUint8Array(v.buffer);
    const keys = Object.keys(v);
    if (keys.length && keys.every(k => /^\d+$/.test(k))) return new Uint8Array(keys.sort((a, b) => a - b).map(k => v[k]));
  }
  return null;
}

function utf8(bytes) {
  try { return new TextDecoder("utf-8").decode(bytes); } catch { return ""; }
}

function getHeader(headers, name) {
  name = name.toLowerCase();
  for (const k in headers || {}) {
    if (k.toLowerCase() === name) {
      const v = headers[k];
      return Array.isArray(v) ? v[0] : v;
    }
  }
  return "";
}

function findMp4Url(s) {
  s = String(s || "").replace(/\\\//g, "/");
  const m = s.match(/https?:\/\/[^"'\\\s]+\.mp4(?:\?[^"'\\\s]*)?/i);
  return m ? m[0] : "";
}

function isZstd(bytes) {
  return bytes && bytes.length > 4 && bytes[0] === 0x28 && bytes[1] === 0xb5 && bytes[2] === 0x2f && bytes[3] === 0xfd;
}

function looksHtml(s) {
  return /<!doctype html|<html|<body|<video|preview_mp4/i.test(s || "");
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function Env(name) {
  return new class {
    constructor(name) {
      this.name = name;
      this.startTime = Date.now();
      this.http = {
        get: req => this.send(req, "GET"),
        post: req => this.send(req, "POST"),
      };
      this.log(`${name}, 开始!`);
    }
    getEnv() {
      return typeof Egern !== "undefined" ? "Egern" :
        typeof $environment !== "undefined" && $environment["surge-version"] ? "Surge" :
        typeof $environment !== "undefined" && $environment["stash-version"] ? "Stash" :
        typeof $task !== "undefined" ? "Quantumult X" :
        typeof $loon !== "undefined" ? "Loon" :
        typeof $rocket !== "undefined" ? "Shadowrocket" : "Unknown";
    }
    isQuanX() { return this.getEnv() === "Quantumult X"; }
    send(req, method) {
      return new Promise((resolve, reject) => {
        req = typeof req === "string" ? { url: req } : req;
        req.method = method;
        if (req.followRedirect === false) {
          req["auto-redirect"] = false;
          req.opts = Object.assign({}, req.opts, { redirection: false });
        }
        const timer = req.timeout ? setTimeout(() => reject(new Error("请求超时")), req.timeout) : null;
        const done = (err, resp, body) => {
          if (timer) clearTimeout(timer);
          if (err) return reject(err);
          resp = resp || {};
          resp.body = resp.body || body;
          resp.statusCode = resp.statusCode || resp.status;
          resolve(resp);
        };
        if (this.isQuanX()) {
          $task.fetch(req).then(resp => done(null, resp, resp.body), err => done(err && (err.error || err)));
        } else {
          $httpClient[method.toLowerCase()](req, done);
        }
      });
    }
    log(...args) { console.log(args.map(v => v == null ? String(v) : String(v)).join("\n")); }
    logErr(e) { this.log(`${this.name}, 错误!`, e && e.stack || e); }
    done(obj = {}) {
      this.log(`${this.name}, 结束!  ${(Date.now() - this.startTime) / 1000} 秒`);
      $done(obj);
    }
  }(name);
}
