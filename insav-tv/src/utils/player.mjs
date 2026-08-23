import { DEFAULT_PLAYER, PLAYER_MAP } from "../config/index.mjs";

/**
 * 播放器条目
 * @typedef {Object} PlayerEntry
 * @property {string}  scheme       完整 scheme 前缀
 * @property {boolean} needEncode   是否对 URL 进行 percent-encoding
 * @property {boolean} supportName  是否支持 name= 参数（如 SenPlayer-dl）
 */

/** 判断自定义 scheme 是否有效 */
function isValidCustomScheme(scheme) {
	if (!scheme || scheme.length <= 5) return false;
	if (scheme === "none") return false;
	if (scheme.includes("{") || scheme.includes("}")) return false;
	if (scheme.includes("完整的") || scheme.includes("URLscheme")) return false;
	return true;
}

/**
 * 根据用户设置选出播放器条目
 * @param {{player:string, scheme:string}} settings
 * @returns {PlayerEntry}
 */
export function resolvePlayer(settings) {
	if (isValidCustomScheme(settings.scheme)) {
		return { scheme: settings.scheme, needEncode: true, supportName: false };
	}
	const code = settings.player || DEFAULT_PLAYER;
	const key = Object.keys(PLAYER_MAP).find(k => k.toLowerCase() === code.toLowerCase());
	return key ? PLAYER_MAP[key] : PLAYER_MAP[DEFAULT_PLAYER];
}

/**
 * 构建 open-url 跳转链接
 * @param {string} videoUrl   实际播放地址
 * @param {string} videoName  文件名（可选）
 * @param {{player:string, scheme:string, encode:string}} settings
 * @returns {string}
 */
export function buildLaunchUrl(videoUrl, videoName, settings) {
	const player = resolvePlayer(settings);
	const schemePrefix = player.scheme;

	// http:// 直接放行（Safari 等）
	if (schemePrefix.startsWith("http")) return videoUrl;

	let prefix;
	if (schemePrefix.endsWith("=") || schemePrefix.endsWith("://")) {
		prefix = schemePrefix;
	} else {
		const lastQ = schemePrefix.lastIndexOf("?");
		const lastAmp = schemePrefix.lastIndexOf("&");
		const lastSep = Math.max(lastQ, lastAmp);
		if (lastSep >= 0 && lastSep < schemePrefix.length - 1
			&& !schemePrefix.slice(lastSep + 1).includes("=")) {
			prefix = `${schemePrefix}=`;
		} else if (schemePrefix.includes("://")) {
			prefix = schemePrefix;
		} else {
			prefix = `${schemePrefix}://`;
		}
	}

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
