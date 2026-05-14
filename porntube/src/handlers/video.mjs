// 视频详情 /sevenVideos/<id>
// 后端不验登录，前端靠 views/videoType 决定是否拦截，把这两个字段改掉即可
import { Console } from "@nsnanocat/util";

export function modifyVideo(payload) {
	if (!payload || typeof payload !== "object") return false;
	let changed = false;

	// views > freeViewsNum(1e5) 触发 VIP 弹窗
	if (typeof payload.views === "number" && payload.views > 0) {
		payload.views = 0;
		changed = true;
	}
	// cvideo 试看 120s 后暂停，改 tvideo 绕过
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

	if (changed) {
		const m3 = (payload.m3u8s && payload.m3u8s[0]) || payload.m3u8 || "";
		Console.info(`视频已解锁: id=${payload.id || ""}, type=${payload.videoType}, m3u8=${String(m3).slice(0, 80)}`);
	}
	return changed;
}
