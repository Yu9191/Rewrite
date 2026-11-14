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

// util 在 import 时已把 $argument 归一化为对象（无参数时为 {}）
function applyArgument(settings) {
	if (!$argument || typeof $argument !== "object") return;
	if ($argument.logLevel) settings.logLevel = String($argument.logLevel);
	if ($argument.player) settings.player = String($argument.player);
	if ($argument.scheme) settings.scheme = String($argument.scheme);
	if ($argument.encode) settings.encode = String($argument.encode);
	if ($argument.jump) settings.jump = String($argument.jump);
}

export function resolveSettings() {
	const settings = loadFromBoxJS();
	applyArgument(settings);
	Console.debug(`Settings: ${JSON.stringify(settings)}`);
	return settings;
}
