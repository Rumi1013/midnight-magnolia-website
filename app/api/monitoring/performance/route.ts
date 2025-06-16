import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Function to ensure tables exist
async function ensureTablesExist() {
  try {
    // Check if performance_metrics table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'performance_metrics'
      );
    `

    if (!tableExists[0]?.exists) {
      // Create the table if it doesn't exist
      await sql`
        CREATE TABLE performance_metrics (
          id SERIAL PRIMARY KEY,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          page VARCHAR(255) NOT NULL,
          load_time INTEGER,
          dom_content_loaded INTEGER,
          first_contentful_paint INTEGER,
          largest_contentful_paint INTEGER,
          cumulative_layout_shift DECIMAL(5,4),
          first_input_delay INTEGER,
          user_agent TEXT,
          connection_type VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `

      // Create index
      await sql`
        CREATE INDEX IF NOT EXISTS idx_performance_metrics_timestamp ON performance_metrics(timestamp);
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_performance_metrics_page ON performance_metrics(page);
      `
    }

    return true
  } catch (error) {
    console.error("Error ensuring tables exist:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    // Ensure tables exist before proceeding
    const tablesReady = await ensureTablesExist()
    if (!tablesReady) {
      return NextResponse.json({ error: "Database tables not ready" }, { status: 503 })
    }

    const metrics = await request.json()

    // Validate metrics with more robust checking
    const validatedMetrics = {
      page: typeof metrics.page === "string" && metrics.page.length > 0 ? metrics.page.substring(0, 255) : "/",
      loadTime:
        typeof metrics.loadTime === "number" && metrics.loadTime >= 0
          ? Math.min(Math.round(metrics.loadTime), 60000)
          : 0,
      domContentLoaded:
        typeof metrics.domContentLoaded === "number" && metrics.domContentLoaded >= 0
          ? Math.min(Math.round(metrics.domContentLoaded), 60000)
          : 0,
      firstContentfulPaint:
        typeof metrics.firstContentfulPaint === "number" && metrics.firstContentfulPaint >= 0
          ? Math.min(Math.round(metrics.firstContentfulPaint), 60000)
          : 0,
      largestContentfulPaint:
        typeof metrics.largestContentfulPaint === "number" && metrics.largestContentfulPaint >= 0
          ? Math.min(Math.round(metrics.largestContentfulPaint), 60000)
          : 0,
      cumulativeLayoutShift:
        typeof metrics.cumulativeLayoutShift === "number" && metrics.cumulativeLayoutShift >= 0
          ? Math.min(Number(metrics.cumulativeLayoutShift.toFixed(4)), 1)
          : 0,
      firstInputDelay:
        typeof metrics.firstInputDelay === "number" && metrics.firstInputDelay >= 0
          ? Math.min(Math.round(metrics.firstInputDelay), 10000)
          : 0,
      userAgent: typeof metrics.userAgent === "string" ? metrics.userAgent.substring(0, 500) : "Unknown",
      connectionType: typeof metrics.connectionType === "string" ? metrics.connectionType.substring(0, 50) : "unknown",
    }

    // Store performance metrics
    await sql`
      INSERT INTO performance_metrics (
        timestamp,
        page,
        load_time,
        dom_content_loaded,
        first_contentful_paint,
        largest_contentful_paint,
        cumulative_layout_shift,
        first_input_delay,
        user_agent,
        connection_type
      ) VALUES (
        NOW(),
        ${validatedMetrics.page},
        ${validatedMetrics.loadTime},
        ${validatedMetrics.domContentLoaded},
        ${validatedMetrics.firstContentfulPaint},
        ${validatedMetrics.largestContentfulPaint},
        ${validatedMetrics.cumulativeLayoutShift},
        ${validatedMetrics.firstInputDelay},
        ${validatedMetrics.userAgent},
        ${validatedMetrics.connectionType}
      )
    `

    return NextResponse.json({
      success: true,
      message: "Performance metrics logged successfully",
    })
  } catch (error) {
    console.error("Performance metrics logging failed:", error)

    // Return a more specific error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json(
      {
        error: "Failed to log performance metrics",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Ensure tables exist before querying
    const tablesReady = await ensureTablesExist()
    if (!tablesReady) {
      return NextResponse.json({
        summary: [],
        timestamp: new Date().toISOString(),
        message: "Database tables not ready",
      })
    }

    // Get performance summary for the last 24 hours
    const summary = await sql`
      SELECT 
        page,
        COUNT(*) as page_views,
        AVG(load_time) as avg_load_time,
        PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY load_time) as p95_load_time,
        AVG(first_contentful_paint) as avg_fcp,
        AVG(largest_contentful_paint) as avg_lcp,
        AVG(cumulative_layout_shift) as avg_cls,
        AVG(first_input_delay) as avg_fid
      FROM performance_metrics 
      WHERE timestamp > NOW() - INTERVAL '24 hours'
      GROUP BY page
      ORDER BY page_views DESC
      LIMIT 20
    `

    return NextResponse.json({
      summary: summary || [],
      timestamp: new Date().toISOString(),
      status: "success",
    })
  } catch (error) {
    console.error("Performance summary failed:", error)

    return NextResponse.json(
      {
        summary: [],
        timestamp: new Date().toISOString(),
        error: "Failed to get performance summary",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
