"use client"

import { useReportWebVitals } from "next/web-vitals"

export default function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    try {
      const body = JSON.stringify({ type: "web-vitals", metric })
      // Use sendBeacon for reliability, fallback to fetch
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/monitoring/performance", body)
      } else {
        fetch("/api/monitoring/performance", { body, method: "POST", keepalive: true })
      }
    } catch (error) {
      console.warn("Could not report web vitals.", error)
    }
  })

  return null
}
