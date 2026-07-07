import { buildM3u8Sign } from "./crypto.mjs";

function nonce() {
	const hex = "0123456789abcdef";
	const d = [];
	for (let i = 0; i < 36; i++) d[i] = hex.substr(Math.floor(Math.random() * 16), 1);
	d[14] = "4";
	d[19] = hex.substr((parseInt(d[19], 16) & 3) | 8, 1);
	d[8] = d[13] = d[18] = d[23] = "-";
	return d.join("");
}

export function buildSignedM3u8Url({ host, token, videoUrl }) {
	const apiPath = `/api/app/media/h5/m3u8/${videoUrl}`;
	const timestamp = Math.floor(Date.now() / 1000);
	const n = nonce();
	const sign = buildM3u8Sign({ token, apiPath, timestamp, nonce: n });
	return `${host}${apiPath}?token=${token}&timestamp=${timestamp}&sign=${sign}&nonce=${n}`;
}
