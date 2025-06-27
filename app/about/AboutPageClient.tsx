"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, Leaf, Moon, Star, Sparkles, BookOpen } from "lucide-react"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-magnolia-white pt-20">
      {/* Hero Section */}
      <section className="bg-midnight-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
                Our Sacred
                <span className="text-gold"> Story</span>
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Born from the intersection of ancestral wisdom and modern wellness, Midnight Magnolia is more than a
                brand—it's a sacred sanctuary for those seeking gentle transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-sage-green/20 to-gold/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Moon className="w-24 h-24 text-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-2">Digital Sanctuary</h3>
                  <p className="font-lora text-magnolia-white/70">Where healing begins with gentle intention</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Our Sacred
              <span className="text-sage-green"> Mission</span>
            </h2>
            <p className="font-lora text-xl text-midnight-blue/80 max-w-3xl mx-auto leading-relaxed">
              We understand the unique challenges of living with chronic illness, ADHD, and the beautiful complexity of
              neurodivergent minds. Our tools and rituals honor your pace, celebrate your journey, and nurture your
              soul.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <Heart className="w-12 h-12 text-sage-green mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Gentle Care</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                We honor your energy levels and create tools that work with your natural rhythms, not against them. Your
                healing journey is sacred, and we treat it as such.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <Leaf className="w-12 h-12 text-sage-green mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Ancestral Wisdom</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                Drawing from generations of healing knowledge, we blend traditional practices with modern understanding
                to create meaningful, accessible wellness tools.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
            >
              <Star className="w-12 h-12 text-sage-green mx-auto mb-4" />
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Sacred Rituals</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                Every practice we share is designed to bring meaning and intention to your daily life, transforming
                ordinary moments into opportunities for healing and growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-sage-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-midnight-blue/20 to-sage-green/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-24 h-24 text-midnight-blue mx-auto mb-4" />
                  <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">Founded with Love</h3>
                  <p className="font-lora text-midnight-blue/70">Created by someone who understands the journey</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">
                A Personal
                <span className="text-sage-green"> Journey</span>
              </h2>
              <p className="font-lora text-lg text-midnight-blue/80 mb-6 leading-relaxed">
                Midnight Magnolia was born from my own journey with chronic illness and ADHD. After years of struggling
                with traditional productivity methods and wellness approaches that felt harsh and unsustainable, I began
                creating tools that honored my energy and celebrated my unique way of being.
              </p>
              <p className="font-lora text-lg text-midnight-blue/80 mb-8 leading-relaxed">
                What started as personal healing practices grew into a mission to create a sanctuary for others walking
                similar paths. Every product, every piece of content, every ritual is crafted with deep understanding of
                what it means to heal gently and live authentically.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                <BookOpen size={20} />
                Read Our Healing Words
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Sacred
              <span className="text-gold"> Values</span>
            </h2>
            <p className="font-lora text-xl text-midnight-blue/80 max-w-2xl mx-auto">
              The principles that guide everything we create and share
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Gentle Productivity</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                We believe productivity should feel nourishing, not depleting. Our tools help you accomplish what
                matters while honoring your energy and well-being.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Inclusive Healing</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                Healing looks different for everyone. We create space for all bodies, all minds, and all journeys,
                celebrating the beautiful diversity of human experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Sacred Simplicity</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                The most powerful healing often comes from simple, consistent practices. We focus on creating tools that
                are beautiful, meaningful, and easy to integrate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-4">Community Care</h3>
              <p className="font-lora text-midnight-blue/70 leading-relaxed">
                Healing happens in community. We foster connections between kindred spirits and create spaces where
                vulnerability is met with compassion and understanding.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">
              Begin Your Sacred
              <span className="text-gold"> Journey</span>
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
              You belong here, beautiful soul. Your healing matters, your pace is sacred, and your journey is worthy of
              celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Explore Sacred Tools
              </Link>
              <Link
                href="/blog"
                className="bg-transparent border-2 border-magnolia-white/30 hover:border-gold text-magnolia-white hover:text-gold font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Enter the Garden
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
