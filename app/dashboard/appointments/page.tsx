"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Plus, Search, Filter, User, Phone, MapPin, FileText } from "lucide-react"
import NewAppointmentModal from "@/components/dashboard/new-appointment-modal"
import CalendarViewModal from "@/components/dashboard/calendar-view-modal"
import RemindersModal from "@/components/dashboard/reminders-modal"

interface Appointment {
  id: number
  patient: string
  phone: string
  date: string
  time: string
  type: string
  status: string
  duration: string
  avatar: string
  notes?: string
  address?: string
}

export default function AppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showReminders, setShowReminders] = useState(false)

  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      patient: "Fatou Sall",
      phone: "+221 77 123 45 67",
      date: "2024-01-20",
      time: "09:00",
      type: "Consultation générale",
      status: "Confirmé",
      duration: "30 min",
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Suivi de l'hypertension artérielle",
      address: "Dakar, Plateau",
    },
    {
      id: 2,
      patient: "Mamadou Ba",
      phone: "+221 76 987 65 43",
      date: "2024-01-20",
      time: "10:30",
      type: "Suivi cardiologique",
      status: "En attente",
      duration: "45 min",
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Contrôle post-opératoire",
      address: "Pikine, Guinaw Rails",
    },
    {
      id: 3,
      patient: "Aïssatou Diop",
      phone: "+221 78 456 78 90",
      date: "2024-01-20",
      time: "14:00",
      type: "Urgence",
      status: "Confirmé",
      duration: "60 min",
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Douleurs abdominales",
      address: "Guédiawaye",
    },
    {
      id: 4,
      patient: "Ousmane Fall",
      phone: "+221 77 234 56 78",
      date: "2024-01-21",
      time: "15:30",
      type: "Consultation",
      status: "Reporté",
      duration: "30 min",
      avatar: "/placeholder.svg?height=40&width=40",
      notes: "Bilan de santé annuel",
      address: "Rufisque",
    },
  ])

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
  }

  return (
    <>
      <div className="space-y-6 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Rendez-vous</h1>
            <p className="text-slate-600 dark:text-slate-400">Gérez vos rendez-vous et planifications</p>
          </div>
          <Button
            className="gradient-bg text-slate-900 font-semibold hover:opacity-90"
            onClick={() => setShowNewAppointment(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Rechercher un rendez-vous..." className="pl-10" />
          </div>
          <Button variant="outline" onClick={() => setShowCalendar(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendrier
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendez-vous à venir</CardTitle>
                <CardDescription>Liste de vos prochains rendez-vous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.patient} />
                          <AvatarFallback>
                            {appointment.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold flex items-center">
                            <User className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{appointment.patient}</span>
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{appointment.phone}</span>
                          </p>
                          <p className="text-sm text-muted-foreground truncate">{appointment.type}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium flex items-center">
                            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{appointment.date}</span>
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>
                              {appointment.time} ({appointment.duration})
                            </span>
                          </p>
                        </div>

                        <Badge
                          variant={
                            appointment.status === "Confirmé"
                              ? "default"
                              : appointment.status === "En attente"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {appointment.status}
                        </Badge>
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
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">Aujourd'hui</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-muted-foreground">Cette semaine</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-muted-foreground">En attente</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowNewAppointment(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau rendez-vous
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowCalendar(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Voir le calendrier
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowReminders(true)}>
                  <Clock className="mr-2 h-4 w-4" />
                  Rappels automatiques
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={selectedAppointment?.avatar || "/placeholder.svg"}
                  alt={selectedAppointment?.patient}
                />
                <AvatarFallback>
                  {selectedAppointment?.patient
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{selectedAppointment?.patient}</h2>
                <p className="text-sm text-muted-foreground">{selectedAppointment?.type}</p>
              </div>
            </DialogTitle>
            <DialogDescription>Détails du rendez-vous</DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedAppointment.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedAppointment.time} ({selectedAppointment.duration})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedAppointment.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedAppointment.address}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-1" />
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm">
                      Annuler
                    </Button>
                    <Button variant="outline" size="sm">
                      Reporter
                    </Button>
                    <Button variant="outline" size="sm">
                      Envoyer rappel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <NewAppointmentModal open={showNewAppointment} onOpenChange={setShowNewAppointment} />
      <CalendarViewModal open={showCalendar} onOpenChange={setShowCalendar} />
      <RemindersModal open={showReminders} onOpenChange={setShowReminders} />
    </>
  )
}
