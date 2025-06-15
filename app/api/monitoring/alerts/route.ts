import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const { type, message, severity, metadata } = await request.json()

    // Validate alert data
    const validatedAlert = {
      type: typeof type === "string" ? type.substring(0, 100) : "unknown",
      message: typeof message === "string" ? message.substring(0, 1000) : "No message",
      severity: ["low", "medium", "high", "critical"].includes(severity) ? severity : "medium",
      metadata: typeof metadata === "object" ? JSON.stringify(metadata) : "{}",
    }

    // Store alert
    await sql`
      INSERT INTO monitoring_alerts (
        timestamp,
        type,
        message,
        severity,
        metadata,
        status
      ) VALUES (
        NOW(),
        ${validatedAlert.type},
        ${validatedAlert.message},
        ${validatedAlert.severity},
        ${validatedAlert.metadata},
        'active'
      )
    `

    // Check if we need to send notifications (implement your notification logic here)
    if (validatedAlert.severity === "critical") {
      console.error(`CRITICAL ALERT: ${validatedAlert.message}`, validatedAlert.metadata)
      // TODO: Send email/SMS/Slack notification
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Alert creation failed:", error)
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const alerts = await sql`
      SELECT * FROM monitoring_alerts 
      WHERE status = 'active' 
      ORDER BY timestamp DESC 
      LIMIT 50
    `

    return NextResponse.json({ alerts })
  } catch (error) {
    console.error("Alert retrieval failed:", error)
    return NextResponse.json({ error: "Failed to get alerts" }, { status: 500 })
  }
}
