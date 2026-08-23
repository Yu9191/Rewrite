/*
‎Duet Display 2.18
DuetAir 1.2.12

需登录

[rewrite_local]

https://rdp.duetdisplay.com/v1/users/validateReceipt url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/DuetDisplay.js

[mitm]
hostname = rdp.duetdisplay.com
*/


 $done({
  body: JSON.stringify({
    success: true,
    products: [{
      vendor: "apple",
      product: "DuetStudio",//pro版
      subscriptionId: 391961,
      purchaseDate: "2023-11-14T19:47:25Z",
      cancelled: false,
      expiresDate: "9999-09-09T19:47:22Z",
      inTrial: true
    }],
    hasStripeAccount: false
  })
});
