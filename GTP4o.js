
/*
GTP4o 

[rewrite_local]

https://nichousha.sjrjyffs.top/api/img/aiSketch url script-request-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/GTP4ohd.js
https://nichousha.sjrjyffs.top/api/app/user/getCurrentInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/GTP4o.js

[mitm]
hostname = nichousha.sjrjyffs.top
*/

if ($request.url.includes('api/app/user/getCurrentInfo')) {
    let body = JSON.parse($response.body);
    Object.assign(body.data, { vipStatus: "1", nickname: "Baby", vipLabel: "1", imgNum: 9999 });
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}
