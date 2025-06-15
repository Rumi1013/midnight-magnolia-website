import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Sacred Journal | Midnight Magnolia",
  description: "Your personal space for reflection, healing, and transformation within our digital sanctuary.",
  keywords: ["journal", "reflection", "healing practice", "personal growth", "mindfulness"],
}

function JournalLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

function JournalPageClient() {
  return (
    <div className="min-h-screen bg-midnight-blue pt-24">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-magnolia-white mb-6">Sacred Journal</h1>
          <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-12">
            Your personal space for reflection and transformation
          </p>
          <div className="bg-magnolia-white/10 backdrop-blur-sm border border-magnolia-white/20 rounded-2xl p-12">
            <p className="font-lora text-magnolia-white/70 text-lg">
              Coming soon - A sacred space for your healing journey
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JournalPage() {
  return (
    <Suspense fallback={<JournalLoading />}>
      <JournalPageClient />
    </Suspense>
  )
}
