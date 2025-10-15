import type { Metadata } from "next"
import ShopPageClient from "./ShopPageClient"

export const metadata: Metadata = {
  title: "Sacred Shop | Midnight Magnolia - Healing Tools & Rituals",
  description:
    "Explore our curated collection of healing tools, journals, and ritual items designed to support your wellness journey with Southern Gothic grace.",
}

export default function ShopPage() {
  return <ShopPageClient />
}

import dynamic from "next/dynamic"
import { Suspense } from "react"

// 🌙 Dynamically import the client component to avoid SSR issues
const ShopPageClient = dynamic(() => import("./ShopPageClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4"></div>
        <p className="font-lora text-magnolia-white/80">Preparing sacred sanctuary...</p>
      </div>
    </div>
  ),
})

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4"></div>
            <p className="font-lora text-magnolia-white/80">Loading sacred offerings...</p>
          </div>
        </div>
      }
    >
      <ShopPageClient />
    </Suspense>
  )
}
