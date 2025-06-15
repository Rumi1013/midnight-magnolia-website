import type { Metadata } from "next"
import { Suspense } from "react"
import ShopPageClient from "./ShopPageClient"

export const metadata: Metadata = {
  title: "Sacred Shop | Midnight Magnolia",
  description:
    "Discover our curated collection of healing tools, ritual items, and wellness products infused with Southern Gothic mystique.",
  keywords: ["shop", "healing tools", "ritual items", "wellness products", "spiritual accessories"],
}

function ShopLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopPageClient />
    </Suspense>
  )
}
