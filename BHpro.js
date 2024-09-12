/*************************************
项目名称：BH pro
脚本作者：ios151



**************************************

[rewrite_local]

^https:\/\/litebhapi\.belugabh\.com\/personal_center\/(my_homepage|user_equity_status_list) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/BHpro.js

[mitm]
hostname = litebhapi.belugabh.com

*************************************/


var baby = JSON.parse($response.body);
const vip = '/user_equity_status_list';
const my = '/my_homepage';

if ($request.url.indexOf(vip) != -1){
baby.data.crowd_portraits_remaining_times = 88888;//人像次数
baby.data.role_15 = 888;//数据地图次数
baby.data.current_month_pdf_can_use_times = 8888888;//当月可用pdf次数
baby.data.survey_export_old_app_pay_times = 888888;//周边导出次数
baby.data.survey_export_times = 88888;//城市次数
baby.data.role_20 = 888;//周边写字楼
baby.data.poi_open = true;//是否开通poi服务
}

if ($request.url.indexOf(my) != -1){
baby.data.phone = "18888888888";
baby.data.occupation = "总经理";
baby.data.avatar = "https://raw.githubusercontent.com/Yu9191/-/main/A559C8EF-B4C6-4A94-8488-3D0BF36A6673.jpeg";
baby.data.nickname = "lovebabyforever";

}

$done({body : JSON.stringify(baby)});
