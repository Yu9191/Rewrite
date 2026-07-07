const VIP_EXPIRE_INT = Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60;
const VIP_EXPIRE_TEXT = "2036-05-06";

function patchVipCard(card, vipType = 1) {
	if (!card || typeof card !== "object") return false;
	card.vipType = vipType;
	card.vipExpireInt = VIP_EXPIRE_INT;
	card.vipExpireAt = VIP_EXPIRE_TEXT;
	card.expiredAt = VIP_EXPIRE_TEXT;
	card.isVip = true;
	return true;
}

function patchUser(user) {
	if (!user || typeof user !== "object") return false;
	let changed = false;
	user.showCardName = "SVIP";
	user.showCardExpiredAt = VIP_EXPIRE_TEXT;
	user.vipGrade = Math.max(Number(user.vipGrade || 0), 4);
	user.isVip = true;
	user.isVipMember = true;
	user.isSVipMember = true;
	user.vipExpireInt = VIP_EXPIRE_INT;
	user.vipExpireTime = VIP_EXPIRE_TEXT;
	changed = true;
	changed = patchVipCard(user.normalVip || (user.normalVip = {}), 1) || changed;
	changed = patchVipCard(user.supremeVip || (user.supremeVip = {}), 1) || changed;
	changed = patchVipCard(user.darkVip || (user.darkVip = {}), 1) || changed;
	changed = patchVipCard(user.liveVip || (user.liveVip = {}), 1) || changed;
	return changed;
}

export function modifyUserInfo(payload) {
	let changed = false;
	changed = patchUser(payload) || changed;
	if (payload?.data && typeof payload.data === "object") changed = patchUser(payload.data) || changed;
	if (payload?.userInfo && typeof payload.userInfo === "object") changed = patchUser(payload.userInfo) || changed;
	if (payload?.user && typeof payload.user === "object") changed = patchUser(payload.user) || changed;
	return changed;
}
