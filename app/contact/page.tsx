import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Midnight Magnolia",
  description: "Reach out to Midnight Magnolia for support, inquiries, or to begin your healing journey with us.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
