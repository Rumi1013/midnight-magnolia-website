"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)

    // Log error to monitoring service
    if (typeof window !== "undefined") {
      fetch("/api/monitoring/error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
        }),
      }).catch(console.error)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-midnight-blue flex items-center justify-center p-6">
          <Card className="max-w-md w-full bg-magnolia-white">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-warm-gray mx-auto mb-4" />
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Something went wrong</h2>
              <p className="font-lora text-gray-700 mb-6">
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem
                persists.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
