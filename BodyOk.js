/*
BodyOk 4.1.9 
间歇性断食追踪
表盘商店

[rewrite_local]
^https:\/\/api\.apphud\.com\/v1\/(subscriptions|customers)$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/BodyOk.js

[mitm]
hostname = api.apphud.com

*/
var body = $response.body;
var url = $request.url;

function baby(obj) {
    return {
        "id": "fcdaaeee-0ba3-4394-baf5-393ce711f018",
        "group_id": "0fd127e0",
        "unit": "year",
        "autorenew_enabled": false,
        "expires_at": "2099-09-09T11:05:44.000Z",
        "in_retry_billing": false,
        "introductory_activated": true,
        "cancelled_at": null,
        "platform": "ios",
        "product_id": "ok.annual.sub",
        "retries_count": 0,
        "started_at": "2023-12-18T11:05:45.000Z",
        "local": false,
        "next_check_at": "2023-12-25T11:12:44.000Z",
        "kind": "autorenewable",
        "units_count": 1,
        "environment": "production",
        "status": "trial"
    };
}

var obj = JSON.parse(body);

if (url.includes('/subscriptions')) {
    if (obj.data.hasOwnProperty('subscriptions')) {
        obj.data.subscriptions = [baby(obj)];
    }
} else if (url.includes('/customers')) {
    if (obj.data.results.hasOwnProperty('subscriptions')) {
        obj.data.results.subscriptions = [baby(obj)];
    }
}

body = JSON.stringify(obj);
$done({ body, url });
