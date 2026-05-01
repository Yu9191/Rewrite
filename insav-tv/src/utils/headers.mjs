/**
 * 移除 Accept-Encoding 中的 zstd（许多代理无法解压）
 * @param {Record<string, string>} headers
 * @returns {Record<string, string>} 新对象
 */
export function stripZstd(headers) {
	const next = { ...headers };
	const aeKey = Object.keys(next).find(k => k.toLowerCase() === "accept-encoding");
	if (aeKey && next[aeKey]) {
		next[aeKey] = next[aeKey]
			.split(",")
			.map(s => s.trim())
			.filter(s => s.toLowerCase() !== "zstd")
			.join(", ");
	}
	return next;
}

/**
 * 删除 URL 中的 ip 查询参数
 * @param {string} url
 * @returns {string}
 */
export function removeIpParam(url) {
	if (!url || typeof url !== "string") return url;
	try {
		return url
			.replace(/([?&])ip=[^&]*&?/g, (_m, sep) => (sep === "?" ? "?" : "&"))
			.replace(/[?&]$/, "");
	} catch {
		return url;
	}
}
