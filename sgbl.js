
/*
时光伴侣

[rewrite_local]

^https?:\/\/api\.qonversion\.io\/v1\/user\/init$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/sgbl.js

[mitm]
hostname = api.qonversion.io
*/


(function() {
  var body = $response.body;
  if (!body) {
    $done({});
    return;
  }
  var obj = JSON.parse(body);
  obj.data.user_products = [
    {
      "id": "timeCompanion_18",
      "type": 2,
      "store_id": "timeCompanion_18",
      "duration": null
    }
  ];
  obj.data.permissions = [
    {
      "id": "premission_01",
      "trial_start_timestamp": 1736912678,
      "active": 1,
      "started_timestamp": 1736912678,
      "grant_type": "purchase",
      "associated_product": "timeCompanion_18",
      "source": "appstore",
      "renews_count": 0,
      "store_transactions": [
        {
          "ownership_type": "owner",
          "transaction_id": "220002381937096",
          "environment": "production",
          "transaction_timestamp": 1736912678,
          "expiration_timestamp": 9737171878,
          "original_transaction_id": "220002381937096",
          "type": "2"
        }
      ],
      "current_period_type": "intro",
      "expiration_timestamp": 9737171878,
      "renew_state": 1
    }
  ];

  $done({ body: JSON.stringify(obj) });
})();