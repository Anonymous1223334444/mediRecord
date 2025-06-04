"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PartnersSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const partners = [
    {
      name: "Hôpital Principal",
      logo: "🏥",
      type: "Hôpital public",
      patients: "2,500+",
      color: "bg-blue-500",
    },
    {
      name: "Clinique Pasteur",
      logo: "🏥",
      type: "Clinique privée",
      patients: "1,200+",
      color: "bg-green-500",
    },
    {
      name: "Centre Médical Dantec",
      logo: "🏥",
      type: "Centre spécialisé",
      patients: "800+",
      color: "bg-purple-500",
    },
    {
      name: "Pharmacie Plus",
      logo: "💊",
      type: "Pharmacie",
      patients: "3,000+",
      color: "bg-orange-500",
    },
    {
      name: "Laboratoire Santé",
      logo: "🔬",
      type: "Laboratoire",
      patients: "1,500+",
      color: "bg-cyan-500",
    },
    {
      name: "Urgences 24h",
      logo: "🚑",
      type: "Service d'urgence",
      patients: "5,000+",
      color: "bg-red-500",
    },
    {
      name: "Cardio Center",
      logo: "❤️",
      type: "Cardiologie",
      patients: "600+",
      color: "bg-pink-500",
    },
    {
      name: "Pédiatrie Pro",
      logo: "👶",
      type: "Pédiatrie",
      patients: "900+",
      color: "bg-yellow-500",
    },
  ]

  // Render with default light theme styles until mounted
  if (!mounted) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nos partenaires de confiance</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto text-gray-600">
              Plus de 150 établissements de santé nous font confiance pour améliorer leur relation patient.
            </p>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-500">15,000+</div>
                <div className="text-sm text-gray-600">Patients connectés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">150+</div>
                <div className="text-sm text-gray-600">Établissements</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:scale-105 group shadow-lg bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 ${partner.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <span className="text-2xl">{partner.logo}</span>
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-emerald-500 transition-colors text-gray-900">
                    {partner.name}
                  </h3>
                  <Badge variant="outline" className="mb-2 text-xs border-gray-300 text-gray-600 bg-gray-50">
                    {partner.type}
                  </Badge>
                  <p className="text-sm mb-2 text-gray-500">{partner.patients} patients</p>
                  <div className="w-full rounded-full h-2 bg-gray-200">
                    <div
                      className={`h-2 ${partner.color} rounded-full transition-all duration-500 group-hover:w-full shadow-sm`}
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl border shadow-lg bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Rejoignez notre réseau</h3>
            <p className="mb-6 max-w-2xl mx-auto text-gray-600">
              Votre établissement souhaite intégrer MediRecord ? Contactez-nous pour découvrir comment nous pouvons
              améliorer votre relation patient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
                Devenir partenaire
              </button>
              <button className="px-6 py-3 border border-emerald-500 text-emerald-500 hover:bg-emerald-50 rounded-lg font-semibold transition-colors shadow-md">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Nos partenaires de confiance
          </h2>
          <p
            className={`text-xl mb-6 max-w-2xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"
            }`}
          >
            Plus de 150 établissements de santé nous font confiance pour améliorer leur relation patient.
          </p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">15,000+</div>
              <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"}`}>
                Patients connectés
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">150+</div>
              <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"}`}>
                Établissements
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">98%</div>
              <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"}`}>
                Satisfaction
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className={`transition-all duration-300 hover:scale-105 group shadow-lg ${
                theme === "light"
                  ? "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-xl"
                  : "bg-slate-800/50 dark:bg-slate-900/50 border-slate-700 dark:border-slate-600 hover:bg-slate-800/70 dark:hover:bg-slate-900/70"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div
                    className={`w-16 h-16 ${partner.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <span className="text-2xl">{partner.logo}</span>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  </div>
                </div>
                <h3
                  className={`font-semibold mb-2 group-hover:text-emerald-500 transition-colors ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {partner.name}
                </h3>
                <Badge
                  variant="outline"
                  className={`mb-2 text-xs ${
                    theme === "light"
                      ? "border-gray-300 text-gray-600 bg-gray-50"
                      : "border-slate-600 text-gray-300 bg-slate-800/50"
                  }`}
                >
                  {partner.type}
                </Badge>
                <p className={`text-sm mb-2 ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  {partner.patients} patients
                </p>
                <div
                  className={`w-full rounded-full h-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-slate-700 dark:bg-slate-800"
                  }`}
                >
                  <div
                    className={`h-2 ${partner.color} rounded-full transition-all duration-500 group-hover:w-full shadow-sm`}
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div
          className={`mt-12 p-8 rounded-2xl border shadow-lg ${
            theme === "light"
              ? "bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200"
              : "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20"
          }`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Rejoignez notre réseau
          </h3>
          <p
            className={`mb-6 max-w-2xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-300 dark:text-gray-400"
            }`}
          >
            Votre établissement souhaite intégrer MediRecord ? Contactez-nous pour découvrir comment nous pouvons
            améliorer votre relation patient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
              Devenir partenaire
            </button>
            <button
              className={`px-6 py-3 border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 rounded-lg font-semibold transition-colors shadow-md ${
                theme === "light" ? "hover:bg-emerald-50" : ""
              }`}
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
