"use client"

import { useEffect } from "react"

interface PerformanceMetrics {
  page: string
  loadTime?: number
  domContentLoaded?: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
  cumulativeLayoutShift?: number
  firstInputDelay?: number
  userAgent?: string
  connectionType?: string
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetrics = { page: "/" }

  private constructor() {
    if (typeof window !== "undefined") {
      this.initializeMonitoring()
    }
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private initializeMonitoring() {
    try {
      this.metrics.page = window.location.pathname
      this.metrics.userAgent = navigator.userAgent

      const connection = (navigator as any).connection
      this.metrics.connectionType = connection?.effectiveType || "unknown"

      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              this.processPerformanceEntry(entry)
            }
          })
          observer.observe({ entryTypes: ["navigation", "paint"] })
        } catch (error) {
          this.collectBasicMetrics()
        }
      } else {
        this.collectBasicMetrics()
      }

      window.addEventListener("load", () => {
        setTimeout(() => this.sendMetrics(), 2000)
      })
    } catch (error) {
      // Silently fail to avoid breaking the app
    }
  }

  private processPerformanceEntry(entry: PerformanceEntry) {
    try {
      if (entry.entryType === "navigation") {
        const navEntry = entry as PerformanceNavigationTiming
        this.metrics.loadTime = Math.round(navEntry.loadEventEnd - navEntry.fetchStart)
        this.metrics.domContentLoaded = Math.round(navEntry.domContentLoadedEventEnd - navEntry.fetchStart)
      } else if (entry.entryType === "paint" && entry.name === "first-contentful-paint") {
        this.metrics.firstContentfulPaint = Math.round(entry.startTime)
      }
    } catch (error) {
      // Silently fail
    }
  }

  private collectBasicMetrics() {
    try {
      if (window.performance?.timing) {
        const timing = window.performance.timing
        this.metrics.loadTime = timing.loadEventEnd - timing.navigationStart
        this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
      }
    } catch (error) {
      // Silently fail
    }
  }

  private async sendMetrics() {
    try {
      if (!this.metrics.page) return

      await fetch("/api/monitoring/performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.metrics),
      })
    } catch (error) {
      // Silently fail to avoid breaking the app
    }
  }

  public monitorPageLoad(page: string) {
    if (typeof window === "undefined") return
    this.metrics.page = page
  }
}

export default PerformanceMonitor

export function usePerformanceMonitoring(page: string) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const monitor = PerformanceMonitor.getInstance()
      monitor.monitorPageLoad(page)
    }
  }, [page])
}
