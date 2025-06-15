"use client"

import { motion } from "framer-motion"

export default function Newsletter() {
  return (
    <section className="section bg-midnight-blue">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl font-bold text-magnolia-white md:text-5xl">Join Our Sacred Circle</h2>
          <p className="mt-6 text-lg text-lavender-mist">
            Receive gentle wisdom, healing rituals, and updates on our latest offerings delivered to your inbox with
            love.
          </p>

          <form className="mt-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-full border border-magnolia-white/30 bg-transparent px-6 py-4 text-magnolia-white placeholder-magnolia-white/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
            <button type="submit" className="btn btn-primary">
              Join the Garden
            </button>
          </form>

          <p className="mt-4 text-sm text-magnolia-white/60">We respect your sacred space. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  )
}
