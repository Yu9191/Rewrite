// CryptoJS AES passphrase 模式封装
// 与前端 main.*.js 的 worker.encrypt/decrypt("xxx") 二进制兼容
import CryptoJS from "crypto-js";
import { CRYPTO } from "../config/index.mjs";

export function safeJson(text) {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}

export function decryptResponse(ciphertext) {
	try {
		return CryptoJS.AES.decrypt(String(ciphertext || ""), CRYPTO.secret).toString(CryptoJS.enc.Utf8);
	} catch {
		return "";
	}
}

export function encryptResponse(plaintext) {
	try {
		return CryptoJS.AES.encrypt(String(plaintext || ""), CRYPTO.secret).toString();
	} catch {
		return "";
	}
}
