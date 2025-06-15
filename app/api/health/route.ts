import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple health check
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      message: "Midnight Magnolia API is running",
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
      },
      { status: 500 },
    )
  }
}
