import { $argument, Console, Storage } from "@nsnanocat/util";
import { BOXJS_KEYS, DEFAULT_LOG_LEVEL, DEFAULT_PLAYER } from "../config/index.mjs";

function loadFromBoxJS() {
	const playerSelect = Storage.getItem(BOXJS_KEYS.player, "");
	const customScheme = Storage.getItem(BOXJS_KEYS.scheme, "");
	const urlEncode = Storage.getItem(BOXJS_KEYS.encode, "");
	const logLevel = Storage.getItem(BOXJS_KEYS.logLevel, "");
	const settings = { player: DEFAULT_PLAYER, scheme: "", encode: "", logLevel: DEFAULT_LOG_LEVEL };
	if (playerSelect === "custom" && customScheme) settings.scheme = customScheme;
	else if (playerSelect && playerSelect !== "custom") settings.player = playerSelect;
	if (urlEncode) settings.encode = urlEncode;
	if (logLevel) settings.logLevel = logLevel;
	return settings;
}

function applyArgument(settings) {
	if (typeof $argument === "undefined" || !$argument) return;
	if (typeof $argument === "object" && !Array.isArray($argument)) {
		const { player, scheme, encode, logLevel } = $argument;
		if (player) settings.player = String(player);
		if (scheme) settings.scheme = String(scheme);
		if (encode) settings.encode = String(encode);
		if (logLevel) settings.logLevel = String(logLevel);
		return;
	}
	const raw = String($argument);
	if (raw.startsWith("[") && raw.endsWith("]")) {
		const parts = raw.slice(1, -1).split(",").map(s => s.trim());
		if (parts[0]) settings.player = parts[0];
		if (parts[1]) settings.scheme = parts[1];
		if (parts[2]) settings.encode = parts[2];
		if (parts[3]) settings.logLevel = parts[3];
		return;
	}
	const params = Object.fromEntries(new URLSearchParams(raw));
	if (params.player) settings.player = decodeURIComponent(params.player);
	if (params.scheme) settings.scheme = decodeURIComponent(params.scheme);
	if (params.encode) settings.encode = decodeURIComponent(params.encode);
	if (params.logLevel) settings.logLevel = decodeURIComponent(params.logLevel);
}

export function resolveSettings() {
	const settings = loadFromBoxJS();
	applyArgument(settings);
	Console.debug(`Player settings: ${JSON.stringify(settings)}`);
	return settings;
}
