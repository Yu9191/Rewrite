/**
 * 影优尽优

[rewrite_local]
https://api.douyinggongchang.com/v1 url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/yyjy1.js


[mitm]
hostname = api.douyinggongchang.com
 */

let body = $response.body;
body = body.replace(/"is_free"\s*:\s*false/g, '"is_free":true')
           .replace(/"vip_type"\s*:\s*""/g, '"vip_type":"S"')
           .replace(/"result"\s*:\s*false/g, '"result":true')
           .replace(/"vip_endtime"\s*:\s*".*?"/g, '"vip_endtime":"2099-09-09"')
           .replace(/"total_commission"\s*:\s*".*?"/g, '"total_commission":"999.00"')
           .replace(/"vip_valid"\s*:\s*false/g, '"vip_valid":true');
$done({ body });
