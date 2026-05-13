// 已登录账号信息接口的提权：避免到期续费弹窗
// /sevenVideoUserSH /sevenVideoUserDetails /sevenVideoUserFind
import { Console } from "@nsnanocat/util";

const FUTURE = 4102444800000; // 2100-01-01

export function modifyUser(payload) {
	if (!payload || typeof payload !== "object") return false;
	let changed = false;

	if ("activeUntil" in payload && payload.activeUntil < FUTURE) {
		payload.activeUntil = FUTURE;
		changed = true;
	}
	for (const k of ["isPremium", "vip", "premium"]) {
		if (k in payload && payload[k] !== true) {
			payload[k] = true;
			changed = true;
		}
	}
	if ("freeTrialUsed" in payload && payload.freeTrialUsed > 0) {
		payload.freeTrialUsed = 0;
		changed = true;
	}

	if (changed) Console.info(`uplift ${payload.userEmail || payload.userId || ""}`);
	return changed;
}
