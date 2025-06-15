import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resourceId, resourceName, price, type, customerEmail } = body

    // Validate all inputs
    if (!resourceId || typeof resourceId !== "number") {
      return NextResponse.json({ error: "Invalid resource ID" }, { status: 400 })
    }

    if (!resourceName || typeof resourceName !== "string" || resourceName.length > 100) {
      return NextResponse.json({ error: "Invalid resource name" }, { status: 400 })
    }

    if (!price || typeof price !== "number" || price <= 0 || price > 10000) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 })
    }

    if (customerEmail && (typeof customerEmail !== "string" || !customerEmail.includes("@"))) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedResourceName = resourceName.trim().substring(0, 100)
    const sanitizedType = type?.trim().substring(0, 50) || "Digital Download"

    // Create or retrieve customer with error handling
    let customer
    if (customerEmail) {
      try {
        const existingCustomers = await stripe.customers.list({
          email: customerEmail.toLowerCase().trim(),
          limit: 1,
        })

        if (existingCustomers.data.length > 0) {
          customer = existingCustomers.data[0]
        } else {
          customer = await stripe.customers.create({
            email: customerEmail.toLowerCase().trim(),
          })
        }
      } catch (customerError) {
        console.error("Customer creation error:", customerError)
        // Continue without customer if there's an error
      }
    }

    // Create Checkout Session with enhanced security
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: sanitizedResourceName,
              description: `Premium ${sanitizedType} - Digital Download`,
              metadata: {
                type: "resource",
                resourceId: resourceId.toString(),
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
        resourceId: resourceId.toString(),
        resourceName: sanitizedResourceName,
        resourceType: sanitizedType,
      },
      custom_text: {
        submit: {
          message: "You'll receive download links immediately after payment.",
        },
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    })

    // Only return necessary data
    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error("Error creating resource checkout session:", error)

    // Don't expose internal error details
    return NextResponse.json({ error: "Unable to create checkout session. Please try again." }, { status: 500 })
  }
}
