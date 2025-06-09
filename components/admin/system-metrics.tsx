"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SystemMetricsProps {
  stats: {
    hourly_trends: Array<{
      hour: string
      response_time: number
      conversations: number
    }>
  } | null
}

export default function SystemMetrics({ stats }: SystemMetricsProps) {
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Métriques Système</CardTitle>
          <CardDescription>Données indisponibles</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendances des Performances</CardTitle>
        <CardDescription>Temps de réponse et conversations sur 24h</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.hourly_trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="response_time" 
              stroke="#8884d8" 
              name="Temps de réponse (ms)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="conversations" 
              stroke="#82ca9d" 
              name="Conversations"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}