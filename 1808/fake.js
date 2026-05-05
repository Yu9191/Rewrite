const NOW = Math.floor(Date.now() / 1000);
$done({ body: JSON.stringify({
  code: 1,
  message: '',
  err: '',
  paidTime: NOW - 86400 * 365,
  expire: NOW + 86400 * 3650,
  days: 3650,
  total: 3650,
  fs: 99999999,
  fn: 99999,
  vip: 1,
  isVip: true,
}) });
