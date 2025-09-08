import { Plugin } from "@utils/pluginBase";
import { Api } from "telegram";
import * as fs from "fs/promises";
import axios from "axios";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

// 你的 Telegram 用户 ID
const MY_USER_ID = "5565918727";

// 存储用户数据的 JSON 文件路径
const DATA_FILE = "tts_tk.json";

// 语音角色ID列表
const REFERENCE_IDS: Record<string, string> = {
  "薯薯": "cc1c9874effe4526883662166456513c",
  "宣传片": "dd43b30d04d9446a94ebe41f301229b5",
  "影视飓风": "91648d8a8d9841c5a1c54fb18e54ab04",
  "丁真": "54a5170264694bfc8e9ad98df7bd89c3",
  "雷军": "aebaa2305aa2452fbdc8f41eec852a79",
  "蔡徐坤": "e4642e5edccd4d9ab61a69e82d4f8a14",
  "邓紫棋": "3b55b3d84d2f453a98d8ca9bb24182d6",
  "周杰伦": "1512d05841734931bf905d0520c272b1",
  "周星驰": "faa3273e5013411199abc13d8f3d6445",
  "孙笑川": "e80ea225770f42f79d50aa98be3cedfc",
  "张顺飞": "c88b80d38d0f4ed0aed1a92a5c19f00f",
  "阿诺": "daeda14f742f47b8ac243ccf21c62df8",
  "卢本伟": "24d524b57c5948f598e9b74c4dacc7ab",
  "电棍": "25d496c425d14109ba4958b6e47ea037",
  "炫狗": "b48533d37bed4ef4b9ad5b11d8b0b694",
  "阿梓": "c2a6125240f343498e26a9cf38db87b7",
  "七海": "a7725771e0974eb5a9b044ba357f6e13",
  "嘉然": "1d11381f42b54487b895486f69fb14fb",
  "东雪莲": "7af4d620be1c4c6686132f21940d51c5",
  "永雏塔菲": "e1cfccf59a1c4492b5f51c7c62a8abd2",
  "可莉": "626bb6d3f3364c9cbc3aa6a67300a664",
  "刻晴": "5611bf78886a4a9998f56538c4ec7d8c",
  "烧姐姐": "60d377ebaae44829ad4425033b94fdea",
  "AD学姐": "7f92f8afb8ec43bf81429cc1c9199cb1",
  "御姐": "f44181a3d6d444beae284ad585a1af37",
  "台湾女": "e855dc04a51f48549b484e41c4d4d4cc",
  "御女茉莉": "6ce7ea8ada884bf3889fa7c7fb206691",
  "真实女声": "c189c7cff21c400ba67592406202a3a0",
  "女大学生": "5c353fdb312f4888836a9a5680099ef0",
  "温情女学生": "a1417155aa234890aab4a18686d12849",
  "蒋介石": "918a8277663d476b95e2c4867da0f6a6",
  "李云龙": "2e576989a8f94e888bf218de90f8c19a",
  "姜文": "ee58439a2e354525bd8fa79380418f4d",
  "黑手": "f7561ff309bd4040a59f1e600f4f4338",
  "马保国": "794ed17659b243f69cfe6838b03fd31a",
  "罗永浩": "9cc8e9b9d9ed471a82144300b608bf7f",
  "祁同伟": "4729cb883a58431996b998f2fca7f38b",
  "郭继承": "ecf03a0cf954498ca0005c472ce7b141",
  "麦克阿瑟": "405736979e244634914add64e37290b0",
  "营销号": "9d2a825024ce4156a16ba3ff799c4554",
  "蜡笔小新": "60b9a847ba6e485fa8abbde1b9470bc4",
  "奶龙": "3d1cb00d75184099992ddbaf0fdd7387",
  "懒羊羊": "131c6b3a889543139680d8b3aa26b98d",
  "剑魔": "ffb55be33cbb4af19b07e9a0ef64dab1",
  "小明剑魔": "a9372068ed0740b48326cf9a74d7496a",
  "唐僧": "0fb04af381e845e49450762bc941508c",
  "孙悟空": "8d96d5525334476aa67677fb43059dc5"
};

// 内存中存储用户默认角色
const userDefaultIds: Record<string, string> = {};

// 从文件加载 API Keys
async function loadApiKeys(): Promise<Record<string, string>> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData.userApiKeys || {};
  } catch (error) {
    return {};
  }
}

// 将 API Keys 保存到文件
async function saveApiKeys(apiKeys: Record<string, string>): Promise<void> {
  try {
    const data = { userApiKeys: apiKeys };
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error("保存 API Key 失败:", error);
  }
}

async function generateSpeech(text: string, referenceId: string, apiKey: string): Promise<string | null> {
  const api_url = 'https://api.fish.audio/v1/tts';
  const mp3File = 'output_audio.mp3';
  const oggFile = 'output.ogg';

  try {
    const response = await axios.post(api_url, {
      text,
      reference_id: referenceId,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    });

    await fs.writeFile(mp3File, response.data);

    try {
      await execPromise(`ffmpeg -y -i ${mp3File} -c:a libopus -b:a 64k -vbr on ${oggFile}`);
    } catch (error) {
      console.error(`FFmpeg 命令执行失败: ${error.message}`);
      return null;
    }

    return oggFile;
  } catch (error) {
    console.error("生成语音时发生错误:", error);
    return null;
  }
}

async function isFfmpegInstalled(): Promise<boolean> {
  try {
    const { stdout } = await execPromise('ffmpeg -version');
    return stdout.includes('ffmpeg version');
  } catch (error) {
    return false;
  }
}

async function installFfmpeg(): Promise<string> {
  if (process.platform === 'linux') {
    if (await isFfmpegInstalled()) {
      return "ffmpeg 已安装。";
    }
    try {
      await execPromise("sudo apt-get update && sudo apt-get install -y ffmpeg");
      return "ffmpeg 已成功安装！";
    } catch (error) {
      return `ffmpeg 安装失败，请检查错误信息：\n${error}`;
    }
  }
  return "无法自动安装 ffmpeg，请手动安装。";
}

// --- 命令处理函数 ---

async function tts(msg: Api.Message): Promise<void> {
  const [, ...args] = msg.message.slice(1).split(" ");
  const text = args.join(" ");

  const apiKeys = await loadApiKeys();
  const apiKey = apiKeys[MY_USER_ID];
  // 从内存中获取默认角色，如果不存在则使用雷军
  const referenceId = userDefaultIds[MY_USER_ID] || REFERENCE_IDS["雷军"];

  if (!apiKey) {
    await msg.edit({ text: "请先设置您的 API Key，使用指令 `tk 您的APIKey` 来设置" });
    return;
  }

  if (!text) {
    await msg.edit({ text: "请提供要转换的文本" });
    return;
  }

  await msg.edit({ text: "balabala. . ." });

  try {
    const resultFile = await generateSpeech(text, referenceId, apiKey);

    if (resultFile) {
        // 修复后的代码：使用 sendFile 并指定 voice: true
        await msg.client?.sendFile(msg.chatId, {
            file: resultFile,
            voice: true, // 明确告知这是一个语音文件
            replyTo: msg.replyTo?.replyToMsgId,
            commentTo: msg.replyTo?.commentToMsgId,
        });
      await msg.delete();
      await fs.unlink(resultFile);
    } else {
      await msg.edit({ text: "出大事了~ 无法获取语音" });
    }
  } catch (error) {
    await msg.edit({ text: `出错了嘿嘿~ ${error.message}` });
  }
}

async function ttsSet(msg: Api.Message): Promise<void> {
  const args = msg.message.slice(1).split(" ")[1];
  
  if (args && REFERENCE_IDS[args]) {
    // 将默认角色保存到内存中
    userDefaultIds[MY_USER_ID] = REFERENCE_IDS[args];

    await msg.edit({ text: `默认语音角色已设置为：\`${args}\`` });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await msg.delete();
  } else {
    const roleList = Object.keys(REFERENCE_IDS).map(role => `\`${role}\``).join("\n");
    await msg.edit({ text: `无效的角色名，请选择以下角色之一：\n${roleList}` });
  }
}

async function setApiKey(msg: Api.Message): Promise<void> {
  // 检查是否安装 ffmpeg
  if (!(await isFfmpegInstalled())) {
    await msg.edit({ text: "检测到 ffmpeg 未安装，正在尝试安装..." });
    const installResult = await installFfmpeg();
    await msg.edit({ text: installResult });
    if (installResult.includes("失败")) {
      return;
    }
  }

  const args = msg.message.slice(1).split(" ")[1];
  
  if (args) {
    // 加载、修改、保存 API Keys
    const apiKeys = await loadApiKeys();
    apiKeys[MY_USER_ID] = args;
    await saveApiKeys(apiKeys);

    await msg.edit({ text: "您的 API Key 已成功设置！" });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await msg.delete();
  } else {
    await msg.edit({ text: "请提供您的 API Key，格式：`tk 您的APIKey`" });
  }
}

// --- 插件类定义 ---

class TTSPlugin extends Plugin {
  description: string = `.t [文本] - 文字转语音，示例： \`\`\`.t 大家好，我是雷军\`\`\`\n.tk [APIKey] - 设置或更新您的 API Key\n.ts [角色名] - 设置或更新默认的语音角色`;
  cmdHandlers: Record<string, (msg: Api.Message) => Promise<void>> = {
    t: tts,
    ts: ttsSet,
    tk: setApiKey,
  };
}

export default new TTSPlugin();
