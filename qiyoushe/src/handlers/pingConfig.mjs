// 这些字段在前端会按位置拆分成开屏、首页弹窗、banner、播放页广告等列表。
const ARRAY_AD_KEYS = new Set([
	"splashAds",
	"tanchuangAD",
	"nightAD",
	"announcements",
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

// 这些字段是浮窗类对象；直接置空可以避免首页/AI浮窗继续渲染。
const OBJECT_AD_KEYS = new Set([
	"homeFloatWindowData",
	"homeAiFloatWindowData",
	"floatingWindow",
	"aiFloatingWindow",
]);

// 下载入口等字符串链接，置空避免跳转推广落地页。
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
	// 部分活动弹窗只看布尔开关，保留对象结构但关闭展示。
	if (key === "IsHomePopUp" || key === "isOpen") {
		const old = obj[key];
		obj[key] = false;
		return old !== false;
	}
	// 预售/AI会员活动字段会被首页弹窗和悬浮入口读取，只关闭入口开关。
	if ((key === "advanceSource" || key === "activityAwVip") && obj[key] && typeof obj[key] === "object") {
		let changed = false;
		if (obj[key].IsHomePopUp !== undefined) {
			changed = obj[key].IsHomePopUp !== false || changed;
			obj[key].IsHomePopUp = false;
		}
		if (obj[key].isOpen !== undefined) {
			changed = obj[key].isOpen !== false || changed;
			obj[key].isOpen = false;
		}
		return changed;
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
