"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import type { SubsidyGuide } from "@/lib/sheets"

type Message = { role: "user" | "assistant"; content: string }

function AiChat({ guide }: { guide: SubsidyGuide }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: `你好！我是「${guide.title}」的申請顧問 👋\n\n可以告訴我你的情況，我幫你判斷是否符合資格、需要準備哪些文件，以及完整的申請流程。\n\n你想先問什麼？`,
      }])
    }
  }, [open, guide.title, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput("")

    const next: Message[] = [...messages, { role: "user", content: text }]
    setMessages(next)
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, slug: guide.slug }),
      })
      if (!res.ok) throw new Error("API error")

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let assistantText = ""

      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: "assistant", content: assistantText }
          return updated
        })
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "抱歉，暫時無法連線。請稍後再試，或直接撥打主管機關電話詢問。" }])
    } finally {
      setLoading(false)
    }
  }

  const SUGGESTIONS = [
    "我符合資格嗎？",
    "文件去哪裡取得？",
    "申請流程是什麼？",
    "審核後多久會收到錢？",
  ]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100,
          background: "#0F172A", color: "#fff",
          border: "none", borderRadius: "28px",
          padding: "0 22px", height: "52px",
          fontSize: "14px", fontWeight: 600,
          cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
          boxShadow: "0 8px 32px rgba(15,23,42,0.25)",
          transition: "transform .15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: "18px" }}>🤖</span>
        問 AI 顧問
      </button>

      {/* Chat drawer */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          background: "rgba(15,23,42,0.5)",
        }} onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div style={{
            background: "#fff", width: "100%", maxWidth: "640px",
            height: "85vh", borderRadius: "20px 20px 0 0",
            display: "flex", flexDirection: "column",
            boxShadow: "0 -8px 40px rgba(15,23,42,0.15)",
          }}>
            {/* Header */}
            <div style={{
              padding: "1rem 1.25rem", borderBottom: "1px solid #F1F5F9",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A" }}>AI 申請顧問</div>
                <div style={{ fontSize: "12px", color: "#64748B" }}>{guide.title}</div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: "#F1F5F9", border: "none", borderRadius: "50%",
                width: "32px", height: "32px", cursor: "pointer",
                fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
              }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "12px" }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                    background: m.role === "user" ? "#0F172A" : "#F8FAFC",
                    color: m.role === "user" ? "#fff" : "#0F172A",
                    fontSize: "14px", lineHeight: 1.65,
                    border: m.role === "assistant" ? "1px solid #E2E8F0" : "none",
                    whiteSpace: "pre-wrap",
                  }}>
                    {m.content || <span style={{ opacity: 0.4 }}>▌</span>}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div style={{ display: "flex" }}>
                  <div style={{ padding: "10px 14px", background: "#F8FAFC", borderRadius: "4px 16px 16px 16px", border: "1px solid #E2E8F0", fontSize: "14px", color: "#94A3B8" }}>
                    思考中...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions (only on first message) */}
            {messages.length === 1 && (
              <div style={{ padding: "0 1.25rem 0.75rem", display: "flex", gap: "6px", flexWrap: "wrap", flexShrink: 0 }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => { setInput(s); setTimeout(() => send(), 0) }}
                    style={{
                      padding: "6px 12px", fontSize: "12px", borderRadius: "20px",
                      border: "1px solid #E2E8F0", background: "#F8FAFC", color: "#475569",
                      cursor: "pointer",
                    }}>{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: "0.75rem 1rem 1rem", borderTop: "1px solid #F1F5F9",
              display: "flex", gap: "8px", flexShrink: 0,
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="輸入問題，例如：我是上班族，符合資格嗎？"
                style={{
                  flex: 1, padding: "10px 14px", fontSize: "14px",
                  border: "1px solid #E2E8F0", borderRadius: "12px",
                  outline: "none", background: "#F8FAFC",
                }}
              />
              <button onClick={send} disabled={!input.trim() || loading} style={{
                background: loading || !input.trim() ? "#E2E8F0" : "#10B981",
                color: loading || !input.trim() ? "#94A3B8" : "#fff",
                border: "none", borderRadius: "12px",
                padding: "0 18px", fontSize: "14px", fontWeight: 600,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                flexShrink: 0,
              }}>送出</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function ApplyContent({ guide }: { guide: SubsidyGuide }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const allChecked = guide.criteria.every(c => checked[c.id])
  const checkedCount = guide.criteria.filter(c => checked[c.id]).length

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Sticky header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "1.25rem 1.5rem", position: "sticky", top: "60px", zIndex: 40 }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Link href="/calculator" style={{ fontSize: "13px", color: "#64748B", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "0.75rem" }}>
            ← 回試算頁面
          </Link>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: guide.color, flexShrink: 0 }} />
                <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>{guide.title}</h1>
              </div>
              <p style={{ fontSize: "13px", color: "#64748B" }}>{guide.subtitle}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#047857", letterSpacing: "-0.04em" }} className="tabular">{guide.amount}</div>
              <div style={{ fontSize: "11px", color: "#94A3B8" }}>{guide.amountLabel}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>

        {/* 1. 資格確認 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>
              <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>1</span>
              資格確認
            </h2>
            <span style={{ fontSize: "12px", color: checkedCount === guide.criteria.length ? "#047857" : "#94A3B8", fontWeight: 500 }}>
              {checkedCount}/{guide.criteria.length} 項符合
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
            {guide.criteria.map(c => (
              <label key={c.id} style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                padding: "14px 16px",
                background: checked[c.id] ? "#F0FDF4" : "#fff",
                border: `1.5px solid ${checked[c.id] ? "#A7F3D0" : "#E2E8F0"}`,
                borderRadius: "12px", cursor: "pointer", transition: "all .15s",
              }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "6px", flexShrink: 0, marginTop: "1px",
                  border: `2px solid ${checked[c.id] ? "#10B981" : "#CBD5E1"}`,
                  background: checked[c.id] ? "#10B981" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s",
                }}>
                  {checked[c.id] && <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                </div>
                <input type="checkbox" style={{ display: "none" }} checked={!!checked[c.id]}
                  onChange={e => setChecked(prev => ({ ...prev, [c.id]: e.target.checked }))} />
                <span style={{ fontSize: "14px", color: "#0F172A", lineHeight: 1.6 }}>{c.label}</span>
              </label>
            ))}
          </div>
          {allChecked && (
            <div style={{ padding: "12px 16px", background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "16px" }}>✅</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#047857" }}>你符合所有基本資格，可以繼續申請！</span>
            </div>
          )}
        </section>

        {/* 2. 文件清單 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>2</span>
            需要準備的文件
          </h2>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
            {guide.documents.map((doc, i) => (
              <div key={doc.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 16px",
                borderBottom: i < guide.documents.length - 1 ? "1px solid #F1F5F9" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px" }}>📄</span>
                  <span style={{ fontSize: "14px", color: "#0F172A", fontWeight: 500 }}>{doc.name}</span>
                </div>
                <span style={{ fontSize: "12px", color: "#94A3B8", flexShrink: 0 }}>{doc.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 申請連結 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>3</span>
            前往申請
          </h2>
          <a href={guide.applyUrl} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 22px", background: "#10B981", borderRadius: "14px",
            textDecoration: "none", color: "#fff",
            boxShadow: "0 4px 20px rgba(16,185,129,0.3)", marginBottom: "8px",
          }}>
            <span style={{ fontSize: "15px", fontWeight: 700 }}>{guide.applyLabel}</span>
            <span style={{ fontSize: "18px" }}>↗</span>
          </a>
          <p style={{ fontSize: "12px", color: "#94A3B8", textAlign: "center" }}>將跳轉至政府官方網站，與本站無關聯</p>
        </section>

        {/* 4. 審核時間 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>4</span>
            預計審核時間
          </h2>
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "22px" }}>⏱</span>
              <span style={{ fontSize: "22px", fontWeight: 700, color: "#0F172A" }}>{guide.reviewTime}</span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.7 }}>{guide.reviewNote}</p>
          </div>
        </section>

        {/* Tips */}
        {guide.tips.length > 0 && (
          <section>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>💡 注意事項</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {guide.tips.map((tip, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "8px",
                  padding: "10px 14px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "8px",
                }}>
                  <span style={{ fontSize: "12px", color: "#92400E", flexShrink: 0, marginTop: "2px" }}>▸</span>
                  <span style={{ fontSize: "13px", color: "#92400E", lineHeight: 1.6 }}>{tip}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <AiChat guide={guide} />
    </div>
  )
}
