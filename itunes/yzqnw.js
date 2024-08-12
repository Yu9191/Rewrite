/*************************************

项目名称：印章全能王
下载地址：https://is.gd/gohfZv
脚本作者：顾悦
使用声明：⚠️仅供参考，🈲️转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/yzqnw.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var guyue = JSON.parse($response.body);
guyue = {
  "environment": "Production",
  "pending_renewal_info": [
    {
      "product_id": "com.qingxiu.contracts.monthly",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1688386973000",
      "expires_date": "6666-06-06 06:06:06 Etc\/GMT",
      "expires_date_pst": "6666-06-06 06:06:06 America\/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "540001260447637",
      "is_trial_period": "false",
      "original_transaction_id": "540001260447637",
      "product_id": "com.qingxiu.contracts.monthly",
      "original_purchase_date_ms": "1688386974000",
      "expires_date_ms": "148204937166000"
    }
  ]
}

$done({ body: JSON.stringify(guyue) });
