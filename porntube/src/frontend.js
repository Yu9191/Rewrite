// 前端注入
import { decompress } from "fzstd";
import { BOXJS_KEYS, HIDE_LINE_SWITCHER, PAGE_PLAYERS, PLAYER_MAP } from "./config/index.mjs";
import { composeLaunchUrl, isValidCustomScheme } from "./utils/player.mjs";

const pagePlayers = names => names.filter(n => PLAYER_MAP[n]).map(n => ({ name: n, ...PLAYER_MAP[n] }));
const pageCfg = { main: pagePlayers(PAGE_PLAYERS.main), more: pagePlayers(PAGE_PLAYERS.more), hideLines: HIDE_LINE_SWITCHER };

function argumentValue(key) {
	try {
		if (typeof $argument === "undefined" || !$argument) return "";
		if (typeof $argument === "object") return String($argument[key] || "");
		for (const part of String($argument).split("&")) {
			const i = part.indexOf("=");
			if (i > 0 && part.slice(0, i) === key) return decodeURIComponent(part.slice(i + 1));
		}
	} catch (e) {}
	return "";
}

function readCustomScheme() {
	try {
		if (typeof $persistentStore !== "undefined") {
			const v = $persistentStore.read(BOXJS_KEYS.scheme) || "";
			if (isValidCustomScheme(v)) return v;
		}
		if (typeof $prefs !== "undefined") {
			const v = $prefs.valueForKey(BOXJS_KEYS.scheme) || "";
			if (isValidCustomScheme(v)) return v;
		}
	} catch (e) {}
	const fromArgument = argumentValue("scheme");
	return isValidCustomScheme(fromArgument) ? fromArgument : "";
}

// 网页保存的 scheme：页面请求 /porntube-scheme?v=…，这里写进代理工具的存储
function schemeSaveValue() {
	const url = typeof $request !== "undefined" && $request && $request.url ? String($request.url) : "";
	if (!/\/porntube-scheme\?/.test(url)) return null;
	const m = url.match(/[?&]v=([^&]*)/);
	try {
		return m ? decodeURIComponent(m[1]) : "";
	} catch (e) {
		return "";
	}
}

function writeScheme(value) {
	try {
		if (typeof $persistentStore !== "undefined") return !!$persistentStore.write(value, BOXJS_KEYS.scheme);
		if (typeof $prefs !== "undefined") return !!$prefs.setValueForKey(value, BOXJS_KEYS.scheme);
	} catch (e) {}
	return false;
}

function saveScheme(raw) {
	const value = String(raw || "").trim();
	const ok = (!value || isValidCustomScheme(value)) && writeScheme(value);
	return {
		status: 200,
		headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
		body: JSON.stringify({ ok }),
	};
}

(async function () {
	try {
		const saving = schemeSaveValue();
		if (saving !== null) return $done(saveScheme(saving));
		const resp = $response || {};
		const body = await decodeBody(resp || {});
		if (!body || typeof body !== "string" || !/<\/head>/i.test(body)) return $done(body ? { body } : {});
		const custom = readCustomScheme();
		pageCfg.custom = isValidCustomScheme(custom) ? custom : "";
		const inject = '<script id="porntube-patch">(' + bootstrap.toString() + ')(' + JSON.stringify(pageCfg) + ',' + composeLaunchUrl.toString() + ',' + isValidCustomScheme.toString() + ');</script>';
		$done({ status: Number(resp.status) || 200, body: body.replace(/<\/head>/i, inject + "</head>"), headers: cleanHeaders(resp.headers || {}) });
	} catch (e) {
		notifyError(e);
		$done({});
	}
})();

function notifyError(e) {
	const title = "Porntube 前端脚本异常";
	const sub = "请进群反馈并附带当前日志截图";
	const body = `错误: ${e && e.message || e || "未知错误"}`;
	const url = "https://t.me/GithubYu9191";
	try {
		if (typeof $notify !== "undefined") $notify(title, sub, body, { "open-url": url });
		else if (typeof $notification !== "undefined") $notification.post(title, sub, body, { action: "open-url", url });
	} catch {}
}

function isZstd(bytes) {
	return bytes && bytes.length > 4 && bytes[0] === 0x28 && bytes[1] === 0xb5 && bytes[2] === 0x2f && bytes[3] === 0xfd;
}

function toUint8Array(v) {
	if (v == null) return null;
	if (v instanceof Uint8Array) return v;
	if (typeof ArrayBuffer !== "undefined" && v instanceof ArrayBuffer) return new Uint8Array(v);
	if (Array.isArray(v)) return new Uint8Array(v);
	if (typeof v === "string") {
		const b64 = base64ToUint8Array(v);
		if (b64 && isZstd(b64)) return b64;
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

function base64ToUint8Array(s) {
	const text = String(s || "").trim();
	if (!/^KLUv[+/]/.test(text)) return null;
	try {
		if (typeof atob === "function") {
			const bin = atob(text);
			const u = new Uint8Array(bin.length);
			for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i) & 0xff;
			return u;
		}
		if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(text, "base64"));
	} catch {}
	return null;
}

function utf8(bytes) {
	try { return new TextDecoder("utf-8").decode(bytes); } catch { return ""; }
}

async function decodeBody(resp) {
	const body = resp.body;
	const isText = typeof body === "string" && /<!doctype html|<html|<\/head>|<body/i.test(body);
	if (isText) return body;
	const bytes = toUint8Array(resp.bodyBytes) || toUint8Array(body);
	if (!bytes || !bytes.length) return typeof body === "string" ? body : "";
	const text = utf8(bytes);
	if (/<!doctype html|<html|<\/head>|<body/i.test(text)) return text;
	if (!isZstd(bytes)) return typeof body === "string" ? body : text;
	try {
		const out = decompress(bytes);
		return utf8(out);
	} catch (e) {
		console.log(`[porntube-frontend] zstd 解压失败: ${e && e.message || e}`);
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
	// no-cache：正常打开每次都重新请求（保证注入）；返回键用缓存，不重新请求
	next["Cache-Control"] = "no-cache";
	return next;
}

// 嵌入页面运行
function bootstrap(cfg, compose, isValid) {
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

	function encode(C, obj) {
		return C.AES.encrypt(JSON.stringify(JSON.stringify(obj)), SECRET).toString();
	}

	function decode(C, str) {
		try {
			const a = C.AES.decrypt(str, SECRET).toString(C.enc.Utf8);
			return JSON.parse(JSON.parse(a));
		} catch { return null; }
	}

	// 预计算的加密用户数据（CryptoJS AES passphrase 模式）
	// 解密结果: {userId:"",userEmail:"联合国儿童基金会",token:"",activeUntil:4102444800000}
	var PRESET_USER = "U2FsdGVkX1/j5oTROFjDw3lsX94EyJmKmGIKBA0mNgyN2Xzvx4Xpp5My0paxHOP9XETF/rBc8WfyyLwm6YLkaQ+8/toNPo+PZ/9qcyz74kXebiP+VyIui0GkQBjICYNuF9Z+yqLgY6LD40sqpUmLn4lQJ7V2crpNmuFw0H9luAQ=";

	// 同步阶段: 必须在 Angular 启动前完成
	try {
		localStorage.removeItem(HISTORY_KEY);
		localStorage.setItem(USER_KEY, PRESET_USER);
		var origSet = Storage.prototype.setItem;
		Storage.prototype.setItem = function (k, v) {
			if (k === HISTORY_KEY) return;
			if (k === USER_KEY) return;
			return origSet.call(this, k, v);
		};
	} catch (e) {
		console.warn("[porntube-patch] sync", e && e.message);
	}

	// CSS 兜底: 隐藏 VIP 弹窗
	try {
		var style = document.createElement("style");
		style.textContent = ".video-overlay-poster,.coment-bottom{display:none!important}";
		document.head.appendChild(style);
	} catch {}

	// 促销弹窗会反复出现，所以持续监听并删除
	try {
		new MutationObserver(removePromo).observe(document, { childList: true, subtree: true });
		removePromo();
	} catch (e) {
		console.warn("[porntube-patch] promo", e && e.message);
	}

	// 播放器行: 插在 .server-selection 前面
	try {
		mountPlayers(cfg, compose, isValid);
	} catch (e) {
		console.warn("[porntube-patch] players", e && e.message);
	}

	// 异步阶段: 用动态加密刷新用户数据（更健壮）
	(async function () {
		try {
			var C = await loadCrypto();
			origSet.call(localStorage, USER_KEY, encode(C, {
				userId: "",
				userEmail: "联合国儿童基金会",
				token: "",
				activeUntil: FUTURE,
			}));
		} catch (e) {
			console.warn("[porntube-patch] async", e && e.message);
		}
	})();

	function removePromo() {
		document.querySelectorAll(".promo-modal").forEach(m => (m.closest(".modal-backdrop-overlay") || m).remove());
	}

	function mountPlayers(cfg, compose, isValid) {
		const style = document.createElement("style");
		style.textContent = [
			".pt-players{margin:12px 0;font-size:14px;color:#333}",
			".pt-title{font-weight:600;margin-bottom:8px}",
			".pt-list,.pt-more{display:flex;flex-wrap:wrap;gap:8px}",
			".pt-more{display:none;margin-top:8px}",
			".pt-more.open{display:flex}",
			".pt-btn{border:1px solid #d9d9d9;background:#fff;color:#333;border-radius:999px;padding:7px 14px;font-size:14px;line-height:1.2;cursor:pointer}",
			".pt-btn.pt-web{background:#e53935;border-color:#e53935;color:#fff}",
			".pt-hint{margin-top:8px;font-size:12px;color:#999}",
				".pt-custom{display:flex;gap:8px;margin-top:10px}",
				".pt-custom input{flex:1;min-width:0;border:1px solid #d9d9d9;border-radius:999px;padding:7px 14px;font-size:14px;color:#333;outline:none}",
			cfg.hideLines ? ".server-selection{display:none!important}" : "",
		].join("");
		document.head.appendChild(style);

		function currentScheme() {
			return cfg.custom || "";
		}

		function openCustom() {
			const scheme = currentScheme();
			if (!scheme) {
				alert("先在下面的输入框填写自定义 Scheme，然后点保存");
				return;
			}
			openPlayer({ name: "自定义", scheme, needEncode: true, supportName: false });
		}

		function buildCustomRow() {
			const box = document.createElement("div");
			box.className = "pt-custom";
			const input = document.createElement("input");
			input.type = "text";
			input.placeholder = "自定义播放器 Scheme，例如 myplayer://play?url=";
			input.value = currentScheme();
			const save = button("保存", "", async () => {
				const value = input.value.trim();
				if (value && !isValid(value)) {
					alert("Scheme 格式不对，例如 myplayer://play?url=");
					return;
				}
				let ok = false;
				try {
					const res = await fetch("/porntube-scheme?v=" + encodeURIComponent(value), { cache: "no-store" });
					ok = (await res.json()).ok === true;
				} catch {}
				if (!ok) {
					alert("保存失败：请确认代理模块已启用，并且已更新到最新版");
					return;
				}
				cfg.custom = value;
				save.textContent = "已保存";
				setTimeout(() => (save.textContent = "保存"), 1500);
			});
			box.append(input, save);
			return box;
		}

		function button(text, cls, onClick) {
			const b = document.createElement("button");
			b.type = "button";
			b.className = cls ? "pt-btn " + cls : "pt-btn";
			b.textContent = text;
			b.addEventListener("click", onClick);
			return b;
		}

		function readVideo() {
			let data = null;
			try {
				data = JSON.parse(document.getElementById("json-ld-video-detail").textContent);
			} catch {}
			const list = Array.isArray(data) ? data : (data && data["@graph"]) || [data];
			const video = list.find(item => item && item["@type"] === "VideoObject") || {};
			return { url: video.contentUrl || "", name: video.name || "" };
		}

		function openPlayer(player) {
			const video = readVideo();
			if (!video.url) {
				alert("视频地址还没加载好，请稍后再点");
				return;
			}
			location.href = compose(player, video.url, video.name, "");
		}

		function playInPage() {
			const video = document.querySelector("video.vjs-tech");
			if (!video) return;
			(document.querySelector(".video-wrapper-modern") || video).scrollIntoView({ behavior: "smooth", block: "center" });
			const played = video.play();
			if (played && played.catch) played.catch(() => {});
		}

		function buildRow() {
			const row = document.createElement("div");
			row.className = "pt-players";
			row.setAttribute("data-pt-players", "");
			const title = document.createElement("div");
			title.className = "pt-title";
			title.textContent = "播放器";
			const list = document.createElement("div");
			list.className = "pt-list";
			const more = document.createElement("div");
			more.className = "pt-more";
			list.appendChild(button("网页播放", "pt-web", playInPage));
			for (const p of cfg.main) list.appendChild(button(p.name, "", () => openPlayer(p)));
			list.appendChild(button("自定义", "", openCustom));
			for (const p of cfg.more) more.appendChild(button(p.name, "", () => openPlayer(p)));
			if (cfg.more.length) {
				const toggle = button("更多", "", () => {
					toggle.textContent = more.classList.toggle("open") ? "收起" : "更多";
				});
				list.appendChild(toggle);
			}
			const hint = document.createElement("div");
			hint.className = "pt-hint";
			hint.textContent = "没装对应的 App 时点了没反应。";
			row.append(title, list, more, buildCustomRow(), hint);
			return row;
		}

		function syncRow() {
			const line = document.querySelector(".server-selection");
			const old = document.querySelector("[data-pt-players]");
			if (!line) {
				if (old) old.remove();
				return;
			}
			if (old && old.nextElementSibling === line) return;
			if (old) old.remove();
			line.parentNode.insertBefore(buildRow(), line);
		}

		new MutationObserver(syncRow).observe(document, { childList: true, subtree: true });
		syncRow();
	}
}
