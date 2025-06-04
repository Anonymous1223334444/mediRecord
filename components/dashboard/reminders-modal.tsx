"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Save, Bell } from "lucide-react"
import { toast } from "sonner"

interface RemindersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RemindersModal({ open, onOpenChange }: RemindersModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    enableReminders: true,
    reminderTime: "24", // heures avant
    whatsappReminders: true,
    emailReminders: false,
    smsReminders: true,
    customMessage:
      "Bonjour, nous vous rappelons votre rendez-vous prévu demain à {time} avec Dr. {doctor}. Merci de confirmer votre présence.",
    autoConfirmation: true,
    followUpReminders: true,
    followUpDelay: "7", // jours après
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simulation de la sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Paramètres sauvegardés", {
        description: "Vos préférences de rappels ont été mises à jour.",
      })

      onOpenChange(false)
    } catch (error) {
      toast.error("Erreur de sauvegarde", {
        description: "Une erreur est survenue lors de la sauvegarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Configuration des rappels automatiques
          </DialogTitle>
          <DialogDescription>Configurez les rappels automatiques pour vos rendez-vous</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Activation des rappels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rappels de rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer les rappels automatiques</Label>
                  <p className="text-sm text-muted-foreground">Envoyer automatiquement des rappels aux patients</p>
                </div>
                <Switch
                  checked={settings.enableReminders}
                  onCheckedChange={(checked) => handleSettingChange("enableReminders", checked)}
                />
              </div>

              {settings.enableReminders && (
                <div className="space-y-4 pl-4 border-l-2 border-emerald-200">
                  <div className="space-y-2">
                    <Label>Délai de rappel</Label>
                    <Select
                      value={settings.reminderTime}
                      onValueChange={(value) => handleSettingChange("reminderTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 heure avant</SelectItem>
                        <SelectItem value="2">2 heures avant</SelectItem>
                        <SelectItem value="4">4 heures avant</SelectItem>
                        <SelectItem value="12">12 heures avant</SelectItem>
                        <SelectItem value="24">24 heures avant</SelectItem>
                        <SelectItem value="48">48 heures avant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Canaux de communication</Label>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        <span className="text-sm">WhatsApp</span>
                      </div>
                      <Switch
                        checked={settings.whatsappReminders}
                        onCheckedChange={(checked) => handleSettingChange("whatsappReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">SMS</span>
                      </div>
                      <Switch
                        checked={settings.smsReminders}
                        onCheckedChange={(checked) => handleSettingChange("smsReminders", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Email</span>
                      </div>
                      <Switch
                        checked={settings.emailReminders}
                        onCheckedChange={(checked) => handleSettingChange("emailReminders", checked)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message personnalisé */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Message de rappel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Message personnalisé</Label>
                <Textarea
                  value={settings.customMessage}
                  onChange={(e) => handleSettingChange("customMessage", e.target.value)}
                  placeholder="Personnalisez votre message de rappel..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Variables disponibles: {"{time}"}, {"{date}"}, {"{doctor}"}, {"{patient}"}, {"{type}"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Options avancées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Options avancées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Demande de confirmation automatique</Label>
                  <p className="text-sm text-muted-foreground">Demander aux patients de confirmer leur présence</p>
                </div>
                <Switch
                  checked={settings.autoConfirmation}
                  onCheckedChange={(checked) => handleSettingChange("autoConfirmation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rappels de suivi</Label>
                  <p className="text-sm text-muted-foreground">Envoyer des rappels de suivi après les consultations</p>
                </div>
                <Switch
                  checked={settings.followUpReminders}
                  onCheckedChange={(checked) => handleSettingChange("followUpReminders", checked)}
                />
              </div>

              {settings.followUpReminders && (
                <div className="space-y-2 pl-4 border-l-2 border-blue-200">
                  <Label>Délai de suivi</Label>
                  <Select
                    value={settings.followUpDelay}
                    onValueChange={(value) => handleSettingChange("followUpDelay", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 jour après</SelectItem>
                      <SelectItem value="3">3 jours après</SelectItem>
                      <SelectItem value="7">1 semaine après</SelectItem>
                      <SelectItem value="14">2 semaines après</SelectItem>
                      <SelectItem value="30">1 mois après</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques des rappels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-muted-foreground">Taux de livraison</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-xs text-muted-foreground">Taux de confirmation</div>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">156</div>
                  <div className="text-xs text-muted-foreground">Rappels ce mois</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5%</div>
                  <div className="text-xs text-muted-foreground">Taux d'absence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="gradient-bg text-slate-900 font-semibold hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
