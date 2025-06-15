import type { Metadata } from "next"
import { Suspense } from "react"
import ResourcesPageClient from "./ResourcesPageClient"

export const metadata: Metadata = {
  title: "Healing Resources | Midnight Magnolia",
  description:
    "Free and premium resources for your healing journey. Guides, workbooks, courses, and sacred tools for transformation.",
  keywords: [
    "healing resources",
    "wellness guides",
    "spiritual tools",
    "self-care",
    "transformation",
    "digital downloads",
  ],
}

function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<ResourcesLoading />}>
      <ResourcesPageClient />
    </Suspense>
  )
}
