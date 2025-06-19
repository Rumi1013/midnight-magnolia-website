"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ShopSection() {
  return (
    <section className="py-20 bg-sage-green text-midnight-blue">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Explore Our Full Collection</h2>
          <p className="text-xl font-lora mb-8 max-w-2xl mx-auto">
            Discover more sacred tools, healing resources, and mystical treasures in our complete shop collection.
          </p>
          <Button
            size="lg"
            className="bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold px-8 py-4"
          >
            Visit Our Shop
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
