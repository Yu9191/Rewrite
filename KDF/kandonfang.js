[rewrite_local]
# NBA视频和电视剧
https:\/\/bp-api\.bestv\.com\.cn\/cms\/api\/(live\/studio\/id\/v4|c\/player\/common) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/KDF/video-parser.js
# HTML页面
^https:\/\/360\.com\/video url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/KDF/video-parser.js

[mitm]
hostname = 360.com, bp-api.bestv.com.cn
