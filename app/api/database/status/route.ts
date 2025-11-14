import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { createClient } from "@supabase/supabase-js"

// 🌙 Check your existing database connections
const neonSql = neon(process.env.DATABASE_URL!)

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function GET() {
  const status = {
    neon: { connected: false, error: null, tables: [] },
    supabase: { connected: false, error: null, info: null },
    shopify: { tablesExist: false, productCount: 0 },
  }

  // 🌸 Test Neon connection
  try {
    const result = await neonSql`SELECT current_database(), current_user, version()`
    status.neon.connected = true

    // Check if Shopify tables exist
    const tables = await neonSql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'shopify_%'
    `
    status.neon.tables = tables.map((t: any) => t.table_name)
    status.shopify.tablesExist = tables.length > 0

    // Count cached products
    if (status.shopify.tablesExist) {
      const productCount = await neonSql`SELECT COUNT(*) as count FROM shopify_products`
      status.shopify.productCount = productCount[0]?.count || 0
    }
  } catch (error: any) {
    status.neon.error = error.message
  }

  // 🌿 Test Supabase connection
  if (supabase) {
    try {
      const { error } = await supabase.from("_").select("*").limit(1)
      if (!error || error.message.includes("does not exist")) {
        status.supabase.connected = true
        status.supabase.info = "Connected successfully"
      } else {
        status.supabase.error = error.message
      }
    } catch (error: any) {
      status.supabase.error = error.message
    }
  } else {
    status.supabase.error = "Supabase environment variables not configured"
  }

  return NextResponse.json({
    success: true,
    databases: status,
    environment: {
      hasNeonUrl: !!process.env.DATABASE_URL,
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseAnonKey,
      nodeEnv: process.env.NODE_ENV,
    },
    timestamp: new Date().toISOString(),
  })
}
