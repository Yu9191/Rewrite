# porntube VIP 解锁

API 解密改写 + 前端伪登录 + 去广告。Surge / Loon / Stash / Quantumult X 通用。

支持 porntube.cool 及同源 91porn family 共 40+ 域名，包括 `porntube.*`、`91porn.*`、`91zpc.*`、`xchina.*`、`chineseselfie.*` 等（前端 `main.*.js` 里 `F.app == "..."` 分支命中的所有站点；接入 `v2.*` CDN 池的同源站点都生效）。完整清单见下方折叠块。

---

## 订阅地址

**Surge / Egern**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/porntube/modules/porntube.sgmodule

**Quantumult X**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/porntube/modules/porntube.conf

**Loon**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/porntube/modules/porntube.lpx

> Stash / Shadowrocket 等：用 [Script-Hub](https://github.com/Script-Hub-Org/Script-Hub) 把 `.sgmodule` 转换后订阅。

---

<details>
<summary><b>功能</b></summary>

- VIP 视频解锁：拦截 `/sevenVideos/<id>`，把 `views` 置 0、`videoType=cvideo` 改为 `tvideo`，绕过 VIP 弹窗与 120 秒预览限制
- 完整 m3u8：后端不校验登录态，所有线路返回的 m3u8 都可直接播放
- 列表 / 相关视频清理：清掉列表项里的 `cvideo / isPaid / premium` 标记
- 去广告：清空 `/getAdsList` 所有条目，前端广告位变空
- 重定向白名单清理：从 `/getWhitelist` 删除 `redirect_ / ad_ / popup_ / banner` 等推广跳转项
- 用户提权：`/sevenVideoUserSH` 等接口的 `activeUntil` 推到 2100，`isPremium / vip / premium` 置 true
- 前端伪登录：注入伪 `SevenVideoUser` localStorage，解决高速线路按钮无法切换、顶部「立刻开启 VIP 会员体验」横幅、每日 5 次试看上限三个前端拦截

</details>

<details>
<summary><b>支持站点完整清单</b></summary>

依据：从前端 `main.*.js` 里 grep 出所有 `F.app == "..."` 分支命中的域名。

```text
porntube.cool / porntube.fit / porntube.site / porntube.store
91porn.coach / 91porn.top / 91porn.band / 91porn.name / 91porn.plus / 91porn.porn / 91porn.red / 91porn.sex
91pornny.com / 91.wtf / 91forum.com / 91dabiaojie.com
91zpc.app / 91zpc.pro / 91zpc.org / 91zpc.co / 91zpcs.com
chineseselfie.com / chineseselfie.net / chineseselfie.org
xchina.day / xchina.cloud / xchina.plus / xchina.tube / xchina.cool / xchina.red
xasian.org / theporny.com / madoumedia.org
1024videos.com / 1024movies.com
bdsmzoo.com / pornshop.one / pilipili.cool / dsdav.net
x91.club / x91porn.com
chinesebdsm.* (前端用 includes 匹配前缀)
```

</details>

<details>
<summary><b>BoxJS 配置项</b></summary>

BoxJS 订阅链接：

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/pear.boxjs.json

| Key | 含义 |
| --- | --- |
| `porntube_log_level` | 日志级别：`off` / `error` / `warn` / `info` / `debug` / `all` |

> Quantumult X / Snippet 用户的日志级别 **只能走 BoxJS 设置**（rewrite_local 段不支持 argument）。Surge / Loon 既可以在模块的 `arguments` 里改，也可以走 BoxJS。

</details>

<details>
<summary><b>项目结构</b></summary>

```text
porntube/
├── package.json
├── rollup.config.js
├── src/
│   ├── porntube.js        入口（rollup 打包到 dist/porntube.js）
│   ├── frontend.js        前端注入脚本（直接复制到 dist/porntube-frontend.js）
│   ├── config/            常量（加密参数 / CDN 池 / BoxJS keys）
│   ├── utils/             加解密 / headers / settings
│   ├── handlers/          一个接口一个文件
│   └── process/           请求 / 响应路由
├── dist/
│   ├── porntube.js              ~87KB，含 CryptoJS，跑在代理脚本里
│   └── porntube-frontend.js     ~3KB，浏览器自己从 CDN 拉 CryptoJS
└── modules/               各平台模块文件（一份订阅，两条 Script 规则）
```

</details>

<details>
<summary><b>本地构建</b></summary>

```bash
npm install
npm run build
```

产物 `dist/porntube.js` 与 `dist/porntube-frontend.js` 直接被 `script-path` 引用：

```text
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/porntube/dist/porntube.js
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/porntube/dist/porntube-frontend.js
```

</details>

<details>
<summary><b>二次开发</b></summary>

- 改加密密码：`src/config/index.mjs` 的 `CRYPTO.secret`（API） / `src/frontend.js` 的 `SECRET`（前端 Storage）
- 新增接口：`src/handlers/` 加文件 → `src/process/Response.mjs` 的 `pickHandler` 注册 → 模块 URL pattern 加路径
- 新增 CDN 域名：`src/config/index.mjs` 的 `API_HOSTS` + 模块 hostname + pattern
- 改伪登录账号：`src/frontend.js` 的 `userObj`

</details>
