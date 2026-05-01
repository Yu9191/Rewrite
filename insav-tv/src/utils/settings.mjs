import { $argument, Console, Storage } from "@nsnanocat/util";
import { BOXJS_KEYS, DEFAULT_PLAYER } from "../config/index.mjs";

/**
 * 用户播放器设置
 * @typedef {Object} PlayerSettings
 * @property {string} player  播放器代号
 * @property {string} scheme  自定义 scheme（覆盖 player）
 * @property {string} encode  URL 编码强制开关 "yes"|"no"|""
 */

/** 从 BoxJS 读取持久化配置 */
function loadFromBoxJS() {
	const playerSelect = Storage.getItem(BOXJS_KEYS.player, "");
	const customScheme = Storage.getItem(BOXJS_KEYS.scheme, "");
	const urlEncode = Storage.getItem(BOXJS_KEYS.encode, "");

	const settings = { player: DEFAULT_PLAYER, scheme: "", encode: "" };

	if (playerSelect === "custom" && customScheme) {
		settings.scheme = customScheme;
	} else if (playerSelect && playerSelect !== "custom") {
		settings.player = playerSelect;
	}
	if (urlEncode) settings.encode = urlEncode;
	return settings;
}

/** 用 $argument 覆盖设置（兼容 Surge query / Loon 数组 / 对象） */
function applyArgument(settings) {
	if (typeof $argument === "undefined" || !$argument) return;

	if (typeof $argument === "object" && !Array.isArray($argument)) {
		const { player, scheme, encode } = $argument;
		if (player) settings.player = String(player);
		if (scheme) settings.scheme = String(scheme);
		if (encode) settings.encode = String(encode);
		return;
	}

	const raw = String($argument);

	// Loon "[player,scheme,encode]"
	if (raw.startsWith("[") && raw.endsWith("]")) {
		const parts = raw.slice(1, -1).split(",").map(s => s.trim());
		if (parts[0]) settings.player = parts[0];
		if (parts[1]) settings.scheme = parts[1];
		if (parts[2]) settings.encode = parts[2];
		return;
	}

	// Surge "player=xxx&scheme=yyy"
	const params = Object.fromEntries(new URLSearchParams(raw));
	if (params.player) settings.player = decodeURIComponent(params.player);
	if (params.scheme) settings.scheme = decodeURIComponent(params.scheme);
	if (params.encode) settings.encode = decodeURIComponent(params.encode);
}

/**
 * 综合 BoxJS + $argument 得到最终用户配置
 * @returns {PlayerSettings}
 */
export function resolveSettings() {
	const settings = loadFromBoxJS();
	applyArgument(settings);
	Console.debug(`Player settings: ${JSON.stringify(settings)}`);
	return settings;
}
