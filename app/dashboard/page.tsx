import Overview from "@/components/dashboard/overview"
import RecentPatients from "@/components/dashboard/recent-patients"
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments"

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Tableau de bord</h1>
        <p className="text-slate-600 dark:text-slate-400">Vue d'ensemble de votre activité médicale</p>
      </div>

      <Overview />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentPatients />
        <UpcomingAppointments />
      </div>
    </div>
  )
}
