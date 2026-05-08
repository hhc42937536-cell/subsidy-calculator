export default function Navbar() {
  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #F1F5F9",
      padding: "0 1.5rem",
      height: "56px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <span style={{ fontSize: "17px" }}>🛡</span>
        <span style={{ fontWeight: 700, color: "#0F172A", fontSize: "15px", letterSpacing: "-0.01em" }}>補助優轉</span>
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: "#475569",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}>
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
        政府公開資料 × 每季同步更新
      </div>

      <button style={{
        background: "transparent",
        color: "#4F46E5",
        border: "1px solid #C7D2FE",
        borderRadius: "8px",
        padding: "7px 16px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}>
        找我的補助 →
      </button>
    </nav>
  )
}
