import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const { items, customer } = await request.json()

    // Calculate total amount
    const amount = items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity * 100 // Convert to cents
    }, 0)

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        customer_email: customer.email,
        customer_name: `${customer.firstName} ${customer.lastName}`,
        items: JSON.stringify(
          items.map((item: any) => ({
            id: item.productId,
            name: item.name,
            format: item.format,
            quantity: item.quantity,
            price: item.price,
          })),
        ),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error: any) {
    console.error("Payment intent creation failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
