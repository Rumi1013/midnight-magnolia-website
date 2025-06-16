"use client"

import { usePathname } from "next/navigation"
import { usePerformanceMonitoring } from "@/lib/performance-monitor"

export default function PerformanceMonitor() {
  const pathname = usePathname()

  // Monitor performance for current page
  usePerformanceMonitoring(pathname)

  // This component renders nothing
  return null
}
