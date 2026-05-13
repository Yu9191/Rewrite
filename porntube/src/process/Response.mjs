// 响应路由：解密 outer.r -> handler 改 inner -> 重加密回去
import { Console } from "@nsnanocat/util";
import { modifyAds, modifyWhitelist } from "../handlers/ads.mjs";
import { modifyUser } from "../handlers/user.mjs";
import { modifyVideo } from "../handlers/video.mjs";
import { modifyVideoList } from "../handlers/videoList.mjs";
import { decryptResponse, encryptResponse, safeJson } from "../utils/crypto.mjs";

function pickHandler(url) {
	if (/\/sevenVideos\/[^/?]+/.test(url)) return modifyVideo;
	if (/\/relatedSevenVideos|\/listSevenVideos|\/listMySevenVideos/.test(url)) return modifyVideoList;
	if (/\/getAdsList/.test(url)) return modifyAds;
	if (/\/getWhitelist/.test(url)) return modifyWhitelist;
	if (/\/sevenVideoUserSH|\/sevenVideoUserDetails|\/sevenVideoUserFind/.test(url)) return modifyUser;
	return null;
}

function rewriteEncryptedBody(body, handler) {
	if (!body) return null;
	const outer = safeJson(body);
	if (!outer || typeof outer.r !== "string") return null;

	const decrypted = decryptResponse(outer.r);
	if (!decrypted) {
		Console.error("decrypt failed");
		return null;
	}
	const inner = safeJson(decrypted);
	if (inner === null || inner === undefined) {
		Console.error(`decrypt non-json: ${String(decrypted).slice(0, 120)}`);
		return null;
	}
	if (!handler(inner)) return null;

	const encrypted = encryptResponse(JSON.stringify(inner));
	if (!encrypted) {
		Console.error("encrypt failed");
		return null;
	}
	outer.r = encrypted;
	return { body: JSON.stringify(outer) };
}

// /downloadSevenVideo 后端走 koa-jwt，匿名用户直接 401。
// 前端拿到 success 就直接用本地已有的 m3u8 自下载，所以这里伪造一个加密的空 success 响应。
function fakeDownloadOk($response) {
	const fake = encryptResponse(JSON.stringify({}));
	if (!fake) return false;
	$response.status = 200;
	$response.body = JSON.stringify({ r: fake });
	if ($response.headers) {
		delete $response.headers["Content-Length"];
		delete $response.headers["content-length"];
	}
	return true;
}

export async function Response($request, $response /*, _settings */) {
	const url = $request.url || "";
	Console.group(`Response ${url}`);
	try {
		if (/\/downloadSevenVideo/.test(url)) {
			if (fakeDownloadOk($response)) Console.info("downloadSevenVideo faked ok");
			return $response;
		}
		const handler = pickHandler(url);
		if (!handler) {
			Console.debug("no handler, passthrough");
			return $response;
		}
		const result = rewriteEncryptedBody($response.body, handler);
		if (result?.body) {
			$response.body = result.body;
			Console.info("rewritten");
		} else {
			Console.debug("nothing to change");
		}
		return $response;
	} finally {
		Console.groupEnd();
	}
}
