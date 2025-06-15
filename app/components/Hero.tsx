"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="text-center text-magnolia-white">
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-magnolia-white/10 rounded-full mx-auto mb-8"></div>
            <div className="h-16 bg-magnolia-white/10 rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-8 bg-magnolia-white/10 rounded mb-8 max-w-lg mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen bg-midnight-blue overflow-hidden flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-green/10 via-transparent to-lavender-mist/5"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 text-4xl opacity-60 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          🌙
        </div>
        <div
          className="absolute top-40 right-32 text-3xl opacity-50 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-32 left-16 text-3xl opacity-40 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        >
          🌿
        </div>
        <div
          className="absolute bottom-20 right-20 text-2xl opacity-60 animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        >
          🕯️
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-magnolia-white/20 to-gold/20 flex items-center justify-center backdrop-blur-sm border border-magnolia-white/30">
              <span className="text-6xl">🌸</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className="text-sage-green font-montserrat text-sm tracking-[0.2em] uppercase font-medium">
              Welcome to your digital sanctuary
            </p>

            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-magnolia-white leading-tight">
              Midnight
              <br />
              <span className="text-gold">Magnolia</span>
            </h1>

            <p className="font-lora text-xl md:text-2xl text-magnolia-white/90 leading-relaxed max-w-3xl mx-auto">
              Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
              productivity, sacred rituals, and transformative digital tools.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[56px] text-lg">
                Enter the Garden
              </button>
              <button className="border-2 border-magnolia-white/30 hover:border-gold text-magnolia-white hover:text-gold font-montserrat font-semibold px-10 py-5 rounded-full transition-all duration-300 min-h-[56px] text-lg">
                Explore Sacred Tools
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 pt-12 flex-wrap">
              <div className="text-center">
                <p className="text-gold font-playfair text-3xl font-bold">500+</p>
                <p className="text-magnolia-white/60 font-montserrat text-sm">Healing souls</p>
              </div>
              <div className="w-px h-16 bg-magnolia-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-gold font-playfair text-3xl font-bold">78</p>
                <p className="text-magnolia-white/60 font-montserrat text-sm">Tarot cards</p>
              </div>
              <div className="w-px h-16 bg-magnolia-white/20 hidden sm:block"></div>
              <div className="text-center">
                <p className="text-gold font-playfair text-3xl font-bold">24/7</p>
                <p className="text-magnolia-white/60 font-montserrat text-sm">Gentle support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-magnolia-white/60 font-montserrat text-sm mb-2">Begin your journey</p>
        <div className="w-6 h-10 border-2 border-magnolia-white/30 rounded-full mx-auto flex justify-center">
          <div className="w-1 h-3 bg-magnolia-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
