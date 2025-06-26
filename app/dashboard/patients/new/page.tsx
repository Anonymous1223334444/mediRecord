"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Phone,
  Mail,
  Calendar,
  Upload,
  FileText,
  ImageIcon,
  X,
  Save,
  ArrowLeft,
  CheckCircle,
  Loader2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

interface IndexingStatus {
  total_documents: number
  indexed: number
  processing: number
  failed: number
  pending: number
  progress: number
  is_complete: boolean
  documents: Array<{
    id: string
    filename: string
    status: "indexed" | "processing" | "failed" | "pending"
    error?: string
  }>
}

interface IndexingProgressModalProps {
  isOpen: boolean
  onClose: (value: boolean) => void
  patientId: string | null
  patientName: string
  onComplete?: (status: IndexingStatus) => void
}

const IndexingProgressModal: React.FC<IndexingProgressModalProps> = ({
  isOpen,
  onClose,
  patientId,
  patientName,
  onComplete,
}) => {
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>({
    total_documents: 0,
    indexed: 0,
    processing: 0,
    failed: 0,
    pending: 0,
    progress: 0,
    is_complete: false,
    documents: [],
  })

  const [isPolling, setIsPolling] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !patientId) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/${patientId}/indexing-status/`,
        );

        if (!response.ok) throw new Error("Erreur lors de la récupération du statut");

        const data: IndexingStatus = await response.json();
        setIndexingStatus(data);

        // Si terminé, arrêter le polling et fermer le modal après 2s
        if (data.is_complete) {
          setIsPolling(false);
          
          // Fermer automatiquement après 2 secondes
          setTimeout(() => {
            onClose(false);
            if (onComplete) onComplete(data);
          }, 2000);
        }
      } catch (err) {
        console.error("Erreur polling:", err);
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      }
    };

    // Poll immédiatement
    pollStatus()

    // Puis toutes les 2 secondes si toujours en cours
    const interval = isPolling ? setInterval(pollStatus, 2000) : null

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isOpen, patientId, isPolling, onComplete, onClose])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "processing":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      indexed: "default",
      processing: "default",
      failed: "destructive",
      pending: "secondary",
    }

    const labels: Record<string, string> = {
      indexed: "Indexé",
      processing: "En cours",
      failed: "Échoué",
      pending: "En attente",
    }

    return <Badge variant={variants[status] || "default"}>{labels[status] || status}</Badge>
  }

  const retryFailedDocuments = async () => {
    const failedDocs = indexingStatus.documents.filter((doc) => doc.status === "failed")

    for (const doc of failedDocs) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/documents/${doc.id}/retry/`, { method: "POST" })
      } catch (err) {
        console.error(`Erreur retry document ${doc.id}:`, err)
      }
    }

    setIsPolling(true)
    toast.info("Relance des documents échoués...")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Indexation des documents</DialogTitle>
          <DialogDescription>Traitement des documents médicaux de {patientName}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Vue d'ensemble */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Progression globale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span className="font-medium">{indexingStatus.progress}%</span>
                </div>
                <Progress value={indexingStatus.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Documents traités</p>
                  <p className="text-2xl font-semibold">
                    {indexingStatus.indexed} / {indexingStatus.total_documents}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Statut</p>
                  <div className="flex items-center gap-2">
                    {indexingStatus.is_complete ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-600">Terminé</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                        <span className="font-medium text-blue-600">En cours</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistiques détaillées */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Indexés</p>
                  <p className="text-lg font-semibold text-green-600">{indexingStatus.indexed}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">En cours</p>
                  <p className="text-lg font-semibold text-blue-600">{indexingStatus.processing}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">En attente</p>
                  <p className="text-lg font-semibold text-yellow-600">{indexingStatus.pending}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Échoués</p>
                  <p className="text-lg font-semibold text-red-600">{indexingStatus.failed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des documents */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Détail des documents</CardTitle>
                {indexingStatus.failed > 0 && indexingStatus.is_complete && (
                  <Button variant="outline" size="sm" onClick={retryFailedDocuments} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Réessayer les échecs
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {indexingStatus.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <p className="font-medium text-sm">{doc.filename}</p>
                        {doc.error && <p className="text-xs text-red-600 mt-1">{doc.error}</p>}
                      </div>
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message d'erreur si nécessaire */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          {!indexingStatus.is_complete && (
            <Button variant="outline" onClick={() => onClose(false)}>
              Continuer en arrière-plan
            </Button>
          )}
          <Button 
            onClick={() => onClose(false)} 
            disabled={!indexingStatus.is_complete && indexingStatus.failed === 0}
          >
            {indexingStatus.is_complete ? 
              "Terminer" : 
              (indexingStatus.failed > 0 ? "Afficher les erreurs" : "Traitement en cours...")
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  file: File
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: string
  allergies: string
  currentMedications: string
}

export default function NewPatientPage() {
  const [showIndexingModal, setShowIndexingModal] = useState(false)
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(null)
  const [currentPatientName, setCurrentPatientName] = useState("")
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
  })

  const [isIndexingInBackground, setIsIndexingInBackground] = useState(false)
  const [indexingStatus, setIndexingStatus] = useState<IndexingStatus>({
    total_documents: 0,
    indexed: 0,
    processing: 0,
    failed: 0,
    pending: 0,
    progress: 0,
    is_complete: false,
    documents: [],
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: file.type.includes("image") ? "image" : file.type.includes("pdf") ? "pdf" : "document",
        file: file,
      }
      setUploadedFiles((prev) => [...prev, newFile])
    })

    // Reset the input so a user can re-upload the same file if needed
    event.target.value = ""
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1) Validation basique côté client
      if (!formData.firstName || !formData.lastName || !formData.phone) {
        toast.error("Champs requis manquants", {
          description: "Veuillez remplir au minimum le prénom, nom et téléphone.",
        })
        setIsLoading(false)
        return
      }

      const hasDocuments = uploadedFiles.length > 0
        if (hasDocuments) {
          setCurrentPatientName(`${formData.firstName} ${formData.lastName}`)
          // On affiche le modal AVANT l'envoi, avec un ID temporaire
          setShowIndexingModal(true)
        }

      // 2) Préparation de FormData pour l'envoi des fichiers
      const patientData = new FormData()

      // 2.1) Conversion des noms de champs de camelCase vers snake_case pour Django
      patientData.append("first_name", formData.firstName)
      patientData.append("last_name", formData.lastName)
      patientData.append("email", formData.email || "")
      patientData.append("phone", formData.phone)
      patientData.append("date_of_birth", formData.dateOfBirth || "")
      patientData.append("gender", formData.gender || "")
      patientData.append("address", formData.address || "")
      patientData.append("emergency_contact", formData.emergencyContact || "")
      patientData.append("emergency_phone", formData.emergencyPhone || "")
      patientData.append("medical_history", formData.medicalHistory || "")
      patientData.append("allergies", formData.allergies || "")
      patientData.append("current_medications", formData.currentMedications || "")

      // 3) Ajout des documents
      uploadedFiles.forEach((file) => {
        patientData.append("documents", file.file)
      })

      // 4) Envoi de la requête avec le bon Content-Type (automatique avec FormData)
      console.log("Envoi des données au serveur...")
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/`, {
        method: "POST",
        body: patientData,
        // Ne pas définir Content-Type car il sera automatiquement défini avec boundary
      })

      // 5) Gestion de la réponse
      if (!response.ok) {
        setShowIndexingModal(false)
        const errorData = await response.json().catch(() => ({}))
        console.error("Erreur API:", response.status, errorData)
        throw new Error(`API error: ${response.status} - ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()

      if (hasDocuments && data.patient_id) {
        setCurrentPatientId(data.patient_id.toString())
        // Le modal est déjà ouvert, on met juste à jour l'ID
      } else if (!hasDocuments) {
        // Si pas de documents, rediriger directement
        toast.success("Patient créé avec succès !")
        setTimeout(() => {
          router.push("/dashboard/patients")
        }, 1000)
        setIsLoading(false)
      }
      console.log("Réponse du serveur:", data)

      // Afficher le modal de progression si des documents ont été uploadés
      if (data.documents && data.documents.length > 0) {
        setCurrentPatientId(data.patient_id)
        setCurrentPatientName(`${data.first_name} ${data.last_name}`)
        setShowIndexingModal(true)
      } else {
        // Si pas de documents, rediriger directement
        toast.success("Patient créé avec succès !")
        setTimeout(() => {
          router.push("/dashboard/patients")
        }, 1000)
      }
    } catch (error) {
      setShowIndexingModal(false) // Fermer le modal en cas d'erreur
      setIsLoading(false)
      console.error("❌ Erreur:", error)
      toast.error("Erreur lors de la création !", {
        description: error instanceof Error ? error.message : "Une erreur inattendue s'est produite.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleIndexingComplete = (status: IndexingStatus) => {
    setIsIndexingInBackground(false);
    
    if (status.failed === 0) {
      toast.success("Indexation terminée avec succès !", {
        description: `Tous les documents ont été indexés.`,
      });
      setTimeout(() => {
        router.push("/dashboard/patients");
      }, 2000);
    } else {
      toast.warning("Indexation terminée avec des erreurs", {
        description: `${status.indexed} réussis, ${status.failed} échoués.`,
      });
    }
  };

  const handleModalClose = (value: boolean) => {
    setShowIndexingModal(value)
    if (!value && currentPatientId && !indexingStatus.is_complete) {
      setIsIndexingInBackground(true)
    }
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nouveau patient</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Créez un nouveau profil patient avec ses documents médicaux
            </p>
          </div>
        </div>

        {/* Floating progress indicator when indexing in background */}
        {isIndexingInBackground && (
          <div className="fixed top-4 right-4 z-50">
            <Card className="w-80 shadow-lg border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Indexation en cours</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowIndexingModal(true)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">Documents de {currentPatientName}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setShowIndexingModal(true)}
                >
                  Voir le détail
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Two‐Thirds: Personal & Medical Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>Renseignez les informations de base du patient</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* First + Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Prénom du patient"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Nom du patient"
                        required
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="email@exemple.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+221 77 123 45 67"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* DOB + Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date de naissance</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Sexe</Label>
                      <Select onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le sexe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculin</SelectItem>
                          <SelectItem value="female">Féminin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Adresse complète du patient"
                    />
                  </div>

                  {/* Emergency Contact + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        placeholder="Nom du contact d'urgence"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        placeholder="+221 77 123 45 67"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations médicales</CardTitle>
                  <CardDescription>Antécédents médicaux et informations de santé</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Medical History */}
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Antécédents médicaux</Label>
                    <Textarea
                      id="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      placeholder="Décrivez les antécédents médicaux du patient..."
                      rows={3}
                    />
                  </div>

                  {/* Allergies */}
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      placeholder="Listez les allergies connues du patient..."
                      rows={2}
                    />
                  </div>

                  {/* Current Medications */}
                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">Médicaments actuels</Label>
                    <Textarea
                      id="currentMedications"
                      value={formData.currentMedications}
                      onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                      placeholder="Listez les médicaments actuellement pris par le patient..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right One‐Third: Document Upload + Summary */}
            <div className="space-y-6">
              {/* Document Upload Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Documents médicaux
                  </CardTitle>
                  <CardDescription>Téléchargez les documents du patient pour indexation automatique</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                          Cliquez pour télécharger
                        </span>
                        <span className="text-sm text-gray-500"> ou glissez-déposez</span>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500">PDF, Images, Documents (max. 10MB par fichier)</p>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Fichiers téléchargés ({uploadedFiles.length})</Label>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                                {getFileIcon(file.type)}
                              </div>
                              <div>
                                <p className="text-sm font-medium truncate max-w-[150px]">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(file.id)}
                              className="h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Summary + Submit Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Documents :</span>
                      <Badge variant="outline">{uploadedFiles.length} fichier(s)</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Indexation :</span>
                      <Badge variant="secondary">Automatique</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>WhatsApp :</span>
                      <Badge variant="outline">À configurer</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <h4 className="text-sm font-medium mb-2">Action</h4>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Création en cours…
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Créer le patient
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => router.back()}
                      disabled={isLoading}
                    >
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      {/* Modal de progression d'indexation */}
      <IndexingProgressModal
        isOpen={showIndexingModal}
        onClose={handleModalClose}
        patientId={currentPatientId}
        patientName={currentPatientName}
        onComplete={handleIndexingComplete}
      />
    </>
  )
}