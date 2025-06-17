"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const zodiacSigns = [
  { symbol: "♈", name: "Aries", x: 10, y: 15 },
  { symbol: "♉", name: "Taurus", x: 85, y: 25 },
  { symbol: "♊", name: "Gemini", x: 20, y: 60 },
  { symbol: "♋", name: "Cancer", x: 75, y: 70 },
  { symbol: "♌", name: "Leo", x: 5, y: 85 },
  { symbol: "♍", name: "Virgo", x: 90, y: 80 },
  { symbol: "♎", name: "Libra", x: 15, y: 40 },
  { symbol: "♏", name: "Scorpio", x: 80, y: 45 },
  { symbol: "♐", name: "Sagittarius", x: 25, y: 20 },
  { symbol: "♑", name: "Capricorn", x: 70, y: 10 },
  { symbol: "♒", name: "Aquarius", x: 45, y: 75 },
  { symbol: "♓", name: "Pisces", x: 60, y: 35 },
]

const moonPhases = [
  { symbol: "🌑", name: "NewMoon", x: 15, y: 25 },
  { symbol: "🌒", name: "WaxingCrescent", x: 75, y: 15 },
  { symbol: "🌓", name: "FirstQuarter", x: 25, y: 70 },
  { symbol: "🌔", name: "WaxingGibbous", x: 85, y: 60 },
  { symbol: "🌕", name: "FullMoon", x: 10, y: 50 },
  { symbol: "🌖", name: "WaningGibbous", x: 90, y: 35 },
  { symbol: "🌗", name: "LastQuarter", x: 35, y: 85 },
  { symbol: "🌘", name: "WaningCrescent", x: 65, y: 20 },
]

const magnoliaElements = [
  { symbol: "🌸", name: "Petal1", x: 30, y: 40 },
  { symbol: "🌺", name: "Petal2", x: 70, y: 55 },
  { symbol: "🌸", name: "Petal3", x: 20, y: 80 },
  { symbol: "🌺", name: "Petal4", x: 80, y: 25 },
  { symbol: "🌸", name: "Petal5", x: 50, y: 65 },
  { symbol: "🌺", name: "Petal6", x: 15, y: 35 },
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

  // Generate additional signs for full page coverage
  const allSigns = fullPage
    ? [
        ...zodiacSigns,
        { symbol: "♈", name: "Aries2", x: 30, y: 90 },
        { symbol: "♉", name: "Taurus2", x: 95, y: 55 },
        { symbol: "♊", name: "Gemini2", x: 8, y: 30 },
        { symbol: "♋", name: "Cancer2", x: 65, y: 85 },
      ]
    : zodiacSigns

  const allMoons = fullPage
    ? [...moonPhases, ...moonPhases.map((m) => ({ ...m, name: m.name + "2", x: m.x + 10, y: m.y + 15 }))]
    : moonPhases
  const allPetals = fullPage
    ? [...magnoliaElements, ...magnoliaElements.map((p) => ({ ...p, name: p.name + "2", x: p.x + 15, y: p.y + 20 }))]
    : magnoliaElements

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${fullPage ? "h-full" : ""}`}>
      {/* Zodiac Signs */}
      {allSigns.map((sign, index) => (
        <motion.div
          key={`zodiac-${sign.name}-${index}`}
          className="absolute text-sage-green/80 text-3xl font-playfair pointer-events-none select-none"
          style={{
            left: `${sign.x}%`,
            top: `${sign.y}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: 0,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.8, 1, 0.6, 0.8],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 12 + index * 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        >
          {sign.symbol}
        </motion.div>
      ))}

      {/* Moon Phases */}
      {allMoons.map((moon, index) => (
        <motion.div
          key={`moon-${moon.name}-${index}`}
          className="absolute text-magnolia-white/70 text-2xl pointer-events-none select-none"
          style={{
            left: `${moon.x}%`,
            top: `${moon.y}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0.3,
          }}
          animate={{
            x: [0, -15, 25, 0],
            y: [0, 20, -10, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.7, 0.9, 0.5, 0.7],
            scale: [0.8, 1.1, 0.9, 0.8],
          }}
          transition={{
            duration: 18 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 1.2,
          }}
        >
          {moon.symbol}
        </motion.div>
      ))}

      {/* Magnolia Petals */}
      {allPetals.map((petal, index) => (
        <motion.div
          key={`petal-${petal.name}-${index}`}
          className="absolute text-warm-gray/60 text-xl pointer-events-none select-none"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0.2,
            rotate: 0,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            rotate: [0, 180, -90, 0],
            opacity: [0.6, 0.8, 0.4, 0.6],
            scale: [0.7, 1.3, 0.5, 0.7],
          }}
          transition={{
            duration: 15 + index * 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.6,
          }}
        >
          {petal.symbol}
        </motion.div>
      ))}

      {/* Additional mystical elements */}
      <motion.div
        className="absolute top-1/4 left-1/3 text-gold/70 text-4xl font-playfair pointer-events-none select-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.4, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute top-2/3 right-1/4 text-sage-green/60 text-3xl font-playfair pointer-events-none select-none"
        animate={{
          y: [0, -40, 0],
          x: [0, 25, 0],
          opacity: [0.6, 0.9, 0.6],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 16,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        ◊
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/6 text-magnolia-white/80 text-5xl font-playfair pointer-events-none select-none"
        animate={{
          rotate: [0, -360],
          scale: [0.8, 1.6, 0.8],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      >
        ☾
      </motion.div>
    </div>
  )
}
