
/*
 * Emmo日记
 * 先登录
[rewrite_local]

http://106.54.2.168/emmoDiary/user/getUser url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/emmo.js



*/
let obj = JSON.parse($response.body);
obj.data.isLifeVip = "1";
obj.data.vipEndTime = "2099-09-09";
obj.data.isVip = "1";
$done({ body: JSON.stringify(obj) });
