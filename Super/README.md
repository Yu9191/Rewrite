# Trojan

## 项目简介

**Trojan** 是一个基于 **Cloudflare Worker** 的工具，旨在为用户生成 **Trojan 协议** 的链接。用户可以通过提供自己的 `uid`，从加密的 API 获取 Trojan 服务器的相关信息，并生成带有地理位置标签的 Trojan 链接。该项目支持自定义 `uid`，并且有访问限制，只有特定的代理工具和设备才能使用。

本项目通过 **Cloudflare Workers** 实现，无需服务器即可高效运行，且支持高并发处理。

## 功能特性

- **自定义 `uid`**：用户可以在 URL 中提供自己的 `uid`，生成对应的 Trojan 链接。
- **IP 地理位置标签**：每个 Trojan 链接都会自动标记其地理位置信息（如国家和国家代码）。
- **支持的代理工具**：仅允许通过支持的代理工具（如 Quantumult, Surge, Loon, Clash, Shadowrocket）访问。
- **高效并发处理**：同时处理多个请求，并且具有自定义解密功能，保证高效的链路生成。

## 使用说明

### 1. 如何获取 `uid`

`uid` 是一个 19 位的数字，通常可以通过以下步骤在指定 App 中找到：

1. **下载并安装 App**  
   在你的设备上安装以下应用：  
   [Super](https://apps.apple.com/us/app/super-vpn-secure-vpn-master/id1490819262?l=zh-Hans-CN)

2. **注册并登录**  
   使用该 App 注册或登录账号。

3. **查找用户 ID (`uid`)**  
   在 App 的用户信息页面或其他显示账户详情的地方找到你的用户 ID。该 ID 通常是一个 19 位的数字，例如：  
   `3723507166611779090`

4. **复制 `uid`**  
   将该数字复制下来，用于生成你的 Trojan 链接。

### 2. 获取 Trojan 链接

在访问该工具时，你需要提供一个有效的 `uid` 参数。`uid` 是一个 19 位的数字，可以通过 URL 查询参数传递给 Worker。例如，假设你访问的 Worker 地址是：

[https://iuiu.lovebabyforever.workers.dev/](https://iuiu.lovebabyforever.workers.dev/)

你可以在 URL 后面添加 `uid` 参数来获取 Trojan 链接：

[https://iuiu.lovebabyforever.workers.dev/?3723507166611775488](https://iuiu.lovebabyforever.workers.dev/?3723507166611775488)

- **有效的 `uid`**：`uid` 必须是一个 19 位的数字。如果你传入无效的 `uid`，系统将会使用默认的 `uid`。
- **默认 `uid`**：如果你没有传入 `uid`，系统将使用默认的 `uid`（`888888888888888888`）。

### 3. 代理工具支持

此工具仅允许以下代理工具和设备访问：

- **Quantumult**
- **Surge**
- **Loon**
- **Clash**
- **Shadowrocket**

如果你使用的是其他代理工具或浏览器，访问将会被限制，系统会返回访问受限的页面，提示你使用支持的代理工具。

### 4. 获取 Trojan 链接格式

成功访问后，系统将返回一个B64文本，其中包含多个 **Trojan 链接**。然后你就订阅成功了。


### 5. 示例请求

以下是几种访问示例：

1. 使用默认 `uid` 访问：

   [https://iuiu.lovebabyforever.workers.dev/](https://iuiu.lovebabyforever.workers.dev/)

   这会使用默认的 `uid` 生成 Trojan 链接。

2. 使用自定义 `uid` 访问：

   [https://iuiu.lovebabyforever.workers.dev/?372350716661177999](https://iuiu.lovebabyforever.workers.dev/?372350716661177999)

   你可以在 URL 中通过查询参数 `uid` 提供一个有效的 19 位数字来生成对应的 Trojan 链接。

## 项目结构

- **`index.js`**：核心逻辑文件，包含了请求处理、数据解密、IP 位置信息获取、Trojan 链接生成等功能。
- **`worker.js`**：Cloudflare Worker 配置文件，负责监听请求并调用相应的处理函数。

## 安全性和隐私

- **敏感数据**：该项目不会保存用户的 `uid` 或其他敏感信息。所有请求均在服务器端进行处理，并且仅返回生成的 Trojan 链接。
- **IP 地址**：为了生成地理位置标签，系统会调用外部 API 获取用户的 IP 位置信息，但该信息仅用于生成标签，不会保存。

## 常见问题

### 1. 为什么我的请求被拒绝？

如果你看到访问被拒绝的页面，说明你使用的代理工具或设备不在支持列表中。请确保使用以下任意代理工具：

- Quantumult
- Surge
- Loon
- Clash
- Shadowrocket

### 2. 如何获取有效的 `uid`？

`uid` 是一个 19 位的数字，通常由特定服务提供。请按照上述步骤通过 App 获取你的 `uid`。

### 3. 请求成功后返回的B64链接格式是什么？

trojan={host}:{port}, password={uid}, over-tls=true, tls-verification=false, fast-open=false, udp-relay=false, tag={tag} 

其中，`host` 和 `port` 是解密后得到的 Trojan 服务器信息，`uid` 是你提供的用户 ID，`tag` 是根据 IP 获取的地理位置标签。

## Me

本项目采用 **Cloudflare Worke** 开源，免责声明如下
 1.用户必须在所有复制和分发的版本中保留脚本的原始版权声明。
 2.本脚本仅用于学习与研究，不得用于任何商业用途。
 3.作者对使用本脚本引起的任何后果不承担责任。
 4.如涉及版权或侵权问题，请联系作者，验证后将及时处理

