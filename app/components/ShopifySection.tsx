"use client"

import { motion } from "framer-motion"

export default function ShopifySection() {
  return (
    <section className="py-20 bg-warm-gray text-midnight-blue">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">Powered by Sacred Commerce</h2>
          <p className="text-lg font-lora max-w-2xl mx-auto">
            Our shop is thoughtfully integrated with Shopify to ensure a seamless and secure shopping experience for all
            your sacred tools.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
