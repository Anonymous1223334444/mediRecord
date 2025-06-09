"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserCheck, UserX, MessageSquare, FileText } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Patient {
  id: number
  full_name: string
  phone: string
  email: string
  is_active: boolean
  created_at: string
  activated_at: string | null
  documents_count: number
}

interface PatientStats {
  total_patients: number
  active_patients: number
  inactive_patients: number
  recent_activations: number
}

export default function PatientOverview() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [stats, setStats] = useState<PatientStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all")

  useEffect(() => {
    fetchPatients()
    fetchStats()
  }, [filter])

  const fetchPatients = async () => {
    try {
      const queryParams = new URLSearchParams()
      if (filter !== "all") {
        queryParams.append("is_active", filter === "active" ? "true" : "false")
      }
      if (search) {
        queryParams.append("search", search)
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/list/?${queryParams}`
      )

      if (response.ok) {
        const data = await response.json()
        setPatients(data.results || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des patients:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Cette API devrait être créée dans Django
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/stats/`
      )

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Erreur lors du chargement des stats:", error)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.full_name.toLowerCase().includes(search.toLowerCase()) ||
    patient.phone.includes(search) ||
    patient.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_patients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Patients Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active_patients}</div>
              <div className="text-xs text-muted-foreground">
                {((stats.active_patients / stats.total_patients) * 100).toFixed(1)}% du total
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.inactive_patients}</div>
              <div className="text-xs text-muted-foreground">Non activés</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Activations Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.recent_activations}</div>
              <div className="text-xs text-muted-foreground">Dernières 24h</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Patients</CardTitle>
          <CardDescription>Liste et statut de tous les patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                Tous
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                <UserCheck className="h-4 w-4 mr-1" />
                Actifs
              </Button>
              <Button
                variant={filter === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("inactive")}
              >
                <UserX className="h-4 w-4 mr-1" />
                Inactifs
              </Button>
            </div>
          </div>

          {/* Patients Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead>Activé le</TableHead>
                  <TableHead>Documents</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.full_name}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{patient.phone}</div>
                        <div className="text-muted-foreground">{patient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.is_active ? (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <UserCheck className="h-3 w-3 mr-1" />
                          Actif
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <UserX className="h-3 w-3 mr-1" />
                          En attente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(patient.created_at), "dd/MM/yyyy", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      {patient.activated_at ? (
                        format(new Date(patient.activated_at), "dd/MM/yyyy", { locale: fr })
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                        {patient.documents_count}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun patient trouvé
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
