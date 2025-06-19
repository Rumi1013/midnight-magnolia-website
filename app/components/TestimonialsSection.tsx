"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "This space has been a sanctuary for my healing journey. The gentle approach to productivity has changed my relationship with rest.",
      author: "Sarah M.",
      role: "Community Member",
    },
    {
      quote:
        "Finally, a wellness space that understands chronic illness. The tools here actually work with my energy, not against it.",
      author: "Alex R.",
      role: "Spoonie Warrior",
    },
    {
      quote:
        "The ancestral wisdom combined with modern understanding creates something truly magical. I feel seen and supported here.",
      author: "Jordan L.",
      role: "Healing Practitioner",
    },
  ]

  return (
    <section className="py-20 bg-warm-gray text-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Voices from Our Garden</h2>
          <p className="text-xl font-lora text-midnight-blue/80 max-w-3xl mx-auto">
            Stories of transformation, healing, and growth from our sacred community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-midnight-blue text-magnolia-white border-sage-green/20">
                <CardContent className="p-6">
                  <div className="text-4xl text-sage-green mb-4">"</div>
                  <p className="font-lora text-magnolia-white/90 mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-montserrat font-semibold text-sage-green">{testimonial.author}</div>
                    <div className="font-montserrat text-sm text-magnolia-white/70">{testimonial.role}</div>
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
