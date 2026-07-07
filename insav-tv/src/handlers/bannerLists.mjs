/**
 * /api/banner/lists：移除广告 banner，仅保留内部跳转条目（女优页等）
 *
 * 判定规则：
 *   - url 非空 → 视为广告/推广外链，删除
 *   - url 为空且 aid > 0 → 视为站内女优 banner，保留
 *   - 其它（url 空且 aid=0）→ 删除
 *
 * @param {{data: unknown}} payload
 * @returns {boolean}
 */
export function modifyBannerLists(payload) {
	if (!Array.isArray(payload?.data)) return false;
	payload.data = payload.data.filter(item => !item?.url && item?.aid > 0);
	return true;
}
