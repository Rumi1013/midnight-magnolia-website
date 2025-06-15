import type { Metadata } from "next"
import { Suspense } from "react"
import PurchaseSuccessClient from "./PurchaseSuccessClient"

export const metadata: Metadata = {
  title: "Purchase Complete | Midnight Magnolia",
  description: "Your premium resource purchase is complete. Access your downloads below.",
}

function PurchaseSuccessLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  )
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<PurchaseSuccessLoading />}>
      <PurchaseSuccessClient />
    </Suspense>
  )
}
