"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Gentle Productivity for Chronic Illness",
    excerpt:
      "Discovering sustainable ways to create and accomplish while honoring your energy levels and healing journey.",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Wellness",
    image: "/placeholder.svg?height=200&width=300&text=Gentle+Productivity",
  },
  {
    id: 2,
    title: "Sacred Rituals for Daily Healing",
    excerpt: "Simple, meaningful practices that can transform your daily routine into a sacred healing ritual.",
    date: "December 12, 2024",
    readTime: "7 min read",
    category: "Rituals",
    image: "/placeholder.svg?height=200&width=300&text=Sacred+Rituals",
  },
  {
    id: 3,
    title: "Ancestral Wisdom in Modern Times",
    excerpt: "How ancient healing practices can support our contemporary wellness journey with grace and intention.",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Wisdom",
    image: "/placeholder.svg?height=200&width=300&text=Ancestral+Wisdom",
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-magnolia-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
            Healing
            <span className="text-sage-green"> Words</span>
          </h2>
          <p className="font-lora text-xl text-midnight-blue/80 max-w-2xl mx-auto">
            Gentle wisdom and sacred insights for your transformation journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-video bg-sage-green/10 flex items-center justify-center">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-midnight-blue/60">
                  <span className="inline-block bg-sage-green/20 text-sage-green font-montserrat font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="font-montserrat">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="font-montserrat">{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3 line-clamp-2">{post.title}</h3>

                <p className="font-lora text-midnight-blue/70 mb-4 line-clamp-3">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-sage-green hover:text-sage-green/80 font-montserrat font-semibold transition-colors"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Enter the Garden
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
