// 播放器链接
import { DEFAULT_PLAYER, PLAYER_MAP } from "../config/index.mjs";

function isValidCustomScheme(scheme) {
	if (!scheme || scheme.length <= 5) return false;
	if (scheme === "none") return false;
	if (scheme.includes("{") || scheme.includes("}")) return false;
	if (scheme.includes("完整的") || scheme.includes("URLscheme")) return false;
	return true;
}

export function resolvePlayer(settings) {
	if (isValidCustomScheme(settings.scheme)) {
		return { scheme: settings.scheme, needEncode: true, supportName: false };
	}
	const code = settings.player || DEFAULT_PLAYER;
	const key = Object.keys(PLAYER_MAP).find(k => k.toLowerCase() === code.toLowerCase());
	return key ? PLAYER_MAP[key] : PLAYER_MAP[DEFAULT_PLAYER];
}

export function buildLaunchUrl(videoUrl, videoName, settings) {
	const player = resolvePlayer(settings);
	const schemePrefix = player.scheme;

	// http 直接放行
	if (schemePrefix.startsWith("http")) return videoUrl;

	const prefix = schemePrefix.endsWith("=") || schemePrefix.endsWith("://") ? schemePrefix : `${schemePrefix}://`;

	let needEncode = player.needEncode;
	const encodeOpt = (settings.encode || "").toLowerCase();
	if (["yes", "1", "true"].includes(encodeOpt)) needEncode = true;
	else if (["no", "0", "false"].includes(encodeOpt)) needEncode = false;

	let finalUrl = needEncode ? prefix + encodeURIComponent(videoUrl) : prefix + videoUrl;

	if (player.supportName && videoName) {
		let cleanName = videoName.replace(/[<>:"\/\\|?*]/g, "").trim();
		if (!cleanName.toLowerCase().endsWith(".mp4")) {
			cleanName = `${cleanName.replace(/\.[^.]+$/, "")}.mp4`;
		}
		const sep = finalUrl.includes("?") ? "&" : "?";
		finalUrl += `${sep}name=${encodeURIComponent(cleanName)}`;
	}

	return finalUrl;
}
