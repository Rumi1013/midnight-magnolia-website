"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="w-full max-w-md space-y-6 bg-[#0A192F] p-8 rounded-lg border border-[#D4B99F]">
        <h2 className="text-2xl font-playfair text-[#FAF3E0]">Something went wrong</h2>
        <p className="text-[#FAF3E0] mb-4">
          We apologize for the interruption in your journey. Our digital garden is experiencing a moment of rest.
        </p>
        {error.digest && <p className="text-sm text-[#D4B99F] mb-4">Error reference: {error.digest}</p>}
        <div className="flex justify-center">
          <Button onClick={reset} className="bg-[#A3B18A] text-[#0A192F] hover:bg-[#A3B18A]/90">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
