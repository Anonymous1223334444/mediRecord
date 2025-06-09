"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface LogEntry {
  id: string
  timestamp: string
  level: "INFO" | "WARNING" | "ERROR" | "DEBUG"
  logger: string
  message: string
  details?: any
}

export default function RecentLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [logLevel, setLogLevel] = useState<string>("all")
  const [logSource, setLogSource] = useState<string>("all")

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, 10000) // Refresh every 10 seconds
    return () => clearInterval(interval)
  }, [logLevel, logSource])

  const fetchLogs = async () => {
    try {
      const params = new URLSearchParams()
      if (logLevel !== "all") params.append("level", logLevel)
      if (logSource !== "all") params.append("source", logSource)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/admin/logs/?${params}`
      )

      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "INFO":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "ERROR":
        return <Badge variant="destructive">{level}</Badge>
      case "WARNING":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">{level}</Badge>
      case "INFO":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">{level}</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Logs Récents</CardTitle>
            <CardDescription>Activité du système en temps réel</CardDescription>
          </div>
          <Button onClick={fetchLogs} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
        
        <div className="flex space-x-4">
          <Select value={logLevel} onValueChange={setLogLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              <SelectItem value="ERROR">Erreurs</SelectItem>
              <SelectItem value="WARNING">Avertissements</SelectItem>
              <SelectItem value="INFO">Informations</SelectItem>
              <SelectItem value="DEBUG">Debug</SelectItem>
            </SelectContent>
          </Select>

          <Select value={logSource} onValueChange={setLogSource}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les sources</SelectItem>
              <SelectItem value="django">Django</SelectItem>
              <SelectItem value="celery">Celery</SelectItem>
              <SelectItem value="rag">RAG</SelectItem>
              <SelectItem value="messaging">Messaging</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 p-3 border rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {getLevelIcon(log.level)}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getLevelBadge(log.level)}
                  <Badge variant="outline" className="text-xs">
                    {log.logger}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(log.timestamp), "HH:mm:ss", { locale: fr })}
                  </span>
                </div>
                
                <p className="text-sm break-words">{log.message}</p>
                
                {log.details && (
                  <details className="mt-2">
                    <summary className="text-xs text-muted-foreground cursor-pointer">
                      Détails
                    </summary>
                    <pre className="text-xs mt-1 p-2 bg-muted rounded overflow-x-auto">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          ))}
          
          {logs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun log récent
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
