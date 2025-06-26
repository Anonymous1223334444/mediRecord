"use client"

import { useState, useEffect, useCallback } from "react"

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

interface UseIndexingStatusOptions {
  patientId: string | null
  enabled: boolean
  onComplete?: (status: IndexingStatus) => void
  pollInterval?: number
}

export function useIndexingStatus({ patientId, enabled, onComplete, pollInterval = 2000 }: UseIndexingStatusOptions) {
  const [status, setStatus] = useState<IndexingStatus>({
    total_documents: 0,
    indexed: 0,
    processing: 0,
    failed: 0,
    pending: 0,
    progress: 0,
    is_complete: false,
    documents: [],
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchStatus = useCallback(async () => {
    if (!patientId || !enabled) return

    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/api/patients/${patientId}/indexing-status/`,
        {
          headers: { "Cache-Control": "no-cache" },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: IndexingStatus = await response.json()
      setStatus(data)
      setError(null)
      setRetryCount(0)

      if (data.is_complete) {
        onComplete?.(data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur inconnue"
      setError(errorMessage)

      if (retryCount < 3) {
        setRetryCount((prev) => prev + 1)
      }
    } finally {
      setIsLoading(false)
    }
  }, [patientId, enabled, onComplete, retryCount])

  useEffect(() => {
    if (!enabled || !patientId) return

    // Fetch immédiat
    fetchStatus()

    // Polling si pas terminé
    if (!status.is_complete) {
      const interval = setInterval(fetchStatus, pollInterval)
      return () => clearInterval(interval)
    }
  }, [enabled, patientId, status.is_complete, fetchStatus, pollInterval])

  const retry = useCallback(() => {
    setError(null)
    setRetryCount(0)
    fetchStatus()
  }, [fetchStatus])

  return {
    status,
    isLoading,
    error,
    retry,
    canRetry: retryCount < 3,
  }
}
