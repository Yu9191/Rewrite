/** AES-128-CBC + PKCS7 加密参数 */
export const CRYPTO = Object.freeze({
	key: "0XxdjmI55ZjjqQLO3nI7gGqrBP0Vz9jS",
	iv: "RWf23muavY",
	signKey: "NRkw0g3iJLDvw5tJ5PuVt5276z0SOuyL",
	suffix: "NWSdef",
});

/** BoxJS 持久化键名 */
export const BOXJS_KEYS = Object.freeze({
	player: "insav_player_select",
	scheme: "insav_custom_scheme",
	encode: "insav_url_encode",
	logLevel: "insav_log_level",
});

/** 默认日志级别（off / error / warn / info / debug / all） */
export const DEFAULT_LOG_LEVEL = "info";

/** getVideoUrl 通知去重缓存键 */
export const CACHE_KEY = "insav_last_video_id";

/** 远端共享 Token JSON */
export const TOKEN_URL = "https://insav-pages.pages.dev/token";

/** 默认播放器代号 */
export const DEFAULT_PLAYER = "lenna";

/** Token 新鲜度告警窗口（分钟） */
export const TOKEN_FRESH_WINDOW_MIN = 2;

/** VIP 有效期：10 年（秒） */
export const TEN_YEARS_SECONDS = 10 * 365 * 24 * 60 * 60;

/** /api/config/links 保留的入口标题 */
export const LINKS_WHITELIST = Object.freeze([
	"猫咪",
	"女优库",
	"无码城",
	"动漫展",
	"4k高清",
	"禁漫天堂",
	"ok短视频",
]);

/** 播放器 Scheme 映射 */
export const PLAYER_MAP = Object.freeze({
	lenna:         { scheme: "lenna://x-callback-url/play?url=",        needEncode: true,  supportName: false },
	SenPlayer:     { scheme: "SenPlayer://x-callback-url/play?url=",    needEncode: true,  supportName: false },
	"SenPlayer-dl":{ scheme: "SenPlayer://x-callback-url/download?url=",needEncode: true,  supportName: true  },
	Infuse:        { scheme: "infuse://x-callback-url/play?url=",       needEncode: true,  supportName: false },
	Fileball:      { scheme: "filebox://play?url=",                     needEncode: true,  supportName: false },
	VidHub:        { scheme: "vidhub://x-callback-url/play?url=",       needEncode: true,  supportName: false },
	IINA:          { scheme: "iina://weblink?url=",                     needEncode: true,  supportName: false },
	Alook:         { scheme: "Alook://",                                needEncode: false, supportName: false },
	VLC:           { scheme: "vlc://",                                  needEncode: false, supportName: false },
	KMPlayer:      { scheme: "kmplayer://",                             needEncode: false, supportName: false },
	NPlayer:       { scheme: "nplayer-http://",                         needEncode: false, supportName: false },
	Safari:        { scheme: "http://",                                 needEncode: false, supportName: false },
});
