"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Sparkles, Heart } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-20 bg-sage-green">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={24} className="text-midnight-blue" />
              <Mail size={24} className="text-midnight-blue" />
              <Sparkles size={24} className="text-midnight-blue" />
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
              Join Our Sacred Circle
            </h2>

            <p className="font-lora text-lg text-midnight-blue/80 max-w-2xl mx-auto leading-relaxed">
              Receive gentle guidance, healing wisdom, and sacred tools delivered to your inbox. No overwhelm, just love
              and practical magic for your journey.
            </p>
          </div>

          {/* Newsletter Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your sacred email"
                  required
                  className="flex-1 px-4 py-3 rounded-full border-2 border-midnight-blue/20 focus:border-midnight-blue focus:outline-none font-lora text-midnight-blue placeholder-midnight-blue/60"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Joining..." : "Join Circle"}
                </button>
              </div>

              <p className="font-lora text-xs text-midnight-blue/60 mt-3">
                We honor your inbox. Unsubscribe anytime with love.
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-midnight-blue/10 rounded-2xl p-8">
                <Heart size={48} className="text-midnight-blue mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">Welcome to the Circle!</h3>
                <p className="font-lora text-midnight-blue/80">
                  Your sacred journey begins now. Check your inbox for a special welcome gift.
                </p>
              </div>
            </motion.div>
          )}

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-8 text-midnight-blue/60"
          >
            <div className="text-center">
              <div className="font-playfair text-lg font-bold text-midnight-blue">500+</div>
              <div className="font-lora text-xs">Sacred Souls</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-lg font-bold text-midnight-blue">Weekly</div>
              <div className="font-lora text-xs">Gentle Wisdom</div>
            </div>
            <div className="text-center">
              <div className="font-playfair text-lg font-bold text-midnight-blue">No Spam</div>
              <div className="font-lora text-xs">Only Love</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
