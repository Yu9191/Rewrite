// 设置加载
import { $argument, Console, Storage } from "@nsnanocat/util";
import { BOXJS_KEYS, DEFAULT_LOG_LEVEL, DEFAULT_PLAYER } from "../config/index.mjs";

function loadFromBoxJS() {
	const logLevel = Storage.getItem(BOXJS_KEYS.logLevel, "");
	const playerSelect = Storage.getItem(BOXJS_KEYS.player, "");
	const customScheme = Storage.getItem(BOXJS_KEYS.scheme, "");
	const urlEncode = Storage.getItem(BOXJS_KEYS.encode, "");
	const jump = Storage.getItem(BOXJS_KEYS.jump, "");

	const settings = { logLevel: DEFAULT_LOG_LEVEL, player: DEFAULT_PLAYER, scheme: "", encode: "", jump: "no" };
	if (logLevel) settings.logLevel = logLevel;
	if (playerSelect === "custom" && customScheme) settings.scheme = customScheme;
	else if (playerSelect && playerSelect !== "custom") settings.player = playerSelect;
	if (urlEncode) settings.encode = urlEncode;
	if (jump) settings.jump = jump;
	return settings;
}

function applyArgument(settings) {
	if (typeof $argument === "undefined" || !$argument) return;
	if (typeof $argument === "object" && !Array.isArray($argument)) {
		if ($argument.logLevel) settings.logLevel = String($argument.logLevel);
		if ($argument.player) settings.player = String($argument.player);
		if ($argument.scheme) settings.scheme = String($argument.scheme);
		if ($argument.encode) settings.encode = String($argument.encode);
		if ($argument.jump) settings.jump = String($argument.jump);
		return;
	}
	const raw = String($argument);
	// Loon "[logLevel,player,scheme,encode,jump]"
	if (raw.startsWith("[") && raw.endsWith("]")) {
		const parts = raw.slice(1, -1).split(",").map(s => s.trim());
		if (parts[0]) settings.logLevel = parts[0];
		if (parts[1]) settings.player = parts[1];
		if (parts[2]) settings.scheme = parts[2];
		if (parts[3]) settings.encode = parts[3];
		if (parts[4]) settings.jump = parts[4];
		return;
	}
	const params = Object.fromEntries(new URLSearchParams(raw));
	if (params.logLevel) settings.logLevel = decodeURIComponent(params.logLevel);
	if (params.player) settings.player = decodeURIComponent(params.player);
	if (params.scheme) settings.scheme = decodeURIComponent(params.scheme);
	if (params.encode) settings.encode = decodeURIComponent(params.encode);
	if (params.jump) settings.jump = decodeURIComponent(params.jump);
}

export function resolveSettings() {
	const settings = loadFromBoxJS();
	applyArgument(settings);
	Console.debug(`Settings: ${JSON.stringify(settings)}`);
	return settings;
}
