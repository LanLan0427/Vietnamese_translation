# 黑客松評審專用 - 快速啟動指南

## 🎯 30秒快速演示

### 本地運行
```bash
npm install
copy .env.example .env
# 編輯 .env，填入 LINE Channel 認證資訊
npm run dev
```

### 部署到 Zeabur（5分鐘）
1. 推送到 GitHub
2. 在 Zeabur 建立 Project 並連接 GitHub repository
3. 新增環境變數：`CHANNEL_ACCESS_TOKEN` 和 `CHANNEL_SECRET`
4. 部署完後，在 LINE Developer Console 設定 Webhook URL
5. 完成！

---

## ✨ 核心功能流程

```
使用者傳送越南文
    ↓
Bot 自動偵測語言
    ↓
調用翻譯 API
    ↓
自動回覆中文翻譯
    ↓
問題解決！✅
```

## 💡 創新亮點

- **即插即用**：無需複雜配置
- **自動語言偵測**：不需要使用者指定
- **穩定可靠**：使用官方 LINE SDK
- **價格實惠**：翻譯 API 免費版本
- **易於擴展**：可添加更多功能

---

## 🚀 下一步優化方向

1. 支持語音翻譯
2. 支持圖片內文字翻譯
3. 支持更多語言對
4. 添加翻譯歷史記錄
5. 用戶偏好設定

