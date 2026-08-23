/*
Ai大藏经

[rewrite_local]

https://deerpark.ai/api/user/profile url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/aidcj.js
[mitm]
hostname = deerpark.ai

*/

let baby = JSON.parse($response.body);
baby.user.phone = "18888888888";
baby.membership.isActive = true;
$done({ body: JSON.stringify(baby) });
