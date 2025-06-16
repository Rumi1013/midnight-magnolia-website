import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Function to ensure uptime_checks table exists
async function ensureUptimeTableExists() {
  try {
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'uptime_checks'
      );
    `

    if (!tableExists[0]?.exists) {
      await sql`
        CREATE TABLE uptime_checks (
          id SERIAL PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          status VARCHAR(20) NOT NULL,
          response_time INTEGER,
          db_response_time INTEGER,
          services_status JSONB,
          error_message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_uptime_checks_timestamp ON uptime_checks(timestamp);
      `
    }

    return true
  } catch (error) {
    console.error("Error ensuring uptime table exists:", error)
    return false
  }
}

async function checkDatabaseHealth(): Promise<{ status: string; responseTime: number }> {
  const startTime = Date.now()
  try {
    await sql`SELECT 1`
    const responseTime = Date.now() - startTime
    return { status: "healthy", responseTime }
  } catch (error) {
    const responseTime = Date.now() - startTime
    console.error("Database health check failed:", error)
    return { status: "unhealthy", responseTime }
  }
}

async function checkExternalServices() {
  const services = []

  // Check Stripe (if configured)
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const startTime = Date.now()
      const response = await fetch("https://api.stripe.com/v1/account", {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      })
      const responseTime = Date.now() - startTime

      services.push({
        name: "stripe",
        status: response.ok ? "healthy" : "unhealthy",
        responseTime,
      })
    } catch (error) {
      services.push({
        name: "stripe",
        status: "unhealthy",
        responseTime: 0,
      })
    }
  }

  // Check Shopify (if configured)
  if (process.env.SHOPIFY_ADMIN_API && process.env.SHOPIFY_ACCESS_TOKEN) {
    try {
      const startTime = Date.now()
      const response = await fetch(`${process.env.SHOPIFY_ADMIN_API}/shop.json`, {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
      })
      const responseTime = Date.now() - startTime

      services.push({
        name: "shopify",
        status: response.ok ? "healthy" : "unhealthy",
        responseTime,
      })
    } catch (error) {
      services.push({
        name: "shopify",
        status: "unhealthy",
        responseTime: 0,
      })
    }
  }

  return services
}

export async function GET() {
  const startTime = Date.now()

  try {
    // Ensure table exists
    await ensureUptimeTableExists()

    // Check database health
    const database = await checkDatabaseHealth()

    // Check external services
    const services = await checkExternalServices()

    // Determine overall status
    const overallStatus =
      database.status === "healthy" && services.every((service) => service.status === "healthy")
        ? "healthy"
        : "unhealthy"

    const responseTime = Date.now() - startTime

    const uptimeData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime,
      database,
      services,
    }

    // Log the uptime check
    try {
      await sql`
        INSERT INTO uptime_checks (
          status, 
          response_time, 
          db_response_time, 
          services_status
        ) VALUES (
          ${overallStatus},
          ${responseTime},
          ${database.responseTime},
          ${JSON.stringify({ database, services })}
        )
      `
    } catch (logError) {
      console.error("Failed to log uptime check:", logError)
      // Continue without failing the health check
    }

    return NextResponse.json(uptimeData)
  } catch (error) {
    console.error("Uptime check failed:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        error: "Health check failed",
        database: { status: "unhealthy", responseTime: 0 },
        services: [],
      },
      { status: 500 },
    )
  }
}
