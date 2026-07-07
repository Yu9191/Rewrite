/*

马士兵
编程语言学习


[rewrite_local]


https:\/\/gateway\.mashibing\.com\/edu-course\/(coursePackage\/app\/1|app\/systemCourse|courseWeb) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/msb.js

[mitm] 

hostname = gateway.mashibing.com
*/


var body = $response.body;

//试用状态
body = body.replace(/"isTrial":\s*false/g, '"isTrial":true');


//分享状态
body = body.replace(/"shareState":\s*0/g, '"shareState":1');

body = body.replace(/"accredit":\s*false/g, '"accredit":true');
//https://gateway.mashibing.com/edu-course/app/systemCourse/course这个url的时候不能修改 会提示更新无法观看课程资料 但是这个控制vip课程观看权限
body = body.replace(/"plateId":\s*\d+/g, '"plateId":0');

$done({ body });
