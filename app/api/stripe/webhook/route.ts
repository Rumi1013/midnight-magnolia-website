import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
// In production, use environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

// This is your Stripe CLI webhook secret for testing
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature") || ""

  let event

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
      // Then define and call a function to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break
    case "payment_method.attached":
      const paymentMethod = event.data.object as Stripe.PaymentMethod
      // Then define and call a function to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      // Handle successful checkout session
      // handleCheckoutSessionCompleted(session);
      break
    case "customer.subscription.created":
      const subscription = event.data.object as Stripe.Subscription
      // Handle new subscription
      // handleSubscriptionCreated(subscription);
      break
    case "customer.subscription.updated":
      const updatedSubscription = event.data.object as Stripe.Subscription
      // Handle subscription update
      // handleSubscriptionUpdated(updatedSubscription);
      break
    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription
      // Handle subscription cancellation
      // handleSubscriptionDeleted(deletedSubscription);
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true })
}
