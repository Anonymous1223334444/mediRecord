"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

interface BroadcastFormProps {
  onSubmit: (message: any) => void
  onCancel: () => void
}

export default function BroadcastForm({ onSubmit, onCancel }: BroadcastFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "health_tip",
    target_all_patients: true,
    target_gender: "",
    target_age_min: "",
    target_age_max: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        target_age_min: formData.target_age_min ? parseInt(formData.target_age_min) : null,
        target_age_max: formData.target_age_max ? parseInt(formData.target_age_max) : null,
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/messaging/broadcast/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        const newMessage = await response.json()
        onSubmit(newMessage)
      } else {
        const error = await response.json()
        toast.error("Erreur lors de la création du message")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur lors de la création du message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouveau Message Diffusé</CardTitle>
        <CardDescription>
          Créez un message qui sera envoyé à vos patients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du message</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ex: Conseil nutrition"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health_tip">Conseil santé</SelectItem>
                  <SelectItem value="reminder">Rappel</SelectItem>
                  <SelectItem value="alert">Alerte</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="prevention">Prévention</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu du message</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Rédigez votre message ici..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="target_all"
                checked={formData.target_all_patients}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, target_all_patients: checked as boolean })
                }
              />
              <Label htmlFor="target_all">Envoyer à tous les patients actifs</Label>
            </div>

            {!formData.target_all_patients && (
              <div className="pl-6 space-y-4 border-l-2 border-gray-200">
                <h4 className="font-medium">Filtres de ciblage</h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Genre</Label>
                    <Select
                      value={formData.target_gender}
                      onValueChange={(value) => setFormData({ ...formData, target_gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="M">Homme</SelectItem>
                        <SelectItem value="F">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age_min">Âge minimum</Label>
                    <Input
                      id="age_min"
                      type="number"
                      value={formData.target_age_min}
                      onChange={(e) => setFormData({ ...formData, target_age_min: e.target.value })}
                      placeholder="ex: 18"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age_max">Âge maximum</Label>
                    <Input
                      id="age_max"
                      type="number"
                      value={formData.target_age_max}
                      onChange={(e) => setFormData({ ...formData, target_age_max: e.target.value })}
                      placeholder="ex: 65"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le message"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
