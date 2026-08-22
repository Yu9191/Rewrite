/*
 * 万康人体解剖
 * 解锁会员
 * 
[rewrite_local]
^https:\/\/wankang\.xlhcq\.com\/v1\/user_info url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/wk.js

[mitm]
hostname = wankang.xlhcq.com
*/
let obj = JSON.parse($response.body);
obj.data.vip_type = 3;
obj.data.vip_expire = "2099-09-09";
obj.data.is_clock = 1;
obj.data.gender = 1;
$done({ body: JSON.stringify(obj) });
