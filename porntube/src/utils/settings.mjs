// 设置加载：BoxJS 持久化 + $argument，后者覆盖前者
import { $argument, Console, Storage } from "@nsnanocat/util";
import { BOXJS_KEYS, DEFAULT_LOG_LEVEL } from "../config/index.mjs";

function loadFromBoxJS() {
	const logLevel = Storage.getItem(BOXJS_KEYS.logLevel, "");
	const settings = { logLevel: DEFAULT_LOG_LEVEL };
	if (logLevel) settings.logLevel = logLevel;
	return settings;
}

function applyArgument(settings) {
	if (typeof $argument === "undefined" || !$argument) return;
	if (typeof $argument === "object" && !Array.isArray($argument)) {
		if ($argument.logLevel) settings.logLevel = String($argument.logLevel);
		return;
	}
	const raw = String($argument);
	if (raw.startsWith("[") && raw.endsWith("]")) {
		const parts = raw.slice(1, -1).split(",").map(s => s.trim());
		if (parts[0]) settings.logLevel = parts[0];
		return;
	}
	const params = Object.fromEntries(new URLSearchParams(raw));
	if (params.logLevel) settings.logLevel = decodeURIComponent(params.logLevel);
}

export function resolveSettings() {
	const settings = loadFromBoxJS();
	applyArgument(settings);
	Console.debug(`Settings: ${JSON.stringify(settings)}`);
	return settings;
}
