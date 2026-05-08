import type { Metadata } from "next"
import Navbar from "@/app/components/Navbar"
import CalculatorFlow from "./CalculatorFlow"

export const metadata: Metadata = {
  title: "試算我的補助 — 補助優轉",
  description: "選擇最像你的生活情境，立刻看到你可申請的政府補助清單。",
}

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <CalculatorFlow />
    </>
  )
}
