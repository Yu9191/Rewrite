

let url = $request.url;
let isQX = typeof $notify !== "undefined";

console.log('[QQ Farm] 拦截到请求');
console.log('[QQ Farm] URL: ' + url);
console.log('[QQ Farm] 工具类型: ' + (isQX ? 'QuantumultX' : 'Surge'));

// 提取 code
let code = url.match(/code=([^&]+)/);

if (code && code[1]) {
    let codeValue = code[1];
    let title = "QQ农场 Code";
    let subtitle = "已获取并拦截";
    let content = codeValue;
    
    console.log('[QQ Farm] ✅ 成功提取 Code');
    console.log('[QQ Farm] Code 长度: ' + codeValue.length);
    console.log('[QQ Farm] Code 前8位: ' + codeValue.substring(0, 8) + '...');
    console.log('[QQ Farm] 完整 Code: ' + codeValue);
    
    if (isQX) {
        $notify(title, subtitle, content);
        console.log('[QQ Farm] 已发送 QuantumultX 通知');
    } else {
        $notification.post(title, subtitle, content);
        console.log('[QQ Farm] 已发送 Surge 通知');
    }
} else {
    console.log('[QQ Farm] ⚠️ 未找到 Code 参数');
    console.log('[QQ Farm] URL 中没有 code= 参数');
}

let resp = {
    status: isQX ? "HTTP/1.1 404 Not Found" : 404,
    headers: {
        "Connection": "close",
        "Content-Type": "text/plain"
    },
    body: ""
};

console.log('[QQ Farm] 返回 404 响应，拦截请求');
console.log('[QQ Farm] 处理完成 ');

$done(isQX ? resp : { response: resp });
