function clearArrayProperty(obj, key) {
	if (Array.isArray(obj?.[key]) && obj[key].length) {
		obj[key] = [];
		return true;
	}
	return false;
}

export function modifyCards(payload) {
	if (Array.isArray(payload)) {
		payload.length = 0;
		return true;
	}
	let changed = false;
	for (const key of ["list", "cardList", "banners", "bannerList", "promotionList", "items", "data"]) {
		changed = clearArrayProperty(payload, key) || changed;
	}
	return changed;
}
