import type { Metadata } from "next"
import ShopPageClient from "./ShopPageClient"

export const metadata: Metadata = {
  title: "Sacred Shop | Midnight Magnolia - Healing Tools & Rituals",
  description:
    "Explore our curated collection of healing tools, journals, and ritual items designed to support your wellness journey with Southern Gothic grace.",
}

export default function ShopPage() {
  return <ShopPageClient />
}
