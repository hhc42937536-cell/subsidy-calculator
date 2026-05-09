import Navbar from "@/app/components/Navbar"
import HeroSection from "@/app/components/HeroSection"
import TrustBar from "@/app/components/TrustBar"
import PersonaSection from "@/app/components/PersonaSection"
import ExampleSection from "@/app/components/ExampleSection"
import DataSources from "@/app/components/DataSources"
import CtaFooter from "@/app/components/CtaFooter"

export default function Home() {
  return (
    <div style={{ background: "#FAFDF7", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <PersonaSection />
      <ExampleSection />
      <DataSources />
      <CtaFooter />
    </div>
  )
}
