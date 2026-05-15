// 通知去重
import { Storage } from "@nsnanocat/util";
import { CACHE_KEY } from "../config/index.mjs";

export function shouldNotify(videoId) {
	if (!videoId) return false;
	const last = Storage.getItem(CACHE_KEY, "");
	if (last === videoId) return false;
	Storage.setItem(CACHE_KEY, videoId);
	return true;
}
