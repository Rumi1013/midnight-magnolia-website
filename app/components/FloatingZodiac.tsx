"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]

export default function FloatingZodiac() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {zodiacSigns.map((sign, i) => (
        <motion.div
          key={i}
          className="absolute text-magnolia-white/5 text-3xl"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        >
          {sign}
        </motion.div>
      ))}
    </div>
  )
}
