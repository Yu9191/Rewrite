// 常量

// API 加密密码
export const CRYPTO = Object.freeze({
	secret: "xxx",
});

// CDN 域名池
export const API_HOSTS = Object.freeze([
	"v2.cdn199.com",
	"v2.kekecdn.net",
	"v2.luchu.org",
	"v2.madou.ws",
	"v2.papapa.biz",
	"v2.tianmtv.com",
	"v2.xiaoshuo.info",
	"v2.xiaoshuo.la",
]);

// BoxJS 键
export const BOXJS_KEYS = Object.freeze({
	logLevel: "porntube_log_level",
	player: "porntube_player_select",
	scheme: "porntube_custom_scheme",
	encode: "porntube_url_encode",
	jump: "porntube_player_jump",
});

export const DEFAULT_LOG_LEVEL = "info";

// 默认播放器
export const DEFAULT_PLAYER = "lenna";

// 通知去重键
export const CACHE_KEY = "porntube_last_video_id";

// Scheme 映射
export const PLAYER_MAP = Object.freeze({
	lenna:          { scheme: "lenna://x-callback-url/play?url=",        needEncode: true,  supportName: false },
	SenPlayer:      { scheme: "SenPlayer://x-callback-url/play?url=",    needEncode: true,  supportName: false },
	"SenPlayer-dl": { scheme: "SenPlayer://x-callback-url/download?url=",needEncode: true,  supportName: true  },
	Infuse:         { scheme: "infuse://x-callback-url/play?url=",       needEncode: true,  supportName: false },
	Fileball:       { scheme: "filebox://play?url=",                     needEncode: true,  supportName: false },
	VidHub:         { scheme: "vidhub://x-callback-url/play?url=",       needEncode: true,  supportName: false },
	IINA:           { scheme: "iina://weblink?url=",                     needEncode: true,  supportName: false },
	Alook:          { scheme: "Alook://",                                needEncode: false, supportName: false },
	VLC:            { scheme: "vlc://",                                  needEncode: false, supportName: false },
	KMPlayer:       { scheme: "kmplayer://",                             needEncode: false, supportName: false },
	NPlayer:        { scheme: "nplayer-http://",                         needEncode: false, supportName: false },
	Safari:         { scheme: "http://",                                 needEncode: false, supportName: false },
});
