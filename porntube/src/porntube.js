// porntube.cool / 91porn family VIP 解锁
// analyze-echo-response：先请求上游，再改响应后短路返回
import { $app, Console, done } from "@nsnanocat/util";
import { Request } from "./process/Request.mjs";

function finish($response) {
	const status = $response.status || $response.statusCode || 200;
	const headers = {
		"Content-Type": "application/json; charset=utf-8",
		Connection: "keep-alive",
	};
	const body = $response.body || "";
	if ($app === "Quantumult X") return done({ status: `HTTP/1.1 ${status} OK`, headers, body });
	if (["Surge", "Loon", "Stash", "Shadowrocket", "Egern"].includes($app)) return done({ response: { status, headers, body } });
	return done({ status, headers, body });
}

Request($request)
	.then(({ $response }) => finish($response))
	.catch(e => {
		Console.error(`[porntube] ${e?.stack || e?.message || e}`);
		done({});
	});
