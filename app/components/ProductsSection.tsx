"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProductsSection() {
  const products = [
    {
      name: "Sacred Planning Journal",
      description: "A gentle approach to productivity that honors your energy cycles",
      price: "$28",
      image: "/healing-journal-cover.png",
    },
    {
      name: "Midnight Moon Mug",
      description: "Sip your morning ritual from this mystical ceramic companion",
      price: "$24",
      image: "/midnight-moon-mug.png",
    },
    {
      name: "Magnolia Tote Bag",
      description: "Carry your essentials in Southern Gothic style",
      price: "$32",
      image: "/magnolia-tote-bag.png",
    },
  ]

  return (
    <section className="py-20 bg-midnight-blue text-magnolia-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Sacred Tools for Your Journey</h2>
          <p className="text-xl font-lora text-magnolia-white/80 max-w-3xl mx-auto">
            Thoughtfully crafted items to support your healing practice and daily rituals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-magnolia-white text-midnight-blue overflow-hidden hover:shadow-mystical transition-shadow">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-playfair mb-2">{product.name}</h3>
                  <p className="font-lora text-midnight-blue/80 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-montserrat font-bold text-gold">{product.price}</span>
                    <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue">Add to Altar</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
