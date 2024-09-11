/*
小伴龙
[rewrite_local]
^https:\/\/xbl(?:pay|math|satellite)\.youban\.com url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/xbl.js
[mitm]

hostname = *.youban.fun
*/

let body = $response.body;
let modifiedBody = body
    .replace(/"vipEndTime":-?\d+/g, '"vipEndTime":4092595200000')  
    .replace(/"vipdesc":"[^"]+"/g, '"vipdesc":"member"')  
    .replace(/"vip":\d+/g, '"vip":1');  
$done({ body: modifiedBody });
