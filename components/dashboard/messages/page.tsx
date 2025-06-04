"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageSquare, Send, Search, Filter, Phone, Clock, CheckCheck, User, Calendar } from "lucide-react"
import QuickActionsModal from "@/components/dashboard/messages/quick-actions-modal"

interface Conversation {
  id: number
  patient: string
  phone: string
  lastMessage: string
  time: string
  unread: number
  status: string
  avatar: string
  messages?: Message[]
}

interface Message {
  id: number
  text: string
  time: string
  sender: "patient" | "doctor"
  status: "sent" | "delivered" | "read"
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [quickAction, setQuickAction] = useState<"new-message" | "broadcast" | "reminder" | null>(null)

  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      patient: "Fatou Sall",
      phone: "+221 77 123 45 67",
      lastMessage: "Merci docteur pour les conseils, je me sens mieux",
      time: "10:30",
      unread: 0,
      status: "delivered",
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        { id: 1, text: "Bonjour docteur, j'ai des douleurs", time: "09:00", sender: "patient", status: "read" },
        { id: 2, text: "Bonjour, pouvez-vous décrire la douleur ?", time: "09:05", sender: "doctor", status: "read" },
        { id: 3, text: "C'est au niveau de l'estomac", time: "09:10", sender: "patient", status: "read" },
        {
          id: 4,
          text: "Prenez du repos et buvez beaucoup d'eau",
          time: "09:15",
          sender: "doctor",
          status: "delivered",
        },
        {
          id: 5,
          text: "Merci docteur pour les conseils, je me sens mieux",
          time: "10:30",
          sender: "patient",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      patient: "Mamadou Ba",
      phone: "+221 76 987 65 43",
      lastMessage: "Quand dois-je prendre le médicament ?",
      time: "09:15",
      unread: 2,
      status: "sent",
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        { id: 1, text: "Docteur, j'ai récupéré les médicaments", time: "08:00", sender: "patient", status: "read" },
        { id: 2, text: "Parfait, prenez-les après les repas", time: "08:30", sender: "doctor", status: "read" },
        { id: 3, text: "Quand dois-je prendre le médicament ?", time: "09:15", sender: "patient", status: "sent" },
      ],
    },
    {
      id: 3,
      patient: "Aïssatou Diop",
      phone: "+221 78 456 78 90",
      lastMessage: "Rendez-vous confirmé pour demain",
      time: "Hier",
      unread: 0,
      status: "read",
      avatar: "/placeholder.svg?height=40&width=40",
      messages: [
        { id: 1, text: "Puis-je avoir un rendez-vous demain ?", time: "14:00", sender: "patient", status: "read" },
        { id: 2, text: "Oui, 14h vous convient ?", time: "14:30", sender: "doctor", status: "read" },
        { id: 3, text: "Rendez-vous confirmé pour demain", time: "15:00", sender: "patient", status: "read" },
      ],
    },
  ])

  const broadcastMessages = [
    {
      id: 1,
      title: "Conseils hydratation en saison chaude",
      content: "N'oubliez pas de boire au moins 2L d'eau par jour...",
      sent: "2024-01-15",
      recipients: 234,
      status: "Envoyé",
    },
    {
      id: 2,
      title: "Rappel vaccination COVID-19",
      content: "Il est temps de faire votre rappel de vaccination...",
      sent: "2024-01-10",
      recipients: 189,
      status: "Envoyé",
    },
  ]

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation)
  }

  const handleQuickAction = (action: "new-message" | "broadcast" | "reminder") => {
    setQuickAction(action)
    setShowQuickActions(true)
  }

  return (
    <>
      <div className="space-y-6 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Messages WhatsApp</h1>
            <p className="text-slate-600 dark:text-slate-400">Communiquez avec vos patients via WhatsApp</p>
          </div>
          <Button
            className="gradient-bg text-slate-900 font-semibold hover:opacity-90"
            onClick={() => handleQuickAction("new-message")}
          >
            <Send className="mr-2 h-4 w-4" />
            Nouveau message
          </Button>
        </div>

        <Tabs defaultValue="conversations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-3">
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="broadcast">Messages diffusés</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
          </TabsList>

          <TabsContent value="conversations" className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Rechercher une conversation..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversations actives</CardTitle>
                    <CardDescription>Messages WhatsApp avec vos patients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          onClick={() => handleConversationClick(conv)}
                        >
                          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                            <div className="relative">
                              <Avatar className="h-12 w-12 flex-shrink-0">
                                <AvatarImage src={conv.avatar || "/placeholder.svg"} alt={conv.patient} />
                                <AvatarFallback>
                                  {conv.patient
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {conv.unread > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{conv.patient}</h3>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{conv.phone}</span>
                              </p>
                              <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                            </div>
                          </div>

                          <div className="text-right space-y-1">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span>{conv.time}</span>
                            </div>
                            <div className="flex justify-end">
                              {conv.status === "read" && <CheckCheck className="h-4 w-4 text-blue-500" />}
                              {conv.status === "delivered" && <CheckCheck className="h-4 w-4 text-gray-400" />}
                              {conv.status === "sent" && <CheckCheck className="h-4 w-4 text-gray-300" />}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">89</div>
                      <div className="text-sm text-muted-foreground">Messages cette semaine</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-muted-foreground">Patients connectés</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">98%</div>
                      <div className="text-sm text-muted-foreground">Taux de réponse</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleQuickAction("new-message")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Nouveau message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleQuickAction("broadcast")}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Message diffusé
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleQuickAction("reminder")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Rappel rendez-vous
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="broadcast">
            <Card>
              <CardHeader>
                <CardTitle>Messages diffusés</CardTitle>
                <CardDescription>Messages envoyés à tous vos patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {broadcastMessages.map((msg) => (
                    <div key={msg.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{msg.title}</h3>
                        <Badge variant="outline">{msg.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{msg.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Envoyé le {msg.sent}</span>
                        <span>{msg.recipients} destinataires</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Modèles de messages</CardTitle>
                <CardDescription>Modèles prédéfinis pour vos communications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Modèles de messages à venir...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Conversation Details Dialog */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={selectedConversation?.avatar || "/placeholder.svg"}
                  alt={selectedConversation?.patient}
                />
                <AvatarFallback>
                  {selectedConversation?.patient
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{selectedConversation?.patient}</h2>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Phone className="h-3 w-3 mr-1" />
                  {selectedConversation?.phone}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription>Historique de la conversation WhatsApp</DialogDescription>
          </DialogHeader>

          {selectedConversation && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Messages */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedConversation.messages?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === "doctor"
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs opacity-70">{message.time}</span>
                              {message.sender === "doctor" && (
                                <div className="ml-2">
                                  {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-200" />}
                                  {message.status === "delivered" && <CheckCheck className="h-3 w-3 text-gray-300" />}
                                  {message.status === "sent" && <CheckCheck className="h-3 w-3 text-gray-400" />}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="mt-4 flex space-x-2">
                      <Input placeholder="Tapez votre message..." className="flex-1" />
                      <Button size="icon" className="gradient-bg text-slate-900">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Patient Info */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Informations patient
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedConversation.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">WhatsApp connecté</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Dernière activité: {selectedConversation.time}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Planifier RDV
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Voir profil
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Actions Modal */}
      <QuickActionsModal open={showQuickActions} onOpenChange={setShowQuickActions} action={quickAction} />
    </>
  )
}
