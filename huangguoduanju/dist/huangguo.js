/**
 * 黄果短剧去广告
 * 支持 Surge / Loon / Quantumult X / Stash
 *
 * 去除内容：
 * - 播放页跳转广告 (playAd)
 * - 播放前贴片广告 (prerollAd)
 * - 首页轮播广告 (hero slides isAd)
 * - SSP 广告位 (data-ssp-slot-key)
 * - 广告标识 (data-hero-adbadge)
 */
(function () {
  var body = $response.body;
  if (!body || typeof body !== "string") {
    $done({});
    return;
  }

  // 只处理 HTML 页面
  if (body.indexOf("<!DOCTYPE") < 0 && body.indexOf("<html") < 0) {
    $done({});
    return;
  }

  var modified = false;

  // 1. 清空 playAd（播放页跳转广告）
  body = body.replace(
    /"playAd":\s*\{[^}]*\}/g,
    function () {
      modified = true;
      return '"playAd":null';
    }
  );

  // 2. 清空 prerollAd（播放前贴片广告）
  body = body.replace(
    /"prerollAd":\s*\{[^}]*\}/g,
    function () {
      modified = true;
      return '"prerollAd":null';
    }
  );

  // 3. 过滤 hero slides 里的广告项
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
    } catch (e) {}
  }

  // 4. 注入 CSS 隐藏广告元素
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
