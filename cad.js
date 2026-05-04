/*
CAD快速看图


[rewrite_local]
^https://cad\.everdrawing\.com/(mobile/verifyVip|authorize/query) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/cad.js

[mitm]
hostname = cad.everdrawing.com
*/

const url = $request.url;
let body = $response.body;

if (/\/mobile\/verifyVip/.test(url)) {
  try {
    let json = JSON.parse(body);
    if (json.code === 2) {
      json.code = 3;
      json.data = 1674372230;
    }
    body = JSON.stringify(json);
  } catch (e) {}
} else if (/\/authorize\/query/.test(url)) {
  body = JSON.stringify({
    endDate: "2026-06-26 16:24:27",
    code: "1",
    perpetual: true
  });
}

$done({ body });
