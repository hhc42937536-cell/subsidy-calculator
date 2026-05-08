import Navbar from "@/app/components/Navbar"
import HeroSection from "@/app/components/HeroSection"
import TrustBar from "@/app/components/TrustBar"
import PersonaSection from "@/app/components/PersonaSection"
import DataSources from "@/app/components/DataSources"
import CtaFooter from "@/app/components/CtaFooter"

export default function Home() {
  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <PersonaSection />
      <DataSources />
      <CtaFooter />
    </div>
  )
}
