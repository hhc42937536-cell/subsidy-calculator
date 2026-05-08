import PersonaTabs from "@/app/components/PersonaTabs"

const trustItems = [
  "即時更新政策資料",
  "基於政府公開規則",
  "無需註冊",
  "免費使用",
]

const mockSubsidies = [
  { name: "中央租金補貼", amount: "$72,000" },
  { name: "租屋報稅扣除額", amount: "$6,000" },
  { name: "節能家電補助", amount: "$5,000" },
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
          background: "white",
          color: "#0F172A",
          border: "none",
          borderRadius: "8px",
          padding: "6px 16px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
        }}>
          找我的補助
        </button>
      </nav>

      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, #0F172A 0%, #0B1F33 100%)",
        padding: "4rem 1.5rem 4rem",
      }}>
        <div className="hero-inner">

          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#34D399",
              fontSize: "12px",
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: "20px",
              marginBottom: "1.25rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              政府公開資料 × 每季同步
            </div>

            <h1 style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
              color: "#F8FAFC",
              marginBottom: "1rem",
            }}>
              即時計算政府補助
              <br />
              <span style={{ color: "#10B981" }}>與節省金額</span>
            </h1>

            <p style={{
              fontSize: "15px",
              color: "#94A3B8",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              maxWidth: "420px",
            }}>
              基於公開政策與最新補助規則，快速估算你的實際可申請金額。
            </p>

            {/* Trust signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "2rem" }}>
              {trustItems.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#CBD5E1" }}>
                  <span style={{ color: "#10B981", fontWeight: 700, fontSize: "14px" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            <button style={{
              background: "white",
              color: "#0F172A",
              border: "none",
              borderRadius: "12px",
              padding: "0 28px",
              height: "52px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}>
              找我的補助情境 →
            </button>
          </div>

          {/* Right — Dashboard mockup */}
          <div className="hero-mockup">
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              padding: "1.5rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "2px" }}>試算結果</div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A" }}>志豪・租屋青年</div>
                </div>
                <span style={{
                  background: "#ECFDF5",
                  color: "#059669",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}>符合資格</span>
              </div>

              {/* Subsidy items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.25rem" }}>
                {mockSubsidies.map((sub) => (
                  <div key={sub.name} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}>
                    <span style={{ fontSize: "13px", color: "#475569" }}>{sub.name}</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#059669" }}>{sub.amount}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 14px",
                background: "#0F172A",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}>
                <span style={{ fontSize: "13px", color: "#94A3B8", fontWeight: 500 }}>每年可領 / 省下</span>
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#10B981" }}>$78,000+</span>
              </div>

              <button style={{
                width: "100%",
                background: "#0F172A",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.01em",
              }}>
                查看申請方式 →
              </button>
            </div>
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
