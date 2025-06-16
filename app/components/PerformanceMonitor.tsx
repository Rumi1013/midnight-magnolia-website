"use client"
import { usePathname } from "next/navigation"
import { usePerformanceMonitoring } from "@/lib/performance-monitor"

export default function PerformanceMonitor() {
  const pathname = usePathname()

  // Monitor performance for current page
  usePerformanceMonitoring(pathname)

  return null // This component doesn't render anything
}
