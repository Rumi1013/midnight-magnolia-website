import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request) {
  try {
    const metrics = await request.json()

    // Validate metrics
    const validatedMetrics = {
      page: typeof metrics.page === "string" ? metrics.page.substring(0, 255) : "/",
      loadTime: typeof metrics.loadTime === "number" ? Math.min(metrics.loadTime, 60000) : 0,
      domContentLoaded: typeof metrics.domContentLoaded === "number" ? Math.min(metrics.domContentLoaded, 60000) : 0,
      firstContentfulPaint:
        typeof metrics.firstContentfulPaint === "number" ? Math.min(metrics.firstContentfulPaint, 60000) : 0,
      largestContentfulPaint:
        typeof metrics.largestContentfulPaint === "number" ? Math.min(metrics.largestContentfulPaint, 60000) : 0,
      cumulativeLayoutShift:
        typeof metrics.cumulativeLayoutShift === "number" ? Math.min(metrics.cumulativeLayoutShift, 1) : 0,
      firstInputDelay: typeof metrics.firstInputDelay === "number" ? Math.min(metrics.firstInputDelay, 10000) : 0,
      userAgent: typeof metrics.userAgent === "string" ? metrics.userAgent.substring(0, 500) : "",
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Performance metrics logging failed:", error)
    return NextResponse.json({ error: "Failed to log metrics" }, { status: 500 })
  }
}

export async function GET() {
  try {
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
    `

    return NextResponse.json({
      summary,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Performance summary failed:", error)
    return NextResponse.json({ error: "Failed to get performance summary" }, { status: 500 })
  }
}
