import { type NextRequest, NextResponse } from "next/server"
import { SacredEmailDelivery, type CheckoutData } from "@/lib/sacred-commerce"

export async function POST(request: NextRequest) {
  try {
    const checkoutData: CheckoutData = await request.json()

    // Validate the checkout data
    if (!checkoutData.customer.email || !checkoutData.items.length) {
      return NextResponse.json({ success: false, message: "Invalid checkout data" }, { status: 400 })
    }

    // Process digital products
    const digitalItems = checkoutData.items.filter((item) => item.type === "digital-download")
    if (digitalItems.length > 0) {
      await SacredEmailDelivery.sendDigitalProducts(checkoutData.customer.email, digitalItems)
    }

    // Process physical products (integrate with Shopify)
    const physicalItems = checkoutData.items.filter((item) => item.type === "shopify-product")
    if (physicalItems.length > 0) {
      // This would create orders in Shopify
      console.log("Creating Shopify orders for:", physicalItems)
    }

    // Send order confirmation
    await SacredEmailDelivery.sendOrderConfirmation(checkoutData.customer.email, checkoutData)

    return NextResponse.json({
      success: true,
      message: "Sacred purchase completed successfully",
      orderId: `MM-${Date.now()}`,
    })
  } catch (error) {
    console.error("Sacred checkout error:", error)
    return NextResponse.json({ success: false, message: "Sacred checkout failed" }, { status: 500 })
  }
}
