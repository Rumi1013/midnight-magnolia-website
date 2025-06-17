import type { Metadata } from "next"
import { Suspense } from "react"
import GenealogyPageClient from "./GenealogyPageClient"

export const metadata: Metadata = {
  title: "Genealogy & Ancestral Resources | Midnight Magnolia",
  description:
    "Resources for tracing your roots and connecting with your ancestors, with a focus on Black Southern heritage and healing generational trauma.",
  keywords: [
    "genealogy",
    "ancestral resources",
    "family history",
    "black genealogy",
    "southern heritage",
    "ancestral healing",
  ],
}

function GenealogyLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function GenealogyPage() {
  return (
    <Suspense fallback={<GenealogyLoading />}>
      <GenealogyPageClient />
    </Suspense>
  )
}
