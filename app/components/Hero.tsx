"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "./Hero.module.css"

const AFFIRMATIONS = ["You are worthy of rest", "Your pace is sacred", "Healing is not linear", "You belong here"]

interface HeroProps {
  className?: string
}

export default function Hero({ className = "" }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return <HeroSkeleton />
  }

  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.backgroundOverlay} />
      <FloatingElements />

      <div className="container">
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LogoSection />
          <TextSection currentAffirmation={currentAffirmation} />
          <ActionButtons />
          <StatsSection />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

function LogoSection() {
  return (
    <motion.div
      className={styles.logoContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.logoCircle}>
        <span className={styles.logoIcon}>🌸</span>
      </div>
    </motion.div>
  )
}

interface TextSectionProps {
  currentAffirmation: number
}

function TextSection({ currentAffirmation }: TextSectionProps) {
  return (
    <div className={styles.heroText}>
      <motion.p
        className={styles.heroSubtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to your digital sanctuary
      </motion.p>

      <motion.h1
        className={styles.heroTitle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Midnight
        <br />
        <span className={styles.heroTitleGold}>Magnolia</span>
      </motion.h1>

      <div className={styles.affirmationContainer}>
        <p className={styles.affirmation} key={currentAffirmation}>
          "{AFFIRMATIONS[currentAffirmation]}"
        </p>
      </div>

      <motion.p
        className={styles.heroDescription}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle productivity,
        sacred rituals, and transformative digital tools.
      </motion.p>
    </div>
  )
}

function ActionButtons() {
  return (
    <motion.div
      className={styles.heroActions}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <button className={`btn btn-primary ${styles.btnLarge}`}>Enter the Garden</button>
      <button className={`btn btn-secondary ${styles.btnLarge}`}>Explore Sacred Tools</button>
    </motion.div>
  )
}

function StatsSection() {
  const stats = [
    { number: "500+", label: "Healing souls" },
    { number: "78", label: "Tarot cards" },
    { number: "24/7", label: "Gentle support" },
  ]

  return (
    <motion.div
      className={styles.heroStats}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      {stats.map((stat, index) => (
        <div key={index}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
          {index < stats.length - 1 && <div className={styles.statDivider} />}
        </div>
      ))}
    </motion.div>
  )
}

function FloatingElements() {
  const elements = ["🌙", "✨", "🌿", "🕯️"]

  return (
    <div className={styles.floatingElements}>
      {elements.map((element, index) => (
        <div key={index} className={styles.floatingElement}>
          {element}
        </div>
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div className={styles.scrollIndicator}>
      <p>Begin your journey</p>
      <div className={styles.scrollMouse}>
        <div className={styles.scrollDot} />
      </div>
    </div>
  )
}

function HeroSkeleton() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-midnight-blue">
      <div className="text-center text-magnolia-white">
        <div className="animate-pulse">
          <div className="mx-auto mb-8 h-32 w-32 rounded-full bg-magnolia-white/10"></div>
          <div className="mx-auto mb-4 h-16 max-w-md rounded bg-magnolia-white/10"></div>
          <div className="mx-auto mb-8 h-8 max-w-lg rounded bg-magnolia-white/10"></div>
        </div>
      </div>
    </section>
  )
}
