"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="min-h-screen bg-midnight-blue text-magnolia-white relative overflow-hidden flex items-center">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 text-gold/30 text-4xl animate-pulse">🌙</div>
        <div className="absolute bottom-20 left-20 text-sage-green/30 text-3xl animate-pulse">✨</div>
        <div className="absolute top-1/2 right-10 text-gold/20 text-2xl animate-pulse">🌸</div>
        <div className="absolute bottom-40 right-1/3 text-sage-green/20 text-2xl animate-pulse">🕊️</div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="relative w-20 h-20 overflow-hidden rounded-full">
              <Image src="/images/logo-minimal.jpg" alt="Midnight Magnolia" fill className="object-cover" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-montserrat text-sage-green text-sm uppercase tracking-wider"
          >
            Welcome to Your Digital Sanctuary
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-playfair text-5xl lg:text-7xl font-bold leading-tight"
          >
            Midnight <span className="text-gold">Magnolia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-lora text-xl lg:text-2xl text-magnolia-white/80 leading-relaxed max-w-2xl"
          >
            Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
            productivity, sacred rituals, and transformative digital tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full text-lg min-h-[56px]">
              Enter the Garden
            </Button>
            <Button
              variant="outline"
              className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full text-lg min-h-[56px]"
            >
              Explore Sacred Tools
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full border-2 border-sage-green/30 animate-spin-slow"></div>

            {/* Middle ring */}
            <div className="absolute inset-8 rounded-full border border-gold/40 animate-spin-reverse"></div>

            {/* Inner circle with logo */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-sage-green/20 to-gold/20 backdrop-blur-sm flex items-center justify-center">
              <div className="relative w-32 h-32 overflow-hidden rounded-full">
                <Image src="/images/logo-minimal.jpg" alt="Midnight Magnolia Logo" fill className="object-cover" />
              </div>
            </div>

            {/* Floating elements around the circle */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce">🌙</div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce delay-1000">
              🌸
            </div>
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-2xl animate-bounce delay-500">
              ✨
            </div>
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl animate-bounce delay-1500">
              🕊️
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
