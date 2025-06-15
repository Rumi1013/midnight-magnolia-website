"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle, Database, Globe, RefreshCw, Zap } from "lucide-react"

interface UptimeData {
  status: string
  timestamp: string
  responseTime: number
  database: {
    status: string
    responseTime: number
  }
  services: Array<{
    name: string
    status: string
    responseTime: number
  }>
}

interface PerformanceData {
  summary: Array<{
    page: string
    page_views: number
    avg_load_time: number
    p95_load_time: number
    avg_fcp: number
    avg_lcp: number
    avg_cls: number
    avg_fid: number
  }>
}

interface Alert {
  id: number
  timestamp: string
  type: string
  message: string
  severity: string
  status: string
}

export default function MonitoringDashboardClient() {
  const [uptimeData, setUptimeData] = useState<UptimeData | null>(null)
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchMonitoringData = async () => {
    try {
      const [uptimeRes, performanceRes, alertsRes] = await Promise.all([
        fetch("/api/monitoring/uptime"),
        fetch("/api/monitoring/performance"),
        fetch("/api/monitoring/alerts"),
      ])

      if (uptimeRes.ok) {
        const uptime = await uptimeRes.json()
        setUptimeData(uptime)
      }

      if (performanceRes.ok) {
        const performance = await performanceRes.json()
        setPerformanceData(performance)
      }

      if (alertsRes.ok) {
        const alertData = await alertsRes.json()
        setAlerts(alertData.alerts || [])
      }

      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch monitoring data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMonitoringData()
    const interval = setInterval(fetchMonitoringData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-sage-green"
      case "unhealthy":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      default:
        return "text-warm-gray"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-warm-gray"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-blue p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">System Monitoring</h1>
            <p className="font-lora text-warm-gray">
              Real-time uptime and performance monitoring for Midnight Magnolia
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-warm-gray">Last updated: {lastUpdate.toLocaleTimeString()}</div>
            <Button
              onClick={fetchMonitoringData}
              variant="outline"
              size="sm"
              className="border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-magnolia-white">System Status</CardTitle>
              <Activity className={`h-4 w-4 ${getStatusColor(uptimeData?.status || "unknown")}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-magnolia-white">
                {uptimeData?.status === "healthy" ? "Healthy" : "Issues"}
              </div>
              <p className="text-xs text-warm-gray">Response time: {uptimeData?.responseTime || 0}ms</p>
            </CardContent>
          </Card>

          <Card className="bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-magnolia-white">Database</CardTitle>
              <Database className={`h-4 w-4 ${getStatusColor(uptimeData?.database?.status || "unknown")}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-magnolia-white">
                {uptimeData?.database?.status === "healthy" ? "Online" : "Offline"}
              </div>
              <p className="text-xs text-warm-gray">Response time: {uptimeData?.database?.responseTime || 0}ms</p>
            </CardContent>
          </Card>

          <Card className="bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-magnolia-white">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-magnolia-white">{alerts.length}</div>
              <p className="text-xs text-warm-gray">
                {alerts.filter((a) => a.severity === "critical").length} critical
              </p>
            </CardContent>
          </Card>

          <Card className="bg-magnolia-white/5 border-magnolia-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-magnolia-white">Avg Load Time</CardTitle>
              <Zap className="h-4 w-4 text-sage-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-magnolia-white">
                {performanceData?.summary?.[0]?.avg_load_time
                  ? Math.round(performanceData.summary[0].avg_load_time) + "ms"
                  : "N/A"}
              </div>
              <p className="text-xs text-warm-gray">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Monitoring */}
        <Tabs defaultValue="uptime" className="space-y-6">
          <TabsList className="bg-magnolia-white/5 border-magnolia-white/10">
            <TabsTrigger
              value="uptime"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-midnight-blue"
            >
              Uptime
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-midnight-blue"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="data-[state=active]:bg-sage-green data-[state=active]:text-midnight-blue"
            >
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uptime" className="space-y-6">
            <Card className="bg-magnolia-white/5 border-magnolia-white/10">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Service Status</CardTitle>
                <CardDescription className="text-warm-gray">Current status of all monitored services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uptimeData?.services?.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-magnolia-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                        <div>
                          <div className="font-medium text-magnolia-white capitalize">{service.name}</div>
                          <div className="text-sm text-warm-gray">Response time: {service.responseTime}ms</div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${getStatusColor(service.status)} border-current`}>
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-magnolia-white/5 border-magnolia-white/10">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Page Performance</CardTitle>
                <CardDescription className="text-warm-gray">Performance metrics for the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData?.summary?.map((page, index) => (
                    <div key={index} className="p-4 bg-magnolia-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-magnolia-white">{page.page}</div>
                        <Badge variant="outline" className="text-sage-green border-sage-green">
                          {page.page_views} views
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-warm-gray">Avg Load Time</div>
                          <div className="text-magnolia-white font-medium">{Math.round(page.avg_load_time)}ms</div>
                        </div>
                        <div>
                          <div className="text-warm-gray">95th Percentile</div>
                          <div className="text-magnolia-white font-medium">{Math.round(page.p95_load_time)}ms</div>
                        </div>
                        <div>
                          <div className="text-warm-gray">FCP</div>
                          <div className="text-magnolia-white font-medium">{Math.round(page.avg_fcp)}ms</div>
                        </div>
                        <div>
                          <div className="text-warm-gray">LCP</div>
                          <div className="text-magnolia-white font-medium">{Math.round(page.avg_lcp)}ms</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-magnolia-white/5 border-magnolia-white/10">
              <CardHeader>
                <CardTitle className="text-magnolia-white">Active Alerts</CardTitle>
                <CardDescription className="text-warm-gray">Current system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-sage-green mx-auto mb-4" />
                      <div className="text-magnolia-white font-medium">No active alerts</div>
                      <div className="text-warm-gray text-sm">All systems are running smoothly</div>
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <div key={alert.id} className="p-4 bg-magnolia-white/5 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                                {alert.severity}
                              </Badge>
                              <span className="text-sm text-warm-gray">
                                {new Date(alert.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div className="font-medium text-magnolia-white mb-1">{alert.type}</div>
                            <div className="text-warm-gray text-sm">{alert.message}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
