"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Sparkles, Moon } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-20 bg-sage-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500&text=Founder+Portrait"
                alt="Midnight Magnolia Founder"
                width={500}
                height={500}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-gold text-midnight-blue p-3 rounded-full">
                <Heart className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Moon className="h-6 w-6 text-gold" />
              <span className="font-montserrat text-sm font-semibold text-sage-green uppercase tracking-wider">
                Our Sacred Story
              </span>
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue">
              Where Healing Meets
              <span className="block text-gold">Southern Gothic Grace</span>
            </h2>

            <p className="font-lora text-lg text-midnight-blue/80 leading-relaxed">
              Born from the intersection of chronic illness, ADHD, and ancestral wisdom, Midnight Magnolia is more than
              a brand—it's a digital sanctuary for souls seeking gentle transformation.
            </p>

            <p className="font-lora text-midnight-blue/70 leading-relaxed">
              We believe your healing journey is sacred, your pace is perfect, and your story matters. Through
              trauma-informed design and Southern Gothic aesthetics, we create tools that honor both your struggles and
              your strength.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sage-green" />
                <span className="font-montserrat text-sm text-midnight-blue">Trauma-Informed</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-gold" />
                <span className="font-montserrat text-sm text-midnight-blue">Inclusive</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-sage-green" />
                <span className="font-montserrat text-sm text-midnight-blue">Sacred</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Discover Our Journey
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
