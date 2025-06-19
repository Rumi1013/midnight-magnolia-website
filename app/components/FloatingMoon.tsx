"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function FloatingMoon() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-20 right-8 z-50 text-4xl cursor-pointer"
      animate={{
        rotate: [0, 360],
        y: [-5, 5, -5],
      }}
      transition={{
        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.2 }}
      title="Your guiding moon"
    >
      🌙
    </motion.div>
  )
}
