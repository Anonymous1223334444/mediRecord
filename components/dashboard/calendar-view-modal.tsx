"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface CalendarViewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CalendarViewModal({ open, onOpenChange }: CalendarViewModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Données d'exemple pour le calendrier
  const appointments = [
    { id: 1, patient: "Fatou Sall", time: "09:00", type: "Consultation", status: "Confirmé", date: "2024-01-20" },
    { id: 2, patient: "Mamadou Ba", time: "10:30", type: "Suivi", status: "En attente", date: "2024-01-20" },
    { id: 3, patient: "Aïssatou Diop", time: "14:00", type: "Urgence", status: "Confirmé", date: "2024-01-20" },
    { id: 4, patient: "Ousmane Fall", time: "15:30", type: "Consultation", status: "Reporté", date: "2024-01-21" },
    { id: 5, patient: "Khadija Ndiaye", time: "11:00", type: "Bilan", status: "Confirmé", date: "2024-01-22" },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true })
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false })
    }

    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Calendrier des rendez-vous
          </DialogTitle>
          <DialogDescription>Vue mensuelle de tous vos rendez-vous</DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Navigation du calendrier */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => {
              const dayAppointments = getAppointmentsForDate(day.date)
              const isToday = day.date.toDateString() === new Date().toDateString()

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border rounded-lg ${
                    day.isCurrentMonth
                      ? "bg-white dark:bg-slate-800"
                      : "bg-gray-50 dark:bg-slate-900 text-muted-foreground"
                  } ${isToday ? "ring-2 ring-emerald-500" : ""}`}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday ? "text-emerald-600" : ""}`}>
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="text-xs p-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 truncate"
                      >
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{apt.time}</span>
                        </div>
                        <div className="truncate">{apt.patient}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Légende */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Légende</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/20 rounded"></div>
                  <span className="text-sm">Rendez-vous planifié</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 ring-2 ring-emerald-500 rounded"></div>
                  <span className="text-sm">Aujourd'hui</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques du mois</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total rendez-vous:</span>
                  <Badge variant="outline">{appointments.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Confirmés:</span>
                  <Badge variant="default">{appointments.filter((a) => a.status === "Confirmé").length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">En attente:</span>
                  <Badge variant="secondary">{appointments.filter((a) => a.status === "En attente").length}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
