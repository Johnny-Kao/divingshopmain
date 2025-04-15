# DiveShopFinder

全球潛水店搜索平台，幫助潛水愛好者找到最適合的潛水店。

## 功能特點

- 🔍 快速搜索潛水店
- 🏢 按認證系統篩選（PADI、SSI 等）
- 🌏 按國家/地區篩選
- ⭐ 五星店鋪篩選
- 🔤 按名稱排序
- 📱 響應式設計，支持移動端和桌面端

## 技術棧

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Static JSON Data

## 本地開發

1. 克隆倉庫：
```bash
git clone <repository-url>
cd DiveShopFinder
```

2. 安裝依賴：
```bash
npm install
```

3. 創建並配置環境變量：
```bash
cp .env.example .env.local
```

4. 啟動開發服務器：
```bash
npm run dev
```

5. 訪問 [http://localhost:3000](http://localhost:3000)

## 部署指南

### Cloudflare Pages 部署

1. Fork 此倉庫到您的 GitHub 賬戶

2. 在 Cloudflare Pages 中：
   - 連接您的 GitHub 賬戶
   - 選擇此倉庫
   - 配置以下構建設置：
     - 框架預設：Next.js
     - 構建命令：`npm run build`
     - 構建輸出目錄：`out`
     - Node.js 版本：18.x
     - 環境變量：
       ```
       NEXT_PUBLIC_APP_NAME=DiveShopFinder
       NEXT_PUBLIC_APP_URL=https://your-domain.pages.dev
       NEXT_PUBLIC_APP_DESCRIPTION=Find the best dive shops worldwide
       ```

3. 部署完成後，您可以通過 Cloudflare 提供的域名訪問您的網站

## 數據更新

潛水店數據存儲在 `/public/data/dive_shops.json` 文件中。您可以通過以下方式更新數據：

1. 修改 JSON 文件
2. 提交更改到 GitHub
3. Cloudflare Pages 將自動重新部署

## 許可證

MIT 