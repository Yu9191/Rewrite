// 视频详情
import { Console, notification } from "@nsnanocat/util";
import { shouldNotify } from "../utils/notify.mjs";
import { buildLaunchUrl } from "../utils/player.mjs";

export function modifyVideo(payload, ctx) {
	if (!payload || typeof payload !== "object") return false;
	let changed = false;

	if (typeof payload.views === "number" && payload.views > 0) {
		payload.views = 0;
		changed = true;
	}
	if (payload.videoType === "cvideo") {
		payload.videoType = "tvideo";
		changed = true;
	}
	if (payload.downloadable === false) {
		payload.downloadable = true;
		changed = true;
	}
	if (payload.isPaid === true) {
		payload.isPaid = false;
		changed = true;
	}
	if (payload.premium === true) {
		payload.premium = false;
		changed = true;
	}

	const m3u8 = (payload.m3u8s && payload.m3u8s[0]) || payload.m3u8 || "";
	if (changed) {
		Console.info(`视频已解锁: id=${payload.id || ""}, type=${payload.videoType}, m3u8=${String(m3u8).slice(0, 80)}`);
	}
	const jumpEnabled = ["yes", "1", "true", "on"].includes((ctx?.settings?.jump || "").toLowerCase());
	if (jumpEnabled && m3u8 && ctx?.settings && shouldNotify(payload.id || payload.vId || m3u8)) {
		try {
			const title = payload.title || payload.title_en || "porntube";
			const author = payload.user || payload.user_en || "";
			const dur = payload.durationStr || "";
			const subtitle = [author, dur].filter(Boolean).join(" · ") || "点击通知跳转播放器";
			const body = `${ctx.settings.player || "lenna"}`;
			const launchUrl = buildLaunchUrl(m3u8, title, ctx.settings);
			notification(title, subtitle, body, { "open-url": launchUrl });
		} catch (e) {
			Console.warn(`通知失败: ${e?.message || e}`);
		}
	}
	return changed;
}
