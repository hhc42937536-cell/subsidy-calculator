"use client"

import { useState } from "react"
import Link from "next/link"
import ownerData from "@/data/owner-data.json"

type IndustryKey = keyof typeof ownerData.data

export default function OwnerPanel() {
  const [industry, setIndustry] = useState<IndustryKey>(
    ownerData.defaultIndustry as IndustryKey
  )
  const [city, setCity] = useState(ownerData.defaultCity)

  const current = ownerData.data[industry]

  return (
    <>
      <div className="profile-row">
        <div
          className="avatar"
          style={{ background: ownerData.avatar.bg, color: ownerData.avatar.color }}
        >
          {ownerData.avatar.char}
        </div>
        <div className="profile-info">
          <div className="profile-name">老闆，{city}，員工 8 人</div>
          <div className="profile-tags">
            <span
              className="ptag"
              style={{ background: "#FAECE7", color: "#712B13" }}
            >
              {industry}
            </span>
            {ownerData.baseTags.map((tag) => (
              <span
                key={tag.text}
                className="ptag"
                style={{ background: tag.bg, color: tag.color }}
              >
                {tag.text}
              </span>
            ))}
            <span
              className="ptag"
              style={{ background: "#EAF3DE", color: "#27500A" }}
            >
              {city}
            </span>
          </div>
        </div>
      </div>

      <div className="selector-row">
        <div className="sel-group">
          <span className="sel-label">產業別</span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as IndustryKey)}
          >
            {ownerData.industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
        <div className="sel-group">
          <span className="sel-label">公司所在地</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {ownerData.cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="story"
        dangerouslySetInnerHTML={{ __html: current.story }}
      />

      <div className="subsidy-list">
        {current.subsidies.map((sub) => (
          <div key={sub.name} className="s-item">
            <div className="s-bar" style={{ background: sub.barColor }} />
            <div className="s-body">
              <div className="s-name">{sub.name}</div>
              <div className="s-how">{sub.how}</div>
            </div>
            <div className="s-amt" style={{ color: "#1D9E75" }}>
              {sub.amount}
            </div>
          </div>
        ))}
        {/* 地方加碼（動態城市） */}
        <div className="s-item">
          <div className="s-bar" style={{ background: "#7F77DD" }} />
          <div className="s-body">
            <div className="s-name">地方 SBIR（{city}加碼）</div>
            <div className="s-how">
              設籍{city}企業 → {city}產業局申請
            </div>
          </div>
          <div className="s-amt" style={{ color: "#1D9E75" }}>
            額外加碼
          </div>
        </div>
      </div>

      <div
        className="total-strip"
        style={{ background: ownerData.total.bg }}
      >
        <span
          className="total-l"
          style={{ color: ownerData.total.labelColor }}
        >
          {ownerData.total.label}
        </span>
        <span
          className="total-r"
          style={{ color: ownerData.total.labelColor }}
        >
          {ownerData.total.amount}
        </span>
      </div>

      <div className="relate-row">
        <div className="relate-label">你也是這種情況嗎？</div>
        <div className="relate-chips">
          {ownerData.chips.map((chip) => (
            <Link key={chip} className="rchip" href="/placeholder">
              {chip}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
