"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function JusticeSection() {
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
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Healing Justice & Community Care</h2>
          <p className="text-xl font-lora text-magnolia-white/80 max-w-3xl mx-auto">
            True healing happens in community. We believe in accessible wellness, mutual aid, and creating space for all
            bodies and minds to flourish.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-sage-green text-midnight-blue">
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair mb-4">Community Sliding Scale</h3>
                <p className="font-lora mb-4">
                  We offer sliding scale pricing for our services and products because healing should be accessible to
                  all, regardless of financial circumstances.
                </p>
                <p className="font-lora text-sm">Pay what you can, take what you need. Your healing matters.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gold text-midnight-blue">
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair mb-4">Mutual Aid Fund</h3>
                <p className="font-lora mb-4">
                  A portion of all proceeds goes to our community mutual aid fund, supporting folks in our community
                  with emergency needs.
                </p>
                <p className="font-lora text-sm">Together, we rise. Together, we heal.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
