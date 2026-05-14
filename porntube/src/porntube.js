// porntube.cool / 91porn family VIP 解锁
// API response-body 入口
import { $app, Console, done, notification } from "@nsnanocat/util";
import { Response } from "./process/Response.mjs";
import { resolveSettings } from "./utils/settings.mjs";

function finish($response) {
	const status = $response.status || $response.statusCode || 200;
	const headers = { ...($response.headers || {}) };
	delete headers["Content-Encoding"];
	delete headers["content-encoding"];
	delete headers["Content-Length"];
	delete headers["content-length"];
	delete headers["Transfer-Encoding"];
	delete headers["transfer-encoding"];
	const body = $response.body || "";
	const out = body ? { status, headers, body } : { status, headers };
	if ($app === "Quantumult X") return done(out);
	if (["Surge", "Loon", "Stash", "Shadowrocket", "Egern"].includes($app)) return done({ response: out });
	return done(out);
}

function notifyError(e) {
	const msg = e?.message || String(e || "未知错误");
	notification(
		"Porntube 解锁脚本异常",
		"请进群反馈并附带当前日志截图",
		`错误: ${msg}`,
		{ open: "https://t.me/GithubYu9191" },
	);
}

(async () => {
	const settings = resolveSettings();
	Console.logLevel = settings.logLevel;
	return finish(await Response($request, $response, settings));
})()
	.catch(e => {
		Console.error(`[porntube] ${e?.stack || e?.message || e}`);
		notifyError(e);
		done({});
	});
