import Link from "next/link"

interface Tag {
  text: string
  bg: string
  color: string
}

interface Subsidy {
  barColor: string
  name: string
  how: string
  amount: string
  amtColor: string
}

interface Total {
  bg: string
  labelColor: string
  label: string
  amount: string
}

export interface PersonaData {
  id: string
  tab: string
  dotColor: string
  avatar: { char: string; bg: string; color: string }
  name: string
  tags: Tag[]
  story: string
  subsidies: Subsidy[]
  total: Total
  chips: string[]
}

export default function PersonaPanel({ persona }: { persona: PersonaData }) {
  return (
    <>
      <div className="profile-row">
        <div
          className="avatar"
          style={{ background: persona.avatar.bg, color: persona.avatar.color }}
        >
          {persona.avatar.char}
        </div>
        <div className="profile-info">
          <div className="profile-name">{persona.name}</div>
          <div className="profile-tags">
            {persona.tags.map((tag) => (
              <span
                key={tag.text}
                className="ptag"
                style={{ background: tag.bg, color: tag.color }}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="story"
        dangerouslySetInnerHTML={{ __html: persona.story }}
      />

      <div className="subsidy-list">
        {persona.subsidies.map((sub) => (
          <div key={sub.name} className="s-item">
            <div className="s-bar" style={{ background: sub.barColor }} />
            <div className="s-body">
              <div className="s-name">{sub.name}</div>
              <div className="s-how">{sub.how}</div>
            </div>
            <div className="s-amt" style={{ color: sub.amtColor }}>
              {sub.amount}
            </div>
          </div>
        ))}
      </div>

      <div
        className="total-strip"
        style={{ background: persona.total.bg }}
      >
        <span className="total-l" style={{ color: persona.total.labelColor }}>
          {persona.total.label}
        </span>
        <span className="total-r" style={{ color: persona.total.labelColor }}>
          {persona.total.amount}
        </span>
      </div>

      <div className="relate-row">
        <div className="relate-label">你也是這種情況嗎？</div>
        <div className="relate-chips">
          {persona.chips.map((chip) => (
            <Link key={chip} className="rchip" href="/placeholder">
              {chip}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
