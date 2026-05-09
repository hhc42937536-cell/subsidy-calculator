"use client"

import Link from "next/link"

const MOCKUP_SUBSIDIES = [
  { icon: "🏠", color: "#3B82F6", name: "中央租金補貼專案", dept: "內政部", amount: "$54,000/年" },
  { icon: "💼", color: "#10B981", name: "青年就業獎勵金", dept: "勞動部", amount: "$20,000" },
  { icon: "💻", color: "#8B5CF6", name: "數位發展部數位學習補助", dept: "數位發展部", amount: "$6,000/年" },
]

export default function HeroSection() {
  return (
    <section style={{ background: "#FAFDF7", padding: "5rem 1.5rem 4.5rem", position: "relative", overflow: "hidden" }}>
      {/* Decorative stars */}
      <span style={{ position: "absolute", top: "2.5rem", left: "8%", fontSize: "22px", color: "#F59E0B", opacity: 0.7, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", top: "7rem", right: "12%", fontSize: "14px", color: "#10B981", opacity: 0.5, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", bottom: "3rem", left: "4%", fontSize: "16px", color: "#F59E0B", opacity: 0.4, pointerEvents: "none" }}>✦</span>
      <span style={{ position: "absolute", bottom: "5rem", right: "6%", fontSize: "20px", color: "#A78BFA", opacity: 0.35, pointerEvents: "none" }}>✦</span>

      <div className="section-wrap">
        <div className="hero-grid">

          {/* ── Left ── */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "#F0FDF4", border: "1px solid #BBF7D0",
              borderRadius: "20px", padding: "5px 14px", marginBottom: "1.5rem",
            }}>
              <span style={{ color: "#F59E0B", fontSize: "13px" }}>✦</span>
              <span style={{ fontSize: "12px", color: "#065F46", fontWeight: 500 }}>政府公開資料 × 精準比對</span>
            </div>

            <h1 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 800, color: "#0F172A", lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-0.04em" }}>
              找出你可能錯過的<br />
              <span style={{ color: "#16A34A" }}>政府補助</span>
            </h1>
            <p style={{ fontSize: "15px", color: "#64748B", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "420px" }}>
              根據公開政策資料，快速比對你的身份、收入、居住狀態與家庭條件，估算每年可申請的補助與節稅金額。
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <Link href="/calculator" style={{
                background: "#0F172A",
                color: "white",
                borderRadius: "12px",
                padding: "0 28px",
                height: "52px",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}>
                開始試算我的補助 →
              </Link>
              <a href="#personas" style={{
                color: "#475569",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                padding: "0 20px",
                height: "52px",
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #D1D5DB",
                borderRadius: "12px",
                background: "white",
                whiteSpace: "nowrap",
              }}>
                查看常見情境
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex" }}>
                {[
                  { bg: "#7F77DD", char: "學" },
                  { bg: "#378ADD", char: "勞" },
                  { bg: "#1D9E75", char: "媽" },
                ].map((a, i) => (
                  <div key={i} style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: a.bg, border: "2px solid #FAFDF7",
                    marginLeft: i === 0 ? 0 : "-8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", color: "white", fontWeight: 600,
                  }}>{a.char}</div>
                ))}
              </div>
              <span style={{ fontSize: "13px", color: "#94A3B8" }}>已有 128,842 人試算</span>
            </div>
          </div>

          {/* ── Right: mockup card ── */}
          <div className="hero-mockup-col">
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "1.5rem",
              boxShadow: "0 8px 40px rgba(15,23,42,0.1)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>
                  <span style={{ color: "#F59E0B" }}>✦</span> 試算結果
                </div>
                <span style={{ background: "#ECFDF5", color: "#047857", fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "8px", border: "1px solid #D1FAE5" }}>符合資格 3 項</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
                {MOCKUP_SUBSIDIES.map(sub => (
                  <div key={sub.name} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 12px", background: "#F8FAFC",
                    border: "1px solid #F1F5F9", borderRadius: "10px",
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "8px",
                      background: sub.color + "15",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "18px", flexShrink: 0,
                    }}>{sub.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.name}</div>
                      <div style={{ fontSize: "11px", color: "#94A3B8" }}>{sub.dept}</div>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#059669", flexShrink: 0 }} className="tabular">{sub.amount}</div>
                  </div>
                ))}
              </div>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", background: "#F0FDF4", borderRadius: "12px",
                border: "1px solid #BBF7D0",
              }}>
                <span style={{ fontSize: "13px", color: "#065F46", fontWeight: 500 }}>小雅每年可領 / 省下</span>
                <span style={{ fontSize: "26px", fontWeight: 800, color: "#047857", letterSpacing: "-0.04em" }} className="tabular">$80,000+</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
