# 洛丽塔 VIP 解锁 + 去广告

针对 **洛丽塔**（`p4.sbpmlenma.cc`）的代理工具重写脚本：VIP 解锁 + 付费内容解锁 + 去广告。

支持 Surge / Loon / QuantumultX / Shadowrocket / Stash 等 `script-response-body` 类工具。

## 功能

- **VIP 解锁**：个人信息升级为 VIP，观看配额拉满。
- **付费内容解锁**：视频 / 图集 / 短剧 / 小说 / 音频 / 社区 / 种子等付费内容免金币解锁。
- **去广告**：开屏、弹窗、悬浮、信息流、横幅、跑马灯、聊天广告、活动/升级促销弹窗一并清除。
- **可选播放器跳转**：视频详情弹通知，一键唤起 lenna / SenPlayer / Infuse 等外部播放器。

## 订阅链接

将下列链接导入对应工具（模块 / 重写）：

| 工具 | 链接 |
| --- | --- |
| Surge | `https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/modules/luolita.sgmodule` |
| Loon | `https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/modules/luolita.lpx` |
| QuantumultX | `https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/luolita/modules/luolita.conf` |

导入后请开启对应工具的 MITM 解密，并信任 / 安装 CA 证书。

## 参数

| 参数 | 取值 | 说明 |
| --- | --- | --- |
| `logLevel` | off/error/warn/info/debug/all | 日志级别，默认 info |
| `player` | lenna/SenPlayer/SenPlayer-dl/Infuse/Fileball/VidHub/IINA/Alook/VLC/KMPlayer/NPlayer/Safari | 跳转播放器 |
| `scheme` | 自定义 scheme | 填写后覆盖 `player` |
| `encode` | default/yes/no | 播放链接是否 URL 编码 |
| `jump` | no/yes | 是否在视频详情弹通知跳转播放器 |
| `ads` | yes/no | 是否去广告，默认 yes |

## 说明

仅供个人学习与网络调试，请勿用于非法用途。
