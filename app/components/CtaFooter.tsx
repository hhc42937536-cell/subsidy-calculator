import Link from "next/link"

export default function CtaFooter() {
  return (
    <section id="cta" style={{ background: "#16A34A", padding: "4rem 1.5rem 3rem" }}>
      <div className="section-wrap" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginBottom: "0.75rem", lineHeight: 1.2 }}>
          別再錯過你本來可以申請的補助
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 2rem" }}>
          免費試算，3 分鐘知道你能領多少。<br />無需註冊，不會留下個資。
        </p>

        <Link href="/calculator" style={{
          background: "#fff",
          color: "#16A34A",
          borderRadius: "14px",
          padding: "0 36px",
          height: "56px",
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          marginBottom: "2.5rem",
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
        }}>
          立即開始試算 →
        </Link>

        <div id="about" style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "16px" }}>🌿</span>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: "14px" }}>補助優轉</span>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
            政府公開資料 × 非廣告非業配 × 每季核對更新
          </p>
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
            {["隱私政策", "服務條款", "資料來源", "聯絡我們"].map(t => (
              <a key={t} href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{t}</a>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "1rem" }}>© 2024 補助優轉 All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
