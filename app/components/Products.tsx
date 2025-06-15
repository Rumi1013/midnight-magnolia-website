"use client"

import { motion } from "framer-motion"

export default function Products() {
  return (
    <section className="section bg-midnight-blue">
      <div className="container">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl font-bold text-magnolia-white md:text-5xl lg:text-6xl">Sacred Tools</h2>
          <p className="mt-6 text-lg text-lavender-mist md:text-xl">
            Thoughtfully crafted resources for your healing journey.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            {
              icon: "📖",
              title: "The Magnolia Reset Journal",
              description: "A 90-day guided journey through healing, rest, and gentle transformation.",
              color: "bg-sage-green",
            },
            {
              icon: "🌙",
              title: "Moon Cycle Planner",
              description: "Align your productivity with lunar wisdom and natural rhythms.",
              color: "bg-lavender-mist",
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              className="card border-sage-green bg-midnight-indigo"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`mb-6 flex h-48 items-center justify-center rounded-lg ${product.color}`}>
                <span className="text-4xl text-midnight-blue">{product.icon}</span>
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-magnolia-white">{product.title}</h3>
              <p className="mt-4 text-lavender-mist">{product.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-montserrat text-lg font-semibold text-gold">Coming Soon</span>
                <button className="btn btn-primary text-sm">Join Waitlist</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
