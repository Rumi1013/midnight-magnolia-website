"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
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
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    // Send error to monitoring
    if (typeof window !== "undefined") {
      fetch("/api/monitoring/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "react_error",
          message: error.message,
          severity: "high",
          metadata: {
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            url: window.location.href,
          },
        }),
      }).catch(console.error)
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback

      if (FallbackComponent && this.state.error) {
        return (
          <FallbackComponent
            error={this.state.error}
            reset={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      }

      return (
        <div className="min-h-screen bg-midnight-blue flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-magnolia-white font-playfair">Something went wrong</CardTitle>
              <CardDescription className="text-warm-gray font-lora">
                A component error occurred. Our healing energies are working to restore balance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-medium"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
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
