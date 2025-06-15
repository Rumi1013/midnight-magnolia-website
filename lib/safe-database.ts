import { neon } from "@neondatabase/serverless"

// Safe database connection that won't throw during build/render if env vars aren't set
export function getSafeDbConnection() {
  try {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

    if (!connectionString) {
      console.warn("Database connection string not found in environment variables")
      return null
    }

    return neon(connectionString)
  } catch (error) {
    console.error("Failed to initialize database connection:", error)
    return null
  }
}

// Safe execution of SQL queries with error handling
export async function safeExecuteQuery(query: string, params: any[] = []) {
  const sql = getSafeDbConnection()

  if (!sql) {
    console.warn("Database connection not available")
    return null
  }

  try {
    return await sql.query(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    return null
  }
}
