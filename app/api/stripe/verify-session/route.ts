import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    // Validate session ID format
    if (!sessionId || typeof sessionId !== "string" || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
    }

    // Retrieve session from Stripe securely
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Only return safe, non-sensitive data
    const safeSessionData = {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      metadata: {
        type: session.metadata?.type,
        serviceName: session.metadata?.serviceName,
        resourceName: session.metadata?.resourceName,
      },
      // Never expose sensitive data like amounts, emails, etc.
    }

    return NextResponse.json({ session: safeSessionData })
  } catch (error: any) {
    console.error("Error verifying session:", error)

    // Don't expose internal error details
    return NextResponse.json({ error: "Unable to verify session" }, { status: 500 })
  }
}
