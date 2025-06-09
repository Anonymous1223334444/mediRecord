"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { toast } from "sonner"

interface AlertItem {
  id: number
  metric_type: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  threshold_value: number
  actual_value: number
  resolved: boolean
  created_at: string
  resolved_at?: string
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/metrics/alerts/`
      )

      if (response.ok) {
        const data = await response.json()
        setAlerts(data.results || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des alertes:", error)
    } finally {
      setLoading(false)
    }
  }

  const resolveAlert = async (alertId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/metrics/alerts/${alertId}/resolve/`,
        { method: "POST" }
      )

      if (response.ok) {
        setAlerts(alerts.map(alert =>
          alert.id === alertId ? { ...alert, resolved: true, resolved_at: new Date().toISOString() } : alert
        ))
        toast.success("Alerte résolue")
      }
    } catch (error) {
      console.error("Erreur lors de la résolution de l'alerte:", error)
      toast.error("Erreur lors de la résolution")
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critique</Badge>
      case "high":
        return <Badge variant="destructive" className="bg-orange-100 text-orange-800">Élevé</Badge>
      case "medium":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Moyen</Badge>
      case "low":
        return <Badge variant="secondary">Faible</Badge>
      default:
        return <Badge variant="secondary">{severity}</Badge>
    }
  }

  const activeAlerts = alerts.filter(alert => !alert.resolved)
  const resolvedAlerts = alerts.filter(alert => alert.resolved)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${activeAlerts.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {activeAlerts.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alertes Critiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeAlerts.filter(a => a.severity === 'critical').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Résolues Aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {resolvedAlerts.filter(a => 
                a.resolved_at && new Date(a.resolved_at).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Alertes Actives
          </CardTitle>
          <CardDescription>Alertes nécessitant une attention immédiate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-red-500">
                <AlertDescription>
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline">{alert.metric_type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(alert.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                        </span>
                      </div>
                      
                      <p className="text-sm mb-2">{alert.message}</p>
                      
                      <div className="text-xs text-muted-foreground">
                        Seuil: {alert.threshold_value} | Valeur actuelle: {alert.actual_value}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Résoudre
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
            
            {activeAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                Aucune alerte active
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-600" />
              Alertes Récemment Résolues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {resolvedAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 border rounded-lg bg-green-50">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {alert.resolved_at && format(new Date(alert.resolved_at), "HH:mm", { locale: fr })}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
