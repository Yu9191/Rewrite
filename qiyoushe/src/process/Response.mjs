import { Console } from "@nsnanocat/util";
import { modifyCards } from "../handlers/cards.mjs";
import { modifyMediaList } from "../handlers/mediaList.mjs";
import { modifyMediaPlay, notifyMediaPlay } from "../handlers/mediaPlay.mjs";
import { modifyPingConfig } from "../handlers/pingConfig.mjs";
import { modifyUserInfo } from "../handlers/userInfo.mjs";
import { decryptResponse, encryptResponse, safeJson } from "../utils/crypto.mjs";

function pickHandler(url) {
	if (/\/api\/app\/ping\/config/.test(url)) return modifyPingConfig;
	if (/\/api\/app\/media\/play/.test(url)) return modifyMediaPlay;
	if (/\/api\/app\/media\/(home|short\/hot)/.test(url)) return modifyMediaList;
	if (/\/api\/app\/card\/(promotion|list|advance\/status)/.test(url)) return modifyCards;
	if (/\/api\/app\/user\/info/.test(url)) return modifyUserInfo;
	if (/\/api\/app\/login\/guest/.test(url)) return modifyUserInfo;
	return null;
}

function rewriteEncryptedBody(body, handler) {
	if (!body) return null;
	const outer = safeJson(body);
	if (!outer || outer.code !== 200 || typeof outer.data !== "string") return null;
	const decrypted = decryptResponse(outer.data);
	if (!decrypted) {
		Console.error("解密失败");
		return null;
	}
	const inner = safeJson(decrypted);
	if (!inner) {
		Console.error(`解密后非 JSON: ${String(decrypted).slice(0, 120)}`);
		return null;
	}
	const changed = handler(inner);
	if (!changed) return null;
	const encrypted = encryptResponse(JSON.stringify(inner));
	if (!encrypted) {
		Console.error("重加密失败");
		return null;
	}
	outer.data = encrypted;
	outer.hash = true;
	return { body: JSON.stringify(outer), payload: inner };
}

export async function Response($request, $response, settings) {
	const url = $request.url || "";
	Console.group(`Response ${url}`);
	try {
		const handler = pickHandler(url);
		if (!handler) {
			Console.debug("无匹配 handler，body 原样返回");
			return $response;
		}
		const result = rewriteEncryptedBody($response.body, handler);
		if (result?.body) {
			$response.body = result.body;
			Console.info("已解密改写并重加密响应");
			if (/\/api\/app\/media\/play/.test(url)) notifyMediaPlay(result.payload, settings, $request);
		} else {
			Console.warn("改写失败或未变更");
		}
		return $response;
	} finally {
		Console.groupEnd();
	}
}
