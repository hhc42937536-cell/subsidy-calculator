const SOURCES = [
  { emoji: "🏛", name: "內政部", sub: "住宅補貼、租金補助" },
  { emoji: "⚖️", name: "勞動部", sub: "就業保險、育兒津貼" },
  { emoji: "🎓", name: "教育部", sub: "學費補助、獎助學金" },
  { emoji: "💻", name: "數位發展部", sub: "數位學習、創新補助" },
  { emoji: "💰", name: "財政部", sub: "報稅扣除額規定" },
  { emoji: "🏙", name: "地方政府公告", sub: "縣市加碼補助" },
]

export default function DataSources() {
  return (
    <section id="sources" style={{ padding: "3.5rem 1.5rem", background: "#FAFDF7", borderTop: "1px solid #E8EDEA" }}>
      <div className="section-wrap">
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#16A34A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>資料來源</div>
          <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.03em" }}>
            每一筆補助都有資料依據
          </h2>
          <p style={{ fontSize: "14px", color: "#64748B", marginTop: "0.5rem" }}>非廣告、非業配，每季核對更新確保準確性。</p>
        </div>

        <div className="ds-grid">
          {SOURCES.map(s => (
            <div key={s.name} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "0.875rem 1.125rem",
              border: "1.5px solid #E2E8F0",
              borderRadius: "12px",
              background: "#fff",
            }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{s.emoji}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{s.name}</div>
                <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
