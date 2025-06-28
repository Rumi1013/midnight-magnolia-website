"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const featuredPosts = [
  {
    id: 1,
    title: "Sacred Productivity for Chronic Illness Warriors",
    excerpt: "Discover gentle systems that honor your energy cycles and create sustainable success without burnout.",
    image: "/placeholder.svg?height=300&width=400&text=Sacred+Productivity",
    category: "Wellness",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    slug: "sacred-productivity-chronic-illness",
  },
  {
    id: 2,
    title: "Building Your Digital Sanctuary: A Beginner's Guide",
    excerpt: "Step-by-step guidance for creating an online business that aligns with your values and healing journey.",
    image: "/placeholder.svg?height=300&width=400&text=Digital+Sanctuary",
    category: "Business",
    readTime: "12 min read",
    date: "Dec 12, 2024",
    slug: "building-digital-sanctuary",
  },
  {
    id: 3,
    title: "Moon Cycles and Manifestation for Entrepreneurs",
    excerpt: "Harness lunar energy to align your business goals with natural rhythms and ancestral wisdom.",
    image: "/placeholder.svg?height=300&width=400&text=Moon+Cycles",
    category: "Spirituality",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    slug: "moon-cycles-manifestation",
  },
]

export default function BlogSection() {
  return (
    <section className="py-20 bg-midnight-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-magnolia-white mb-6">
            Sacred <span className="text-sage-green">Wisdom</span>
          </h2>
          <p className="font-lora text-xl text-magnolia-white/70 max-w-2xl mx-auto">
            Gentle guidance, healing insights, and practical magic for your entrepreneurial journey
          </p>
        </motion.div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-magnolia-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Post Image */}
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

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-midnight-blue/60 text-xs font-montserrat mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-3 line-clamp-2 group-hover:text-sage-green transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sage-green hover:text-sage-green/80 font-montserrat font-semibold text-sm transition-colors duration-200"
                >
                  Read More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Enter the Garden of Wisdom
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
