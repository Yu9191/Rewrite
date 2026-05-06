const ARRAY_AD_KEYS = new Set([
	"splashAds",
	"tanchuangAD",
	"nightAD",
	"homeTopBanner",
	"homeTopAd",
	"applactionBanner",
	"playAd",
	"liveTopAd",
	"livePlayAd",
	"tiktokTopBanner",
	"darkTopAd",
	"communityTopBanner",
	"communityTopAd",
	"postDetailAd",
	"mineAd",
	"topicAd",
	"announcement",
	"bannerAdList",
	"lineAdList",
	"moreListAd",
	"playPreviewAd",
	"activityBanners",
	"advertise",
]);

const OBJECT_AD_KEYS = new Set([
	"homeFloatWindowData",
	"homeAiFloatWindowData",
]);

const STRING_AD_KEYS = new Set([
	"appDownloadUrl",
	"appShortUrl",
]);

function clearKnownAdField(obj, key) {
	if (!obj || typeof obj !== "object") return false;
	if (ARRAY_AD_KEYS.has(key)) {
		if (Array.isArray(obj[key]) && obj[key].length === 0) return false;
		obj[key] = [];
		return true;
	}
	if (OBJECT_AD_KEYS.has(key)) {
		const old = obj[key];
		obj[key] = null;
		return old !== null;
	}
	if (STRING_AD_KEYS.has(key)) {
		const old = obj[key];
		obj[key] = "";
		return old !== "";
	}
	if (key === "adsType") {
		const old = obj[key];
		obj[key] = 0;
		return old !== 0;
	}
	return false;
}

function walk(obj) {
	if (!obj || typeof obj !== "object") return false;
	let changed = false;
	for (const key of Object.keys(obj)) {
		changed = clearKnownAdField(obj, key) || changed;
		const value = obj[key];
		if (value && typeof value === "object") changed = walk(value) || changed;
	}
	return changed;
}

export function modifyPingConfig(payload) {
	return walk(payload);
}
