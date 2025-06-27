"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  tags: string[]
  publishedAt: string
  readTime: string
  featured?: boolean
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "welcome-to-the-garden",
    title: "Welcome to the Sacred Garden",
    excerpt:
      "Step into our digital sanctuary where healing meets entrepreneurship, and Southern Gothic wisdom guides your transformation journey.",
    content: "Welcome, beautiful soul, to Midnight Magnolia's sacred garden...",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    category: "Welcome",
    tags: ["healing", "transformation", "welcome"],
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: "southern-gothic-healing",
    title: "The Power of Southern Gothic Healing",
    excerpt:
      "Discover how ancestral wisdom and Southern Gothic traditions can guide your healing journey in the modern world.",
    content: "Southern Gothic healing draws from deep wells of ancestral wisdom...",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    category: "Healing",
    tags: ["southern-gothic", "healing", "ancestral-wisdom"],
    publishedAt: "2024-01-10",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "adhd-entrepreneur-guide",
    title: "Sacred Productivity for ADHD Entrepreneurs",
    excerpt:
      "Gentle strategies for building a sustainable business when your brain works differently - honoring your neurodivergent gifts.",
    content: "As neurodivergent entrepreneurs, we often struggle with traditional productivity advice...",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
    category: "Business",
    tags: ["adhd", "entrepreneurship", "productivity"],
    publishedAt: "2024-01-05",
    readTime: "12 min read",
  },
  {
    id: "digital-products-healing",
    title: "Creating Digital Products That Heal",
    excerpt:
      "How to infuse your digital offerings with genuine healing energy and create products that truly serve your community.",
    content: "Creating digital products isn't just about making money - it's about service...",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Business",
    tags: ["digital-products", "healing", "service"],
    publishedAt: "2024-01-01",
    readTime: "10 min read",
  },
  {
    id: "moon-phase-business",
    title: "Aligning Your Business with Moon Phases",
    excerpt: "Learn to work with lunar energy to optimize your business cycles, launches, and creative flow.",
    content: "The moon has guided human activity for millennia...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    category: "Spiritual Business",
    tags: ["moon-phases", "business", "spiritual"],
    publishedAt: "2023-12-28",
    readTime: "7 min read",
  },
  {
    id: "pet-healing-rituals",
    title: "Sacred Healing Rituals for Your Beloved Pets",
    excerpt:
      "Gentle, loving ways to support your animal companions' wellbeing through energy work and sacred practices.",
    content: "Our beloved pets are sensitive beings who respond beautifully to healing energy...",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop",
    category: "Pet Healing",
    tags: ["pets", "healing", "rituals"],
    publishedAt: "2023-12-25",
    readTime: "6 min read",
  },
]

export default function BlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const categories = ["all", "Welcome", "Healing", "Business", "Spiritual Business", "Pet Healing"]
  
  const filteredPosts = selectedCategory === "all" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory)

  const featuredPosts = BLOG_POSTS.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Header */}
      <div className="bg-gradient-to-b from-midnight-blue to-sage-green/10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-playfair text-4xl md:text-6xl font-bold text-gold mb-6"
            >
              Midnight Musings
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto mb-8"
            >
              Sacred wisdom for healers, entrepreneurs, and seekers on the path of transformation. 
              Welcome to our digital garden of healing insights and business magic.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/shop"
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Explore Sacred Products
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-midnight-blue">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-3xl font-bold text-gold mb-8 text-center">Featured Sacred Wisdom</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-magnolia-white rounded-3xl overflow-hidden shadow-lg hover:shadow-mystical transition-all duration-300 border border-gold/20 group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold/90 text-midnight-blue px-3 py-1 rounded-full text-sm font-montserrat font-bold">
                        ✨ Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-midnight-blue/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                      <span className="bg-sage-green/20 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3 group-hover:text-sage-green transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-lora text-midnight-blue/70 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-sage-green/10 text-sage-green px-2 py-1 rounded font-montserrat">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-midnight-blue border-y border-sage-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-montserrat font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? "bg-sage-green text-midnight-blue shadow-lg"
                    : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-sage-green border border-sage-green/30"
                }`}
              >
                {category === "all" ? "All Sacred Musings" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-magnolia-white rounded-2xl overflow-hidden shadow-sm hover:shadow-mystical transition-all duration-300 border border-transparent hover:border-sage-green/30 group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3 text-sm text-midnight-blue/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="bg-sage-green/20 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat mb-3 inline-block">
                    {post.category}
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-sage-green/10 text-sage-green px-2 py-1 rounded font-montserrat">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue to-sage-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-6">
              Join Our Sacred Circle
            </h2>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8">
              Receive weekly doses of healing wisdom, business magic, and Southern Gothic inspiration 
              delivered directly to your sacred inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.sacred.email@example.com"
                className="flex-1 px-4 py-3 rounded-full border border-sage-green/30 bg-magnolia-white/10 text-magnolia-white placeholder-magnolia-white/60 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
              />
              <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg">
                Join Circle
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-midnight-blue/95 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-magnolia-white rounded-3xl max-w-4xl w-full p-8 border-2 border-gold/20 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200 z-10"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <article>
                <div className="relative aspect-[16/8] overflow-hidden rounded-2xl mb-6">
                  <Image
                    src={selectedPost.image || "/placeholder.svg"}
                    alt={selectedPost.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-midnight-blue/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedPost.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedPost.readTime}
                  </span>
                  <span className="bg-sage-green/20 text-sage-green px-3 py-1 rounded-full text-sm font-montserrat">
                    {selectedPost.category}
                  </span>
                </div>

                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-6">
                  {selectedPost.title}
                </h1>

                <div className="font-lora text-midnight-blue/80 text-lg leading-relaxed mb-6">
                  {selectedPost.content}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag) => (
                    <span key={tag} className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-montserrat">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className\
