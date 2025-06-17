import type { Metadata } from "next"
import AiContentStudioClient from "./AiContentStudioClient"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton" // Assuming Skeleton component exists

export const metadata: Metadata = {
  title: "AI Content Studio | Midnight Magnolia",
  description:
    "Generate and manage content for all your platforms with AI-powered tools, infused with Southern Gothic grace.",
}

export default function AiContentStudioPage() {
  return (
    <Suspense fallback={<AiContentStudioSkeleton />}>
      <AiContentStudioClient />
    </Suspense>
  )
}

function AiContentStudioSkeleton() {
  return (
    <div className="min-h-screen bg-midnight-blue flex">
      {/* Sidebar Skeleton */}
      <div className="fixed left-0 top-0 h-full w-80 bg-midnight-blue-darker p-6 overflow-y-auto">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-24 w-full mt-8 rounded-lg" />
      </div>
      {/* Main Content Skeleton */}
      <div className="ml-80 p-6 flex-1">
        <Skeleton className="h-12 w-1/2 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-72 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
