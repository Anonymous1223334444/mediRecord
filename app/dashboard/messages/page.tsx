"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Send, Clock, Users, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import BroadcastForm from "@/components/broadcast/broadcast-form"
import BroadcastList from "@/components/broadcast/broadcast-list"
import BroadcastStats from "@/components/broadcast/broadcast-stats"

interface BroadcastMessage {
  id: number
  title: string
  content: string
  category: string
  status: string
  scheduled_at: string | null
  sent_at: string | null
  created_at: string
  deliveries_count: number
  sent_count: number
}

interface BroadcastStats {
  total_messages: number
  sent_messages: number
  pending_messages: number
  success_rate: number
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<BroadcastMessage[]>([])
  const [stats, setStats] = useState<BroadcastStats | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("list")

  useEffect(() => {
    fetchMessages()
    fetchStats()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/messaging/broadcast/`
      )
      if (response.ok) {
        const data = await response.json()
        setMessages(data.results || data)
      }
    } catch (error) {
      console.error("Erreur chargement messages:", error)
      toast.error("Erreur lors du chargement des messages")
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/messaging/broadcast/stats/`
      )
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Erreur chargement stats:", error)
    }
  }

  const handleMessageCreated = (newMessage: BroadcastMessage) => {
    setMessages([newMessage, ...messages])
    setShowForm(false)
    fetchStats() // Refresh stats
    toast.success("Message créé avec succès!")
  }

  const handleSendNow = async (messageId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/messaging/broadcast/${messageId}/send_now/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.ok) {
        toast.success("Envoi démarré!")
        fetchMessages() // Refresh list
        fetchStats() // Refresh stats
      } else {
        const error = await response.json()
        toast.error(error.error || "Erreur lors de l'envoi")
      }
    } catch (error) {
      console.error("Erreur envoi:", error)
      toast.error("Erreur lors de l'envoi")
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Messages Diffusés</h1>
          <p className="text-muted-foreground">
            Envoyez des conseils santé et informations à vos patients
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Message
        </Button>
      </div>

      {stats && <BroadcastStats stats={stats} />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="list">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Users className="h-4 w-4 mr-2" />
            Analyses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {showForm ? (
            <BroadcastForm
              onSubmit={handleMessageCreated}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <BroadcastList
              messages={messages}
              loading={loading}
              onSendNow={handleSendNow}
              onRefresh={fetchMessages}
            />
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analyses Détaillées</CardTitle>
              <CardDescription>
                Statistiques d'engagement et de livraison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Analyses détaillées à venir...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
