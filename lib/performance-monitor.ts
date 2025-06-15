"use client"

// Performance monitoring utility for client-side metrics
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: any = {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Collect Core Web Vitals
  collectWebVitals() {
    if (typeof window === "undefined") return

    // First Contentful Paint
    const paintEntries = performance.getEntriesByType("paint")
    const fcp = paintEntries.find((entry) => entry.name === "first-contentful-paint")
    if (fcp) {
      this.metrics.firstContentfulPaint = fcp.startTime
    }

    // Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.largestContentfulPaint = lastEntry.startTime
      })
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue
      })
      clsObserver.observe({ entryTypes: ["layout-shift"] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime
        }
      })
      fidObserver.observe({ entryTypes: ["first-input"] })
    }

    // Navigation timing
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    if (navigation) {
      this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
    }
  }

  // Send metrics to server
  async sendMetrics(page: string) {
    if (typeof window === "undefined") return

    try {
      const metricsData = {
        page,
        ...this.metrics,
        userAgent: navigator.userAgent,
        connectionType: (navigator as any).connection?.effectiveType || "unknown",
        timestamp: new Date().toISOString(),
      }

      await fetch("/api/monitoring/performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metricsData),
      })
    } catch (error) {
      console.error("Failed to send performance metrics:", error)
    }
  }

  // Monitor page load
  monitorPageLoad(page: string) {
    if (typeof window === "undefined") return

    // Collect metrics when page loads
    if (document.readyState === "complete") {
      this.collectWebVitals()
      setTimeout(() => this.sendMetrics(page), 1000)
    } else {
      window.addEventListener("load", () => {
        this.collectWebVitals()
        setTimeout(() => this.sendMetrics(page), 1000)
      })
    }
  }
}

// Hook for easy integration
export function usePerformanceMonitoring(page: string) {
  if (typeof window !== "undefined") {
    const monitor = PerformanceMonitor.getInstance()
    monitor.monitorPageLoad(page)
  }
}
