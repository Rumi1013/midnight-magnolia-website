import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  const startTime = Date.now()

  try {
    // Check database connectivity
    const dbStart = Date.now()
    await sql`SELECT 1 as health_check`
    const dbResponseTime = Date.now() - dbStart

    // Check external services
    const services = await Promise.allSettled([
      // Stripe API check
      fetch("https://api.stripe.com/v1/account", {
        headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      }).then((res) => ({
        name: "stripe",
        status: res.ok ? "healthy" : "unhealthy",
        responseTime: Date.now() - startTime,
      })),

      // Shopify API check (if configured)
      process.env.SHOPIFY_ADMIN_API
        ? fetch(`${process.env.SHOPIFY_ADMIN_API}/shop.json`, {
            headers: { "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN || "" },
          }).then((res) => ({
            name: "shopify",
            status: res.ok ? "healthy" : "unhealthy",
            responseTime: Date.now() - startTime,
          }))
        : Promise.resolve({ name: "shopify", status: "not_configured", responseTime: 0 }),
    ])

    const totalResponseTime = Date.now() - startTime

    // Log uptime check
    await sql`
      INSERT INTO uptime_checks (
        timestamp, 
        status, 
        response_time, 
        db_response_time,
        services_status
      ) VALUES (
        NOW(), 
        'healthy', 
        ${totalResponseTime}, 
        ${dbResponseTime},
        ${JSON.stringify(services.map((s) => (s.status === "fulfilled" ? s.value : { name: "unknown", status: "error" })))}
      )
    `

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      responseTime: totalResponseTime,
      database: {
        status: "healthy",
        responseTime: dbResponseTime,
      },
      services: services.map((s) => (s.status === "fulfilled" ? s.value : { name: "unknown", status: "error" })),
      version: "1.0.0",
    })
  } catch (error) {
    console.error("Uptime check failed:", error)

    // Log failed check
    try {
      await sql`
        INSERT INTO uptime_checks (
          timestamp, 
          status, 
          response_time, 
          error_message
        ) VALUES (
          NOW(), 
          'unhealthy', 
          ${Date.now() - startTime}, 
          ${error instanceof Error ? error.message : "Unknown error"}
        )
      `
    } catch (logError) {
      console.error("Failed to log uptime check:", logError)
    }

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Service unavailable",
      },
      { status: 503 },
    )
  }
}
