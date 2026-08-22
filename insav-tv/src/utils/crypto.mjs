import CryptoJS from "crypto-js";
import { CRYPTO } from "../config/index.mjs";

const KEY_WORDS = CryptoJS.enc.Utf8.parse(CRYPTO.key);

function buildIv(suffix) {
	return CryptoJS.enc.Utf8.parse(CRYPTO.iv + suffix);
}

/**
 * AES-128-CBC 解密 base64 密文
 * @param {string} ciphertext base64 字符串
 * @param {string} [suffix]   IV 后缀
 * @returns {string} UTF-8 明文
 */
export function decryptAES(ciphertext, suffix = CRYPTO.suffix) {
	const decrypted = CryptoJS.AES.decrypt(ciphertext, KEY_WORDS, {
		iv: buildIv(suffix),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * AES-128-CBC 加密 UTF-8 明文
 * @param {string} plaintext  明文
 * @param {string} [suffix]   IV 后缀
 * @returns {string} base64 密文
 */
export function encryptAES(plaintext, suffix = CRYPTO.suffix) {
	const encrypted = CryptoJS.AES.encrypt(plaintext, KEY_WORDS, {
		iv: buildIv(suffix),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	});
	return encrypted.toString();
}

/**
 * 业务签名：sorted(k=v).join("&") + "&" + signKey → md5
 * @param {Record<string, unknown>} obj 待签名对象
 * @returns {string} md5 hex（小写）
 */
export function buildSign(obj) {
	const keys = Object.keys(obj).sort();
	let signStr = "";
	for (const key of keys) signStr += `${key}=${obj[key]}&`;
	signStr += CRYPTO.signKey;
	return CryptoJS.MD5(signStr).toString();
}

/** 安全 JSON.parse，失败返回 null */
export function safeJson(text) {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}
