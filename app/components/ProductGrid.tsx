"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, Download, Heart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "The Magnolia Reset 90-Day Journal",
    description: "Sacred transformation through ancestral wisdom and daily reflection practices",
    price: 29,
    image: "/placeholder.svg?height=400&width=400&text=Sacred+Journal",
    category: "Digital Tools",
    rating: 4.9,
    reviews: 127,
    isDigital: true,
  },
  {
    id: 2,
    name: "Midnight Messages Tarot Deck",
    description: "Digital tarot deck rooted in Southern Gothic wisdom and healing energy",
    price: 19,
    image: "/placeholder.svg?height=400&width=400&text=Tarot+Deck",
    category: "Digital Tools",
    rating: 4.8,
    reviews: 89,
    isDigital: true,
  },
  {
    id: 3,
    name: "Rose Quartz Heart Healing Set",
    description: "Hand-selected rose quartz crystals for heart chakra healing and self-love",
    price: 35,
    image: "/placeholder.svg?height=400&width=400&text=Rose+Quartz",
    category: "Sacred Tools",
    rating: 4.7,
    reviews: 73,
    isDigital: false,
  },
  {
    id: 4,
    name: "Sacred Productivity ADHD Planner",
    description: "Gentle planning system designed for neurodivergent entrepreneurs and healers",
    price: 19,
    image: "/placeholder.svg?height=400&width=400&text=ADHD+Planner",
    category: "Digital Tools",
    rating: 4.9,
    reviews: 156,
    isDigital: true,
  },
]

export default function ProductGrid() {
  return (
    <section className="py-20 bg-magnolia-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-midnight-blue mb-6">
              Sacred <span className="text-gold">Offerings</span>
            </h2>
            <p className="font-lora text-xl text-midnight-blue/70 max-w-2xl mx-auto">
              Curated tools and treasures to support your healing journey and spiritual entrepreneurship
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                <div className="absolute top-3 left-3">
                  <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                    {product.isDigital ? "Digital" : "Physical"}
                  </span>
                </div>

                <div className="absolute inset-0 bg-midnight-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-magnolia-white/20 backdrop-blur-sm text-magnolia-white p-3 rounded-full hover:bg-magnolia-white/30 transition-colors duration-200">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="fill-gold text-gold" />
                  <span className="font-montserrat text-sm text-midnight-blue/80">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="font-lora text-midnight-blue/70 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-playfair text-xl font-bold text-midnight-blue">${product.price}</span>
                  <span className="px-2 py-1 rounded-full text-xs font-montserrat font-medium bg-sage-green/20 text-sage-green">
                    {product.category}
                  </span>
                </div>

                <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg">
                  Add to Sacred Collection
                </button>

                {product.isDigital && (
                  <div className="mt-2 text-xs text-midnight-blue/60 text-center flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" />
                    Instant Download
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Explore All Sacred Tools
          </Link>
        </div>
      </div>
    </section>
  )
}
