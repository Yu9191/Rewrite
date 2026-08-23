/**
 * /api/notice/lists：清空公告弹窗
 * @param {{data: unknown}} payload
 * @returns {boolean}
 */
export function modifyNoticeLists(payload) {
	if (!payload) return false;
	payload.data = [];
	return true;
}
