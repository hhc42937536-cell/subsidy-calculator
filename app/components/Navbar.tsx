import Link from "next/link"

export default function Navbar() {
  return (
    <nav style={{
      background: "white",
      borderBottom: "1px solid #E2E8F0",
      padding: "0 1.5rem",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "#0F172A",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "16px",
        }}>🛡</div>
        <div>
          <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "15px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>補助優轉</div>
          <div style={{ fontSize: "10px", color: "#94A3B8", letterSpacing: "0.02em" }}>政府補助資料分析平台</div>
        </div>
      </Link>

      {/* Nav links */}
      <div className="nav-links">
        <a href="/#personas" className="nav-link">補助情境</a>
        <a href="/#sources" className="nav-link">資料來源</a>
        <Link href="/calculator" className="nav-link">開始試算</Link>
      </div>

      {/* CTA */}
      <Link href="/calculator" style={{
        background: "#10B981",
        color: "white",
        borderRadius: "8px",
        padding: "8px 18px",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
        letterSpacing: "-0.01em",
        textDecoration: "none",
        display: "inline-block",
      }}>
        找我的補助 →
      </Link>
    </nav>
  )
}
