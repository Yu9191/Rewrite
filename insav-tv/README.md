# insav 重写脚本

VIP 解锁 + 去广告 + getVideoUrl Token 替换 + 第三方播放器跳转。
基于 `script-analyze-echo-response` 模式（Surge / Loon / Stash / Quantumult X 通用）。

## 订阅地址

### Surge / Egern 模块

```
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/modules/insav.sgmodule
```

### Quantumult X 远程重写

```
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/modules/insav.conf
```

### Loon 插件

```
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/modules/insav.lpx
```

### 其他平台（Stash / Shadowrocket 等）

请用 [Script-Hub](https://github.com/Script-Hub-Org/Script-Hub) 把上面的 `.sgmodule` 转换为目标平台格式后订阅。

### BoxJS 订阅（三端通用配置面板）

```
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/pear.boxjs.json
```


## 目录结构

```
insav/
├── package.json
├── rollup.config.js
├── src/
│   ├── insav.js                 入口：Request → fetch → Response → done
│   ├── config/
│   │   └── index.mjs            常量：加密参数 / BoxJS keys / 播放器映射 / 白名单
│   ├── utils/
│   │   ├── crypto.mjs           AES-CBC 加解密 + MD5 签名 + safeJson
│   │   ├── headers.mjs          Accept-Encoding 去 zstd / 删 ip 参数
│   │   ├── settings.mjs         BoxJS + $argument → 最终用户配置
│   │   ├── player.mjs           播放器 scheme 选择 + 跳转 URL 构建
│   │   ├── notify.mjs           通知去重（同一视频只推一次）
│   │   ├── videoCache.mjs       /api/video/info → getVideoUrl 跨请求元数据缓存
│   │   └── token.mjs            远端共享 Token 拉取 + 续期检测
│   ├── handlers/
│   │   ├── extendLists.mjs      /api/extend/lists      清启动广告
│   │   ├── bannerLists.mjs      /api/banner/lists      清推广 banner，保留女优页内链
│   │   ├── configLists.mjs      /api/config/lists      清视频/暂停广告配置
│   │   ├── configLinks.mjs      /api/config/links      仅保留白名单入口
│   │   ├── noticeLists.mjs      /api/notice/lists      清公告
│   │   ├── userVip.mjs          /api/user/{info,login,getVipStatus}  解锁 VIP
│   │   ├── videoInfo.mjs        /api/video/info        旁路缓存视频元数据
│   │   └── videoUrl.mjs         /api/video/getVideoUrl 解密+跳转通知（标题/标签/女优）
│   └── process/
│       ├── Request.mjs          请求路由：去 zstd / Token 替换
│       └── Response.mjs         响应路由：URL → handler → 解密-改写-再加密
├── dist/
│   └── insav.js                 rollup 打包产物（生产用）
└── modules/                     各平台模块文件（直接导入使用）
    ├── insav.sgmodule           Surge
    ├── insav.conf               Quantumult X
    └── insav.lpx                Loon
```

## 构建

```bash
npm install
npm run build      # 产出 dist/insav.js
npm run build:watch
```

## 引用方式

直接用 `modules/` 下的模块文件导入对应代理工具，或自行写规则指向：

```
https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insav-tv/dist/insav.js
```

### Surge

导入 [`modules/insav.sgmodule`](./modules/insav.sgmodule)。

### Quantumult X

导入 [`modules/insav.conf`](./modules/insav.conf)。

### Loon

导入 [`modules/insav.lpx`](./modules/insav.lpx)。

## BoxJS 配置

| Key                     | 含义                                              |
| ----------------------- | ------------------------------------------------- |
| `insav_player_select`   | 播放器代号（`lenna` / `Infuse` / `custom` 等）    |
| `insav_custom_scheme`   | 自定义 scheme（仅在 player=custom 时生效）       |
| `insav_url_encode`      | URL 编码强制开关：`yes` / `no` / 留空（按播放器默认）|

支持播放器：lenna / SenPlayer / SenPlayer-dl / Infuse / Fileball / VidHub / IINA / NPlayer / Alook / VLC / KMPlayer / Safari。

## 维护要点

- 加密参数：`src/config/index.mjs` 的 `CRYPTO`
- 新增接口处理：在 `src/handlers/` 新建文件 → 在 `src/process/Response.mjs` 的 `pickHandler` 注册
- 播放器扩展：`src/config/index.mjs` 的 `PLAYER_MAP` 加一项即可
- Token 源：`src/config/index.mjs` 的 `TOKEN_URL`
