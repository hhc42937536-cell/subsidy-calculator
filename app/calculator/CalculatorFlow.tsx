"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import personas from "@/data/personas.json"
import ownerData from "@/data/owner-data.json"

type PersonaId = (typeof personas)[number]["id"] | "owner"
type IndustryKey = keyof typeof ownerData.data

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  學生:  { bg: "#EEEDFE", color: "#3C3489" },
  就業:  { bg: "#E6F1FB", color: "#0C447C" },
  育兒:  { bg: "#E1F5EE", color: "#085041" },
  租屋:  { bg: "#FBEAF0", color: "#72243E" },
  長者:  { bg: "#FAEEDA", color: "#633806" },
  企業主:{ bg: "#FAECE7", color: "#712B13" },
}

const PERSONA_CATEGORY: Record<string, string> = {
  student: "學生", worker: "就業", newparent: "育兒",
  renter: "租屋", elder: "長者", owner: "企業主",
}

function CategoryBadge({ label }: { label: string }) {
  const c = CATEGORY_COLORS[label] ?? { bg: "#F1F5F9", color: "#475569" }
  return (
    <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "6px", background: c.bg, color: c.color }}>
      {label}
    </span>
  )
}

function CalculatorInner() {
  const params = useSearchParams()
  const preselect = params.get("persona") as PersonaId | null

  const [step, setStep] = useState<1 | 2>(preselect ? 2 : 1)
  const [selected, setSelected] = useState<PersonaId>(preselect ?? "student")
  const [industry, setIndustry] = useState<IndustryKey>(ownerData.defaultIndustry as IndustryKey)
  const [city, setCity] = useState(ownerData.defaultCity)

  useEffect(() => {
    if (preselect) { setSelected(preselect); setStep(2) }
  }, [preselect])

  const isOwner = selected === "owner"
  const persona = !isOwner ? personas.find(p => p.id === selected)! : null
  const ownerCurrent = ownerData.data[industry]

  const avatar    = isOwner ? ownerData.avatar : persona!.avatar
  const name      = isOwner ? `老闆，${city}，員工 8 人` : persona!.name
  const tags      = isOwner
    ? [{ text: industry, bg: "#FAECE7", color: "#712B13" }, ...ownerData.baseTags, { text: city, bg: "#EAF3DE", color: "#27500A" }]
    : persona!.tags
  const story     = isOwner ? ownerCurrent.story : persona!.story
  const subsidies = isOwner
    ? [...ownerCurrent.subsidies.map(s => ({ ...s, amtColor: "#059669" })),
       { barColor: "#7F77DD", name: `地方 SBIR（${city}加碼）`, how: `設籍${city}企業 → ${city}產業局申請`, amount: "額外加碼", amtColor: "#059669" }]
    : persona!.subsidies
  const total     = isOwner ? ownerData.total : persona!.total
  const chips     = isOwner ? ownerData.chips : persona!.chips

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Progress header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "1rem 1.5rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
            <Link href="/" style={{ fontSize: "13px", color: "#64748B", textDecoration: "none" }}>← 回首頁</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700,
                background: step === 1 ? "#0F172A" : "#10B981",
                color: "#fff",
              }}>{step === 1 ? "1" : "✓"}</div>
              <span style={{ fontSize: "13px", fontWeight: step === 1 ? 600 : 400, color: step === 1 ? "#0F172A" : "#10B981" }}>選擇情境</span>
            </div>
            <div style={{ flex: 1, height: "1px", background: step === 2 ? "#10B981" : "#E2E8F0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 700,
                background: step === 2 ? "#0F172A" : "#E2E8F0",
                color: step === 2 ? "#fff" : "#94A3B8",
              }}>2</div>
              <span style={{ fontSize: "13px", fontWeight: step === 2 ? 600 : 400, color: step === 2 ? "#0F172A" : "#94A3B8" }}>試算結果</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        {/* ── Step 1: 選情境 ── */}
        {step === 1 && (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem", letterSpacing: "-0.03em" }}>
                哪一個最像你？
              </h1>
              <p style={{ fontSize: "14px", color: "#64748B" }}>選擇你的主要生活情境，我們幫你找出可申請的補助。</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", marginBottom: "2rem" }}>
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelected(p.id as PersonaId); setStep(2) }}
                  style={{
                    background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "14px",
                    padding: "1.25rem", cursor: "pointer", textAlign: "left",
                    transition: "border-color .15s, box-shadow .15s, transform .1s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = "#10B981"
                    el.style.boxShadow = "0 4px 16px rgba(16,185,129,0.12)"
                    el.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = "#E2E8F0"
                    el.style.boxShadow = "none"
                    el.style.transform = "translateY(0)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: p.avatar.bg, color: p.avatar.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", fontWeight: 700, flexShrink: 0 }}>{p.avatar.char}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "3px" }}>{p.tab}</div>
                      <CategoryBadge label={PERSONA_CATEGORY[p.id]} />
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "0.75rem", lineHeight: 1.5 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "#047857", letterSpacing: "-0.03em" }}>{p.total.amount}</span>
                    <span style={{ fontSize: "11px", color: "#94A3B8" }}>/ 年</span>
                  </div>
                </button>
              ))}

              {/* Owner card */}
              <button
                onClick={() => { setSelected("owner"); setStep(2) }}
                style={{
                  background: "#fff", border: "1.5px solid #E2E8F0", borderRadius: "14px",
                  padding: "1.25rem", cursor: "pointer", textAlign: "left",
                  transition: "border-color .15s, box-shadow .15s, transform .1s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = "#10B981"
                  el.style.boxShadow = "0 4px 16px rgba(16,185,129,0.12)"
                  el.style.transform = "translateY(-2px)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = "#E2E8F0"
                  el.style.boxShadow = "none"
                  el.style.transform = "translateY(0)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: ownerData.avatar.bg, color: ownerData.avatar.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", fontWeight: 700, flexShrink: 0 }}>{ownerData.avatar.char}</div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "3px" }}>{ownerData.tab}</div>
                    <CategoryBadge label="企業主" />
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "0.75rem", lineHeight: 1.5 }}>小企業主 / 老闆</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "#047857", letterSpacing: "-0.03em" }}>{ownerData.total.amount}</span>
                  <span style={{ fontSize: "11px", color: "#94A3B8" }}>/ 年</span>
                </div>
              </button>
            </div>
          </>
        )}

        {/* ── Step 2: 結果 ── */}
        {step === 2 && (
          <>
            <button
              onClick={() => setStep(1)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#64748B", marginBottom: "1.5rem", padding: 0, display: "flex", alignItems: "center", gap: "4px" }}
            >
              ← 重新選擇情境
            </button>

            {/* Owner selectors */}
            {isOwner && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "1.5rem", padding: "1rem 1.25rem", background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600 }}>產業別</span>
                  <select value={industry} onChange={e => setIndustry(e.target.value as IndustryKey)} style={{ padding: "6px 10px", fontSize: "13px", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#fff", color: "#0F172A", cursor: "pointer" }}>
                    {ownerData.industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: 600 }}>公司所在地</span>
                  <select value={city} onChange={e => setCity(e.target.value)} style={{ padding: "6px 10px", fontSize: "13px", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#fff", color: "#0F172A", cursor: "pointer" }}>
                    {ownerData.cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1.75rem", padding: "1.25rem 1.5rem", background: "#fff", border: "1px solid #E2E8F0", borderRadius: "14px" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: avatar.bg, color: avatar.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 700, flexShrink: 0 }}>{avatar.char}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "16px", fontWeight: 600, color: "#0F172A", marginBottom: "6px" }}>{name}</div>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {tags.map(t => (
                    <span key={t.text} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: t.bg, color: t.color, fontWeight: 500 }}>{t.text}</span>
                  ))}
                </div>
              </div>
              <span style={{ background: "#ECFDF5", color: "#047857", fontSize: "11px", fontWeight: 600, padding: "5px 12px", borderRadius: "8px", border: "1px solid #D1FAE5", flexShrink: 0 }}>符合資格</span>
            </div>

            {/* Story */}
            <div style={{ fontSize: "14px", color: "#475569", lineHeight: 1.8, marginBottom: "1.75rem", padding: "1.25rem 1.5rem", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px" }}
              dangerouslySetInnerHTML={{ __html: story }} />

            {/* Subsidies */}
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>你可以申請的補助</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.75rem" }}>
              {subsidies.map(sub => (
                <div key={sub.name} style={{
                  background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px",
                  padding: "14px 16px", display: "flex", alignItems: "center", gap: "14px",
                }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    background: sub.barColor + "18", border: `1px solid ${sub.barColor}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: sub.barColor }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A", marginBottom: "3px" }}>{sub.name}</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.5 }}>{sub.how}</div>
                    {"applyPath" in sub && (sub as { applyPath?: string }).applyPath && (
                      <Link href={(sub as { applyPath: string }).applyPath} style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        marginTop: "6px", fontSize: "12px", fontWeight: 600, color: "#10B981",
                        textDecoration: "none", padding: "4px 10px",
                        background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "6px",
                      }}>
                        申請懶人包 →
                      </Link>
                    )}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#059669", whiteSpace: "nowrap" }} className="tabular">{sub.amount}</div>
                    <div style={{ fontSize: "10px", color: "#94A3B8", marginTop: "2px" }}>公開資料</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 22px", background: total.bg, borderRadius: "14px",
              marginBottom: "1.75rem", border: `1px solid ${total.labelColor}22`,
            }}>
              <span style={{ fontSize: "14px", fontWeight: 500, color: total.labelColor }}>{total.label}</span>
              <span style={{ fontSize: "32px", fontWeight: 800, color: total.labelColor, letterSpacing: "-0.04em" }} className="tabular">{total.amount}</span>
            </div>

            {/* Chips */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}>你也是這種情況嗎？</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {chips.map((chip, i) => {
                  const personaId = !isOwner ? selected : "owner"
                  const href = i === 0 ? `/calculator?persona=${personaId}` : "/calculator"
                  return (
                    <Link key={chip} href={href} style={{
                      padding: "8px 16px", fontSize: "13px", borderRadius: "20px",
                      border: "1px solid #E2E8F0", background: "#fff", color: "#475569",
                      textDecoration: "none", transition: "all .15s",
                    }}>{chip}</Link>
                  )
                })}
              </div>
            </div>

            {/* Restart */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: "none", color: "#64748B", border: "1px solid #E2E8F0",
                  borderRadius: "10px", padding: "10px 24px", fontSize: "14px",
                  cursor: "pointer", fontWeight: 500,
                }}
              >
                換一個情境試算
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function CalculatorFlow() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center", color: "#94A3B8" }}>載入中...</div>}>
      <CalculatorInner />
    </Suspense>
  )
}
