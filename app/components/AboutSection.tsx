"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section className="py-20 bg-magnolia-white text-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Your Healing Journey Begins Here</h2>
          <p className="text-xl font-lora text-midnight-blue/80 max-w-3xl mx-auto">
            We understand that healing is not linear, and your pace is sacred. Our digital sanctuary blends ancestral
            wisdom with gentle productivity for those navigating chronic illness, ADHD, and the beautiful complexity of
            being human.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Gentle Productivity",
              description: "Tools and wisdom that honor your energy cycles and natural rhythms.",
              icon: "🌱",
            },
            {
              title: "Ancestral Wisdom",
              description: "Time-honored practices reimagined for modern healing journeys.",
              icon: "🌿",
            },
            {
              title: "Sacred Community",
              description: "A supportive space where your story and struggles are honored.",
              icon: "🤝",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-midnight-blue text-magnolia-white border-sage-green/20 hover:border-sage-green/40 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-playfair mb-4 text-sage-green">{item.title}</h3>
                  <p className="font-lora text-magnolia-white/80">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
