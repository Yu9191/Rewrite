/* 
芒果TV 2024.7.29
适配了Mac版本iPad版本 
脚本仅供学习和个人使用，不得用于商业目的或其他非法用途
可以直接使用Walala的净化广告以及包含会员数据的脚本
https://raw.githubusercontent.com/RuCu6/QuanX/main/Rewrites/Cube/cnftp.snippet
感谢@RuCu6
[rewrite_local]
^http[s]?:\/\/mobile\.api\.mgtv\.com\/v[0-9]\/(playlist|video\/album|video\/relative|video\/list).*$ url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/mgtv1.js
https://mobile-stream.api.mgtv.com/v1/video/source? url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/MGTV.js
https://nuc.api.mgtv.com/GetUserInfo url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/mgtv.js
#https://mobile-stream.api.mgtv.com/v1/video/source url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/mgtv.js
#港区
^https://mobile.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/MGTV.js
#播放页开通提示移除
http://vip.bz.mgtv.com/client/dynamic_entry url reject
https://pcc.api.mgtv.com/video/getSource url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/MGTV.js
https://pad.api.mgtv.com/v8/video/getSource url script-request-header https://raw.githubusercontent.com/Yu9191/Rewrite/main/MGTV.js
[mitm] 
hostname = *.mgtv.com, pad.api.mgtv.com, pcc.api.mgtv.com

*/

var iｉl='jsjiami.com.v7';var i1ll=iii1II;if(function(i1l1l1,IlI1I,II11Ii,II11Il,IlI11,iIIIIl,II1Il){return i1l1l1=i1l1l1>>0x9,iIIIIl='hs',II1Il='hs',function(lilIlI,iIIIIi,iii1I1,II1Ii,i1ii){var IliI11=iii1II;II1Ii='tfi',iIIIIl=II1Ii+iIIIIl,i1ii='up',II1Il+=i1ii,iIIIIl=iii1I1(iIIIIl),II1Il=iii1I1(II1Il),iii1I1=0x0;var I1iIl1=lilIlI();while(!![]&&--II11Il+iIIIIi){try{II1Ii=-parseInt(IliI11(0x174))/0x1+parseInt(IliI11(0x16a))/0x2*(parseInt(IliI11(0x16b))/0x3)+parseInt(IliI11(0x178))/0x4+-parseInt(IliI11(0x170))/0x5*(-parseInt(IliI11(0x172))/0x6)+parseInt(IliI11(0x179))/0x7+-parseInt(IliI11(0x173))/0x8+parseInt(IliI11(0x176))/0x9*(parseInt(IliI11(0x175))/0xa);}catch(i1il){II1Ii=iii1I1;}finally{i1ii=I1iIl1[iIIIIl]();if(i1l1l1<=II11Il)iii1I1?IlI11?II1Ii=i1ii:IlI11=i1ii:iii1I1=i1ii;else{if(iii1I1==IlI11['replace'](/[EQgypkJwHWqrDePYxKnI=]/g,'')){if(II1Ii===iIIIIi){I1iIl1['un'+iIIIIl](i1ii);break;}I1iIl1[II1Il](i1ii);}}}}}(II11Ii,IlI1I,function(lI1Il1,lilIi1,IiilII,IliI1I,lI1Iii,i1li,li1II){return lilIi1='\x73\x70\x6c\x69\x74',lI1Il1=arguments[0x0],lI1Il1=lI1Il1[lilIi1](''),IiilII='\x72\x65\x76\x65\x72\x73\x65',lI1Il1=lI1Il1[IiilII]('\x76'),IliI1I='\x6a\x6f\x69\x6e',(0x17b7de,lI1Il1[IliI1I](''));});}(0x18600,0x6d884,Iii11l,0xc5),Iii11l){}var url=$request[i1ll(0x16e)],updatedUrl=url;if(url[i1ll(0x171)](i1ll(0x16f)))updatedUrl=url[i1ll(0x16c)](/([?&]ticket=)\w{32}/,i1ll(0x177));else url[i1ll(0x171)](i1ll(0x16d))&&(updatedUrl=url[i1ll(0x16c)](/([?&]ticket=)\w{32}/,i1ll(0x177)));function iii1II(_0x2668e4,_0x172fa5){var _0x9237ac=Iii11l();return iii1II=function(_0x372636,_0x183bd8){_0x372636=_0x372636-0x16a;var _0x1f09bc=_0x9237ac[_0x372636];if(iii1II['dftPzl']===undefined){var _0x4ce1ec=function(_0x24f311){var _0x14d457='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x563f5f='',_0x353068='';for(var _0x432b68=0x0,_0x41ba83,_0x6dcff5,_0x176ef5=0x0;_0x6dcff5=_0x24f311['charAt'](_0x176ef5++);~_0x6dcff5&&(_0x41ba83=_0x432b68%0x4?_0x41ba83*0x40+_0x6dcff5:_0x6dcff5,_0x432b68++%0x4)?_0x563f5f+=String['fromCharCode'](0xff&_0x41ba83>>(-0x2*_0x432b68&0x6)):0x0){_0x6dcff5=_0x14d457['indexOf'](_0x6dcff5);}for(var _0x49e867=0x0,_0x40c121=_0x563f5f['length'];_0x49e867<_0x40c121;_0x49e867++){_0x353068+='%'+('00'+_0x563f5f['charCodeAt'](_0x49e867)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x353068);};iii1II['zrsQQa']=_0x4ce1ec,_0x2668e4=arguments,iii1II['dftPzl']=!![];}var _0x5ea84c=_0x9237ac[0x0],_0x533b4a=_0x372636+_0x5ea84c,_0x338dc8=_0x2668e4[_0x533b4a];return!_0x338dc8?(_0x1f09bc=iii1II['zrsQQa'](_0x1f09bc),_0x2668e4[_0x533b4a]=_0x1f09bc):_0x1f09bc=_0x338dc8,_0x1f09bc;},iii1II(_0x2668e4,_0x172fa5);}$done({'url':updatedUrl});function Iii11l(){var i1l1lI=(function(){return[iｉl,'wkjrDKswJIjnHniaWmeiQ.qIcEoIpmx.Pvxy7xYg==','Aw5JBhvKzxm','mtj6ENH1sM8','nJe0nJq0me9UtvHdCG','nta1ndCWq0fSCeHP','mtbsww5pteu'].concat((function(){return['mty4nda2mMDPvMzYAa','jde0rJaZndjdnZq0odKZqKm1qKuYruu3qKvgrKiWrefgra','nde0mdCYALPkzLHU','mJm3nJuYmw5HDfjZza','nKXltLDQEa','nZi1nJu4vhjvzxrp','CMvWBgfJzq'].concat((function(){return['DMLKzw8VC291CMnL','DxjS','DMLKzw8Vz2v0u291CMnL','ote2ntu1Dg5Wq3zs'];}()));}()));}());Iii11l=function(){return i1l1lI;};return Iii11l();};var version_ = 'jsjiami.com.v7';

