"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Moon } from "lucide-react"

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
            <div className="flex items-center gap-2 mb-6">
              <Moon size={24} className="text-sage-green" />
              <span className="font-montserrat text-sage-green font-semibold uppercase tracking-wide text-sm">
                About Midnight Magnolia
              </span>
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
              Your Sacred Journey to
              <span className="text-sage-green block">Healing & Abundance</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-lora text-midnight-blue/80 leading-relaxed">
                Born from the intersection of Southern Gothic mysticism and modern healing wisdom, Midnight Magnolia is
                more than a brand—it's a digital sanctuary for souls seeking transformation through ancestral knowledge
                and gentle productivity.
              </p>

              <p className="font-lora text-midnight-blue/80 leading-relaxed">
                We understand the unique challenges faced by chronic illness warriors, neurodivergent entrepreneurs, and
                sensitive souls building businesses that honor their energy and values. Our sacred tools are designed
                with deep compassion for your journey.
              </p>

              <p className="font-lora text-midnight-blue/80 leading-relaxed">
                Every digital product, every piece of guidance, every moment of connection is infused with the
                understanding that healing is not linear, rest is productive, and your pace is sacred.
              </p>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <div className="font-playfair text-2xl font-bold text-midnight-blue">500+</div>
                <div className="font-lora text-midnight-blue/60 text-sm">Healing Souls</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-2xl font-bold text-midnight-blue">50+</div>
                <div className="font-lora text-midnight-blue/60 text-sm">Sacred Tools</div>
              </div>
              <div className="text-center">
                <div className="font-playfair text-2xl font-bold text-midnight-blue">4.9</div>
                <div className="font-lora text-midnight-blue/60 text-sm flex items-center gap-1">
                  <Star size={12} className="fill-gold text-gold" />
                  Rating
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              <Heart size={18} />
              Learn Our Story
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
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=500&text=Founder+Portrait"
                alt="Midnight Magnolia founder in sacred space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Overlay with quote */}
              <div className="absolute inset-0 bg-midnight-blue/60 flex items-end">
                <div className="p-8">
                  <blockquote className="font-lora text-magnolia-white italic text-lg leading-relaxed">
                    "Your sensitivity is not a weakness—it's your superpower. Let's build something beautiful together."
                  </blockquote>
                  <cite className="font-montserrat text-sage-green font-semibold text-sm mt-2 block">
                    — Founder, Midnight Magnolia
                  </cite>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-sage-green rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-gold rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
