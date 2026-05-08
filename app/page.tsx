import Navbar from "@/app/components/Navbar"
import HeroSection from "@/app/components/HeroSection"

export default function Home() {
  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
    </div>
  )
}
