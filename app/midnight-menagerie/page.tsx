import type { Metadata } from "next"
import { Suspense } from "react"
import MidnightMenagerieClient from "./MidnightMenagerieClient"

export const metadata: Metadata = {
  title: "Midnight Menagerie | Midnight Magnolia",
  description:
    "Sacred accessories for your familiar. Discover our collection of pet products infused with Southern Gothic mystique and healing energy.",
  keywords: ["pet accessories", "familiar", "witchy pet", "gothic pet", "healing pets"],
}

function MidnightMenagerieLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  )
}

export default function MidnightMenageriePage() {
  return (
    <Suspense fallback={<MidnightMenagerieLoading />}>
      <MidnightMenagerieClient />
    </Suspense>
  )
}
