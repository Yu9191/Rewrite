// 注入到站点 HTML 的前端 patch
// 伪造 SevenVideoUser 让前端以为已登录，并清空 history 取消每日次数限制
// 走 script-response-body，匹配 porntube.cool 等站点 HTML 响应

(async function () {
	const body = await decodeBody($response || {});
	if (!body || typeof body !== "string" || !/<\/head>/i.test(body)) return $done(body ? { body } : {});
	const inject = '<script id="porntube-patch">(' + bootstrap.toString() + ')();</script>';
	$done({ body: body.replace(/<\/head>/i, inject + "</head>"), headers: cleanHeaders($response.headers || {}) });
})();

// zstd 处理
function isZstd(bytes) {
	return bytes && bytes.length > 4 && bytes[0] === 0x28 && bytes[1] === 0xb5 && bytes[2] === 0x2f && bytes[3] === 0xfd;
}

function toUint8Array(v) {
	if (v == null) return null;
	if (v instanceof Uint8Array) return v;
	if (typeof ArrayBuffer !== "undefined" && v instanceof ArrayBuffer) return new Uint8Array(v);
	if (Array.isArray(v)) return new Uint8Array(v);
	if (typeof v === "string") {
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

function utf8(bytes) {
	try { return new TextDecoder("utf-8").decode(bytes); } catch { return ""; }
}

function httpGet(url) {
	return new Promise((resolve, reject) => {
		if (typeof $task !== "undefined") return $task.fetch({ url }).then(resolve, reject);
		if (typeof $httpClient !== "undefined") return $httpClient.get(url, (e, r, b) => e ? reject(e) : resolve({ body: b, headers: r && r.headers }));
		reject(new Error("no http client"));
	});
}

async function loadFzstd() {
	if (globalThis.fzstd) return globalThis.fzstd;
	try {
		const r = await httpGet("https://cdn.jsdelivr.net/npm/fzstd@0.1.1/umd/index.js");
		const code = typeof r === "string" ? r : r && typeof r.body === "string" ? r.body : "";
		if (!code) return null;
		Function(code).call(globalThis);
		return globalThis.fzstd || null;
	} catch {
		return null;
	}
}

async function decodeBody(resp) {
	const body = resp.body;
	const headers = resp.headers || {};
	const key = Object.keys(headers).find(k => k.toLowerCase() === "content-encoding");
	const enc = key ? String(headers[key]).toLowerCase() : "";
	const suspect = enc.includes("zstd") || (typeof body === "string" && body.charCodeAt(0) === 0x28);
	if (typeof body === "string" && body.length && !suspect) return body;
	const bytes = toUint8Array(resp.bodyBytes) || toUint8Array(body);
	if (!bytes || !bytes.length) return typeof body === "string" ? body : "";
	if (!enc.includes("zstd") && !isZstd(bytes)) return utf8(bytes);
	const z = await loadFzstd();
	if (!z) return "";
	try {
		const out = (z.decompress || z.decompressSync).call(z, bytes);
		return utf8(out);
	} catch {
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

// 下面这段会被 toString 序列化嵌进 HTML，跑在页面里。
// 注意：不能用闭包外的变量
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

	// 等同于前端的 worker.setObject(key, obj)：双层 stringify 后 AES
	function encode(C, obj) {
		return C.AES.encrypt(JSON.stringify(JSON.stringify(obj)), SECRET).toString();
	}

	(async function () {
		try {
			const C = await loadCrypto();
			if (!localStorage.getItem(USER_KEY)) {
				localStorage.setItem(USER_KEY, encode(C, {
					userId: "u" + Date.now().toString(36),
					userEmail: "联合国儿童基金会",
					token: "vip_" + Math.random().toString(36).slice(2),
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
