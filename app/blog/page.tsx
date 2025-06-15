import type { Metadata } from "next"
import { Suspense } from "react"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "Sacred Writings | Midnight Magnolia",
  description:
    "Explore our collection of healing wisdom, spiritual insights, and transformative stories from the Southern Gothic wellness journey.",
  keywords: ["blog", "healing wisdom", "spiritual insights", "wellness articles", "transformation stories"],
}

function BlogLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogPageClient />
    </Suspense>
  )
}
