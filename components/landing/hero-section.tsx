"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Zap } from "lucide-react"

export default function HeroSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render with default light theme styles until mounted
  if (!mounted) {
    return (
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
              1 plateforme pour
              <span className="block gradient-text">gérer toute votre santé</span>
            </h1>

            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              Créez, gérez et suivez les dossiers patients avec notre système d'information sanitaire personnalisé.
              Connectez vos patients via WhatsApp pour un suivi optimal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/request-access">
                <Button
                  size="lg"
                  className="gradient-bg text-slate-900 font-semibold hover:opacity-90 px-8 py-4 text-lg"
                >
                  Demander l'accès professionnel
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Voir la démo
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="rounded-lg p-6 backdrop-blur-sm border bg-white/70 border-gray-200">
                <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Sécurisé</h3>
                <p className="text-gray-600">Données patients chiffrées et conformes aux normes médicales</p>
              </div>
              <div className="rounded-lg p-6 backdrop-blur-sm border bg-white/70 border-gray-200">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Connecté</h3>
                <p className="text-gray-600">Communication directe avec vos patients via WhatsApp</p>
              </div>
              <div className="rounded-lg p-6 backdrop-blur-sm border bg-white/70 border-gray-200">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Intelligent</h3>
                <p className="text-gray-600">IA intégrée pour des conseils santé personnalisés</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            1 plateforme pour
            <span className="block gradient-text">gérer toute votre santé</span>
          </h1>

          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"
            }`}
          >
            Créez, gérez et suivez les dossiers patients avec notre système d'information sanitaire personnalisé.
            Connectez vos patients via WhatsApp pour un suivi optimal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-access">
              <Button size="lg" className="gradient-bg text-slate-900 font-semibold hover:opacity-90 px-8 py-4 text-lg">
                Demander l'accès professionnel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className={`px-8 py-4 text-lg ${
                  theme === "light"
                    ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "border-white/20 text-white hover:bg-white/10 dark:border-white/10 dark:hover:bg-white/5"
                }`}
              >
                Voir la démo
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div
              className={`rounded-lg p-6 backdrop-blur-sm border ${
                theme === "light" ? "bg-white/70 border-gray-200" : "bg-white/5 dark:bg-white/5 border-white/10"
              }`}
            >
              <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Sécurisé
              </h3>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"}>
                Données patients chiffrées et conformes aux normes médicales
              </p>
            </div>
            <div
              className={`rounded-lg p-6 backdrop-blur-sm border ${
                theme === "light" ? "bg-white/70 border-gray-200" : "bg-white/5 dark:bg-white/5 border-white/10"
              }`}
            >
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Connecté
              </h3>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"}>
                Communication directe avec vos patients via WhatsApp
              </p>
            </div>
            <div
              className={`rounded-lg p-6 backdrop-blur-sm border ${
                theme === "light" ? "bg-white/70 border-gray-200" : "bg-white/5 dark:bg-white/5 border-white/10"
              }`}
            >
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Intelligent
              </h3>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"}>
                IA intégrée pour des conseils santé personnalisés
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
