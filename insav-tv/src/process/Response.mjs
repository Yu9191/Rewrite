import { Console } from "@nsnanocat/util";
import { modifyBannerLists } from "../handlers/bannerLists.mjs";
import { modifyConfigLinks } from "../handlers/configLinks.mjs";
import { modifyConfigLists } from "../handlers/configLists.mjs";
import { modifyExtendLists } from "../handlers/extendLists.mjs";
import { modifyNoticeLists } from "../handlers/noticeLists.mjs";
import { modifyUserInfo, modifyVipStatus } from "../handlers/userVip.mjs";
import { handleVideoInfo } from "../handlers/videoInfo.mjs";
import { handleVideoUrl } from "../handlers/videoUrl.mjs";
import { decryptAES, encryptAES, safeJson } from "../utils/crypto.mjs";

/**
 * 路由 URL → 通用加密响应改写器
 * 返回 null 表示该 URL 不需要改写
 */
function pickHandler(url) {
	if (/\/api\/extend\/lists/.test(url)) return modifyExtendLists;
	if (/\/api\/banner\/lists/.test(url)) return modifyBannerLists;
	if (/\/api\/config\/lists/.test(url)) return modifyConfigLists;
	if (/\/api\/config\/links/.test(url)) return modifyConfigLinks;
	if (/\/api\/notice\/lists/.test(url)) return modifyNoticeLists;
	if (/\/api\/user\/getVipStatus/.test(url)) return modifyVipStatus;
	if (/\/api\/user\/info/.test(url)) return modifyUserInfo;
	if (/\/api\/user\/login/.test(url)) return modifyUserInfo;
	return null;
}

/**
 * 通用加密响应处理：解密 → 改写 → 再加密
 * @param {string} body 原始 body
 * @param {(payload: object) => boolean} handler 改写函数
 * @returns {string|null} 改写后的 body；不需改写返回 null
 */
function rewriteEncryptedBody(body, handler) {
	if (!body) {
		Console.warn("body 为空");
		return null;
	}
	const outer = safeJson(body);
	if (!outer) {
		Console.warn(`body 不是 JSON: ${String(body).slice(0, 120)}`);
		return null;
	}
	if (!outer.data || !outer.suffix) {
		Console.warn(`body 不含 data/suffix: ${JSON.stringify(outer).slice(0, 120)}`);
		return null;
	}

	const decrypted = decryptAES(outer.data, outer.suffix);
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
	if (!changed) {
		Console.debug("handler 未修改 payload");
		return null;
	}

	const encrypted = encryptAES(JSON.stringify(inner), outer.suffix);
	if (!encrypted) {
		Console.error("重加密失败");
		return null;
	}

	return JSON.stringify({ data: encrypted, suffix: outer.suffix });
}

/**
 * 处理响应：getVideoUrl 旁路通知，其它接口走通用解密 → 改写 → 再加密
 * @param {Object} $request   原始请求对象
 * @param {Object} $response  原始响应对象
 * @param {Object} settings   用户播放器配置
 * @returns {Promise<Object>} 处理后的 $response
 */
export async function Response($request, $response, settings) {
	const url = $request.url || "";
	const body = $response.body;
	Console.group(`Response ${url}`);

	try {
		// video/info：旁路缓存元数据，body 原样返回
		if (/\/api\/video\/info/.test(url)) {
			handleVideoInfo(body);
			return $response;
		}

		// getVideoUrl：旁路触发跳转通知，body 原样返回
		if (/\/api\/video\/getVideoUrl/.test(url)) {
			await handleVideoUrl(body, settings, $request.__insavVid);
			return $response;
		}

		const handler = pickHandler(url);
		if (!handler) {
			Console.debug("无匹配 handler，body 原样返回");
			return $response;
		}

		const newBody = rewriteEncryptedBody(body, handler);
		if (newBody) {
			$response.body = newBody;
			Console.info("已改写响应");
		} else {
			Console.warn("改写失败或未变更");
		}
		return $response;
	} finally {
		Console.groupEnd();
	}
}
