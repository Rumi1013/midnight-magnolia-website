"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring system
    console.error("Application error:", error)

    // Send error to monitoring API
    if (typeof window !== "undefined") {
      fetch("/api/monitoring/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "application_error",
          message: error.message || "Unknown application error",
          severity: "high",
          metadata: {
            digest: error.digest,
            stack: error.stack,
            url: window.location.href,
            userAgent: navigator.userAgent,
          },
        }),
      }).catch(console.error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-magnolia-white/5 border-magnolia-white/10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <CardTitle className="text-magnolia-white font-playfair">Something went wrong</CardTitle>
          <CardDescription className="text-warm-gray font-lora">
            We encountered an unexpected error. Our healing energies are working to restore balance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error.digest && <div className="text-xs text-warm-gray text-center font-mono">Error ID: {error.digest}</div>}
          <div className="flex flex-col gap-3">
            <Button
              onClick={reset}
              className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-medium"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try again
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="w-full border-magnolia-white/20 text-magnolia-white hover:bg-magnolia-white/5"
            >
              <Home className="h-4 w-4 mr-2" />
              Return to sanctuary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
