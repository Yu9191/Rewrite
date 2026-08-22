import CryptoJS from "crypto-js";
import { CRYPTO } from "../config/index.mjs";

export function safeJson(text) {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}

function base64ToBytes(b64) {
	let str = String(b64 || "").trim().replace(/-/g, "+").replace(/_/g, "/");
	const pad = str.length % 4 ? 4 - str.length % 4 : 0;
	if (pad) str += "=".repeat(pad);
	const bin = atob(str);
	const arr = [];
	for (let i = 0; i < bin.length; i++) arr.push(bin.charCodeAt(i));
	return arr;
}

function bytesToBase64(bytes) {
	let bin = "";
	for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i] & 0xff);
	return btoa(bin);
}

function hexToBytes(hex) {
	const arr = [];
	for (let i = 0; i < hex.length; i += 2) arr.push(parseInt(hex.substr(i, 2), 16));
	return arr;
}

function utf8ToBytes(str) {
	const encoded = encodeURIComponent(str);
	const bytes = [];
	for (let i = 0; i < encoded.length; i++) {
		if (encoded[i] === "%") {
			bytes.push(parseInt(encoded[i + 1] + encoded[i + 2], 16));
			i += 2;
		} else {
			bytes.push(encoded.charCodeAt(i));
		}
	}
	return bytes;
}

function randomBytes(length) {
	const bytes = [];
	for (let i = 0; i < length; i++) bytes.push(Math.floor(Math.random() * 256));
	return bytes;
}

function deriveKeyIv(salt) {
	const seed = [...utf8ToBytes(CRYPTO.responseKey), ...salt];
	const half = parseInt(seed.length / 2);
	const seedWordArray = CryptoJS.enc.Base64.parse(bytesToBase64(seed));
	const mid = hexToBytes(CryptoJS.SHA256(seedWordArray).toString()).splice(8, 16);
	const left = [...mid, ...seed.splice(0, half)];
	const leftHash = hexToBytes(CryptoJS.SHA256(CryptoJS.enc.Base64.parse(bytesToBase64(left))).toString());
	const right = [...seed, ...mid];
	const rightHash = hexToBytes(CryptoJS.SHA256(CryptoJS.enc.Base64.parse(bytesToBase64(right))).toString());
	const keyBytes = [...leftHash.splice(0, 8), ...rightHash.splice(8, 16), ...leftHash.splice(16, 24)];
	const ivBytes = [...rightHash.splice(0, 4), ...leftHash.splice(4, 8), ...rightHash.splice(8, 12)];
	return {
		key: CryptoJS.enc.Base64.parse(bytesToBase64(keyBytes)),
		iv: CryptoJS.enc.Base64.parse(bytesToBase64(ivBytes)),
	};
}

export function decryptResponse(ciphertext) {
	const all = base64ToBytes(ciphertext);
	const salt = all.slice(0, CRYPTO.saltLength);
	const body = all.slice(CRYPTO.saltLength);
	const { key, iv } = deriveKeyIv(salt);
	return CryptoJS.AES.decrypt(bytesToBase64(body), key, { iv, mode: CryptoJS.mode.CBC }).toString(CryptoJS.enc.Utf8);
}

export function encryptResponse(plaintext) {
	const salt = randomBytes(CRYPTO.saltLength);
	const { key, iv } = deriveKeyIv([...salt]);
	const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv, mode: CryptoJS.mode.CBC });
	return bytesToBase64([...salt, ...base64ToBytes(encrypted.toString())]);
}

export function buildM3u8Sign({ token, apiPath, timestamp, nonce }) {
	const raw = `${token || ""}&${apiPath}&&${timestamp}&${nonce}`;
	return CryptoJS.HmacSHA1(raw, CRYPTO.requestKey).toString();
}
