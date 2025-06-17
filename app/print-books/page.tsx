import type { Metadata } from "next"
import { Suspense } from "react"
import PrintBooksClient from "./PrintBooksClient"

export const metadata: Metadata = {
  title: "Print Books & Journals | Midnight Magnolia",
  description:
    "Hold our healing words in your hands. Explore our collection of beautifully printed journals, planners, and books.",
  keywords: ["print books", "journals", "planners", "southern gothic books", "healing journal"],
}

function PrintBooksLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function PrintBooksPage() {
  return (
    <Suspense fallback={<PrintBooksLoading />}>
      <PrintBooksClient />
    </Suspense>
  )
}
