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
      className="fixed top-[10%] right-[5%] w-20 h-20 rounded-full -z-10 pointer-events-none"
      style={{
        boxShadow: `0 0 40px 10px ${theme === "dark" ? "#FAF3E0" : "#A3B18A"}30`,
        background: `radial-gradient(circle, ${theme === "dark" ? "#FAF3E0" : "#f0e6d2"} 20%, transparent 70%)`,
      }}
      animate={{
        y: [0, -25, 0],
        x: [0, 15, 0],
      }}
      transition={{
        duration: 25,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        repeatType: "mirror",
      }}
    />
  )
}
