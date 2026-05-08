import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Navbar from "@/app/components/Navbar"
import ApplyContent from "./ApplyContent"
import { getGuide, getAllSlugs } from "@/lib/sheets"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} 申請懶人包 — 補助優轉`,
    description: `${guide.subtitle}。資格確認、文件清單、申請連結一次整理。`,
  }
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuide(slug)
  if (!guide) notFound()

  return (
    <>
      <Navbar />
      <ApplyContent guide={guide} />
    </>
  )
}
