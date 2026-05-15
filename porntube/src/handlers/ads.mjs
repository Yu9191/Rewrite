// 广告
import { Console } from "@nsnanocat/util";

export function modifyAds(payload) {
	if (!payload) return false;
	let changed = false;
	if (Array.isArray(payload.list) && payload.list.length > 0) {
		payload.list = [];
		changed = true;
	}
	if (Array.isArray(payload) && payload.length > 0) {
		payload.length = 0;
		changed = true;
	}
	if (changed) Console.info("ads cleared");
	return changed;
}

export function modifyWhitelist(payload) {
	if (!Array.isArray(payload) || payload.length === 0) return false;
	let removed = 0;
	for (let i = payload.length - 1; i >= 0; i--) {
		const id = String(payload[i] && payload[i].id || "");
		if (/^(redirect|ad|popup|videos2_ui_telegram_footer_|banner)/i.test(id)) {
			payload.splice(i, 1);
			removed++;
		}
	}
	if (removed > 0) Console.info(`whitelist cleaned ${removed}`);
	return removed > 0;
}
