"use client"

import { motion } from "framer-motion"

export default function Products() {
  return (
    <section id="products" className="section bg-midnight-blue">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">Sacred Tools</h2>
          <p className="font-lora text-lg text-lavender-mist max-w-2xl mx-auto">
            Thoughtfully crafted resources for your healing journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: "📖",
              title: "The Magnolia Reset Journal",
              description: "A 90-day guided journey through healing, rest, and gentle transformation.",
              status: "Coming Soon",
              bgColor: "bg-sage-green",
            },
            {
              icon: "🌙",
              title: "Moon Cycle Planner",
              description: "Align your productivity with lunar wisdom and natural rhythms.",
              status: "Coming Soon",
              bgColor: "bg-lavender-mist",
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              className="card bg-midnight-indigo border-sage-green"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`h-48 ${product.bgColor} rounded-lg mb-6 flex items-center justify-center`}>
                <span className="text-midnight-blue font-playfair text-4xl">{product.icon}</span>
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-magnolia-white">{product.title}</h3>
              <p className="font-lora text-lavender-mist mb-6 leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-montserrat font-semibold text-lg">{product.status}</span>
                <button className="btn btn-primary">Join Waitlist</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
