var obj = JSON.parse(body);
obj.data.isVip = 1;
obj.data.vipExpiretime = 324938345490000;
obj.data.vipinfo.isvip = 1;
obj.data.vipinfo.vip_end_time = "2088-08-08 00:00:00";
obj.data.vipinfo.type = "2";
obj.data.vipinfo.growth.level = 9;
$done({body: JSON.stringify(obj)});
