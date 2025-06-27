"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Users, Award, BookOpen, Sparkles } from "lucide-react"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-green/10 to-gold/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gold mb-6">Our Sacred Story</h1>
                <p className="font-lora text-xl text-magnolia-white/90 leading-relaxed">
                  Born from the intersection of ancestral wisdom and modern healing, Midnight Magnolia is more than a
                  brand—it's a digital sanctuary for transformation through Southern Gothic grace.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-sage-green mb-2">500+</div>
                  <div className="text-magnolia-white/70 font-montserrat text-sm">Healing Souls</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-sage-green mb-2">3+</div>
                  <div className="text-magnolia-white/70 font-montserrat text-sm">Years Growing</div>
                </div>
              </div>

              <Link
                href="/blog"
                className="inline-block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Enter the Garden
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-3xl overflow-hidden border-4 border-gold/30">
                  <Image
                    src="/founder-portrait.png"
                    alt="Latisha Vincent-Waters, Founder of Midnight Magnolia"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-sage-green rounded-2xl p-4 shadow-lg">
                  <Sparkles className="h-8 w-8 text-midnight-blue" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16 bg-gradient-to-r from-sage-green/5 to-gold/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-6">Meet Latisha Vincent-Waters</h2>
            <p className="font-lora text-xl text-magnolia-white/80">
              Founder, Digital Healer, & Southern Gothic Mystic
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-magnolia-white rounded-3xl p-8 md:p-12 shadow-mystical"
          >
            <div className="prose prose-lg max-w-none">
              <p className="font-lora text-midnight-blue/80 leading-relaxed mb-6">
                My journey to creating Midnight Magnolia began in the quiet moments between chaos and calm—those liminal
                spaces where healing happens. As a Black woman navigating chronic illness, ADHD, and the entrepreneurial
                world, I found myself searching for resources that honored both my struggles and my strength.
              </p>

              <p className="font-lora text-midnight-blue/80 leading-relaxed mb-6">
                Traditional productivity advice felt like trying to force a magnolia tree to bloom like a rose.
                Beautiful, but fundamentally mismatched. I needed something that honored my natural rhythms, celebrated
                rest as resistance, and understood that healing is not linear.
              </p>

              <p className="font-lora text-midnight-blue/80 leading-relaxed mb-6">
                Southern Gothic tradition taught me that there is beauty in the broken places, strength in
                vulnerability, and profound wisdom in the spaces between what was and what could be. This became the
                foundation of Midnight Magnolia—a digital sanctuary where ancestral wisdom meets modern healing.
              </p>

              <p className="font-lora text-midnight-blue/80 leading-relaxed">
                Today, Midnight Magnolia serves as a bridge between the sacred past and the transformative present,
                offering tools, wisdom, and community for those ready to embrace their own healing journey with Southern
                Gothic grace.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl font-bold text-gold mb-6">Our Sacred Values</h2>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto">
              These principles guide everything we create and every soul we serve
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Radical Self-Compassion",
                description:
                  "Healing begins with treating yourself with the same kindness you'd offer a beloved friend.",
              },
              {
                icon: Star,
                title: "Ancestral Wisdom",
                description: "Honoring the knowledge passed down through generations while creating new traditions.",
              },
              {
                icon: Users,
                title: "Inclusive Community",
                description: "Creating spaces where all souls feel seen, heard, and valued in their healing journey.",
              },
              {
                icon: Award,
                title: "Gentle Excellence",
                description: "Pursuing quality and growth without sacrificing mental health or well-being.",
              },
              {
                icon: BookOpen,
                title: "Continuous Learning",
                description: "Embracing the student mindset and growing alongside our community.",
              },
              {
                icon: Sparkles,
                title: "Sacred Transformation",
                description:
                  "Believing that every person has the power to transform their life through intentional practice.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-magnolia-white rounded-2xl p-6 shadow-sm hover:shadow-mystical transition-all duration-300 border border-transparent hover:border-sage-green/30"
              >
                <div className="bg-sage-green/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-sage-green" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-3">{value.title}</h3>
                <p className="font-lora text-midnight-blue/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-r from-gold/10 to-sage-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-8">Our Sacred Mission</h2>
            <blockquote className="font-lora text-2xl text-magnolia-white/90 leading-relaxed italic mb-8">
              "To create a digital sanctuary where healing happens through Southern Gothic grace, where productivity
              honors natural rhythms, and where every soul finds the tools they need to transform their pain into
              power."
            </blockquote>
            <div className="w-24 h-1 bg-sage-green mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-magnolia-white rounded-3xl p-8 md:p-12 shadow-mystical"
          >
            <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-6">
              Ready to Begin Your Sacred Journey?
            </h2>
            <p className="font-lora text-xl text-midnight-blue/80 mb-8">
              Join our community of healers, creators, and gentle warriors as we transform together through Southern
              Gothic grace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Enter the Garden
              </Link>
              <Link
                href="/shop"
                className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Explore Sacred Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
