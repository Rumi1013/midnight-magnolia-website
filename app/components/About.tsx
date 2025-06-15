"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section className="section bg-magnolia-white">
      <div className="container">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl font-bold text-midnight-blue md:text-5xl lg:text-6xl">
            Sacred Healing Space
          </h2>
          <p className="mt-6 text-lg text-midnight-blue/80 md:text-xl">
            We create gentle sanctuaries for Black women, spoonies, and spiritual entrepreneurs seeking healing through
            ancestral wisdom.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 text-5xl">{item.icon}</div>
              <h3 className="font-playfair text-2xl font-semibold text-midnight-blue">{item.title}</h3>
              <p className="mt-4 text-midnight-blue/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
