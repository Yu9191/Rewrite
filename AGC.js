/**
 * by：iu
 * 作用：测试解锁会员
 * 先登录

[rewrite_local]
https://api.agcplayer.com/ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/AGC.js
[mitm]
hostname = api.agcplayer.com
 */

let body = $response.body;
let obj = JSON.parse(body); 
if (obj.data) {
    obj.data.subscription_type = obj.data.subscription_type !== undefined ? 99 : obj.data.subscription_type;
    obj.data.subscription_expire = obj.data.subscription_expire !== undefined ? 9998998889 : obj.data.subscription_expire;
    obj.data.is_pro = obj.data.is_pro !== undefined ? 1 : obj.data.is_pro;
    obj.data.unlock_widgets_num = obj.data.unlock_widgets_num !== undefined ? 99999 : obj.data.unlock_widgets_num;
    obj.data.user_id = obj.data.user_id !== undefined ? 888888 : obj.data.user_id; //逼逼的id
    obj.data.widgets_num = obj.data.widgets_num !== undefined ? 9999 : obj.data.widgets_num;
}

body = JSON.stringify(obj);
$done({ body });