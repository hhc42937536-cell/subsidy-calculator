"use client"

import { useState } from "react"
import personas from "@/data/personas.json"
import ownerData from "@/data/owner-data.json"
import PersonaPanel from "./PersonaPanel"
import OwnerPanel from "./OwnerPanel"

type PersonaId = (typeof personas)[number]["id"] | "owner"

export default function PersonaTabs() {
  const [active, setActive] = useState<PersonaId>("student")

  return (
    <>
      <div className="persona-tabs">
        {personas.map((p) => (
          <button
            key={p.id}
            className={`ptab${active === p.id ? " active" : ""}`}
            onClick={() => setActive(p.id as PersonaId)}
          >
            <div className="ptab-dot" style={{ background: p.dotColor }} />
            {p.tab}
          </button>
        ))}
        <button
          className={`ptab${active === "owner" ? " active" : ""}`}
          onClick={() => setActive("owner")}
        >
          <div
            className="ptab-dot"
            style={{ background: ownerData.dotColor }}
          />
          {ownerData.tab}
        </button>
      </div>

      {personas.map((p) =>
        active === p.id ? <PersonaPanel key={p.id} persona={p} /> : null
      )}
      {active === "owner" && <OwnerPanel />}
    </>
  )
}
