# 洛丽塔 重写脚本

VIP 解锁 + 付费内容解锁 + 去广告 + 第三方播放器跳转。Surge / Loon / Stash / Quantumult X 通用。

---

## 订阅地址

**Surge / Egern**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/modules/luolita.sgmodule

**Quantumult X**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/modules/luolita.conf

**Loon**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/modules/luolita.lpx

**BoxJS 配置面板**

https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/luolita.boxjs.json

> Stash / Shadowrocket 等：用 [Script-Hub](https://github.com/Script-Hub-Org/Script-Hub) 把 `.sgmodule` 转换后订阅。
>
> 导入后请开启对应工具的 MITM 解密，并信任 / 安装 CA 证书。

---

<details>
<summary><b>功能</b></summary>

- VIP 解锁（个人信息升级 VIP，观看配额拉满）
- 付费内容解锁（视频 / 图集 / 短剧 / 小说 / 音频 / 社区 / 种子等免金币）
- 去广告（开屏 / 弹窗 / 悬浮 / 信息流 / banner / 跑马灯 / 聊天广告 / 促销弹窗）
- 播放页推送系统通知，点击直接调起第三方播放器

</details>

<details>
<summary><b>参数 / BoxJS 配置项</b></summary>

| Key | 含义 |
| --- | --- |
| `luolita_log_level` | 日志级别：off / error / warn / info / debug / all |
| `luolita_player_select` | 播放器代号（lenna / Infuse / custom 等） |
| `luolita_custom_scheme` | 自定义 scheme（player=custom 时生效） |
| `luolita_url_encode` | URL 编码：`yes` / `no` / 留空（按播放器默认） |
| `luolita_player_jump` | 播放器跳转：`yes` / `no`（默认 no） |
| `luolita_remove_ads` | 去广告：`yes`（默认） / `no` |

支持播放器：lenna / SenPlayer / SenPlayer-dl / Infuse / Fileball / VidHub / IINA / NPlayer / Alook / VLC / KMPlayer / Safari

</details>

> 仅供个人学习与网络调试，请勿用于非法用途。
