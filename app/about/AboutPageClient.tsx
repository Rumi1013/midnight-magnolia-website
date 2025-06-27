"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Users } from "lucide-react"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-midnight-blue to-sage-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-4xl md:text-6xl font-bold text-gold mb-6"
            >
              Our Sacred Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto"
            >
              Where Southern Gothic wisdom meets digital innovation, creating a sanctuary for healers, entrepreneurs,
              and seekers on their transformation journey.
            </motion.p>
          </div>

          {/* Founder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src="/founder-portrait.png"
                  alt="Latisha Vincent-Waters, Founder of Midnight Magnolia"
                  width={400}
                  height={500}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gold/90 text-midnight-blue p-4 rounded-2xl">
                  <p className="font-playfair text-lg font-bold">Latisha Vincent-Waters</p>
                  <p className="font-montserrat text-sm">Founder & Sacred Guide</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-playfair text-3xl font-bold text-magnolia-white mb-6">
                From Healing to Digital Sanctuary
              </h2>
              <div className="space-y-4 font-lora text-magnolia-white/80 leading-relaxed">
                <p>
                  Born from a deep calling to bridge ancestral wisdom with modern entrepreneurship, Midnight Magnolia
                  emerged as a digital sanctuary for those seeking transformation through authentic, healing-centered
                  business practices.
                </p>
                <p>
                  As a healer, coder, and creative entrepreneur, I understand the unique challenges faced by
                  neurodivergent individuals, chronic illness warriors, and spiritual entrepreneurs who want to build
                  sustainable income while honoring their authentic selves.
                </p>
                <p>
                  Our Southern Gothic approach honors the shadows and light within us all, creating space for genuine
                  transformation through gentle productivity, sacred rituals, and community support.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/blog"
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Read Our Musings
                </Link>
                <Link
                  href="/shop"
                  className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Explore Sacred Tools
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-magnolia-white/10 backdrop-blur-sm rounded-3xl p-8 border border-sage-green/20"
            >
              <Heart className="h-12 w-12 text-sage-green mb-4" />
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">Healing-Centered</h3>
              <p className="font-lora text-magnolia-white/80">
                Every product and service is designed with trauma-informed practices, honoring your pace and unique
                healing journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-magnolia-white/10 backdrop-blur-sm rounded-3xl p-8 border border-sage-green/20"
            >
              <Star className="h-12 w-12 text-gold mb-4" />
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">Ancestral Wisdom</h3>
              <p className="font-lora text-magnolia-white/80">
                We honor the wisdom of those who came before us, weaving traditional practices with modern digital
                innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-magnolia-white/10 backdrop-blur-sm rounded-3xl p-8 border border-sage-green/20"
            >
              <Users className="h-12 w-12 text-sage-green mb-4" />
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">Sacred Community</h3>
              <p className="font-lora text-magnolia-white/80">
                Building authentic connections and supporting each other's growth in a safe, inclusive digital
                sanctuary.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-sage-green/20 to-gold/20 rounded-3xl p-8 border border-gold/30"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-playfair text-4xl font-bold text-gold mb-2">500+</p>
                <p className="font-montserrat text-magnolia-white/80">Healing Souls Served</p>
              </div>
              <div>
                <p className="font-playfair text-4xl font-bold text-gold mb-2">50+</p>
                <p className="font-montserrat text-magnolia-white/80">Sacred Products</p>
              </div>
              <div>
                <p className="font-playfair text-4xl font-bold text-gold mb-2">24/7</p>
                <p className="font-montserrat text-magnolia-white/80">Gentle Support</p>
              </div>
              <div>
                <p className="font-playfair text-4xl font-bold text-gold mb-2">100%</p>
                <p className="font-montserrat text-magnolia-white/80">Healing-Centered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-6">
              Connect With Our Sacred Community
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8">
              Ready to begin your transformation journey? We're here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Get In Touch
              </Link>
              <Link
                href="/community"
                className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Join Our Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
