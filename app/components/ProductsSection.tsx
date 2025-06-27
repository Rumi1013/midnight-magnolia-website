"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingBag, Sparkles } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Sacred Healing Journal",
    description: "A beautifully crafted journal for your healing journey",
    price: "$28",
    image: "/placeholder.svg?height=300&width=300&text=Sacred+Journal",
    category: "Digital Tools",
  },
  {
    id: 2,
    name: "Midnight Moon Mug",
    description: "Sip your sacred beverages in Southern Gothic style",
    price: "$24",
    image: "/placeholder.svg?height=300&width=300&text=Moon+Mug",
    category: "Sacred Tools",
  },
  {
    id: 3,
    name: "Magnolia Wisdom Cards",
    description: "Daily affirmations and gentle guidance cards",
    price: "$32",
    image: "/placeholder.svg?height=300&width=300&text=Wisdom+Cards",
    category: "Digital Tools",
  },
]

export default function ProductsSection() {
  return (
    <section className="py-20 bg-midnight-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">
            Sacred
            <span className="text-gold"> Tools</span>
          </h2>
          <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
            Carefully curated tools and treasures to support your healing journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-magnolia-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square bg-sage-green/10 rounded-xl mb-4 flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="text-center">
                <span className="inline-block bg-sage-green/20 text-sage-green font-montserrat text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">{product.name}</h3>
                <p className="font-lora text-midnight-blue/70 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-2xl font-bold text-sage-green">{product.price}</span>
                  <button className="bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white p-2 rounded-full transition-colors">
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <Sparkles size={20} />
            Explore All Sacred Tools
          </Link>
        </div>
      </div>
    </section>
  )
}
