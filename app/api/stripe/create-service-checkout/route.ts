import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceId, serviceName, price, duration, customerEmail, customerName, customerPhone, customerMessage } =
      body

    // Validate all inputs
    if (!serviceId || typeof serviceId !== "number") {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 })
    }

    if (!serviceName || typeof serviceName !== "string" || serviceName.length > 100) {
      return NextResponse.json({ error: "Invalid service name" }, { status: 400 })
    }

    if (!price || typeof price !== "number" || price <= 0 || price > 10000) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 })
    }

    if (customerEmail && (typeof customerEmail !== "string" || !customerEmail.includes("@"))) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (customerName && typeof customerName !== "string") {
      return NextResponse.json({ error: "Invalid name format" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedServiceName = serviceName.trim().substring(0, 100)
    const sanitizedDuration = duration?.trim().substring(0, 50) || "Session"
    const sanitizedCustomerName = customerName?.trim().substring(0, 100) || ""
    const sanitizedCustomerPhone = customerPhone?.trim().substring(0, 20) || ""
    const sanitizedCustomerMessage = customerMessage?.trim().substring(0, 500) || ""

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
            name: sanitizedCustomerName || undefined,
            phone: sanitizedCustomerPhone || undefined,
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
              name: sanitizedServiceName,
              description: `${sanitizedDuration} healing session`,
              metadata: {
                type: "service",
                serviceId: serviceId.toString(),
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
        serviceId: serviceId.toString(),
        serviceName: sanitizedServiceName,
        duration: sanitizedDuration,
        customerName: sanitizedCustomerName,
        customerPhone: sanitizedCustomerPhone,
        customerMessage: sanitizedCustomerMessage,
      },
      custom_text: {
        submit: {
          message: "We'll contact you within 24 hours to schedule your session.",
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
    console.error("Error creating service checkout session:", error)

    // Don't expose internal error details
    return NextResponse.json(
      {
        error: "Unable to create checkout session. Please try again.",
      },
      { status: 500 },
    )
  }
}
