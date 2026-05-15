// 列表接口
function unlockItem(item) {
	if (!item || typeof item !== "object") return false;
	let changed = false;
	if (item.videoType === "cvideo") {
		item.videoType = "tvideo";
		changed = true;
	}
	if (item.isPaid === true) {
		item.isPaid = false;
		changed = true;
	}
	if (item.premium === true) {
		item.premium = false;
		changed = true;
	}
	if (item.vip === true) {
		item.vip = false;
		changed = true;
	}
	return changed;
}

function walk(value) {
	let changed = false;
	if (Array.isArray(value)) {
		for (const item of value) {
			changed = unlockItem(item) || changed;
			changed = walk(item) || changed;
		}
	} else if (value && typeof value === "object") {
		for (const key of Object.keys(value)) changed = walk(value[key]) || changed;
	}
	return changed;
}

export function modifyVideoList(payload) {
	return walk(payload);
}
