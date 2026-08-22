const SPLASH_SHOW = 'show:A.visible,class:"wh-screen overflow-hidden !max-w-screen !bg-#000"';
const SPLASH_HIDE = 'show:!1,class:"wh-screen overflow-hidden !max-w-screen !bg-#000"';
const SPLASH_MOUNTED = 'l=setTimeout(()=>{a.value=!0,c.value?s.value=!1:d||(d=!0,r.start())},1600),Ut().trackAdvertising({adList:i.splashAds,ad_type:"全屏"},{page_key:"start",page_name:"启动页"})';
const SPLASH_SKIP = 'try{n.hide&&n.hide(),n.callback&&n.callback("confirm",{}),window.dispatchEvent(new CustomEvent("startup-popup:skip"))}catch(A){}';

export function modifyStaticJs(body) {
	if (typeof body !== "string" || body.includes("qiyou-skip-splash")) return null;
	if (!body.includes("ModalSplashAD") || !body.includes("/webp/splash-")) return null;
	let next = body.replace(SPLASH_SHOW, `${SPLASH_HIDE}/*qiyou-skip-splash*/`);
	next = next.replace(SPLASH_MOUNTED, SPLASH_SKIP);
	return next === body ? null : next;
}
