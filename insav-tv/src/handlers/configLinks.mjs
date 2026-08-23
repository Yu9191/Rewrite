import { LINKS_WHITELIST } from "../config/index.mjs";

/**
 * /api/config/links：仅保留白名单入口，移除推广链接
 * @param {{data: unknown}} payload
 * @returns {boolean}
 */
export function modifyConfigLinks(payload) {
	if (!Array.isArray(payload?.data)) return false;
	payload.data = payload.data.filter(item => LINKS_WHITELIST.includes(item?.title));
	return true;
}
