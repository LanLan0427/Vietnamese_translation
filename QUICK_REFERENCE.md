# 快速參考卡片 (Quick Reference Card)

## 🎯 一張紙搞定所有命令

### 安裝和本地運行
```bash
npm install              # 安裝依賴（只需一次）
npm run dev             # 啟動本地開發伺服器
```

### 環境配置
```bash
copy .env.example .env  # 複製環境變數範本
# 編輯 .env，填入你的 LINE Channel 資訊
```

### 部署到 Zeabur
```bash
git push origin main    # 推送到 GitHub
# Zeabur 會自動部署
```

---

## 📋 需要的資訊清單

| 項目 | 來源 | 用途 |
|------|------|------|
| Channel Access Token | LINE Developer Console | 認證 Bot |
| Channel Secret | LINE Developer Console | 簽名驗證 |
| Webhook URL | Zeabur 公開 URL | LINE 回調地址 |
| GitHub Token | GitHub Settings | 授權 Zeabur |

---

## 🔄 LINE 設定步驟（按順序）

1. ✅ 在 LINE Developer 建立 Messaging API Channel
2. ✅ 生成 Access Token 和 Secret
3. ✅ 部署程式到 Zeabur
4. ✅ 在 LINE Console 設定 Webhook URL
5. ✅ 測試傳送訊息給 Bot

---

## 🚨 最常見的 3 個錯誤

| 錯誤 | 原因 | 修正 |
|------|------|------|
| Webhook Failed | URL 錯誤或伺服器未啟動 | 在 Zeabur 檢查 URL，確認部署成功 |
| 403 Unauthorized | Token 或 Secret 錯誤 | 重新複製 .env 中的值 |
| Bot 不回覆 | 自動回覆訊息未關閉 | 在 LINE Console 關閉「自動回覆」 |

---

## 💡 測試技巧

```bash
# 在一個終端窗口啟動伺服器
npm run dev

# 在另一個終端測試 (Linux/Mac)
curl -X POST http://localhost:3000/callback \
  -H "Content-Type: application/json" \
  -d '{"events":[{"type":"message","message":{"type":"text","text":"你好"}}]}'
```

---

## 🎨 翻譯功能詳細說明

### 自動語言偵測原理
- 包含越南文特殊字符 (ă, ê, ô, ơ, ư, đ 等) → 判定為越南文
- 其他中文字符 → 判定為中文

### 翻譯 API
- 使用 **MyMemory Translated** (免費版本，無需 API Key)
- 支援數百種語言組合
- 自動選擇最適合的翻譯引擎

---

## 📞 緊急求助

| 問題 | 搜索關鍵字 |
|------|-----------|
| Zeabur 部署 | LINE webhook Zeabur 教學 |
| Node.js 語法 | Node.js 官方文檔 |
| LINE API | LINE Messaging API 文檔 |
| 翻譯相關 | Google Translate API / MyMemory API |

