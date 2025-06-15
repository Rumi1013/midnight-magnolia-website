import type { Metadata } from "next"
import { Suspense } from "react"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Midnight Magnolia",
  description:
    "Connect with us for healing services, questions, or to share your journey. We're here to support your transformation.",
  keywords: ["contact", "healing consultation", "spiritual guidance", "wellness support"],
}

function ContactLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactPageClient />
    </Suspense>
  )
}
