/*
 * 插画世界
 * 解锁会员和开屏广告
[rewrite_local]
^https:\/\/api2\.vilipix\.com\/api\/v1\/user\/current url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/chsj.js

[filter_local]
host, *.adukwai.com, reject

[mitm]
hostname = api2.vilipix.com
*/

let body = $response.body;
body = body.replace(/"member_end_date":\w+/g, '"member_end_date": "2099-09-09"');
body = body.replace(/"user_level":\d/g, '"user_level": 6');
$done({ body });
