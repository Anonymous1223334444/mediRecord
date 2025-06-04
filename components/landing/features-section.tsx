"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Calendar, BarChart3 } from "lucide-react"

export default function FeaturesSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: FileText,
      title: "Gestion des dossiers",
      description:
        "Créez et gérez facilement les dossiers patients avec indexation automatique des documents médicaux.",
      color: "text-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      icon: MessageSquare,
      title: "Communication WhatsApp",
      description: "Communiquez directement avec vos patients via WhatsApp pour un suivi personnalisé.",
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      icon: Calendar,
      title: "Gestion des rendez-vous",
      description: "Planifiez et suivez les rendez-vous avec notifications automatiques aux patients.",
      color: "text-purple-500",
      bgColor: "bg-purple-500",
    },
    {
      icon: BarChart3,
      title: "Analyses et rapports",
      description: "Obtenez des insights détaillés sur vos patients et l'efficacité de vos traitements.",
      color: "text-orange-500",
      bgColor: "bg-orange-500",
    },
  ]

  // Render with default light theme styles until mounted
  if (!mounted) {
    return (
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Fonctionnalités avancées</h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Notre plateforme offre tous les outils nécessaires pour une gestion moderne et efficace de vos patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-xl hover:scale-105 group bg-white border-gray-200 hover:bg-gray-50 shadow-lg"
              >
                <CardHeader className="text-center">
                  <div className="relative mb-4">
                    <div
                      className={`h-16 w-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-emerald-500 transition-colors text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Fonctionnalités avancées
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Notre plateforme offre tous les outils nécessaires pour une gestion moderne et efficace de vos patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`transition-all duration-300 hover:shadow-xl hover:scale-105 group ${
                theme === "light"
                  ? "bg-white border-gray-200 hover:bg-gray-50 shadow-lg"
                  : "bg-slate-800/50 border-slate-700 hover:bg-slate-800/70"
              }`}
            >
              <CardHeader className="text-center">
                <div className="relative mb-4">
                  <div
                    className={`h-16 w-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle
                  className={`group-hover:text-emerald-500 transition-colors ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`text-center ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
