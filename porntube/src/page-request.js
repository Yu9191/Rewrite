// 去掉条件请求头: 源站回 304 时没有 body，无法注入
const headers = { ...($request.headers || {}) };
for (const key of Object.keys(headers)) {
	if (/^if-(modified-since|none-match)$/i.test(key)) delete headers[key];
}
$done({ headers });
