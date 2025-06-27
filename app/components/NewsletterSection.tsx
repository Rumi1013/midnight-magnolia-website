"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Sparkles } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-br from-midnight-blue to-midnight-blue/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-8">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">
              Receive Sacred
              <span className="text-gold"> Wisdom</span>
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Join our gentle community and receive weekly doses of healing wisdom, sacred rituals, and loving reminders
              delivered to your sanctuary.
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/50 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your sacred email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-magnolia-white/20 bg-magnolia-white/10 text-magnolia-white placeholder-magnolia-white/60 focus:border-sage-green focus:outline-none font-montserrat"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
                >
                  Join the Garden
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-sage-green/20 border border-sage-green/30 rounded-2xl p-6 max-w-md mx-auto"
            >
              <Sparkles className="w-8 h-8 text-sage-green mx-auto mb-3" />
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-2">Welcome to the Garden!</h3>
              <p className="font-lora text-magnolia-white/80">
                Your sacred wisdom will begin flowing to you soon. Thank you for joining our healing community.
              </p>
            </motion.div>
          )}

          <p className="font-montserrat text-sm text-magnolia-white/60 mt-6">
            We honor your inbox as sacred space. Unsubscribe anytime with love.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
