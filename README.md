# 越南文-中文 LINE Bot 翻譯工具

## 📱 功能介紹
- ✅ **實時翻譯**：越南文 ↔ 中文 雙向翻譯
- ✅ **自動偵測**：自動識別輸入語言
- ✅ **簡單易用**：只需傳送訊息即自動翻譯
- ✅ **適合外勞**：幫助外國勞工與台灣人溝通

---

## 🚀 快速開始

### 步驟 1：建立 LINE Official Account

1. 前往 [LINE Developers 控制台](https://developers.line.biz/)
2. 建立新的 Channel（選擇 Messaging API）
3. 獲取以下認證資訊：
   - **Channel Access Token** 
   - **Channel Secret**

### 步驟 2：本地開發設置

#### 安裝相依套件
```bash
npm install
```

#### 建立環境檔案
```bash
copy .env.example .env
```

編輯 `.env` 檔案，填入你的 LINE 認證資訊：
```
CHANNEL_ACCESS_TOKEN=你的_CHANNEL_ACCESS_TOKEN
CHANNEL_SECRET=你的_CHANNEL_SECRET
PORT=3000
```

#### 本地測試
```bash
npm run dev
```
伺服器將在 `http://localhost:3000` 啟動

---

## 🌐 部署到雲端（推薦使用 Zeabur）

### 使用 Zeabur 部署（最簡單）

1. **註冊 Zeabur**：前往 [zeabur.com](https://zeabur.com)

2. **連接 GitHub**：
   - 將專案上傳到 GitHub
   - 在 Zeabur 選擇「Create Project」→「Deploy New Service」→「From GitHub」

3. **設定環境變數**：
   - 在 Zeabur 專案設定中新增環境變數：
     - `CHANNEL_ACCESS_TOKEN`
     - `CHANNEL_SECRET`

4. **取得公開 URL**：
   - Zeabur 會提供一個公開 URL（如 `https://your-app.zeabur.app`）

5. **設定 LINE Webhook**：
   - 在 LINE Developer Console 中：
   - Webhook URL 設定為：`https://your-app.zeabur.app/callback`
   - 啟用 Webhook

---

## 📋 LINE Developer Console 設定步驟

### 在 LINE Developers 控制台中：

1. **基本設定**
   - Channel ID：複製記錄
   - Channel Secret：複製記錄

2. **Messaging API**
   - 生成 Channel Access Token

3. **Webhook**
   - Webhook URL：填入 `https://你的部署URL/callback`
   - 啟用 Webhook 功能
   - 停用「自動回覆訊息」

4. **官方帳號功能**
   - 確保已啟用「Messaging API」

---

## 💬 使用方式

1. 在 LINE 上加入你的 Bot
2. 傳送任何中文或越南文訊息
3. Bot 自動翻譯並回覆

### 範例：
```
使用者：你好
Bot：📝 中文→越南文
原文：你好
翻譯：Xin chào

使用者：Tiếng Việt
Bot：📝 越南文→中文
原文：Tiếng Việt
翻譯：越南文
```

---

## 🛠️ 本地開發與測試

### 使用 ngrok 進行本地測試

如果想在本地測試 Webhook，可用 ngrok：

```bash
# 安裝 ngrok
npm install -g ngrok

# 啟動 ngrok（連接至本地 3000 port）
ngrok http 3000
```

這會給你一個臨時 URL（如 `https://xxx.ngrok.io`），可用於 LINE 的 Webhook 設定。

---

## 📁 專案結構
```
vietnamese-translator-linebot/
├── app.js              # 主程式
├── package.json        # 相依套件
├── .env.example        # 環境變數範本
├── .env                # 環境變數（本地使用，不上傳）
└── README.md           # 說明文件
```

---

## 🔧 故障排除

| 問題 | 解決方案 |
|------|---------|
| Bot 無法回覆訊息 | 檢查 CHANNEL_ACCESS_TOKEN 和 CHANNEL_SECRET 是否正確 |
| Webhook 顯示 failed | 確認 URL 正確且伺服器已啟動 |
| Node modules 相關錯誤 | 執行 `npm install` 重新安裝 |
| 翻譯結果不準確 | 翻譯 API 有限制，複雜文句準確度有限 |

---

## 🔐 安全建議

- ✅ 不要將 `.env` 檔案上傳到 GitHub
- ✅ 定期更新 Node.js 套件：`npm update`
- ✅ 使用 `.gitignore` 排除敏感檔案
- ✅ 在生產環境中設定適當的 CORS 和速率限制

---

## 📞 支持

如有問題或建議，請檢查：
- [LINE Messaging API 官方文檔](https://developers.line.biz/zh-hant/docs/messaging-api/)
- [Express.js 官方文檔](https://expressjs.com/)

---

**祝你的 Bot 順利上線！** 🎉
