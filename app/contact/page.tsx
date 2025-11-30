import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"
import { JsonLdServer } from "@/app/components/JsonLd"
import {
  generateContactPageSchema,
  generateBreadcrumbSchema,
  siteConfig,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact Us | Begin Your Healing Journey",
  description:
    "Reach out to Midnight Magnolia for support, inquiries, or to begin your healing journey with us. We welcome questions about our healing tools, digital products, and community.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Midnight Magnolia | Begin Your Healing Journey",
    description:
      "Reach out for support, inquiries, or to begin your healing journey with us.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  keywords: [
    "contact Midnight Magnolia",
    "healing support",
    "wellness inquiries",
    "customer support",
    "community questions",
    "get in touch",
  ],
}

export default function ContactPage() {
  // Generate structured data
  const contactPageSchema = generateContactPageSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact" },
  ])

  return (
    <>
      {/* Structured Data */}
      <JsonLdServer data={[contactPageSchema, breadcrumbSchema]} />
      
      <ContactPageClient />
    </>
  )
}
