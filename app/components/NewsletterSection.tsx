"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-sage-green text-midnight-blue">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-midnight-blue text-magnolia-white border-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-playfair mb-4">Receive More Healing Words</h2>
              <p className="font-lora text-magnolia-white/80 mb-6">
                Join our sacred circle for gentle wisdom, seasonal rituals, and updates from the garden delivered to
                your inbox.
              </p>

              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-magnolia-white text-midnight-blue border-sage-green focus:border-gold"
                />
                <Button
                  type="submit"
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8"
                >
                  Join the Garden
                </Button>
              </form>

              <p className="text-sm font-montserrat text-magnolia-white/60 mt-4">
                We honor your inbox as sacred space. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
