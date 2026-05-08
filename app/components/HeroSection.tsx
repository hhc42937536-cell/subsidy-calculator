"use client"

import { useState } from "react"
import Link from "next/link"
import personas from "@/data/personas.json"
import ownerData from "@/data/owner-data.json"

type ActiveId = (typeof personas)[number]["id"] | "owner"
type IndustryKey = keyof typeof ownerData.data

const TRUST_ITEMS = [
  { icon: "🛡", title: "基於政府公開規則", sub: "資料來源透明可查" },
  { icon: "🔄", title: "每季同步更新", sub: "最新政策不錯過" },
  { icon: "🔒", title: "無需註冊", sub: "免費試算不留資" },
  { icon: "💬", title: "簡單 3 步驟", sub: "快速看到結果" },
]

const AVATAR_PREVIEW = [
  { bg: "#7F77DD", char: "學" },
  { bg: "#378ADD", char: "勞" },
  { bg: "#1D9E75", char: "媽" },
]

export default function HeroSection() {
  const [activeId, setActiveId] = useState<ActiveId>("student")
  const [industry, setIndustry] = useState<IndustryKey>(ownerData.defaultIndustry as IndustryKey)
  const [city, setCity] = useState(ownerData.defaultCity)

  const isOwner = activeId === "owner"
  const persona = !isOwner ? personas.find(p => p.id === activeId)! : null
  const ownerCurrent = ownerData.data[industry]

  const avatar    = isOwner ? ownerData.avatar : persona!.avatar
  const name      = isOwner ? `老闆，${city}，員工 8 人` : persona!.name
  const tags      = isOwner
    ? [{ text: industry, bg: "#FAECE7", color: "#712B13" }, ...ownerData.baseTags, { text: city, bg: "#EAF3DE", color: "#27500A" }]
    : persona!.tags
  const story     = isOwner ? ownerCurrent.story : persona!.story
  const subsidies = isOwner
    ? [...ownerCurrent.subsidies.map(s => ({ ...s, amtColor: "#059669" })), { barColor: "#7F77DD", name: `地方 SBIR（${city}加碼）`, how: `設籍${city}企業 → ${city}產業局申請`, amount: "額外加碼", amtColor: "#059669" }]
    : persona!.subsidies
  const total     = isOwner ? ownerData.total : persona!.total
  const chips     = isOwner ? ownerData.chips : persona!.chips
  const cardLabel = isOwner ? `老闆・小企業主・${city}` : `${persona!.tab.replace("・", "・")}・${tags[2]?.text ?? ""}`

  return (
    <>
      {/* Hero */}
      <section style={{ background: "#FFFFFF", padding: "3rem 1.5rem 2.5rem" }}>
        <div className="hero-inner" style={{ maxWidth: "1140px", margin: "0 auto" }}>

          {/* ── Left ── */}
          <div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, marginBottom: "0.4rem", letterSpacing: "-0.03em" }}>
              他們每年多領了這些錢
            </h1>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", fontWeight: 700, color: "#4F46E5", lineHeight: 1.2, marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
              你的條件跟誰最像？
            </h2>
            <p style={{ fontSize: "15px", color: "#64748B", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              找到跟你最像的情境，看看實際能領到多少。
            </p>

            {/* Tabs */}
            <div className="persona-tabs">
              {personas.map(p => (
                <button key={p.id} className={`ptab${activeId === p.id ? " active" : ""}`} onClick={() => setActiveId(p.id as ActiveId)}>
                  <div className="ptab-dot" style={{ background: p.dotColor }} />
                  {p.tab}
                </button>
              ))}
              <button className={`ptab${activeId === "owner" ? " active" : ""}`} onClick={() => setActiveId("owner")}>
                <div className="ptab-dot" style={{ background: ownerData.dotColor }} />
                {ownerData.tab}
              </button>
            </div>

            {/* Owner selectors */}
            {isOwner && (
              <div className="selector-row">
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

            {/* Profile row */}
            <div className="profile-row">
              <div className="avatar" style={{ background: avatar.bg, color: avatar.color }}>{avatar.char}</div>
              <div className="profile-info">
                <div className="profile-name">{name}</div>
                <div className="profile-tags">
                  {tags.map(t => <span key={t.text} className="ptag" style={{ background: t.bg, color: t.color }}>{t.text}</span>)}
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="story" dangerouslySetInnerHTML={{ __html: story }} />

            {/* CTA + social proof */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
              <button style={{
                background: "#312E81",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "0 28px",
                height: "52px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}>
                開始試算我的補助 →
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex" }}>
                  {AVATAR_PREVIEW.map((a, i) => (
                    <div key={i} style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: a.bg, border: "2px solid white",
                      marginLeft: i === 0 ? 0 : "-8px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", color: "white", fontWeight: 600,
                    }}>{a.char}</div>
                  ))}
                </div>
                <span style={{ fontSize: "13px", color: "#64748B" }}>已有 126,842 人試算</span>
              </div>
            </div>
          </div>

          {/* ── Right: result card ── */}
          <div className="hero-mockup">
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 4px 32px rgba(79,70,229,0.08)",
            }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "3px" }}>試算結果</div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#0F172A" }}>{cardLabel}</div>
                </div>
                <span style={{ background: "#ECFDF5", color: "#059669", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "8px", border: "1px solid #D1FAE5" }}>
                  符合資格
                </span>
              </div>

              {/* Subsidy items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
                {subsidies.slice(0, 3).map(sub => (
                  <div key={sub.name} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "10px 12px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "10px",
                  }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: sub.barColor + "18",
                      border: `1px solid ${sub.barColor}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: sub.barColor }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}>{sub.name}</div>
                      <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.how}</div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#059669", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {sub.amount}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px",
                background: total.bg,
                borderRadius: "10px",
                marginBottom: "1rem",
              }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: total.labelColor }}>{total.label}</span>
                <span style={{ fontSize: "24px", fontWeight: 700, color: total.labelColor }}>{total.amount}</span>
              </div>

              {/* Chips */}
              <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "8px" }}>你也是這種情況嗎？</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {chips.map(chip => (
                  <Link key={chip} href="/placeholder" className="rchip">{chip}</Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust bar */}
      <div style={{ borderTop: "1px solid #F1F5F9", background: "#F8FAFC", padding: "1.25rem 1.5rem" }}>
        <div className="trust-grid" style={{ maxWidth: "1140px", margin: "0 auto" }}>
          {TRUST_ITEMS.map(item => (
            <div key={item.title} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{item.title}</div>
                <div style={{ fontSize: "11px", color: "#64748B" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
