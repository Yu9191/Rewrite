/**
 * by：iu
 * 作用：王派医学课程下载本地
 * 

[rewrite_local]
^http:\/\/(119\.36\.175\.\d+|hw-dl\.videocc\.net).*\.zip$ url script-request-header wpxz.js
[mitm]
hostname = 119.36.175.*, hw-dl.videocc.net
 */

let headers = $request.headers;
headers["Host"] = "hw-dl.videocc.net";
headers["Accept-Language"] = "zh-CN,zh-Hans;q=0.9";
headers["User-Agent"] = "WP/1 CFNetwork/3826.400.110 Darwin/24.3.0";
headers["Accept"] = "*/*";
headers["Accept-Encoding"] = "gzip, deflate";
headers["Connection"] = "keep-alive";

const url = $request.url;

try {
    if (typeof $notify !== "undefined") {
        $notify("课程匹配成功", `已匹配到下载地址：${url}`, "点击跳转浏览器下载本地", {
            "open-url": url
        });
    } else if (typeof $notification !== "undefined") {
        $notification.post("课程匹配成功", `已匹配到下载地址：${url}`, "点击跳转浏览器下载本地", url);
    }
} catch (error) {
    console.log("通知功能出错: " + error.message);
}

$done({ headers });
