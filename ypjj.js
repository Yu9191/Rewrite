
/*
 * 音频剪辑
 * 下载地址 https://apps.apple.com/us/app/audio-editor-music-mixer/id1339124759
[rewrite_local]
^https:\/\/pay\.camoryapps\.com\/appPay\/api\/user\/info\/tokenLogin url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/ypjj.js
^https:\/\/ad\.camoryapps\.com\/api\/app\/get\/ad url reject
[mitm]
hostname = pay.camoryapps.com, ad.camoryapps.com
*/
let obj = JSON.parse($response.body);
obj.data.isR = true;
obj.data.isSubscribe = true;
obj.data.timeExpire = "2099-09-09 09:09:09";
obj.data.timeStart = "2021-09-09 09:09:09";
$done({ body: JSON.stringify(obj) });
