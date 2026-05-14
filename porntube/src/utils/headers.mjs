import { Console } from "@nsnanocat/util";
import { decompress } from "fzstd";

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

function looksApiText(s) {
	return /^\s*(\{|\[|")/.test(s || "");
}

function describeBody(v) {
	if (v == null) return String(v);
	const tag = Object.prototype.toString.call(v);
	const len = typeof v === "string" ? v.length : v.byteLength || v.length || 0;
	const ctor = v && v.constructor && v.constructor.name || "";
	return `${tag} ctor=${ctor} len=${len}`;
}

// 试图把 $response.body 解成 utf8 文本，遇到 zstd 按需加载 fzstd 解压
export async function decodeResponseText($response) {
	const body = $response.body;
	const enc = (getHeader($response.headers, "content-encoding") || "").toLowerCase();
	Console.debug(`响应体: body=${describeBody(body)} bodyBytes=${describeBody($response.bodyBytes)} 压缩=${enc || "无"}`);
	if (typeof body === "string" && body.length && looksApiText(body)) {
		Console.debug("响应体已是明文 JSON");
		return body;
	}

	const bytes = toUint8Array($response.bodyBytes) || toUint8Array(body);
	Console.debug(`二进制检测: ${bytes ? bytes.length : 0} bytes, zstd=${isZstd(bytes) ? "是" : "否"}`);
	if (!bytes || !bytes.length) return typeof body === "string" ? body : null;
	if (!enc.includes("zstd") && !isZstd(bytes)) {
		const text = utf8(bytes);
		if (looksApiText(text)) {
			Console.debug("按 UTF-8 转换后是 JSON");
			return text;
		}
	}

	try {
		const out = decompress(bytes);
		const text = utf8(out);
		Console.debug(`zstd 解压成功: ${out && out.length || 0} bytes`);
		return text;
	} catch (e) {
		Console.error(`zstd 解压失败: ${e?.message || e}`);
		return null;
	}
}
