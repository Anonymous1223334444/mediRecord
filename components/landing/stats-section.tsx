"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function StatsSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Render with default light theme styles until mounted
  if (!mounted) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="p-8 shadow-xl bg-white border-gray-200">
              <CardContent className="text-center">
                <div className="text-6xl font-bold gradient-text mb-4">+2500</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">Patients connectés</h3>
                <p className="text-gray-600">
                  Professionnels de santé et patients utilisent déjà notre plateforme pour améliorer leur communication
                  et suivi médical.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Notre plateforme facilite
                <span className="gradient-text"> votre pratique médicale</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Création de profil patient</h4>
                    <p className="text-gray-600">
                      Créez facilement des profils patients avec tous leurs documents médicaux indexés automatiquement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Communication automatisée</h4>
                    <p className="text-gray-600">
                      Envoi automatique de liens WhatsApp aux patients pour activer leur espace personnel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Suivi personnalisé</h4>
                    <p className="text-gray-600">
                      IA intégrée pour répondre aux questions des patients basées sur leur dossier médical.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Card
            className={`p-8 shadow-xl ${
              theme === "light" ? "bg-white border-gray-200" : "bg-slate-800/50 border-slate-700"
            }`}
          >
            <CardContent className="text-center">
              <div className="text-6xl font-bold gradient-text mb-4">+2500</div>
              <h3 className={`text-2xl font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Patients connectés
              </h3>
              <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                Professionnels de santé et patients utilisent déjà notre plateforme pour améliorer leur communication et
                suivi médical.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className={`text-4xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Notre plateforme facilite
              <span className="gradient-text"> votre pratique médicale</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  1
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    Création de profil patient
                  </h4>
                  <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                    Créez facilement des profils patients avec tous leurs documents médicaux indexés automatiquement.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  2
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    Communication automatisée
                  </h4>
                  <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                    Envoi automatique de liens WhatsApp aux patients pour activer leur espace personnel.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  3
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                    Suivi personnalisé
                  </h4>
                  <p className={theme === "light" ? "text-gray-600" : "text-gray-300"}>
                    IA intégrée pour répondre aux questions des patients basées sur leur dossier médical.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
