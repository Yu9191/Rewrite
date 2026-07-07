/*

PicPro 3.1.8

[rewrite_local]

^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/PicPro.js

[mitm] 

hostname = buy.itunes.apple.com

*/


var objc = JSON.parse($response.body);

    objc = {
  "environment" : "Production",
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 1503443162,
    "receipt_creation_date" : "2023-12-10 09:44:13 Etc/GMT",
    "bundle_id": "com.quangtm193.picpro",
    "original_purchase_date" : "2023-12-10 09:36:46 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1702201119000",
        "expires_date" : "2099-09-0909:38:39 Etc/GMT",
        "expires_date_pst" : "2099-09-0901:38:39 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "220001826202938",
        "is_trial_period" : "true",
        "original_transaction_id" : "220001826202938",
        "purchase_date" : "2023-12-10 09:38:39 Etc/GMT",
        "auto_renew_product_id": "com.quangtm193.picpro1year",
        "original_purchase_date_pst" : "2023-12-10 01:38:40 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1702201120000",
        "web_order_line_item_id" : "220000838607136",
        "expires_date_ms" : "4092595200000",
        "purchase_date_pst" : "2023-12-10 01:38:39 America/Los_Angeles",
        "original_purchase_date" : "2023-12-10 09:38:40 Etc/GMT"
      }
    ],
    "adam_id" : 1503443162,
    "receipt_creation_date_pst" : "2023-12-10 01:44:13 America/Los_Angeles",
    "request_date" : "2023-12-10 09:44:15 Etc/GMT",
    "request_date_pst" : "2023-12-10 01:44:15 America/Los_Angeles",
    "version_external_identifier" : 845281691,
    "request_date_ms" : "1702201455310",
    "original_purchase_date_pst" : "2023-12-10 01:36:46 America/Los_Angeles",
    "application_version" : "3",
    "original_purchase_date_ms" : "1702201006000",
    "receipt_creation_date_ms" : "1702201453000",
    "original_application_version" : "3",
    "download_id" : 503027047305828299
  },
  "pending_renewal_info" : [
    {
      "auto_renew_product_id": "com.quangtm193.picpro1year",
      "original_transaction_id" : "220001826202938",
      "auto_renew_product_id" : "com.nymf.app.premium_year",
      "auto_renew_status" : "1"
    }
  ],
  "status" : 0,
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1702201119000",
      "expires_date" : "2099-09-0909:38:39 Etc/GMT",
      "expires_date_pst" : "2099-09-0901:38:39 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "220001826202938",
      "is_trial_period" : "true",
      "original_transaction_id" : "220001826202938",
      "purchase_date" : "2023-12-10 09:38:39 Etc/GMT",
      "auto_renew_product_id": "com.quangtm193.picpro1year",
      "original_purchase_date_pst" : "2023-12-10 01:38:40 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "subscription_group_identifier" : "20641654",
      "original_purchase_date_ms" : "1702201120000",
      "web_order_line_item_id" : "220000838607136",
      "expires_date_ms" : "4092595200000",
      "purchase_date_pst" : "2023-12-10 01:38:39 America/Los_Angeles",
      "original_purchase_date" : "2023-12-10 09:38:40 Etc/GMT"
    }
  ],
  "latest_receipt" : "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"
}


$done({body : JSON.stringify(objc)});
