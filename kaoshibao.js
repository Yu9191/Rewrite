/*
[rewrite_local]
^https:\/\/api\.ankianki\.com\/banner\/get$ url reject
^https:\/\/(api\.ankianki\.com|search-api\.yisouti\.com)\/(user\/userInfo\/get|search\/(getOcrStatus|ocr2|mixPaper)|kaoShi\/.*|paper\/(home|topErrors)|user\/coupon\/getExpireInfo|mockExam\/config|document\/file|questions\/fetch) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/kaoshibao.js

[mitm]
hostname = api.ankianki.com, search-api.yisouti.com
*/
const url = $request.url;
const body = $response.body;

if (!body) {
    $done({});
}

function setBuyNumberToZero(obj) {
    if (typeof obj !== "object" || obj === null) return;
    for (let key in obj) {
        if (key === "buy_number") {
            obj[key] = "0";
        } else {
            setBuyNumberToZero(obj[key]);
        }
    }
}

try {
    let obj = JSON.parse(body);

    if (url.includes("user/userInfo/get") && obj.data) {
        obj.data.vip_type = "2";
        obj.data.vip_level = "2";
        obj.data.vip_expiration_time = "2099-09-09 09:09:09";
        obj.data.yst_vip_type = "2";
        obj.data.yst_vip_expiration_time = "2099-09-09 09:09:09";
        obj.data.is_show_ad = "0";
        obj.data.auto_analysis_package = "99999";
        obj.data.remove_error_limit = "99999";
        
        if (!obj.data.feature_vips) {
            obj.data.feature_vips = [{
                "id": "1",
                "name": "高级VIP",
                "expiration_time": "2099-09-09 09:09:09"
            }];
        }

        if (obj.data.vip_config) {
            obj.data.vip_config.alert_title = "尊贵高级VIP";
            obj.data.vip_config.desc = "已解锁所有高级权益";
            for (let key in obj.data.vip_config) {
                if (key.includes("limit")) obj.data.vip_config[key] = "9999999";
            }
        }
    } 
    else if (url.includes("search/getOcrStatus")) {
        obj = {
            "code": "200",
            "data": {
                "limit": "99999",
                "photo_search_status": "1"
            },
            "time": String(Math.floor(Date.now() / 1000))
        };
    } 
    else if (url.includes("search/ocr2")) {
        obj = {
            "code": "200",
            "data": {
                "text": "中国外汇交易中心外汇交易系统提供的交易模式包括().",
                "origin_text": "10、中国外汇交易中心外汇交易系统提供的交易模式包括().\nA、询价交易\nB、中央对手方交易\nC、竞价交易\nD、做市商交易\n11、利率与远期汇率和升水、贴水之间的关系是().\n"
            },
            "time": String(Math.floor(Date.now() / 1000)),
            "encrypt": "pfyH4fnEjUqitg7wTbQ5S7=="
        };
    } 
    else if (url.includes("paper/topErrors")) {
        obj = {
            "code": "200",
            "data": {
                "questions": {},
                "total": "0",
                "page_count": "0"
            },
            "time": String(Math.floor(Date.now() / 1000))
        };
    } 
    else if (url.includes("user/coupon/getExpireInfo")) {
        obj = {
            "code": "200",
            "data": {
                "has_coupon": "1",
                "amount": "999",
                "expired_at": "2099-09-09 09:09:09"
            },
            "time": String(Math.floor(Date.now() / 1000))
        };
    } 
    else if (url.includes("questions/fetch")) {
        if (obj.code === "404" && obj.msg && obj.msg.includes("付费题库")) {
            obj.msg = "顺序练习未解锁，直接用会员功能模拟考试";
        }
    }
    else if (url.includes("document/file")) {
        if (obj.data) {
            obj.data.sell_way = "0";
            obj.data.price = "0";
            obj.data.status = "8";
            obj.data.free_download_num = "999";
            obj.data.have_downed = "1";
            obj.data.is_buy = "1";
            
            if (obj.data.pages) {
                obj.data.preview_page = obj.data.pages;
            }
        }
    }
    else {
        if (obj.data) {
            if (obj.data.hasOwnProperty("sell_way")) obj.data.sell_way = "0";
            if (obj.data.hasOwnProperty("price")) obj.data.price = "0";
            if (obj.data.hasOwnProperty("have_downed")) obj.data.have_downed = "1";
            if (obj.data.hasOwnProperty("status")) obj.data.status = "8";
            if (obj.data.hasOwnProperty("free_download_num")) obj.data.free_download_num = "999"; 
            if (obj.data.hasOwnProperty("is_buy")) obj.data.is_buy = "1";
            if (obj.data.hasOwnProperty("is_expired")) obj.data.is_expired = "0";
            if (obj.data.hasOwnProperty("exercise_vip")) obj.data.exercise_vip = "1";
            if (obj.data.hasOwnProperty("expiration_time")) obj.data.expiration_time = "2099-09-09 09:09:09";
            if (obj.data.hasOwnProperty("need_password")) obj.data.need_password = "0";
            if (obj.data.paid_kaoshi_tip) obj.data.paid_kaoshi_tip = "已解锁";
            if (obj.data.paid_paper_tip) obj.data.paid_paper_tip = "已解锁";

            if (obj.data.kaoshi) {
                obj.data.kaoshi.status = "1";
                obj.data.kaoshi.price = "0";
                obj.data.kaoshi.is_buy = 1;
            }

            if (obj.data.paper) {
                obj.data.paper.price = "0";
                obj.data.paper.status = "1";
                obj.data.paper.show_ad = "0";
                obj.data.paper.enable_download = "1";
                obj.data.paper.is_vip_paper = "1";
                obj.data.paper.forbid_search = "0";
                obj.data.paper.preview_num = "99999"; 
            }

            if (obj.data.papers && Array.isArray(obj.data.papers)) {
                obj.data.papers.forEach(element => {
                    element.price = "0";
                    element.enable_download = "1";
                    element.is_vip_paper = "1";
                    element.sell_way = "0";
                    element.status = "8";
                });
            }
        }
    }

    setBuyNumberToZero(obj);

    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({});
}
