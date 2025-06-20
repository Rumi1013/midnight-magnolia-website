import type { Metadata } from "next"
import ShopPageClient from "./ShopPageClient"

export const metadata: Metadata = {
  title: "Sacred Shop | Midnight Magnolia - Healing Tools & Digital Sanctuaries",
  description:
    "Explore our curated collection of healing tools, journals, KDP books, and digital automations designed to support your wellness journey with Southern Gothic grace.",
}

export default function ShopPage() {
  return <ShopPageClient />
}
