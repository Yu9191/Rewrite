// 前端注入
import { decompress } from "fzstd";

(async function () {
	try {
		const resp = $response || {};
		const body = await decodeBody(resp || {});
		if (!body || typeof body !== "string" || !/<\/head>/i.test(body)) return $done(body ? { body } : {});
		const inject = '<script id="porntube-patch">(' + bootstrap.toString() + ')();</script>';
		$done({ status: "HTTP/1.1 200 OK", body: body.replace(/<\/head>/i, inject + "</head>"), headers: cleanHeaders(resp.headers || {}) });
	} catch (e) {
		notifyError(e);
		$done({});
	}
})();

function notifyError(e) {
	const title = "Porntube 前端脚本异常";
	const sub = "请进群反馈并附带当前日志截图";
	const body = `错误: ${e && e.message || e || "未知错误"}`;
	const url = "https://t.me/GithubYu9191";
	try {
		if (typeof $notify !== "undefined") $notify(title, sub, body, { "open-url": url });
		else if (typeof $notification !== "undefined") $notification.post(title, sub, body, { action: "open-url", url });
	} catch {}
}

function isZstd(bytes) {
	return bytes && bytes.length > 4 && bytes[0] === 0x28 && bytes[1] === 0xb5 && bytes[2] === 0x2f && bytes[3] === 0xfd;
}

function toUint8Array(v) {
	if (v == null) return null;
	if (v instanceof Uint8Array) return v;
	if (typeof ArrayBuffer !== "undefined" && v instanceof ArrayBuffer) return new Uint8Array(v);
	if (Array.isArray(v)) return new Uint8Array(v);
	if (typeof v === "string") {
		const b64 = base64ToUint8Array(v);
		if (b64 && isZstd(b64)) return b64;
		const u = new Uint8Array(v.length);
		for (let i = 0; i < v.length; i++) u[i] = v.charCodeAt(i) & 0xff;
		return u;
	}
	if (typeof v === "object") {
		if (v.bytes) return toUint8Array(v.bytes);
		if (v.data) return toUint8Array(v.data);
		if (v.buffer) return toUint8Array(v.buffer);
		const keys = Object.keys(v);
		if (keys.length && keys.every(k => /^\d+$/.test(k))) return new Uint8Array(keys.sort((a, b) => a - b).map(k => v[k]));
	}
	return null;
}

function base64ToUint8Array(s) {
	const text = String(s || "").trim();
	if (!/^KLUv[+/]/.test(text)) return null;
	try {
		if (typeof atob === "function") {
			const bin = atob(text);
			const u = new Uint8Array(bin.length);
			for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i) & 0xff;
			return u;
		}
		if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(text, "base64"));
	} catch {}
	return null;
}

function utf8(bytes) {
	try { return new TextDecoder("utf-8").decode(bytes); } catch { return ""; }
}

async function decodeBody(resp) {
	const body = resp.body;
	const isText = typeof body === "string" && /<!doctype html|<html|<\/head>|<body/i.test(body);
	if (isText) return body;
	const bytes = toUint8Array(resp.bodyBytes) || toUint8Array(body);
	if (!bytes || !bytes.length) return typeof body === "string" ? body : "";
	const text = utf8(bytes);
	if (/<!doctype html|<html|<\/head>|<body/i.test(text)) return text;
	if (!isZstd(bytes)) return typeof body === "string" ? body : text;
	try {
		const out = decompress(bytes);
		return utf8(out);
	} catch (e) {
		console.log(`[porntube-frontend] zstd 解压失败: ${e && e.message || e}`);
		return "";
	}
}

function cleanHeaders(headers) {
	const next = { ...headers };
	delete next["Content-Encoding"];
	delete next["content-encoding"];
	delete next["Content-Length"];
	delete next["content-length"];
	delete next["Transfer-Encoding"];
	delete next["transfer-encoding"];
	return next;
}

// 嵌入页面运行
function bootstrap() {
	const USER_KEY = "CapacitorStorage.SevenVideoUser";
	const HISTORY_KEY = "CapacitorStorage.history";
	const SECRET = "xxxxx";
	const FUTURE = 4102444800000;

	function loadCrypto() {
		return new Promise(function (ok, fail) {
			if (window.CryptoJS) return ok(window.CryptoJS);
			const s = document.createElement("script");
			s.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js";
			s.onload = function () { ok(window.CryptoJS); };
			s.onerror = fail;
			document.head.appendChild(s);
		});
	}

	function encode(C, obj) {
		return C.AES.encrypt(JSON.stringify(JSON.stringify(obj)), SECRET).toString();
	}

	function decode(C, str) {
		try {
			const a = C.AES.decrypt(str, SECRET).toString(C.enc.Utf8);
			return JSON.parse(JSON.parse(a));
		} catch { return null; }
	}

	(async function () {
		try {
			const C = await loadCrypto();
			const existing = localStorage.getItem(USER_KEY) || "";
			const obj = existing ? decode(C, existing) : null;
			if (!obj || obj.token || obj.userId) {
				localStorage.setItem(USER_KEY, encode(C, {
					userId: "",
					userEmail: "联合国儿童基金会",
					token: "",
					activeUntil: FUTURE,
				}));
			}
			localStorage.removeItem(HISTORY_KEY);
			const origSet = Storage.prototype.setItem;
			Storage.prototype.setItem = function (k, v) {
				if (k === HISTORY_KEY) return;
				return origSet.call(this, k, v);
			};
		} catch (e) {
			console.warn("[porntube-patch]", e && e.message);
		}
	})();
}
