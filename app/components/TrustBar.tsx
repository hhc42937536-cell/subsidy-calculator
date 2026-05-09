const ITEMS = [
  { icon: "🏛", title: "政府公開資料", sub: "來源透明，值得信賴" },
  { icon: "📅", title: "每季同步更新", sub: "最新政策即時反映" },
  { icon: "🔒", title: "無需註冊登入", sub: "保護隱私，快速試算" },
  { icon: "❤️", title: "免費試算", sub: "3 分鐘找到你的補助" },
]

export default function TrustBar() {
  return (
    <div style={{ background: "#fff", borderTop: "1px solid #E8EDEA", borderBottom: "1px solid #E8EDEA", padding: "1.5rem" }}>
      <div className="section-wrap">
        <div className="trust-grid">
          {ITEMS.map((item, i) => (
            <div key={item.title} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "1rem 1.25rem",
              borderRight: i < ITEMS.length - 1 ? "1px solid #F1F5F9" : "none",
            }}>
              <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{item.title}</div>
                <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
