"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Users, MessageSquare, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function RecentPatients() {
  const router = useRouter()

  const patients = [
    {
      name: "Fatou Sall",
      phone: "+221 77 123 45 67",
      lastVisit: "2024-01-15",
      status: "Actif",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Mamadou Ba",
      phone: "+221 76 987 65 43",
      lastVisit: "2024-01-14",
      status: "En attente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Aïssatou Diop",
      phone: "+221 78 456 78 90",
      lastVisit: "2024-01-13",
      status: "Actif",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Ousmane Fall",
      phone: "+221 77 234 56 78",
      lastVisit: "2024-01-12",
      status: "Inactif",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "new-patient":
        router.push("/dashboard/patients/new")
        break
      case "view-all":
        router.push("/dashboard/patients")
        break
      case "messages":
        router.push("/dashboard/messages")
        break
      case "documents":
        router.push("/dashboard/documents")
        break
      default:
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients récents</CardTitle>
        <CardDescription>Derniers patients ajoutés à votre plateforme</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                <AvatarFallback>
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.phone}</p>
              </div>
              <div className="text-right space-y-1">
                <Badge
                  variant={
                    patient.status === "Actif" ? "default" : patient.status === "En attente" ? "secondary" : "outline"
                  }
                >
                  {patient.status}
                </Badge>
                <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Actions rapides</h4>
          <div className="space-y-2">
            <Link href="/dashboard/patients/new">
              <Button className="w-full gradient-bg text-slate-900 font-semibold hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau patient
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleQuickAction("view-all")}
            >
              <Users className="mr-2 h-4 w-4" />
              Voir tous les patients
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleQuickAction("messages")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleQuickAction("documents")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Gérer documents
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
