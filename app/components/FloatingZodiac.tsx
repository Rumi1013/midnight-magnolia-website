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
]

export default function FloatingZodiac() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {zodiacSigns.map((sign, index) => (
        <motion.div
          key={sign.name}
          className="absolute text-sage-green opacity-20 text-2xl font-playfair pointer-events-none"
          style={{
            left: `${sign.x}%`,
            top: `${sign.y}%`,
          }}
          animate={{
            x: [0, 10, -5, 0],
            y: [0, -8, 5, 0],
            rotate: [0, 3, -3, 0],
            opacity: [0.2, 0.3, 0.1, 0.2],
          }}
          transition={{
            duration: 12 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        >
          {sign.symbol}
        </motion.div>
      ))}
    </div>
  )
}
