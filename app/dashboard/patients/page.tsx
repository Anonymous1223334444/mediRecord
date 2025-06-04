import PatientsList from "@/components/dashboard/patients-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"

export default function PatientsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gestion des patients</h1>
          <p className="text-slate-600 dark:text-slate-400">Créez et gérez les profils de vos patients</p>
        </div>
        <Link href="/dashboard/patients/new">
              <Button className="w-full gradient-bg text-slate-900 font-semibold hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau patient
              </Button>
            </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Rechercher un patient..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      <PatientsList />
    </div>
  )
}
