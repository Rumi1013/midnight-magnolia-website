"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  SparklesIcon,
  BookOpenIcon,
  PaintBrushIcon,
  LinkIcon,
  MoonIcon as SolidMoonIcon,
} from "@heroicons/react/24/solid"
import { CogIcon, BellIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import AiStudioIntegrationStatus from "./components/AiStudioIntegrationStatus"
import TarotDashboard from "./components/TarotDashboard"
import ContentGenerator from "./components/ContentGenerator"
import KdpAssistant from "./components/KdpAssistant"
import VintageArtModule from "./components/VintageArtModule"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type ActiveModule =
  | "content-generator"
  | "tarot-dashboard"
  | "kdp-assistant"
  | "vintage-art"
  | "integrations"
  | "settings"

interface NavItem {
  id: ActiveModule
  label: string
  icon: React.ElementType
  description?: string
}

export default function AiContentStudioClient() {
  const [activeModule, setActiveModule] = useState<ActiveModule>("content-generator")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 60) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const getMoonPhase = () => {
    const phases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]
    const dayOfMonth = currentTime.getDate()
    return phases[Math.floor(dayOfMonth / 3.69) % 8] // Approximation
  }

  const navItems: NavItem[] = [
    {
      id: "content-generator",
      label: "Content Generator",
      icon: SparklesIcon,
      description: "AI-powered text for all platforms.",
    },
    {
      id: "tarot-dashboard",
      label: "Tarot Dashboard",
      icon: SolidMoonIcon,
      description: "Divine insights and interpretations.",
    },
    {
      id: "kdp-assistant",
      label: "KDP Assistant",
      icon: BookOpenIcon,
      description: "Craft compelling Kindle content.",
    },
    {
      id: "vintage-art",
      label: "Vintage Art Studio",
      icon: PaintBrushIcon,
      description: "Describe and enhance classic artwork.",
    },
    { id: "integrations", label: "Integrations", icon: LinkIcon, description: "Manage your connected platforms." },
    { id: "settings", label: "Studio Settings", icon: CogIcon, description: "Customize your AI studio." },
  ]

  const renderModule = () => {
    switch (activeModule) {
      case "content-generator":
        return <ContentGenerator />
      case "tarot-dashboard":
        return <TarotDashboard />
      case "kdp-assistant":
        return <KdpAssistant />
      case "vintage-art":
        return <VintageArtModule />
      case "integrations":
        return <AiStudioIntegrationStatus />
      case "settings":
        return (
          <Card className="bg-midnight-blue-darker border-warm-gray text-magnolia-white">
            <CardHeader>
              <CardTitle className="font-playfair text-rich-gold">Studio Settings</CardTitle>
              <CardDescription className="font-lora text-warm-gray">
                Customize your AI Content Studio experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-lora">
                Settings for AI model preferences, default tones, and more will be available here.
              </p>
            </CardContent>
          </Card>
        )
      default:
        return <ContentGenerator />
    }
  }

  return (
    <div className="min-h-screen bg-midnight-blue flex text-magnolia-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-80 bg-midnight-blue-darker p-6 shadow-gentle overflow-y-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-rich-gold rounded-full flex items-center justify-center shadow-md">
            <SparklesIcon className="w-7 h-7 text-midnight-blue" />
          </div>
          <div>
            <h2 className="font-playfair text-2xl font-bold text-magnolia-white">AI Studio</h2>
            <p className="font-montserrat text-xs text-sage-green tracking-wider">CONTENT ALCHEMY</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeModule === item.id ? "default" : "ghost"}
              onClick={() => setActiveModule(item.id)}
              className={`w-full justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeModule === item.id
                    ? "bg-rich-gold text-midnight-blue shadow-md hover:bg-rich-gold/90"
                    : "text-magnolia-white hover:bg-magnolia-white/10 hover:text-rich-gold"
                }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 shrink-0 ${activeModule === item.id ? "text-midnight-blue" : "text-sage-green"}`}
              />
              <div>
                <span className="font-lora text-base">{item.label}</span>
                {item.description && (
                  <p
                    className={`font-montserrat text-xs mt-0.5 ${activeModule === item.id ? "text-midnight-blue/80" : "text-warm-gray"}`}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </Button>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-warm-gray/30">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full justify-start text-left h-auto py-3 px-4 rounded-lg transition-all duration-300 ease-in-out text-magnolia-white border-sage-green hover:bg-sage-green hover:text-midnight-blue"
          >
            <HomeIcon className="w-5 h-5 mr-3 shrink-0 text-sage-green" />
            <span className="font-lora text-base">Main Dashboard</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 p-8 flex-1 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-magnolia-white">
              {navItems.find((nav) => nav.id === activeModule)?.label || "AI Content Studio"}
            </h1>
            <p className="font-montserrat text-sage-green flex items-center gap-2">
              <span className="text-2xl">{getMoonPhase()}</span>
              {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} | Gentle
              productivity flows.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-magnolia-white hover:bg-magnolia-white/10">
              <BellIcon className="w-6 h-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserCircleIcon className="w-10 h-10 text-sage-green" />
          </div>
        </header>

        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {renderModule()}
        </motion.div>
      </main>
    </div>
  )
}
