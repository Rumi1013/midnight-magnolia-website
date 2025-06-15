import type { Metadata } from "next"
import PurchaseSuccessClient from "./PurchaseSuccessClient"

export const metadata: Metadata = {
  title: "Purchase Complete | Midnight Magnolia",
  description: "Your premium resource purchase is complete. Access your downloads now.",
}

export default function PurchaseSuccessPage() {
  return <PurchaseSuccessClient />
}
