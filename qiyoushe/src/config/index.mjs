export const CRYPTO = Object.freeze({
	responseKey: "vEukA&w15z4VAD3kAY#fkL#rBnU!WDhN",
	requestKey: "gH3nA7fR9tV1jY6z",
	saltLength: 12,
});

export const BOXJS_KEYS = Object.freeze({
	player: "qiyou_player_select",
	scheme: "qiyou_custom_scheme",
	encode: "qiyou_url_encode",
	jump: "qiyou_player_jump",
	logLevel: "qiyou_log_level",
});

export const DEFAULT_LOG_LEVEL = "info";
export const DEFAULT_PLAYER = "lenna";
export const CACHE_KEY = "qiyou_last_video_id";

export const PLAYER_MAP = Object.freeze({
	lenna:          { scheme: "lenna://x-callback-url/play?url=",         needEncode: true,  supportName: false },
	SenPlayer:      { scheme: "SenPlayer://x-callback-url/play?url=",     needEncode: true,  supportName: false },
	"SenPlayer-dl": { scheme: "SenPlayer://x-callback-url/download?url=", needEncode: true,  supportName: true  },
	Infuse:         { scheme: "infuse://x-callback-url/play?url=",        needEncode: true,  supportName: false },
	Fileball:       { scheme: "filebox://play?url=",                      needEncode: true,  supportName: false },
	VidHub:         { scheme: "vidhub://x-callback-url/play?url=",        needEncode: true,  supportName: false },
	IINA:           { scheme: "iina://weblink?url=",                      needEncode: true,  supportName: false },
	Alook:          { scheme: "Alook://",                                 needEncode: false, supportName: false },
	VLC:            { scheme: "vlc://",                                   needEncode: false, supportName: false },
	KMPlayer:       { scheme: "kmplayer://",                              needEncode: false, supportName: false },
	NPlayer:        { scheme: "nplayer-http://",                          needEncode: false, supportName: false },
	Safari:         { scheme: "http://",                                  needEncode: false, supportName: false },
});
