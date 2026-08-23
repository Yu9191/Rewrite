/*

星空 12.0.2

[rewrite_local]

^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/Xk.js

[mitm] 

hostname = buy.itunes.apple.com

*/

var objc = JSON.parse($response.body);

    objc = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 475772902,
    "receipt_creation_date": "2023-12-21 10:58:14 Etc\/GMT",
    "bundle_id": "com.icandiapps.nightsky",
    "original_purchase_date": "2023-12-21 10:47:25 Etc\/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1703156293000",
        "expires_date": "2099-09-09 10:58:13 Etc\/GMT",
        "expires_date_pst": "2099-09-09 02:58:13 America\/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "transaction_id": "220001838842237",
        "is_trial_period": "true",
        "original_transaction_id": "220001838842237",
        "purchase_date": "2023-12-21 10:58:13 Etc\/GMT",
        "product_id": "com.icandiapps.ns4.annual",
        "original_purchase_date_pst": "2023-12-21 02:58:14 America\/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1703156294000",
        "web_order_line_item_id": "220000845088467",
        "expires_date_ms": "4092595200000",
        "purchase_date_pst": "2023-12-21 02:58:13 America\/Los_Angeles",
        "original_purchase_date": "2023-12-21 10:58:14 Etc\/GMT"
      }
    ],
    "adam_id": 475772902,
    "receipt_creation_date_pst": "2023-12-21 02:58:14 America\/Los_Angeles",
    "request_date": "2023-12-21 10:58:17 Etc\/GMT",
    "request_date_pst": "2023-12-21 02:58:17 America\/Los_Angeles",
    "version_external_identifier": 860381714,
    "request_date_ms": "1703156297130",
    "original_purchase_date_pst": "2023-12-21 02:47:25 America\/Los_Angeles",
    "application_version": "12.0.2.1",
    "original_purchase_date_ms": "1703155645000",
    "receipt_creation_date_ms": "1703156294000",
    "original_application_version": "12.0.2.1",
    "download_id": 503058329187191212
  },
  "pending_renewal_info": [
    {
      "product_id": "com.icandiapps.ns4.annual",
      "original_transaction_id": "220001838842237",
      "auto_renew_product_id": "com.icandiapps.ns4.annual",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1703156293000",
      "expires_date": "2099-09-09 10:58:13 Etc\/GMT",
      "expires_date_pst": "2099-09-09 02:58:13 America\/Los_Angeles",
      "is_in_intro_offer_period": "false",
      "transaction_id": "220001838842237",
      "is_trial_period": "true",
      "original_transaction_id": "220001838842237",
      "purchase_date": "2023-12-21 10:58:13 Etc\/GMT",
      "product_id": "com.icandiapps.ns4.annual",
      "original_purchase_date_pst": "2023-12-21 02:58:14 America\/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "20347135",
      "original_purchase_date_ms": "1703156294000",
      "web_order_line_item_id": "220000845088467",
      "expires_date_ms": "4092595200000",
      "purchase_date_pst": "2023-12-21 02:58:13 America\/Los_Angeles",
      "original_purchase_date": "2023-12-21 10:58:14 Etc\/GMT"
    }
  ],
  "latest_receipt": "MIIUpgYJKoZIhvcNAQcCoIIUlzCCFJMCAQExDzANBglghkgBZQMEAgEFADCCA9wGCSqGSIb3DQEHAaCCA80EggPJMYIDxTAKAgEUAgEBBAIMADALAgEZAgEBBAMCAQMwDAIBCgIBAQQEFgI0KzAMAgEOAgEBBAQCAgDmMA0CAQsCAQEEBQIDA0e1MA0CAQ0CAQEEBQIDAkpVMA4CAQECAQEEBgIEHFu35jAOAgEJAgEBBAYCBFAzMDIwDgIBEAIBAQQGAgQzSGISMBICAQMCAQEECgwIMTIuMC4yLjEwEgIBDwIBAQQKAggG+zjilIEJrDASAgETAgEBBAoMCDEyLjAuMi4xMBQCAQACAQEEDAwKUHJvZHVjdGlvbjAYAgEEAgECBBDDcwUcM1nkh5tnNAzzxYsJMBwCAQUCAQEEFAxsQWjZBC1rtHtvBi\/f2C\/6n0zAMB4CAQgCAQEEFhYUMjAyMy0xMi0yMVQxMDo1ODoxNFowHgIBDAIBAQQWFhQyMDIzLTEyLTIxVDEwOjU4OjE3WjAeAgESAgEBBBYWFDIwMjMtMTItMjFUMTA6NDc6MjVaMCECAQICAQEEGQwXY29tLmljYW5kaWFwcHMubmlnaHRza3kwPQIBBwIBAQQ1zhwt6kAOawFjVEzF5NMEbLPmjDr822ZaqRq0WmfWMIEEvAm1MWui2QgRyVj3MYFKvA6cmPMwWwIBBgIBAQRTi3zoIMVdFQY4Fs87ozREHvpu3X8a9Ewo5BBUfjb7MXbBvgNm9bOwnVyr0H0Udx1RnMmEZ8dBPskGcVavPTutzrJWH8Ok64rTFM2ugARxBIhNHBEwggGVAgERAgEBBIIBizGCAYcwCwICBq0CAQEEAgwAMAsCAgawAgEBBAIWADALAgIGsgIBAQQCDAAwCwICBrMCAQEEAgwAMAsCAga0AgEBBAIMADALAgIGtQIBAQQCDAAwCwICBrYCAQEEAgwAMAwCAgalAgEBBAMCAQEwDAICBqsCAQEEAwIBAzAMAgIGsQIBAQQDAgEBMAwCAga3AgEBBAMCAQAwDAICBroCAQEEAwIBADAPAgIGrgIBAQQGAgREwBy7MBICAgavAgEBBAkCBwDIFvA4xtMwGgICBqcCAQEEEQwPMjIwMDAxODM4ODQyMjM3MBoCAgapAgEBBBEMDzIyMDAwMTgzODg0MjIzNzAfAgIGqAIBAQQWFhQyMDIzLTEyLTIxVDEwOjU4OjEzWjAfAgIGqgIBAQQWFhQyMDIzLTEyLTIxVDEwOjU4OjE0WjAfAgIGrAIBAQQWFhQyMDI0LTAxLTIxVDEwOjU4OjEzWjAkAgIGpgIBAQQbDBljb20uaWNhbmRpYXBwcy5uczQuYW5udWFsoIIO4jCCBcYwggSuoAMCAQICEBXnn85SVQplAXyR3+Tus1kwDQYJKoZIhvcNAQELBQAwdTFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxCzAJBgNVBAsMAkc1MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yMjA5MDIxOTEzNTdaFw0yNDEwMDExOTEzNTZaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC8RM4LrWowdq\/ACQw0ehlh770gDfX6Q54T9azzPJMO12WbdMJaNydU8I7NRjqCzHW\/EuALKe5Ya6DnQir3hwCfosypIuZt6A3nyw\/00GRbs7+NY83Cm2KwKdfewKONrRuk+Oto23OGLl\/MuyF9a7g4bqvvIoNIE\/ZEoqRGnOVi7HQ7fzeUonZqiCF7BHyh07Oe4jVtp46PsONl1sgzH06OigPs6b3MH7Wnho4E8JDvuiGObZJicsGJ0Jj+41XJVsY0dP70HppDcGF9fobCed1Qdd0IsOSotXo2fZf8+UkgHecSYqhl2jwWWP4mUY+Reas9W7v5LtM7UgcYMOd\/D5jvAgMBAAGjggI7MIICNzAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFBmLl41KW2F4V\/SlXDUSijkI47B1MHAGCCsGAQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93d2RyZzUuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHJnNTA1MIIBHwYDVR0gBIIBFjCCARIwggEOBgoqhkiG92NkBQYBMIH\/MDcGCCsGAQUFBwIBFitodHRwczovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL3d3ZHJnNS5jcmwwHQYDVR0OBBYEFCLJPHtjE4W+OjvFM6m0+rGwgpMXMA4GA1UdDwEB\/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAPEbuz6g8uP2eg8tR8PaoUfziBx2CJNzukoob6k2o6jtPhzKaOTnbW\/hb2k2NzfsJSguxzZoZb07H\/WhbO9z5V4+TJEqEdI2gJGd3OYI5DY8vfIGBD+3rW\/h1tPzz3pSRvUyFHH3RjmdkSIIGCrBhJMTwUCtWWq7NbsB3gGHPCPKgUeVz+QGRE2cy\/zNxMzswT0swBXwtszlr3yZdr3y5dga5rgsfZVBVAc2hs085cQQxxkh1FSY\/St8q5ILKjhhl6WCwjobi1krUc5kkrU4VTm1FSGvGA7t3NEadR9ekaPcPdEBCN3iEKL4CKwoOjN5WSZpQzQJ5O4zQOqivmRzKgTCCBFUwggM9oAMCAQICFDt+gAru0wKh5uzbl9nKrCic8WmUMA0GCSqGSIb3DQEBCwUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0yMDEyMTYxOTM4NTZaFw0zMDEyMTAwMDAwMDBaMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfXdof+\/q80EsiPMfWJvoX9\/SfHj5kEWaa716+qzS9qiwhbtYelCGFLHTBDhBhqjxjSn5K48h11s\/CnAhIe2q5KbHJZv3IihbRsgQ8grqAbOL\/CnLrrP47b0i+nosRTZV9snuQLwIcTvxJvtdvtU++eMba3rLNydlmETta6QlFc4lQ1E7iaAV+2nWcSwGu2uPPbXRN3lPQ1Ro4gjrQneNdKXuxgeopJwv7YHyGEvvwYk8G50zRH9ltnu1z2nghDZ1w2UZXkF9nhMFzdwqoYmK2rnCGu3Ujia159uak1P2DJjIKOySSWyChnNEvgBib3TwL57X97IBXDxeePyuHJ7v3AgMBAAGjge8wgewwEgYDVR0TAQH\/BAgwBgEB\/wIBADAfBgNVHSMEGDAWgBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjBEBggrBgEFBQcBAQQ4MDYwNAYIKwYBBQUHMAGGKGh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtYXBwbGVyb290Y2EwLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwHQYDVR0OBBYEFBmLl41KW2F4V\/SlXDUSijkI47B1MA4GA1UdDwEB\/wQEAwIBBjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAWsQ1otnmCp5SogCCInfNci+Q+SKvFCXMqgpCYJLCvXUd60zKFeV+a0AQXvtbRXQN8Hp9iJHO3mOLQonSGN9Bs1ieBgiHSN1AryPV7essYOXrpH8c6ZyD1pRfTGI5ik6uE419Q7jcXqy+GEDy5g8sXROT8XtlqMJoSN7\/tJabDPsyNp6eDZVfOAqLltISbLeLC47XPuxvAarOTUVg24RxZmLlGWUwzYr\/RVP7bvuId0PDSGP591Gzcl554lbPvLuEuThaeK4RSFK7DTWLlN7MdJpo9UlglKzyqLMVhpDQzDBDhtPlcAJRtIHAqJfU6uqwjAlA7ziTss0iA+tnQ2XIRTCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN\/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm\/IlA7pVj01dDfFkNSMVSxVZHbOU9\/acns9QusFYUGePCLQg98usLCBvcLY\/ATCMt0PPD5098ytJKBrI\/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs\/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP\/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH\/BAQDAgEGMA8GA1UdEwEB\/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME\/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr\/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q\/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy\/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ\/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAbUwggGxAgEBMIGJMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMCEBXnn85SVQplAXyR3+Tus1kwDQYJYIZIAWUDBAIBBQAwDQYJKoZIhvcNAQEBBQAEggEATMq26TAE0SarjczOcYLqrOTJFTTfNMbPCxCEFASB8Frrry4cy\/vSOW5tg0kCDmp99kJJrZaVZsjOKSzmFbD1x8l8p4kavSwlixbgPwXMZtj64CbCOMAPO0Wry+sm2J0a6VFMT\/BV6yXlU7k\/IeZAvQ\/klZMzeeGBhlhOsWJRB0ZrnqNZaFVFWNLQQMSTiDbUudFQa3iGplVxKIvIVyrRKa47S3Bz\/UadjdwrE84QX0CuMVXCE9neid\/ItygNoCANkYefGYpTq4i\/1\/KdZRwpk49l7hAav9G\/W6S4P5Fq\/mON9SPBSRjCa++YhMpfQr1sv46uMBQoBfGiUjPOEINtBA=="
}


$done({body : JSON.stringify(objc)});
