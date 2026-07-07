# insav 重写脚本

VIP 解锁 + 去广告 + 第三方播放器跳转。Surge / Loon / Stash / Quantumult X 通用。

---

## 订阅地址

**Surge / Egern**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/modules/insav.sgmodule

**Quantumult X**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/modules/insav.conf

**Loon**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/modules/insav.lpx

**BoxJS 配置面板**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/pear.boxjs.json

> Stash / Shadowrocket 等：用 [Script-Hub](https://github.com/Script-Hub-Org/Script-Hub) 把 `.sgmodule` 转换后订阅。

---

<details>
<summary><b>功能</b></summary>

- VIP 解锁
- 去广告（启动 / 视频 / 暂停 / 公告 / banner）
- Token 自动替换 + 续期提醒
- 播放页推送系统通知，点击直接调起第三方播放器

</details>

<details>
<summary><b>BoxJS 配置项</b></summary>

| Key | 含义 |
| --- | --- |
| `insav_player_select` | 播放器代号（lenna / Infuse / custom 等） |
| `insav_custom_scheme` | 自定义 scheme（player=custom 时生效） |
| `insav_url_encode` | URL 编码：`yes` / `no` / 留空（按播放器默认） |

支持播放器：lenna / SenPlayer / SenPlayer-dl / Infuse / Fileball / VidHub / IINA / NPlayer / Alook / VLC / KMPlayer / Safari

</details>

<details>
<summary><b>项目结构</b></summary>

```
insav-tv/
├── package.json
├── rollup.config.js
├── src/
│   ├── insav.js          入口
│   ├── config/           常量（加密参数 / BoxJS keys / 播放器映射 / 白名单）
│   ├── utils/            通用工具（加解密 / 签名 / 通知 / 缓存 / Token）
│   ├── handlers/         一个接口一个文件
│   └── process/          请求 / 响应路由
├── dist/insav.js         rollup 打包产物
└── modules/              各平台模块文件
```

</details>

<details>
<summary><b>本地构建</b></summary>

```bash
npm install
npm run build
```

产物 `dist/insav.js` 直接被 `script-path` 引用：

```
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/dist/insav.js
```

</details>

<details>
<summary><b>二次开发</b></summary>

- 改加密参数：`src/config/index.mjs` 的 `CRYPTO`
- 新增接口：`src/handlers/` 加文件 → `src/process/Response.mjs` 的 `pickHandler` 注册 → 三个模块的 URL pattern 加路径
- 新增播放器：`src/config/index.mjs` 的 `PLAYER_MAP` 加一项

</details>
