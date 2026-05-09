import Link from "next/link"

const EXAMPLE_SUBSIDIES = [
  { icon: "🏠", color: "#3B82F6", name: "中央租金補貼專案", dept: "內政部 | 租金補貼", amount: "$54,000/年" },
  { icon: "💼", color: "#10B981", name: "青年就業獎勵金", dept: "勞動部 | 就業獎勵", amount: "$20,000" },
  { icon: "💻", color: "#8B5CF6", name: "數位發展部數位學習補助", dept: "數位發展部 | 學習補助", amount: "$6,000/年" },
]

export default function ExampleSection() {
  return (
    <section style={{ padding: "3.5rem 1.5rem", background: "#F8FBF8", borderTop: "1px solid #E8EDEA" }}>
      <div className="section-wrap">
        <div className="example-grid">

          {/* Left: result */}
          <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#16A34A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>試算結果範例</div>
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>小雅 · 22歲 · 台北市</span>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              {[
                { text: "大學生", bg: "#EEEDFE", color: "#3C3489" },
                { text: "租屋族", bg: "#E6F1FB", color: "#0C447C" },
                { text: "年收入 0~30 萬", bg: "#F0FDF4", color: "#065F46" },
              ].map(t => (
                <span key={t.text} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "20px", background: t.bg, color: t.color, fontWeight: 500 }}>{t.text}</span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
              {EXAMPLE_SUBSIDIES.map(sub => (
                <div key={sub.name} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", background: "#F8FAFC",
                  border: "1px solid #F1F5F9", borderRadius: "10px",
                }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "8px",
                    background: sub.color + "15",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "17px", flexShrink: 0,
                  }}>{sub.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.name}</div>
                    <div style={{ fontSize: "11px", color: "#94A3B8" }}>{sub.dept}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", flexShrink: 0 }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#059669" }} className="tabular">{sub.amount}</span>
                    <span style={{ fontSize: "10px", background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0", borderRadius: "4px", padding: "1px 5px" }}>公開資料</span>
                  </div>
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

          {/* Right: conditions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>你的條件</div>
              {[
                { label: "年齡", value: "22 歲" },
                { label: "居住地", value: "台北市" },
                { label: "身份", value: "大學生" },
                { label: "居住狀態", value: "租屋" },
                { label: "年收入", value: "0 ~ 30 萬" },
              ].map(row => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 0", borderBottom: "1px solid #F1F5F9",
                  fontSize: "13px",
                }}>
                  <span style={{ color: "#94A3B8" }}>{row.label}</span>
                  <span style={{ color: "#0F172A", fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "18px", flexShrink: 0 }}>✅</span>
              <p style={{ fontSize: "12px", color: "#065F46", lineHeight: 1.6 }}>
                本試算結果僅供參考<br />實際申請資格依各機關公告為準。
              </p>
            </div>

            <Link href="/calculator" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "6px", padding: "14px",
              background: "#0F172A", color: "#fff",
              borderRadius: "12px", textDecoration: "none",
              fontSize: "14px", fontWeight: 600,
            }}>
              輸入你的條件，試算看看 →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
