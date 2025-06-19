import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Basic health check - don't expose sensitive system information
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json({ status: "unhealthy" }, { status: 500 })
  }
}
