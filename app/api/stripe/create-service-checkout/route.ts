import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { serviceId, serviceName, price, duration, customerEmail } = await request.json()

    if (!serviceId || !serviceName || !price) {
      return NextResponse.json({ error: "Missing required service information" }, { status: 400 })
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

    // Create Checkout Session for service booking
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
              description: `${duration} healing session`,
              metadata: {
                type: "service",
                serviceId: serviceId,
              },
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: customer?.id,
      success_url: `${request.nextUrl.origin}/services/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/services?canceled=true`,
      metadata: {
        type: "service_booking",
        serviceId: serviceId,
        serviceName: serviceName,
        duration: duration,
      },
      custom_text: {
        submit: {
          message: "We'll contact you within 24 hours to schedule your session.",
        },
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error("Error creating service checkout session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
