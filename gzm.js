/*
  * 歌者盟
  * 解锁会员
  * [主页]-[精品课程]未解锁 可以通过其他地方进入 

[rewrite_local]
^https?:\/\/(?:h5\.|platform\.)?singerdream\.com\/(?!.*\.jpg).*$ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/gzm.js

[mitm]
hostname = h5.singerdream.com, platform.singerdream.com, singerdream.com
*/


let a = $response.body;
let b = JSON.parse(a);
const c = {
    hasAppointment: true,
    freed: 2,
    access: true,
    free: true,
    correct: true,
    isVip: true,
    endTime: 9828282899,
    foreverVip: true,
    everBoughtVip: true,
    isUnlock: true
};
function d(e) {
    for (let f in e) {
        if (e.hasOwnProperty(f)) {
            if (typeof e[f] === 'object' && e[f] !== null) {
                d(e[f]);
            } else if (c.hasOwnProperty(f)) {
                e[f] = c[f];
            }
        }
    }
}
d(b);
a = JSON.stringify(b);
$done({ body: a });
