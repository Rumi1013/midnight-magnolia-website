import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { resourceId, resourceName, price, type, customerEmail } = await request.json()

    if (!resourceId || !resourceName || !price) {
      return NextResponse.json({ error: "Missing required resource information" }, { status: 400 })
    }

    // Create or retrieve customer
    let customer
    if (customerEmail) {
      const existingCustomers = await stripe.customers.list({
        email: customerEmail,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
        })
      }
    }

    // Create Checkout Session for premium resource
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: resourceName,
              description: `Premium ${type} - Digital Download`,
              metadata: {
                type: "resource",
                resourceId: resourceId,
              },
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: customer?.id,
      success_url: `${request.nextUrl.origin}/resources/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/resources?canceled=true`,
      metadata: {
        type: "resource_purchase",
        resourceId: resourceId,
        resourceName: resourceName,
        resourceType: type,
      },
      custom_text: {
        submit: {
          message: "You'll receive download links immediately after payment.",
        },
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Error creating resource checkout session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
