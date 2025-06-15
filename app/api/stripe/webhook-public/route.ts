import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature") || ""

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session

      if (session.metadata?.type === "service_booking") {
        // Handle service booking completion
        console.log(`Service booking completed: ${session.metadata.serviceName}`)

        // Here you would:
        // 1. Send confirmation email to customer
        // 2. Notify your team about the new booking
        // 3. Add to your booking management system
        // 4. Send preparation materials

        await handleServiceBookingCompleted(session)
      } else if (session.metadata?.type === "resource_purchase") {
        // Handle resource purchase completion
        console.log(`Resource purchase completed: ${session.metadata.resourceName}`)

        // Here you would:
        // 1. Send download links to customer
        // 2. Grant access to premium content
        // 3. Add to customer database
        // 4. Send welcome email with resources

        await handleResourcePurchaseCompleted(session)
      }
      break

    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`Payment succeeded: ${paymentIntent.id}`)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleServiceBookingCompleted(session: Stripe.Checkout.Session) {
  try {
    // In a real application, you would:
    // 1. Save booking to database
    // 2. Send confirmation email
    // 3. Notify team members
    // 4. Schedule follow-up

    console.log("Service booking processed:", {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      serviceName: session.metadata?.serviceName,
      amount: session.amount_total,
    })

    // Example: Send confirmation email (you'd use your email service)
    // await sendServiceBookingConfirmation({
    //   email: session.customer_details?.email,
    //   serviceName: session.metadata?.serviceName,
    //   sessionId: session.id,
    // })
  } catch (error) {
    console.error("Error processing service booking:", error)
  }
}

async function handleResourcePurchaseCompleted(session: Stripe.Checkout.Session) {
  try {
    // In a real application, you would:
    // 1. Generate secure download links
    // 2. Send access email with links
    // 3. Add customer to premium list
    // 4. Track purchase analytics

    console.log("Resource purchase processed:", {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      resourceName: session.metadata?.resourceName,
      amount: session.amount_total,
    })

    // Example: Send download links (you'd use your email service)
    // await sendResourceDownloadLinks({
    //   email: session.customer_details?.email,
    //   resourceName: session.metadata?.resourceName,
    //   resourceId: session.metadata?.resourceId,
    // })
  } catch (error) {
    console.error("Error processing resource purchase:", error)
  }
}
