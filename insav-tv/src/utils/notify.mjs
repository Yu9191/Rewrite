import { Storage } from "@nsnanocat/util";
import { CACHE_KEY } from "../config/index.mjs";

/**
 * 同一 videoId 仅推送一次通知
 * @param {string} videoId
 * @returns {boolean} true=应推送
 */
export function shouldNotify(videoId) {
	if (!videoId) return false;
	const last = Storage.getItem(CACHE_KEY, "");
	if (last === videoId) return false;
	Storage.setItem(CACHE_KEY, videoId);
	return true;
}
