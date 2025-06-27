"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
    const timer = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-midnight-blue via-midnight-blue to-midnight-blue/90">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute top-20 left-20 text-gold/20"
        >
          <Moon size={40} />
        </motion.div>

        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-32 text-sage-green/30"
        >
          <Star size={24} />
        </motion.div>

        <motion.div
          animate={{
            x: [-30, 30, -30],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-40 left-40 text-warm-gray/40"
        >
          <Sparkles size={32} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-magnolia-white mb-6">
            Midnight
            <span className="text-gold"> Magnolia</span>
          </h1>

          <div className="h-16 mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentAffirmation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-lora text-xl md:text-2xl text-magnolia-white/90 italic"
              >
                "{affirmations[currentAffirmation]}"
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="font-lora text-lg md:text-xl text-magnolia-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            A digital sanctuary where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing
            through gentle productivity and sacred rituals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="group bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Enter the Garden
              <Sparkles className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>

            <Link
              href="/shop"
              className="bg-transparent border-2 border-magnolia-white/30 hover:border-gold text-magnolia-white hover:text-gold font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Explore Sacred Tools
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 text-magnolia-white/5">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
