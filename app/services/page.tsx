import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Sacred Services | Midnight Magnolia - Healing & Wellness Offerings",
  description:
    "Discover our trauma-informed healing services, consultations, and wellness offerings designed to support your journey with Southern Gothic grace.",
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
