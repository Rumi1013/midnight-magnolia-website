import { Suspense } from "react"
import MonitoringDashboardClient from "./MonitoringDashboardClient"

export const metadata = {
  title: "System Monitoring - Midnight Magnolia",
  description: "Real-time uptime and performance monitoring dashboard",
}

export default function MonitoringDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
        </div>
      }
    >
      <MonitoringDashboardClient />
    </Suspense>
  )
}
