const ARRAY_KEYS = new Set(["list", "cardList", "cardInfoList", "banners", "bannerList", "promotionList", "items", "data"]);
const FALSE_KEYS = new Set(["activityStatus", "isOpen", "isShow", "showPopup"]);

export function modifyCards(payload) {
	if (Array.isArray(payload)) {
		payload.length = 0;
		return true;
	}
	if (!payload || typeof payload !== "object") return false;
	let changed = false;
	for (const key of Object.keys(payload)) {
		const value = payload[key];
		if (ARRAY_KEYS.has(key) && Array.isArray(value)) {
			if (value.length) {
				payload[key] = [];
				changed = true;
			}
			continue;
		}
		if (FALSE_KEYS.has(key)) {
			if (value !== false) {
				payload[key] = false;
				changed = true;
			}
			continue;
		}
		if (key === "status" && typeof value === "number" && value !== 2) {
			payload[key] = 2;
			changed = true;
			continue;
		}
		if (value && typeof value === "object") changed = modifyCards(value) || changed;
	}
	return changed;
}
