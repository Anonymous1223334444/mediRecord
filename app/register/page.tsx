"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'inscription
    setTimeout(() => {
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-emerald-400" />
            <span className="text-2xl font-bold text-white">MediRecord</span>
          </div>
          <CardTitle className="text-2xl text-white">Inscription</CardTitle>
          <CardDescription className="text-gray-300">Créez votre compte professionnel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  placeholder="Prénom"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  placeholder="Nom"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+221 77 123 45 67"
                required
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-white">
                Spécialité
              </Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
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
              <Label htmlFor="password" className="text-white">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-bg text-slate-900 font-semibold hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-gray-300 text-sm">Déjà un compte ? </span>
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 text-sm">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
