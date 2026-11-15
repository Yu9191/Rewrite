// QX 回显模式入口（script-analyze-echo-response）：等请求体到齐，请求阶段取上游并改写
import { Console, done } from "@nsnanocat/util";
import { Request } from "./process/Request.mjs";

(async () => {
	const { $response } = await Request($request);
	return done({ status: $response.status || 200, headers: $response.headers || {}, body: $response.body || "" });
})().catch(e => {
	Console.error(`[porntube-echo] ${e?.stack || e?.message || e}`);
	done({ status: 502, headers: {}, body: "" });
});
