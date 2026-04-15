const express = require('express');
const app = express();

// ===== 模擬測試用 ===== 
// 本檔案用於本地測試 webhook

app.use(express.json());

// 模擬 LINE webhook 事件
const mockLineEvent = {
  events: [
    {
      type: 'message',
      message: {
        type: 'text',
        id: '100001',
        text: '你好'
      },
      timestamp: Date.now(),
      source: {
        type: 'user',
        userId: 'U1234567890'
      },
      replyToken: 'nHuyWiB7yP5Zw52FIkcQT'
    }
  ]
};

// 觀看日誌以驗證
console.log('Mock LINE Event:');
console.log(JSON.stringify(mockLineEvent, null, 2));

// 測試請求
const axios = require('axios');

async function testBot() {
  try {
    const response = await axios.post('http://localhost:3000/callback', mockLineEvent);
    console.log('✅ Test successful:', response.data);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// 執行測試
if (require.main === module) {
  console.log('開始測試 Bot...請確保 npm run dev 已在執行');
  setTimeout(testBot, 1000);
}

module.exports = mockLineEvent;
