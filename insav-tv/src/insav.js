/**
 * insav 重写脚本入口（script-analyze-echo-response 模式）
 *
 * 工作流：
 *   1. 收到 $request
 *   2. Request() 改写请求（去 zstd / 替换 getVideoUrl token）
 *   3. fetch() 实际向上游发起请求
 *   4. Response() 改写响应（解密 → 各 handler → 再加密）
 *   5. 按平台调用原生 $done 短路返回（Surge/Loon/Stash 必须 { response: ... } 包装）
 */
import { $app, Console, fetch } from "@nsnanocat/util";
import { Request } from "./process/Request.mjs";
import { Response } from "./process/Response.mjs";
import { resolveSettings } from "./utils/settings.mjs";

/**
 * 平台兼容的 $done：Surge/Loon/Stash 必须用 { response: {...} } 包装才能短路返回；
 * 否则会被当成"修改后的请求"再发上游导致签名不匹配。
 */
function finishResponse(payload) {
	// 仅保留最小必要响应头：util.fetch 已自动解压 body，
	// 若回带 Content-Encoding / Content-Length，App 会按"压缩态"再解压一次导致失败
	const baseHeaders = {
		"Content-Type": "application/json; charset=utf-8",
		Connection: "keep-alive",
	};
	const status = payload.status || 200;
	const body = payload.body;

	switch ($app) {
		case "Surge":
		case "Loon":
		case "Stash":
		case "Shadowrocket":
		case "Egern":
			$done({ response: { status, headers: baseHeaders, body } });
			break;
		case "Quantumult X":
			$done({ status: `HTTP/1.1 ${status} OK`, headers: baseHeaders, body });
			break;
		default:
			$done({ status, headers: baseHeaders, body });
			break;
	}
}

(async () => {
	const settings = resolveSettings();
	Console.logLevel = settings.logLevel;
	Console.debug(`Current App: ${$app}, logLevel=${Console.logLevel}`);

	await Request($request);

	// 跳过自身回环：Surge/Loon/Stash 上声明 X-Surge-Skip-Scripting
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
	if ($app === "Quantumult X") {
		upstreamReq.opts = { hints: false };
	}

	let $response = await fetch(upstreamReq);
	if (!$response) $response = { status: 200, headers: {}, body: "" };

	$response = await Response($request, $response, settings);

	finishResponse({
		status: $response.status || 200,
		body: $response.body,
	});
})().catch(e => {
	Console.error(`[insav] 入口异常: ${e?.stack || e?.message || e}`);
	$done({});
});
