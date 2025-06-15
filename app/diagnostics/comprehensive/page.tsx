"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ComprehensiveDiagnosticsPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostics = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/diagnostics/detailed")
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setResults(data)
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

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-sage-green/20"
      case "warning":
        return "bg-yellow-500/20"
      case "error":
        return "bg-red-500/20"
      default:
        return "bg-magnolia-white/10"
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
        <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-6">Comprehensive System Diagnostics</h1>

        <Card className="bg-midnight-blue border border-warm-gray/20 mb-6">
          <CardHeader>
            <CardTitle className="text-gold">Integration Tests</CardTitle>
            <CardDescription className="text-magnolia-white/70">
              Detailed diagnostics for all your integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-gold border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <Alert className="bg-red-500/20 border-red-500/50">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : results ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-midnight-blue/50 border border-warm-gray/20">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-warm-gray/20">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="database" className="data-[state=active]:bg-warm-gray/20">
                    Database
                  </TabsTrigger>
                  <TabsTrigger value="stripe" className="data-[state=active]:bg-warm-gray/20">
                    Stripe
                  </TabsTrigger>
                  <TabsTrigger value="shopify" className="data-[state=active]:bg-warm-gray/20">
                    Shopify
                  </TabsTrigger>
                  <TabsTrigger value="other" className="data-[state=active]:bg-warm-gray/20">
                    Other
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(results)
                      .filter(([key]) => key !== "timestamp")
                      .map(([key, value]: [string, any]) => (
                        <Card key={key} className={`${getStatusBgColor(value.status)} border-none`}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg text-magnolia-white capitalize">{key}</CardTitle>
                              <span className={`font-bold text-xl ${getStatusColor(value.status)}`}>
                                {getStatusIcon(value.status)}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className={`text-sm ${getStatusColor(value.status)}`}>{value.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  <div className="mt-6 text-center text-magnolia-white/70 text-sm">
                    Last updated: {new Date(results.timestamp).toLocaleString()}
                  </div>
                </TabsContent>

                <TabsContent value="database" className="mt-4">
                  <Card className={`${getStatusBgColor(results.database.status)} border-none`}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-magnolia-white">Database Connection</CardTitle>
                        <span className={`font-bold text-xl ${getStatusColor(results.database.status)}`}>
                          {getStatusIcon(results.database.status)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-magnolia-white mb-4">{results.database.message}</p>

                      {results.database.details && (
                        <div className="bg-midnight-blue/50 p-4 rounded-lg">
                          <h3 className="text-gold mb-2">Connection Details</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Database:</span> {results.database.details.db_name}
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">User:</span> {results.database.details.db_user}
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Version:</span> {results.database.details.db_version}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <h3 className="text-gold mb-2">Test SQL Query</h3>
                        <div className="bg-midnight-blue/50 p-4 rounded-lg font-mono text-sm text-magnolia-white/70">
                          SELECT current_database() as db_name, current_user as db_user, version() as db_version
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stripe" className="mt-4">
                  <Card className={`${getStatusBgColor(results.stripe.status)} border-none`}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-magnolia-white">Stripe Integration</CardTitle>
                        <span className={`font-bold text-xl ${getStatusColor(results.stripe.status)}`}>
                          {getStatusIcon(results.stripe.status)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-magnolia-white mb-4">{results.stripe.message}</p>

                      {results.stripe.details && (
                        <div className="bg-midnight-blue/50 p-4 rounded-lg">
                          <h3 className="text-gold mb-2">Configuration Check</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Secret Key:</span> Present
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Webhook Secret:</span>
                              {results.stripe.details.webhookSecret ? "Present" : "Missing"}
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Publishable Key:</span>
                              {results.stripe.details.publishableKey ? "Present" : "Missing"}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <h3 className="text-gold mb-2">Required Environment Variables</h3>
                        <div className="bg-midnight-blue/50 p-4 rounded-lg font-mono text-sm text-magnolia-white/70">
                          <p>STRIPE_SECRET_KEY</p>
                          <p>STRIPE_WEBHOOK_SECRET</p>
                          <p>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="shopify" className="mt-4">
                  <Card className={`${getStatusBgColor(results.shopify.status)} border-none`}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-magnolia-white">Shopify Integration</CardTitle>
                        <span className={`font-bold text-xl ${getStatusColor(results.shopify.status)}`}>
                          {getStatusIcon(results.shopify.status)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-magnolia-white mb-4">{results.shopify.message}</p>

                      {results.shopify.details && (
                        <div className="bg-midnight-blue/50 p-4 rounded-lg">
                          <h3 className="text-gold mb-2">Configuration Check</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">API Key:</span> Present
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">API Secret:</span> Present
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Webhook Secret:</span>
                              {results.shopify.details.webhookSecret ? "Present" : "Missing"}
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Storefront Admin:</span>
                              {results.shopify.details.storefrontAdmin ? "Present" : "Missing"}
                            </p>
                            <p className="text-sm text-magnolia-white/70">
                              <span className="font-semibold">Admin API:</span>
                              {results.shopify.details.adminApi ? "Present" : "Missing"}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <h3 className="text-gold mb-2">Required Environment Variables</h3>
                        <div className="bg-midnight-blue/50 p-4 rounded-lg font-mono text-sm text-magnolia-white/70">
                          <p>SHOPIFY_API_KEY</p>
                          <p>SHOPIFY_API_SECRET</p>
                          <p>SHOPIFY_WEBHOOK_SECRET</p>
                          <p>SHOPIFY_STOREFRONT_ADMIN (optional)</p>
                          <p>SHOPIFY_ADMIN_API (optional)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="other" className="mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Card className={`${getStatusBgColor(results.hubspot.status)} border-none`}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-magnolia-white">HubSpot Integration</CardTitle>
                          <span className={`font-bold text-xl ${getStatusColor(results.hubspot.status)}`}>
                            {getStatusIcon(results.hubspot.status)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-magnolia-white">{results.hubspot.message}</p>

                        <div className="mt-4">
                          <h3 className="text-gold mb-2">Required Environment Variables</h3>
                          <div className="bg-midnight-blue/50 p-4 rounded-lg font-mono text-sm text-magnolia-white/70">
                            <p>HUBSPOT_API_KEY</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`${getStatusBgColor(results.make.status)} border-none`}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-magnolia-white">Make.com Integration</CardTitle>
                          <span className={`font-bold text-xl ${getStatusColor(results.make.status)}`}>
                            {getStatusIcon(results.make.status)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-magnolia-white">{results.make.message}</p>

                        <div className="mt-4">
                          <h3 className="text-gold mb-2">Required Environment Variables</h3>
                          <div className="bg-midnight-blue/50 p-4 rounded-lg font-mono text-sm text-magnolia-white/70">
                            <p>MAKE_WEBHOOK_URL</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            ) : null}
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={runDiagnostics}
            disabled={loading}
            className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue"
          >
            {loading ? "Running Tests..." : "Run All Tests Again"}
          </Button>
        </div>
      </div>
    </div>
  )
}
