/*
 * 火龙果
 * 小果ai不可用
https://api.mypitaya.com/api/userInfo
[rewrite_local]
^https:\/\/api\.mypitaya\.com\/api\/userInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/pitaya.js

[mitm]
hostname = api.mypitaya.com
*/
let obj = JSON.parse($response.body);
const modifications = {
  "username": "baby",
  "vip_icon_url": "https://docs.ruthout.com/files/user/avatar/200274_large.jpg",
  "vip_type": "vvip",
  "expire_timestamp": 94948949393939,
  "expire_time": "2099-09-09T00:00:00Z",
  "vip_show_name": "专业版"
};
function modify(obj) {
  if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (key in modifications) obj[key] = modifications[key];
      modify(obj[key]);
    }
  }
}
try {
  modify(obj);
  $done({ body: JSON.stringify(obj) });
} catch (error) {
  $done({ body: $response.body });
}
