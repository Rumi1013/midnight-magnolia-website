import { NextResponse } from "next/server"

export async function GET() {
  const diagnostics = {
    database: {
      status: "unknown",
      message: "",
      details: null as any,
    },
    stripe: {
      status: "unknown",
      message: "",
      details: null as any,
    },
    shopify: {
      status: "unknown",
      message: "",
      details: null as any,
    },
    hubspot: {
      status: "unknown",
      message: "",
      details: null as any,
    },
    make: {
      status: "unknown",
      message: "",
      details: null as any,
    },
  }

  // Check database connection
  try {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL
    if (!connectionString) {
      diagnostics.database.status = "error"
      diagnostics.database.message = "Database connection string not found"
      diagnostics.database.details = {
        hasPostgresUrl: !!process.env.POSTGRES_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    } else {
      // Try to import and use neon only if we have a connection string
      try {
        const { neon } = await import("@neondatabase/serverless")
        const sql = neon(connectionString)
        const result = await sql`SELECT 1 as connection_test, NOW() as current_time`

        if (result && result[0]?.connection_test === 1) {
          diagnostics.database.status = "success"
          diagnostics.database.message = "Database connection successful"
          diagnostics.database.details = {
            connectionTime: result[0].current_time,
            connectionString: connectionString.replace(/:[^:@]*@/, ":****@"), // Hide password
          }
        } else {
          diagnostics.database.status = "error"
          diagnostics.database.message = "Database query failed"
        }
      } catch (importError) {
        diagnostics.database.status = "error"
        diagnostics.database.message = "Database driver not available"
        diagnostics.database.details = {
          error: importError instanceof Error ? importError.message : "Unknown import error",
        }
      }
    }
  } catch (error) {
    diagnostics.database.status = "error"
    diagnostics.database.message = "Database connection failed"
    diagnostics.database.details = { error: error instanceof Error ? error.message : "Unknown error" }
  }

  // Check Stripe configuration
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if (!stripeSecretKey) {
    diagnostics.stripe.status = "error"
    diagnostics.stripe.message = "STRIPE_SECRET_KEY not found"
  } else if (!stripeWebhookSecret) {
    diagnostics.stripe.status = "warning"
    diagnostics.stripe.message = "STRIPE_SECRET_KEY found, but STRIPE_WEBHOOK_SECRET missing"
  } else if (!stripePublishableKey) {
    diagnostics.stripe.status = "warning"
    diagnostics.stripe.message = "Server keys found, but NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY missing"
  } else {
    // Test Stripe connection
    try {
      const stripe = require("stripe")(stripeSecretKey)
      const account = await stripe.accounts.retrieve()
      diagnostics.stripe.status = "success"
      diagnostics.stripe.message = "Stripe connection successful"
      diagnostics.stripe.details = {
        accountId: account.id,
        country: account.country,
        hasWebhookSecret: !!stripeWebhookSecret,
        hasPublishableKey: !!stripePublishableKey,
      }
    } catch (stripeError) {
      diagnostics.stripe.status = "error"
      diagnostics.stripe.message = "Stripe connection failed"
      diagnostics.stripe.details = {
        error: stripeError instanceof Error ? stripeError.message : "Unknown Stripe error",
        hasAllKeys: !!(stripeSecretKey && stripeWebhookSecret && stripePublishableKey),
      }
    }
  }

  // Check Shopify configuration
  const shopifyApiKey = process.env.SHOPIFY_API_KEY
  const shopifyApiSecret = process.env.SHOPIFY_API_SECRET
  const shopifyWebhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET

  if (!shopifyApiKey || !shopifyApiSecret) {
    diagnostics.shopify.status = "error"
    diagnostics.shopify.message = "Shopify API credentials not found"
    diagnostics.shopify.details = {
      hasApiKey: !!shopifyApiKey,
      hasApiSecret: !!shopifyApiSecret,
      hasWebhookSecret: !!shopifyWebhookSecret,
    }
  } else if (!shopifyWebhookSecret) {
    diagnostics.shopify.status = "warning"
    diagnostics.shopify.message = "API credentials found, but SHOPIFY_WEBHOOK_SECRET missing"
    diagnostics.shopify.details = {
      hasApiKey: true,
      hasApiSecret: true,
      hasWebhookSecret: false,
    }
  } else {
    diagnostics.shopify.status = "success"
    diagnostics.shopify.message = "All Shopify environment variables found"
    diagnostics.shopify.details = {
      hasApiKey: true,
      hasApiSecret: true,
      hasWebhookSecret: true,
    }
  }

  // Check HubSpot configuration
  const hubspotApiKey = process.env.HUBSPOT_API_KEY
  if (!hubspotApiKey) {
    diagnostics.hubspot.status = "error"
    diagnostics.hubspot.message = "HUBSPOT_API_KEY not found"
  } else {
    // Test HubSpot connection
    try {
      const response = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts?limit=1`, {
        headers: {
          Authorization: `Bearer ${hubspotApiKey}`,
        },
      })

      if (response.ok) {
        diagnostics.hubspot.status = "success"
        diagnostics.hubspot.message = "HubSpot API connection successful"
        diagnostics.hubspot.details = { apiKeyValid: true }
      } else {
        diagnostics.hubspot.status = "error"
        diagnostics.hubspot.message = `HubSpot API error: ${response.status}`
        diagnostics.hubspot.details = {
          status: response.status,
          statusText: response.statusText,
        }
      }
    } catch (hubspotError) {
      diagnostics.hubspot.status = "error"
      diagnostics.hubspot.message = "HubSpot API connection failed"
      diagnostics.hubspot.details = {
        error: hubspotError instanceof Error ? hubspotError.message : "Unknown HubSpot error",
      }
    }
  }

  // Check Make.com configuration
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!makeWebhookUrl) {
    diagnostics.make.status = "error"
    diagnostics.make.message = "MAKE_WEBHOOK_URL not found"
  } else {
    // Test Make.com webhook (just validate URL format)
    try {
      const url = new URL(makeWebhookUrl)
      if (url.hostname.includes("hook.make.com") || url.hostname.includes("integromat.com")) {
        diagnostics.make.status = "success"
        diagnostics.make.message = "Make.com webhook URL found and valid"
        diagnostics.make.details = {
          hostname: url.hostname,
          isValidMakeUrl: true,
        }
      } else {
        diagnostics.make.status = "warning"
        diagnostics.make.message = "Webhook URL found but may not be a Make.com URL"
        diagnostics.make.details = {
          hostname: url.hostname,
          isValidMakeUrl: false,
        }
      }
    } catch (urlError) {
      diagnostics.make.status = "error"
      diagnostics.make.message = "Invalid webhook URL format"
      diagnostics.make.details = {
        error: urlError instanceof Error ? urlError.message : "Invalid URL",
      }
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    diagnostics,
    summary: {
      total: Object.keys(diagnostics).length,
      success: Object.values(diagnostics).filter((d) => d.status === "success").length,
      warnings: Object.values(diagnostics).filter((d) => d.status === "warning").length,
      errors: Object.values(diagnostics).filter((d) => d.status === "error").length,
    },
  })
}
