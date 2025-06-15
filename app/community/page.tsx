import type { Metadata } from "next"
import { Suspense } from "react"
import CommunityPageClient from "./CommunityPageClient"

export const metadata: Metadata = {
  title: "Sacred Community | Midnight Magnolia",
  description: "Join our healing community for support, connection, and shared wisdom on the journey to wellness.",
  keywords: ["community", "healing circle", "support group", "wellness community", "spiritual connection"],
}

function CommunityLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={<CommunityLoading />}>
      <CommunityPageClient />
    </Suspense>
  )
}
