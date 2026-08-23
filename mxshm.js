
/*
漫小肆韓漫
去除页面污秽广告 
https://www.mxs11.cc


[rewrite_local]
^https:\/\/www\.mxs11\.cc\/(chapter|book)\/\d+ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/mxshm.js

[mitm]
hostname = www.mxs11.cc
*/
let body = $response.body;

// 详情页（substr(22) + Function(b)）
body = body.replace(/<script>!function\(\)\{[\s\S]*?substr\(22\)\);new Function\(b\)\(\)\}\(\);<\/script>\s*<!--HTML固定位置 结束-->\s*<br>/g, '');

// 章节页（randoms.init() + document.write）
body = body.replace(/<!--广告代码-->\s*<script>[\s\S]*?randoms\.init\(\);\s*<\/script>\s*<!--广告代码 -->/g, '');

$done({ body });
