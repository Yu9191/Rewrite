/*
 *
 *
脚本功能：地铁跑酷 (微信小程序) 功能修改
- 修改货币：金币、钥匙、奔跑币、金钥匙2023、喷漆罐、PVP点数、新宝藏钥匙
- 修改分数：最高分数改为99999999999 （好像没用）
- 修改道具：喷气背包、运动鞋、磁铁、倍数器等级全部99级
- 解锁角色：Jake、Tricky、红心皇后、萨麦尔、年年等14+角色及皮肤
- 解锁滑板：灵鹿之心、好运锦鲤、反射狐、神龙等11+特殊滑板
- 解锁背饰：权力之心、永夜圣剑、堕落之翼等6+背饰
- 超级启动能量：999
软件版本：
脚本作者：原伟人
更新时间：2026-03-14
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
^https?:\/\/dtpkwx-prod-web\.gxpan\.cn\/api\/user\/user_other_save_read url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/dtpk.js

[mitm]
hostname = dtpkwx-prod-web.gxpan.cn
*
*
*/





var body = $response.body;
let obj = JSON.parse(body);

if (obj.data && obj.data.save_data) {
    let saveData = JSON.parse(obj.data.save_data);
    
    // 修改货币相关
    if (saveData.gold) {
        saveData.gold.coins = 999999999;   //金币
        saveData.gold.keys = 999999999;    //钥匙
        saveData.gold.runCoins = 999999999;//奔跑币
        saveData.gold.goldKey2023s = 999999999; //2023金钥匙
        saveData.gold.sprayCans = 999999999;    //喷漆罐
        saveData.gold.pvpPoint = 999999999;     //PVP点数
    }
    
    // 修改最高分数
    if (saveData.hscore !== undefined) {
        saveData.hscore = 99999999999;  //最高分数（11个9）
    }
    
    // 修改道具升级等级
    if (saveData.upgrade) {
        saveData.upgrade.jetpack = 99;     //喷气背包等级
        saveData.upgrade.sneakers = 99;    //运动鞋等级  
        saveData.upgrade.magnet = 99;      //磁铁等级
        saveData.upgrade.multiplier = 99;  //倍数器等级
    }
    
    // 修改超级启动能量
    if (saveData.SuperStart) {
        saveData.SuperStart._sstart_energy = 999; //超级启动能量
    }
    
    // 修改新宝藏钥匙
    if (saveData.NewTreasure) {
        saveData.NewTreasure.NewTreasureKey = 999999; //新宝藏钥匙
    }
    
    // 解锁所有角色（保留原有数据，添加新角色）
    if (saveData.role) {
        // 基础角色 - 保留原有数据并添加新的
        if (!saveData.role.slick) saveData.role.slick = [];
        saveData.role.slick = [...new Set([...saveData.role.slick, 1,2,3,4,5])];        // Jake角色的皮肤
        
        if (!saveData.role.bruar) saveData.role.bruar = [];
        saveData.role.bruar = [...new Set([...saveData.role.bruar, 1,2,3,4,5])];        // Tricky角色的皮肤
        
        if (!saveData.role.heartsqueen) saveData.role.heartsqueen = [];
        saveData.role.heartsqueen = [...new Set([...saveData.role.heartsqueen, 1,2,3,4,5])];  // 红心皇后
        
        // 解锁所有发现的角色 - 保留原有数据
        if (!saveData.role.samael) saveData.role.samael = [];
        saveData.role.samael = [...new Set([...saveData.role.samael, 1,2,3,4,5])];                    // 萨麦尔
        
        if (!saveData.role.niannian) saveData.role.niannian = [];
        saveData.role.niannian = [...new Set([...saveData.role.niannian, 1,2,3,4,5])];                // 年年
        
        if (!saveData.role.theendearingtricky) saveData.role.theendearingtricky = [];
        saveData.role.theendearingtricky = [...new Set([...saveData.role.theendearingtricky, 1,2,3,4,5])]; // 冬巡淘淘
        
        if (!saveData.role.sweetdumpling) saveData.role.sweetdumpling = [];
        saveData.role.sweetdumpling = [...new Set([...saveData.role.sweetdumpling, 1,2,3,4,5])];      // 汤圆圆
        
        if (!saveData.role.ginger) saveData.role.ginger = [];
        saveData.role.ginger = [...new Set([...saveData.role.ginger, 1,2,3,4,5])];                    // 姜桔
        
        if (!saveData.role.lemonGirl) saveData.role.lemonGirl = [];
        saveData.role.lemonGirl = [...new Set([...saveData.role.lemonGirl, 1,2,3,4,5])];              // 柠檬妹妹
        
        if (!saveData.role.changanCharacter01) saveData.role.changanCharacter01 = [];
        saveData.role.changanCharacter01 = [...new Set([...saveData.role.changanCharacter01, 1,2,3,4,5])]; // 环儿
        
        if (!saveData.role.yuanCharacter01) saveData.role.yuanCharacter01 = [];
        saveData.role.yuanCharacter01 = [...new Set([...saveData.role.yuanCharacter01, 1,2,3,4,5])];  // 班小松
        
        if (!saveData.role.festiveTricky) saveData.role.festiveTricky = [];
        saveData.role.festiveTricky = [...new Set([...saveData.role.festiveTricky, 1,2,3,4,5])];      // 冰雪淘淘
        
        if (!saveData.role.halloweenCharacter01) saveData.role.halloweenCharacter01 = [];
        saveData.role.halloweenCharacter01 = [...new Set([...saveData.role.halloweenCharacter01, 1,2,3,4,5])]; // 艾迪
        
        if (!saveData.role.baliCharacter01) saveData.role.baliCharacter01 = [];
        saveData.role.baliCharacter01 = [...new Set([...saveData.role.baliCharacter01, 1,2,3,4,5])];  // 梅
        
        if (!saveData.role.barcelonaCharacter01) saveData.role.barcelonaCharacter01 = [];
        saveData.role.barcelonaCharacter01 = [...new Set([...saveData.role.barcelonaCharacter01, 1,2,3,4,5])]; // 迪戈
        
        if (!saveData.role.atlantaCharacter01) saveData.role.atlantaCharacter01 = [];
        saveData.role.atlantaCharacter01 = [...new Set([...saveData.role.atlantaCharacter01, 1,2,3,4,5])]; // 艾丽西娅
    }
    
    // 解锁所有滑板（保留原有数据，添加新滑板）
    if (saveData.skids) {
        // 保留原有normal滑板数据并添加新的
        if (!saveData.skids.normal) saveData.skids.normal = [];
        saveData.skids.normal = [...new Set([...saveData.skids.normal, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])];
        
        // 添加特殊滑板（保留原有数据）
        if (!saveData.skids.bucklightdeer) saveData.skids.bucklightdeer = [];
        saveData.skids.bucklightdeer = [...new Set([...saveData.skids.bucklightdeer, 1,2,3,4,5])];     // 灵鹿之心
        
        if (!saveData.skids.koinobori) saveData.skids.koinobori = [];
        saveData.skids.koinobori = [...new Set([...saveData.skids.koinobori, 1,2,3,4,5])];             // 好运锦鲤
        
        if (!saveData.skids.foxtrail) saveData.skids.foxtrail = [];
        saveData.skids.foxtrail = [...new Set([...saveData.skids.foxtrail, 1,2,3,4,5])];               // 反射狐
        
        if (!saveData.skids.carpDiem) saveData.skids.carpDiem = [];
        saveData.skids.carpDiem = [...new Set([...saveData.skids.carpDiem, 1,2,3,4,5])];               // 年年有鱼
        
        if (!saveData.skids.dragonBoat) saveData.skids.dragonBoat = [];
        saveData.skids.dragonBoat = [...new Set([...saveData.skids.dragonBoat, 1,2,3,4,5])];           // 神龙
        
        if (!saveData.skids.snowCloud) saveData.skids.snowCloud = [];
        saveData.skids.snowCloud = [...new Set([...saveData.skids.snowCloud, 1,2,3,4,5])];             // 雪云
        
        if (!saveData.skids.Pipa) saveData.skids.Pipa = [];
        saveData.skids.Pipa = [...new Set([...saveData.skids.Pipa, 1,2,3,4,5])];                       // 琵琶
        
        if (!saveData.skids.halloweenBoard01) saveData.skids.halloweenBoard01 = [];
        saveData.skids.halloweenBoard01 = [...new Set([...saveData.skids.halloweenBoard01, 1,2,3,4,5])]; // 南瓜
        
        if (!saveData.skids.baliBoard01) saveData.skids.baliBoard01 = [];
        saveData.skids.baliBoard01 = [...new Set([...saveData.skids.baliBoard01, 1,2,3,4,5])];         // 海蛇
        
        if (!saveData.skids.barcelonaBoard01) saveData.skids.barcelonaBoard01 = [];
        saveData.skids.barcelonaBoard01 = [...new Set([...saveData.skids.barcelonaBoard01, 1,2,3,4,5])]; // 琉璃
        
        if (!saveData.skids.londonBoard03) saveData.skids.londonBoard03 = [];
        saveData.skids.londonBoard03 = [...new Set([...saveData.skids.londonBoard03, 1,2,3,4,5])];     // 红鼻子
    }
    
    // 设置当前使用的角色和滑板
    if (saveData.CurrentUsing) {
        saveData.CurrentUsing.Character = 379;      // 使用红心女王角色ID
        saveData.CurrentUsing.Hoverboard = 1;       // 使用滑板ID 1
        saveData.CurrentUsing.CharacterTheme = 1;   // 角色主题
        saveData.CurrentUsing.HoverboardTheme = 1;  // 滑板主题
    }
    
    // 更新角色相关数据
    if (saveData.gold) {
        saveData.gold.sbster = 20;  // 角色数量设为20（匹配解锁的角色数量）
    }
    
    // 添加背饰解锁（保留原有数据，添加新背饰）
    if (!saveData.ornament) saveData.ornament = {};
    
    if (!saveData.ornament.powerheart) saveData.ornament.powerheart = [];
    saveData.ornament.powerheart = [...new Set([...saveData.ornament.powerheart, 1,2,3,4,5])];        // 权力之心
    
    if (!saveData.ornament.powersymbol) saveData.ornament.powersymbol = [];
    saveData.ornament.powersymbol = [...new Set([...saveData.ornament.powersymbol, 1,2,3,4,5])];       // 权利棋子
    
    if (!saveData.ornament.fallenangelssword) saveData.ornament.fallenangelssword = [];
    saveData.ornament.fallenangelssword = [...new Set([...saveData.ornament.fallenangelssword, 1,2,3,4,5])]; // 永夜圣剑
    
    if (!saveData.ornament.fallenangelwings) saveData.ornament.fallenangelwings = [];
    saveData.ornament.fallenangelwings = [...new Set([...saveData.ornament.fallenangelwings, 1,2,3,4,5])];  // 堕落之翼
    
    if (!saveData.ornament.flamewindshatter) saveData.ornament.flamewindshatter = [];
    saveData.ornament.flamewindshatter = [...new Set([...saveData.ornament.flamewindshatter, 1,2,3,4,5])];  // 炎云破风
    
    if (!saveData.ornament.artifactspirit) saveData.ornament.artifactspirit = [];
    saveData.ornament.artifactspirit = [...new Set([...saveData.ornament.artifactspirit, 1,2,3,4,5])];    // 器灵

    obj.data.save_data = JSON.stringify(saveData);
}

$done({ body: JSON.stringify(obj) });
