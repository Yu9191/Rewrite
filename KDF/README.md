# 📺 看东方 NBA & 电视剧 → HTML + M3U 脚本 (v2025-04-25 r3)

这是一个用于 **看东方app 上的 NBA 比赛视频和电视剧数据转换为 HTML 页面和 M3U 播放列表（M3U8 直播源）** 的脚本，适用于 Quantumult X、Surge、Loon 等代理平台，用于网页直观查看和 IPTV 播放。

---

## 🔧 脚本功能简介

### ✅ 自动解析以下类型的内容：
- 📺 **NBA 比赛直播与回放**
- 🎬 **电视剧剧集信息与播放链接**

### ✅ 自动生成：
- 🌐 HTML 网页展示：比赛/剧集封面、标题、描述、清晰度选择等
- 🎶 M3U8 播放源（适配 IPTV 播放器）：可用于家庭媒体播放器或智能电视加载

### ✅ 支持：
- 👀 高清自动选择（优先 1080P/FHD，其次 720P）
- 📎 支持 VIP 提示和多清晰度按钮
- 📣 系统通知提示最新内容更新（NBA比赛 / 剧集）
- 🧠 本地缓存解析结果，切换页面无需重复请求
- 📝 自定义频道说明，嵌入 Telegram 订阅链接

---

## 📁 支持的请求路径说明

| 请求路径 | 功能描述 |
|----------|----------|
| `/api/v1/nba/game/` | 解析 NBA 比赛信息 |
| `/cms/api/live/studio/id/v4` | 同上，解析直播工作室数据 |
| `/cms/api/c/player/common` | 提取视频播放信息（清晰度 + 地址） |
| `https://360.com/nba.m3u` | 输出 NBA M3U 播放列表 |
| `https://360.com/dianshi.m3u` | 输出 电视剧 M3U 播放列表 |
| `https://360.com/video` | 输出内容类型对应的 HTML 网页（自动判断 NBA / TV） |

---

## 🌈 HTML 页面展示功能

### NBA 比赛页面：
- 比赛封面 & 背景图
- 比赛标题 & 描述
- 视频分组展示（每个分组含清晰度按钮）
- VIP标识与可点击播放链接
- 可复制 M3U 链接按钮

### 电视剧页面：
- 当前剧集展示（清晰度可选）
- 所有剧集封面缩略图
- 每集播放链接
- 支持自动定位当前剧集
- 可复制 M3U 链接按钮

---

## 📦 脚本结构简要说明

- `parseVideoApi()`：根据响应内容判断是 NBA 还是 TV 类型
- `handleNBA()`：提取 NBA 比赛标题、封面、播放地址等信息
- `handleTV()`：提取剧集列表、封面、当前播放链接等信息
- `renderHtml()`：渲染 HTML 页面（根据内容类型跳转）
- `buildM3U()` / `renderM3U()`：输出标准 IPTV 格式的 M3U 播放列表
- `notify()`：推送系统通知，引导访问 HTML 页面

---

## 🧪 示例演示视频

> 提示：可以自行部署或在代理平台上配置 Rewrite + Script 即可生效。

> 示例视频请参考发布频道中的 https://t.me/GithubYu9191/20746 视频预览

---

## 📜 注意事项

- 本脚本仅供学习与交流使用，请勿用于任何商业用途。
- 所有资源均来自公开接口，使用者需自行遵守相关服务条款。
- 推荐搭配 [IPTV 播放器](https://iptv-org.github.io/) 使用 M3U 地址观看。

---

## 📮 Telegram 频道

欢迎关注 Telegram 更新频道：
👉 [https://t.me/GithubYu9191](https://t.me/GithubYu9191)

---

## 🔖 License

MIT License © 2025 [MyName or GithubYu9191]
