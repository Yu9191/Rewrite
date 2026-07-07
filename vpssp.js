const { exec } = require('child_process');
const { promisify } = require('util');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);
const OUTPUT_DIR = path.join(__dirname, 'speedtest');

function ensureDirectory() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`创建目录: ${OUTPUT_DIR}`);
    }
}

function formatSpeed(bytesPerSecond) {
    const mbps = (bytesPerSecond / 125000).toFixed(2);
    return `${mbps} Mbps`;
}

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

async function runSpeedtest() {
    try {
        console.log('开始速度测试...\n');
        
        let command = 'speedtest-cli --json --share';
        let isOfficialCli = false;
        
        try {
            const { stdout } = await execAsync('speedtest --version', { timeout: 5000 });
            if (stdout && stdout.includes('Speedtest by Ookla')) {
                command = 'speedtest --accept-license --accept-gdpr -f json';
                isOfficialCli = true;
                console.log('使用官方 Speedtest CLI\n');
            } else {
                console.log('使用 speedtest-cli\n');
            }
        } catch (e) {
            console.log('使用 speedtest-cli\n');
        }
        
        const { stdout, stderr } = await execAsync(command, {
            timeout: 120000
        });
        
        if (stderr) {
            console.log('警告:', stderr);
        }
        
        const result = JSON.parse(stdout);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
        const timeStr = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
        
        const isp = result.client?.isp || result.isp || 'Unknown';
        const serverName = result.server?.name || result.server?.sponsor || 'Unknown';
        const serverLocation = result.server?.location || result.server?.name || 'Unknown';
        const serverId = result.server?.id || 'Unknown';
        const ping = result.ping?.latency || result.ping || 0;
        const jitter = result.ping?.jitter || 0;
        const downloadSpeed = result.download?.bandwidth || (result.download ? result.download / 8 : 0);
        const uploadSpeed = result.upload?.bandwidth || (result.upload ? result.upload / 8 : 0);
        const downloadBytes = result.download?.bytes || result.bytes_received || 0;
        const uploadBytes = result.upload?.bytes || result.bytes_sent || 0;
        const externalIp = result.interface?.externalIp || result.client?.ip || 'Unknown';
        const interfaceName = result.interface?.name || 'Unknown';
        
        console.log('测试结果:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`ISP:      ${isp}`);
        console.log(`服务器:   ${serverName}`);
        console.log(`位置:     ${serverLocation}`);
        console.log(`服务器ID: ${serverId}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`Ping:     ${ping}ms${jitter ? ` (抖动: ${jitter}ms)` : ''}`);
        console.log(`下载:     ${formatSpeed(downloadSpeed)}`);
        console.log(`上传:     ${formatSpeed(uploadSpeed)}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`下载数据: ${formatBytes(downloadBytes)}`);
        console.log(`上传数据: ${formatBytes(uploadBytes)}`);
        console.log(`测试时间: ${timeStr}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        const jsonFilename = path.join(OUTPUT_DIR, `speedtest-${timestamp}.json`);
        fs.writeFileSync(jsonFilename, JSON.stringify(result, null, 2));
        console.log(`JSON 已保存: ${jsonFilename}`);
        
        if (result.result?.url || result.share) {
            console.log('正在下载结果图片...');
            const imageUrl = (result.result?.url || result.share) + '.png';
            
            try {
                const response = await axios.get(imageUrl, { 
                    responseType: 'arraybuffer',
                    timeout: 30000
                });
                
                const imageFilename = path.join(OUTPUT_DIR, `speedtest-${timestamp}.png`);
                fs.writeFileSync(imageFilename, response.data);
                console.log(`图片已保存: ${imageFilename}`);
            } catch (imgError) {
                console.log('图片下载失败:', imgError.message);
            }
        } else {
            console.log('未生成分享图片');
        }
        
        const reportFilename = path.join(OUTPUT_DIR, `speedtest-${timestamp}.txt`);
        const report = [
            '═══════════════════════════════════════',
            '         服务器速度测试报告',
            '═══════════════════════════════════════',
            '',
            `测试时间: ${timeStr}`,
            '',
            '网络信息:',
            `  ISP:      ${isp}`,
            `  外网IP:   ${externalIp}`,
            `  接口:     ${interfaceName}`,
            '',
            '测试服务器:',
            `  名称:     ${serverName}`,
            `  位置:     ${serverLocation}`,
            `  ID:       ${serverId}`,
            '',
            '测试结果:',
            `  Ping:     ${ping}ms`,
            jitter ? `  抖动:     ${jitter}ms` : '',
            `  下载速度: ${formatSpeed(downloadSpeed)}`,
            `  上传速度: ${formatSpeed(uploadSpeed)}`,
            `  下载数据: ${formatBytes(downloadBytes)}`,
            `  上传数据: ${formatBytes(uploadBytes)}`,
            '',
            '═══════════════════════════════════════',
            ''
        ].filter(line => line !== '').join('\n');
        
        fs.writeFileSync(reportFilename, report);
        console.log(`报告已保存: ${reportFilename}\n`);
        
        console.log('测试完成！');
        
    } catch (error) {
        console.error('测试失败:', error.message);
        
        if (error.message.includes('speedtest')) {
            console.error('\n提示: 请先安装 speedtest-cli');
            console.error('   安装命令: apt install speedtest-cli');
            console.error('   或访问: https://www.speedtest.net/apps/cli');
        }
        
        process.exit(1);
    }
}

async function main() {
    console.log('服务器速度测试工具\n');
    ensureDirectory();
    await runSpeedtest();
}

main();
