import PersonaTabs from "@/app/components/PersonaTabs"

const stats = [
  { value: "200+", label: "政府補助項目" },
  { value: "每季更新", label: "資料同步頻率" },
  { value: "NT$9.6萬", label: "平均可領金額" },
]

export default function Home() {
  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{
        background: "#0F172A",
        padding: "0 1.5rem",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <span style={{ color: "#F8FAFC", fontWeight: 600, fontSize: "15px", letterSpacing: "-0.01em" }}>
          補助優轉
        </span>
        <button style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "6px 16px",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
        }}>
          找我的補助
        </button>
      </nav>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, #0F172A 0%, #111827 100%)",
        padding: "3.5rem 1.5rem 3rem",
        color: "white",
      }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>

          {/* 資料來源 badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(22,163,74,0.15)",
            border: "1px solid rgba(22,163,74,0.3)",
            color: "#4ADE80",
            fontSize: "12px",
            fontWeight: 500,
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "1.25rem",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
            資料來源：政府公開資料平台，每季同步
          </div>

          <h1 style={{
            fontSize: "clamp(24px, 5vw, 34px)",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
            color: "#F8FAFC",
          }}>
            你可能少領了數萬元
            <br />
            <span style={{ color: "#4ADE80" }}>政府補助</span>
          </h1>

          <p style={{
            fontSize: "15px",
            color: "#94A3B8",
            lineHeight: 1.6,
            marginBottom: "1.75rem",
            maxWidth: "480px",
          }}>
            選一個最像你的生活情境，30 秒看清楚你能領哪些補助、
            總共多少錢，以及如何申請。
          </p>

          <button style={{
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            marginBottom: "2.5rem",
          }}>
            找我的情境 →
          </button>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.5rem",
          }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#4ADE80", marginBottom: "2px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "12px", color: "#64748B" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persona section */}
      <div className="wrap">
        <div className="intro">
          <div className="intro-headline">他們每年多領了這些錢<br />你的條件跟誰最像？</div>
          <div className="intro-sub">找到跟你最像的情境，看看實際能領到多少。</div>
        </div>
        <PersonaTabs />
      </div>

    </div>
  )
}
