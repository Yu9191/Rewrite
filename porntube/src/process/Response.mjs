// 响应路由：解密 outer.r -> handler 改 inner -> 重加密回去
import { Console } from "@nsnanocat/util";
import { modifyAds, modifyWhitelist } from "../handlers/ads.mjs";
import { modifyUser } from "../handlers/user.mjs";
import { modifyVideo } from "../handlers/video.mjs";
import { modifyVideoList } from "../handlers/videoList.mjs";
import { decryptResponse, encryptResponse, safeJson } from "../utils/crypto.mjs";
import { decodeResponseText } from "../utils/headers.mjs";

function pickHandler(url) {
	if (/\/sevenVideos\/[^/?]+/.test(url)) return modifyVideo;
	if (/\/sevenVideos(?:\?|$)/.test(url)) return modifyVideoList;
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
	const method = ($request.method || "GET").toUpperCase();
	Console.group(`Response ${url}`);
	try {
		if (method === "OPTIONS" || Number($response.status || $response.statusCode) === 204) {
			Console.debug(`跳过空响应: method=${method}, status=${$response.status || $response.statusCode || "无"}`);
			return $response;
		}
		if (/\/downloadSevenVideo/.test(url)) {
			if (fakeDownloadOk($response)) Console.info("downloadSevenVideo faked ok");
			return $response;
		}
		const handler = pickHandler(url);
		if (!handler) {
			Console.debug("未匹配处理器，原样放行");
			return $response;
		}
		Console.debug(`处理器: ${handler.name || "匿名"}, status=${$response.status || $response.statusCode || "无"}`);
		// 客户端不解 zstd 时这里兜底解一次
		const decoded = await decodeResponseText($response);
		Console.debug(`解码结果: type=${typeof decoded}, len=${decoded ? decoded.length : 0}`);
		if (typeof decoded === "string" && decoded !== $response.body) {
			$response.body = decoded;
			Console.debug("响应体已替换为解压文本");
		}
		const result = rewriteEncryptedBody($response.body, handler);
		if (result?.body) {
			$response.body = result.body;
			Console.info("改写完成");
		} else {
			Console.debug("无需改写");
		}
		return $response;
	} finally {
		Console.groupEnd();
	}
}
