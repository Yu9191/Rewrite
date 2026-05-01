/**
 * insav 重写脚本入口（script-analyze-echo-response 模式）
 *
 * 工作流：
 *   1. 收到 $request
 *   2. Request() 改写请求（去 zstd / 替换 getVideoUrl token）
 *   3. fetch() 实际向上游发起请求
 *   4. Response() 改写响应（解密 → 各 handler → 再加密）
 *   5. done() 把改写后的响应回传给客户端
 */
import { $app, Console, done, fetch } from "@nsnanocat/util";
import { Request } from "./process/Request.mjs";
import { Response } from "./process/Response.mjs";
import { resolveSettings } from "./utils/settings.mjs";

(async () => {
	Console.log(`Current App: ${$app}`);

	const settings = resolveSettings();
	await Request($request);

	// 跳过自身回环：在 Surge/Loon/Stash 上声明 X-Surge-Skip-Scripting
	const upstreamHeaders = { ...($request.headers || {}) };
	if ($app === "Surge" || $app === "Loon" || $app === "Stash") {
		upstreamHeaders["X-Surge-Skip-Scripting"] = "true";
	}

	const upstreamReq = {
		url: $request.url,
		method: $request.method,
		headers: upstreamHeaders,
	};
	if ($request.body !== undefined && $request.body !== null && $request.method !== "GET") {
		upstreamReq.body = $request.body;
	}

	let $response = await fetch(upstreamReq);
	if (!$response) $response = { status: 200, headers: {}, body: "" };

	$response = await Response($request, $response, settings);

	done({
		status: $response.status || 200,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			Connection: "keep-alive",
			...($response.headers || {}),
		},
		body: $response.body,
	});
})().catch(e => {
	Console.error(`[insav] 入口异常: ${e?.stack || e?.message || e}`);
	done({});
});
