/**
 * 服务器速度测试脚本
 * 使用 Speedtest CLI 进行网络速度测试
 * 
 * 使用方法: node speedtest.js
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

// 配置
const OUTPUT_DIR = path.join(__dirname, 'speedtest');

// 确保输出目录存在
function ensureDirectory() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`✅ 创建目录: ${OUTPUT_DIR}`);
    }
}

// 格式化速度
function formatSpeed(bytesPerSecond) {
    const mbps = (bytesPerSecond / 125000).toFixed(2);
    return `${mbps} Mbps`;
}

// 格式化数据量
function formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = bytes;
    let unitIndex = 0;
    
    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex++;
    }
    
    return `${value.toFixed(2)} ${units[unitIndex]}`;
}

// 运行速度测试
async function runSpeedtest() {
    try {
        console.log('🔍 开始速度测试...\n');
        
        // 检测 speedtest 版本并使用对应参数
        let command;
        try {
            // 尝试官方版本的参数
            await execAsync('speedtest --version', { timeout: 5000 });
            command = 'speedtest --accept-license --accept-gdpr -f json';
        } catch (e) {
            // 使用 speedtest-cli (Python 版本) 的参数
            command = 'speedtest-cli --json';
        }
        
        const { stdout, stderr } = await execAsync(command, {
            timeout: 120000
        });
        
        if (stderr) {
            console.log('⚠️  警告:', stderr);
        }
        
        const result = JSON.parse(stdout);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const timeStr = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
        
        // 打印测试结果
        console.log('📊 测试结果:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`ISP:      ${result.isp}`);
        console.log(`服务器:   ${result.server.name}`);
        console.log(`位置:     ${result.server.location}`);
        console.log(`服务器ID: ${result.server.id}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`Ping:     ${result.ping.latency}ms (抖动: ${result.ping.jitter}ms)`);
        console.log(`下载:     ${formatSpeed(result.download.bandwidth)}`);
        console.log(`上传:     ${formatSpeed(result.upload.bandwidth)}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`下载数据: ${formatBytes(result.download.bytes)}`);
        console.log(`上传数据: ${formatBytes(result.upload.bytes)}`);
        console.log(`测试时间: ${timeStr}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // 保存 JSON 结果
        const jsonFilename = path.join(OUTPUT_DIR, `speedtest-${timestamp}.json`);
        fs.writeFileSync(jsonFilename, JSON.stringify(result, null, 2));
        console.log(`✅ JSON 已保存: ${jsonFilename}`);
        
        // 下载结果图片
        if (result.result && result.result.url) {
            console.log('📥 正在下载结果图片...');
            const imageUrl = result.result.url + '.png';
            
            try {
                const response = await axios.get(imageUrl, { 
                    responseType: 'arraybuffer',
                    timeout: 30000
                });
                
                const imageFilename = path.join(OUTPUT_DIR, `speedtest-${timestamp}.png`);
                fs.writeFileSync(imageFilename, response.data);
                console.log(`✅ 图片已保存: ${imageFilename}`);
            } catch (imgError) {
                console.log('⚠️  图片下载失败:', imgError.message);
            }
        }
        
        // 生成文本报告
        const reportFilename = path.join(OUTPUT_DIR, `speedtest-${timestamp}.txt`);
        const report = [
            '═══════════════════════════════════════',
            '         服务器速度测试报告',
            '═══════════════════════════════════════',
            '',
            `测试时间: ${timeStr}`,
            '',
            '网络信息:',
            `  ISP:      ${result.isp}`,
            `  外网IP:   ${result.interface.externalIp}`,
            `  接口:     ${result.interface.name}`,
            '',
            '测试服务器:',
            `  名称:     ${result.server.name}`,
            `  位置:     ${result.server.location}`,
            `  ID:       ${result.server.id}`,
            '',
            '测试结果:',
            `  Ping:     ${result.ping.latency}ms`,
            `  抖动:     ${result.ping.jitter}ms`,
            `  下载速度: ${formatSpeed(result.download.bandwidth)}`,
            `  上传速度: ${formatSpeed(result.upload.bandwidth)}`,
            `  下载数据: ${formatBytes(result.download.bytes)}`,
            `  上传数据: ${formatBytes(result.upload.bytes)}`,
            '',
            '═══════════════════════════════════════',
            ''
        ].join('\n');
        
        fs.writeFileSync(reportFilename, report);
        console.log(`✅ 报告已保存: ${reportFilename}\n`);
        
        console.log('🎉 测试完成！');
        
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        
        if (error.message.includes('speedtest')) {
            console.error('\n💡 提示: 请先安装 speedtest-cli');
            console.error('   安装命令: apt install speedtest-cli');
            console.error('   或访问: https://www.speedtest.net/apps/cli');
        }
        
        process.exit(1);
    }
}

// 主函数
async function main() {
    console.log('⚡️ 服务器速度测试工具\n');
    ensureDirectory();
    await runSpeedtest();
}

main();
