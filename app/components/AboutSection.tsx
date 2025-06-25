"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: "🌙",
      title: "Trauma-Informed",
      description: "Every tool designed with gentleness and understanding for your healing journey.",
    },
    {
      icon: "🌸",
      title: "Ancestral Wisdom",
      description: "Honoring the strength and knowledge passed down through generations of resilient women.",
    },
    {
      icon: "✨",
      title: "Neurodivergent Friendly",
      description: "Celebrating different minds with tools that work with your brain, not against it.",
    },
    {
      icon: "🕊️",
      title: "Inclusive Sanctuary",
      description: "A safe space for all identities, especially Black women and marginalized voices.",
    },
    {
      icon: "🔮",
      title: "Digital Innovation",
      description: "Blending ancient wisdom with modern technology for accessible healing tools.",
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-magnolia-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-sage-green/20 text-2xl">✨</div>
        <div className="absolute top-40 right-20 text-gold/20 text-3xl">🌙</div>
        <div className="absolute bottom-20 left-20 text-sage-green/20 text-2xl">🌸</div>
        <div className="absolute bottom-40 right-10 text-gold/20 text-2xl">🔮</div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-sage-green text-magnolia-white px-4 py-2 rounded-full inline-block mb-6 font-montserrat text-sm font-semibold uppercase tracking-wider">
              Our Sacred Mission
            </div>

            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">
              Healing is not linear, <span className="text-gold">and that's beautiful</span>
            </h2>

            <div className="space-y-6 font-lora text-lg text-midnight-blue/80 leading-relaxed">
              <p>
                Founded by <strong className="text-midnight-blue">Latisha Vincent-Waters</strong> under Rumi-Nations
                LLC, Midnight Magnolia is a digital sanctuary where Southern Gothic grace meets ancestral wisdom. We
                create tools for souls seeking transformation through gentle productivity and sacred rituals.
              </p>

              <p>
                Whether you're navigating chronic illness, ADHD, sobriety, or simply seeking a more mindful approach to
                life and business, you belong here. Every ritual, every journal prompt, every gentle reminder is crafted
                with love for the beautifully complex human you are.
              </p>

              <p>
                From our healing journals and tarot decks to our courier services and digital business tools, everything
                we create honors your pace, your story, and your unique journey toward wholeness.
              </p>
            </div>
          </motion.div>

          {/* Right Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-midnight-blue/5 rounded-2xl hover:bg-midnight-blue/10 transition-colors duration-300"
              >
                <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">{feature.title}</h3>
                  <p className="font-lora text-midnight-blue/70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
