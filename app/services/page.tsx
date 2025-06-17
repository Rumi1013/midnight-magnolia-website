import type { Metadata } from "next"
import { Suspense } from "react"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Healing Services | Midnight Magnolia",
  description:
    "Sacred healing services blending ancestral wisdom with modern wellness. Individual sessions, group circles, and transformative workshops.",
  keywords: ["healing services", "ancestral wisdom", "wellness", "spiritual healing", "therapy", "consultation"],
}

function ServicesLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesLoading />}>
      <ServicesPageClient />
    </Suspense>
  )
}
