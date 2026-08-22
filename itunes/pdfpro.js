/*
Pdf prl

[rewrite_local]


^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/pdfpro.js

[mitm] 

hostname = buy.itunes.apple.com

**/


var objc = JSON.parse($response.body);

    objc = {
  "environment" : "Production",
  "receipt" : {
    "receipt_type" : "Production",
    "app_item_id" : 6450832499,
    "receipt_creation_date" : "2024-01-17 14:17:21 Etc/GMT",
    "bundle_id" : "net.domzilla.pdfpro",
    "original_purchase_date" : "2024-01-17 14:17:21 Etc/GMT",
    "in_app" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1705501038000",
        "expires_date" : "2099-09-09 14:17:18 Etc/GMT",
        "expires_date_pst" : "2099-09-09 06:17:18 America/Los_Angeles",
        "is_in_intro_offer_period" : "false",
        "transaction_id" : "320001692332200",
        "is_trial_period" : "false",
        "original_transaction_id" : "320001692332200",
        "purchase_date" : "2024-01-17 14:17:18 Etc/GMT",
        "product_id" : "net.domzilla.pdfpro.iap.premium.annual",
        "original_purchase_date_pst" : "2024-01-17 06:17:21 America/Los_Angeles",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_ms" : "1705501041000",
        "web_order_line_item_id" : "320000788106651",
        "expires_date_ms" : "4092595200000",
        "purchase_date_pst" : "2024-01-17 06:17:18 America/Los_Angeles",
        "original_purchase_date" : "2024-01-17 14:17:21 Etc/GMT"
      }
    ],
    "adam_id" : 6450832499,
    "receipt_creation_date_pst" : "2024-01-17 06:17:21 America/Los_Angeles",
    "request_date" : "2024-01-17 14:17:36 Etc/GMT",
    "request_date_pst" : "2024-01-17 06:17:36 America/Los_Angeles",
    "version_external_identifier" : 858380808,
    "request_date_ms" : "1705501056419",
    "original_purchase_date_pst" : "2024-01-17 06:17:21 America/Los_Angeles",
    "application_version" : "1",
    "original_purchase_date_ms" : "1705501041000",
    "receipt_creation_date_ms" : "1705501041000",
    "original_application_version" : "1",
    "download_id" : null
  },
  "pending_renewal_info" : [
    {
      "product_id" : "net.domzilla.pdfpro.iap.premium.annual",
      "original_transaction_id" : "320001692332200",
      "auto_renew_product_id" : "com.colin.shoton.monthlyvip",
      "auto_renew_status" : "1"
    }
  ],
  "status" : 0,
  "latest_receipt_info" : [
    {
      "quantity" : "1",
      "purchase_date_ms" : "1705501038000",
      "expires_date" : "2099-09-09 14:17:18 Etc/GMT",
      "expires_date_pst" : "2099-09-09 06:17:18 America/Los_Angeles",
      "is_in_intro_offer_period" : "false",
      "transaction_id" : "320001692332200",
      "is_trial_period" : "false",
      "original_transaction_id" : "320001692332200",
      "purchase_date" : "2024-01-17 14:17:18 Etc/GMT",
      "product_id" : "net.domzilla.pdfpro.iap.premium.annual",
      "original_purchase_date_pst" : "2024-01-17 06:17:21 America/Los_Angeles",
      "in_app_ownership_type" : "PURCHASED",
      "subscription_group_identifier" : "21360520",
      "original_purchase_date_ms" : "1705501041000",
      "web_order_line_item_id" : "320000788106651",
      "expires_date_ms" : "4092595200000",
      "purchase_date_pst" : "2024-01-17 06:17:18 America/Los_Angeles",
      "original_purchase_date" : "2024-01-17 14:17:21 Etc/GMT"
    }
  ],
  "latest_receipt" : "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"
}


$done({body : JSON.stringify(objc)});