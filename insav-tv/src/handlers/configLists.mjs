/**
 * /api/config/lists：清除视频/启动/暂停广告配置
 * @param {{data: Record<string, unknown>}} payload
 * @returns {boolean}
 */
export function modifyConfigLists(payload) {
	if (!payload?.data || typeof payload.data !== "object") return false;
	payload.data.video_adv = "[]";
	payload.data.play_ad = "";
	payload.data.play_ad_url = "";
	payload.data.pause_ad = "";
	payload.data.pause_ad_url = "";
	return true;
}
