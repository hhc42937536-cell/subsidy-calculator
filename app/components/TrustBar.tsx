const ITEMS = [
  { icon: "🏛", title: "政府公開資料", sub: "所有補助均來自官方公告" },
  { icon: "🔄", title: "每季同步更新", sub: "最新政策即時反映" },
  { icon: "🔒", title: "無需註冊登入", sub: "免費試算不留個資" },
  { icon: "⚡", title: "免費試算", sub: "3 分鐘看到完整結果" },
]

export default function TrustBar() {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #F1F5F9", padding: "1.5rem" }}>
      <div className="section-wrap">
        <div className="trust-grid">
          {ITEMS.map(item => (
            <div key={item.title} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "1rem 1.25rem",
              background: "#F8FAFC",
              border: "1px solid #F1F5F9",
              borderRadius: "12px",
            }}>
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{item.icon}</span>
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
