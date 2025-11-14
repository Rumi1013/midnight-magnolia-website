import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured")
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
  })
}

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  try {
    const { items, success_url, cancel_url } = await request.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url,
      cancel_url,
      metadata: {
        source: "midnight-magnolia-shop",
      },
      custom_text: {
        submit: {
          message: "Complete your sacred purchase with love and intention ✨",
        },
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "Sacred offerings from Midnight Magnolia",
          metadata: {
            source: "midnight-magnolia",
          },
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
