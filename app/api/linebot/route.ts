import { createHmac } from "crypto"
import fs from "fs"
import path from "path"
import Papa from "papaparse"

export const runtime = "nodejs"

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET!
const CHANNEL_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN!
const SITE_URL = "https://subsidy-calculator-six.vercel.app"

// ── LINE API ─────────────────────────────────────────────────────────────────

function validateSignature(body: string, sig: string) {
  const hash = createHmac("sha256", CHANNEL_SECRET).update(body).digest("base64")
  return hash === sig
}

async function reply(replyToken: string, messages: object[]) {
  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${CHANNEL_TOKEN}` },
    body: JSON.stringify({ replyToken, messages }),
  })
}

// ── 補助資料載入與篩選 ────────────────────────────────────────────────────────

type Subsidy = Record<string, string> & { min_age: number; max_age: number }

let _cache: Subsidy[] | null = null

function loadSubsidies(): Subsidy[] {
  if (_cache) return _cache
  try {
    const csvPath = path.join(process.cwd(), "data", "subsidies-v2.csv")
    const raw = fs.readFileSync(csvPath, "utf-8")
    const { data: rows } = Papa.parse<Record<string, string>>(raw, { header: true, skipEmptyLines: true })
    _cache = rows.map((r: Record<string, string>) => ({
      ...r,
      min_age: parseInt(r.min_age || "0") || 0,
      max_age: parseInt(r.max_age || "0") || 0,
    }))
    return _cache!
  } catch (e) {
    console.error("CSV load error:", e)
    return []
  }
}

const BIZ_TITLE_KW = ["（企業）", "（雇主）", "數位轉型", "節能設備", "綠能發電", "出口拓銷", "SBIR", "信用保證貸款"]
const BIZ_IDENT_KW = ["企業", "公司", "雇主", "僱主", "法人"]

const IDENT_KW: Record<string, string[]> = {
  "低收入":  ["低收入", "中低收入", "弱勢"],
  "身障":    ["身心障礙", "身障"],
  "原住民":  ["原住民"],
  "新住民":  ["新住民"],
  "中高齡":  ["中高齡", "中壯年"],
}
const INCOME_KW: Record<string, string[]> = {
  "低收入": ["低收入", "中低收入"],
}
const WORK_KW: Record<string, string[]> = {
  "失業": ["失業", "求職", "就業"],
  "農漁業": ["農", "漁"],
  "學生": ["學生"],
  "退休": ["銀髮", "老人", "長者"],
}
const FAMILY_KW: Record<string, string[]> = {
  "有子女": ["有子女", "幼兒", "子女", "生育", "育兒", "托育"],
  "單親": ["單親"],
  "照顧長輩": ["長照", "照顧"],
}
const AGE_MAP: Record<string, [number, number]> = {
  "18以下":  [0,  18],
  "18-29":   [18, 29],
  "30-44":   [30, 44],
  "45-59":   [45, 59],
  "60以上":  [60, 999],
}

function estimateAnnual(amount: string): number {
  const nums = [...amount.matchAll(/\d+/g)].map(m => parseInt(m[0]))
  if (!nums.length) return 0
  const n = Math.max(...nums)
  if (n > 500000) return 0
  return amount.includes("月") ? n * 12 : n
}

function filterSubsidies(answers: Record<string, string>): Subsidy[] {
  const [ageMin, ageMax] = AGE_MAP[answers.age] ?? [0, 999]
  const identKws  = IDENT_KW[answers.identity] ?? []
  const incomeKws = INCOME_KW[answers.identity] ?? []
  const workKws   = WORK_KW[answers.work] ?? []
  const familyKws = FAMILY_KW[answers.family] ?? []
  const isBizEligible = answers.work === "自營" || answers.work === "農漁業"

  const scored: [number, Subsidy][] = []

  for (const s of loadSubsidies()) {
    let score = 0
    const sCity   = s.city || "全國"
    const sIdent  = s.eligible_identity || ""
    const sIncome = s.income_limit || "一般"
    const sFamily = s.family_status || ""
    const sTitle  = s.title || ""
    const sCat    = s.category || ""

    const isBiz = BIZ_IDENT_KW.some(k => sIdent.includes(k)) ||
                  BIZ_TITLE_KW.some(k => sTitle.includes(k))
    if (isBiz && !isBizEligible) continue

    if (sCity !== "全國" && answers.city && !sCity.includes(answers.city)) continue
    if (s.min_age > 0 && ageMax < s.min_age) continue
    if (s.max_age > 0 && ageMin > s.max_age) continue

    if (sIncome && !["一般", ""].includes(sIncome) && !incomeKws.some(k => sIncome.includes(k))) continue

    if (sFamily) {
      const match = familyKws.some(k => sFamily.includes(k))
      if (!match && !(answers.family === "有子女" && ["育兒", "生育"].some(k => sCat.includes(k)))) continue
    }

    if (sIdent && !["一般民眾", "有子女者", ""].includes(sIdent)) {
      if (![...identKws, ...workKws].some(k => sIdent.includes(k))) continue
    }

    if ([...identKws, ...workKws].some(k => sIdent.includes(k))) score += 4
    if (sFamily && familyKws.some(k => sFamily.includes(k))) score += 3
    const annual = estimateAnnual(s.amount || "")
    if (annual >= 60000) score += 2
    else if (annual >= 20000) score += 1

    scored.push([score, s])
  }

  return scored
    .sort(([a, sa], [b, sb]) => b - a || estimateAnnual(sb.amount) - estimateAnnual(sa.amount))
    .slice(0, 8)
    .map(([, s]) => s)
}

// ── Flex 卡片 ────────────────────────────────────────────────────────────────

const CAT_EMOJI: Record<string, string> = {
  "租屋住宅": "🏠", "育兒生育": "👶", "就業創業": "💼",
  "教育學習": "🎓", "醫療健康": "🏥", "身心障礙": "♿",
  "長照照顧": "👴", "農業漁業": "🌾", "稅務節稅": "💰",
}
function catEmoji(cat: string) {
  for (const [k, v] of Object.entries(CAT_EMOJI)) if (cat.includes(k)) return v
  return "💰"
}

function subsidyBubble(s: Subsidy) {
  const emoji = catEmoji(s.category)
  const annual = estimateAnnual(s.amount)
  const amtText = annual ? `$${annual.toLocaleString()}/年` : s.amount
  const applyUrl = s.apply_url || SITE_URL
  const desc = (s.description || "").slice(0, 55) + "…"

  return {
    type: "bubble", size: "kilo",
    header: {
      type: "box", layout: "vertical", backgroundColor: "#1B4332", paddingAll: "14px",
      contents: [
        { type: "text", text: emoji, size: "xxl", align: "center" },
        { type: "text", text: s.category, size: "xxs", color: "#74C69D", align: "center", margin: "sm" },
      ],
    },
    body: {
      type: "box", layout: "vertical", spacing: "sm", paddingAll: "14px",
      contents: [
        { type: "text", text: s.title, weight: "bold", size: "sm", wrap: true, maxLines: 2 },
        { type: "text", text: s.agency, size: "xxs", color: "#888888" },
        { type: "text", text: amtText, weight: "bold", color: "#2D9B5A", size: "lg", margin: "md" },
        { type: "text", text: desc, size: "xxs", color: "#666666", wrap: true, maxLines: 3, margin: "sm" },
      ],
    },
    footer: {
      type: "box", layout: "vertical", paddingAll: "10px",
      contents: [{
        type: "button", style: "primary", color: "#2D6A4F", height: "sm",
        action: { type: "uri", label: "查看申請方式", uri: applyUrl },
      }],
    },
  }
}

function buildResultMessages(answers: Record<string, string>) {
  const subsidies = filterSubsidies(answers)
  if (!subsidies.length) {
    return [{ type: "text", text: "😔 找不到完全符合的補助，請點「重新開始」重新填答。" }]
  }
  const total = subsidies.reduce((s, sub) => s + estimateAnnual(sub.amount), 0)
  return [
    {
      type: "text",
      text: `🎉 根據你的條件找到 ${subsidies.length} 項補助\n\n💰 每年估計可領／省下\n   $${total.toLocaleString()}+`,
    },
    {
      type: "flex", altText: `找到 ${subsidies.length} 項補助`,
      contents: { type: "carousel", contents: subsidies.map(subsidyBubble) },
    },
    { type: "text", text: "👆 左右滑動查看每項補助\n點「查看申請方式」直接前往申請頁\n\n輸入「重新開始」可重新試算" },
  ]
}

// ── 教育宣導內容 ──────────────────────────────────────────────────────────────

function buildLeakFacts() {
  return [{
    type: "flex", altText: "你可能正在漏領補助",
    contents: {
      type: "bubble", size: "mega",
      header: {
        type: "box", layout: "vertical", backgroundColor: "#0D1F3C", paddingAll: "20px",
        contents: [
          { type: "text", text: "💸 你可能正在漏領補助", color: "#F5A623", weight: "bold", size: "lg" },
          { type: "text", text: "幾個讓人驚訝的真相", color: "#8AB4E8", size: "sm", margin: "sm" },
        ],
      },
      body: {
        type: "box", layout: "vertical", spacing: "lg", paddingAll: "18px",
        contents: [
          factRow("😱", "9 成台灣人", "不知道自己符合至少 1 項政府補助的申請資格"),
          factRow("💰", "平均每人每年", "可以多領或省下 $5 萬～$20 萬，但大多數人從沒申請過"),
          factRow("🏠", "只要有在租屋", "年滿 18 歲就可以申請中央租金補貼，每年最高 $54,000"),
          factRow("👶", "有小孩的家庭", "光是托育 + 育兒津貼，每年就可以多領超過 $10 萬"),
          factRow("💼", "失業中？", "不只有失業給付，還有職業訓練津貼、就業獎勵金等 5+ 項"),
          factRow("📋", "申請不難", "大部分補助都可以線上申請，填個表就能領"),
        ],
      },
      footer: {
        type: "box", layout: "vertical", paddingAll: "14px", spacing: "sm",
        contents: [
          { type: "button", style: "primary", color: "#1B5E20",
            action: { type: "message", label: "🎯 30 秒算我能領多少", text: "開始" } },
          { type: "button", style: "secondary",
            action: { type: "message", label: "📋 看身邊人都在領啥", text: "補助情境" } },
        ],
      },
    },
  }]
}

function factRow(emoji: string, title: string, desc: string) {
  return {
    type: "box", layout: "horizontal", spacing: "md",
    contents: [
      { type: "text", text: emoji, size: "xl", flex: 0 },
      { type: "box", layout: "vertical", flex: 1, contents: [
        { type: "text", text: title, weight: "bold", size: "sm", color: "#F5A623" },
        { type: "text", text: desc, size: "xs", color: "#CCCCCC", wrap: true },
      ]},
    ],
  }
}

function buildWhatIsSubsidy() {
  return [{
    type: "flex", altText: "補助是什麼？3分鐘快速了解",
    contents: {
      type: "bubble", size: "mega",
      header: {
        type: "box", layout: "vertical", backgroundColor: "#0D2B1A", paddingAll: "20px",
        contents: [
          { type: "text", text: "📖 補助是什麼？", color: "#74C69D", weight: "bold", size: "xl" },
          { type: "text", text: "3 分鐘快速了解，從此不再錯過", color: "#8AB4E8", size: "sm", margin: "sm" },
        ],
      },
      body: {
        type: "box", layout: "vertical", spacing: "xl", paddingAll: "18px",
        contents: [
          eduSection("政府補助是什麼？",
            "政府每年撥出預算，針對特定條件的民眾提供現金補貼、減免費用或實物協助。只要符合資格就可以申請，不需要任何關係或背景。"),
          { type: "separator", color: "#1C4030", margin: "md" },
          eduSection("哪些人可以申請？", "比你想的多！只要設籍台灣幾乎都符合至少一項："),
          {
            type: "box", layout: "baseline", spacing: "sm", margin: "sm",
            contents: ["🏠 租屋族","👶 有小孩","🎓 在學生","💼 上班族","🔍 失業者","👴 長輩","♿ 身障"].map(t => ({
              type: "text", text: t, size: "xs", color: "#74C69D", flex: 0,
            })),
          },
          { type: "separator", color: "#1C4030", margin: "md" },
          eduSection("常見補助類型", ""),
          ...[
            ["🏠","租屋住宅","租金補貼、社會住宅、修繕補助"],
            ["👶","育兒生育","育兒津貼、托育補助、生育給付"],
            ["💼","就業創業","失業給付、就業獎勵、職訓津貼"],
            ["🎓","教育學習","學費補助、獎學金、助學貸款"],
            ["💰","稅務節稅","報稅扣除額、退稅、稅額抵減"],
          ].map(([e, t, d]) => ({
            type: "box", layout: "horizontal", spacing: "sm",
            contents: [
              { type: "text", text: e, size: "md", flex: 0 },
              { type: "text", text: t, size: "sm", weight: "bold", flex: 2, color: "#FFFFFF" },
              { type: "text", text: d, size: "xs", flex: 4, color: "#AAAAAA", wrap: true },
            ],
          })),
        ],
      },
      footer: {
        type: "box", layout: "vertical", paddingAll: "14px",
        contents: [{
          type: "button", style: "primary", color: "#1B5E20",
          action: { type: "message", label: "🎯 算算我能領多少", text: "開始" },
        }],
      },
    },
  }]
}

function eduSection(title: string, body: string) {
  const contents: object[] = [{ type: "text", text: title, weight: "bold", size: "md", color: "#FFFFFF" }]
  if (body) contents.push({ type: "text", text: body, size: "sm", color: "#BBBBBB", wrap: true, margin: "sm" })
  return { type: "box", layout: "vertical", contents }
}

// ── 情境選單 ──────────────────────────────────────────────────────────────────

const SCENARIOS = [
  { label: "🧑‍🎓 大學生",   answers: { age:"18-29", city:"台北市", work:"學生",  family:"單身",  identity:"一般" } },
  { label: "🧑‍💼 上班族",   answers: { age:"30-44", city:"台北市", work:"受僱",  family:"單身",  identity:"一般" } },
  { label: "👩‍🍼 新手媽媽", answers: { age:"30-44", city:"台北市", work:"受僱",  family:"有子女",identity:"一般" } },
  { label: "🏡 租屋青年",   answers: { age:"18-29", city:"台北市", work:"受僱",  family:"單身",  identity:"一般" } },
  { label: "🔍 剛失業",     answers: { age:"30-44", city:"台北市", work:"失業",  family:"單身",  identity:"一般" } },
  { label: "🧑‍🦽 身心障礙", answers: { age:"30-44", city:"台北市", work:"受僱",  family:"單身",  identity:"身障" } },
  { label: "⭐ 低收入戶",   answers: { age:"30-44", city:"台北市", work:"失業",  family:"單身",  identity:"低收入" } },
  { label: "🚀 準創業家",   answers: { age:"30-44", city:"台北市", work:"自營",  family:"單身",  identity:"一般" } },
  { label: "👴 65歲長者",   answers: { age:"60以上", city:"台北市", work:"退休", family:"單身",  identity:"一般" } },
  { label: "👩 單親媽媽",   answers: { age:"30-44", city:"台北市", work:"受僱",  family:"單親",  identity:"一般" } },
]

function buildScenarios() {
  return [{
    type: "text",
    text: "📋 選一個跟你最像的情境，馬上看你能領什麼 👇",
    quickReply: {
      items: SCENARIOS.map((s, i) => ({
        type: "action",
        action: { type: "message", label: s.label, text: `情境:${i}` },
      })),
    },
  }]
}

function buildScenarioResult(key: string) {
  const idx = parseInt(key)
  const scenario = SCENARIOS[idx]
  if (!scenario) return [{ type: "text", text: "找不到此情境，請重新選擇。" }]
  const subsidies = filterSubsidies(scenario.answers)
  if (!subsidies.length) return [{ type: "text", text: `😔 ${scenario.label} 目前沒有找到符合的補助。` }]
  const total = subsidies.reduce((s, sub) => s + estimateAnnual(sub.amount), 0)
  return [
    { type: "text", text: `📋 ${scenario.label} 可以申請的補助\n共 ${subsidies.length} 項，估計每年 $${total.toLocaleString()}+` },
    { type: "flex", altText: `${scenario.label}補助清單`,
      contents: { type: "carousel", contents: subsidies.map(subsidyBubble) } },
  ]
}

// ── 問卷流程 ──────────────────────────────────────────────────────────────────

const STEPS = {
  age: {
    text: "👋 你好！我是補助優轉小幫手\n\n幫你從 500+ 筆補助裡找出最適合你的。\n先問 5 個問題，30 秒搞定 🎯\n\n📌 你的年齡範圍？",
    choices: [
      { label: "18 歲以下", value: "18以下" }, { label: "18–29 歲", value: "18-29" },
      { label: "30–44 歲", value: "30-44" },   { label: "45–59 歲", value: "45-59" },
      { label: "60 歲以上", value: "60以上" },
    ],
    nextStep: "city", paramKey: "age",
  },
  city: {
    text: "📍 你住在哪個縣市？",
    choices: [
      { label: "台北市", value: "台北市" }, { label: "新北市", value: "新北市" },
      { label: "桃園市", value: "桃園市" }, { label: "台中市", value: "台中市" },
      { label: "台南市", value: "台南市" }, { label: "高雄市", value: "高雄市" },
      { label: "其他縣市", value: "其他" },
    ],
    nextStep: "work", paramKey: "city",
  },
  work: {
    text: "💼 目前的工作狀況？",
    choices: [
      { label: "受僱上班族", value: "受僱" }, { label: "自營／接案", value: "自營" },
      { label: "失業中", value: "失業" },     { label: "學生", value: "學生" },
      { label: "退休", value: "退休" },       { label: "農漁業", value: "農漁業" },
    ],
    nextStep: "family", paramKey: "work",
  },
  family: {
    text: "👨‍👩‍👧 家庭狀況？",
    choices: [
      { label: "單身", value: "單身" },         { label: "已婚、無小孩", value: "已婚無子" },
      { label: "有小孩", value: "有子女" },     { label: "單親", value: "單親" },
      { label: "照顧長輩", value: "照顧長輩" },
    ],
    nextStep: "identity", paramKey: "family",
  },
  identity: {
    text: "🪪 有以下特殊身份嗎？（選最主要的一項）",
    choices: [
      { label: "一般民眾", value: "一般" },   { label: "低／中低收入戶", value: "低收入" },
      { label: "身心障礙", value: "身障" },   { label: "原住民族", value: "原住民" },
      { label: "新住民", value: "新住民" },   { label: "中高齡（45+）", value: "中高齡" },
    ],
    nextStep: "done", paramKey: "identity",
  },
} as const

type StepKey = keyof typeof STEPS

function buildData(params: Record<string, string>) {
  return new URLSearchParams(params).toString()
}

function parseData(data: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(data))
}

function startQuiz() {
  const step = STEPS.age
  return [{
    type: "text", text: step.text,
    quickReply: {
      items: step.choices.map(({ label, value }) => ({
        type: "action",
        action: { type: "postback", label, data: buildData({ step: step.nextStep, [step.paramKey]: value }), displayText: label },
      })),
    },
  }]
}

// ── 主路由 ────────────────────────────────────────────────────────────────────

async function handleEvent(event: Record<string, unknown>) {
  const replyToken = event.replyToken as string

  // 文字訊息（Rich Menu 觸發）
  if (event.type === "message") {
    const text = ((event.message as Record<string, unknown>)?.text as string || "").trim()
    if (text === "漏領")         return reply(replyToken, buildLeakFacts())
    if (text === "補助是什麼")   return reply(replyToken, buildWhatIsSubsidy())
    if (text === "補助情境")     return reply(replyToken, buildScenarios())
    if (text.startsWith("情境:")) return reply(replyToken, buildScenarioResult(text.slice(3)))
    // 開始 / 重新開始 / 任何其他訊息 → 進問卷
    return reply(replyToken, startQuiz())
  }

  // postback（問卷答題）
  if (event.type === "postback") {
    const postback = event.postback as { data: string }
    const params = parseData(postback.data)
    const { step: nextStep, ...accumulated } = params

    // 完成 → 即時篩選顯示結果
    if (nextStep === "done") {
      return reply(replyToken, buildResultMessages(accumulated))
    }

    const step = STEPS[nextStep as StepKey]
    if (!step) return
    return reply(replyToken, [{
      type: "text", text: step.text,
      quickReply: {
        items: step.choices.map(({ label, value }) => ({
          type: "action",
          action: { type: "postback", label, displayText: label,
            data: buildData({ ...accumulated, step: step.nextStep, [step.paramKey]: value }) },
        })),
      },
    }])
  }

  // 加入好友
  if (event.type === "follow") {
    return reply(replyToken, buildLeakFacts())
  }
}

// ── Webhook 入口 ──────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const body = await req.text()
  const { events } = JSON.parse(body) as { events: Record<string, unknown>[] }
  if (events.length === 0) return new Response("OK")
  const sig = req.headers.get("x-line-signature") ?? ""
  if (!validateSignature(body, sig)) return new Response("Unauthorized", { status: 401 })
  await Promise.all(events.map(handleEvent))
  return new Response("OK")
}

export async function GET() {
  const count = loadSubsidies().length
  return new Response(`LINE Bot OK — ${count} subsidies loaded`)
}
