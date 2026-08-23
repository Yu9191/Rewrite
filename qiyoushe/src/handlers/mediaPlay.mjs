import { Console, notification } from "@nsnanocat/util";
import { getHeader } from "../utils/headers.mjs";
import { buildSignedM3u8Url } from "../utils/m3u8.mjs";
import { shouldNotify } from "../utils/notify.mjs";
import { buildLaunchUrl } from "../utils/player.mjs";

export function modifyMediaPlay(payload) {
	let changed = false;
	if (payload.playable !== true) {
		payload.playable = true;
		changed = true;
	}
	if (payload.code && payload.code !== 0) {
		payload.code = 0;
		payload.msg = "success";
		changed = true;
	}
	if (payload.mediaInfo && typeof payload.mediaInfo === "object") {
		const m = payload.mediaInfo;
		m.isBuy = true;
		m.payType = 0;
		m.preTime = 0;
		m.price = 0;
		m.isEnoughMoney = true;
		m.location = 0;
		changed = true;
	}
	return changed;
}

export function notifyMediaPlay(payload, settings, request) {
	const info = payload?.mediaInfo;
	if (!info?.videoUrl) return;
	const dedupId = String(info.id || info.videoUrl);
	if (!shouldNotify(dedupId)) return;
	const token = getHeader(request.headers || {}, "authorization");
	if (!token) {
		Console.warn("未找到 authorization，无法生成 m3u8 签名地址");
		return;
	}
	let host = "";
	try {
		const u = new URL(request.url || "");
		host = `${u.protocol}//${u.host}`;
	} catch {
		const m = String(request.url || "").match(/^(https?:\/\/[^/]+)/);
		host = m ? m[1] : "";
	}
	if (!host) return;
	const m3u8Url = buildSignedM3u8Url({ host, token, videoUrl: info.videoUrl });
	const launchUrl = buildLaunchUrl(m3u8Url, info.title || "", settings);
	notification(
		info.title || "妻友社区 播放",
		"点击通知跳转播放器",
		`${settings.player} · 完整 m3u8`,
		{ "open-url": launchUrl }
	);
}
