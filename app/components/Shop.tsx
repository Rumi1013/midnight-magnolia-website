"use client"

import { motion } from "framer-motion"

export default function Shop() {
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
          <h2 className="font-playfair text-4xl font-bold text-midnight-blue md:text-5xl lg:text-6xl">Sacred Shop</h2>
          <p className="mt-6 text-lg text-midnight-blue/80 md:text-xl">
            Curated tools and treasures for your healing altar.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "☕",
              title: "Midnight Moon Mug",
              description: "Sip your morning ritual from this celestial vessel.",
              price: "$24",
              color: "bg-sage-green",
            },
            {
              icon: "👜",
              title: "Magnolia Tote",
              description: "Carry your sacred tools in Southern Gothic style.",
              price: "$32",
              color: "bg-lavender-mist",
            },
            {
              icon: "🕯️",
              title: "Healing Ritual Candle",
              description: "Hand-poured with intention and sacred herbs.",
              price: "$28",
              color: "bg-petal-blush",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`mb-4 flex h-48 items-center justify-center rounded-lg ${item.color}`}>
                <span className="text-4xl text-midnight-blue">{item.icon}</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-midnight-blue">{item.title}</h3>
              <p className="mt-2 text-sm text-midnight-blue/70">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-montserrat font-semibold text-gold">{item.price}</span>
                <button className="btn btn-primary px-4 py-2 text-sm">Add to Altar</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
