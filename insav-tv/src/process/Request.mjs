import { Console } from "@nsnanocat/util";
import { buildSign, decryptAES, encryptAES, safeJson } from "../utils/crypto.mjs";
import { stripZstd } from "../utils/headers.mjs";
import { fetchToken } from "../utils/token.mjs";

/**
 * getVideoUrl 请求体改写结果
 * @typedef {Object} RewriteResult
 * @property {string}        body  改写后的 body
 * @property {string|number} vid   视频 ID（供 Response 端读元数据缓存）
 */

/**
 * getVideoUrl 请求体改写：用远端共享 Token 替换 + 重新签名 + 重新加密
 * @param {string} body 原始请求体 JSON
 * @returns {Promise<RewriteResult|null>} 改写结果；无需改写或失败返回 null
 */
async function rewriteVideoUrlBody(body) {
	const outer = safeJson(body);
	if (!outer?.["post-data"]) return null;

	const decrypted = decryptAES(outer["post-data"]);
	if (!decrypted) return null;

	const inner = safeJson(decrypted);
	if (!inner) return null;

	const tokenData = await fetchToken();
	if (!tokenData?.token) return null;

	inner.token = tokenData.token;
	inner.encode_sign = buildSign({
		site: inner.site,
		device: inner.device,
		timestamp: inner.timestamp,
		token: inner.token,
		vid: inner.vid,
	});

	const encrypted = encryptAES(JSON.stringify(inner));
	if (!encrypted) return null;

	return { body: JSON.stringify({ "post-data": encrypted }), vid: inner.vid };
}

/**
 * 处理请求：去除 zstd 压缩、按需替换 getVideoUrl 的 token
 * @param {Object} $request 原始请求对象
 * @returns {Promise<Object>} 处理后的 $request
 */
export async function Request($request) {
	$request.headers = stripZstd($request.headers || {});

	const url = $request.url || "";
	const method = ($request.method || "GET").toUpperCase();
	Console.group(`Request ${method} ${url}`);

	try {
		if (method === "POST" && /\/api\/video\/getVideoUrl/.test(url)) {
			const result = await rewriteVideoUrlBody($request.body || "");
			if (result) {
				$request.body = result.body;
				$request.__insavVid = result.vid;
				Console.info(`getVideoUrl 请求体已替换 Token (vid=${result.vid})`);
			} else {
				Console.warn("getVideoUrl 请求体无需改写或改写失败");
			}
		}
		return $request;
	} finally {
		Console.groupEnd();
	}
}
