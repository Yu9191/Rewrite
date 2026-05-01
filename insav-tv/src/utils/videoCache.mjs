import { Storage } from "@nsnanocat/util";

/** /api/video/info 元数据缓存键 */
const KEY = "insav_video_meta_cache";

/** 缓存上限（FIFO 淘汰） */
const MAX_ENTRIES = 50;

/**
 * 视频元数据
 * @typedef {Object} VideoMeta
 * @property {string}   title         主标题
 * @property {string[]} tags          标签名称数组
 * @property {string}   actor         女优名（可选）
 * @property {string}   publishDate   发行日期（可选）
 * @property {number}   _ts           写入时间戳
 */

/** 读取整张表 */
function loadCache() {
	const raw = Storage.getItem(KEY, {});
	return raw && typeof raw === "object" ? raw : {};
}

/**
 * 写入一条视频元数据；超过容量时淘汰最早的
 * @param {string|number} vid
 * @param {Omit<VideoMeta,"_ts">} meta
 */
export function setVideoMeta(vid, meta) {
	if (vid == null) return;
	const cache = loadCache();
	cache[String(vid)] = { ...meta, _ts: Date.now() };

	const keys = Object.keys(cache);
	if (keys.length > MAX_ENTRIES) {
		keys.sort((a, b) => (cache[a]?._ts || 0) - (cache[b]?._ts || 0));
		for (let i = 0; i < keys.length - MAX_ENTRIES; i++) delete cache[keys[i]];
	}
	Storage.setItem(KEY, cache);
}

/**
 * 读取一条视频元数据
 * @param {string|number} vid
 * @returns {VideoMeta|null}
 */
export function getVideoMeta(vid) {
	if (vid == null) return null;
	const cache = loadCache();
	return cache[String(vid)] || null;
}
