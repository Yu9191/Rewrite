/**
 * @name 黄果短剧去广告
 * @description 去除黄果短剧 (huangguoai.com) 全站广告
 * @author Yu9191 Rewrite
 * @homepage https://github.com/Yu9191/Rewrite
 * @date 2026-09-02
 *
 * @supported Surge / Loon / Quantumult X / Stash
 *
 * @ad-type playAd          播放页跳转广告（点击播放器跳转外部广告页）
 * @ad-type prerollAd       播放前贴片视频广告
 * @ad-type heroSlides      首页轮播广告（isAd 项）
 * @ad-type sspSlot         SSP 广告位（横幅/信息流/暂停覆盖层）
 * @ad-type adBadge         广告标识角标
 * @ad-type adSdk           广告 SDK 请求（配置层 reject）
 *
 * @target huangguoai.com   HTML 页面响应
 */

(function () {
  var body = $response.body;
  if (!body || typeof body !== "string") {
    $done({});
    return;
  }

  // 仅处理 HTML 页面，JSON/JS/图片等透传
  if (body.indexOf("<!DOCTYPE") < 0 && body.indexOf("<html") < 0) {
    $done({});
    return;
  }

  var modified = false;

  // playAd：播放页跳转广告
  // videoInitialData.playAd = { id, url, intervalSec }
  // 置 null 后点击播放器直接播放，不再跳转外部广告页
  body = body.replace(
    /"playAd":\s*\{[^}]*\}/g,
    function () {
      modified = true;
      return '"playAd":null';
    }
  );

  // prerollAd：播放前贴片视频广告
  // videoInitialData.prerollAd = { id, url, ... }
  // 置 null 后跳过贴片，直接进入正片
  body = body.replace(
    /"prerollAd":\s*\{[^}]*\}/g,
    function () {
      modified = true;
      return '"prerollAd":null';
    }
  );

  // heroSlides：首页轮播广告
  // <script data-hero-slides> 内 JSON 数组，过滤 isAd === true 的项
  var heroRegex = /(<script[^>]*data-hero-slides[^>]*>)([\s\S]*?)(<\/script>)/;
  var heroMatch = body.match(heroRegex);
  if (heroMatch) {
    try {
      var slides = JSON.parse(heroMatch[2]);
      var filtered = [];
      for (var i = 0; i < slides.length; i++) {
        if (!slides[i].isAd) filtered.push(slides[i]);
      }
      if (filtered.length !== slides.length) {
        body = body.replace(
          heroMatch[0],
          heroMatch[1] + JSON.stringify(filtered) + heroMatch[3]
        );
        modified = true;
      }
    } catch (e) {
      // JSON 解析失败，跳过
    }
  }

  // CSS 注入：隐藏剩余广告 DOM
  // [data-ssp-slot-key]         SSP 广告位容器（横幅/信息流/暂停覆盖层）
  // [data-hero-adbadge]         轮播广告"广告"角标
  // .hg-hero__ad-badge          同上兜底
  // .dx-ov-plugin               播放器覆盖层广告插件
  // .hg-hero__cover-link[...]   轮播广告封面链接
  var css =
    '<style id="hg-ad-block">' +
    "[data-ssp-slot-key]{display:none!important}" +
    "[data-hero-adbadge]{display:none!important}" +
    ".hg-hero__ad-badge{display:none!important}" +
    ".dx-ov-plugin{display:none!important}" +
    ".hg-hero__cover-link[data-hero-ad-id]{display:none!important}" +
    "</style>";
  if (body.indexOf("hg-ad-block") < 0 && body.indexOf("</head>") >= 0) {
    body = body.replace("</head>", css + "</head>");
    modified = true;
  }

  if (modified) {
    $done({ body: body });
  } else {
    $done({});
  }
})();
