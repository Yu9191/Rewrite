function unlockMedia(item) {
	if (!item || typeof item !== "object") return false;
	let changed = false;
	for (const key of ["payType", "price", "preTime", "location"]) {
		if (item[key] !== undefined && item[key] !== 0) {
			item[key] = 0;
			changed = true;
		}
	}
	if (item.isBuy !== true) {
		item.isBuy = true;
		changed = true;
	}
	if (item.isEnoughMoney !== true) {
		item.isEnoughMoney = true;
		changed = true;
	}
	return changed;
}

function walk(value) {
	let changed = false;
	if (Array.isArray(value)) {
		for (const item of value) changed = unlockMedia(item) || walk(item) || changed;
	} else if (value && typeof value === "object") {
		for (const key of Object.keys(value)) changed = walk(value[key]) || changed;
	}
	return changed;
}

export function modifyMediaList(payload) {
	let changed = walk(payload);
	if (Array.isArray(payload.jumpTabList) && payload.jumpTabList.length) {
		payload.jumpTabList = [];
		changed = true;
	}
	payload.jumpTabShowType = 0;
	return changed;
}
