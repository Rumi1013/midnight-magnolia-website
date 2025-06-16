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

function FloatingZodiac({ fullPage = false }: FloatingZodiacProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

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
          className="absolute text-sage-green opacity-30 text-2xl font-playfair pointer-events-none"
          style={{
            left: `${sign.x}%`,
            top: `${sign.y}%`,
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.5, 0.2, 0.3],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          {sign.symbol}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingZodiac
