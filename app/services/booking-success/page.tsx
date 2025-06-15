import type { Metadata } from "next"
import { Suspense } from "react"
import BookingSuccessClient from "./BookingSuccessClient"

export const metadata: Metadata = {
  title: "Booking Confirmed | Midnight Magnolia",
  description: "Your healing session has been successfully booked. We'll contact you soon to schedule.",
}

function BookingSuccessLoading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<BookingSuccessLoading />}>
      <BookingSuccessClient />
    </Suspense>
  )
}
