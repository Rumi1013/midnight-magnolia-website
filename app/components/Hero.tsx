"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const AFFIRMATIONS = ["You are worthy of rest", "Your pace is sacred", "Healing is not linear", "You belong here"]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    setMounted(true)

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Handle affirmation rotation
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length)
    }, 4000)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!mounted) {
    return <HeroSkeleton />
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-midnight-blue to-midnight-indigo">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-green/10 via-transparent to-lavender-mist/5" />
        <FloatingElements windowSize={windowSize} />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 flex min-h-screen items-center justify-center py-20">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-magnolia-white/30 bg-gradient-to-br from-magnolia-white/20 to-gold/20 backdrop-blur-sm">
              <span className="text-6xl drop-shadow-lg">🌸</span>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.p
              className="font-montserrat text-sm font-medium uppercase tracking-[0.2em] text-sage-green"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Welcome to your digital sanctuary
            </motion.p>

            <motion.h1
              className="font-playfair text-5xl font-bold leading-tight text-magnolia-white md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Midnight
              <br />
              <span className="text-gold">Magnolia</span>
            </motion.h1>

            {/* Rotating Affirmations */}
            <div className="flex h-16 items-center justify-center">
              <motion.p
                key={currentAffirmation}
                className="font-playfair text-xl italic text-lavender-mist md:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                "{AFFIRMATIONS[currentAffirmation]}"
              </motion.p>
            </div>

            <motion.p
              className="mx-auto max-w-3xl text-xl leading-relaxed text-magnolia-white/90 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
              productivity, sacred rituals, and transformative digital tools.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col justify-center gap-6 pt-12 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button
              className="btn btn-primary text-lg"
              onClick={() => {
                const aboutSection = document.getElementById("about")
                aboutSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Enter the Garden
            </button>
            <button
              className="btn btn-secondary text-lg"
              onClick={() => {
                const productsSection = document.getElementById("products")
                productsSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore Sacred Tools
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {[
              { number: "500+", label: "Healing souls" },
              { number: "78", label: "Tarot cards" },
              { number: "24/7", label: "Gentle support" },
            ].map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-gold drop-shadow-sm">{stat.number}</div>
                  <div className="font-montserrat text-sm uppercase tracking-wide text-magnolia-white/60">
                    {stat.label}
                  </div>
                </div>
                {index < 2 && <div className="ml-8 hidden h-16 w-px bg-magnolia-white/20 sm:block" />}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}

interface FloatingElementsProps {
  windowSize: { width: number; height: number }
}

function FloatingElements({ windowSize }: FloatingElementsProps) {
  const elements = ["🌙", "✨", "🌿", "🕯️"]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-60"
          initial={{
            x: Math.random() * windowSize.width,
            y: windowSize.height + 50,
            rotate: 0,
          }}
          animate={{
            y: -50,
            x: Math.random() * windowSize.width + (Math.random() - 0.5) * 200,
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: index * 2,
          }}
          style={{
            filter: "drop-shadow(0 0 10px rgba(250, 243, 224, 0.3))",
          }}
        >
          {element}
        </motion.div>
      ))}
    </div>
  )
}

function ScrollIndicator() {
  const handleScrollClick = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      onClick={handleScrollClick}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="text-magnolia-white/60"
      >
        <p className="font-montserrat text-sm mb-2">Begin your journey</p>
        <div className="mx-auto flex h-10 w-6 justify-center rounded-full border-2 border-magnolia-white/30">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-magnolia-white/60" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeroSkeleton() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-midnight-blue">
      <div className="text-center text-magnolia-white">
        <div className="animate-pulse">
          <div className="mx-auto mb-8 h-32 w-32 rounded-full bg-magnolia-white/10" />
          <div className="mx-auto mb-4 h-16 max-w-md rounded bg-magnolia-white/10" />
          <div className="mx-auto mb-8 h-8 max-w-lg rounded bg-magnolia-white/10" />
        </div>
      </div>
    </section>
  )
}
