import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, MessageSquare, TrendingUp } from "lucide-react"

export default function Overview() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      description: "+20% par rapport au mois dernier",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Rendez-vous aujourd'hui",
      value: "12",
      description: "3 en attente de confirmation",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Messages WhatsApp",
      value: "89",
      description: "+12% cette semaine",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Taux de satisfaction",
      value: "98%",
      description: "+2% par rapport au mois dernier",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
