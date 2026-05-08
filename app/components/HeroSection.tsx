"use client"

const AVATAR_PREVIEW = [
  { bg: "#7F77DD", char: "學" },
  { bg: "#378ADD", char: "勞" },
  { bg: "#1D9E75", char: "媽" },
]

const MOCKUP_SUBSIDIES = [
  { color: "#16A34A", name: "中央生育給付 PLUS（2026 新制）", how: "每胎保底，不分投保 → 勞保局線上申請", amount: "$100,000" },
  { color: "#7F77DD", name: "台中市生育津貼", how: "設籍台中、連續滿半年 → 戶籍地區公所", amount: "$20,000" },
  { color: "#D4537E", name: "婚育租屋加碼（2026 新制）", how: "結婚未滿 2 年、租屋中 → 租金補貼加碼 50%", amount: "$36,000/年" },
]

export default function HeroSection() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #0F172A 0%, #111827 100%)", padding: "4rem 1.5rem 3.5rem" }}>
        <div className="section-wrap">
          <div className="hero-grid">

            {/* ── Left ── */}
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: "20px", padding: "5px 14px", marginBottom: "1.5rem",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>政府公開資料 × 每季同步更新</span>
              </div>

              <h1 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 800, color: "#F8FAFC", lineHeight: 1.15, marginBottom: "0.5rem", letterSpacing: "-0.04em" }}>
                你每年可以多領
              </h1>
              <h1 style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 800, color: "#10B981", lineHeight: 1.15, marginBottom: "1.25rem", letterSpacing: "-0.04em" }}>
                多少政府補助？
              </h1>
              <p style={{ fontSize: "16px", color: "#94A3B8", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "440px" }}>
                根據你的生活情境，分析可申請的政府補助。<br />
                從租屋、育兒、就業到企業，總金額一目瞭然。
              </p>

              {/* CTA */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                <button style={{
                  background: "#10B981",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "0 28px",
                  height: "52px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(16,185,129,0.35)",
                }}>
                  開始試算我的補助 →
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex" }}>
                    {AVATAR_PREVIEW.map((a, i) => (
                      <div key={i} style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        background: a.bg, border: "2px solid #1E293B",
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

            {/* ── Right: mockup card ── */}
            <div className="hero-mockup-col">
              <div style={{
                background: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "1.5rem",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              }}>
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#0F6E56", fontWeight: 700 }}>媽</div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#94A3B8" }}>試算結果</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A" }}>佳佳・新手媽媽・台中市</div>
                    </div>
                  </div>
                  <span style={{ background: "#ECFDF5", color: "#047857", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "8px", border: "1px solid #D1FAE5" }}>符合資格</span>
                </div>

                {/* Subsidy items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
                  {MOCKUP_SUBSIDIES.map(sub => (
                    <div key={sub.name} style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "10px 12px", background: "#F8FAFC",
                      border: "1px solid #E2E8F0", borderRadius: "10px",
                    }}>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: sub.color + "18", border: `1px solid ${sub.color}30`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: sub.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A" }}>{sub.name}</div>
                        <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.how}</div>
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#059669", whiteSpace: "nowrap", flexShrink: 0 }} className="tabular">{sub.amount}</div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", background: "#E1F5EE", borderRadius: "12px",
                  border: "1px solid #A7F3D0", marginBottom: "1rem",
                }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#065F46" }}>佳佳第一年可多領 / 省下</span>
                  <span style={{ fontSize: "26px", fontWeight: 800, color: "#047857", letterSpacing: "-0.04em" }} className="tabular">$156,000+</span>
                </div>

                {/* Source badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                  <span style={{ fontSize: "11px", color: "#94A3B8" }}>資料來源：勞動部、內政部、地方政府公告</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
