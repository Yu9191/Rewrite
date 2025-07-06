
/*
 * 2025-03-11 适配小火箭
 * 2025-03-26 增加新地址
 * 2025-03-27 增加三年二班
 * 2025-04-17 增加UU视频[阵亡]
 * 2025-04-23 母狗园更换域名
 * 2025-07-06 母狗园更换域名
 */

(() => {
  const url = $request.url;
  const isQX = typeof $task !== "undefined";

  // 域名与接口映射表
  const apiMap = {
    'd2x03a61ogs2x5.cloudfront.net': 'https://vpn3.lovebabyforever.workers.dev',
    'd3lijns9322mkl.cloudfront.net': 'https://vpn2.lovebabyforever.workers.dev',
    'dd38dkt7dfvyr.cloudfront.net': 'FIXED_AUTH_KEY',
    'd1xwta4tq724e9.cloudfront.net': 'https://vpn4.lovebabyforever.workers.dev', // 阵亡
    'd11rd8m1pg017m.cloudfront.net': 'https://vpn5.lovebabyforever.workers.dev',
    'snerbnew.pxyzjmspfl.work': 'https://kl.lovebabyforever.workers.dev',
    'aw0702.x5t5d5a4c.work': 'https://vpn2.lovebabyforever.workers.dev', // 母狗园更换域名 07-06
    'gy2025.rnuozrryfq.work': 'https://vpn2.lovebabyforever.workers.dev'  // 母狗园更换域名
  };

  // 固定 KEY（部分接口直接替换）
  const fixedAuthKey = '1741105775-19918480-32-d52445865e1cb896e73d6d001044f961';

  // 没有 auth_key 参数则不处理
  if (!url.includes('auth_key=')) return $done({});

  const matchedDomain = Object.keys(apiMap).find(domain => url.includes(domain));
  if (!matchedDomain) return $done({});

  const apiEndpoint = apiMap[matchedDomain];

  if (apiEndpoint === 'FIXED_AUTH_KEY') {
    const modifiedUrl = url.replace(/auth_key=[^&]+/, 'auth_key=' + fixedAuthKey);
    return $done({ url: modifiedUrl });
  }

  // 获取动态 auth_key 并替换
  function handleResult(authKeyRaw) {
    const newAuthKey = authKeyRaw.replace(/"/g, '').trim();
    const modifiedUrl = url.replace(/auth_key=[^&]+/, 'auth_key=' + newAuthKey);
    $done({ url: modifiedUrl });
  }

  if (isQX) {
    $task.fetch({ url: apiEndpoint }).then(
      res => handleResult(res.body),
      err => $done({})
    );
  } else {
    $httpClient.get(apiEndpoint, (err, res, data) => {
      if (err || !data) return $done({});
      handleResult(data);
    });
  }
})();

