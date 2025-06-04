"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MoreHorizontal,
  Eye,
  Edit,
  MessageSquare,
  FileText,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertTriangle,
} from "lucide-react"

interface Patient {
  id: number
  name: string
  phone: string
  email: string
  age: number
  lastVisit: string
  status: string
  whatsappConnected: boolean
  avatar: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: string
  allergies: string
  currentMedications: string
}

export default function PatientsList() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patients] = useState<Patient[]>([
    {
      id: 1,
      name: "Fatou Sall",
      phone: "+221 77 123 45 67",
      email: "fatou.sall@email.com",
      age: 34,
      lastVisit: "2024-01-15",
      status: "Actif",
      whatsappConnected: true,
      avatar: "/placeholder.svg?height=40&width=40",
      dateOfBirth: "1990-03-15",
      address: "Dakar, Plateau, Rue 10",
      emergencyContact: "Moussa Sall",
      emergencyPhone: "+221 77 987 65 43",
      medicalHistory: "Hypertension artérielle, diabète type 2",
      allergies: "Pénicilline, fruits de mer",
      currentMedications: "Metformine 500mg, Lisinopril 10mg",
    },
    {
      id: 2,
      name: "Mamadou Ba",
      phone: "+221 76 987 65 43",
      email: "mamadou.ba@email.com",
      age: 45,
      lastVisit: "2024-01-14",
      status: "En attente",
      whatsappConnected: false,
      avatar: "/placeholder.svg?height=40&width=40",
      dateOfBirth: "1979-07-22",
      address: "Pikine, Quartier Guinaw Rails",
      emergencyContact: "Awa Ba",
      emergencyPhone: "+221 78 456 78 90",
      medicalHistory: "Asthme chronique",
      allergies: "Pollen, acariens",
      currentMedications: "Ventoline, Symbicort",
    },
    {
      id: 3,
      name: "Aïssatou Diop",
      phone: "+221 78 456 78 90",
      email: "aissatou.diop@email.com",
      age: 28,
      lastVisit: "2024-01-13",
      status: "Actif",
      whatsappConnected: true,
      avatar: "/placeholder.svg?height=40&width=40",
      dateOfBirth: "1996-11-08",
      address: "Guédiawaye, Cité Millionnaire",
      emergencyContact: "Ibrahima Diop",
      emergencyPhone: "+221 77 234 56 78",
      medicalHistory: "Aucun antécédent majeur",
      allergies: "Aucune allergie connue",
      currentMedications: "Aucun traitement en cours",
    },
    {
      id: 4,
      name: "Ousmane Fall",
      phone: "+221 77 234 56 78",
      email: "ousmane.fall@email.com",
      age: 52,
      lastVisit: "2024-01-12",
      status: "Inactif",
      whatsappConnected: false,
      avatar: "/placeholder.svg?height=40&width=40",
      dateOfBirth: "1972-05-30",
      address: "Rufisque, Quartier Keury Souf",
      emergencyContact: "Mariama Fall",
      emergencyPhone: "+221 76 345 67 89",
      medicalHistory: "Arthrite rhumatoïde, cholestérol élevé",
      allergies: "Aspirine",
      currentMedications: "Methotrexate, Atorvastatine",
    },
  ])

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Liste des patients ({patients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                onClick={() => handlePatientClick(patient)}
              >
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{patient.phone}</span>
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{patient.email}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{patient.age} ans</p>
                    <p className="text-xs text-muted-foreground">Âge</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium">{patient.lastVisit}</p>
                    <p className="text-xs text-muted-foreground">Dernière visite</p>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Badge
                      variant={
                        patient.status === "Actif"
                          ? "default"
                          : patient.status === "En attente"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {patient.status}
                    </Badge>
                    {patient.whatsappConnected && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        WhatsApp
                      </Badge>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePatientClick(patient)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <FileText className="mr-2 h-4 w-4" />
                        Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Envoyer message
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedPatient?.avatar || "/placeholder.svg"} alt={selectedPatient?.name} />
                <AvatarFallback>
                  {selectedPatient?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{selectedPatient?.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedPatient?.age} ans</p>
              </div>
            </DialogTitle>
            <DialogDescription>Profil complet du patient avec toutes les informations médicales</DialogDescription>
          </DialogHeader>

          {selectedPatient && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Né(e) le {selectedPatient.dateOfBirth}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <span>{selectedPatient.address}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact d'urgence */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                    Contact d'urgence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{selectedPatient.emergencyContact}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {selectedPatient.emergencyPhone}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Antécédents médicaux */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Antécédents médicaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedPatient.medicalHistory || "Aucun antécédent majeur"}</p>
                </CardContent>
              </Card>

              {/* Allergies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedPatient.allergies || "Aucune allergie connue"}</p>
                </CardContent>
              </Card>

              {/* Médicaments actuels */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Médicaments actuels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{selectedPatient.currentMedications || "Aucun traitement en cours"}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier le profil
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Voir les documents
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Envoyer un message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Planifier RDV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
