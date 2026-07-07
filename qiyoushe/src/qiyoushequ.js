/**
 * 妻友社区重写脚本入口（Template 标准模式）
 */
import { $app, Console, done } from "@nsnanocat/util";
import { Request } from "./process/Request.mjs";
import { Response } from "./process/Response.mjs";
import { resolveSettings } from "./utils/settings.mjs";

let requestResult = $request;
let responseResult;
let responseMode = false;

function getScriptResponse() {
	try {
		return typeof $response !== "undefined" ? $response : undefined;
	} catch {
		return undefined;
	}
}

!(async () => {
	const scriptResponse = getScriptResponse();
	if (scriptResponse) {
		responseMode = true;
		const settings = resolveSettings();
		Console.logLevel = settings.logLevel;
		responseResult = await Response($request, scriptResponse, settings);
		return;
	}
	({ $request: requestResult, $response: responseResult } = await Request($request));
})()
	.catch(e => Console.error(e))
	.finally(() => {
		switch (typeof responseResult) {
			case "object":
				if (responseResult.headers?.["Content-Encoding"]) responseResult.headers["Content-Encoding"] = "identity";
				if (responseResult.headers?.["content-encoding"]) responseResult.headers["content-encoding"] = "identity";
				if ($app === "Quantumult X" || responseMode) {
					if (!responseResult.status) responseResult.status = 200;
					delete responseResult.headers?.["Content-Length"];
					delete responseResult.headers?.["content-length"];
					delete responseResult.headers?.["Transfer-Encoding"];
					done(responseResult);
				} else {
					done({ response: responseResult });
				}
				break;
			case "undefined":
				done(requestResult);
				break;
			default:
				Console.error(`[qiyoushequ] 不合法的 $response 类型: ${typeof responseResult}`);
				done({});
				break;
		}
	});
