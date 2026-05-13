// 部分代理客户端不支持 zstd，剔除掉避免上游解码失败
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

export function getHeader(headers, name) {
	const key = Object.keys(headers || {}).find(k => k.toLowerCase() === name.toLowerCase());
	return key ? headers[key] : "";
}
