/*
 *
 *
脚本功能：标枪王者(微信小程序)

[rewrite_local]
^https?:\/\/javelin.mandrillvr.com\/api\/data\/get_game_data url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/bqwz.js

[mitm]
hostname = javelin.mandrillvr.com
*
*
*/





let body = $response.body;

// 金币
body = body.replace(/\\"coin\\":\d+/g, '\\"coin\\":9999999');
// 钻石
body = body.replace(/\\"diamond\\":\d+/g, '\\"diamond\\":9999999');
// 经验
body = body.replace(/\\"exp\\":\d+/g, '\\"exp\\":9999999');
// 排位券
body = body.replace(/\\"rank_ticket\\":\d+/g, '\\"rank_ticket\\":9999');
// PVE体力
body = body.replace(/\\"pve_power\\":\d+/g, '\\"pve_power\\":9999');
// PVE商店币
body = body.replace(/\\"pve_shopcoin\\":\d+/g, '\\"pve_shopcoin\\":9999999');
// 饼干
body = body.replace(/\\"cookie\\":\d+/g, '\\"cookie\\":9999999');
// 奖杯
body = body.replace(/\\"cup\\":\d+/g, '\\"cup\\":9999999');

// 招募相关
// 普通招募钥匙
body = body.replace(/\\"zhaomu_key\\":\d+/g, '\\"zhaomu_key\\":9999');
// 普通招募次数
body = body.replace(/\\"zhaomu_times\\":\d+/g, '\\"zhaomu_times\\":9999');
// 高级招募钥匙
body = body.replace(/\\"zhaomuPro_key\\":\d+/g, '\\"zhaomuPro_key\\":9999');
// 高级招募次数
body = body.replace(/\\"zhaomuPro_times\\":\d+/g, '\\"zhaomuPro_times\\":9999');

// 任务积分
// 每周任务积分
body = body.replace(/\\"task_week_point\\":\d+/g, '\\"task_week_point\\":9999');
// 7日活动积分
body = body.replace(/\\"day7_point\\":\d+/g, '\\"day7_point\\":9999');
// 广告活动积分
body = body.replace(/\\"active_ad_point\\":\d+/g, '\\"active_ad_point\\":9999');
// 5日活动积分
body = body.replace(/\\"active_5Day_point\\":\d+/g, '\\"active_5Day_point\\":9999');
// 新年福气值
body = body.replace(/\\"newYear_Fuqi\\":\d+/g, '\\"newYear_Fuqi\\":9999');

// 转盘抽奖
// 转盘免费次数
body = body.replace(/\\"turn_free_times\\":\d+/g, '\\"turn_free_times\\":999');
// 转盘总次数
//body = body.replace(/\\"turn_total_times\\":\d+/g, '\\"turn_total_times\\":999');

// 商店
// 钻石商店次数
body = body.replace(/\\"shop_diamond_times\\":\d+/g, '\\"shop_diamond_times\\":0');
// 商店刷新次数
body = body.replace(/\\"shop_flushTimes\\":\d+/g, '\\"shop_flushTimes\\":0');

// 战绩相关
// 胜场
body = body.replace(/\\"win_count\\":\d+/g, '\\"win_count\\":9999');
// 排位星星
body = body.replace(/\\"ranking_star\\":\d+/g, '\\"ranking_star\\":999');
// 连胜
body = body.replace(/\\"win_streak\\":\d+/g, '\\"win_streak\\":999');
body = body.replace(/\\"win_streak_lib\\":\d+/g, '\\"win_streak_lib\\":999');

// 段位相关
// 段位ID (没猜出来王者段位的id
//body = body.replace(/\\"ranking_id\\":\d+/g, '\\"ranking_id\\":50');
// 最高段位等级 (历史最高段位)
//body = body.replace(/\\"ranking_level_max\\":\d+/g, '\\"ranking_level_max\\":50');
// 最低段位等级 (当前小段位，1是最高的)
//body = body.replace(/\\"ranking_level_min\\":\d+/g, '\\"ranking_level_min\\":1');
// 总场次
body = body.replace(/\\"all_count\\":\d+/g, '\\"all_count\\":9999');

// 英雄碎片 
body = body.replace(/\\"hero_fragment\\":\{[^}]+\}/g, '\\"hero_fragment\\":{\\"20001\\":999,\\"20002\\":999,\\"20003\\":999,\\"20004\\":999,\\"20005\\":999,\\"20006\\":999,\\"20007\\":999,\\"20008\\":999,\\"20009\\":999,\\"20010\\":999,\\"20011\\":999,\\"20012\\":999,\\"20013\\":999,\\"20014\\":999,\\"20015\\":999,\\"20016\\":999,\\"20017\\":999,\\"20018\\":999,\\"20019\\":999,\\"20020\\":999,\\"20021\\":999,\\"20022\\":999,\\"20023\\":999,\\"20024\\":999,\\"20025\\":999,\\"20026\\":999,\\"20027\\":999,\\"20028\\":999,\\"20029\\":999,\\"20030\\":999,\\"20031\\":999,\\"20032\\":999,\\"20033\\":999,\\"20034\\":999,\\"20035\\":999,\\"20036\\":999,\\"20037\\":999,\\"20038\\":999,\\"20039\\":999,\\"20040\\":999,\\"20041\\":999,\\"20042\\":999,\\"20043\\":999,\\"20044\\":999,\\"20045\\":999,\\"20046\\":999,\\"20047\\":999,\\"20048\\":999,\\"20049\\":999,\\"20050\\":999}');

$done({ body });
