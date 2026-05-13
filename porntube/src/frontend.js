// 注入到站点 HTML 的前端 patch
// 伪造 SevenVideoUser 让前端以为已登录，并清空 history 取消每日次数限制
// 走 script-response-body，匹配 porntube.cool 等站点 HTML 响应

(function () {
	const body = $response && $response.body;
	if (!body || typeof body !== "string" || !/<\/head>/i.test(body)) return $done(body ? { body } : {});
	const inject = '<script id="porntube-patch">(' + bootstrap.toString() + ')();</script>';
	$done({ body: body.replace(/<\/head>/i, inject + "</head>") });
})();

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
