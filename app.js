const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');
const translate = require('google-translate-api-x');
require('dotenv').config();

const app = express();

// LINE Bot 設定
const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const middleware = line.middleware({
  channelSecret: process.env.CHANNEL_SECRET,
});

app.use(middleware);

// 主要翻譯引擎：google-translate-api-x
async function translateWithGoogle(text, targetLanguage) {
  try {
    const to = targetLanguage === 'vi' ? 'vi' : 'zh-TW';
    const result = await translate(text, { to });
    return result.text || text;
  } catch (error) {
    console.error('Google translate error:', error.message || error);
    return text;
  }
}

// 備援翻譯引擎：MyMemory
async function translateWithMyMemory(text, sourceLanguage, targetLanguage) {
  try {
    const source = sourceLanguage === 'vi' ? 'vi' : 'zh-CN';
    const target = targetLanguage === 'vi' ? 'vi' : 'zh-CN';

    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${source}|${target}`,
      }
    });

    if (response.data.responseStatus === 200) {
      return response.data.responseData.translatedText;
    }

    return text;
  } catch (error) {
    console.error('MyMemory translate error:', error.message || error);
    return text;
  }
}

// 翻譯函數（主引擎 + 備援）
async function translateText(text, sourceLanguage, targetLanguage) {
  const normalized = text.trim();
  const googleResult = await translateWithGoogle(normalized, targetLanguage);

  // 常見問題：無重音越南文（如 Xin chao）可能回傳原文，這時改用 MyMemory 補救
  if (googleResult.trim().toLowerCase() === normalized.toLowerCase()) {
    const fallbackResult = await translateWithMyMemory(normalized, sourceLanguage, targetLanguage);
    return fallbackResult || googleResult;
  }

  return googleResult;
}

// 偵測語言
function detectLanguage(text) {
  // 中文字元
  const chinesePattern = /[\u4e00-\u9fff]/;
  if (chinesePattern.test(text)) {
    return 'zh';
  }

  // 越南文重音字元
  const vietnamesePattern = /[ăâêôơưđàáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i;
  if (vietnamesePattern.test(text)) {
    return 'vi';
  }

  // 無重音拉丁字母在此情境通常更可能是越南文
  const latinPattern = /[a-z]/i;
  if (latinPattern.test(text)) {
    return 'vi';
  }

  // 預設視為中文
  return 'zh';
}

// 處理訊息
async function handleMessage(event) {
  const userMessage = event.message.text;
  const sourceLanguage = detectLanguage(userMessage);
  const targetLanguage = sourceLanguage === 'vi' ? 'zh' : 'vi';
  
  try {
    const translatedText = await translateText(userMessage, sourceLanguage, targetLanguage);
    
    const replyMessage = {
      type: 'text',
      text: `📝 ${sourceLanguage === 'vi' ? '越南文→中文' : '中文→越南文'}\n\n原文：${userMessage}\n\n翻譯：${translatedText}`
    };
    
    await client.replyMessage(event.replyToken, replyMessage);
  } catch (error) {
    console.error('Error:', error);
    await client.replyMessage(event.replyToken, {
      type: 'text',
      text: '發生錯誤，請重試。'
    });
  }
}

// 處理所有事件
app.post('/callback', (req, res) => {
  Promise.all(req.body.events.map(event => {
    if (event.type === 'message' && event.message.type === 'text') {
      return handleMessage(event);
    }
  }))
    .then(() => res.json({ ok: true }))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

// 健康檢查
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
