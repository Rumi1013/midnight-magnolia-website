"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Moon, Star } from "lucide-react"

const affirmations = [
  "You are worthy of rest",
  "Your pace is sacred",
  "Healing is not linear",
  "Your journey matters",
  "You belong here",
]

export default function Hero() {
  const [currentAffirmation, setCurrentAffirmation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-midnight-blue overflow-hidden flex items-center justify-center">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-gold/30"
        >
          <Moon size={40} />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-32 right-20 text-sage-green/30"
        >
          <Star size={24} />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 text-magnolia-white/20"
        >
          <Sparkles size={32} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-magnolia-white mb-6">
            Welcome to Your
            <span className="block text-gold">Digital Sanctuary</span>
          </h1>

          <div className="h-16 mb-8 flex items-center justify-center">
            <motion.p
              key={currentAffirmation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="font-lora text-xl md:text-2xl text-sage-green italic"
            >
              "{affirmations[currentAffirmation]}"
            </motion.p>
          </div>

          <p className="font-lora text-lg md:text-xl text-magnolia-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Where ancestral wisdom meets Southern Gothic grace. Transform your healing journey through sacred tools,
            gentle productivity, and digital sanctuary designed for chronic illness warriors and spiritual
            entrepreneurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Enter the Garden
            </Link>
            <Link
              href="/shop"
              className="bg-transparent border-2 border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
            >
              Explore Sacred Tools
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-magnolia-white to-transparent" />
    </section>
  )
}
