"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-midnight-blue">
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-magnolia-white font-playfair">Application Error</CardTitle>
              <CardDescription className="text-warm-gray font-lora">
                A critical error has occurred. Please refresh the page or return to our sanctuary.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error.digest && (
                <div className="text-xs text-warm-gray text-center font-mono">Error ID: {error.digest}</div>
              )}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={reset}
                  className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-medium"
                >
                  Try again
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="w-full border-magnolia-white/20 text-magnolia-white hover:bg-magnolia-white/5"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Return home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  )
}
