"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, LinkIcon, CogIcon } from "@heroicons/react/24/solid"
import { Skeleton } from "@/components/ui/skeleton"
import {
  UsersIcon,
  RectangleGroupIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  TagIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"

interface Integration {
  id: string
  name: string
  description: string
  logoUrl?: string // URL to logo image or use an icon
  icon?: React.ElementType
  connected: boolean
  statusText: string
  status: "active" | "needs_reconnection" | "error" | "disconnected"
  lastSync?: string
  manageUrl?: string // Link to manage integration settings
  connectUrl?: string // Link to connect/reconnect
  requiresSecureConnection?: boolean
}

const platformIcons: { [key: string]: React.ElementType } = {
  HubSpot: UsersIcon,
  Airtable: RectangleGroupIcon,
  Shopify: ShoppingBagIcon,
  Stripe: CreditCardIcon,
  Notion: DocumentTextIcon,
  "Make.com": WrenchScrewdriverIcon,
  Etsy: TagIcon,
  Patreon: HeartIcon,
}

export default function AiStudioIntegrationStatus() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIntegrationStatus()
  }, [])

  const fetchIntegrationStatus = async () => {
    setLoading(true)
    try {
      // In a real app, fetch this from /api/integrations/studio/route.ts
      // For now, using mock data
      const mockData: Integration[] = [
        {
          id: "hubspot",
          name: "HubSpot",
          description: "CRM & Marketing",
          icon: platformIcons["HubSpot"],
          connected: true,
          statusText: "Connected",
          status: "active",
          lastSync: new Date().toLocaleDateString(),
        },
        {
          id: "airtable",
          name: "Airtable",
          description: "Databases & Spreadsheets",
          icon: platformIcons["Airtable"],
          connected: true,
          statusText: "Connected",
          status: "active",
          lastSync: new Date().toLocaleDateString(),
        },
        {
          id: "shopify",
          name: "Shopify",
          description: "E-commerce Platform",
          icon: platformIcons["Shopify"],
          connected: true,
          statusText: "Connected",
          status: "active",
          lastSync: new Date().toLocaleDateString(),
        },
        {
          id: "stripe",
          name: "Stripe",
          description: "Payment Processing",
          icon: platformIcons["Stripe"],
          connected: false,
          statusText: "Disconnected",
          status: "disconnected",
          connectUrl: "#",
        },
        {
          id: "notion",
          name: "Notion",
          description: "Workspace & Docs",
          icon: platformIcons["Notion"],
          connected: true,
          statusText: "Connected",
          status: "active",
          lastSync: new Date().toLocaleDateString(),
        },
        {
          id: "makecom",
          name: "Make.com",
          description: "Automation Platform",
          icon: platformIcons["Make.com"],
          connected: false,
          statusText: "Requires Reconnection (HTTP)",
          status: "needs_reconnection",
          connectUrl: "#",
          requiresSecureConnection: true,
        },
        {
          id: "etsy",
          name: "Etsy",
          description: "Marketplace for Creators",
          icon: platformIcons["Etsy"],
          connected: false,
          statusText: "Connect to Etsy",
          status: "disconnected",
          connectUrl: "#",
        },
        {
          id: "patreon",
          name: "Patreon",
          description: "Membership Platform",
          icon: platformIcons["Patreon"],
          connected: true,
          statusText: "Connected",
          status: "active",
          lastSync: new Date().toLocaleDateString(),
        },
      ]
      setIntegrations(mockData)
    } catch (error) {
      console.error("Failed to fetch integration status:", error)
      // Set some error state or default integrations
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (integrationId: string, action: "connect" | "reconnect" | "manage") => {
    console.log(`Performing ${action} for ${integrationId}`)
    // Placeholder for actual API calls
    // For Make.com, if action is connect/reconnect, remind about HTTPS if applicable
    if (integrationId === "makecom" && (action === "connect" || action === "reconnect")) {
      alert(
        "Make.com connection might use HTTP. Ensure you understand the security implications or use a secure webhook URL if possible.",
      )
    }
    // After action, refresh status
    // fetchIntegrationStatus();
  }

  const getStatusIcon = (status: Integration["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircleIcon className="w-6 h-6 text-sage-green" />
      case "needs_reconnection":
        return <ExclamationTriangleIcon className="w-6 h-6 text-rich-gold" />
      case "error":
        return <XCircleIcon className="w-6 h-6 text-red-500" />
      case "disconnected":
        return <LinkIcon className="w-6 h-6 text-warm-gray" />
      default:
        return <CogIcon className="w-6 h-6 text-warm-gray" />
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-midnight-blue-darker border-warm-gray/40 shadow-gentle">
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-8 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Card className="bg-midnight-blue-darker border-none text-magnolia-white">
      <CardHeader>
        <CardTitle className="font-playfair text-rich-gold text-2xl">Platform Integrations</CardTitle>
        <CardDescription className="font-lora text-warm-gray">
          Connect and manage your tools for seamless content creation and distribution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <Card
              key={integration.id}
              className="bg-midnight-blue border border-warm-gray/30 shadow-gentle flex flex-col justify-between"
            >
              <div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    {integration.icon && <integration.icon className="w-8 h-8 text-rich-gold" />}
                    <CardTitle className="text-xl font-playfair text-magnolia-white">{integration.name}</CardTitle>
                  </div>
                  {getStatusIcon(integration.status)}
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-lora text-warm-gray mb-1">{integration.description}</p>
                  <p
                    className={`text-xs font-montserrat ${integration.status === "active" ? "text-sage-green" : integration.status === "needs_reconnection" ? "text-rich-gold" : "text-red-400"}`}
                  >
                    {integration.statusText}
                    {integration.requiresSecureConnection &&
                      integration.status === "needs_reconnection" &&
                      " (Check Security)"}
                  </p>
                  {integration.lastSync && integration.status === "active" && (
                    <p className="text-xs font-montserrat text-magnolia-white/70">
                      Last synced: {integration.lastSync}
                    </p>
                  )}
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                {integration.status === "disconnected" && integration.connectUrl && (
                  <Button
                    onClick={() => handleAction(integration.id, "connect")}
                    className="w-full bg-sage-green text-midnight-blue hover:bg-sage-green/90 font-montserrat"
                  >
                    Connect
                  </Button>
                )}
                {integration.status === "needs_reconnection" && integration.connectUrl && (
                  <Button
                    onClick={() => handleAction(integration.id, "reconnect")}
                    className="w-full bg-rich-gold text-midnight-blue hover:bg-rich-gold/90 font-montserrat"
                  >
                    Reconnect
                  </Button>
                )}
                {integration.status === "active" && integration.manageUrl && (
                  <Button
                    variant="outline"
                    onClick={() => handleAction(integration.id, "manage")}
                    className="w-full text-magnolia-white border-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat"
                  >
                    Manage
                  </Button>
                )}
                {integration.status === "active" && !integration.manageUrl && (
                  <Button
                    variant="outline"
                    disabled
                    className="w-full text-magnolia-white/70 border-warm-gray/50 font-montserrat"
                  >
                    Manage (N/A)
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
