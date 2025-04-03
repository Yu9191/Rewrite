

代理工具配置规则
在代理工具中添加以下规则：


# 拦截NBA视频和电视剧数据API接口
https:\/\/bp-api\.bestv\.com\.cn\/cms\/api\/(live\/studio\/id\/v4|c\/player\/common) url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/KDF/video-parser.js


# 处理自定义页面请求
^https:\/\/360\.com\/video url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/refs/heads/main/KDF/video-parser.js

MITM设置
在MITM设置中添加以下域名：

# 主机名
hostname = bp-api.bestv.com.cn, 360.com

# 功能说明
1.自动识别内容类型：脚本能够自动识别是NBA比赛还是电视剧内容
2.NBA视频功能：展示各种比赛视频流（精彩集锦、各解说员视频等）提供多种画质选择 显示数据/专家/赛程等外部链接
3.电视剧功能：显示当前正在观看的剧集 提供剧集画质质量选择 展示完整剧集列表，包含每集标题和子标题
4.通用功能: 支持Quantumult X、Loon和Surge代理工具 
# 点击通知自动打开自定义视频页面
脚本通过通知系统让你可以一键访问视频内容，大大简化了操作流程。
