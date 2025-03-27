/*
 * 2025-03-11 适配小火箭
 * 2025-03-26 增加新地址
 * 2025-03-27 增加三年二班
*/
const url = $request.url;
const isQX = typeof $task !== "undefined";

const apiUrls = {
  'd2x03a61ogs2x5.cloudfront.net': 'https://vpn3.lovebabyforever.workers.dev/?videoId=300000',
  'd3lijns9322mkl.cloudfront.net': 'https://vpn2.lovebabyforever.workers.dev',
  'dd38dkt7dfvyr.cloudfront.net': null,
  'd1xwta4tq724e9.cloudfront.net': 'https://vpn4.lovebabyforever.workers.dev',
  'snerbnew.pxyzjmspfl.work': 'https://kl.lovebabyforever.workers.dev'
};

const Gu = '1741105775-19918480-32-d52445865e1cb896e73d6d001044f961';

if (url.includes('auth_key=')) {
  let newAuthKey = null;
  let apiUrl = null;

  if (url.includes('d2x03a61ogs2x5.cloudfront.net')) {
    apiUrl = apiUrls['d2x03a61ogs2x5.cloudfront.net'];
  } else if (url.includes('d3lijns9322mkl.cloudfront.net')) {
    apiUrl = apiUrls['d3lijns9322mkl.cloudfront.net'];
  } else if (url.includes('dd38dkt7dfvyr.cloudfront.net')) {
    newAuthKey = Gu;
  } else if (url.includes('d1xwta4tq724e9.cloudfront.net')) {
    apiUrl = apiUrls['d1xwta4tq724e9.cloudfront.net'];
  } else if (url.includes('snerbnew.pxyzjmspfl.work')) {
    apiUrl = apiUrls['snerbnew.pxyzjmspfl.work'];
  }

  if (apiUrl) {
    if (isQX) {
      $task.fetch({ url: apiUrl }).then(
        response => {
          newAuthKey = response.body.replace(/"/g, '');
          let modifiedUrl = url.replace(/auth_key=[^&]+/, 'auth_key=' + newAuthKey);
          $done({ url: modifiedUrl });
        },
        error => {
          $done({});
        }
      );
    } else {
      $httpClient.get(apiUrl, (error, response, data) => {
        if (error) {
          $done({});
        } else {
          newAuthKey = data.replace(/"/g, '');
          let modifiedUrl = url.replace(/auth_key=[^&]+/, 'auth_key=' + newAuthKey);
          $done({ url: modifiedUrl });
        }
      });
    }
  } else if (newAuthKey) {
    let modifiedUrl = url.replace(/auth_key=[^&]+/, 'auth_key=' + newAuthKey);
    $done({ url: modifiedUrl });
  } else {
    $done({});
  }
} else {
  $done({});
}
