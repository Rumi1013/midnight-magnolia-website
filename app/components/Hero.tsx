"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ChevronDown, Sparkles } from "lucide-react"

const affirmations = [
  "You are worthy of rest",
  "Your pace is sacred",
  "Healing is not linear",
  "Your story matters",
  "You belong here",
  "Your sensitivity is a gift",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight-blue">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage-green/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sage-green/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-magnolia-white mb-6">
            Welcome to Your
            <span className="block text-sage-green">Digital Sanctuary</span>
          </h1>
          <p className="font-lora text-xl md:text-2xl text-magnolia-white/80 max-w-2xl mx-auto leading-relaxed">
            Transform your creativity into sustainable income with sacred tools, ancestral wisdom, and gentle
            productivity for chronic illness warriors.
          </p>
        </motion.div>

        {/* Rotating Affirmations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentAffirmation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-lora text-lg md:text-xl text-gold italic flex items-center gap-2"
              >
                <Sparkles size={20} className="text-sage-green" />
                {affirmations[currentAffirmation]}
                <Sparkles size={20} className="text-sage-green" />
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/blog"
            className="group bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Enter the Garden
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </Link>
          <Link
            href="/shop"
            className="group border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Explore Sacred Tools
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="font-lora text-magnolia-white/60 text-sm mb-2">Discover your sacred offerings</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown size={24} className="text-sage-green" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-1 h-1 bg-sage-green rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </section>
  )
}
