/**
 * /api/extend/lists：清空所有扩展位（启动广告等）
 * @param {{data: Record<string, unknown>}} payload
 * @returns {boolean} 是否有改动
 */
export function modifyExtendLists(payload) {
	if (!payload?.data || typeof payload.data !== "object") return false;
	for (const key of Object.keys(payload.data)) {
		if (Array.isArray(payload.data[key])) payload.data[key] = [];
	}
	return true;
}
