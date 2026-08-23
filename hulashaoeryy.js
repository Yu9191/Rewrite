
/*

呼啦少儿英语

[rewrite_local]
https://apiv2.hula123.com/api/v1/me url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/hulashaoeryy.js

[mitm]
hostname = apiv2.hula123.com

*/
let response = JSON.parse($response.body);
Object.assign(response.data, {
  vip_expire_at: "2030-06-06",
  vip_expire_date: "2030-06-06",
  show_free_vip_dialog: true,
  is_free_vip: true,
  is_vip: true,
  // level: "4",
  // nick_name: "991881"
});

$done({ body: JSON.stringify(response) });
