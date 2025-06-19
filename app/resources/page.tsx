import type { Metadata } from "next"
import ResourcesPageClient from "./ResourcesPageClient"

export const metadata: Metadata = {
  title: "Healing Resources | Midnight Magnolia - Free Tools & Guides",
  description:
    "Access free healing resources, guides, and tools for your wellness journey. Trauma-informed content for gentle transformation.",
}

export default function ResourcesPage() {
  return <ResourcesPageClient />
}
