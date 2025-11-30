import type { Metadata } from "next"
import { Suspense } from "react"
import ShopPageClient from "./ShopPageClient"
import { JsonLdServer } from "@/app/components/JsonLd"
import {
  generateCollectionPageSchema,
  generateBreadcrumbSchema,
  siteConfig,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "Shop | Healing Tools, Digital Planners & Journals",
  description:
    "Explore our collection of healing journals, digital planners, tarot-inspired tools, and neurodivergent-friendly resources. Crafted with ancestral wisdom and Southern Gothic grace.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop Midnight Magnolia | Healing Tools & Digital Products",
    description:
      "Healing journals, digital planners, tarot-inspired tools, and neurodivergent-friendly resources crafted with ancestral wisdom.",
    url: `${siteConfig.url}/shop`,
    type: "website",
  },
  keywords: [
    "healing journals",
    "digital planners",
    "tarot tools",
    "ADHD-friendly planners",
    "neurodivergent resources",
    "sobriety journals",
    "recovery tools",
    "Southern Gothic products",
    "ancestral wisdom",
    "wellness products",
  ],
}

export default function ShopPage() {
  // Generate structured data
  const collectionSchema = generateCollectionPageSchema(
    "Midnight Magnolia Shop",
    "Explore our collection of healing journals, digital planners, tarot-inspired tools, and neurodivergent-friendly resources.",
    "/shop"
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop" },
  ])

  return (
    <>
      {/* Structured Data */}
      <JsonLdServer data={[collectionSchema, breadcrumbSchema]} />
      
      <Suspense fallback={null}>
        <ShopPageClient />
      </Suspense>
    </>
  )
}
