// 常量配置

// API 响应外壳 {"r":"..."} 的加解密密码，与前端 worker.encrypt/decrypt 一致
export const CRYPTO = Object.freeze({
	secret: "xxx",
});

// 91porn family 的 8 个 v2.* CDN 域名
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

// BoxJS 持久化键
export const BOXJS_KEYS = Object.freeze({
	logLevel: "porntube_log_level",
});

export const DEFAULT_LOG_LEVEL = "info";
