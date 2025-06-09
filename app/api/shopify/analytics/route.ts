import { NextResponse } from "next/server"
import { ShopifyDatabase } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")

    // Get order statistics
    const orderStats = await ShopifyDatabase.getOrderStats(days)

    // Get top products
    const topProducts = await ShopifyDatabase.getTopProducts(10)

    // Get low stock items
    const lowStockItems = await ShopifyDatabase.getLowStockItems(5)

    // Get webhook statistics
    const webhookStats = await ShopifyDatabase.getWebhookStats()

    // Get recent orders
    const recentOrders = await ShopifyDatabase.getRecentOrders(10)

    return NextResponse.json({
      orderStats,
      topProducts,
      lowStockItems,
      webhookStats,
      recentOrders,
      period: `${days} days`,
    })
  } catch (error: any) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
