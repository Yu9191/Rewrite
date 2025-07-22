/* 
ins社区

[rewrite_local]

https:\/\/x2\.ins620\.com\/post\/app\/p\/post\/private\/(video\/recommend|info|page|similar\/page) url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/insck.js
https://x2.ins620.com/party/common/advertising/public/adv/list url reject
https://x2.ins620.com/user/app/u/user/private/info url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/ins.js
[mitm]
hostname = x2.ins620.com
*/

let obj = JSON.parse($response.body);
obj.data.userName = "baby";
obj.data.nickName = "baby";
obj.data.vipLevel = 9;
obj.data.vipStartTime = 1753035900477; 
obj.data.vipEndTime = 4102444800000; 
$done({ body: JSON.stringify(obj) });
