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
	const outer = safeJson(body);
	if (!outer?.data || !outer?.suffix) return null;

	const decrypted = decryptAES(outer.data, outer.suffix);
	if (!decrypted) return null;

	const inner = safeJson(decrypted);
	if (!inner) return null;

	const changed = handler(inner);
	if (!changed) return null;

	const encrypted = encryptAES(JSON.stringify(inner), outer.suffix);
	if (!encrypted) return null;

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
	Console.log("\n🚀 ========== Response 处理开始 ==========");

	const url = $request.url || "";
	const body = $response.body;

	// video/info：旁路缓存元数据，body 原样返回
	if (/\/api\/video\/info/.test(url)) {
		handleVideoInfo(body);
		Console.log("🏁 ========== Response 处理结束 (video/info) ==========\n");
		return $response;
	}

	// getVideoUrl：旁路触发跳转通知，body 原样返回
	if (/\/api\/video\/getVideoUrl/.test(url)) {
		await handleVideoUrl(body, settings, $request.__insavVid);
		Console.log("🏁 ========== Response 处理结束 (getVideoUrl) ==========\n");
		return $response;
	}

	const handler = pickHandler(url);
	if (!handler) {
		Console.log(`⏭️ 无匹配 handler，body 原样返回: ${url}`);
		Console.log("🏁 ========== Response 处理结束 ==========\n");
		return $response;
	}

	const newBody = rewriteEncryptedBody(body, handler);
	if (newBody) {
		$response.body = newBody;
		Console.log(`✅ 已改写响应: ${url}`);
	} else {
		Console.log(`⚠️ 改写失败或未变更: ${url}`);
	}

	Console.log("🏁 ========== Response 处理结束 ==========\n");
	return $response;
}
