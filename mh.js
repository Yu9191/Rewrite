/*
1.添加脚本 
2.复制URL地址:https://www.zju.edu.cn
3.添加节点 定时更新
4.节点和脚本仅测试qx

[rewrite_local]
https://www.zju.edu.cn url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/mh.js

[mitm]
hostname = www.zju.edu.cn, momu.coocs.lol, 172.247.127.105:10002
*/

const a = "https://momu.coocs.lol/api/v1/passport/auth/register"; 
const b = "https://momu.coocs.lol"; 
const c = `${Math.floor(100000 + Math.random() * 900000)}@qq.com`; 
const d = "Aa10086."; // 原作者密码可随机
const e = "https://www.zju.edu.cn"; // 自定义订阅地址

const f = {
  "Sec-Fetch-Dest": "empty",
  "Connection": "keep-alive",
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Language": "zh-CN",
  "Content-Type": "application/x-www-form-urlencoded",
  "Sec-Fetch-Site": "same-origin",
  Origin: b,
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
  "Sec-Fetch-Mode": "cors",
  Cookie:
    "crisp-client%2Fsession%2F0fb53ae3-615a-4ee3-8c89-728177c7d57e=session_ded0d9b5-788d-4916-8ebf-c43f220e08e1; X_CACHE_KEY=c57c6371f75bfc86005ac06603dfc099",
  Host: "momu.coocs.lol",
  Referer: b,
  "Accept-Language": "zh-CN,zh-Hans;q=0.9",
  Accept: "*/*",
};

const g = `email=${encodeURIComponent(c)}&password=${encodeURIComponent(d)}&invite_code=&email_code=`;

(async () => {
  try {
    if ($request.url.indexOf(e) !== -1) {
      console.log("拦截到请求，开始生成订阅地址...");

      const h = await $task.fetch({
        url: a,
        method: "POST",
        headers: f,
        body: g,
      });

      const i = JSON.parse(h.body);

      if (i.data && i.data.token) {
        const j = i.data.token;
        const k = `http://172.247.127.105:10002/api/v1/client/subscribe?token=${j}`;
        console.log(`生成订阅地址: ${k}`);

        const l = await $task.fetch({
          url: k,
          method: "GET",
        });

        console.log("成功获取订阅响应体:", l.body);

        $done({
          body: l.body,
        });
      } else {
        console.log("生成订阅地址失败，未找到 token。");
        $done({
          body: JSON.stringify({ message: "生成订阅地址失败，未找到 token。" }),
        });
      }
    } else {
      $done();
    }
  } catch (m) {
    console.error("脚本执行失败:", m);
    $done({
      body: JSON.stringify({ message: "脚本执行失败", error: m }),
    });
  }
})();
