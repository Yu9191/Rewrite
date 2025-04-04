/* 
 * 看东方 
 * 提取会员视频 跳转浏览器HTML页面
 * 2025-04-04
 * 
[rewrite_local]
# NBA视频和电视剧
https:\/\/bp-api\.bestv\.com\.cn\/cms\/api\/(live\/studio\/id\/v4|c\/player\/common) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/KDF/video-parser.js
# HTML页面
^https:\/\/360\.com\/video url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/KDF/video-parser.js

[mitm]
hostname = 360.com, bp-api.bestv.com.cn
*/


const $originalDone = $done;
$done = (obj = {}) => {
  this.$prefs || (obj.status &&= +obj.status.match(/\b\d{3}\b/)[0]);

  $originalDone(obj);
};

// 存储工具定义
const storage = {
  get: this.$prefs?.valueForKey ?? $persistentStore.read,

  set: (key, value) =>
    (this.$prefs?.setValueForKey ?? $persistentStore.write)(value, key),
};

// 获取当前请求URL
const url = $request.url;

// 处理视频数据拦截
if (
  url.includes("/api/v1/nba/game/") ||
  url.includes("/cms/api/live/studio/id/v4") ||
  url.includes("/cms/api/c/player/common")
) {
  handleVideoData();
}
// 处理自定义HTML页面请求
else if (url.includes("360.com/video")) {
  renderVideoPage();
} else {
  $done({});
}

// 处理视频数据函数
function handleVideoData() {
  try {
    // 解析API返回的JSON数据
    const body = JSON.parse($response.body);

    // 检测内容类型
    if (body.dt && body.dt.liveStudioStreamRelVoList) {
      // NBA内容处理逻辑
      handleNBAContent(body.dt);
    } else if (body.dt && body.dt.medias) {
      // 电视剧内容处理逻辑
      handleTVContent(body.dt);
    } else {
      console.log("未知内容类型");
      $done({});
    }
  } catch (error) {
    console.log("处理视频数据出错: " + error);
    $done({});
  }
}

// 处理NBA内容
function handleNBAContent(gameData) {
  // 存储基本信息
  storage.set("content_type", "nba");
  storage.set("nba_game_title", gameData.title);
  storage.set("nba_game_description", gameData.description || "");
  storage.set("nba_game_cover", gameData.sourceCover);
  storage.set(
    "nba_game_backgroundCover",
    gameData.backgroundCover || gameData.sourceCover
  );

  // 存储视频流数据
  const streams = gameData.liveStudioStreamRelVoList || [];
  storage.set("nba_streams_count", streams.length.toString());

  // 循环保存每个视频流的信息
  streams.forEach((stream, index) => {
    const streamKey = `nba_stream_${index}`;
    storage.set(
      streamKey,
      JSON.stringify({
        title: stream.title,
        cover: stream.cover,
        canSee: stream.canSee,
        qualitys: stream.qualitys,
      })
    );
  });

  // 存储其他标签数据（数据/专家/赛程等）
  if (gameData.studioTabVoList) {
    storage.set("nba_tabs", JSON.stringify(gameData.studioTabVoList));
  }

  // 发送通知
  sendNotification(gameData.title, "NBA比赛");

  // 返回原始数据不变
  $done({});
}

// 处理电视剧内容
function handleTVContent(tvData) {
  // 存储基本信息
  storage.set("content_type", "tv");
  storage.set("tv_title", tvData.currentMedias.contentName || "");
  storage.set("tv_cover", tvData.currentMedias.mediaCover || "");
  storage.set("tv_description", tvData.currentMedias.shareDesc || "");
  storage.set("tv_current_episode", tvData.currentMedias.episodeNumber || 1);

  // 存储当前集信息
  storage.set("tv_current_media", JSON.stringify(tvData.currentMedias));

  // 存储剧集信息
  if (tvData.medias && tvData.medias.data) {
    storage.set("tv_episodes_count", tvData.medias.data.length.toString());

    tvData.medias.data.forEach((episode, index) => {
      const episodeKey = `tv_episode_${index}`;
      storage.set(
        episodeKey,
        JSON.stringify({
          titleId: episode.titleId,
          title: episode.mediaName,
          subTitle: episode.mediaSubTitle,
          cover: episode.mediaCover,
          episodeNumber: episode.episodeNumber,
          duration: episode.duration,
        })
      );
    });
  }

  // 发送通知
  sendNotification(tvData.currentMedias.contentName, "电视剧");

  $done({});
}

// 发送通知函数
function sendNotification(title, type) {
  const url = "https://360.com/video";

  (this.$notify ?? $notification.post)(
    title,
    "",
    type === "NBA比赛" ? "点击查看比赛直播和集锦" : "点击查看剧集",
    {
      "open-url": url,
       openUrl: url,
       url,
    }
  );
}

// 渲染视频页面
function renderVideoPage() {
  try {
    // 获取内容类型
    const contentType = storage.get("content_type") || "nba";

    if (contentType === "nba") {
      renderNBAPage();
    } else if (contentType === "tv") {
      renderTVPage();
    } else {
      throw new Error("未知内容类型");
    }
  } catch (error) {
    // 错误处理
    $done({
      status: "HTTP/1.1 500 Internal Server Error",
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: `<html><body><h1>发生错误</h1><p>${error}</p></body></html>`,
    });
  }
}

// 渲染NBA页面
function renderNBAPage() {
  // 获取存储的数据
  const title = storage.get("nba_game_title") || "NBA 比赛";
  const description = storage.get("nba_game_description") || "";
  const cover = storage.get("nba_game_cover") || "";
  const backgroundCover = storage.get("nba_game_backgroundCover") || cover;
  const streamsCount = parseInt(storage.get("nba_streams_count") || "0");
  const tabsData = JSON.parse(storage.get("nba_tabs") || "[]");

  // 构建视频流HTML
  let streamsHTML = "";
  for (let i = 0; i < streamsCount; i++) {
    const streamKey = `nba_stream_${i}`;
    const streamData = storage.get(streamKey);

    if (streamData) {
      const stream = JSON.parse(streamData);

      // 为每个质量选项构建按钮
      let qualityBtns = "";
      if (stream.qualitys && stream.qualitys.length > 0) {
        qualityBtns = stream.qualitys
          .map(
            (q) =>
              `<a href="${q.qualityUrl}" class="quality-btn" target="_blank">${q.qualityShortName}</a>`
          )
          .join("");
      }

      // 对于需要会员的视频，添加标签
      const vipBadge = !stream.canSee
        ? '<span class="vip-badge">会员</span>'
        : "";

      // 构建单个视频项目的HTML
      streamsHTML += `
            <div class="video-item ${!stream.canSee ? "vip-content" : ""}">
                <div class="video-thumbnail">
                    <img src="${stream.cover}" alt="${
        stream.title
      }" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTAwIDE1MCIgZmlsbD0iIzMzMyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2FhYSI+无封面</dGV4dD48L3N2Zz4=';">
                    ${vipBadge}
                </div>
                <h3>${stream.title}</h3>
                <div class="quality-options">
                    ${qualityBtns}
                </div>
            </div>
            `;
    }
  }

  // 构建标签页HTML
  let tabsHTML = "";
  tabsData.forEach((tab) => {
    if (tab.address) {
      tabsHTML += `<a href="${tab.address}" class="tab-btn" target="_blank">${tab.name}</a>`;
    }
  });

  // 完整的HTML页面
  const html = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>${title}</title>
        <style>
            ${getCommonStyles()}
            
            /* NBA特有样式 */
            .videos-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 15px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <!-- 顶部背景区域 -->
        <div class="header">
            <div class="header-bg" style="background-image: url('${backgroundCover}');"></div>
            <div class="header-overlay"></div>
            <div class="header-content">
                <h1>${title}</h1>
                ${
                  description ? `<p class="description">${description}</p>` : ""
                }
            </div>
        </div>
        
        <!-- 导航标签区域 -->
        ${
          tabsData.length > 0
            ? `
        <div class="tabs">
            ${tabsHTML}
        </div>
        `
            : ""
        }
        
        <!-- 视频内容区域 -->
        <div class="container">
            <h2 class="section-title">比赛视频</h2>
            <div class="videos-grid">
                ${streamsHTML}
            </div>
        </div>
    </body>
    </html>
    `;

  // 返回HTML页面
  $done({
    status: "HTTP/1.1 200 OK",
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: html,
  });
}

// 渲染电视剧页面
function renderTVPage() {
  // 获取存储的数据
  const title = storage.get("tv_title") || "电视剧";
  const description = storage.get("tv_description") || "";
  const cover = storage.get("tv_cover") || "";
  const currentEpisode = parseInt(storage.get("tv_current_episode") || "1");
  const episodesCount = parseInt(storage.get("tv_episodes_count") || "0");
  const currentMedia = JSON.parse(storage.get("tv_current_media") || "{}");

  // 构建剧集HTML
  let episodesHTML = "";
  for (let i = 0; i < episodesCount; i++) {
    const episodeKey = `tv_episode_${i}`;
    const episodeData = storage.get(episodeKey);

    if (episodeData) {
      const episode = JSON.parse(episodeData);

      const isActive = episode.episodeNumber === currentEpisode;

      // 构建单个剧集的HTML
      episodesHTML += `
            <div class="episode-item ${isActive ? "active" : ""}">
                <div class="episode-thumbnail">
                    <img src="${episode.cover}" alt="${
        episode.title
      }" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTAwIDE1MCIgZmlsbD0iIzMzMyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiMyMjIiLz48dGV4dCB4PSI1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2FhYSI+无封面</dGV4dD48L3N2Zz4=';">
                </div>
                <h3>${episode.title}</h3>
                <p class="subtitle">${episode.subTitle}</p>
            </div>
            `;
    }
  }

  // 构建当前集的质量选择
  let qualityBtns = "";
  if (currentMedia.qualitys && currentMedia.qualitys.length > 0) {
    qualityBtns = currentMedia.qualitys
      .map(
        (q) =>
          `<a href="${q.qualityUrl}" class="quality-btn" target="_blank">${q.qualityShortName}</a>`
      )
      .join("");
  }

  // 完整的HTML页面
  const html = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>${title}</title>
        <style>
            ${getCommonStyles()}
            
            /* 电视剧特有样式 */
            .episodes-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            
            .episode-item {
                position: relative;
                background: var(--card-bg);
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.2s;
                padding-bottom: 10px;
                cursor: pointer;
            }
            
            .episode-item.active {
                border: 2px solid var(--primary-color);
            }
            
            .episode-item:hover {
                transform: translateY(-5px);
            }
            
            .episode-thumbnail {
                position: relative;
                width: 100%;
                padding-top: 56.25%;
                overflow: hidden;
            }
            
            .episode-thumbnail img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .subtitle {
                color: #aaa;
                font-size: 12px;
                margin: 0 10px 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 32px;
            }
            
            .current-episode {
                padding: 20px;
                background: rgba(26, 26, 26, 0.6);
                border-radius: 10px;
                margin-bottom: 30px;
            }
            
            .current-episode h2 {
                color: var(--primary-color);
                margin-top: 0;
            }
            
            .current-episode p {
                color: #ddd;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <!-- 顶部背景区域 -->
        <div class="header">
            <div class="header-bg" style="background-image: url('${cover}');"></div>
            <div class="header-overlay"></div>
            <div class="header-content">
                <h1>${title}</h1>
                ${
                  description ? `<p class="description">${description}</p>` : ""
                }
            </div>
        </div>
        
        <!-- 当前剧集区域 -->
        <div class="container">
            <div class="current-episode">
                <h2>${currentMedia.mediaName || ""} - ${
    currentMedia.mediaSubTitle || ""
  }</h2>
                <p>选择清晰度:</p>
                <div class="quality-options">
                    ${qualityBtns}
                </div>
            </div>
            
            <h2 class="section-title">全部剧集</h2>
            <div class="episodes-grid">
                ${episodesHTML}
            </div>
        </div>
    </body>
    </html>
    `;

  // 返回HTML页面
  $done({
    status: "HTTP/1.1 200 OK",
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: html,
  });
}

// 获取通用样式
function getCommonStyles() {
  return `
    /* 全局样式 */
    :root {
        --primary-color: #f39c12;
        --bg-color: #0c0c0c;
        --card-bg: #1a1a1a;
        --text-color: #fff;
        --secondary-bg: #333;
        --hover-bg: #555;
    }
    
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: var(--bg-color);
        color: var(--text-color);
        line-height: 1.5;
    }
    
    /* 顶部区域 */
    .header {
        position: relative;
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 20px;
    }
    
    .header-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        filter: blur(2px);
        z-index: 1;
    }
    
    .header-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8));
        z-index: 2;
    }
    
    .header-content {
        position: relative;
        z-index: 3;
        width: 100%;
        max-width: 800px;
    }
    
    h1 {
        margin: 0 0 10px;
        font-size: 24px;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    .description {
        margin: 0;
        font-size: 16px;
        opacity: 0.8;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
    
    /* 标签区域 */
    .tabs {
        display: flex;
        overflow-x: auto;
        padding: 15px;
        background: rgba(26, 26, 26, 0.8);
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        position: sticky;
        top: 0;
        z-index: 10;
    }
    
    .tabs::-webkit-scrollbar {
        display: none;
    }
    
    .tab-btn {
        flex: 0 0 auto;
        padding: 10px 20px;
        margin-right: 10px;
        background-color: var(--secondary-bg);
        color: var(--text-color);
        text-decoration: none;
        border-radius: 5px;
        white-space: nowrap;
        font-size: 14px;
        transition: background-color 0.2s;
    }
    
    .tab-btn:hover, .tab-btn:active {
        background-color: var(--hover-bg);
    }
    
    /* 内容区域 */
    .container {
        padding: 15px;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .section-title {
        margin: 0 0 20px;
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-color);
        text-align: center;
    }
    
    /* 视频项目样式 */
    .video-item {
        position: relative;
        background: var(--card-bg);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .video-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 7px 10px rgba(0,0,0,0.2);
    }
    
    .video-thumbnail {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 宽高比 */
        overflow: hidden;
    }
    
    .video-thumbnail img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    /* 会员标记 */
    .vip-badge {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: var(--primary-color);
        color: white;
        font-size: 12px;
        padding: 3px 6px;
        border-radius: 3px;
        font-weight: bold;
        z-index: 2;
    }
    
    .vip-content {
        position: relative;
    }
    
    .vip-content::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1;
        pointer-events: none;
    }
    
    /* 视频标题和画质选择 */
    .video-item h3 {
        margin: 10px;
        font-size: 14px;
        height: 40px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .quality-options {
        display: flex;
        justify-content: space-around;
        padding: 0 10px 10px;
        gap: 5px;
    }
    
    .quality-btn {
        flex: 1;
        display: inline-block;
        padding: 6px 0;
        background: var(--secondary-bg);
        color: var(--text-color);
        text-align: center;
        text-decoration: none;
        border-radius: 4px;
        font-size: 12px;
        transition: background 0.2s;
    }
    
    .quality-btn:hover, .quality-btn:active {
        background: var(--hover-bg);
    }
    
    /* 移动端优化 */
    @media (max-width: 600px) {
        .videos-grid, .episodes-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .header {
            height: 150px;
        }
        
        h1 {
            font-size: 20px;
        }
    }
    `;
}
