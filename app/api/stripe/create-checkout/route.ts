import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In production, use environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { productId, priceId, mode = "payment", successUrl, cancelUrl } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url:
        successUrl || `${request.nextUrl.origin}/dashboard/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/dashboard/payments/cancel`,
      metadata: {
        productId,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
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
