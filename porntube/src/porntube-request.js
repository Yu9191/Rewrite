// 请求阶段: 去除假 auth + 标记路由
(function () {
	// OPTIONS 预检直接放行，不做任何修改
	// （否则重写头部后会产生重复 Content-Length: 0，Cloudflare 判定畸形返回 400，
	//  导致浏览器跨域 POST /js 预检失败，视频列表数据拿不到，缩略图全部灰色占位）
	const method = ($request.method || "").toUpperCase();
	if (method === "OPTIONS") return void $done({});

	const headers = $request.headers || {};
	const bodyStr = $request.body || "";
	let routeUrl = "";

	// 从 body 提取内部路由
	try {
		const body = JSON.parse(bodyStr);
		if (body && typeof body.url === "string") routeUrl = body.url;
	} catch {}

	// 注入路由标记给 response 脚本读取
	if (routeUrl) headers["X-PT-Route"] = routeUrl;

	// 去除假/空 Authorization（避免服务端 401）
	const auth = headers["Authorization"] || headers["authorization"] || "";
	if (/^Bearer\s*$/i.test(auth) || /^Bearer\s+ufd$/i.test(auth) || auth.length < 20) {
		delete headers["Authorization"];
		delete headers["authorization"];
	}

	// 移除需要由底层实现自动生成的请求头
	// （与 @nsnanocat/util polyfill/fetch.mjs 保持一致：Host / :authority / Content-Length
	//  重写 headers 后若保留旧值，会与底层重新生成的值冲突，触发 400）
	delete headers?.Host;
	delete headers?.[":authority"];
	delete headers?.["Content-Length"];
	delete headers?.["content-length"];

	$done({ headers });
})();
