/**

脚本名称: #小程序://题材库/7lJ9vMf43M3tnZd

解锁会员



[rewrite_local]


https://miniapp.guniuniu.com/api/app/user$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/ticaiku.js

[mitm] 

hostname = miniapp.guniuniu.com



*/
let obj = JSON.parse($response.body);
obj.data.nickName = "Baby";
obj.data.vipTime = "2099-09-09 02:20:13";
//obj.data.svipTime = "2099-09-09 02:20:13";
$done({
    body: JSON.stringify(obj)
});
