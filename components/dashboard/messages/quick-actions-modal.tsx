"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Send, Users, Calendar, X } from "lucide-react"
import { toast } from "sonner"

interface QuickActionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: "new-message" | "broadcast" | "reminder" | null
}

export default function QuickActionsModal({ open, onOpenChange, action }: QuickActionsModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipient: "",
    message: "",
    broadcastTitle: "",
    broadcastContent: "",
    reminderType: "appointment",
    reminderTime: "24",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      switch (action) {
        case "new-message":
          toast.success("Message envoyé", {
            description: "Votre message a été envoyé avec succès.",
          })
          break
        case "broadcast":
          toast.success("Message diffusé", {
            description: "Votre message a été envoyé à tous les patients.",
          })
          break
        case "reminder":
          toast.success("Rappel programmé", {
            description: "Les rappels automatiques ont été activés.",
          })
          break
      }

      setFormData({
        recipient: "",
        message: "",
        broadcastTitle: "",
        broadcastContent: "",
        reminderType: "appointment",
        reminderTime: "24",
      })

      onOpenChange(false)
    } catch (error) {
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de l'envoi.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getModalContent = () => {
    switch (action) {
      case "new-message":
        return {
          title: "Nouveau message",
          description: "Envoyer un message WhatsApp à un patient",
          icon: MessageSquare,
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Destinataire</Label>
                <Select value={formData.recipient} onValueChange={(value) => handleInputChange("recipient", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fatou">Fatou Sall - +221 77 123 45 67</SelectItem>
                    <SelectItem value="mamadou">Mamadou Ba - +221 76 987 65 43</SelectItem>
                    <SelectItem value="aissatou">Aïssatou Diop - +221 78 456 78 90</SelectItem>
                    <SelectItem value="ousmane">Ousmane Fall - +221 77 234 56 78</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tapez votre message..."
                  rows={4}
                  required
                />
              </div>
            </div>
          ),
        }

      case "broadcast":
        return {
          title: "Message diffusé",
          description: "Envoyer un message à tous vos patients",
          icon: Users,
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="broadcastTitle">Titre du message</Label>
                <Input
                  id="broadcastTitle"
                  value={formData.broadcastTitle}
                  onChange={(e) => handleInputChange("broadcastTitle", e.target.value)}
                  placeholder="Ex: Conseils santé, Rappel vaccination..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="broadcastContent">Contenu du message</Label>
                <Textarea
                  id="broadcastContent"
                  value={formData.broadcastContent}
                  onChange={(e) => handleInputChange("broadcastContent", e.target.value)}
                  placeholder="Rédigez votre message pour tous les patients..."
                  rows={5}
                  required
                />
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Ce message sera envoyé à tous vos patients connectés via WhatsApp (environ 156 patients).
                </p>
              </div>
            </div>
          ),
        }

      case "reminder":
        return {
          title: "Rappel rendez-vous",
          description: "Configurer les rappels automatiques",
          icon: Calendar,
          content: (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminderType">Type de rappel</Label>
                <Select
                  value={formData.reminderType}
                  onValueChange={(value) => handleInputChange("reminderType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment">Rappel de rendez-vous</SelectItem>
                    <SelectItem value="medication">Rappel de médicament</SelectItem>
                    <SelectItem value="followup">Rappel de suivi</SelectItem>
                    <SelectItem value="vaccination">Rappel de vaccination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminderTime">Délai d'envoi</Label>
                <Select
                  value={formData.reminderTime}
                  onValueChange={(value) => handleInputChange("reminderTime", value)}
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
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Les rappels seront envoyés automatiquement selon la configuration choisie.
                </p>
              </div>
            </div>
          ),
        }

      default:
        return null
    }
  }

  const modalContent = getModalContent()

  if (!modalContent) return null

  const Icon = modalContent.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Icon className="mr-2 h-5 w-5" />
            {modalContent.title}
          </DialogTitle>
          <DialogDescription>{modalContent.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {modalContent.content}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              <X className="mr-2 h-4 w-4" />
              Annuler
            </Button>
            <Button
              type="submit"
              className="gradient-bg text-slate-900 font-semibold hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                  Envoi...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {action === "broadcast" ? "Diffuser" : action === "reminder" ? "Programmer" : "Envoyer"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
