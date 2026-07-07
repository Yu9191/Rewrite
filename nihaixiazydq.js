/*
倪海厦中医大全
会员权益及全课程
[rewrite_local]

https:\/\/medicine-family\.meappstore\.top\/medicineModule\/api\/(users\/iosUserLogin|family\/) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/nihaixiazydq.js

[mitm]
hostname = medicine-family.meappstore.top
*/
let url = $request.url;

if (url.includes("https://medicine-family.meappstore.top/medicineModule/api/users/iosUserLogin")) {
    let obj = JSON.parse($response.body);
    obj.data.vipState = 1;
    obj.data.vipEndDataTime = "2099-09-09 09:29:29";
    obj.data.vipEndTime = "2099-09-09 09:29:29";
    obj.data.alias = "Baby";
    $done({
        body: JSON.stringify(obj)
    });
} else if (url.includes("https://medicine-family.meappstore.top/medicineModule/api/family/")) {
    $done({ 
        body: $response.body.replace(/("charge"\s*:\s*)true/g, '$1false')
    });
} else {
    $done({});
}