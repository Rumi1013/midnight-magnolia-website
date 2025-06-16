import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const errorData = await request.json()

    // Validate error data
    const validatedError = {
      message: typeof errorData.message === "string" ? errorData.message.substring(0, 1000) : "Unknown error",
      stack: typeof errorData.stack === "string" ? errorData.stack.substring(0, 5000) : "",
      url: typeof errorData.url === "string" ? errorData.url.substring(0, 500) : "",
      userAgent: typeof errorData.userAgent === "string" ? errorData.userAgent.substring(0, 500) : "",
      timestamp: new Date().toISOString(),
    }

    // Try to log to database (with fallback)
    try {
      await sql`
        INSERT INTO error_logs (
          message,
          stack,
          url,
          user_agent,
          timestamp
        ) VALUES (
          ${validatedError.message},
          ${validatedError.stack},
          ${validatedError.url},
          ${validatedError.userAgent},
          NOW()
        )
      `
    } catch (dbError) {
      // If database logging fails, at least log to console
      console.error("Failed to log error to database:", dbError)
      console.error("Original error:", validatedError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging endpoint failed:", error)
    return NextResponse.json({ error: "Failed to log error" }, { status: 500 })
  }
}
