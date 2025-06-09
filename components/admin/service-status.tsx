"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle, Database, Wifi, MessageSquare, Brain, HardDrive, Cloud } from "lucide-react"

interface ServiceStatusProps {
  healthStatus: any
  detailed?: boolean
}

export default function ServiceStatus({ healthStatus, detailed = false }: ServiceStatusProps) {
  if (!healthStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statut des Services</CardTitle>
          <CardDescription>Données indisponibles</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const services = [
    { key: 'database', name: 'PostgreSQL', icon: Database, description: 'Base de données principale' },
    { key: 'redis', name: 'Redis', icon: HardDrive, description: 'Cache et queue de tâches' },
    { key: 'n8n', name: 'N8N', icon: Wifi, description: 'Workflows et automation' },
    { key: 'twilio', name: 'Twilio', icon: MessageSquare, description: 'Messages WhatsApp' },
    { key: 'pinecone', name: 'Pinecone', icon: Cloud, description: 'Base de données vectorielle' },
    { key: 'gemini', name: 'Gemini', icon: Brain, description: 'Intelligence artificielle' },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="default" className="bg-green-100 text-green-800">Opérationnel</Badge>
      case 'unhealthy':
        return <Badge variant="destructive">Problème</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut des Services</CardTitle>
        <CardDescription>État en temps réel des services externes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map(service => {
          const serviceData = healthStatus.checks[service.key]
          const Icon = service.icon
          
          return (
            <div key={service.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{service.name}</div>
                  {detailed && (
                    <div className="text-sm text-muted-foreground">{service.description}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(serviceData?.status)}
                {getStatusBadge(serviceData?.status)}
              </div>
              
              {detailed && serviceData?.message && (
                <div className="text-sm text-muted-foreground max-w-xs truncate">
                  {serviceData.message}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
