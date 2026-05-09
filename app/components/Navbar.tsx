import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #E8EDEA",
      padding: "0 1.5rem",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "8px",
          background: "#E8F5EE", border: "1.5px solid #A7D4B5",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px",
        }}>🌿</div>
        <div>
          <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "15px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>補助優轉</div>
          <div style={{ fontSize: "10px", color: "#94A3B8", letterSpacing: "0.02em" }}>政府補助資料分析平台</div>
        </div>
      </Link>

      <div className="nav-links">
        <a href="/#personas" className="nav-link">補助情境</a>
        <a href="/#sources" className="nav-link">資料來源</a>
        <a href="/#about" className="nav-link">關於我們</a>
      </div>

      <Link href="/calculator" style={{
        background: "#0F172A",
        color: "white",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
        textDecoration: "none",
        display: "inline-block",
      }}>
        開始試算我的補助 →
      </Link>
    </nav>
  )
}
