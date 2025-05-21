
/*
1998 解锁全课程全资料

[rewrite_local]

^https:\/\/.*\.1998xuexi\.com\/source-gateway\/store-web-new\/app\/(course\/getCurrCatalogue\.action|material\/getMaterialCateLog\.action|vip\/getMemberVipInfo\.action|vip\/getVipInfomationAll\.action) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/1998.js

[mitm]
hostname = *.1998xuexi.com, *.1998xuexi.com
*/


var body = $response.body;
var url = $request.url;

try {
    // 会员界面2
    if (url.includes('getVipInfomationAll')) {
        let obj = JSON.parse(body);
        obj.data.mainInfoList = [{
            "vipId": "86",
            "vipName": "永久题库会员",
            "vipType": "3",
            "powerImage": "https://raw.githubusercontent.com/Yu9191/-/main/icon/laoliu.png",
            "catLog": "1",
            "buyCount": null,
            "isVip": "1",
            "validTime": "2099-09-09",
            "createTime": "2099-09-09 09:40:43",
            "fakeBuyCount": "3280",
            "count": "3280",
            "selected": "1",
            "priceList": [],
            "exclusiveList": []
        }];
        body = JSON.stringify(obj);
    }

    // 会员界面1
    if (url.includes('getMemberVipInfo')) {
        let obj = JSON.parse(body);
        obj.data.memberInfos = [{
            "vipName": "题库会员",
            "isVip": "1",
            "validTime": "2099-09-09",
            "vipType": "3",
            "catelogId1": "1",
            "vipId": 86
        }];
        body = JSON.stringify(obj);
    }

    // 课程
    if (url.includes('getCurrCatalogue')) {
        body = body.replace(/"isNeedUnlock":\d+/g, '"isNeedUnlock":0');
        body = body.replace(/"isFree":\w+/g, '"isFree":1');
        body = body.replace(/"isNeed":"[^"]+"/g, '"isNeed":"1"');
        body = body.replace(/"isNeedUnlock":"[^"]+"/g, '"isNeedUnlock":"0"');
        body = body.replace(/"isFree":"[^"]+"/g, '"isFree":"1"');
    }

    // 练习题资料及其他
    if (url.includes('getMaterialCateLog')) {
        body = body.replace(/"isNeedUnlock":\d+/g, '"isNeedUnlock":0');
        body = body.replace(/"isNeedUnlock":"[^"]+"/g, '"isNeedUnlock":"0"');
    }

    $done({ body });
} catch (error) {
    console.error("Error processing response: ", error);
    $done({});
}

//by iu 请勿倒卖

