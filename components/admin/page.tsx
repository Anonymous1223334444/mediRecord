"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  HardDrive,
  MessageSquare,
  RefreshCw,
  Server,
  Users,
  Wifi,
  XCircle
} from "lucide-react"
import { toast } from "sonner"
import SystemMetrics from "@/components/admin/system-metrics"
import ServiceStatus from "@/components/admin/service-status"
import RecentLogs from "@/components/admin/recent-logs"
import PatientOverview from "@/components/admin/patient-overview"
import AlertsPanel from "@/components/admin/alerts-panel"

interface HealthCheck {
  overall_status: string
  timestamp: number
  checks: {
    database: { status: string; message: string }
    redis: { status: string; message: string }
    n8n: { status: string; message: string }
    twilio: { status: string; message: string }
    pinecone: { status: string; message: string }
    gemini: { status: string; message: string }
  }
}

interface SystemStats {
  period_hours: number
  avg_response_time_ms: number
  indexing_success_rate: number
  delivery_success_rate: number
  active_alerts: number
  hourly_trends: Array<{
    hour: string
    response_time: number
    conversations: number
  }>
}

export default function AdminDashboard() {
  const [healthStatus, setHealthStatus] = useState<HealthCheck | null>(null)
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [healthResponse, metricsResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/health/`),
        fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/metrics/dashboard/?hours=24`)
      ])

      if (healthResponse.ok) {
        const healthData = await healthResponse.json()
        setHealthStatus(healthData)
      }

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setSystemStats(metricsData)
      }

      setLastRefresh(new Date())
    } catch (error) {
      console.error("Erreur lors du chargement du dashboard:", error)
      toast.error("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600"
      case "unhealthy": return "text-red-600"
      default: return "text-yellow-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-5 w-5 text-green-600" />
      case "unhealthy": return <XCircle className="h-5 w-5 text-red-600" />
      default: return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Chargement du dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Administration MediRecord</h1>
          <p className="text-muted-foreground">
            Dernière mise à jour: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Status Overview */}
      {healthStatus && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={`border-l-4 ${healthStatus.overall_status === 'healthy' ? 'border-green-500' : 'border-red-500'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Statut Général</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {getStatusIcon(healthStatus.overall_status)}
                <span className={`font-semibold ${getStatusColor(healthStatus.overall_status)}`}>
                  {healthStatus.overall_status === 'healthy' ? 'Opérationnel' : 'Problème Détecté'}
                </span>
              </div>
            </CardContent>
          </Card>

          {systemStats && (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Temps de Réponse</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.avg_response_time_ms.toFixed(0)}ms</div>
                  <p className="text-xs text-muted-foreground">Moyenne 24h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Taux d'Indexation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemStats.indexing_success_rate.toFixed(1)}%</div>
                  <Progress value={systemStats.indexing_success_rate} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className={`text-2xl font-bold ${systemStats.active_alerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {systemStats.active_alerts}
                    </div>
                    {systemStats.active_alerts > 0 && (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="services">
            <Server className="h-4 w-4 mr-2" />
            Services
          </TabsTrigger>
          <TabsTrigger value="patients">
            <Users className="h-4 w-4 mr-2" />
            Patients
          </TabsTrigger>
          <TabsTrigger value="logs">
            <MessageSquare className="h-4 w-4 mr-2" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Alertes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SystemMetrics stats={systemStats} />
            <ServiceStatus healthStatus={healthStatus} />
          </div>
        </TabsContent>

        <TabsContent value="services">
          <ServiceStatus healthStatus={healthStatus} detailed={true} />
        </TabsContent>

        <TabsContent value="patients">
          <PatientOverview />
        </TabsContent>

        <TabsContent value="logs">
          <RecentLogs />
        </TabsContent>

        <TabsContent value="alerts">
          <AlertsPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}