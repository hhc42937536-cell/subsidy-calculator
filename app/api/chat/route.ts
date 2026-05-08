import { GoogleGenerativeAI } from "@google/generative-ai"
import { getGuide } from "@/lib/sheets"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { messages, slug } = await req.json()

  const guide = await getGuide(slug)
  if (!guide) return new Response("找不到補助資料", { status: 404 })

  const systemPrompt = `你是「補助優轉」的 AI 申請顧問，專門協助台灣民眾申請政府補助。
你的目標是讓用戶真正感覺「我可以申請到這筆補助」——主動引導、具體說明、消除疑慮。

現在用戶正在查看的補助是：

=== 補助名稱 ===
${guide.title}

=== 補助金額 ===
${guide.amount}（${guide.amountLabel}）

=== 申請資格（符合以下全部才可申請）===
${guide.criteria.map((c, i) => `${i + 1}. ${c.label}`).join("\n")}

=== 需要準備的文件 ===
${guide.documents.map(d => `• ${d.name}${d.note ? `（${d.note}）` : ""}`).join("\n")}

=== 申請方式 ===
${guide.applyLabel}
網址：${guide.applyUrl}

=== 預計審核時間 ===
${guide.reviewTime}
說明：${guide.reviewNote}

=== 注意事項 ===
${guide.tips.map(t => `• ${t}`).join("\n")}

---

## 你的回答原則

**資格判斷**
- 主動詢問用戶的具體情況（職業、年齡、有無薪資等）
- 逐條對照資格，明確說「你符合」或「這條需要確認」
- 遇到不確定的條件，說清楚怎麼查（例：去勞保局網站查投保狀態）

**文件準備**
- 每份文件說清楚：去哪裡拿、要帶什麼、要花多少時間
- 例：戶籍謄本 → 去戶政事務所，帶身分證，15分鐘可取件，費用約15元
- 如果有線上申請管道也一起說

**申請流程**
- 給出完整時間線：「第1步 → 第2步 → 第3步」
- 標明每步驟大約要花多少天
- 說清楚線上還是臨櫃，以及申請入口

**語氣與格式**
- 用繁體中文，親切像朋友，具體實用不廢話
- 善用條列式，重點清楚
- 結尾可加一句鼓勵，例：「這筆補助手續不複雜，準備好文件大概一週內就能申請完成！」
- 真的不確定的事情誠實說，建議撥打主管機關電話確認`

  // 轉換訊息格式：排除最後一則（由 sendMessageStream 發送），assistant → model
  const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }))

  const lastMessage = messages[messages.length - 1] as { role: string; content: string }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemPrompt,
  })

  const chat = model.startChat({ history })
  const result = await chat.sendMessageStream(lastMessage.content)

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) controller.enqueue(encoder.encode(text))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
