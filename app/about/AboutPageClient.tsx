"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Sparkles, Moon, Star } from "lucide-react"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-magnolia-white pt-16">
      {/* Hero Section */}
      <section className="bg-midnight-blue py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-20 left-10 text-gold/30"
          >
            <Moon size={40} />
          </motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-20 right-20 text-sage-green/30"
          >
            <Star size={32} />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              Our Sacred
              <span className="block text-gold">Story</span>
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Where ancestral wisdom meets Southern Gothic grace in a digital sanctuary for healing souls
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=600&width=500&text=Founder+Story"
                  alt="Midnight Magnolia Founder"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -top-6 -right-6 bg-gold text-midnight-blue p-4 rounded-full">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-sage-green text-midnight-blue p-4 rounded-full">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
                  Born from Necessity,
                  <span className="block text-gold">Nurtured by Grace</span>
                </h2>

                <div className="space-y-6 font-lora text-lg text-midnight-blue/80 leading-relaxed">
                  <p>
                    Midnight Magnolia emerged from the intersection of chronic illness, ADHD, and the deep need for
                    healing tools that actually understand the complexities of living with invisible disabilities.
                  </p>

                  <p>
                    As a Black woman navigating the wellness space, I found myself searching for resources that spoke to
                    my experience—tools that honored both struggle and strength, that embraced the beauty in darkness
                    alongside the light.
                  </p>

                  <p>
                    Southern Gothic aesthetics became my language of healing, a way to process trauma while finding
                    beauty in the broken places. This digital sanctuary was born from that journey.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-sage-green/10 rounded-2xl">
                  <div className="text-3xl font-playfair font-bold text-midnight-blue mb-2">2024</div>
                  <div className="font-montserrat text-sm text-midnight-blue/70">Founded</div>
                </div>
                <div className="text-center p-6 bg-gold/10 rounded-2xl">
                  <div className="text-3xl font-playfair font-bold text-midnight-blue mb-2">1000+</div>
                  <div className="font-montserrat text-sm text-midnight-blue/70">Souls Served</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-sage-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-8">
              Our Sacred <span className="text-gold">Mission</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="bg-sage-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-sage-green" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-4">Trauma-Informed</h3>
                <p className="font-lora text-midnight-blue/70">
                  Every tool we create honors your healing journey and respects your pace
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="bg-gold/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-4">Inclusive</h3>
                <p className="font-lora text-midnight-blue/70">
                  A sanctuary for all bodies, minds, and spirits seeking gentle transformation
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="bg-midnight-blue/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Moon className="h-8 w-8 text-midnight-blue" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-4">Sacred</h3>
                <p className="font-lora text-midnight-blue/70">
                  Honoring ancestral wisdom while embracing modern healing practices
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-magnolia-white mb-6">
              Ready to Begin Your
              <span className="block text-gold">Sacred Journey?</span>
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
              Join our community of healing souls and discover tools that honor your unique path
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Explore Sacred Tools
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Connect With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
