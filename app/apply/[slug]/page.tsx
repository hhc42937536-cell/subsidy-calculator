import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Navbar from "@/app/components/Navbar"
import ApplyContent from "./ApplyContent"
import guides from "@/data/apply-guides.json"

type Slug = keyof typeof guides

export function generateStaticParams() {
  return Object.keys(guides).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = guides[slug as Slug]
  if (!guide) return {}
  return {
    title: `${guide.title} 申請懶人包 — 補助優轉`,
    description: `${guide.subtitle}。資格確認、文件清單、申請連結一次整理。`,
  }
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = guides[slug as Slug]
  if (!guide) notFound()

  return (
    <>
      <Navbar />
      <ApplyContent guide={guide} />
    </>
  )
}
