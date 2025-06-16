import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Function to ensure alerts table exists
async function ensureAlertsTableExists() {
  try {
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'monitoring_alerts'
      );
    `

    if (!tableExists[0]?.exists) {
      await sql`
        CREATE TABLE monitoring_alerts (
          id SERIAL PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          type VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
          metadata JSONB,
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'acknowledged')),
          resolved_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_timestamp ON monitoring_alerts(timestamp);
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_monitoring_alerts_status ON monitoring_alerts(status);
      `
    }

    return true
  } catch (error) {
    console.error("Error ensuring alerts table exists:", error)
    return false
  }
}

export async function GET() {
  try {
    // Ensure table exists
    const tableReady = await ensureAlertsTableExists()
    if (!tableReady) {
      return NextResponse.json({
        alerts: [],
        message: "Alerts table not ready",
      })
    }

    // Get active alerts
    const alerts = await sql`
      SELECT * FROM monitoring_alerts 
      WHERE status = 'active'
      ORDER BY timestamp DESC 
      LIMIT 50
    `

    return NextResponse.json({
      alerts: alerts || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to fetch alerts:", error)

    return NextResponse.json(
      {
        alerts: [],
        error: "Failed to fetch alerts",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Ensure table exists
    const tableReady = await ensureAlertsTableExists()
    if (!tableReady) {
      return NextResponse.json({ error: "Alerts table not ready" }, { status: 503 })
    }

    const alertData = await request.json()

    // Validate alert data
    const validatedAlert = {
      type: typeof alertData.type === "string" ? alertData.type.substring(0, 100) : "Unknown",
      message: typeof alertData.message === "string" ? alertData.message.substring(0, 1000) : "No message",
      severity: ["low", "medium", "high", "critical"].includes(alertData.severity) ? alertData.severity : "medium",
      metadata: alertData.metadata || {},
    }

    // Create alert
    const result = await sql`
      INSERT INTO monitoring_alerts (type, message, severity, metadata)
      VALUES (${validatedAlert.type}, ${validatedAlert.message}, ${validatedAlert.severity}, ${JSON.stringify(validatedAlert.metadata)})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      alert: result[0],
    })
  } catch (error) {
    console.error("Failed to create alert:", error)

    return NextResponse.json(
      {
        error: "Failed to create alert",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
