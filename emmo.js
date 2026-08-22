
/*
 * Emmo日记
 * 先登录
[rewrite_local]

http://106.54.2.168/emmoDiary/user/getUser url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/emmo.js



*/
let body = $response.body;
body = body.replace(/"isLifeVip"\s*:\s*[^,}]+/g, '"isLifeVip":"1"');
body = body.replace(/"vipEndTime"\s*:\s*[^,}]+/g, '"vipEndTime":"2099-09-09"');
body = body.replace(/"isVip"\s*:\s*[^,}]+/g, '"isVip":"1"');
$done({ body });
