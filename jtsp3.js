/*
 * 加藤视频最新版


[rewrite_local]
#广告（域名变化快 失效需改域名）
^https:\/\/x364nz6\.rygzq0s\.fit:34218\/(gm\/game\/(tabList|listByTab|nameList)|iqiyi\/media\/ad\/listByIdList)$ url reject
#通用匹配（域名变化快）
#^https:\/\/(?:n86zdpk\.dfptenj\.com|w2vbr6k\.jxknkj\.com|fatchicken\.365ysd\.com|d31mxcsa1tdyx2\.cloudfront\.net)\/.+\/asy\/.+\/try\.m3u8$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/jtsp3.js
^https:\/\/.+\/asy\/.*\/?try\.m3u8$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/jtsp3.js

[mitm]
hostname = vbdbzlw.52wtyy.com, n86zdpk.dfptenj.com, w2vbr6k.jxknkj.com, fatchicken.365ysd.com, d31mxcsa1tdyx2.cloudfront.net, x364nz6.rygzq0s.fit:34218, 5c8gqqf.to1ogvz.xyz, 9sdec0e.mls08ph.xyz, zur9pl8.kmh8btd.xyz, 0rw804u.ij96622.xyz, 0ncf2i3.wl8td88.xyz, 4dhuyek.dusgrec.xyz, 2h4q7lu.hjsn53p.xyz:41014, 7x16kek.nwjnf0m.xyz, 2h4q7lu.hjsn53p.xyz, e6xun6l.wy6z0uq.xyz, ldyc3rs.0mlptkl.xyz, 58z8gxu.pzmn7ku.xyz, 117.62.22.92:56753, 5jsd6q7.jnfkdtm.xyz, yw4pk9h.7fw2snb.xyz, m3pkeg2.v4l0p7y.xyz, ip6vu33.im0684h.xyz, bor4lch.8l6ldmz.xyz, zqlhcn.kl9117.xyz, hkg2zx.stejnu.xyz, zvqldx.xv8gvn.xyz, kuhikr.1t3vwf.xyz, s4788x.taqndh.xyz, xkewutdekf873sr.chairsr.com, 103.85.254.233, omfnmh.x2b3w6.xyz, sgwitxgwit231sr.xunwxc.com, ssgwew231s.uzqew4qi.info, ykofye.qklmoq.xyz, pmmqls.gregdoro.com, lieeys42jdi2kd.cx4c5mv7.info, fjboni.jn6588.xyz, rylzit.wqws5z.xyz, riwnkx.sw05uv.xyz, bsxqtd.xk8q7w.xyz, grvgdq.81fbg2.xyz, rdxijq.vo9ugl.xyz, bpitbu.ouxf9g.live, tjactb.xk2nsy.live, us6tp7.dkr9cv.live, qsukip.9jts57.live, wkqyx6.qdokqj.live, fqohbx.bkljtx.live, zihjyv.jajrc1.live, y7uyqg.hl8dbl.live, qrdure.youngnoble.cn, kpoe2e.x8w7t3.live, *jttv*, fceyeg.johjxe.com, *.vo9ugl.xyz, vcryyw.uc86fy.xyz, xospby.mldo9k.xyz, roa6fi.lyr6if.live, gp1wpm.xcg3zr.xyz, nfmq0v.lknlqz.xyz, nhppjkb.z5x6pzr.xyz, fwroeor.revxcvx.xyz, uetuys234ls.pbog5txn.app, hrp27mr.1ugq1uf.xyz, zd7uwox.8ewxvhz.xyz, 5tlsw6r.7n26ytu.xyz, nt7474f.u8kgc14.xyz, 85tug87.nkwyzcp.xyz, n05ggob.batlnhh.xyz, eg8oppq.19fc5lg.xyz, dbntlpy.bvv9i7d.xyz, vfwc55n.z3i8p1g.xyz, y51tr6g.k81j0f9.xyz, fvwoq76.f1yhuff.xyz, z6z8rwf.7qb4k3o.xyz, qkgsxu2.n4lv5yi.xyz, m2k3cih.9btv73k.xyz, rzf2fvk.xqqenwf.xyz, njyt5qw.6ri5io3.xyz, a2crrpy.4zi1axo.xyz, to0tk85.t3rw0no.my, dofb1fe.ebv82yr.xyz

*/
const isReq   = typeof $request !== 'undefined';
const isQX    = typeof $task !== 'undefined';
const isSurge = typeof $httpClient !== 'undefined';

function notify(title, sub, msg){ (isQX ? $notify : $notification.post)(title, sub||'', msg||''); }
function done(v){ if (typeof $done==='function') $done(v); }

if (isReq && $request.url) {
  const url = $request.url;
  const reg = /\/asy\/.*\/?try\.m3u8$/;
  if (reg.test(url)) {
    const newUrl = url.replace("/try.m3u8", "/trailer.m3u8");
    // notify("匹配成功", `原 URL: ${url}`, `新 URL: ${newUrl}`);
    done({ url: newUrl });
  } else {
    notify("未匹配", "没有URL", url);
    done({});
  }
} else {
  notify("请求错误", "替换失败", "没有URL");
  done({});
}
