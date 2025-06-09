"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Clock, Users, Calendar } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface BroadcastListProps {
  messages: any[]
  loading: boolean
  onSendNow: (id: number) => void
  onRefresh: () => void
}

export default function BroadcastList({ messages, loading, onSendNow, onRefresh }: BroadcastListProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Brouillon", variant: "secondary" as const },
      scheduled: { label: "Programmé", variant: "outline" as const },
      sending: { label: "En cours", variant: "default" as const },
      sent: { label: "Envoyé", variant: "default" as const },
      failed: { label: "Échec", variant: "destructive" as const },
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getCategoryLabel = (category: string) => {
    const categories = {
      health_tip: "Conseil santé",
      reminder: "Rappel",
      alert: "Alerte",
      info: "Information",
      prevention: "Prévention",
    }
    return categories[category as keyof typeof categories] || category
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Aucun message</h3>
            <p className="text-muted-foreground">
              Commencez par créer votre premier message diffusé
            </p>
          </CardContent>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{message.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{getCategoryLabel(message.category)}</Badge>
                    {getStatusBadge(message.status)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {message.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => onSendNow(message.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Envoyer
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-2">{message.content}</p>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(new Date(message.created_at), "dd MMM yyyy", { locale: fr })}
                  </div>
                  {message.sent_at && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Envoyé le {format(new Date(message.sent_at), "dd MMM yyyy à HH:mm", { locale: fr })}
                    </div>
                  )}
                </div>
                
                {message.deliveries_count > 0 && (
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {message.sent_count}/{message.deliveries_count} patients
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
