import Link from "next/link"

const AVATAR_PREVIEW = [
  { bg: "#7F77DD", char: "學" },
  { bg: "#378ADD", char: "勞" },
  { bg: "#1D9E75", char: "媽" },
]

export default function CtaFooter() {
  return (
    <section id="cta" style={{ background: "linear-gradient(135deg, #0F172A 0%, #111827 100%)", padding: "4rem 1.5rem 3rem" }}>
      <div className="section-wrap" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#F8FAFC", letterSpacing: "-0.04em", marginBottom: "0.75rem", lineHeight: 1.2 }}>
          別再錯過你本來可以申請的補助
        </h2>
        <p style={{ fontSize: "16px", color: "#94A3B8", marginBottom: "2rem", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 2rem" }}>
          免費試算，3 分鐘知道你能領多少。<br />無需註冊，不留個資。
        </p>

        <Link href="/calculator" style={{
          background: "#10B981",
          color: "white",
          borderRadius: "14px",
          padding: "0 36px",
          height: "56px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "-0.01em",
          boxShadow: "0 4px 24px rgba(16,185,129,0.4)",
          marginBottom: "1.5rem",
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
        }}>
          立即開始試算 →
        </Link>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            {AVATAR_PREVIEW.map((a, i) => (
              <div key={i} style={{
                width: "24px", height: "24px", borderRadius: "50%",
                background: a.bg, border: "2px solid #1E293B",
                marginLeft: i === 0 ? 0 : "-7px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "9px", color: "white", fontWeight: 600,
              }}>{a.char}</div>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#475569" }}>已有 126,842 人試算過</span>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #1E293B" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "15px" }}>🛡</span>
            <span style={{ fontWeight: 700, color: "#F8FAFC", fontSize: "14px" }}>補助優轉</span>
          </div>
          <p style={{ fontSize: "12px", color: "#334155" }}>
            政府公開資料 × 非廣告非業配 × 每季核對更新
          </p>
        </div>
      </div>
    </section>
  )
}
