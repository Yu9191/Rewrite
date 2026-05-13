// 广告 + 重定向白名单
import { Console } from "@nsnanocat/util";

// /getAdsList -> 清空 list
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

// /getWhitelist -> 只删 redirect/ad/popup/banner，保留语言包等正常项
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
