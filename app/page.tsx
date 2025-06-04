"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import LandingHeader from "@/components/landing/landing-header"
import HeroSection from "@/components/landing/hero-section"
import FeaturesSection from "@/components/landing/features-section"
import StatsSection from "@/components/landing/stats-section"
import PartnersSection from "@/components/landing/partners-section"
import Footer from "@/components/landing/footer"

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render with default light theme styles until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <LandingHeader />
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          : "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900"
      }`}
    >
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
