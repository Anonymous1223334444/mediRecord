"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, FileText, MessageSquare, BarChart3, Settings, Plus } from "lucide-react"

const navigation = [
  {
    name: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
  {
    name: "Rendez-vous",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Rapports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    name: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-screen p-4">
      <div className="space-y-2">
        <Link href="/dashboard/patients/new">
          <Button className="w-full gradient-bg text-slate-900 font-semibold hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau patient
          </Button>
        </Link>

        <div className="pt-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
