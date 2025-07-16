import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Mock Stripe testing function
async function testStripeConnection(apiKey: string) {
  try {
    // Simple fetch to Stripe API to verify the key works
    const response = await fetch("https://api.stripe.com/v1/customers?limit=1", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    if (response.status === 200) {
      return { success: true, message: "Successfully connected to Stripe API" }
    } else {
      return {
        success: false,
        message: `Failed to connect to Stripe API: ${response.status} ${response.statusText}`,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error connecting to Stripe: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Mock Shopify testing function
async function testShopifyConnection(apiKey: string, apiSecret: string) {
  try {
    // This is a simplified test - in a real scenario you'd use the Shopify API
    // For now we'll just check if the credentials exist
    if (apiKey && apiSecret) {
      return { success: true, message: "Shopify credentials found" }
    } else {
      return { success: false, message: "Missing Shopify credentials" }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error testing Shopify connection: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Mock HubSpot testing function
async function testHubspotConnection(apiKey: string) {
  try {
    // Simple fetch to HubSpot API to verify the key works
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts?limit=1", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      return { success: true, message: "Successfully connected to HubSpot API" }
    } else {
      return {
        success: false,
        message: `Failed to connect to HubSpot API: ${response.status} ${response.statusText}`,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error connecting to HubSpot: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

// Test Make.com webhook URL
async function testMakeWebhook(webhookUrl: string) {
  try {
    // Send a test payload to the webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
        source: "diagnostics",
      }),
    })

    if (response.ok) {
      return { success: true, message: "Successfully sent test payload to Make.com webhook" }
    } else {
      return {
        success: false,
        message: `Failed to send to Make.com webhook: ${response.status} ${response.statusText}`,
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Error testing Make.com webhook: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    database: {
      status: "unknown",
      message: "",
      details: null,
    },
    stripe: {
      status: "unknown",
      message: "",
      details: null,
    },
    shopify: {
      status: "unknown",
      message: "",
      details: null,
    },
    hubspot: {
      status: "unknown",
      message: "",
      details: null,
    },
    make: {
      status: "unknown",
      message: "",
      details: null,
    },
  }

  // Test database connection
  try {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
    if (!connectionString) {
      results.database.status = "error"
      results.database.message = "Database connection string not found"
    } else {
      const sql = neon(connectionString)
      const dbResult = await sql`
        SELECT current_database() as db_name, 
               current_user as db_user,
               version() as db_version
      `

      if (dbResult && dbResult.length > 0) {
        results.database.status = "success"
        results.database.message = "Database connection successful"
        results.database.details = dbResult[0]
      } else {
        results.database.status = "error"
        results.database.message = "Database query returned no results"
      }
    }
  } catch (error) {
    results.database.status = "error"
    results.database.message = `Database error: ${error instanceof Error ? error.message : "Unknown error"}`
  }

  // Test Stripe integration
  if (!process.env.STRIPE_SECRET_KEY) {
    results.stripe.status = "error"
    results.stripe.message = "STRIPE_SECRET_KEY not found"
  } else {
    const stripeResult = await testStripeConnection(process.env.STRIPE_SECRET_KEY)
    results.stripe.status = stripeResult.success ? "success" : "error"
    results.stripe.message = stripeResult.message

    // Check additional Stripe variables
    const additionalChecks = {
      webhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      publishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    }

    results.stripe.details = additionalChecks
  }

  // Test Shopify integration
  if (!process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_API_SECRET) {
    results.shopify.status = "error"
    results.shopify.message = "Shopify API credentials not found"
  } else {
    const shopifyResult = await testShopifyConnection(process.env.SHOPIFY_API_KEY, process.env.SHOPIFY_API_SECRET)
    results.shopify.status = shopifyResult.success ? "success" : "error"
    results.shopify.message = shopifyResult.message

    // Check additional Shopify variables
    const additionalChecks = {
      webhookSecret: !!process.env.SHOPIFY_WEBHOOK_SECRET,
      storefrontAdmin: !!process.env.SHOPIFY_STOREFRONT_ADMIN,
      adminApi: !!process.env.SHOPIFY_ADMIN_API,
    }

    results.shopify.details = additionalChecks
  }

  // Test HubSpot integration
  if (!process.env.HUBSPOT_API_KEY) {
    results.hubspot.status = "error"
    results.hubspot.message = "HUBSPOT_API_KEY not found"
  } else {
    const hubspotResult = await testHubspotConnection(process.env.HUBSPOT_API_KEY)
    results.hubspot.status = hubspotResult.success ? "success" : "error"
    results.hubspot.message = hubspotResult.message
  }

  // Test Make.com webhook
  if (!process.env.MAKE_WEBHOOK_URL) {
    results.make.status = "error"
    results.make.message = "MAKE_WEBHOOK_URL not found"
  } else {
    const makeResult = await testMakeWebhook(process.env.MAKE_WEBHOOK_URL)
    results.make.status = makeResult.success ? "success" : "error"
    results.make.message = makeResult.message
  }

  return NextResponse.json(results)
}
