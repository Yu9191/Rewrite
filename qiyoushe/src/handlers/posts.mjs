const ZERO_KEYS = new Set(["payType", "price", "preTime", "location", "amount", "money"]);
const TRUE_KEYS = new Set(["isBuy", "isPaid", "isPay", "isUnlock", "isUnlocked", "viewable", "canView", "isEnoughMoney", "isVip", "isVipMember"]);
const FALSE_KEYS = new Set(["isLock", "locked", "needPay", "needVip", "isNeedVip", "showPay", "showVip"]);

function patchPostItem(item) {
	if (!item || typeof item !== "object") return false;
	let changed = false;
	for (const key of Object.keys(item)) {
		const value = item[key];
		if (ZERO_KEYS.has(key) && typeof value === "number" && value !== 0) {
			item[key] = 0;
			changed = true;
			continue;
		}
		if (TRUE_KEYS.has(key) && value !== true) {
			item[key] = true;
			changed = true;
			continue;
		}
		if (FALSE_KEYS.has(key) && value !== false) {
			item[key] = false;
			changed = true;
			continue;
		}
		if (key === "code" && value === 6037) {
			item[key] = 200;
			if (typeof item.msg === "string") item.msg = "success";
			if (typeof item.tip === "string") item.tip = "success";
			changed = true;
			continue;
		}
		if (value && typeof value === "object") changed = patchPostItem(value) || changed;
	}
	return changed;
}

function patchBlockedList(payload) {
	let changed = false;
	let blocked = false;
	if (payload.code === 6037) {
		payload.code = 200;
		payload.msg = "success";
		payload.tip = "success";
		blocked = true;
		changed = true;
	}
	if (blocked && (!payload.data || typeof payload.data !== "object")) {
		payload.data = { list: [], total: 0 };
		changed = true;
	}
	if (payload.data && typeof payload.data === "object" && payload.data.code === 6037) {
		payload.data.code = 200;
		payload.data.msg = "success";
		payload.data.tip = "success";
		blocked = true;
		changed = true;
	}
	if (blocked && payload.data && typeof payload.data === "object" && !Array.isArray(payload.data.list)) {
		payload.data.list = [];
		changed = true;
	}
	return changed;
}

export function modifyPosts(payload) {
	if (!payload || typeof payload !== "object") return false;
	let changed = patchBlockedList(payload);
	if (payload.data && typeof payload.data === "object" && typeof payload.data.code === "number" && payload.data.code !== 200) {
		payload.data.code = 200;
		payload.data.msg = "success";
		payload.data.tip = "success";
		changed = true;
	}
	changed = patchPostItem(payload) || changed;
	if (payload.data && typeof payload.data === "object") changed = patchBlockedList(payload) || changed;
	return changed;
}
