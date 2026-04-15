const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');
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

// 翻譯函數
async function translateText(text, targetLanguage) {
  try {
    // 使用 Google Translate API（免費版本）
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `${targetLanguage === 'vi' ? 'zh-CN|vi' : 'vi|zh-CN'}`
      }
    });

    if (response.data.responseStatus === 200) {
      return response.data.responseData.translatedText;
    }
    return '翻譯失敗，請重試。';
  } catch (error) {
    console.error('Translation error:', error);
    return '翻譯錯誤，請重試。';
  }
}

// 偵測語言
function detectLanguage(text) {
  // 簡單的越南文檢測（越南文含有特殊字符 như ă, ơ, ư, đ, etc）
  const vietnamesePattern = /[ăâêôơưđàáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵ]/i;
  return vietnamesePattern.test(text) ? 'vi' : 'zh';
}

// 處理訊息
async function handleMessage(event) {
  const userMessage = event.message.text;
  const sourceLanguage = detectLanguage(userMessage);
  const targetLanguage = sourceLanguage === 'vi' ? 'zh' : 'vi';
  
  try {
    const translatedText = await translateText(userMessage, targetLanguage);
    
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
