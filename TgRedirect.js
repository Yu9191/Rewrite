/**
 * Surge: t.me Redirect (http-request 直接返回 302)
 * $argument 支持：
 * - client=Telegram / Swiftgram / Turrit / iMe / Nicegram / Lingogram
 * - client=tg / sg / turrit / ime / ng / lingo
 * - 纯值：tg / ng ...
 */

function parseArgs() {
  const a = typeof $argument === "undefined" ? "" : $argument;
  if (!a) return {};
  if (typeof a === "object") return a;
  const s = String(a).trim();
  if (!s) return {};
  if (!s.includes("=") && !s.includes("&")) return { client: s };
  const out = {};
  s.split("&").forEach(p => {
    const i = p.indexOf("=");
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

const mapping = {
  Telegram: "tg",
  Swiftgram: "sg",
  Turrit: "turrit",
  iMe: "ime",
  Nicegram: "ng",
  Lingogram: "lingo",
};

function buildDeepLink(scheme, reqUrl) {
  const u = new URL(reqUrl);
  let path = (u.pathname || "").replace(/^\/+/, "");

  if (path.startsWith("s/")) path = path.slice(2);
  const seg = path.split("/").filter(Boolean);

  // +xxxx / joinchat/xxxx
  if (seg[0] && seg[0][0] === "+") return `${scheme}://join?invite=${encodeURIComponent(seg[0].slice(1))}`;
  if (seg[0] === "joinchat" && seg[1]) return `${scheme}://join?invite=${encodeURIComponent(seg[1])}`;

  // addstickers/pack
  if (seg[0] === "addstickers" && seg[1]) return `${scheme}://addstickers?set=${encodeURIComponent(seg[1])}`;

  // share/url?url=...&text=...
  if (seg[0] === "share" && seg[1] === "url") {
    const shareUrl = u.searchParams.get("url") || "";
    const text = u.searchParams.get("text") || "";
    return `${scheme}://msg_url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
  }

  const domain = seg[0];
  if (!domain) return "";

  // t.me/user/123 
  if (seg[1] && /^\d+$/.test(seg[1])) {
    return `${scheme}://resolve?domain=${encodeURIComponent(domain)}&post=${encodeURIComponent(seg[1])}`;
  }
  return `${scheme}://resolve?domain=${encodeURIComponent(domain)}`;
}

(function main() {
  if (typeof $request === "undefined" || !$request.url) return $done({});
  const url = $request.url;
  if (!/^https?:\/\/t\.me\/.+/i.test(url)) return $done({});

  const args = parseArgs();
  let scheme = (args.client || args["t.me_redirect"] || "").trim();
  scheme = mapping[scheme] || scheme;
  if (!scheme) scheme = "tg";

  const deep = buildDeepLink(scheme, url);
  if (!deep) return $done({});

  // 302
  $done({
    response: {
      status: 302,
      headers: { Location: deep },
      body: ""
    }
  });
})();
