import { Console, notification } from "@nsnanocat/util";
import { decryptAES, safeJson } from "../utils/crypto.mjs";
import { removeIpParam } from "../utils/headers.mjs";
import { shouldNotify } from "../utils/notify.mjs";
import { buildLaunchUrl } from "../utils/player.mjs";
import { getVideoMeta } from "../utils/videoCache.mjs";

/** 取标签前 N 项拼成副标题 */
function buildSubtitle(meta) {
	if (!meta) return "🎬 点击通知跳转播放器";
	const tags = (meta.tags || []).slice(0, 6);
	if (tags.length === 0 && !meta.actor) return "🎬 点击通知跳转播放器";
	const parts = [];
	if (meta.actor) parts.push(`👩 ${meta.actor}`);
	if (tags.length) parts.push(`🏷️ ${tags.join(" · ")}`);
	return parts.join("    ");
}

/** 拼正文：发行日期 + 播放器 */
function buildBody(meta, settings) {
	const parts = [];
	if (meta?.publishDate) parts.push(`📅 ${meta.publishDate}`);
	parts.push(`▶️ ${settings.player}`);
	return parts.join("    ");
}

/**
 * /api/video/getVideoUrl：解密响应 → 取真实播放地址 → 推送跳转通知
 *
 * 旁路逻辑：响应 body 原样返回，仅触发系统通知
 * @param {string} body     原始响应 body
 * @param {{player:string, scheme:string, encode:string}} settings 用户播放器配置
 * @param {string|number} [vid] 视频 ID，用于查 /api/video/info 缓存
 */
export async function handleVideoUrl(body, settings, vid) {
	const outer = safeJson(body);
	if (!outer?.data || !outer?.suffix) return;

	const decrypted = decryptAES(outer.data, outer.suffix);
	if (!decrypted) return;

	const inner = safeJson(decrypted);
	if (!inner) return;

	if (inner.code !== 1) {
		Console.warn(`getVideoUrl 非成功: ${inner.msg || ""}`);
		return;
	}

	let playUrl = inner.data;
	if (!playUrl || typeof playUrl !== "string") return;

	playUrl = removeIpParam(playUrl);

	// 优先用 vid 做去重 ID；缺省退化到 hls 路径中的 hash 段
	let dedupId = vid != null ? String(vid) : "";
	if (!dedupId) {
		const m = playUrl.match(/\/([a-f0-9_]+)\/hls/);
		dedupId = m ? m[1] : playUrl;
	}
	if (!shouldNotify(dedupId)) return;

	const meta = getVideoMeta(vid);
	const title = meta?.title || "insav 播放";
	const subtitle = buildSubtitle(meta);
	const bodyText = buildBody(meta, settings);
	const launchUrl = buildLaunchUrl(playUrl, meta?.title || "", settings);

	notification(title, subtitle, bodyText, { "open-url": launchUrl });
}
