"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BlogSection() {
  const posts = [
    {
      title: "Honoring Your Energy Cycles",
      excerpt: "Learning to work with your natural rhythms instead of against them.",
      date: "December 15, 2024",
    },
    {
      title: "Ancestral Wisdom for Modern Healing",
      excerpt: "How traditional practices can support contemporary wellness journeys.",
      date: "December 10, 2024",
    },
    {
      title: "Creating Sacred Space at Home",
      excerpt: "Simple rituals to transform your living space into a healing sanctuary.",
      date: "December 5, 2024",
    },
  ]

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
          <h2 className="text-4xl md:text-5xl font-playfair mb-6">Wisdom from the Garden</h2>
          <p className="text-xl font-lora text-midnight-blue/80 max-w-3xl mx-auto">
            Gentle guidance, healing insights, and sacred wisdom for your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-midnight-blue text-magnolia-white border-sage-green/20 hover:border-sage-green/40 transition-colors">
                <CardContent className="p-6">
                  <div className="text-sm font-montserrat text-sage-green mb-2">{post.date}</div>
                  <h3 className="text-xl font-playfair mb-3">{post.title}</h3>
                  <p className="font-lora text-magnolia-white/80 mb-4">{post.excerpt}</p>
                  <Button
                    variant="outline"
                    className="border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold"
          >
            Explore All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
