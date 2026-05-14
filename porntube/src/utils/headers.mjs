import { fetch } from "@nsnanocat/util";

export function getHeader(headers, name) {
	const key = Object.keys(headers || {}).find(k => k.toLowerCase() === name.toLowerCase());
	return key ? headers[key] : "";
}

// zstd 处理
function isZstd(bytes) {
	return bytes && bytes.length > 4 && bytes[0] === 0x28 && bytes[1] === 0xb5 && bytes[2] === 0x2f && bytes[3] === 0xfd;
}

function toUint8Array(v) {
	if (v == null) return null;
	if (v instanceof Uint8Array) return v;
	if (typeof ArrayBuffer !== "undefined" && v instanceof ArrayBuffer) return new Uint8Array(v);
	if (Array.isArray(v)) return new Uint8Array(v);
	// QX/Egern 不解 zstd 时 body 是 latin1 binary string（一 char = 一字节）
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
		if (keys.length && keys.every(k => /^\d+$/.test(k))) {
			return new Uint8Array(keys.sort((a, b) => a - b).map(k => v[k]));
		}
	}
	return null;
}

function utf8(bytes) {
	try {
		return new TextDecoder("utf-8").decode(bytes);
	} catch {
		return "";
	}
}

async function loadFzstd() {
	if (globalThis.fzstd) return globalThis.fzstd;
	try {
		const r = await fetch({ url: "https://cdn.jsdelivr.net/npm/fzstd@0.1.1/umd/index.js" });
		const code = typeof r === "string" ? r : r && typeof r.body === "string" ? r.body : "";
		if (!code) return null;
		Function(code).call(globalThis);
		return globalThis.fzstd || null;
	} catch {
		return null;
	}
}

// 试图把 $response.body 解成 utf8 文本，遇到 zstd 按需加载 fzstd 解压
export async function decodeResponseText($response) {
	const body = $response.body;
	const enc = (getHeader($response.headers, "content-encoding") || "").toLowerCase();
	const suspect = enc.includes("zstd") || (typeof body === "string" && body.charCodeAt(0) === 0x28);
	if (typeof body === "string" && body.length && !suspect) return body;

	const bytes = toUint8Array($response.bodyBytes) || toUint8Array(body);
	if (!bytes || !bytes.length) return typeof body === "string" ? body : null;
	if (!enc.includes("zstd") && !isZstd(bytes)) return utf8(bytes);

	const z = await loadFzstd();
	if (!z) return null;
	try {
		const out = (z.decompress || z.decompressSync).call(z, bytes);
		return utf8(out);
	} catch {
		return null;
	}
}
