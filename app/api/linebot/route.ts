import { createHmac } from "crypto"

export const runtime = "nodejs"

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!
const CHANNEL_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!
const SITE_URL = "https://subsidy-calculator-six.vercel.app"

// ── 驗證 LINE 簽名 ───────────────────────────────────────────────
function validateSignature(body: string, signature: string): boolean {
  const hash = createHmac("sha256", CHANNEL_SECRET)
    .update(body)
    .digest("base64")
  return hash === signature
}

// ── 呼叫 LINE Reply API ──────────────────────────────────────────
async function reply(replyToken: string, messages: object[]) {
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_TOKEN}`,
    },
    body: JSON.stringify({ replyToken, messages }),
  })
}

// ── 快速回覆按鈕工廠 ─────────────────────────────────────────────
function quickReply(items: { label: string; data: string }[]) {
  return {
    items: items.map(({ label, data }) => ({
      type: "action",
      action: { type: "postback", label, data, displayText: label },
    })),
  }
}

// ── 步驟定義 ────────────────────────────────────────────────────
const STEPS = {
  // Step 1：年齡
  age: {
    text: "👋 你好！我是補助優轉小幫手\n\n幫你從 500+ 筆補助裡找出最適合你的。\n先問幾個問題，30 秒搞定 🎯\n\n📌 你的年齡範圍？",
    choices: [
      { label: "18 歲以下", value: "18以下" },
      { label: "18–29 歲", value: "18-29" },
      { label: "30–44 歲", value: "30-44" },
      { label: "45–59 歲", value: "45-59" },
      { label: "60 歲以上", value: "60以上" },
    ],
    nextStep: "city",
    paramKey: "age",
  },
  // Step 2：城市
  city: {
    text: "📍 你住在哪個縣市？",
    choices: [
      { label: "台北市", value: "台北市" },
      { label: "新北市", value: "新北市" },
      { label: "桃園市", value: "桃園市" },
      { label: "台中市", value: "台中市" },
      { label: "台南市", value: "台南市" },
      { label: "高雄市", value: "高雄市" },
      { label: "其他縣市", value: "其他" },
    ],
    nextStep: "work",
    paramKey: "city",
  },
  // Step 3：工作狀況
  work: {
    text: "💼 目前的工作狀況？",
    choices: [
      { label: "受僱上班族", value: "受僱" },
      { label: "自營/接案", value: "自營" },
      { label: "失業中", value: "失業" },
      { label: "學生", value: "學生" },
      { label: "退休", value: "退休" },
      { label: "農漁業", value: "農漁業" },
    ],
    nextStep: "family",
    paramKey: "work",
  },
  // Step 4：家庭狀況
  family: {
    text: "👨‍👩‍👧 家庭狀況？",
    choices: [
      { label: "單身", value: "單身" },
      { label: "已婚、無小孩", value: "已婚無子" },
      { label: "有小孩", value: "有子女" },
      { label: "單親", value: "單親" },
      { label: "照顧長輩", value: "照顧長輩" },
    ],
    nextStep: "identity",
    paramKey: "family",
  },
  // Step 5：特殊身份
  identity: {
    text: "🪪 有以下特殊身份嗎？（選最主要的一項）",
    choices: [
      { label: "一般民眾", value: "一般" },
      { label: "低/中低收入戶", value: "低收入" },
      { label: "身心障礙", value: "身障" },
      { label: "原住民族", value: "原住民" },
      { label: "新住民", value: "新住民" },
      { label: "中高齡（45+）", value: "中高齡" },
    ],
    nextStep: "done",
    paramKey: "identity",
  },
}

type StepKey = keyof typeof STEPS

// ── 解析 postback data ───────────────────────────────────────────
function parseData(data: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(data))
}

function buildData(params: Record<string, string>): string {
  return new URLSearchParams(params).toString()
}

// ── 處理單一事件 ─────────────────────────────────────────────────
async function handleEvent(event: Record<string, unknown>) {
  const replyToken = event.replyToken as string

  // 收到一般訊息 → 從頭開始
  if (event.type === "message") {
    const step = STEPS.age
    await reply(replyToken, [
      {
        type: "text",
        text: step.text,
        quickReply: quickReply(
          step.choices.map(({ label, value }) => ({
            label,
            data: buildData({ step: step.nextStep, [step.paramKey]: value }),
          }))
        ),
      },
    ])
    return
  }

  // 收到 postback（用戶點了按鈕）
  if (event.type === "postback") {
    const postback = event.postback as { data: string }
    const params = parseData(postback.data)
    const { step: nextStep, ...accumulated } = params

    // 完成所有步驟 → 產生連結
    if (nextStep === "done") {
      const url = `${SITE_URL}/calculator?${buildData(accumulated)}`
      await reply(replyToken, [
        {
          type: "text",
          text: `✅ 收到！根據你的狀況，幫你找出最相關的補助清單 👇\n\n點下方連結，AI 會從 500+ 筆補助裡整理出你最高機會申請到的項目 💰`,
        },
        {
          type: "template",
          altText: "查看你的補助清單",
          template: {
            type: "buttons",
            text: "點擊開始分析",
            actions: [
              {
                type: "uri",
                label: "🔍 查看我的補助清單",
                uri: url,
              },
            ],
          },
        },
      ])
      return
    }

    // 繼續下一步
    const stepKey = nextStep as StepKey
    const step = STEPS[stepKey]
    if (!step) return

    await reply(replyToken, [
      {
        type: "text",
        text: step.text,
        quickReply: quickReply(
          step.choices.map(({ label, value }) => ({
            label,
            data: buildData({
              ...accumulated,
              step: step.nextStep,
              [step.paramKey]: value,
            }),
          }))
        ),
      },
    ])
  }
}

// ── Webhook 入口 ─────────────────────────────────────────────────
export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("x-line-signature") ?? ""

  if (!validateSignature(body, signature)) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { events } = JSON.parse(body) as { events: Record<string, unknown>[] }

  await Promise.all(events.map(handleEvent))

  return new Response("OK")
}

// LINE webhook 驗證用（首次設定時會發 GET）
export async function GET() {
  return new Response("LINE Bot is running")
}
