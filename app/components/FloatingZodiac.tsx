"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingZodiacProps {
  fullPage?: boolean
}

const zodiacSigns = [
  { symbol: "♈", name: "Aries" },
  { symbol: "♉", name: "Taurus" },
  { symbol: "♊", name: "Gemini" },
  { symbol: "♋", name: "Cancer" },
  { symbol: "♌", name: "Leo" },
  { symbol: "♍", name: "Virgo" },
  { symbol: "♎", name: "Libra" },
  { symbol: "♏", name: "Scorpio" },
  { symbol: "♐", name: "Sagittarius" },
  { symbol: "♑", name: "Capricorn" },
  { symbol: "♒", name: "Aquarius" },
  { symbol: "♓", name: "Pisces" },
]

export default function FloatingZodiac({ fullPage = false }: FloatingZodiacProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const signsToShow = fullPage ? zodiacSigns : zodiacSigns.slice(0, 6)

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {signsToShow.map((sign, index) => (
        <motion.div
          key={sign.name}
          className="absolute text-magnolia-white/10 text-2xl font-serif select-none"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            ],
            y: [
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            ],
            opacity: [0, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: index * 2,
          }}
        >
          {sign.symbol}
        </motion.div>
      ))}
    </div>
  )
}
