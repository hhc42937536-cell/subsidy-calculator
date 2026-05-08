"use client"

import { useState } from "react"
import Link from "next/link"
import personas from "@/data/personas.json"
import ownerData from "@/data/owner-data.json"

type PersonaId = (typeof personas)[number]["id"] | "owner"
type IndustryKey = keyof typeof ownerData.data

const PERSONA_CATEGORY: Record<string, string> = {
  student: "學生", worker: "就業", newparent: "育兒",
  renter: "租屋", elder: "長者", unemployed: "失業",
  disabled: "身障", lowincome: "低收入", startup: "創業",
}

const ALL_PERSONAS = [
  ...personas.map(p => ({
    id: p.id as PersonaId,
    tab: p.tab,
    dotColor: p.dotColor,
    avatar: p.avatar,
    name: p.name,
    tags: p.tags,
    story: p.story,
    subsidies: p.subsidies,
    total: p.total,
    chips: p.chips,
    category: PERSONA_CATEGORY[p.id] ?? "其他",
  })),
]

function CategoryBadge({ label }: { label: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    學生:  { bg: "#EEEDFE", color: "#3C3489" },
    就業:  { bg: "#E6F1FB", color: "#0C447C" },
    育兒:  { bg: "#E1F5EE", color: "#085041" },
    租屋:  { bg: "#FBEAF0", color: "#72243E" },
    長者:  { bg: "#FAEEDA", color: "#633806" },
    企業主:{ bg: "#FAECE7", color: "#712B13" },
    失業:  { bg: "#E6F1FB", color: "#185FA5" },
    身障:  { bg: "#EEEDFE", color: "#534AB7" },
    低收入:{ bg: "#FAEEDA", color: "#854F0B" },
    創業:  { bg: "#FAECE7", color: "#993C1D" },
  }
  const c = colors[label] ?? { bg: "#F1F5F9", color: "#475569" }
  return (
    <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "6px", background: c.bg, color: c.color }}>
      {label}
    </span>
  )
}

export default function PersonaSection() {
  const [selected, setSelected] = useState<PersonaId>("student")
  const [industry, setIndustry] = useState<IndustryKey>(ownerData.defaultIndustry as IndustryKey)
  const [city, setCity] = useState(ownerData.defaultCity)

  const isOwner = selected === "owner"
  const persona = !isOwner ? ALL_PERSONAS.find(p => p.id === selected)! : null
  const ownerCurrent = ownerData.data[industry]

  const displaySubsidies = isOwner
    ? [...ownerCurrent.subsidies.map(s => ({ ...s, amtColor: "#059669" })),
       { barColor: "#7F77DD", name: `地方 SBIR（${city}加碼）`, how: `設籍${city}企業 → ${city}產業局申請`, amount: "額外加碼", amtColor: "#059669" }]
    : persona!.subsidies

  const displayTotal = isOwner ? ownerData.total : persona!.total
  const displayChips = isOwner ? ownerData.chips : persona!.chips
  const displayStory = isOwner ? ownerCurrent.story : persona!.story
  const displayAvatar = isOwner ? ownerData.avatar : persona!.avatar
  const displayName = isOwner ? `老闆，${city}，員工 8 人` : persona!.name
  const displayTags = isOwner
    ? [{ text: industry, bg: "#FAECE7", color: "#712B13" }, ...ownerData.baseTags, { text: city, bg: "#EAF3DE", color: "#27500A" }]
    : persona!.tags

  return (
    <section id="personas" style={{ padding: "4rem 1.5rem", background: "#F8FAFC" }}>
      <div className="section-wrap">

        {/* Section header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#10B981", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>補助情境</div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            選一個跟你最像的情境
          </h2>
          <p style={{ fontSize: "15px", color: "#64748B" }}>點選後查看詳細試算結果</p>
        </div>

        {/* Persona grid */}
        <div className="persona-grid" style={{ marginBottom: "2.5rem" }}>
          {ALL_PERSONAS.map(p => (
            <button
              key={p.id}
              className={`persona-card${selected === p.id ? " selected" : ""}`}
              onClick={() => setSelected(p.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: p.avatar.bg, color: p.avatar.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, flexShrink: 0 }}>{p.avatar.char}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{p.tab}</div>
                  <CategoryBadge label={p.category} />
                </div>
              </div>
              <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "0.75rem", lineHeight: 1.5 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#047857", letterSpacing: "-0.03em" }} className="tabular">{p.total.amount}</span>
                <span style={{ fontSize: "11px", color: "#94A3B8" }}>/ 年</span>
              </div>
            </button>
          ))}

          {/* Owner card */}
          <button
            className={`persona-card${selected === "owner" ? " selected" : ""}`}
            onClick={() => setSelected("owner")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: ownerData.avatar.bg, color: ownerData.avatar.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, flexShrink: 0 }}>{ownerData.avatar.char}</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{ownerData.tab}</div>
                <CategoryBadge label="企業主" />
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "0.75rem", lineHeight: 1.5 }}>小企業主 / 老闆</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#047857", letterSpacing: "-0.03em" }} className="tabular">{ownerData.total.amount}</span>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>/ 年</span>
            </div>
          </button>
        </div>

        {/* Results dashboard */}
        <div style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: "20px",
          padding: "1.75rem",
          boxShadow: "0 4px 32px rgba(15,23,42,0.06)",
        }}>
          {/* Profile row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: displayAvatar.bg, color: displayAvatar.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 700, flexShrink: 0 }}>{displayAvatar.char}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#0F172A", marginBottom: "6px" }}>{displayName}</div>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {displayTags.map(t => (
                  <span key={t.text} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: t.bg, color: t.color, fontWeight: 500 }}>{t.text}</span>
                ))}
              </div>
            </div>
            <span style={{ background: "#ECFDF5", color: "#047857", fontSize: "11px", fontWeight: 600, padding: "5px 12px", borderRadius: "8px", border: "1px solid #D1FAE5", flexShrink: 0 }}>符合資格</span>
          </div>

          {/* Owner selectors */}
          {isOwner && (
            <div className="selector-row" style={{ marginBottom: "1.25rem" }}>
              <div className="sel-group">
                <span className="sel-label">產業別</span>
                <select value={industry} onChange={e => setIndustry(e.target.value as IndustryKey)}>
                  {ownerData.industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="sel-group">
                <span className="sel-label">公司所在地</span>
                <select value={city} onChange={e => setCity(e.target.value)}>
                  {ownerData.cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Story */}
          <div className="story" dangerouslySetInnerHTML={{ __html: displayStory }} style={{ marginBottom: "1.5rem" }} />

          {/* Subsidy items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.25rem" }}>
            {displaySubsidies.map(sub => (
              <div key={sub.name} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 14px", background: "#F8FAFC",
                border: "1px solid #E2E8F0", borderRadius: "10px",
              }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "8px",
                  background: sub.barColor + "18", border: `1px solid ${sub.barColor}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: sub.barColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}>{sub.name}</div>
                  <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "2px" }}>{sub.how}</div>
                  {(sub as unknown as { applyPath?: string }).applyPath && (
                    <Link href={(sub as unknown as { applyPath: string }).applyPath} style={{ fontSize: "11px", color: "#10B981", fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: "4px" }}>
                      申請懶人包 →
                    </Link>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", flexShrink: 0 }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }} className="tabular">{sub.amount}</span>
                  <span style={{ fontSize: "10px", background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0", borderRadius: "4px", padding: "1px 5px" }}>公開資料</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 18px", background: displayTotal.bg, borderRadius: "12px",
            marginBottom: "1.25rem",
          }}>
            <span style={{ fontSize: "14px", fontWeight: 500, color: displayTotal.labelColor }}>{displayTotal.label}</span>
            <span style={{ fontSize: "28px", fontWeight: 800, color: displayTotal.labelColor, letterSpacing: "-0.04em" }} className="tabular">{displayTotal.amount}</span>
          </div>

          {/* Chips */}
          <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "8px" }}>你也是這種情況嗎？</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {displayChips.map((chip, i) => {
              const personaId = !isOwner ? selected : "owner"
              const href = i === 0 ? `/calculator?persona=${personaId}` : "/calculator"
              return (
                <Link key={chip} href={href} style={{
                  padding: "7px 14px", fontSize: "12px", borderRadius: "20px",
                  border: "1px solid #E2E8F0", background: "#F8FAFC", color: "#475569",
                  textDecoration: "none", display: "inline-block",
                }}>{chip}</Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
