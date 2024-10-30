/*
TubePod
[rewrite_local]


^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/tubepod.js

[mitm] 

hostname = buy.itunes.apple.com

**/







var objc = JSON.parse($response.body);

    objc = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 6636469468,
    "receipt_creation_date": "2024-10-30 10:46:36 Etc\/GMT",
    "bundle_id": "com.byteapp.tubepod",
    "original_purchase_date": "2024-10-30 10:42:25 Etc\/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1730285195000",
        "expires_date": "2099-09-09 11:46:35 Etc\/GMT",
        "expires_date_pst": "2099-09-09 03:46:35 America\/Los_Angeles",
        "is_in_intro_offer_period": "true",
        "transaction_id": "220002265223988",
        "is_trial_period": "true",
        "original_transaction_id": "220002265223988",
        "purchase_date": "2024-10-30 10:46:35 Etc\/GMT",
        "product_id": "com.byteapp.tubepod.year",
        "original_purchase_date_pst": "2024-10-30 03:46:36 America\/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1730285196000",
        "web_order_line_item_id": "220001031389473",
        "expires_date_ms": "4092595200000",
        "purchase_date_pst": "2024-10-30 03:46:35 America\/Los_Angeles",
        "original_purchase_date": "2024-10-30 10:46:36 Etc\/GMT"
      }
    ],
    "adam_id": 6636469468,
    "receipt_creation_date_pst": "2024-10-30 03:46:36 America\/Los_Angeles",
    "request_date": "2024-10-30 10:49:55 Etc\/GMT",
    "request_date_pst": "2024-10-30 03:49:55 America\/Los_Angeles",
    "version_external_identifier": 869988156,
    "request_date_ms": "1730285395742",
    "original_purchase_date_pst": "2024-10-30 03:42:25 America\/Los_Angeles",
    "application_version": "38",
    "original_purchase_date_ms": "1730284945000",
    "receipt_creation_date_ms": "1730285196000",
    "original_application_version": "38",
    "download_id": 503947301611230913
  },
  "pending_renewal_info": [
    {
      "product_id": "com.byteapp.tubepod.year",
      "original_transaction_id": "220002265223988",
      "auto_renew_product_id": "com.byteapp.tubepod.year",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1730285195000",
      "expires_date": "2099-09-09 11:46:35 Etc\/GMT",
      "expires_date_pst": "2099-09-09 03:46:35 America\/Los_Angeles",
      "is_in_intro_offer_period": "true",
      "transaction_id": "220002265223988",
      "is_trial_period": "true",
      "original_transaction_id": "220002265223988",
      "purchase_date": "2024-10-30 10:46:35 Etc\/GMT",
      "product_id": "com.byteapp.tubepod.year",
      "original_purchase_date_pst": "2024-10-30 03:46:36 America\/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "21525304",
      "original_purchase_date_ms": "1730285196000",
      "web_order_line_item_id": "220001031389473",
      "expires_date_ms": "4092595200000",
      "purchase_date_pst": "2024-10-30 03:46:35 America\/Los_Angeles",
      "original_purchase_date": "2024-10-30 10:46:36 Etc\/GMT"
    }
  ],
  "latest_receipt": "MIIUmgYJKoZIhvcNAQcCoIIUizCCFIcCAQExDzANBglghkgBZQMEAgEFADCCA9AGCSqGSIb3DQEHAaCCA8EEggO9MYIDuTAKAgEUAgEBBAIMADALAgEZAgEBBAMCAQMwDAIBAwIBAQQEDAIzODAMAgEKAgEBBAQWAjQrMAwCAQ4CAQEEBAICAUwwDAIBEwIBAQQEDAIzODANAgENAgEBBAUCAwK\/hDAOAgEJAgEBBAYCBFAzMDUwDgIBCwIBAQQGAgQHlfVEMA4CARACAQEEBgIEM9r3PDAPAgEBAgEBBAcCBQGLkHzcMBICAQ8CAQEECgIIBv5hZpoN1sEwFAIBAAIBAQQMDApQcm9kdWN0aW9uMBgCAQQCAQIEEB79mh3V6FOScr\/plhpcHSQwHAIBBQIBAQQUWP15YvgXT4k\/Wx\/gSfzls5\/8lb8wHQIBAgIBAQQVDBNjb20uYnl0ZWFwcC50dWJlcG9kMB4CAQgCAQEEFhYUMjAyNC0xMC0zMFQxMDo0NjozNlowHgIBDAIBAQQWFhQyMDI0LTEwLTMwVDEwOjQ5OjU1WjAeAgESAgEBBBYWFDIwMjQtMTAtMzBUMTA6NDI6MjVaMEoCAQcCAQEEQnRWoRkaL1si2O7HDvWZJw9J8zSrHhfi\/zrQtP8PI1ypoFcWEoUwPffdGbe0yaqd7HX3PxM1OQ6lA5j2QEcQ\/iI\/UDBQAgEGAgEBBEjAg4kqqKfmB6b4Ue3VARd9BZE1RQ70VZZkeMzTbUlg1Kv3q+qOVersRg+gTlTuizGSomypWMOuWX\/oTNd08jqyxF3nZR8kewkwggGVAgERAgEBBIIBizGCAYcwCwICBq0CAQEEAgwAMAsCAgawAgEBBAIWADALAgIGsgIBAQQCDAAwCwICBrMCAQEEAgwAMAsCAga0AgEBBAIMADALAgIGtQIBAQQCDAAwCwICBrYCAQEEAgwAMAwCAgalAgEBBAMCAQEwDAICBqsCAQEEAwIBAzAMAgIGsQIBAQQDAgEBMAwCAga3AgEBBAMCAQEwDAICBroCAQEEAwIBADAQAgIGrgIBAQQHAgUBi5B9kTASAgIGrwIBAQQJAgcAyBb7U4EhMBoCAganAgEBBBEMDzIyMDAwMjI2NTIyMzk4ODAaAgIGqQIBAQQRDA8yMjAwMDIyNjUyMjM5ODgwHwICBqgCAQEEFhYUMjAyNC0xMC0zMFQxMDo0NjozNVowHwICBqoCAQEEFhYUMjAyNC0xMC0zMFQxMDo0NjozNlowHwICBqwCAQEEFhYUMjAyNC0xMS0wNlQxMTo0NjozNVowIwICBqYCAQEEGgwYY29tLmJ5dGVhcHAudHViZXBvZC55ZWFyoIIO4jCCBcYwggSuoAMCAQICEH05IAlOvvP478psEOqOQwMwDQYJKoZIhvcNAQELBQAwdTFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxCzAJBgNVBAsMAkc1MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yNDA3MjQxNDUwMDNaFw0yNjA4MjMxNDUwMDJaMIGJMTcwNQYDVQQDDC5NYWMgQXBwIFN0b3JlIGFuZCBpVHVuZXMgU3RvcmUgUmVjZWlwdCBTaWduaW5nMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCtDzabzzfagXFb1vEU\/BnT9dTwN01cRsKaKUdRYb6xP5hZ7BwXuq+zCVcFRNcXbV3SMMK7M6HUifR2OVZXLTU\/Tal4gtFaYdZ7sC6VVPAHv2DkKaQzPUevdo9dA5uaOAohzN8Ul4fUHWHKKo3EPlWufJ1iALAKGDm45h2N86Qw8ZSTY9sT6TyOKf3ViHOzFJhvc8niM9Un9rbjddbqzqvf4vgMvlmK7XB6rpIF2UwHIOVtTEh00D7+YHcBeT4TO3+FAM+Vf4JdlCA065J1tQZB+5+ZlyS677rYmUr0dy552Djeo9gvRVBE5DMimdX35ZyE+cYEEcvgVeE0yxWyIxWlAgMBAAGjggI7MIICNzAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFBmLl41KW2F4V\/SlXDUSijkI47B1MHAGCCsGAQUFBwEBBGQwYjAtBggrBgEFBQcwAoYhaHR0cDovL2NlcnRzLmFwcGxlLmNvbS93d2RyZzUuZGVyMDEGCCsGAQUFBzABhiVodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHJnNTA1MIIBHwYDVR0gBIIBFjCCARIwggEOBgoqhkiG92NkBQYBMIH\/MDcGCCsGAQUFBwIBFitodHRwczovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDAGA1UdHwQpMCcwJaAjoCGGH2h0dHA6Ly9jcmwuYXBwbGUuY29tL3d3ZHJnNS5jcmwwHQYDVR0OBBYEFO8oV7RgiElVMfD9WA7x\/RqTxCT8MA4GA1UdDwEB\/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEANSPSu1C\/NmfMADVEfIqTp8Ren7lE6nJHzxCGuhztCnUeWTB1hcoidYlCC+GccOU+pTx6kPg\/EqxzTCRYmS7fgfEPJaYOpTBOpeawzVN7RUuw5ls6MNa09CtSog9P1hMjgjPmLYWRUHwx1EhxlPoIle6dAGYaueaJDI6xiX0WSrCIFR0UKYcUHTH6rmoA8j2RY1uAgkgePkrTAt2GXc1y4jc8qAslu2Paqz8xZagnG\/A7U0UdEn5GH8WsH8hznJj4NLBgfe7zEQxWlj4JBOft5B5HWbDwgzcu+xzHE6Npcuu9mCaQhI9uTfxoKftNbhjt3K2qucRpmBQI\/flL+2z+mTCCBFUwggM9oAMCAQICFDt+gAru0wKh5uzbl9nKrCic8WmUMA0GCSqGSIb3DQEBCwUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0yMDEyMTYxOTM4NTZaFw0zMDEyMTAwMDAwMDBaMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCfXdof+\/q80EsiPMfWJvoX9\/SfHj5kEWaa716+qzS9qiwhbtYelCGFLHTBDhBhqjxjSn5K48h11s\/CnAhIe2q5KbHJZv3IihbRsgQ8grqAbOL\/CnLrrP47b0i+nosRTZV9snuQLwIcTvxJvtdvtU++eMba3rLNydlmETta6QlFc4lQ1E7iaAV+2nWcSwGu2uPPbXRN3lPQ1Ro4gjrQneNdKXuxgeopJwv7YHyGEvvwYk8G50zRH9ltnu1z2nghDZ1w2UZXkF9nhMFzdwqoYmK2rnCGu3Ujia159uak1P2DJjIKOySSWyChnNEvgBib3TwL57X97IBXDxeePyuHJ7v3AgMBAAGjge8wgewwEgYDVR0TAQH\/BAgwBgEB\/wIBADAfBgNVHSMEGDAWgBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjBEBggrBgEFBQcBAQQ4MDYwNAYIKwYBBQUHMAGGKGh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDMtYXBwbGVyb290Y2EwLgYDVR0fBCcwJTAjoCGgH4YdaHR0cDovL2NybC5hcHBsZS5jb20vcm9vdC5jcmwwHQYDVR0OBBYEFBmLl41KW2F4V\/SlXDUSijkI47B1MA4GA1UdDwEB\/wQEAwIBBjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQsFAAOCAQEAWsQ1otnmCp5SogCCInfNci+Q+SKvFCXMqgpCYJLCvXUd60zKFeV+a0AQXvtbRXQN8Hp9iJHO3mOLQonSGN9Bs1ieBgiHSN1AryPV7essYOXrpH8c6ZyD1pRfTGI5ik6uE419Q7jcXqy+GEDy5g8sXROT8XtlqMJoSN7\/tJabDPsyNp6eDZVfOAqLltISbLeLC47XPuxvAarOTUVg24RxZmLlGWUwzYr\/RVP7bvuId0PDSGP591Gzcl554lbPvLuEuThaeK4RSFK7DTWLlN7MdJpo9UlglKzyqLMVhpDQzDBDhtPlcAJRtIHAqJfU6uqwjAlA7ziTss0iA+tnQ2XIRTCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN\/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm\/IlA7pVj01dDfFkNSMVSxVZHbOU9\/acns9QusFYUGePCLQg98usLCBvcLY\/ATCMt0PPD5098ytJKBrI\/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs\/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP\/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH\/BAQDAgEGMA8GA1UdEwEB\/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME\/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr\/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q\/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy\/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ\/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAbUwggGxAgEBMIGJMHUxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MQswCQYDVQQLDAJHNTETMBEGA1UECgwKQXBwbGUgSW5jLjELMAkGA1UEBhMCVVMCEH05IAlOvvP478psEOqOQwMwDQYJYIZIAWUDBAIBBQAwDQYJKoZIhvcNAQEBBQAEggEAjXR3+VBx0dJOTNTSQNPkJpZFPKO5OeRlmc462RWamZXr0hBmrZ2JN4diZxTyvWg2akvWU9Z834Q8Wu1Vu+zLTqgFNZ8DSVZ+LXPR4a5N5NGpqKTfG8M9FrmoMssK1LLYBWKWgUJLg8EqxsIFzjuXd8BFywFQXF42U74b50YJc+OqCohVTJWYOadAnC3Qk6\/fv3TgcrWuaHZEqML3rOQn2HAxO8mn9Ho7VK4J7f2BlqjKzw4RxLh4CrvN6wIQgfYxJvqBdbHcMQotrzJAAkp8Yr\/JoHe7p\/cgLRdfLEhHykVNVo3hUYSOH2gPhWwgK9dsgruukLYFLPGx4xTZLNb88g=="
}


$done({body : JSON.stringify(objc)});