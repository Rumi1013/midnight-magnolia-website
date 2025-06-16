"use client"

interface PerformanceMetrics {
  page: string
  loadTime: number
  domContentLoaded: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  userAgent: string
  connectionType: string
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Partial<PerformanceMetrics> = {}
  private observer: PerformanceObserver | null = null

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
      // Set basic metrics
      this.metrics.page = window.location.pathname
      this.metrics.userAgent = navigator.userAgent

      // Get connection type if available
      const connection =
        (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      this.metrics.connectionType = connection?.effectiveType || "unknown"

      // Monitor performance entries
      if ("PerformanceObserver" in window) {
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.processPerformanceEntry(entry)
          }
        })

        try {
          this.observer.observe({ entryTypes: ["navigation", "paint", "layout-shift", "first-input"] })
        } catch (error) {
          console.warn("Some performance entry types not supported:", error)
          // Fallback to basic navigation timing
          this.collectBasicMetrics()
        }
      } else {
        // Fallback for browsers without PerformanceObserver
        this.collectBasicMetrics()
      }

      // Send metrics after page load
      window.addEventListener("load", () => {
        setTimeout(() => this.sendMetrics(), 2000)
      })

      // Send metrics before page unload
      window.addEventListener("beforeunload", () => {
        this.sendMetrics(true)
      })
    } catch (error) {
      console.warn("Performance monitoring initialization failed:", error)
    }
  }

  private processPerformanceEntry(entry: PerformanceEntry) {
    try {
      switch (entry.entryType) {
        case "navigation":
          const navEntry = entry as PerformanceNavigationTiming
          this.metrics.loadTime = Math.round(navEntry.loadEventEnd - navEntry.fetchStart)
          this.metrics.domContentLoaded = Math.round(navEntry.domContentLoadedEventEnd - navEntry.fetchStart)
          break

        case "paint":
          if (entry.name === "first-contentful-paint") {
            this.metrics.firstContentfulPaint = Math.round(entry.startTime)
          }
          break

        case "largest-contentful-paint":
          this.metrics.largestContentfulPaint = Math.round(entry.startTime)
          break

        case "layout-shift":
          const layoutEntry = entry as any
          if (!layoutEntry.hadRecentInput) {
            this.metrics.cumulativeLayoutShift = (this.metrics.cumulativeLayoutShift || 0) + layoutEntry.value
          }
          break

        case "first-input":
          this.metrics.firstInputDelay = Math.round(entry.processingStart - entry.startTime)
          break
      }
    } catch (error) {
      console.warn("Error processing performance entry:", error)
    }
  }

  private collectBasicMetrics() {
    try {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing
        this.metrics.loadTime = timing.loadEventEnd - timing.navigationStart
        this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
      }

      // Try to get paint metrics from performance.getEntriesByType
      if (window.performance && window.performance.getEntriesByType) {
        const paintEntries = window.performance.getEntriesByType("paint")
        for (const entry of paintEntries) {
          if (entry.name === "first-contentful-paint") {
            this.metrics.firstContentfulPaint = Math.round(entry.startTime)
          }
        }
      }
    } catch (error) {
      console.warn("Error collecting basic metrics:", error)
    }
  }

  private async sendMetrics(useBeacon = false) {
    try {
      // Ensure we have some basic metrics
      if (!this.metrics.page || (!this.metrics.loadTime && !this.metrics.firstContentfulPaint)) {
        return
      }

      const metricsData = {
        page: this.metrics.page || "/",
        loadTime: this.metrics.loadTime || 0,
        domContentLoaded: this.metrics.domContentLoaded || 0,
        firstContentfulPaint: this.metrics.firstContentfulPaint || 0,
        largestContentfulPaint: this.metrics.largestContentfulPaint || 0,
        cumulativeLayoutShift: this.metrics.cumulativeLayoutShift || 0,
        firstInputDelay: this.metrics.firstInputDelay || 0,
        userAgent: this.metrics.userAgent || "",
        connectionType: this.metrics.connectionType || "unknown",
      }

      if (useBeacon && navigator.sendBeacon) {
        // Use beacon for page unload
        navigator.sendBeacon("/api/monitoring/performance", JSON.stringify(metricsData))
      } else {
        // Use fetch for regular sending
        await fetch("/api/monitoring/performance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(metricsData),
        })
      }
    } catch (error) {
      console.warn("Failed to send performance metrics:", error)
    }
  }

  public trackCustomMetric(name: string, value: number) {
    try {
      // Store custom metrics for later sending
      if (!this.metrics.customMetrics) {
        this.metrics.customMetrics = {}
      }
      this.metrics.customMetrics[name] = value
    } catch (error) {
      console.warn("Failed to track custom metric:", error)
    }
  }
}

export default PerformanceMonitor
