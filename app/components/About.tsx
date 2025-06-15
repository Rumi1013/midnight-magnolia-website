"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="section bg-magnolia-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-blue mb-6">Sacred Healing Space</h2>
          <p className="font-lora text-lg text-midnight-blue max-w-2xl mx-auto">
            We create gentle sanctuaries for Black women, spoonies, and spiritual entrepreneurs seeking healing through
            ancestral wisdom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🌙",
              title: "Gentle Productivity",
              description: "Honor your energy cycles with tools designed for chronic illness and ADHD.",
            },
            {
              icon: "🌸",
              title: "Ancestral Wisdom",
              description: "Connect with the healing traditions passed down through generations.",
            },
            {
              icon: "✨",
              title: "Sacred Community",
              description: "Join a supportive circle of healers, creators, and spiritual entrepreneurs.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="card text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="font-playfair text-2xl font-semibold mb-4 text-midnight-blue">{item.title}</h3>
              <p className="font-lora text-midnight-blue leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
