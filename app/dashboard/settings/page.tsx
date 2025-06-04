"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Smartphone, Save, Camera } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=80&width=80")

  useEffect(() => {
    // Récupérer l'image de profil depuis le localStorage
    const savedImage = localStorage.getItem("profileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setProfileImage(imageUrl)
        // Sauvegarder dans le localStorage pour persistance
        localStorage.setItem("profileImage", imageUrl)
        toast.success("Photo de profil mise à jour")

        // Déclencher un événement pour mettre à jour l'avatar dans le header
        window.dispatchEvent(new CustomEvent("profileImageUpdated", { detail: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Paramètres</h1>
          <p className="text-slate-600 dark:text-slate-400">Gérez vos préférences et configurations</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>Mettez à jour vos informations de profil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Dr. Diallo" />
                    <AvatarFallback>DD</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <Label htmlFor="profile-upload" className="cursor-pointer">
                      <div className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                    </Label>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-lg">Photo de profil</h3>
                  <p className="text-sm text-muted-foreground">
                    Cliquez sur l'icône pour changer votre photo de profil
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Formats acceptés: JPG, PNG (max. 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Aminata" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Diallo" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="aminata.diallo@medirecord.sn" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="+221 77 123 45 67" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Spécialité</Label>
                <Select defaultValue="medecin-generaliste">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medecin-generaliste">Médecin généraliste</SelectItem>
                    <SelectItem value="cardiologue">Cardiologue</SelectItem>
                    <SelectItem value="pediatre">Pédiatre</SelectItem>
                    <SelectItem value="gynecologie">Gynécologue</SelectItem>
                    <SelectItem value="dermatologue">Dermatologue</SelectItem>
                    <SelectItem value="infirmier">Infirmier(e)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic">Établissement</Label>
                <Input id="clinic" defaultValue="Institu Pasteur Dakar" />
              </div>

              <Button className="gradient-bg text-slate-900 font-semibold hover:opacity-90">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Préférences de notifications
              </CardTitle>
              <CardDescription>Configurez vos notifications et alertes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouveaux messages patients</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir une notification pour chaque nouveau message
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rappels de rendez-vous</Label>
                    <p className="text-sm text-muted-foreground">Notifications 1h avant chaque rendez-vous</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouveaux patients</Label>
                    <p className="text-sm text-muted-foreground">Notification lors de l'ajout d'un nouveau patient</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Documents indexés</Label>
                    <p className="text-sm text-muted-foreground">Notification quand un document est indexé</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rapports hebdomadaires</Label>
                    <p className="text-sm text-muted-foreground">Recevoir un résumé hebdomadaire par email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="gradient-bg text-slate-900 font-semibold hover:opacity-90">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les préférences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Configuration WhatsApp Business
              </CardTitle>
              <CardDescription>Paramètres de votre intégration WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Numéro WhatsApp Business</Label>
                  <Input id="whatsapp-number" defaultValue="+221 77 123 45 67" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-name">Nom de l'entreprise</Label>
                  <Input id="business-name" defaultValue="Dr. Aminata Diallo - MediRecord" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Messages automatiques</Label>
                    <p className="text-sm text-muted-foreground">Réponses automatiques hors heures d'ouverture</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Accusés de réception</Label>
                    <p className="text-sm text-muted-foreground">Confirmer la réception des messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="auto-response">Message de réponse automatique</Label>
                  <Input
                    id="auto-response"
                    defaultValue="Merci pour votre message. Je vous répondrai dès que possible."
                  />
                </div>
              </div>

              <Button className="gradient-bg text-slate-900 font-semibold hover:opacity-90">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder la configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Sécurité et confidentialité
              </CardTitle>
              <CardDescription>Gérez la sécurité de votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">Sécurité renforcée pour votre compte</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sessions actives</Label>
                    <p className="text-sm text-muted-foreground">Gérer les appareils connectés</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir les sessions
                  </Button>
                </div>
              </div>

              <Button className="gradient-bg text-slate-900 font-semibold hover:opacity-90">
                <Save className="mr-2 h-4 w-4" />
                Mettre à jour la sécurité
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
