import { type NextRequest, NextResponse } from "next/server"

// 🌙 Test connection to sacred Shopify sanctuary
export async function GET(request: NextRequest) {
  const SHOPIFY_DOMAIN = process.env.SHOPIFY_STOREFRONT_ADMIN?.replace("https://", "").replace("http://", "")
  const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_ADMIN_API

  try {
    console.log("🌙 Testing sacred Shopify connection...")
    console.log("Domain:", SHOPIFY_DOMAIN)
    console.log("Has Token:", !!SHOPIFY_STOREFRONT_TOKEN)

    if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing sacred credentials",
          details: {
            hasDomain: !!SHOPIFY_DOMAIN,
            hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
            domain: SHOPIFY_DOMAIN,
            envVars: {
              SHOPIFY_STOREFRONT_ADMIN: process.env.SHOPIFY_STOREFRONT_ADMIN ? "Set" : "Missing",
              SHOPIFY_ADMIN_API: process.env.SHOPIFY_ADMIN_API ? "Set" : "Missing",
            },
          },
        },
        { status: 400 },
      )
    }

    // 🌸 Simple shop query to test connection
    const testQuery = `
      query {
        shop {
          name
          description
          primaryDomain {
            url
          }
          currencyCode
        }
      }
    `

    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: testQuery }),
    })

    const responseText = await response.text()
    console.log("Response status:", response.status)
    console.log("Response text:", responseText)

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Connection failed: ${response.status}`,
          details: {
            status: response.status,
            statusText: response.statusText,
            response: responseText,
            domain: SHOPIFY_DOMAIN,
            url: `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
          },
        },
        { status: response.status },
      )
    }

    const data = JSON.parse(responseText)

    if (data.errors) {
      return NextResponse.json(
        {
          success: false,
          error: "GraphQL errors",
          details: {
            errors: data.errors,
            domain: SHOPIFY_DOMAIN,
          },
        },
        { status: 400 },
      )
    }

    // 🌸 Success! Sacred connection established
    return NextResponse.json({
      success: true,
      message: "Sacred Shopify connection established! ✨",
      shop: data.data?.shop,
      connection: {
        domain: SHOPIFY_DOMAIN,
        timestamp: new Date().toISOString(),
        status: "Connected with healing energy",
      },
    })
  } catch (error: any) {
    console.error("Sacred connection test failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Connection test failed",
        details: {
          message: error.message,
          domain: SHOPIFY_DOMAIN,
          hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
        },
      },
      { status: 500 },
    )
  }
}
