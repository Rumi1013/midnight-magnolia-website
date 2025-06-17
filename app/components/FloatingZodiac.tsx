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
        // Additional signs for full page coverage
        { symbol: "♈", name: "Aries2", x: 30, y: 90 },
        { symbol: "♉", name: "Taurus2", x: 95, y: 55 },
        { symbol: "♊", name: "Gemini2", x: 8, y: 30 },
        { symbol: "♋", name: "Cancer2", x: 65, y: 85 },
        { symbol: "♌", name: "Leo2", x: 40, y: 5 },
        { symbol: "♍", name: "Virgo2", x: 88, y: 15 },
        { symbol: "♎", name: "Libra2", x: 12, y: 65 },
        { symbol: "♏", name: "Scorpio2", x: 78, y: 95 },
        { symbol: "♐", name: "Sagittarius2", x: 55, y: 50 },
        { symbol: "♑", name: "Capricorn2", x: 35, y: 25 },
        { symbol: "♒", name: "Aquarius2", x: 85, y: 65 },
        { symbol: "♓", name: "Pisces2", x: 18, y: 80 },
      ]
    : zodiacSigns

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${fullPage ? "h-full" : ""}`}>
      {allSigns.map((sign, index) => (
        <motion.div
          key={`${sign.name}-${index}`}
          className="absolute text-sage-green/60 text-3xl font-playfair pointer-events-none select-none"
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
            opacity: [0.6, 0.9, 0.4, 0.6],
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

      {/* Additional floating elements for ambiance */}
      <motion.div
        className="absolute top-1/4 left-1/3 text-gold/40 text-4xl font-playfair pointer-events-none select-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
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
        className="absolute top-2/3 right-1/4 text-warm-gray/50 text-2xl font-playfair pointer-events-none select-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        ◊
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/6 text-sage-green/30 text-5xl font-playfair pointer-events-none select-none"
        animate={{
          rotate: [0, -360],
          scale: [0.8, 1.5, 0.8],
          opacity: [0.3, 0.6, 0.3],
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
