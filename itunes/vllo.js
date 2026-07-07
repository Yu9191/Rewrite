/*
Vllo
解锁不了请开试用 一次性解锁

[rewrite_local]


^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/itunes/vllo.js

[mitm] 

hostname = buy.itunes.apple.com


*/







var objc = JSON.parse($response.body);

    objc = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "app_item_id": 952050883,
    "receipt_creation_date": "2024-10-25 09:29:41 Etc\/GMT",
    "bundle_id": "com.darinsoft.vimo",
    "original_purchase_date": "2024-10-25 09:10:57 Etc\/GMT",
    "in_app": [
      {
        "quantity": "1",
        "purchase_date_ms": "1729848534000",
        "expires_date": "2024-10-28 09:28:54 Etc\/GMT",
        "expires_date_pst": "2024-10-28 02:28:54 America\/Los_Angeles",
        "is_in_intro_offer_period": "true",
        "transaction_id": "220002257592586",
        "is_trial_period": "true",
        "original_transaction_id": "220002257592586",
        "purchase_date": "2024-10-25 09:28:54 Etc\/GMT",
        "product_id": "com.vimosoft.EVERYTHING",//
        "original_purchase_date_pst": "2024-10-25 02:28:56 America\/Los_Angeles",
        "in_app_ownership_type": "PURCHASED",
        "original_purchase_date_ms": "1729848536000",
        "web_order_line_item_id": "220001028121943",
        "expires_date_ms": "1730107734000",
        "purchase_date_pst": "2024-10-25 02:28:54 America\/Los_Angeles",
        "original_purchase_date": "2024-10-25 09:28:56 Etc\/GMT"
      }
    ],
    "adam_id": 952050883,
    "receipt_creation_date_pst": "2024-10-25 02:29:41 America\/Los_Angeles",
    "request_date": "2024-10-25 09:29:43 Etc\/GMT",
    "request_date_pst": "2024-10-25 02:29:43 America\/Los_Angeles",
    "version_external_identifier": 869855565,
    "request_date_ms": "1729848583114",
    "original_purchase_date_pst": "2024-10-25 02:10:57 America\/Los_Angeles",
    "application_version": "4",
    "original_purchase_date_ms": "1729847457000",
    "receipt_creation_date_ms": "1729848581000",
    "original_application_version": "4",
    "download_id": 503932966556570299
  },
  "pending_renewal_info": [
    {
      "product_id": "com.vimosoft.EVERYTHING",
      "original_transaction_id": "220002257592586",
      "auto_renew_product_id": "com.vimosoft.vllo.premium3.annually_subscription",
      "auto_renew_status": "1"
    }
  ],
  "status": 0,
  "latest_receipt_info": [
    {
      "quantity": "1",
      "purchase_date_ms": "1729848534000",
      "expires_date": "2024-10-28 09:28:54 Etc\/GMT",
      "expires_date_pst": "2024-10-28 02:28:54 America\/Los_Angeles",
      "is_in_intro_offer_period": "true",
      "transaction_id": "220002257592586",
      "is_trial_period": "true",
      "original_transaction_id": "220002257592586",
      "purchase_date": "2024-10-25 09:28:54 Etc\/GMT",
      "product_id": "com.vimosoft.EVERYTHING",
      "original_purchase_date_pst": "2024-10-25 02:28:56 America\/Los_Angeles",
      "in_app_ownership_type": "PURCHASED",
      "subscription_group_identifier": "20877865",
      "original_purchase_date_ms": "1729848536000",
      "web_order_line_item_id": "220001028121943",
      "expires_date_ms": "1730107734000",
      "purchase_date_pst": "2024-10-25 02:28:54 America\/Los_Angeles",
      "original_purchase_date": "2024-10-25 09:28:56 Etc\/GMT"
    }
  ],
  "latest_receipt": "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\/mB3AXk+Ezt\/hQDPlX+CXZQgNOuSdbUGQfufmZckuu+62JlK9Hcuedg43qPYL0VQROQzIpnV9+WchPnGBBHL4FXhNMsVsiMVpQIDAQABo4ICOzCCAjcwDAYDVR0TAQH\/BAIwADAfBgNVHSMEGDAWgBQZi5eNSltheFf0pVw1Eoo5COOwdTBwBggrBgEFBQcBAQRkMGIwLQYIKwYBBQUHMAKGIWh0dHA6Ly9jZXJ0cy5hcHBsZS5jb20vd3dkcmc1LmRlcjAxBggrBgEFBQcwAYYlaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwMy13d2RyZzUwNTCCAR8GA1UdIASCARYwggESMIIBDgYKKoZIhvdjZAUGATCB\/zA3BggrBgEFBQcCARYraHR0cHM6Ly93d3cuYXBwbGUuY29tL2NlcnRpZmljYXRlYXV0aG9yaXR5LzCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjAwBgNVHR8EKTAnMCWgI6Ahhh9odHRwOi8vY3JsLmFwcGxlLmNvbS93d2RyZzUuY3JsMB0GA1UdDgQWBBTvKFe0YIhJVTHw\/VgO8f0ak8Qk\/DAOBgNVHQ8BAf8EBAMCB4AwEAYKKoZIhvdjZAYLAQQCBQAwDQYJKoZIhvcNAQELBQADggEBADUj0rtQvzZnzAA1RHyKk6fEXp+5ROpyR88Qhroc7Qp1HlkwdYXKInWJQgvhnHDlPqU8epD4PxKsc0wkWJku34HxDyWmDqUwTqXmsM1Te0VLsOZbOjDWtPQrUqIPT9YTI4Iz5i2FkVB8MdRIcZT6CJXunQBmGrnmiQyOsYl9FkqwiBUdFCmHFB0x+q5qAPI9kWNbgIJIHj5K0wLdhl3NcuI3PKgLJbtj2qs\/MWWoJxvwO1NFHRJ+Rh\/FrB\/Ic5yY+DSwYH3u8xEMVpY+CQTn7eQeR1mw8IM3LvscxxOjaXLrvZgmkISPbk38aCn7TW4Y7dytqrnEaZgUCP35S\/ts\/pkwggRVMIIDPaADAgECAhQ7foAK7tMCoebs25fZyqwonPFplDANBgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJVUzETMBEGA1UEChMKQXBwbGUgSW5jLjEmMCQGA1UECxMdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxFjAUBgNVBAMTDUFwcGxlIFJvb3QgQ0EwHhcNMjAxMjE2MTkzODU2WhcNMzAxMjEwMDAwMDAwWjB1MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzUxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn13aH\/v6vNBLIjzH1ib6F\/f0nx4+ZBFmmu9evqs0vaosIW7WHpQhhSx0wQ4QYao8Y0p+SuPIddbPwpwISHtquSmxyWb9yIoW0bIEPIK6gGzi\/wpy66z+O29Ivp6LEU2VfbJ7kC8CHE78Sb7Xb7VPvnjG2t6yzcnZZhE7WukJRXOJUNRO4mgFftp1nEsBrtrjz210Td5T0NUaOII60J3jXSl7sYHqKScL+2B8hhL78GJPBudM0R\/ZbZ7tc9p4IQ2dcNlGV5BfZ4TBc3cKqGJitq5whrt1I4mtefbmpNT9gyYyCjskklsgoZzRL4AYm908C+e1\/eyAVw8Xnj8rhye79wIDAQABo4HvMIHsMBIGA1UdEwEB\/wQIMAYBAf8CAQAwHwYDVR0jBBgwFoAUK9BpR5R2Cf70a40uQKb3R01\/CF4wRAYIKwYBBQUHAQEEODA2MDQGCCsGAQUFBzABhihodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLWFwcGxlcm9vdGNhMC4GA1UdHwQnMCUwI6AhoB+GHWh0dHA6Ly9jcmwuYXBwbGUuY29tL3Jvb3QuY3JsMB0GA1UdDgQWBBQZi5eNSltheFf0pVw1Eoo5COOwdTAOBgNVHQ8BAf8EBAMCAQYwEAYKKoZIhvdjZAYCAQQCBQAwDQYJKoZIhvcNAQELBQADggEBAFrENaLZ5gqeUqIAgiJ3zXIvkPkirxQlzKoKQmCSwr11HetMyhXlfmtAEF77W0V0DfB6fYiRzt5ji0KJ0hjfQbNYngYIh0jdQK8j1e3rLGDl66R\/HOmcg9aUX0xiOYpOrhONfUO43F6svhhA8uYPLF0Tk\/F7ZajCaEje\/7SWmwz7Mjaeng2VXzgKi5bSEmy3iwuO1z7sbwGqzk1FYNuEcWZi5RllMM2K\/0VT+277iHdDw0hj+fdRs3JeeeJWz7y7hLk4WniuEUhSuw01i5TezHSaaPVJYJSs8qizFYaQ0MwwQ4bT5XACUbSBwKiX1OrqsIwJQO84k7LNIgPrZ0NlyEUwggS7MIIDo6ADAgECAgECMA0GCSqGSIb3DQEBBQUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0wNjA0MjUyMTQwMzZaFw0zNTAyMDkyMTQwMzZaMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOSRqQkfkdseR1DrBe1eeYQt6zaiV0xV7IsZid75S2z1B6siMALoGD74UAnTf0GomPnRymacJGsR0KO75Bsqwx+VnnoMpEeLW9QWNzPLxA9NzhRp0ckZcvVdDtV\/X5vyJQO6VY9NXQ3xZDUjFUsVWR2zlPf2nJ7PULrBWFBnjwi0IPfLrCwgb3C2PwEwjLdDzw+dPfMrSSgayP7OtbkO2V4c1ss9tTqt9A8OAJILsSEWLnTVPA3bYharo3GSR1NVwa8vQbP4++NwzeajTEV+H0xrUJZBicR0YgsQg0GHM4qBsTBY7FoEMoxos48d3mVz\/2deZbxJ2HafMxRloXeUyS0CAwEAAaOCAXowggF2MA4GA1UdDwEB\/wQEAwIBBjAPBgNVHRMBAf8EBTADAQH\/MB0GA1UdDgQWBBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjAfBgNVHSMEGDAWgBQr0GlHlHYJ\/vRrjS5ApvdHTX8IXjCCAREGA1UdIASCAQgwggEEMIIBAAYJKoZIhvdjZAUBMIHyMCoGCCsGAQUFBwIBFh5odHRwczovL3d3dy5hcHBsZS5jb20vYXBwbGVjYS8wgcMGCCsGAQUFBwICMIG2GoGzUmVsaWFuY2Ugb24gdGhpcyBjZXJ0aWZpY2F0ZSBieSBhbnkgcGFydHkgYXNzdW1lcyBhY2NlcHRhbmNlIG9mIHRoZSB0aGVuIGFwcGxpY2FibGUgc3RhbmRhcmQgdGVybXMgYW5kIGNvbmRpdGlvbnMgb2YgdXNlLCBjZXJ0aWZpY2F0ZSBwb2xpY3kgYW5kIGNlcnRpZmljYXRpb24gcHJhY3RpY2Ugc3RhdGVtZW50cy4wDQYJKoZIhvcNAQEFBQADggEBAFw2mUwteLftjJvc83eb8nbSdzBPwR+Fg4UbmT1HN\/Kpm0COLNSxkBLYvvRzm+7SZA\/LeU802KI++Xj\/a8gH7H05g4tTINM4xLG\/mk8Ka\/8r\/FmnBQl8F0BWER5007eLIztHo9VvJOLr0bdw3w9F4SfK8W147ee1Fxeo3H4iNcol1dkP1mvUoiQjEfehrI9zgWDGG1sJL5Ky+ERI8GA4nhX1PSZnIIozavcNgs\/e66Mv+VNqW2TAYzN39zoHLFbr2g8hDtq6cxlPtdk2f8GHVdmnmbkyQvvY1XGefqFStxu9k0IkEirHDx22TZxeY8hLgBdQqorV2uT80AkHN7B1dSExggG1MIIBsQIBATCBiTB1MUQwQgYDVQQDDDtBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9ucyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTELMAkGA1UECwwCRzUxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTAhB9OSAJTr7z+O\/KbBDqjkMDMA0GCWCGSAFlAwQCAQUAMA0GCSqGSIb3DQEBAQUABIIBAJWiy0ByUcUQQBFqvZwHPObZCdHkmxt8RmKurKhawi8g6on5Pvwg651st96\/OBCmRJYhnmT9Bnpy5+rzH0c7hxKvELQzl2We\/T5q59ZI9VupHqdIb49u11lH+6kIx+FQFUGmiIERZIxZ0YLchx8\/mc3zWkbMTrQ0ArWUDzvcw4eHAAP3beQKf1Br2rH\/zVjgw4CChvPf8RVmGG1HKsNv9TIZeMnCop+41UO5CX3DaWdCpcA0FcxvknpRpX4Os927Vi\/Kqjtc7dHx9oyMJNPSLr972KzS2Vt6Jcxx1vTNUXwsnr2ISe4lYQQv0uADkT9v32Xc+v8s5rMwyO48g6WgVDA="
}


$done({body : JSON.stringify(objc)});
