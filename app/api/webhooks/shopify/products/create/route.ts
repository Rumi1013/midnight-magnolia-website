import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { ShopifyDatabase } from "@/lib/database"
import { WebhookQueue } from "@/lib/queue"

function verifyShopifyWebhook(body: string, signature: string): boolean {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!webhookSecret) return false

  const hmac = crypto.createHmac("sha256", webhookSecret)
  hmac.update(body, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature, "base64"), Buffer.from(calculatedSignature, "base64"))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    // Verify webhook authenticity
    if (!verifyShopifyWebhook(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const productData = JSON.parse(body)

    // Use WebhookQueue.enqueue with error handling
    try {
      await WebhookQueue.enqueue("products/create", productData.id.toString(), productData)
      return NextResponse.json({ success: true, message: "Webhook queued for processing" })
    } catch (error) {
      console.error("Error enqueueing webhook:", error)

      // Fallback to direct processing if queue fails
      try {
        await processNewProduct(productData)
        return NextResponse.json({ success: true, message: "Webhook processed directly" })
      } catch (processingError) {
        console.error("Error in direct processing:", processingError)
        return NextResponse.json({ error: "Processing failed" }, { status: 500 })
      }
    }
  } catch (error: any) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 })
  }
}

async function processNewProduct(productData: any) {
  try {
    // Log webhook received
    await ShopifyDatabase.logWebhook({
      webhookTopic: "products/create",
      shopifyId: productData.id.toString(),
      status: "success",
      payload: productData,
      retryCount: 0,
    })

    // Create product record in database
    const product = await ShopifyDatabase.createProduct({
      shopifyProductId: productData.id.toString(),
      title: productData.title,
      handle: productData.handle,
      description: productData.body_html,
      productType: productData.product_type,
      vendor: productData.vendor,
      status: productData.status,
      tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(productData.created_at),
      updatedAt: new Date(),
    })

    console.log("Product saved to database:", product.id)

    // Send notification about new product
    await sendNewProductNotification(productData)
  } catch (error) {
    console.error("Error processing product:", error)

    // Log the error
    await ShopifyDatabase.logWebhook({
      webhookTopic: "products/create",
      shopifyId: productData.id.toString(),
      status: "failed",
      payload: productData,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      retryCount: 0,
    })

    throw error
  }
}

async function sendNewProductNotification(productData: any) {
  if (process.env.MAKE_WEBHOOK_URL) {
    try {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "new_product",
          product: {
            id: productData.id,
            title: productData.title,
            handle: productData.handle,
            status: productData.status,
            variants: productData.variants?.length || 0,
          },
        }),
      })
    } catch (error) {
      console.error("Failed to send new product notification:", error)
    }
  }
}

import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { ShopifyDatabase } from "@/lib/database"

function verifyShopifyWebhook(body: string, signature: string): boolean {
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!webhookSecret) return false

  const hmac = crypto.createHmac("sha256", webhookSecret)
  hmac.update(body, "utf8")
  const calculatedSignature = hmac.digest("base64")

  return crypto.timingSafeEqual(Buffer.from(signature, "base64"), Buffer.from(calculatedSignature, "base64"))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")

    if (!signature || !verifyShopifyWebhook(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const productData = JSON.parse(body)
    await processNewProduct(productData)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error processing product creation webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function processNewProduct(productData: any) {
  try {
    // Log webhook received
    await ShopifyDatabase.logWebhook({
      webhookTopic: "products/create",
      shopifyId: productData.id.toString(),
      status: "success",
      payload: productData,
      retryCount: 0,
    })

    // Create product record in database
    const product = await ShopifyDatabase.createProduct({
      shopifyProductId: productData.id.toString(),
      title: productData.title,
      handle: productData.handle,
      description: productData.body_html,
      productType: productData.product_type,
      vendor: productData.vendor,
      status: productData.status,
      tags: productData.tags?.split(",").map((tag: string) => tag.trim()) || [],
      createdAt: new Date(productData.created_at),
      updatedAt: new Date(),
    })

    console.log("Product saved to database:", product.id)

    // Send notification about new product
    await sendNewProductNotification(productData)
  } catch (error) {
    console.error("Error processing product:", error)

    // Log the error
    await ShopifyDatabase.logWebhook({
      webhookTopic: "products/create",
      shopifyId: productData.id.toString(),
      status: "failed",
      payload: productData,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      retryCount: 0,
    })

    throw error
  }
}

async function sendNewProductNotification(productData: any) {
  if (process.env.MAKE_WEBHOOK_URL) {
    try {
      await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "new_product",
          product: {
            id: productData.id,
            title: productData.title,
            handle: productData.handle,
            status: productData.status,
            variants: productData.variants?.length || 0,
          },
        }),
      })
    } catch (error) {
      console.error("Failed to send new product notification:", error)
    }
  }
}
