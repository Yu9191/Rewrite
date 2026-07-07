import { TEN_YEARS_SECONDS } from "../config/index.mjs";

/**
 * /api/user/getVipStatus：解锁 VIP 状态
 * @param {{data: Record<string, unknown>}} payload
 * @returns {boolean}
 */
export function modifyVipStatus(payload) {
	if (!payload?.data || typeof payload.data !== "object") return false;
	const expireAt = Math.floor(Date.now() / 1000) + TEN_YEARS_SECONDS;
	payload.data.vip_status = 1;
	payload.data.vip_time = expireAt;
	return true;
}

/**
 * /api/user/info | /api/user/login：解锁全部 VIP 等级（VIP1~VIP4）+ 改昵称
 * @param {{data: Record<string, unknown>}} payload
 * @returns {boolean}
 */
export function modifyUserInfo(payload) {
	if (!payload?.data || typeof payload.data !== "object") return false;
	const expireAt = Math.floor(Date.now() / 1000) + TEN_YEARS_SECONDS;
	if (payload.data.username) payload.data.username = "联合国儿童基金会";
	payload.data.is_vip1 = 1;
	payload.data.is_vip2 = 1;
	payload.data.is_vip3 = 1;
	payload.data.is_vip4 = 1;
	payload.data.vip_end_time = expireAt;
	payload.data.wm_end_time = expireAt;
	payload.data.dm_end_time = expireAt;
	payload.data.k4_end_time = expireAt;
	return true;
}
