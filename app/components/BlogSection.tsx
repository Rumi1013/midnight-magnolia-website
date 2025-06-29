"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const featuredPosts = [
  {
    id: 1,
    title: "Gentle Productivity for Chronic Illness Warriors",
    excerpt:
      "Discover how to honor your energy cycles while building a sustainable creative practice that works with your body, not against it.",
    image: "/placeholder.svg?height=300&width=400&text=Gentle+Productivity",
    category: "Wellness",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    slug: "gentle-productivity-chronic-illness",
  },
  {
    id: 2,
    title: "Sacred Boundaries: The Art of Saying No with Grace",
    excerpt:
      "Learn to set boundaries that protect your energy while maintaining relationships, rooted in Southern wisdom and ancestral knowing.",
    image: "/placeholder.svg?height=300&width=400&text=Sacred+Boundaries",
    category: "Mindset",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    slug: "sacred-boundaries-saying-no",
  },
  {
    id: 3,
    title: "Moon Phases and Business Cycles: Aligning with Natural Rhythms",
    excerpt:
      "Harness the power of lunar cycles to optimize your business strategy and honor your natural creative ebbs and flows.",
    image: "/placeholder.svg?height=300&width=400&text=Moon+Business",
    category: "Business",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    slug: "moon-phases-business-cycles",
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-magnolia-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-midnight-blue mb-6">
              Sacred <span className="text-gold">Wisdom</span>
            </h2>
            <p className="font-lora text-xl text-midnight-blue/70 max-w-2xl mx-auto">
              Gentle guidance, ancestral wisdom, and practical magic for your healing journey
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-sage-green/90 text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-midnight-blue/60 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="font-montserrat">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="font-montserrat">{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-3 line-clamp-2 group-hover:text-sage-green transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="font-lora text-midnight-blue/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sage-green hover:text-sage-green/80 font-montserrat font-semibold text-sm transition-colors duration-200"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Enter the Garden
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
