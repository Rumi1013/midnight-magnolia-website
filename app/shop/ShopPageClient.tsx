"use client"

import { motion } from "framer-motion"
import SacredCommerceSystem from "../components/SacredCommerceSystem"

export default function ShopPageClient() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* 🌸 Sacred Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">Sacred Shop</h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
              Curated healing tools and sacred offerings designed to support your wellness journey with Southern Gothic
              grace.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-sage-green">✨ Sacred connection established</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌿 Sacred Products Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <SacredCommerceSystem category="all" />
        </div>
      </section>
    </div>
  )
}
