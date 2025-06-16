"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    // Send error to monitoring API
    if (typeof window !== "undefined") {
      fetch("/api/monitoring/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "react_error",
          message: error.message || "React component error",
          severity: "high",
          metadata: {
            stack: error.stack?.substring(0, 1000),
            componentStack: errorInfo.componentStack?.substring(0, 1000),
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((fetchError) => {
        console.warn("Failed to send error to monitoring:", fetchError)
      })
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  private handleGoHome = () => {
    window.location.href = "/"
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-midnight-blue flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-magnolia-white font-playfair text-xl">Something went wrong</CardTitle>
              <CardDescription className="text-warm-gray font-lora">
                A component error occurred. Let us restore the sacred balance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button
                  onClick={this.handleReset}
                  className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-medium transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="w-full border-magnolia-white/20 text-magnolia-white hover:bg-magnolia-white/5 transition-colors"
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

    return this.props.children
  }
}

export default ErrorBoundary
