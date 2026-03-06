let url = $request.url;
let code = url.match(/code=([^&]+)/);
let isQX = typeof $notify !== "undefined";

if (code && code[1]) {
    let title = "QQ农场 Code";
    let subtitle = "已获取并拦截";
    let content = code[1];
    if (isQX) {
        $notify(title, subtitle, content);
    } else {
        $notification.post(title, subtitle, content);
    }
}

let resp = {
    status: isQX ? "HTTP/1.1 404 Not Found" : 404,
    headers: {
        "Connection": "close",
        "Content-Type": "text/plain"
    },
    body: ""
};

$done(isQX ? resp : { response: resp });
