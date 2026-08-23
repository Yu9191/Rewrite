import { $app, Console, fetch } from "@nsnanocat/util";
import { stripZstd } from "../utils/headers.mjs";
import { resolveSettings } from "../utils/settings.mjs";
import { Response } from "./Response.mjs";

export async function Request($request) {
	let $response = undefined;
	const settings = resolveSettings();
	Console.logLevel = settings.logLevel;
	Console.debug(`Current App: ${$app}, logLevel=${Console.logLevel}`);

	$request.headers = stripZstd($request.headers || {});
	const url = $request.url || "";
	const method = ($request.method || "GET").toUpperCase();
	Console.group(`Request ${method} ${url}`);
	Console.groupEnd();

	const upstreamHeaders = { ...($request.headers || {}) };
	if (["Surge", "Loon", "Stash"].includes($app)) upstreamHeaders["X-Surge-Skip-Scripting"] = "true";

	const upstreamReq = {
		url: $request.url,
		method: $request.method,
		headers: upstreamHeaders,
	};
	if ($request.body != null && method !== "GET") upstreamReq.body = $request.body;
	if ($app === "Quantumult X") upstreamReq.opts = { hints: false };

	Console.debug("发起上游请求...");
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
