"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Sparkles, Heart } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  return (
    <section className="py-20 bg-midnight-blue relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-10 left-10 text-gold/20"
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 text-sage-green/20"
        >
          <Heart size={28} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-sage-green/20 p-4 rounded-full">
              <Mail className="h-8 w-8 text-sage-green" />
            </div>
          </div>

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-magnolia-white mb-6">
            Join Our Sacred
            <span className="block text-gold">Circle</span>
          </h2>

          <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
            Receive gentle wisdom, sacred tools, and healing practices delivered to your inbox with Southern Gothic
            grace
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your sacred email..."
                  required
                  className="flex-1 px-6 py-4 rounded-full border-2 border-sage-green/30 bg-magnolia-white/10 backdrop-blur-sm text-magnolia-white placeholder-magnolia-white/60 focus:outline-none focus:border-sage-green focus:bg-magnolia-white/20 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap"
                >
                  Join the Circle
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-sage-green/20 backdrop-blur-sm border border-sage-green/30 rounded-2xl p-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-sage-green" />
                <span className="font-montserrat font-semibold text-sage-green">Welcome to the Circle!</span>
              </div>
              <p className="font-lora text-magnolia-white/80 text-sm">
                Your sacred journey begins now. Check your inbox for a special welcome gift.
              </p>
            </motion.div>
          )}

          <p className="font-lora text-magnolia-white/60 text-sm mt-6">
            ✨ No spam, only sacred wisdom • Unsubscribe anytime with grace
          </p>
        </motion.div>
      </div>
    </section>
  )
}
