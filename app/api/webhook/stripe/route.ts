import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      // Send digital products via email
      await sendDigitalProducts(paymentIntent)

      console.log("Payment succeeded:", paymentIntent.id)
      break

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log("Payment failed:", failedPayment.id)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function sendDigitalProducts(paymentIntent: Stripe.PaymentIntent) {
  // This would integrate with your email service to send digital products
  // For now, just log the successful payment
  console.log("Sending digital products for payment:", paymentIntent.id)
  console.log("Customer email:", paymentIntent.metadata.customer_email)
  console.log("Items:", paymentIntent.metadata.items)

  // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
  // TODO: Generate download links for digital products
  // TODO: Send welcome email with product access
}
