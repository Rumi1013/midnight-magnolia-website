"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail("")
  }

  return (
    <section id="newsletter" className="section bg-midnight-indigo">
      <div className="container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">
            Receive More Healing Words
          </h2>
          <p className="font-lora text-lg text-lavender-mist mb-8 leading-relaxed">
            Join our sacred circle and receive gentle wisdom, ritual guides, and early access to our healing tools.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full border border-magnolia-white/30 bg-transparent text-magnolia-white placeholder-magnolia-white/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap" disabled={isSubmitted}>
              {isSubmitted ? "Welcome! 🌸" : "Join the Garden"}
            </button>
          </form>

          {isSubmitted && (
            <motion.p
              className="mt-4 font-lora text-sage-green"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Thank you for joining our sacred circle! 🌙
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
