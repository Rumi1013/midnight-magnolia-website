"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import SacredCommerceSystem from "./SacredCommerceSystem"

export default function FeaturedProducts() {
  return (
    <section className="py-20 px-6 bg-midnight-blue">
      <div className="max-w-7xl mx-auto">
        {/* Sacred Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-gold" size={24} />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white">Sacred Offerings</h2>
            <Sparkles className="text-gold" size={24} />
          </div>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto leading-relaxed">
            Transform your healing journey with our curated collection of digital tools, journals, and sacred resources
            designed for gentle productivity and ancestral wisdom.
          </p>
        </motion.div>

        {/* Featured Products Grid */}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg group"
          >
            Explore All Sacred Offerings
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
