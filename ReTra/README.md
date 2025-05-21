# QX重写规则自动转换

这个项目可以自动将Quantumult X格式的重写规则转换为Surge模块和Loon插件格式。

## 功能特点

- 自动监听JS脚本文件变化
- 自动从脚本中提取重写规则、主机名等信息
- 自动生成对应的Surge模块(.sgmodule)和Loon插件(.plugin)文件
- 自动添加更新时间
- 支持多种类型的重写规则转换

## 目录结构

- 根目录 - 存放原始QX脚本文件(.js)
- `ReTra/Surge/` - 生成的Surge模块文件(.sgmodule)
- `ReTra/Loon/` - 生成的Loon插件文件(.plugin)

## 支持的规则类型

本工具支持以下类型的Quantumult X重写规则转换：

### 脚本类型
- `script-response-body` - 响应体修改脚本
- `script-request-header` - 请求头修改脚本
- `script-request-body` - 请求体修改脚本
- `script-echo-response` - 返回自定义响应的脚本

### 拒绝请求类型
- `reject` - 普通拒绝
- `reject-dict` - 返回空JSON字典拒绝
- `reject-img` - 返回空图片拒绝
- `reject-200` - 返回空的200状态拒绝

### 重定向类型
- `302` - 302临时重定向
- `307` - 307临时重定向

### 头部修改类型
- `response-header` - 响应头修改

## 使用方法

只需将您的Quantumult X脚本添加到根目录中，GitHub Actions将自动监听并为您生成相应的Surge模块和Loon插件，分别保存在`ReTra/Surge`和`ReTra/Loon`目录中。

### 脚本格式要求

脚本必须包含以下部分才能被正确解析：

1. 脚本名称（注释的第一行）
2. 重写规则（如上述支持的格式）
3. MITM主机名（形如 `hostname = example.com` 或多个主机名）

### 示例

原始QX脚本格式:
```javascript
/*
AppRaven
*/

[rewrite_local]
https://appraven.net/appraven/graphql url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/AppRaven.js

[mitm] 
hostname = appraven.net
```

自动生成的Surge模块:
```
#!name=AppRaven
#!desc=AppRaven（更新时间：2024.x.x）
#!icon=https://m.360buyimg.com/i/jfs/t1/311854/8/2935/14637/682dda6eF77c789c1/9a4c5ed64ab9b33b.png

[Script]
AppRaven = type=http-response, pattern=https://appraven.net/appraven/graphql, script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/AppRaven.js, requires-body=true, max-size=-1, timeout=60

[MITM]
hostname = %APPEND% appraven.net
```

自动生成的Loon插件:
```
#!name=AppRaven
#!desc=AppRaven（更新时间：2024.x.x）
#!icon=https://m.360buyimg.com/i/jfs/t1/311854/8/2935/14637/682dda6eF77c789c1/9a4c5ed64ab9b33b.png

[Script]
http-response https://appraven.net/appraven/graphql script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/AppRaven.js, requires-body=true, timeout=60, tag=AppRaven

[MITM]
hostname = appraven.net
```

## 自用说明

本项目主要用于监听JS文件，自动生成Surge和Loon格式的规则文件，保存到独立的目录中，确保不会覆盖原始JS文件。 