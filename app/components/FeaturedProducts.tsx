"use client"

import { motion } from "framer-motion"
import SacredCommerceSystem from "./SacredCommerceSystem"

export default function FeaturedProducts() {
  return (
    <section className="py-20 px-6 bg-midnight-blue relative overflow-hidden">
      {/* Sacred Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-sage-green rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-magnolia-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Sacred Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            <span className="font-montserrat text-gold text-sm font-semibold tracking-wider uppercase">
              Sacred Offerings
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-gold via-transparent to-transparent"></div>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">
            Featured Sacred Tools
          </h2>

          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            Handpicked healing resources designed to support your transformation journey with Southern Gothic grace and
            ancestral wisdom.
          </p>
        </motion.div>

        {/* Sacred Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SacredCommerceSystem featured={true} limit={6} />
        </motion.div>

        {/* Sacred Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/shop"
              className="bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Explore All Sacred Offerings
            </a>
            <a
              href="/about"
              className="bg-transparent border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Learn Our Sacred Story
            </a>
          </div>

          {/* Sacred Trust Elements */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-gold/20">
            <div className="flex items-center gap-2 text-magnolia-white/70">
              <span className="text-sage-green">🔒</span>
              <span className="font-montserrat text-sm">Sacred Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-magnolia-white/70">
              <span className="text-gold">⚡</span>
              <span className="font-montserrat text-sm">Instant Digital Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-magnolia-white/70">
              <span className="text-sage-green">💝</span>
              <span className="font-montserrat text-sm">Lifetime Access & Support</span>
            </div>
            <div className="flex items-center gap-2 text-magnolia-white/70">
              <span className="text-gold">🌙</span>
              <span className="font-montserrat text-sm">Healing-Centered Design</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sacred Floating Elements */}
      <div className="absolute top-20 right-10 opacity-20">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="w-16 h-16 border border-magnolia-white rounded-full flex items-center justify-center"
        >
          <span className="text-magnolia-white text-2xl">✨</span>
        </motion.div>
      </div>

      <div className="absolute bottom-32 left-16 opacity-20">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-12 h-12 border border-sage-green rounded-full flex items-center justify-center"
        >
          <span className="text-sage-green text-xl">🌸</span>
        </motion.div>
      </div>
    </section>
  )
}
