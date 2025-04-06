
[rewrite_local]
#广告
^https:\/\/((mfjk|gnjk|buyaoda).+\.com|jk\.bnhwq672q3\.com)\/(playerinfo|api\/home\/popup|api\/get_?advert).* url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/lsp/mjgsad.js
#游戏
https:\/\/(mfjk|gnjk|jk|buyaoda).+\.com\/request_game\/v3\/game\/list url reject-dict
#视频
^https?:\/\/((mfjk|gnjk2?|buyaoda)\w\.com|gnjk2\.kzfbz\.com|jk\.bnhwq672q3\.com)\/(api\/(comic|video|short_movie_info|novel|gallery|vip|index|video\/info)|request_rust_video\/ai\/init_info) url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/lsp/mjgshd.js

[mitm]
hostname = gnjk.*.com, mfjk.*.com, buyaoda.*.com, jk.*.com
