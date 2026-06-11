import { Console, fetch, Storage } from "@nsnanocat/util";
import { TOKEN_URL } from "../config/index.mjs";
import { safeJson } from "./crypto.mjs";

const TOKEN_CACHE_KEY = "insav_token_cache";

function isVipValid(tokenData) {
	if (!tokenData?.vip) return false;
	const now = Date.now();
	for (const key of Object.keys(tokenData.vip)) {
		const v = tokenData.vip[key];
		if (v?.expireTime) {
			const exp = new Date(v.expireTime).getTime();
			if (!Number.isNaN(exp) && exp > now) return true;
		}
	}
	return false;
}

export async function fetchToken() {
	try {
		const cached = Storage.getItem(TOKEN_CACHE_KEY, null);
		if (cached?.token && isVipValid(cached)) {
			return cached;
		}
		const resp = await fetch({ url: TOKEN_URL, timeout: 10 });
		if (!resp || !resp.body) return cached || null;
		const data = safeJson(resp.body);
		if (data?.token) {
			Storage.setItem(TOKEN_CACHE_KEY, data);
		}
		return data;
	} catch (e) {
		Console.error(`fetchToken 失败: ${e?.message || e}`);
		const cached = Storage.getItem(TOKEN_CACHE_KEY, null);
		return cached || null;
	}
}
