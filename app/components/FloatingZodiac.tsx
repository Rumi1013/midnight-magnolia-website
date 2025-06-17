"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const zodiacSigns = [
  { symbol: "♈", name: "Aries", x: 15, y: 20 },
  { symbol: "♉", name: "Taurus", x: 80, y: 30 },
  { symbol: "♊", name: "Gemini", x: 25, y: 65 },
  { symbol: "♋", name: "Cancer", x: 70, y: 75 },
  { symbol: "♌", name: "Leo", x: 10, y: 80 },
  { symbol: "♍", name: "Virgo", x: 85, y: 15 },
]

const moonPhases = [
  { symbol: "🌙", name: "CrescentMoon", x: 20, y: 40 },
  { symbol: "🌕", name: "FullMoon", x: 75, y: 50 },
]

const magnoliaElements = [
  { symbol: "🌸", name: "Petal1", x: 40, y: 25 },
  { symbol: "🌸", name: "Petal2", x: 60, y: 70 },
]

interface FloatingZodiacProps {
  fullPage?: boolean
}

export default function FloatingZodiac({ fullPage = false }: FloatingZodiacProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Only add a few more elements for full page, not overwhelming
  const allSigns = fullPage ? [...zodiacSigns, { symbol: "♎", name: "Libra", x: 50, y: 85 }] : zodiacSigns.slice(0, 4)

  const allMoons = fullPage ? moonPhases : [moonPhases[0]]
  const allPetals = fullPage ? magnoliaElements : [magnoliaElements[0]]

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${fullPage ? "h-full" : ""}`}>
      {/* Zodiac Signs - Subtle */}
      {allSigns.map((sign, index) => (
        <motion.div
          key={`zodiac-${sign.name}`}
          className="absolute text-sage-green/40 text-2xl font-playfair pointer-events-none select-none"
          style={{
            left: `${sign.x}%`,
            top: `${sign.y}%`,
          }}
          animate={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 20 + index * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 2,
          }}
        >
          {sign.symbol}
        </motion.div>
      ))}

      {/* Moon Phases - Very Subtle */}
      {allMoons.map((moon, index) => (
        <motion.div
          key={`moon-${moon.name}`}
          className="absolute text-magnolia-white/30 text-xl pointer-events-none select-none"
          style={{
            left: `${moon.x}%`,
            top: `${moon.y}%`,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 5,
          }}
        >
          {moon.symbol}
        </motion.div>
      ))}

      {/* Magnolia Petals - Gentle */}
      {allPetals.map((petal, index) => (
        <motion.div
          key={`petal-${petal.name}`}
          className="absolute text-warm-gray/25 text-lg pointer-events-none select-none"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.25, 0.4, 0.25],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 8,
          }}
        >
          {petal.symbol}
        </motion.div>
      ))}
    </div>
  )
}
