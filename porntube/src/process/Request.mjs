// 请求模式入口（dev 兜底，生产用 script-response-body 直接进 Response）
import { $app, Console, fetch } from "@nsnanocat/util";
import { resolveSettings } from "../utils/settings.mjs";
import { Response } from "./Response.mjs";

export async function Request($request) {
	let $response;
	const settings = resolveSettings();
	Console.logLevel = settings.logLevel;
	Console.debug(`App: ${$app}, logLevel=${Console.logLevel}`);

	const url = $request.url || "";
	const method = ($request.method || "GET").toUpperCase();
	Console.group(`Request ${method} ${url}`);
	Console.groupEnd();

	const upstreamHeaders = { ...($request.headers || {}) };
	// 避免响应被自身二次拦截
	if (["Surge", "Loon", "Stash"].includes($app)) upstreamHeaders["X-Surge-Skip-Scripting"] = "true";

	const upstreamReq = { url: $request.url, method: $request.method, headers: upstreamHeaders };
	if ($request.body != null && method !== "GET") upstreamReq.body = $request.body;
	if ($app === "Quantumult X") upstreamReq.opts = { hints: false };

	$response = await fetch(upstreamReq);
	if (!$response) $response = { status: 200, headers: {}, body: "" };
	$response = await Response($request, $response, settings);

	if ($response.headers) {
		delete $response.headers["Content-Encoding"];
		delete $response.headers["content-encoding"];
		delete $response.headers["Content-Length"];
		delete $response.headers["content-length"];
		delete $response.headers["Transfer-Encoding"];
		delete $response.headers["transfer-encoding"];
	}

	return { $request, $response };
}
