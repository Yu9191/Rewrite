# 妻友社区重写脚本

VIP 解锁 + 去广告 + 完整 m3u8 + 第三方播放器跳转。Surge / Loon / Stash / Quantumult X 通用。

---

## 订阅地址

**Surge / Egern**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/qiyoushe/modules/qiyoushequ.sgmodule

**Quantumult X**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/qiyoushe/modules/qiyoushequ.conf

**Loon**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/qiyoushe/modules/qiyoushequ.lpx

**BoxJS 配置面板**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/pear.boxjs.json

> Stash / Shadowrocket 等：用 [Script-Hub](https://github.com/Script-Hub-Org/Script-Hub) 把 `.sgmodule` 转换后订阅。

---

<details>
<summary><b>功能</b></summary>

- VIP 视频解锁：`/api/app/media/play` 解密后修改 `playable / isBuy / payType / preTime / price`
- 个人中心会员显示：`/api/app/user/info` 与 `/api/app/login/guest` 修改 `normalVip / supremeVip / darkVip / liveVip / showCardName / showCardExpiredAt`
- 完整 m3u8：根据 `mediaInfo.videoUrl` 生成 `/api/app/media/h5/m3u8/...` 签名地址
- 播放器跳转：播放页可推送系统通知并调起第三方播放器；关闭后不通知、不跳转
- 去广告：清空 `ping/config` 中的启动广告、弹窗、banner、播放页广告、我的页广告、公告等全局广告配置
- 去广告：清空 `card/promotion`、`card/list`、`card/advance/status` 等推广卡片接口
- 列表免费标记：`media/home`、`media/short/hot` 中的视频统一标记免费/已购买

</details>

<details>
<summary><b>BoxJS 配置项</b></summary>

| Key | 含义 |
| --- | --- |
| `qiyou_player_select` | 播放器代号（lenna / Infuse / custom 等） |
| `qiyou_custom_scheme` | 自定义 scheme（player=custom 时生效） |
| `qiyou_url_encode` | URL 编码：`yes` / `no` / 留空（按播放器默认） |
| `qiyou_player_jump` | 播放器跳转：`yes` / `no`，默认 `yes`；`no` 表示不通知、不跳转 |
| `qiyou_log_level` | 日志级别：`off` / `error` / `warn` / `info` / `debug` / `all` |

支持播放器：lenna / SenPlayer / SenPlayer-dl / Infuse / Fileball / VidHub / IINA / NPlayer / Alook / VLC / KMPlayer / Safari

</details>

<details>
<summary><b>项目结构</b></summary>

```text
qiyoushe/
├── package.json
├── rollup.config.js
├── src/
│   ├── qiyoushequ.js      入口
│   ├── config/            常量（加密参数 / BoxJS keys / 播放器映射）
│   ├── utils/             通用工具（加解密 / 签名 / 通知 / 播放器）
│   ├── handlers/          一个接口一个文件
│   └── process/           请求 / 响应路由
├── dist/qiyoushequ.js     rollup 打包产物
└── modules/               各平台模块文件
```

</details>

<details>
<summary><b>本地构建</b></summary>

```bash
npm install
npm run build
```

产物 `dist/qiyoushequ.js` 直接被 `script-path` 引用：

```text
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/qiyoushe/dist/qiyoushequ.js
```

</details>

<details>
<summary><b>二次开发</b></summary>

- 改加密参数：`src/config/index.mjs` 的 `CRYPTO`
- 新增接口：`src/handlers/` 加文件 → `src/process/Response.mjs` 的 `pickHandler` 注册 → 三个模块的 URL pattern 加路径
- 新增播放器：`src/config/index.mjs` 的 `PLAYER_MAP` 加一项

</details>
