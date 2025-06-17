import type { Metadata } from "next"
import { Suspense } from "react"
import PortfolioClient from "./PortfolioClient"

export const metadata: Metadata = {
  title: "Artwork & Projects | Midnight Magnolia",
  description:
    "A portfolio of creative works, artistic projects, and collaborations that embody the spirit of Southern Gothic healing.",
  keywords: ["portfolio", "artwork", "creative projects", "southern gothic art", "collaborations"],
}

function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioLoading />}>
      <PortfolioClient />
    </Suspense>
  )
}
