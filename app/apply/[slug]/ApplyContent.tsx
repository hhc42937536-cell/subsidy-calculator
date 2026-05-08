"use client"

import { useState } from "react"
import Link from "next/link"

type Guide = {
  slug: string
  title: string
  subtitle: string
  amount: string
  amountLabel: string
  color: string
  criteria: { id: string; label: string }[]
  documents: { name: string; note: string }[]
  applyUrl: string
  applyLabel: string
  reviewTime: string
  reviewNote: string
  tips: string[]
}

export default function ApplyContent({ guide }: { guide: Guide }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const allChecked = guide.criteria.every(c => checked[c.id])
  const checkedCount = guide.criteria.filter(c => checked[c.id]).length

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "1.5rem", position: "sticky", top: "60px", zIndex: 40 }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Link href="/" style={{ fontSize: "13px", color: "#64748B", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", marginBottom: "0.75rem" }}>
            ← 回首頁
          </Link>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: guide.color, flexShrink: 0 }} />
                <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>{guide.title}</h1>
              </div>
              <p style={{ fontSize: "13px", color: "#64748B" }}>{guide.subtitle}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "24px", fontWeight: 800, color: "#047857", letterSpacing: "-0.04em" }} className="tabular">{guide.amount}</div>
              <div style={{ fontSize: "11px", color: "#94A3B8" }}>{guide.amountLabel}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        {/* Section 1: 資格確認 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A" }}>
              <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>1</span>
              資格確認
            </h2>
            <span style={{ fontSize: "12px", color: checkedCount === guide.criteria.length ? "#047857" : "#94A3B8", fontWeight: 500 }}>
              {checkedCount}/{guide.criteria.length} 項符合
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1rem" }}>
            {guide.criteria.map(c => (
              <label key={c.id} style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                padding: "14px 16px",
                background: checked[c.id] ? "#F0FDF4" : "#fff",
                border: `1.5px solid ${checked[c.id] ? "#A7F3D0" : "#E2E8F0"}`,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all .15s",
              }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "6px", flexShrink: 0, marginTop: "1px",
                  border: `2px solid ${checked[c.id] ? "#10B981" : "#CBD5E1"}`,
                  background: checked[c.id] ? "#10B981" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all .15s",
                }}>
                  {checked[c.id] && <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                </div>
                <input
                  type="checkbox"
                  style={{ display: "none" }}
                  checked={!!checked[c.id]}
                  onChange={e => setChecked(prev => ({ ...prev, [c.id]: e.target.checked }))}
                />
                <span style={{ fontSize: "14px", color: "#0F172A", lineHeight: 1.6 }}>{c.label}</span>
              </label>
            ))}
          </div>

          {allChecked && (
            <div style={{
              padding: "12px 16px", background: "#ECFDF5", border: "1px solid #A7F3D0",
              borderRadius: "10px", display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ fontSize: "16px" }}>✅</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#047857" }}>你符合所有基本資格，可以繼續申請！</span>
            </div>
          )}
        </section>

        {/* Section 2: 文件清單 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>2</span>
            需要準備的文件
          </h2>
          <div style={{
            background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden",
          }}>
            {guide.documents.map((doc, i) => (
              <div key={doc.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 16px",
                borderBottom: i < guide.documents.length - 1 ? "1px solid #F1F5F9" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "14px" }}>📄</span>
                  <span style={{ fontSize: "14px", color: "#0F172A", fontWeight: 500 }}>{doc.name}</span>
                </div>
                <span style={{ fontSize: "12px", color: "#94A3B8", flexShrink: 0 }}>{doc.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: 申請連結 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>3</span>
            前往申請
          </h2>
          <a
            href={guide.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 22px",
              background: "#10B981",
              borderRadius: "14px",
              textDecoration: "none",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(16,185,129,0.3)",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "15px", fontWeight: 700 }}>{guide.applyLabel}</span>
            <span style={{ fontSize: "18px" }}>↗</span>
          </a>
          <p style={{ fontSize: "12px", color: "#94A3B8", textAlign: "center" }}>
            將跳轉至政府官方網站，與本站無關聯
          </p>
        </section>

        {/* Section 4: 審核時間 */}
        <section style={{ marginBottom: "1.75rem" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0F172A", marginBottom: "1rem" }}>
            <span style={{ background: guide.color, color: "#fff", borderRadius: "6px", padding: "2px 8px", fontSize: "12px", fontWeight: 600, marginRight: "8px" }}>4</span>
            預計審核時間
          </h2>
          <div style={{
            background: "#fff", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.25rem 1.5rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "22px" }}>⏱</span>
              <span style={{ fontSize: "22px", fontWeight: 700, color: "#0F172A" }}>{guide.reviewTime}</span>
            </div>
            <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.7 }}>{guide.reviewNote}</p>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "0.75rem" }}>💡 注意事項</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {guide.tips.map((tip, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "8px",
                padding: "10px 14px",
                background: "#FFFBEB", border: "1px solid #FDE68A",
                borderRadius: "8px",
              }}>
                <span style={{ fontSize: "12px", color: "#92400E", flexShrink: 0, marginTop: "2px" }}>▸</span>
                <span style={{ fontSize: "13px", color: "#92400E", lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
