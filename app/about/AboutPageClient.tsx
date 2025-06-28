"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Moon, Sparkles, ArrowRight } from "lucide-react"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-magnolia-white pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-midnight-blue relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-sage-green/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/10 rounded-full blur-xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles size={24} className="text-sage-green" />
              <Moon size={24} className="text-gold" />
              <Sparkles size={24} className="text-sage-green" />
            </div>

            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              Our Sacred <span className="text-sage-green">Story</span>
            </h1>

            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto leading-relaxed">
              Born from the intersection of Southern Gothic mysticism and modern healing wisdom, Midnight Magnolia is a
              digital sanctuary for souls seeking transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=500&width=500&text=Founder+Portrait"
                  alt="Midnight Magnolia founder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-midnight-blue/40 flex items-end">
                  <div className="p-8">
                    <blockquote className="font-lora text-magnolia-white italic text-lg leading-relaxed">
                      "Your sensitivity is not a weakness—it's your superpower. Let's build something beautiful
                      together."
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
                A Journey of <span className="text-sage-green">Healing & Purpose</span>
              </h2>

              <div className="space-y-6 font-lora text-midnight-blue/80 leading-relaxed">
                <p>
                  Midnight Magnolia was born from my own journey as a chronic illness warrior and neurodivergent
                  entrepreneur. After years of trying to fit into traditional business models that left me burned out
                  and disconnected from my values, I knew there had to be a different way.
                </p>

                <p>
                  Growing up in the South, I was surrounded by stories of strong women who found power in their
                  sensitivity, wisdom in their struggles, and magic in their everyday lives. These ancestral teachings
                  became the foundation for everything we create here.
                </p>

                <p>
                  Today, Midnight Magnolia serves as a digital sanctuary where chronic illness warriors, sensitive
                  souls, and spiritual entrepreneurs can build businesses that honor their energy, celebrate their pace,
                  and create sustainable abundance without sacrificing their well-being.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  <Heart size={18} />
                  Connect With Us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-sage-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-midnight-blue mb-6">
              Our Sacred <span className="text-sage-green">Mission</span>
            </h2>
            <p className="font-lora text-xl text-midnight-blue/70 max-w-3xl mx-auto">
              To create a world where sensitive souls can build thriving businesses that honor their energy, celebrate
              their pace, and create abundance through authentic expression.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={32} className="text-sage-green" />,
                title: "Gentle Productivity",
                description:
                  "We believe that rest is productive, healing is not linear, and your pace is sacred. Our tools honor your energy cycles and support sustainable growth.",
              },
              {
                icon: <Moon size={32} className="text-gold" />,
                title: "Ancestral Wisdom",
                description:
                  "We draw from the deep well of Southern Gothic mysticism and ancestral knowledge to create modern solutions rooted in ancient wisdom.",
              },
              {
                icon: <Sparkles size={32} className="text-sage-green" />,
                title: "Sacred Commerce",
                description:
                  "Business can be a spiritual practice. We help you build enterprises that serve your highest good while creating positive impact in the world.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-4">{value.title}</h3>
                <p className="font-lora text-midnight-blue/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
              Our Growing <span className="text-sage-green">Sacred Circle</span>
            </h2>
            <p className="font-lora text-xl text-midnight-blue/70 max-w-2xl mx-auto">
              Join thousands of healing souls who have found their sanctuary with us
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Healing Souls", icon: <Heart size={24} className="text-sage-green" /> },
              { number: "50+", label: "Sacred Tools", icon: <Sparkles size={24} className="text-gold" /> },
              {
                number: "4.9",
                label: "Average Rating",
                icon: <Star size={24} className="text-sage-green fill-sage-green" />,
              },
              { number: "98%", label: "Satisfaction Rate", icon: <Moon size={24} className="text-gold" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-2">
                  {stat.number}
                </div>
                <div className="font-lora text-midnight-blue/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-magnolia-white mb-6">
              Ready to Begin Your <span className="text-sage-green">Sacred Journey?</span>
            </h2>

            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
              Join our community of healing souls and discover tools that honor your energy, celebrate your pace, and
              support your authentic expression.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Explore Sacred Tools
              </Link>
              <Link
                href="/blog"
                className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Enter the Garden
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
