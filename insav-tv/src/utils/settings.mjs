import { $argument, Console, Storage } from "@nsnanocat/util";
import { BOXJS_KEYS, DEFAULT_LOG_LEVEL, DEFAULT_PLAYER } from "../config/index.mjs";

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
	const logLevel = Storage.getItem(BOXJS_KEYS.logLevel, "");

	const settings = { player: DEFAULT_PLAYER, scheme: "", encode: "", logLevel: DEFAULT_LOG_LEVEL };

	if (playerSelect === "custom" && customScheme) {
		settings.scheme = customScheme;
	} else if (playerSelect && playerSelect !== "custom") {
		settings.player = playerSelect;
	}
	if (urlEncode) settings.encode = urlEncode;
	if (logLevel) settings.logLevel = logLevel;
	return settings;
}

/** 用 $argument 覆盖设置（兼容 Surge query / Loon 数组 / 对象） */
function applyArgument(settings) {
	if (typeof $argument === "undefined" || !$argument) return;

	if (typeof $argument === "object" && !Array.isArray($argument)) {
		const { player, scheme, encode, logLevel } = $argument;
		if (player) settings.player = String(player);
		if (scheme) {
			let fullScheme = String(scheme);
			// Surge may split "scheme=forward://play?url=" at "?" and put
			// "url" into a separate key. Detect and reconstruct.
			const knownKeys = new Set(["player", "scheme", "encode", "logLevel"]);
			for (const key of Object.keys($argument)) {
				if (!knownKeys.has(key) && fullScheme.includes("://")) {
					const val = $argument[key];
					const sep = fullScheme.includes("?") ? "&" : "?";
					fullScheme += `${sep}${key}=${val != null ? val : ""}`;
				}
			}
			settings.scheme = fullScheme;
		}
		if (encode) settings.encode = String(encode);
		if (logLevel) settings.logLevel = String(logLevel);
		return;
	}

	const raw = String($argument);

	// Loon "[player,scheme,encode,logLevel]"
	if (raw.startsWith("[") && raw.endsWith("]")) {
		const parts = raw.slice(1, -1).split(",").map(s => s.trim());
		if (parts[0]) settings.player = parts[0];
		if (parts[1]) settings.scheme = parts[1];
		if (parts[2]) settings.encode = parts[2];
		if (parts[3]) settings.logLevel = parts[3];
		return;
	}

	// Surge "player=xxx&scheme=yyy&logLevel=info"
	const params = Object.fromEntries(new URLSearchParams(raw));
	if (params.player) settings.player = decodeURIComponent(params.player);
	if (params.scheme) settings.scheme = decodeURIComponent(params.scheme);
	if (params.encode) settings.encode = decodeURIComponent(params.encode);
	if (params.logLevel) settings.logLevel = decodeURIComponent(params.logLevel);
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
