import { Console } from "@nsnanocat/util";
import { decryptAES, safeJson } from "../utils/crypto.mjs";
import { setVideoMeta } from "../utils/videoCache.mjs";

/**
 * /api/video/info：解密响应 → 缓存视频元数据（标题 / 标签 / 女优 / 发行日期）
 *
 * 旁路逻辑：不修改响应，只把元数据写进缓存供 getVideoUrl 通知使用
 * @param {string} body 原始响应 body
 */
export function handleVideoInfo(body) {
	const outer = safeJson(body);
	if (!outer?.data || !outer?.suffix) return;

	const decrypted = decryptAES(outer.data, outer.suffix);
	if (!decrypted) return;

	const inner = safeJson(decrypted);
	if (inner?.code !== 1 || !inner?.data?.id) return;

	const { id, title, tags, actor, publish_date } = inner.data;
	setVideoMeta(id, {
		title: title || "",
		tags: Array.isArray(tags) ? tags.map(t => t?.name).filter(Boolean) : [],
		actor: actor?.name || "",
		publishDate: publish_date || "",
	});

	Console.debug(`缓存视频元数据 vid=${id}: ${title}`);
}
