"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Heart, Menu, X } from "lucide-react"

export default function LandingHeader() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Render with default light theme styles until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">MediRecord</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="transition-colors text-gray-600 hover:text-gray-900">
              Fonctionnalités
            </Link>
            <Link href="#about" className="transition-colors text-gray-600 hover:text-gray-900">
              À propos
            </Link>
            <Link href="#contact" className="transition-colors text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ModeToggle />
            <div className="hidden sm:block">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
            <Link href="/register">
              <Button size="sm" className="gradient-bg text-slate-900 font-semibold hover:opacity-90 sm:size-default">
                S'inscrire
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-900" onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${
        theme === "light"
          ? "border-gray-200 bg-white/80 backdrop-blur-md"
          : "border-white/10 dark:border-white/5 bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
            <span className={`text-xl sm:text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              MediRecord
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className={`transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-900"
                : "text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white"
            }`}
          >
            Fonctionnalités
          </Link>
          <Link
            href="#about"
            className={`transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-900"
                : "text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white"
            }`}
          >
            À propos
          </Link>
          <Link
            href="#contact"
            className={`transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-gray-900"
                : "text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <ModeToggle />
          <div className="hidden sm:block">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
              >
                Se connecter
              </Button>
            </Link>
          </div>
          <Link href="/register">
            <Button size="sm" className="gradient-bg text-slate-900 font-semibold hover:opacity-90 sm:size-default">
              S'inscrire
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${theme === "light" ? "text-gray-900" : "text-white"}`}
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden absolute w-full py-4 px-6 shadow-lg ${
            theme === "light" ? "bg-white border-t border-gray-200" : "bg-slate-900 border-t border-white/10"
          }`}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              className={`transition-colors ${
                theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="#about"
              className={`transition-colors ${
                theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="#contact"
              className={`transition-colors ${
                theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 sm:hidden">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
