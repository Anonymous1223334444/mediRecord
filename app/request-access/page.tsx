"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Send, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    institution: "",
    licenseNumber: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulation de l'envoi de la demande
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Demande envoyée avec succès", {
        description: "Votre demande d'accès a été transmise à notre équipe. Vous recevrez une réponse sous 48h.",
      })

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialty: "",
        institution: "",
        licenseNumber: "",
        message: "",
      })
    } catch (error) {
      toast.error("Erreur lors de l'envoi", {
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/50 dark:bg-slate-900/50 border-slate-700 dark:border-slate-600">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">MediRecord</span>
          </div>
          <CardTitle className="text-2xl text-white">Demande d'accès professionnel</CardTitle>
          <CardDescription className="text-gray-300 dark:text-gray-400">
            Remplissez ce formulaire pour demander l'accès à notre plateforme. Notre équipe examinera votre demande et
            vous contactera sous 48h.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  Prénom *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">
                  Nom *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Votre nom"
                  required
                  className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email professionnel *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="votre@email-professionnel.com"
                required
                className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Téléphone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+221 77 123 45 67"
                required
                className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-white">
                Spécialité *
              </Label>
              <Select onValueChange={(value) => handleInputChange("specialty", value)} required>
                <SelectTrigger className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white">
                  <SelectValue placeholder="Sélectionnez votre spécialité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medecin-generaliste">Médecin généraliste</SelectItem>
                  <SelectItem value="cardiologue">Cardiologue</SelectItem>
                  <SelectItem value="pediatre">Pédiatre</SelectItem>
                  <SelectItem value="gynecologie">Gynécologue</SelectItem>
                  <SelectItem value="dermatologue">Dermatologue</SelectItem>
                  <SelectItem value="infirmier">Infirmier(e)</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution" className="text-white">
                Établissement de santé *
              </Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => handleInputChange("institution", e.target.value)}
                placeholder="Nom de votre établissement"
                required
                className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber" className="text-white">
                Numéro de licence/ordre
              </Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                placeholder="Votre numéro de licence professionnelle"
                className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Message (optionnel)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Décrivez brièvement vos besoins ou votre contexte d'utilisation..."
                rows={3}
                className="bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-500 text-white placeholder:text-gray-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full gradient-bg text-slate-900 font-semibold hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer la demande
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-300 dark:text-gray-400 text-sm">Déjà un compte ? </span>
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 text-sm">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
