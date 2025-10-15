"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const AFFIRMATIONS = ["You are worthy of rest", "Your pace is sacred", "Healing is not linear", "You belong here"]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <HeroSkeleton />
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-midnight-blue to-midnight-indigo">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-green/10 via-transparent to-lavender-mist/5" />
        <FloatingElements />
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
              className="mx-auto max-w-3xl font-lora text-xl leading-relaxed text-magnolia-white/90 md:text-2xl"
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

function FloatingElements() {
  const elements = ["🌙", "✨", "🌿", "🕯️"]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-60"
          initial={{
            x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
            y: typeof window !== "undefined" ? window.innerHeight + 50 : 0,
            rotate: 0,
          }}
          animate={{
            y: -50,
            x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0,
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

"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

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
    <section className="relative min-h-screen bg-midnight-blue overflow-hidden flex items-center justify-center">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-green/20 to-transparent" />
      </div>

      {/* Floating magnolia petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-8 bg-gradient-to-b from-magnolia-white/30 to-magnolia-white/10 rounded-full transform scale-y-125"
            style={{
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
            initial={{
              x: Math.random() * windowSize.width,
              y: -20,
              rotate: 0,
            }}
            animate={{
              y: windowSize.height + 20,
              rotate: 360,
              x: Math.random() * windowSize.width + (Math.random() - 0.5) * 200,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-5 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto backdrop-blur-[1px]">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start mb-8"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="/images/logo-main.jpg"
                  alt="Midnight Magnolia - A Southern Gothic Digital Sanctuary"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sage-green font-montserrat text-base tracking-[0.2em] uppercase font-medium"
              >
                Welcome to your digital sanctuary
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-playfair text-6xl lg:text-8xl font-bold text-magnolia-white leading-[0.9]"
              >
                Midnight
                <br />
                <span className="text-gold">Magnolia</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-lora text-xl lg:text-2xl text-magnolia-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
                productivity, sacred rituals, and transformative digital tools.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[56px] text-lg">
                Enter the Garden
              </button>
              <button className="border-2 border-magnolia-white/30 hover:border-gold text-magnolia-white hover:text-gold font-montserrat font-semibold px-10 py-5 rounded-full transition-all duration-300 min-h-[56px] text-lg">
                Explore Sacred Tools
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8"
            >
              <div className="text-center">
                <p className="text-gold font-playfair text-3xl font-bold">500+</p>
                <p className="text-magnolia-white/60 font-montserrat text-sm">Healing souls</p>
              </div>
              <div className="w-px h-16 bg-magnolia-white/20" />
              <div className="text-center">
                <p className="text-gold font-playfair text-3xl font-bold">78</p>
                <p className="text-magnolia-white/60 font-montserrat text-sm">Tarot cards</p>
              </div>
              <div className="w-px h-16 bg-magnolia-white/20" />
              <div className="text-center">
                <p className="text-gold font-playfair text-3xl font-bold">24/7</p>
                <p className="text-magnolia-white/60 font-montserrat text-sm">Gentle support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Mystical illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[600px] h-[600px] flex items-center justify-center">
              {/* Central logo with mystical elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-80 h-80 flex items-center justify-center font-bold rounded-full border-4 border-dotted border-transparent shadow-xl opacity-100">
                  <div className="w-60 h-60 rounded-full border border-sage-green/40 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border-2 border-sage-green/20 blur-sm"></div>
                    <div className="absolute inset-1 rounded-full border border-sage-green/30 blur-[2px]"></div>
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-magnolia-white/20 to-gold/20 flex items-center justify-center backdrop-blur-sm">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <Image
                          src="/images/logo-circular.jpg"
                          alt="Midnight Magnolia Sacred Symbol"
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-16 right-16 text-5xl"
              >
                🌙
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 left-16 text-4xl"
              >
                ✨
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-32 left-8 text-3xl"
              >
                🕯️
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-32 right-8 text-3xl"
              >
                🌿
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-magnolia-white/60 text-center"
        >
          <p className="font-montserrat text-sm mb-2">Begin your journey</p>
          <div className="w-6 h-10 border-2 border-magnolia-white/30 rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-magnolia-white/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
