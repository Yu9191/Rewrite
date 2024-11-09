/*
  * 激光投影

[rewrite_local]
http://47.120.25.12:3000/app/subscribe/getSubscribeData url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/jgty.js

[mitm]
hostname = 47.120.25.12:3000
*/
let a = $response.body;

if (a) {
    let b = {
        "success": true,
        "status": 200,
        "message": "请求成功",
        "data": {
            "subscribeId": "",
            "productExpires": "0",
            "formattedExpiryDate": "2099年09月09日",
            "daysStatus": "99999",
            "productTotalDays": 999999,
            "usedDays": 0
        }
    };
    a = JSON.stringify(b);
}

$done({ body: a });