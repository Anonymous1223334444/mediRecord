import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Calendar, Download, Activity, PieChart, LineChart } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Rapports et analyses</h1>
          <p className="text-slate-600 dark:text-slate-400">Analysez vos données et performances</p>
        </div>
        <Button className="gradient-bg text-slate-900 font-semibold hover:opacity-90">
          <Download className="mr-2 h-4 w-4" />
          Exporter rapport
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20% par rapport au mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rendez-vous ce mois</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de satisfaction</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">+2% par rapport au mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages WhatsApp</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-5 w-5" />
                  Évolution des patients
                </CardTitle>
                <CardDescription>Nombre de nouveaux patients par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800">
                  <LineChart className="h-16 w-16 text-blue-400 mb-4" />
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Graphique linéaire</h3>
                  <p className="text-sm text-blue-500 dark:text-blue-300 text-center max-w-xs">
                    Évolution mensuelle du nombre de nouveaux patients avec tendances et projections
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-100"></div>
                    <div className="w-3 h-3 bg-blue-200 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Répartition par spécialité
                </CardTitle>
                <CardDescription>Distribution des consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg border-2 border-dashed border-emerald-200 dark:border-emerald-800">
                  <PieChart className="h-16 w-16 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                    Graphique circulaire
                  </h3>
                  <p className="text-sm text-emerald-500 dark:text-emerald-300 text-center max-w-xs">
                    Répartition des consultations par spécialité médicale avec pourcentages
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Générale</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Cardio</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-200 rounded-full"></div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Pédiatrie</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-100 rounded-full"></div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Autres</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Performance mensuelle
                </CardTitle>
                <CardDescription>Comparaison des métriques clés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border-2 border-dashed border-purple-200 dark:border-purple-800">
                  <BarChart3 className="h-12 w-12 text-purple-400 mb-3" />
                  <h3 className="text-md font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    Graphique en barres
                  </h3>
                  <p className="text-xs text-purple-500 dark:text-purple-300 text-center max-w-xs">
                    Comparaison mensuelle des rendez-vous, nouveaux patients et satisfaction
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Activité en temps réel
                </CardTitle>
                <CardDescription>Métriques en direct</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/20 dark:to-red-950/20 rounded-lg border-2 border-dashed border-orange-200 dark:border-orange-800">
                  <Activity className="h-12 w-12 text-orange-400 mb-3" />
                  <h3 className="text-md font-semibold text-orange-600 dark:text-orange-400 mb-2">
                    Activité temps réel
                  </h3>
                  <p className="text-xs text-orange-500 dark:text-orange-300 text-center max-w-xs">
                    Suivi en direct des connexions patients et messages WhatsApp
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <span className="text-xs text-orange-600 dark:text-orange-400">En ligne</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des patients</CardTitle>
              <CardDescription>Statistiques détaillées sur vos patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-muted-foreground">Nouveaux patients ce mois</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-muted-foreground">Taux de rétention</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">34</div>
                    <div className="text-sm text-muted-foreground">Âge moyen</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des rendez-vous</CardTitle>
              <CardDescription>Performance et statistiques des rendez-vous</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-sm text-muted-foreground">Taux de présence</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">5%</div>
                    <div className="text-sm text-muted-foreground">Taux d'annulation</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">30min</div>
                    <div className="text-sm text-muted-foreground">Durée moyenne</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Analyse de la communication</CardTitle>
              <CardDescription>Statistiques WhatsApp et engagement patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-muted-foreground">Taux de réponse</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.5h</div>
                    <div className="text-sm text-muted-foreground">Temps de réponse moyen</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">156</div>
                    <div className="text-sm text-muted-foreground">Patients connectés</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
