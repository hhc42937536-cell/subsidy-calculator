import Papa from "papaparse"
import guidesJson from "@/data/apply-guides.json"

export type SubsidyGuide = {
  slug: string
  title: string
  category: string
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

type SheetRow = {
  slug: string
  title: string
  category: string
  subtitle: string
  amount: string
  amount_label: string
  color: string
  criteria_1: string; criteria_2: string; criteria_3: string; criteria_4: string
  doc_1_name: string; doc_1_note: string
  doc_2_name: string; doc_2_note: string
  doc_3_name: string; doc_3_note: string
  doc_4_name: string; doc_4_note: string
  doc_5_name: string; doc_5_note: string
  doc_6_name: string; doc_6_note: string
  apply_url: string
  apply_label: string
  review_time: string
  review_note: string
  tip_1: string; tip_2: string; tip_3: string
  active: string
}

function rowToGuide(row: SheetRow): SubsidyGuide {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    subtitle: row.subtitle,
    amount: row.amount,
    amountLabel: row.amount_label,
    color: row.color || "#10B981",
    criteria: [row.criteria_1, row.criteria_2, row.criteria_3, row.criteria_4]
      .filter(Boolean)
      .map((label, i) => ({ id: `c${i + 1}`, label })),
    documents: [
      { name: row.doc_1_name, note: row.doc_1_note },
      { name: row.doc_2_name, note: row.doc_2_note },
      { name: row.doc_3_name, note: row.doc_3_note },
      { name: row.doc_4_name, note: row.doc_4_note },
      { name: row.doc_5_name, note: row.doc_5_note },
      { name: row.doc_6_name, note: row.doc_6_note },
    ].filter(d => d.name),
    applyUrl: row.apply_url,
    applyLabel: row.apply_label,
    reviewTime: row.review_time,
    reviewNote: row.review_note,
    tips: [row.tip_1, row.tip_2, row.tip_3].filter(Boolean),
  }
}

let _cache: Record<string, SubsidyGuide> | null = null

export async function fetchGuides(): Promise<Record<string, SubsidyGuide>> {
  if (_cache) return _cache

  const sheetUrl = process.env.GOOGLE_SHEETS_CSV_URL

  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, { next: { revalidate: 3600 } })
      const csv = await res.text()
      const { data } = Papa.parse<SheetRow>(csv, { header: true, skipEmptyLines: true })
      const guides: Record<string, SubsidyGuide> = {}
      for (const row of data) {
        if (row.slug && row.active !== "FALSE") {
          guides[row.slug] = rowToGuide(row)
        }
      }
      _cache = guides
      return guides
    } catch (e) {
      console.warn("Google Sheets fetch failed, falling back to JSON:", e)
    }
  }

  // Fallback: convert existing JSON to SubsidyGuide format
  const guides: Record<string, SubsidyGuide> = {}
  for (const [slug, g] of Object.entries(guidesJson)) {
    guides[slug] = g as SubsidyGuide
  }
  _cache = guides
  return guides
}

export async function getGuide(slug: string): Promise<SubsidyGuide | null> {
  const guides = await fetchGuides()
  return guides[slug] ?? null
}

export async function getAllSlugs(): Promise<string[]> {
  const guides = await fetchGuides()
  return Object.keys(guides)
}
