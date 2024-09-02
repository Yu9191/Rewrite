/*
TypeOn翻译

[rewrite_local]


^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/typeon.js

[mitm] 

hostname = buy.itunes.apple.com

**/







var objc = JSON.parse($response.body);

    objc = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 1197339497,
    "receipt_creation_date": "2024-07-17 08:59:47 Etc\/GMT",
    "bundle_id": "faceapp.snaplab.magikoly.ai.ios",
    "original_purchase_date": "2024-07-17 08:51:41 Etc\/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1721206713000",
        "expires_date": "2024-07-20 08:58:33 Etc\/GMT",
        "expires_date_pst": "2024-07-20 01:58:33 America\/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "transaction_id": "220002108212005",
        "is_trial_period": "true",
        "original_transaction_id": "220002108212005",
        "purchase_date": "2024-07-17 08:58:33 Etc\/GMT",
        "product_id": "com.hanchongzan.book.vip",//
        "original_purchase_date_pst": "2024-07-17 01:58:34 America\/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1721206714000",
        "web_order_line_item_id": "220000965339756",
        "expires_date_ms": "1721465913000",
        "purchase_date_pst": "2024-07-17 01:58:33 America\/Los_Angeles",
        "original_purchase_date": "2024-07-17 08:58:34 Etc\/GMT"
      }
    ],
    "adam_id": 1197339497,
    "receipt_creation_date_pst": "2024-07-17 01:59:47 America\/Los_Angeles",
    "request_date": "2024-07-17 08:59:48 Etc\/GMT",
    "request_date_pst": "2024-07-17 01:59:48 America\/Los_Angeles",
    "version_external_identifier": 867506508,
    "request_date_ms": "1721206788597",
    "original_purchase_date_pst": "2024-07-17 01:51:41 America\/Los_Angeles",
    "application_version": "2.5.5",
    "original_purchase_date_ms": "1721206301000",
    "receipt_creation_date_ms": "1721206787000",
    "original_application_version": "2.5.5",
    "download_id": 503649811345136772
  },
  "pending_renewal_info": [
    {
      "product_id": "com.hanchongzan.book.vip",//
      "original_transaction_id": "220002108212005",
      "auto_renew_product_id": "com.hanchongzan.book.vip",//
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1721206713000",
      "expires_date": "2024-07-20 08:58:33 Etc\/GMT",
      "expires_date_pst": "2024-07-20 01:58:33 America\/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "220002108212005",
      "is_trial_period": "true",
      "original_transaction_id": "220002108212005",
      "purchase_date": "2024-07-17 08:58:33 Etc\/GMT",
      "product_id": "com.hanchongzan.book.vip",//
      "original_purchase_date_pst": "2024-07-17 01:58:34 America\/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "20459848",
      "original_purchase_date_ms": "1721206714000",
      "web_order_line_item_id": "220000965339756",
      "expires_date_ms": "1721465913000",
      "purchase_date_pst": "2024-07-17 01:58:33 America\/Los_Angeles",
      "original_purchase_date": "2024-07-17 08:58:34 Etc\/GMT"
    }
  ],
  "latest_receipt": "MIIUiwYJKoZIhvcNAQcCoIIUfDCCFHgCAQExDzANBglghkgBZQMEAgEFADCCA8EGCSqGSIb3DQEHAaCCA7IEggOuMYIDqjAKAgEUAgEBBAIMADALAgEZAgEBBAMCAQMwDAIBDgIBAQQEAgIA5jANAgEKAgEBBAUWAzE3KzANAgENAgEBBAUCAwJKVTAOAgEBAgEBBAYCBEdd82kwDgIBCQIBAQQGAgRQMzAyMA4CAQsCAQEEBgIEBxDZDTAOAgEQAgEBBAYCBDO1GUwwDwIBAwIBAQQHDAUyLjUuNTAPAgETAgEBBAcMBTIuNS41MBICAQ8CAQEECgIIBv1S1cBrXIQwFAIBAAIBAQQMDApQcm9kdWN0aW9uMBgCAQQCAQIEEL6AKZl9pkFKvLYLkEscWmYwGQIBAgIBAQQRDA9jb20ubW0uUkJyb3N3ZXIwHAIBBQIBAQQUuqvi+VBA7Jr6dEiOZBqQm8d\/vqgwHgIBCAIBAQQWFhQyMDI0LTA3LTE3VDA4OjU5OjQ3WjAeAgEMAgEBBBYWFDIwMjQtMDctMTdUMDg6NTk6NDhaMB4CARICAQEEFhYUMjAyNC0wNy0xN1QwODo1MTo0MVowQAIBBwIBAQQ4\/QBRVzOBGnxRs\/p0Ii92tsrDeDC7Oz+QY0\/7fl2xNCNkzcC359bitfvHlJXdlBnsDtJ26L+xEG8wSQIBBgIBAQRBbq4geJeXz8WdtEEqAEBPpgo\/rSPXgfJxpPX79LlR4oC2lK0zLz\/Alg\/4CXOxbbHgEZ\/dfYPQVzU8u8HZr06aQGQwggGVAgERAgEBBIIBizGCAYcwCwICBq0CAQEEAgwAMAsCAgawAgEBBAIWADALAgIGsgIBAQQCDAAwCwICBrMCAQEEAgwAMAsCAga0AgEBBAIMADALAgIGtQIBAQQCDAAwCwICBrYCAQEEAgwAMAwCAgalAgEBBAMCAQEwDAICBqsCAQEEAwIBAzAMAgIGsQIBAQQDAgEBMAwCAga3AgEBBAMCAQAwDAICBroCAQEEAwIBADAPAgIGrgIBAQQGAgRYmEdaMBICAgavAgEBBAkCBwDIFvdjqmwwGgICBqcCAQEEEQwPMjIwMDAyMTA4MjEyMDA1MBoCAgapAgEBBBEMDzIyMDAwMjEwODIxMjAwNTAfAgIGqAIBAQQWFhQyMDI0LTA3LTE3VDA4OjU4OjMzWjAfAgIGqgIBAQQWFhQyMDI0LTA3LTE3VDA4OjU4OjM0WjAfAgIGrAIBAQQWFhQyMDI0LTA3LTIwVDA4OjU4OjMzWjAkAgIGpgIBAQQbDBljb20ubW0uUkJyb3N3ZXIucHJvZHVjdDExoIIO4jCCBcYwggSuoAMCAQICEBXnn85SVQplAXyR3+Tus1kwDQYJKoZIhvcNAQELBQAwdTFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxCzAJBgNVBAsMAkc1MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yMjA5MDIxOTEzNTdaFw0yNDEwMDExOTEzNTZaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8RM4LrWowdq\/ACQw0ehlh770gDfX6Q54T9azzPJMO12WbdMJaNydU8I7NRjqCzHW\/EuALKe5Ya6DnQir3hwCfosypIuZt6A3nyw\/00GRbs7+NY83Cm2KwKdfewKONrRuk+Oto23OGLl\/MuyF9a7g4bqvvIoNIE\/ZEoqRGnOVi7HQ7fzeUonZqiCF7BHyh07Oe4jVtp46PsONl1sgzH06OigPs6b3MH7Wnho4E8JDvuiGObZJicsGJ0Jj+41XJVsY0dP70HppDcGF9fobCed1Qdd0IsOSotXo2fZf8+UkgHecSYqhl2jwWWP4mUY+Reas9W7v5LtM7UgcYMOd\/D5jvAgMBAAGjggI7MIICNzAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFBmLl41KW2F4V\/SlXDUSijkI47B1MHAGCCsGAQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93d2RyZzUuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHJnNTA1MIIBHwYDVR0gBIIBFjCCARIwggEOBgoqhkiG92NkBQYBMIH\/MDcGCCsGAQUFBwIBFitodHRwczovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL3d3ZHJnNS5jcmwwHQYDVR0OBBYEFCLJPHtjE4W+OjvFM6m0+rGwgpMXMA4GA1UdDwEB\/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAPEbuz6g8uP2eg8tR8PaoUfziBx2CJNzukoob6k2o6jtPhzKaOTnbW\/hb2k2NzfsJSguxzZoZb07H\/WhbO9z5V4+TJEqEdI2gJGd3OYI5DY8vfIGBD+3rW\/h1tPzz3pSRvUyFHH3RjmdkSIIGCrBhJMTwUCtWWq7NbsB3gGHPCPKgUeVz+QGRE2cy\/zNxMzswT0swBXwtszlr3yZdr3y5dga5rgsfZVBVAc2hs085cQQxxkh1FSY\/St8q5ILKjhhl6WCwjobi1krUc5kkrU4VTm1FSGvGA7t3NEadR9ekaPcPdEBCN3iEKL4CKwoOjN5WSZpQzQJ5O4zQOqivmRzKgTCCBFUwggM9oAMCAQICFDt+gAru0wKh5uzbl9nKrCic8WmUMA0GCSqGSIb3DQEBCwUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0yMDEyMTYxOTM4NTZaFw0zMDEyMTAwMDAwMDBaMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfXdof+\/q80EsiPMfWJvoX9\/SfHj5kEWaa716+qzS9qiwhbtYelCGFLHTBDhBhqjxjSn5K48h11s\/CnAhIe2q5KbHJZv3IihbRsgQ8grqAbOL\/CnLrrP47b0i+nosRTZV9snuQLwIcTvxJvtdvtU++eMba3rLNydlmETta6QlFc4lQ1E7iaAV+2nWcSwGu2uPPbXRN3lPQ1Ro4gjrQneNdKXuxgeopJwv7YHyGEvvwYk8G50zRH9ltnu1z2nghDZ1w2UZXkF9nhMFzdwqoYmK2rnCGu3Ujia159uak1P2DJjIKOySSWyChnNEvgBib3TwL57X97IBXDxeePyuHJ7v3AgMBAAGjge8wgewwEgYDVR0TAQH\/BAgwBgEB\/wIBADAfBgNVHSMEGDAWgBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjBEBggrBgEFBQcBAQQ4MDYwNAYIKwYBBQUHMAGGKGh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtYXBwbGVyb290Y2EwLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwHQYDVR0OBBYEFBmLl41KW2F4V\/SlXDUSijkI47B1MA4GA1UdDwEB\/wQEAwIBBjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAWsQ1otnmCp5SogCCInfNci+Q+SKvFCXMqgpCYJLCvXUd60zKFeV+a0AQXvtbRXQN8Hp9iJHO3mOLQonSGN9Bs1ieBgiHSN1AryPV7essYOXrpH8c6ZyD1pRfTGI5ik6uE419Q7jcXqy+GEDy5g8sXROT8XtlqMJoSN7\/tJabDPsyNp6eDZVfOAqLltISbLeLC47XPuxvAarOTUVg24RxZmLlGWUwzYr\/RVP7bvuId0PDSGP591Gzcl554lbPvLuEuThaeK4RSFK7DTWLlN7MdJpo9UlglKzyqLMVhpDQzDBDhtPlcAJRtIHAqJfU6uqwjAlA7ziTss0iA+tnQ2XIRTCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN\/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm\/IlA7pVj01dDfFkNSMVSxVZHbOU9\/acns9QusFYUGePCLQg98usLCBvcLY\/ATCMt0PPD5098ytJKBrI\/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs\/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP\/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH\/BAQDAgEGMA8GA1UdEwEB\/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME\/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr\/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q\/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy\/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ\/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAbUwggGxAgEBMIGJMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMCEBXnn85SVQplAXyR3+Tus1kwDQYJYIZIAWUDBAIBBQAwDQYJKoZIhvcNAQEBBQAEggEAakQBWQCgB71WGMqtQpMm+xQyj1F\/nqiVdu97\/Fsf3kDzhOf7Gdqiwu9+6V6Kaz9MUn8AcGJg94Y8aVYoycal7yMwbCGeq5unjIKV3NR779ks2CeCIOR\/VM2Wszx5YyxAILsU3w9LwiKYgDoKC8PwcDsO4GCQAb1OlDeSQN2e17gdOLUBZsHxlpNJFCcUkvfjvZ1ID20xqxGyVsskkJZSMl334It4VETRCGiYqkzfS9HQnmGpwyPsWlB0YX6RySLMrwXFrFtS5GFgFT+VqaVI1DGJ\/Gbsi3Np8Kgv2CTsYgD8wqGeCDjlHENSYToQ3uQcSmHtt1luNemdvetoP2tDhw=="
}


$done({body : JSON.stringify(objc)});