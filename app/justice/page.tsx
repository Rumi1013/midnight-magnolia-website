import type { Metadata } from "next"
import { Suspense } from "react"
import JusticePageClient from "./JusticePageClient"

export const metadata: Metadata = {
  title: "Healing Justice | Midnight Magnolia",
  description: "Our commitment to accessible healing, community support, and justice-centered wellness practices.",
  keywords: ["healing justice", "accessible wellness", "community healing", "social justice", "inclusive practices"],
}

function JusticeLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function JusticePage() {
  return (
    <Suspense fallback={<JusticeLoading />}>
      <JusticePageClient />
    </Suspense>
  )
}
