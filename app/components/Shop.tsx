"use client"

import { motion } from "framer-motion"

export default function Shop() {
  return (
    <section id="shop" className="section bg-magnolia-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-blue mb-6">Sacred Shop</h2>
          <p className="font-lora text-lg text-midnight-blue max-w-2xl mx-auto">
            Curated tools and treasures for your healing altar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "☕",
              title: "Midnight Moon Mug",
              description: "Sip your morning ritual from this celestial vessel.",
              price: "$24",
              bgColor: "bg-sage-green",
            },
            {
              icon: "👜",
              title: "Magnolia Tote",
              description: "Carry your sacred tools in Southern Gothic style.",
              price: "$32",
              bgColor: "bg-lavender-mist",
            },
            {
              icon: "🕯️",
              title: "Healing Ritual Candle",
              description: "Hand-poured with intention and sacred herbs.",
              price: "$28",
              bgColor: "bg-petal-blush",
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`h-48 ${product.bgColor} rounded-lg mb-4 flex items-center justify-center`}>
                <span className="text-midnight-blue font-playfair text-4xl">{product.icon}</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2 text-midnight-blue">{product.title}</h3>
              <p className="font-lora text-sm text-midnight-blue mb-4 leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-montserrat font-semibold text-lg">{product.price}</span>
                <button className="btn btn-primary text-sm px-6 py-3">Add to Altar</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
