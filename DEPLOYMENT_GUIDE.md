# 部署完整指南（分步驟）

## 📌 目標
建立一個 LINE Bot，能在雲端自動翻譯越南文和中文

## 🎬 操作流程

### 第一章：準備 LINE 官方帳號

#### 1.1 建立 LINE Developer 帳號
- 訪問 https://developers.line.biz/
- 用 LINE 帳號登錄
- 選擇「建立新的 Channel」
- Channel 類型選擇：**Messaging API**

#### 1.2 獲取認證資訊
在 Channel 設定頁面找到：
```
✅ Channel ID: (記下來)
✅ Channel Secret: (記下來) 
✅ Channel Access Token: (按「Generate」生成)
```

**重要**：妥善保管這些資訊，不要洩露！

---

### 第二章：本地開發環境設置

#### 2.1 在本地機器上克隆專案
```bash
# 進入你的工作目錄
cd f:\Coding\Vietnamese_translation

# 安裝依賴
npm install
```

#### 2.2 配置環境變數
```bash
# Windows 命令提示字元
copy .env.example .env
```

編輯 `.env` 檔案：
```
CHANNEL_ACCESS_TOKEN=你在本步1.2中獲得的Token
CHANNEL_SECRET=你在本步1.2中獲得的Secret
PORT=3000
```

#### 2.3 本地測試（選項 A：直接測試）
```bash
npm run dev
```
看到以下訊息表示成功：
```
✅ Server running on port 3000
```

---

### 第三章：部署到雲端（推薦 Zeabur）

#### 3.1 註冊 Zeabur
- 訪問 https://zeabur.com
- 用 GitHub 登錄（或建立新帳號）

#### 3.2 從 GitHub 部署
1. 先把專案上傳到 GitHub
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git push origin main
   ```

2. 在 Zeabur Dashboard 點擊「Create Project」
3. 選擇「Deploy New Service」
4. 選擇「From GitHub」並授權 repository

#### 3.3 設定環境變數（重要！）
在 Zeabur 專案中：
1. 進入「Environment Variables」
2. 添加：
   - `CHANNEL_ACCESS_TOKEN` = 你的 Token
   - `CHANNEL_SECRET` = 你的 Secret

部署會自動啟動。等著看 Zeabur 給你的公開 URL（形如 `https://your-project-xxx.zeabur.app`）

---

### 第四章：設定 LINE 的 Webhook

回到 LINE Developer Console：

1. 進入你的 Channel 設定
2. 找到「Messaging API」標籤
3. 在 Webhook 區域：
   ```
     Webhook URL: https://your-project-xxx.zeabur.app/callback
   ```
4. 點擊「Verify」確保連接正常
5. 開啟「Use webhooks」

⚠️ **關閉** 「自動回覆訊息」（否則會有邏輯衝突）

---

### 第五章：測試 Bot

1. 在 LINE 上加入你的官方帳號
2. 傳送測試訊息：
   ```
   你好
   ```
3. Bot 應該回覆：
   ```
   📝 中文→越南文
   原文：你好
   翻譯：Xin chào
   ```

✅ 成功！

---

## 🆘 常見問題和解決方案

### Q1: Bot 不回覆訊息
**解決步驟**：
- [ ] 檢查 Zeabur 部署狀態（若為紅色，檢查日誌）
- [ ] 確認 Webhook URL 在 LINE Console 中正確無誤
- [ ] 點擊「Verify」按鈕確保連接
- [ ] 檢查環境變數是否正確設定

### Q2: 翻譯結果亂碼或不正確
**解決方案**：
- 翻譯 API 對複雜句子準確度有限
- 建議測試簡單詞彙
- 考慮切換翻譯引擎（文中 app.js 可修改）

### Q3: 部署後出現 500 錯誤
**解決步驟**：
- [ ] 在 Zeabur Logs 檢視錯誤訊息
- [ ] 確保 `npm install` 成功完成
- [ ] 檢查 Node.js 版本相容性

### Q4: 如何更新 Bot 功能
```bash
# 本地修改檔案後
git add .
git commit -m "description"
git push origin main
# Zeabur 會自動重新部署
```

---

## 📊 架構圖

```
LINE 使用者
     ↓
[用戶傳送訊息]
     ↓
LINE Servers
     ↓ (webhook callback)
Zeabur 上的 Bot
     ↓
翻譯 API (MyMemory)
     ↓
返回翻譯結果
     ↓
[Bot 回覆用戶]
     ↓
LINE 用戶收到翻譯
```

---

## 🔐 安全檢查清單

- [ ] `.env` 檔案已加入 `.gitignore`
- [ ] 敏感資訊未上傳到 GitHub
- [ ] 定期更新 Node 套件：`npm audit fix`
- [ ] 生產環境設定了適當的錯誤處理

---

## 📈 性能監控

在 Zeabur Dashboard 可以看到：
- ✅ 請求次數
- ✅ 回應時間
- ✅ 伺服器日誌
- ✅ CPU / 記憶體使用率

---

## 🎉 完成！

你現在擁有一個完全功能的 LINE 翻譯 Bot！

**下一步能做什麼**：
- 添加翻譯歷史記錄
- 支援語音翻譯  
- 添加多語言支援
- 實施用戶認證系統
- 部署私人版本供組織內部使用

