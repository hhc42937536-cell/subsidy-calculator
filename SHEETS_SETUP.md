# Google Sheets 補助資料設定說明

## 欄位（第一行為標題，完全照抄）

```
slug | title | category | subtitle | amount | amount_label | color | criteria_1 | criteria_2 | criteria_3 | criteria_4 | doc_1_name | doc_1_note | doc_2_name | doc_2_note | doc_3_name | doc_3_note | doc_4_name | doc_4_note | doc_5_name | doc_5_note | doc_6_name | doc_6_note | apply_url | apply_label | review_time | review_note | tip_1 | tip_2 | tip_3 | active
```

## 欄位說明

| 欄位 | 說明 | 範例 |
|------|------|------|
| slug | 頁面路徑（英文、不含空格）| rent-subsidy |
| title | 補助名稱 | 中央租金補貼 |
| category | 分類 | 租屋 / 育兒 / 就業 / 長者 / 身障 / 低收入 / 創業 / 企業 |
| subtitle | 副標題 | 內政部住宅補貼計畫，每年開放申請 |
| amount | 補助金額 | $54,000 |
| amount_label | 金額說明 | 每年最高補貼 |
| color | 顏色（HEX）| #378ADD |
| criteria_1–4 | 申請資格（最多4條）| 年滿18歲，無自有住宅 |
| doc_1_name – doc_6_name | 文件名稱 | 身份證正反面影本 |
| doc_1_note – doc_6_note | 文件備註 | 本人 |
| apply_url | 申請網址 | https://rental.cpami.gov.tw/ |
| apply_label | 申請按鈕文字 | 前往內政部住宅補貼系統申請 |
| review_time | 審核時間 | 約 2–3 個月 |
| review_note | 審核說明 | 每年 5–8 月開放申請... |
| tip_1–3 | 注意事項（最多3條）| 租賃契約需申報或公證 |
| active | 是否顯示 | TRUE / FALSE |

## 設定步驟

1. 複製這個試算表範本（我會提供連結）
2. 填入補助資料
3. 點「檔案」→「共用」→「發佈到網路」→「CSV」
4. 複製 CSV 連結
5. 在 Vercel 環境變數加入：
   - `GOOGLE_SHEETS_CSV_URL` = 剛才複製的 CSV 連結
6. 重新 deploy

## Vercel 環境變數設定

Settings → Environment Variables → 新增：

```
GOOGLE_SHEETS_CSV_URL = https://docs.google.com/spreadsheets/d/你的試算表ID/export?format=csv&gid=0
ANTHROPIC_API_KEY = sk-ant-...（從 console.anthropic.com 取得）
```
