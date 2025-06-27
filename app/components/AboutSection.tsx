"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Leaf, Moon } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-20 bg-magnolia-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Where Healing
              <span className="text-sage-green"> Begins</span>
            </h2>

            <p className="font-lora text-lg text-midnight-blue/80 mb-6 leading-relaxed">
              Born from the intersection of ancestral wisdom and modern wellness, Midnight Magnolia is more than a
              brand—it's a sacred sanctuary for those seeking gentle transformation.
            </p>

            <p className="font-lora text-lg text-midnight-blue/80 mb-8 leading-relaxed">
              We understand the unique challenges of living with chronic illness, ADHD, and the beautiful complexity of
              neurodivergent minds. Our tools and rituals honor your pace, celebrate your journey, and nurture your
              soul.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Heart className="w-8 h-8 text-sage-green mx-auto mb-2" />
                <h3 className="font-montserrat font-semibold text-midnight-blue mb-1">Gentle Care</h3>
                <p className="font-lora text-sm text-midnight-blue/70">Honoring your energy</p>
              </div>
              <div className="text-center">
                <Leaf className="w-8 h-8 text-sage-green mx-auto mb-2" />
                <h3 className="font-montserrat font-semibold text-midnight-blue mb-1">Natural Wisdom</h3>
                <p className="font-lora text-sm text-midnight-blue/70">Ancestral knowledge</p>
              </div>
              <div className="text-center">
                <Moon className="w-8 h-8 text-sage-green mx-auto mb-2" />
                <h3 className="font-montserrat font-semibold text-midnight-blue mb-1">Sacred Rituals</h3>
                <p className="font-lora text-sm text-midnight-blue/70">Meaningful practices</p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-block bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Discover Our Story
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-sage-green/20 to-midnight-blue/20 p-8 flex items-center justify-center">
              <div className="text-center">
                <Moon className="w-24 h-24 text-sage-green mx-auto mb-4" />
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">Sacred Sanctuary</h3>
                <p className="font-lora text-midnight-blue/70">
                  A space for healing, growth, and gentle transformation
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
