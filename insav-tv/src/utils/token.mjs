import { Console, fetch, notification } from "@nsnanocat/util";
import { TOKEN_FRESH_WINDOW_MIN, TOKEN_URL } from "../config/index.mjs";
import { safeJson } from "./crypto.mjs";

/**
 * 远端 Token 数据
 * @typedef {Object} TokenData
 * @property {string} token       JWT
 * @property {string} updateTime  上次更新时间 "YYYY/M/D HH:mm:ss"
 */

/**
 * 拉取远端共享 Token
 * @returns {Promise<TokenData|null>}
 */
export async function fetchToken() {
	try {
		const resp = await fetch({ url: TOKEN_URL, timeout: 10 });
		if (!resp || !resp.body) return null;
		return safeJson(resp.body);
	} catch (e) {
		Console.error(`fetchToken 失败: ${e?.message || e}`);
		return null;
	}
}

/**
 * 检测 Token 是否处于"刚续期"窗口，若是则提醒稍后再试
 * @param {TokenData|null} tokenData
 */
export function notifyIfStale(tokenData) {
	if (!tokenData?.updateTime) return;
	try {
		const updateDate = new Date(tokenData.updateTime);
		if (Number.isNaN(updateDate.getTime())) return;
		const diffMin = Math.abs(Date.now() - updateDate.getTime()) / 60000;
		if (diffMin <= TOKEN_FRESH_WINDOW_MIN) {
			notification(
				"insav Token 续期中",
				"⏳ 请 5 分钟后再来查看",
				"会员正在自动续期，Worker 缓存可能有延迟，请稍候再试",
			);
		}
	} catch (e) {
		Console.error(`notifyIfStale 异常: ${e?.message || e}`);
	}
}
