"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Hero() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-midnight-blue text-magnolia-white overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-playfair mb-6 text-gradient">Welcome to Your Digital Sanctuary</h1>
          <p className="text-xl md:text-2xl font-lora mb-8 text-magnolia-white/80 max-w-3xl mx-auto">
            A sacred space for healing through Southern Gothic grace. Begin your journey of gentle transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4"
            >
              Enter the Garden
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4"
            >
              Explore Our Offerings
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 text-6xl">🌙</div>
        <div className="absolute bottom-1/4 right-1/4 text-4xl">✨</div>
        <div className="absolute top-1/2 right-1/3 text-5xl">🌸</div>
      </div>
    </section>
  )
}
