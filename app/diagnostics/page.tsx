"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/diagnostics")
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setDiagnostics(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-sage-green"
      case "warning":
        return "text-yellow-500"
      case "error":
        return "text-red-500"
      default:
        return "text-magnolia-white/70"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✓"
      case "warning":
        return "⚠️"
      case "error":
        return "✗"
      default:
        return "?"
    }
  }

  return (
    <div className="min-h-screen bg-midnight-blue p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-6">System Diagnostics</h1>

        <Card className="bg-midnight-teal border-none mb-6">
          <CardHeader>
            <CardTitle className="text-rich-gold">Environment Variables Diagnostics</CardTitle>
            <CardDescription className="text-magnolia-white/70">
              Check the status of your environment variables and integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-rich-gold border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 p-4 rounded-lg text-magnolia-white">{error}</div>
            ) : diagnostics ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(diagnostics.diagnostics).map(([key, value]: [string, any]) => (
                    <div key={key} className="bg-midnight-blue/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-montserrat text-lg font-semibold text-magnolia-white capitalize">{key}</h3>
                        <span className={`font-bold ${getStatusColor(value.status)}`}>
                          {getStatusIcon(value.status)}
                        </span>
                      </div>
                      <p className={`text-sm ${getStatusColor(value.status)}`}>{value.message}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-magnolia-white/10">
                  <h3 className="font-montserrat text-lg font-semibold text-magnolia-white mb-4">
                    Environment Details
                  </h3>
                  <div className="bg-midnight-blue/50 p-4 rounded-lg">
                    <p className="text-sm text-magnolia-white/70">
                      <span className="font-semibold">Environment:</span> {diagnostics.environment}
                    </p>
                    <p className="text-sm text-magnolia-white/70">
                      <span className="font-semibold">Timestamp:</span>{" "}
                      {new Date(diagnostics.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={runDiagnostics}
            disabled={loading}
            className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
          >
            {loading ? "Running Diagnostics..." : "Run Diagnostics Again"}
          </Button>
        </div>
      </div>
    </div>
  )
}
