import type { Metadata } from "next"
import BookingSuccessClient from "./BookingSuccessClient"

export const metadata: Metadata = {
  title: "Booking Confirmed | Midnight Magnolia",
  description: "Your healing session has been successfully booked. We'll contact you soon to schedule.",
}

export default function BookingSuccessPage() {
  return <BookingSuccessClient />
}
