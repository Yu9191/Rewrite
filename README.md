<div align="center">
<br>
<a href="https://github.com/Yu9191"><img width="100" src="https://github.com/Yu9191.png" alt="Yu9191" style="border-radius:50%"></a>
<br><br>

# Rewrite

**Surge / Loon / QX 脚本 & 模块合集**

<p>
  <a href="https://t.me/ios151"><img src="https://img.shields.io/badge/Telegram-@ios151-26A5E4?style=flat-square&logo=telegram&logoColor=white" /></a>
  <a href="https://t.me/Jsforbaby"><img src="https://img.shields.io/badge/Channel-@Jsforbaby-26A5E4?style=flat-square&logo=telegram&logoColor=white" /></a>
  <a href="https://github.com/Yu9191/Rewrite/stargazers"><img src="https://img.shields.io/github/stars/Yu9191/Rewrite?style=flat-square&logo=github" /></a>
  <a href="https://github.com/Yu9191/Rewrite/commits/main"><img src="https://img.shields.io/github/last-commit/Yu9191/Rewrite?style=flat-square&logo=github" /></a>
</p>
</div>

> **唯一账号声明**：只有 Telegram [@ios151](https://t.me/ios151) 为本人，其它均为冒充。

> **使用提示**：本 README 是按仓库现有目录、模块注释及各子项目 README 整理的**功能索引**，不是逐个 App 的最新版实测结果。脚本存在、README 宣称支持、实际成功运行，是三件不同的事；请以各文件注释、当前版本及实际测试为准。

## 目录

- [项目简介](#项目简介)
- [文件类型与代理平台](#文件类型与代理平台)
- [如何查找和使用脚本](#如何查找和使用脚本)
- [按功能分类索引](#按功能分类索引)
  - [视频短剧与影视](#1-视频短剧与影视)
  - [音乐直播与播放器](#2-音乐直播与播放器)
  - [学习阅读与教育](#3-学习阅读与教育)
  - [办公设计与网络工具](#4-办公设计与网络工具)
  - [自动化与辅助工具](#5-自动化与辅助工具)
  - [iTunes 与订阅合集](#6-itunes-与订阅合集)
- [安装示例](#安装示例)
- [兼容性安全及常见问题](#兼容性安全及常见问题)
- [更新与反馈](#更新与反馈)
- [免责声明](#免责声明)

## 项目简介

个人整理的 iOS 代理工具脚本仓库，主要用于 **Surge / Loon / QX（Quantumult X）** 等平台的功能增强与解锁，包含请求/响应改写、广告过滤、播放地址解析、第三方播放器跳转、定时任务及特定 App 的订阅状态处理等内容。

**脚本发布、使用说明及更新动态均在 Telegram 频道，这里主要用于代码托管。**

- 作者 Telegram：[@ios151](https://t.me/ios151)
- 更新频道：[@Jsforbaby](https://t.me/Jsforbaby)
- 代码入口：[本仓库](https://github.com/Yu9191/Rewrite)

**特别说明**：该仓库是多个独立脚本与模块的集合，**不是一个能在所有 App 上通用的“全局解锁模块”**。请按需选择对应文件，不要把所有脚本一起导入。

## 文件类型与代理平台

### 作者原有的文件类型划分

保留原 README 的四种核心后缀及其平台对应关系：

| 后缀 | 作者标注的平台 / 用途 | 使用说明 |
| --- | --- | --- |
| `.sgmodule` | **Surge** | Surge 模块；通常可在模块中订阅 |
| `.plugin` | **Loon** | Loon 插件配置 |
| `.lpx` | **Loon** | Loon 插件包/扩展格式 |
| `.js` | **脚本主体（通用）** | JavaScript 逻辑文件，**不代表可直接当作模块导入**，仍需匹配规则、脚本类型与运行环境 |

### 仓库中还能看到的文件类型

| 后缀 / 文件 | 常见用途 | 备注 |
| --- | --- | --- |
| `.conf` | Quantumult X 重写配置等 | 具体按文件内的 `[rewrite_local]`、`[mitm]` 等段落判断 |
| `.snippet` | Quantumult X / 部分适配工具的规则片段 | 按子项目 README 所写平台使用 |
| `.mjs` / `.ts` | 模块化源码、构建源码 | 多数不是终端用户直接订阅的成品 |
| `.json` | BoxJS 设置、缓存或辅助数据 | **不要直接把 JSON 当成代理模块** |
| `.md` | README、使用说明 | 阅读文档，不是可执行脚本 |
| `.txt` / `.zip` / 图片 | 规则文本、归档或静态资源 | 需按内容具体判断 |
| `.sgmodulle` | 仓库中存在的非标准后缀 | **注意拼写与 `.sgmodule` 不同**，是否能导入须手动检查或修正，不能默认兼容 |

### 平台兼容性速览

| 平台 | 建议优先选择 | 注意事项 |
| --- | --- | --- |
| Surge | `.sgmodule` | 确认模块启用、脚本权限及 MITM |
| Loon | `.lpx` 或 `.plugin` | 按插件格式导入，不直接把 JS 当插件 |
| Quantumult X | `.conf` / `.snippet` | 注意重写规则与 MITM 域名 |
| Stash | 子项目明确提供的适配文件，或转换产物 | 并非整个仓库原生支持 |
| Egern | 子项目注明可使用的 Surge 格式 | 具体功能仍需测试 |
| Shadowrocket | 项目专用配置或兼容转换产物 | 不能把所有 `.sgmodule` 视为原生兼容 |

某些子项目说明了使用 [Script-Hub](https://github.com/Script-Hub-Org/Script-Hub) 转换模块；**转换成功不等于运行成功**。请检查目标平台的脚本 API、正则规则、证书与请求/响应处理能力。

## 如何查找和使用脚本

1. **先找 App 或网站名称**：优先从下方功能索引进入对应目录，并阅读该目录的 README。
2. **再选平台文件**：Surge 优先 `.sgmodule`，Loon 优先 `.lpx`/`.plugin`，QX 优先 `.conf`/`.snippet`。
3. **遇到只有 `.js` 的项目**：阅读文件头部的 `[rewrite_local]`、`[mitm]`、`http-request`、`http-response`、`hostname` 或注释；该脚本通常还需要配套重写规则。
4. **按需启用 MITM**：只添加该模块实际要求的域名，并在对应代理工具中安装与信任其证书。
5. **单项验证**：先开启一个规则，确认请求实际命中、脚本无报错且目标功能正常，再决定是否长期使用。

> 对于功能相近的项目，优先使用**目录下配套的现成模块**，不要同时启用多个作用于同一接口的老版与新版脚本。

## 按功能分类索引

> **标注规则**：下表中的“功能”表示 **仓库 README、模块 `#!desc` 或脚本头部注释描述的目标能力**，而非实时运行验证。带“独立 README”的目录通常提供较完整的安装说明；“单脚本/模块”需自行读取配置。

### 1. 视频、短剧与影视

#### 具有独立目录或较完整说明的项目

| 项目 | 仓库声明的主要功能 | 配置/说明 |
| --- | --- | --- |
| [黄豆短剧](huangdouduanju/) | VIP 视频、完整播放、开屏/弹窗/信息流去广告 | [README](huangdouduanju/README.md) · [Surge](huangdouduanju/modules/huangdou.sgmodule) · [Loon](huangdouduanju/modules/huangdou.lpx) · [QX](huangdouduanju/huangdou.snippet) |
| [黄果短剧](huangguoduanju/) | 播放跳转广告、贴片、轮播、SSP 广告位及广告 SDK 拦截 | [README](huangguoduanju/README.md) · [Surge](huangguoduanju/modules/huangguo.sgmodule) · [Loon](huangguoduanju/modules/huangguo.lpx) · [QX](huangguoduanju/huangguo.snippet) |
| [insav](insav-tv/) | VIP、去广告、Token 管理、播放器通知跳转 | [README](insav-tv/README.md) · [Surge](insav-tv/modules/insav.sgmodule) · [Loon](insav-tv/modules/insav.lpx) · [QX](insav-tv/modules/insav.conf) |
| [妻友社区](qiyoushe/) | VIP、完整 M3U8、广告清理、可选播放器跳转 | [README](qiyoushe/README.md) · [Surge](qiyoushe/modules/qiyoushequ.sgmodule) · [Loon](qiyoushe/modules/qiyoushequ.lpx) · [QX](qiyoushe/modules/qiyoushequ.conf) |
| [洛丽塔](luolita/) | 会员与付费内容、完整视频、去广告、第三方播放器 | [README](luolita/README.md) · [Surge](luolita/modules/luolita.sgmodule) · [Loon](luolita/modules/luolita.lpx) · [QX](luolita/modules/luolita.conf) |
| [Porntube / 91porn 同源站](porntube/) | API 响应改写、前端状态处理、VIP 视频、去广告 | [README/域名列表](porntube/README.md) · [Surge](porntube/modules/porntube.sgmodule) · [Loon](porntube/modules/porntube.lpx) · [QX](porntube/modules/porntube.conf) · [Shadowrocket 专用配置](porntube/modules/porntube.shadowrocket.sgmodule) |
| [JAVHD](javhd/) | Premium、付费墙及 M3U8 广告分段处理 | [README](javhd/README.md) · [Surge](javhd/modules/javhd.sgmodule) · [Loon](javhd/modules/javhd.lpx) · [QX](javhd/modules/javhd.conf) |
| [海角](haijiao/) | 视频/附件接口、会员内容及 M3U8 处理 | [Surge](haijiao/modules/haijiao.sgmodule) · [Loon](haijiao/modules/haijiao.lpx) · [QX](haijiao/modules/haijiao.conf) |
| [幻宇星球 / 岛遇](huanyu/) | VIP 内容及资源、页面清理、域名自动发现 | [README](huanyu/README.md) · [Surge](huanyu/modules/huanyu.sgmodule) · [Loon](huanyu/modules/huanyu.lpx) · [QX](huanyu/modules/huanyu.conf) |
| [Fi11](hvvj0/) | 付费视频、列表标识与广告处理 | [README](hvvj0/README.md) · [Surge](hvvj0/fi11.sgmodule) · [Loon](hvvj0/fi11.lpx) · [QX](hvvj0/fi11.snippet) |
| [香蕉视频 xjh51](xjh51/) | 长短视频 VIP、广告清理、外部播放器 | [README](xjh51/README.md) · [Surge](xjh51/modules/xjh51.sgmodule) · [Loon](xjh51/modules/xjh51.lpx) · [QX](xjh51/modules/xjh51.conf) |
| [含羞草](Hanxiucao/) | 广告清理、播放时间限制处理 | [Surge](Hanxiucao/6lpu5.sgmodule) |
| [1808.online](1808/) | 会员视频相关响应处理 | [Surge](1808/1808.sgmodule) |
| [妻社](qishe/) | VIP 视频/帖子、去广告及用户组状态 | [Surge](qishe/qishe.sgmodule) · [Loon](qishe/qishe.plugin) · [QX](qishe/qishe.snippet) |

**Porntube 站点说明**：其 README 列有 `porntube.*`、`91porn.*`、`91zpc.*`、`xchina.*`、`chineseselfie.*`、`1024videos.com` 等多个同源域名；它们是作者列出的匹配目标，**不是所有域名当前可用的保证**，完整清单请看 [子项目 README](porntube/README.md)。

#### 其他影视、视频与播放资源脚本

| 对应内容 | 主要功能或用途（按注释/文件名整理） | 入口 |
| --- | --- | --- |
| 加藤视频 | 会员、付费视频、漫画、下载线路、去广告 | [Surge](jtsp.sgmodule) · [Loon](JTSP.plugin) |
| 面具公社 | 视频/漫画与广告接口处理 | [目录](lsp/) · [Surge](lsp/MJGS.sgmodule) |
| 65看片 | 视频详情、会员资料与预览链接处理 | [65kan.js](65kan.js) |
| 夜未央 | 视频列表和播放接口处理 | [52ywy.js](52ywy.js) |
| XV 暗网 | 会员/视频/广告响应处理 | [xv.sgmodule](xv.sgmodule) |
| 淫荡猫 | 会员信息及 M3U8 播放链接处理 | [Surge](ydm.sgmodule) · [Loon](ydm.plugin) |
| 麻豆社区 | 视频播放接口改写 | [mdsq.plugin](mdsq.plugin) |
| 套路 SM | 视频播放页面改写、播放器下载支持 | [tlsm.sgmodule](tlsm.sgmodule) |
| Pear 视频 | 播放信息解析、外部播放器与部分下载接口 | [pear.sgmodule](pear.sgmodule) · [pear.js](pear.js) |
| Top 论坛 | 视频/直播接口处理 | [TOPlt.sgmodule](TOPlt.sgmodule) |
| 汤头条 | M3U8 地址捕获/处理 | [Tangtoutiao](lsp/Tangtoutiao.sgmodule) |
| 91 暗网 | 带参数的 M3U8 链接处理 | [91anwang.sgmodule](m3u8/91anwang.sgmodule) |
| 多站点 M3U8 | 播放地址提取和通知跳转；域名可能变化 | [m3u8/README](m3u8/README.md) |

**注意**：视频类规则通常依赖具体域名、接口路径和响应结构。网站切换域名、改变签名算法或改用服务端鉴权后，脚本可能失效。

### 2. 音乐、直播与播放器

| 项目 | 仓库声明的功能/作用 | 入口 |
| --- | --- | --- |
| 酷狗音乐 | 会员状态、VIP 歌曲/音质、去广告、皮肤及 K 歌相关处理 | [KuGou.sgmodule](KuGou.sgmodule) |
| 酷我音乐 | 自动签到、金币及抽奖任务 | [KuWoTask.sgmodulle](KuWoTask.sgmodulle) · [kuwotask.js](kuwotask.js) |
| 咪咕视频 | 会员播放接口/播放地址处理 | [MGSP.sgmodule](MGSP.sgmodule) |
| 麦咭 TV | 悬浮广告与弹窗清理 | [MJTV.sgmodule](MJTV.sgmodule) |
| 人人视频 | Token / UMID 参数、外部播放器跳转 | [RRSP.sgmodule](RRSP.sgmodule) · [RRSP.lpx](RRSP.lpx) |
| 看东方 | NBA 直播/回放、电视剧数据转 HTML 与 M3U | [KDF/README](KDF/README.md) |
| Little Fox | 捕获 HLS 链接并通过通知打开 | [LittleFox.js](LittleFox.js) |
| B 站 | 扫码登录获取 Cookie，供其他每日任务脚本使用 | [BiliBili](BiliBili/) |

**B 站提示**：仓库中的 [BiliBili 工具](BiliBili/BiliBili.Modified.response.js)主要处理 Cookie 获取；其注释提到的签到、投币等任务依赖外部项目，**不要把外部项目的全部功能当作本仓库已经实现**。

### 3. 学习、阅读与教育

| 项目 | 目标能力（按脚本说明） | 入口 |
| --- | --- | --- |
| ABC Learning | 英语分级阅读内容接口 | [ABCLearning.js](ABCLearning.js) |
| BOOKR Class | 用户/儿童账户会员信息 | [BookRclass.js](BookRclass.js) |
| NB 实验室 | 会员权益接口 | [NBshiyanshi.js](NBshiyanshi.js) |
| 蓝基因医学 | 医学学习相关接口 | [lanjiyin.sgmodule](lanjiyin.sgmodule) |
| 解螺旋 | 会员、课程与培训权益 | [Jieluoxuan.js](Jieluoxuan.js) |
| 看理想 | 阅读、会员和播放 Token 接口 | [klx.sgmodule](klx.sgmodule) |
| 考试宝 | 题库、搜题、试卷与会员信息 | [kaoshibao.js](kaoshibao.js) |
| 考研数学欧几里得 | 微信小程序相关接口 | [kaoyanxcx.js](kaoyanxcx.js) |
| 快对答案 | 扫描图/答案图片请求 | [kd.sgmodule](kd.sgmodule) |
| Simply Piano / Guitar / Sing / Draw | JoyTunes 系列课程/账户接口 | [simplypiano.js](simplypiano.js) |
| 小粉笔书相关接口 | 课程、课表、标签与 VIP 状态 | [xfbs.sgmodule](xfbs.sgmodule) |

### 4. 办公、设计与网络工具

| 项目 | 目标功能 | 入口 |
| --- | --- | --- |
| Speedtest | 广告清理、会员权益显示 | [speedtest.sgmodule](speedtest.sgmodule) |
| IPPure | 节点 IP 信息、欺诈分数展示 | [IPPure.sgmodulle](IPPure.sgmodulle)（后缀非标准） |
| Telegram 跳转 | `t.me` 链接定向到 Telegram / Swiftgram / Turrit / iMe / Nicegram / Lingogram | [TgRedirect.sgmodule](TgRedirect.sgmodule) |
| CAD 快速看图 | VIP 校验接口 | [CADReader.sgmodule](CADReader.sgmodule) · [CADReader.lpx](CADReader.lpx) |
| 扫描全能王 | 会员信息/权限接口 | [CamScanner.js](CamScanner.js) |
| PDF Expert | PDF 订阅接口 | [PDFexpert.js](PDFexpert.js) |
| Documents | Documents 订阅接口 | [Documents.js](Documents.js) |
| Photoshop Express | Adobe 移动端授权信息 | [PSExpress.js](PSExpress.js) |
| Duet Display / Duet Air | 订阅凭证响应 | [DuetDisplay.js](DuetDisplay.js) |
| CARROT Weather | 订阅接口；脚本注释提示可能需已有试用或订阅 | [carrot.sgmodule](carrot.sgmodule) |
| Linearity Curve | 订阅接口 | [linearitcurve.sgmodule](linearitcurve.sgmodule) |
| Moshi | Pro 授权接口；模块注明适配版本 3.13.2 | [moshi-pro.sgmodule](moshi/moshi-pro.sgmodule) |
| LoveKey 键盘 | 聊天/开场白/超级对话与账号接口 | [lovekey.sgmodule](lovekey.sgmodule) |
| 时空壁纸 | 会员壁纸详情 | [skbz.sgmodule](skbz.sgmodule) |
| 可莉插件中心适配 | 将部分 Loon 插件适配到 Surge（需要 ScriptHub） | [pluginhub.sgmodule](pluginhub.sgmodule) |

### 5. 自动化与辅助工具

| 项目 | 功能 | 入口 |
| --- | --- | --- |
| 酷我音乐签到 | 定时签到、领金币、抽奖及通知 | [KuWoTask.sgmodulle](KuWoTask.sgmodulle) |
| AppRaven 邀请助手 | 通过定时脚本处理邀请任务；需自行确认平台规则 | [AppraveTask.sgmodule](AppraveTask.sgmodule) |
| Bilibili Cookie 工具 | 扫码登录 Cookie 获取，辅助外部任务脚本 | [BiliBiliDailyBonus.conf](BiliBili/BiliBiliDailyBonus.conf) |
| BoxJS 播放器设置 | 选择播放器、自定义 URL scheme 与编码等 | [pear.boxjs.json](pear.boxjs.json) · [boxjs.json](boxjs.json) |
| insav 邀请机器人说明 | 独立机器人使用说明，**不是可直接导入的代理模块** | [USER-GUIDE](insav/USER-GUIDE.md) |
| Trojan / Workers | 独立的协议链接生成说明和文本 | [Super/README](Super/README.md) |

### 6. iTunes 与订阅合集

这一部分需特别区分两种路径：

- **[itunes/](itunes/) 目录**：大量**按具体 App 命名的凭证响应脚本**。文件名通常表示目标 App，脚本可能匹配 Apple 的 `buy.itunes.apple.com/verifyReceipt`。
- **[iTunes.js](iTunes.js)**：根目录的 iTunes 系列合集脚本，尝试依据 `User-Agent`、`bundle_id` 等信息匹配不同应用。
- **[Revenuecat.js](Revenuecat.js)** / [Reven.sgmodule](Reven.sgmodule)：面向采用 RevenueCat 订阅服务的部分 App 的响应处理，**不能与 Apple 收据脚本视为同一机制**。

#### itunes/ 中可辨认的目标文件举例

| 类型 | 文件名举例 |
| --- | --- |
| 摄影/视频/修图 | [SnapEdit](itunes/SnapEdit.js)、[PicsLeap](itunes/PicsLeap.js)、[PicPro](itunes/PicPro.js)、[PrettyUp](itunes/PrettyUp.js)、[Retake](itunes/Retake.js)、[VLLO](itunes/vllo.js)、[Storybeat](itunes/Storybeat.js)、[3Dscanner](itunes/3Dscanner.js)、[CamTranslator](itunes/CamTranslator.js) |
| AI/创作与工具 | [Unidream](itunes/Unidream.js)、[Mindllama](itunes/Mindllama.js)、[PolyGit](itunes/PolyGit.js)、[Impresso](itunes/Impresso.js)、[chatbotai](itunes/chatbotai.js) |
| 音乐/学习 | [Songsterr](itunes/songsterr.js)、[Mondly](itunes/Mondly.js)、[OfflineMusicPlayer](itunes/OfflineMusicPlayer.js)、[Dictionary](itunes/Dictionary.js) |
| 运动/生活/效率 | [SmartGym](itunes/smartgym.js)、[ProFit](itunes/ProFit.js)、[one sec](itunes/onesec.js)、[Clipboard](itunes/Clipboard.js)、[Motivation](itunes/Motivation.js)、[StandByUs](itunes/StandByUs.js) |
| PDF/阅读 | [pdfpro](itunes/pdfpro.js)、[pdfReaderfree](itunes/pdfReaderfree.js) |

此外还有大量以拼音、缩写或中文功能命名的脚本，请直接浏览 [itunes 完整目录](itunes/)。

**重要提醒**：
- `itunes/` 下多个脚本可能同时匹配同一个 `verifyReceipt` 地址，**不适合不加筛选地一起启用**。
- 有些文件的内置 `bundle_id` 与文件名不一致，或者只是说明文本；**文件名不等于完成适配**。
- 这类脚本多为客户端响应模拟，并不能据此推断 Apple 账户或应用服务端真的拥有会员权限。
- `iTunes.js` 的原注释提示某些配置可能影响 App Store 登录；出现异常时应先禁用冲突规则。

## 安装示例

以下以已有明确 README 的模块为例。选择**一个**匹配当前代理软件的文件即可。

| 项目 | Surge | Loon | Quantumult X |
| --- | --- | --- | --- |
| 黄豆短剧 | [sgmodule](huangdouduanju/modules/huangdou.sgmodule) | [lpx](huangdouduanju/modules/huangdou.lpx) | [snippet](huangdouduanju/huangdou.snippet) |
| 黄果短剧 | [sgmodule](huangguoduanju/modules/huangguo.sgmodule) | [lpx](huangguoduanju/modules/huangguo.lpx) | [snippet](huangguoduanju/huangguo.snippet) |
| insav | [sgmodule](insav-tv/modules/insav.sgmodule) | [lpx](insav-tv/modules/insav.lpx) | [conf](insav-tv/modules/insav.conf) |
| 妻友社区 | [sgmodule](qiyoushe/modules/qiyoushequ.sgmodule) | [lpx](qiyoushe/modules/qiyoushequ.lpx) | [conf](qiyoushe/modules/qiyoushequ.conf) |
| 洛丽塔 | [sgmodule](luolita/modules/luolita.sgmodule) | [lpx](luolita/modules/luolita.lpx) | [conf](luolita/modules/luolita.conf) |
| JAVHD | [sgmodule](javhd/modules/javhd.sgmodule) | [lpx](javhd/modules/javhd.lpx) | [conf](javhd/modules/javhd.conf) |

**提示**：GitHub 相对路径用于浏览文件；需要远程订阅时，可以使用 GitHub 的 Raw 链接。例如 Surge 下的黄果短剧：

```text
https://raw.githubusercontent.com/Yu9191/Rewrite/main/huangguoduanju/modules/huangguo.sgmodule
```

其他项目把上述路径中 `main/` 后的文件路径替换为表格中的相对路径即可。部分脚本引用其他路径或第三方仓库，请以模块内容为准。

## 兼容性、安全及常见问题

<details>
<summary><strong>为什么导入了模块，但功能没有生效？</strong></summary>

- 确认模块实际启用，代理软件确实接管了目标 App 请求。
- 查看脚本/重写日志，判断 URL 是否命中。
- 检查模块声明的 MITM hostname 与证书是否正常。
- 确认当前 App 版本、站点域名和接口结构是否仍匹配。
- 先关闭相同接口的重复脚本，再逐个测试。
- 有些规则仅修改客户端显示，不保证服务端播放/下载权益。

</details>

<details>
<summary><strong>为什么不建议“整仓库一键订阅”？</strong></summary>

不同脚本可能重写同一接口，尤其是 `iTunes`、`RevenueCat` 和视频站点的多版配置。把所有脚本一起开启会增加请求冲突、维护成本及 MITM 范围，某些情况下还可能影响应用正常登录和支付流程。

</details>

<details>
<summary><strong>加密/混淆脚本、外部脚本是否有风险？</strong></summary>

仓库中既有可读源码，也有混淆脚本和引用外部地址的配置。启用任意第三方网络重写脚本前，应核对脚本来源、匹配域名、外部依赖及其能够接触的数据。涉及账户、支付、敏感资料时，尤其应坚持最小 MITM 范围。不应把“仓库能下载”理解为“已完成安全审计”。

</details>

<details>
<summary><strong>如何判断哪些内容仍在维护？</strong></summary>

优先查看子项目 README、模块内的 `#!date`/`#!desc`、Git 提交历史及作者频道。文件注释中的日期只能说明作者标注或最后一次注明的版本，不能证明目前仍有效。若只有一个陈旧的 `.js`，应视为**待验证**而不是已确认支持。

</details>

## 更新与反馈

1. 先确认问题发生在**哪一个具体文件/模块**，不要只报告“全仓库失效”。
2. 报告目标 App/站点版本、代理工具与版本、文件路径、现象及**已脱敏**的错误日志。
3. 切勿公开 Cookie、Token、账号密码、完整支付凭证、设备标识等敏感信息。
4. 发布、说明与更新动态请以作者频道 [@Jsforbaby](https://t.me/Jsforbaby) 为准；代码修改可通过 GitHub Pull Request 提交。

> 本 README 为功能导航与使用说明。**不对所有脚本的有效性、授权状态、可用期限或安全性作出承诺**。

## 免责声明

本仓库内容仅供个人学习与研究使用，请于下载后 24 小时内删除。使用者应自觉遵守当地法律法规，因使用本仓库内容导致的任何问题，作者不承担任何责任。
