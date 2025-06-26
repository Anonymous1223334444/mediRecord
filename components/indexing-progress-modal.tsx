"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Loader2, XCircle, AlertCircle, RefreshCw, FileText } from "lucide-react"
import { toast } from "sonner"

interface Document {
  id: string
  filename: string
  status: "indexed" | "processing" | "failed" | "pending"
  error?: string
  progress?: number
}

interface IndexingStatus {
  total_documents: number
  indexed: number
  processing: number
  failed: number
  pending: number
  progress: number
  is_complete: boolean
  documents: Document[]
}

interface IndexingProgressModalProps {
  isOpen: boolean
  onClose: (value: boolean) => void
  patientId: string | null
  patientName: string
  onComplete?: (status: IndexingStatus) => void
}

export const IndexingProgressModal: React.FC<IndexingProgressModalProps> = ({
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
  const [retryCount, setRetryCount] = useState(0)

  const fetchStatus = useCallback(async () => {
    if (!patientId) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/${patientId}/indexing-status/`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: IndexingStatus = await response.json()
      setIndexingStatus(data)
      setError(null)
      setRetryCount(0)

      // Si terminé, arrêter le polling
      if (data.is_complete) {
        setIsPolling(false)

        // Notification de fin
        if (data.failed === 0) {
          toast.success("Indexation terminée avec succès !")
        } else {
          toast.warning(`Indexation terminée avec ${data.failed} erreur(s)`)
        }

        // Auto-fermeture après 3 secondes
        setTimeout(() => {
          onClose(false)
          onComplete?.(data)
        }, 3000)
      }
    } catch (err) {
      console.error("Erreur polling:", err)
      const errorMessage = err instanceof Error ? err.message : "Erreur inconnue"
      setError(errorMessage)

      // Retry logic avec backoff exponentiel
      if (retryCount < 3) {
        setRetryCount((prev) => prev + 1)
        setTimeout(() => {
          setError(null)
        }, Math.pow(2, retryCount) * 1000) // 1s, 2s, 4s
      } else {
        setIsPolling(false)
        toast.error("Impossible de récupérer le statut d'indexation")
      }
    }
  }, [patientId, onClose, onComplete, retryCount])

  useEffect(() => {
    if (!isOpen || !patientId || !isPolling) return

    // Fetch immédiat
    fetchStatus()

    // Puis polling toutes les 2 secondes
    const interval = setInterval(fetchStatus, 2000)

    return () => clearInterval(interval)
  }, [isOpen, patientId, isPolling, fetchStatus])

  const getStatusIcon = (status: string, progress?: number) => {
    switch (status) {
      case "indexed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "processing":
        return (
          <div className="relative">
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            {progress && (
              <div className="absolute -bottom-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {progress}%
              </div>
            )}
          </div>
        )
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      indexed: { variant: "default" as const, label: "Indexé", color: "text-green-600" },
      processing: { variant: "default" as const, label: "En cours", color: "text-blue-600" },
      failed: { variant: "destructive" as const, label: "Échoué", color: "text-red-600" },
      pending: { variant: "secondary" as const, label: "En attente", color: "text-yellow-600" },
    }

    const { variant, label } = config[status as keyof typeof config] || config.pending

    return <Badge variant={variant}>{label}</Badge>
  }

  const retryFailedDocuments = async () => {
    const failedDocs = indexingStatus.documents.filter((doc) => doc.status === "failed")

    if (failedDocs.length === 0) return

    try {
      const retryPromises = failedDocs.map((doc) =>
        fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/documents/${doc.id}/retry/`, {
          method: "POST",
        }),
      )

      await Promise.allSettled(retryPromises)

      setIsPolling(true)
      setRetryCount(0)
      toast.info(`Relance de ${failedDocs.length} document(s)...`)
    } catch (err) {
      console.error("Erreur retry:", err)
      toast.error("Erreur lors de la relance des documents")
    }
  }

  const handleClose = () => {
    if (indexingStatus.processing > 0) {
      toast.info("L'indexation continue en arrière-plan")
    }
    onClose(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isPolling && <Loader2 className="h-5 w-5 animate-spin" />}
            Indexation des documents
          </DialogTitle>
          <DialogDescription>Traitement des documents médicaux de {patientName}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Vue d'ensemble */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                Progression globale
                {error && (
                  <Badge variant="destructive" className="text-xs">
                    Erreur de connexion
                  </Badge>
                )}
              </CardTitle>
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
                {indexingStatus.failed > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={retryFailedDocuments}
                    className="gap-2"
                    disabled={!indexingStatus.is_complete}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Réessayer ({indexingStatus.failed})
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {indexingStatus.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getStatusIcon(doc.status, doc.progress)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{doc.filename}</p>
                        {doc.error && (
                          <p className="text-xs text-red-600 mt-1 truncate" title={doc.error}>
                            {doc.error}
                          </p>
                        )}
                        {doc.progress && doc.status === "processing" && (
                          <div className="mt-1">
                            <Progress value={doc.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm text-red-600 font-medium">Erreur de connexion</p>
                  <p className="text-xs text-red-500 mt-1">{error}</p>
                  {retryCount < 3 && (
                    <p className="text-xs text-red-500 mt-1">Nouvelle tentative dans {Math.pow(2, retryCount)}s...</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setError(null)
                    setRetryCount(0)
                    setIsPolling(true)
                  }}
                  className="text-red-600 border-red-200"
                >
                  Réessayer
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {isPolling && "Actualisation automatique..."}
            {error && retryCount >= 3 && "Connexion interrompue"}
          </div>

          <div className="flex gap-2">
            {!indexingStatus.is_complete && indexingStatus.processing > 0 && (
              <Button variant="outline" onClick={handleClose}>
                Continuer en arrière-plan
              </Button>
            )}
            <Button onClick={() => onClose(false)} variant={indexingStatus.is_complete ? "default" : "secondary"}>
              {indexingStatus.is_complete ? "Terminer" : "Fermer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
