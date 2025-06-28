"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Heart, Search, Tag } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  readTime: string
  date: string
  slug: string
  tags: string[]
  isFeatured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sacred Productivity for Chronic Illness Warriors",
    excerpt: "Discover gentle systems that honor your energy cycles and create sustainable success without burnout.",
    content:
      "Living with chronic illness while building a business requires a completely different approach to productivity...",
    image: "/placeholder.svg?height=300&width=500&text=Sacred+Productivity",
    category: "Wellness",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    slug: "sacred-productivity-chronic-illness",
    tags: ["chronic illness", "productivity", "wellness", "energy management"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "Building Your Digital Sanctuary: A Beginner's Guide",
    excerpt: "Step-by-step guidance for creating an online business that aligns with your values and healing journey.",
    content: "Your digital sanctuary is more than just a website—it's a sacred space where healing happens...",
    image: "/placeholder.svg?height=300&width=500&text=Digital+Sanctuary",
    category: "Business",
    readTime: "12 min read",
    date: "Dec 12, 2024",
    slug: "building-digital-sanctuary",
    tags: ["business", "digital", "sanctuary", "online presence"],
    isFeatured: true,
  },
  {
    id: 3,
    title: "Moon Cycles and Manifestation for Entrepreneurs",
    excerpt: "Harness lunar energy to align your business goals with natural rhythms and ancestral wisdom.",
    content:
      "The moon has guided humanity for millennia, and as spiritual entrepreneurs, we can tap into this ancient wisdom...",
    image: "/placeholder.svg?height=300&width=500&text=Moon+Cycles",
    category: "Spirituality",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    slug: "moon-cycles-manifestation",
    tags: ["moon cycles", "manifestation", "spirituality", "business"],
    isFeatured: false,
  },
  {
    id: 4,
    title: "The Art of Gentle Boundaries in Business",
    excerpt: "Learn to protect your energy while serving your community with love and authenticity.",
    content: "Boundaries aren't walls—they're sacred containers that allow your gifts to flourish...",
    image: "/placeholder.svg?height=300&width=500&text=Gentle+Boundaries",
    category: "Business",
    readTime: "10 min read",
    date: "Dec 8, 2024",
    slug: "gentle-boundaries-business",
    tags: ["boundaries", "business", "energy protection", "authenticity"],
    isFeatured: false,
  },
  {
    id: 5,
    title: "Ancestral Healing for Modern Entrepreneurs",
    excerpt: "Connect with your lineage to heal generational patterns and build wealth with integrity.",
    content: "Our ancestors' dreams live within us, and healing their wounds opens pathways to abundance...",
    image: "/placeholder.svg?height=300&width=500&text=Ancestral+Healing",
    category: "Spirituality",
    readTime: "15 min read",
    date: "Dec 5, 2024",
    slug: "ancestral-healing-entrepreneurs",
    tags: ["ancestral healing", "generational trauma", "wealth", "spirituality"],
    isFeatured: true,
  },
  {
    id: 6,
    title: "Creating Sacred Rituals for Business Success",
    excerpt: "Infuse your work with intention and magic through daily practices that honor your journey.",
    content: "Every successful business is built on rituals—some conscious, some unconscious...",
    image: "/placeholder.svg?height=300&width=500&text=Sacred+Rituals",
    category: "Spirituality",
    readTime: "7 min read",
    date: "Dec 3, 2024",
    slug: "sacred-rituals-business",
    tags: ["rituals", "business", "intention", "magic"],
    isFeatured: false,
  },
]

const categories = ["All", "Wellness", "Business", "Spirituality"]

export default function BlogPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.isFeatured)
  const regularPosts = filteredPosts.filter((post) => !post.isFeatured)

  const toggleFavorite = (postId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(postId)) {
        newFavorites.delete(postId)
      } else {
        newFavorites.add(postId)
      }
      return newFavorites
    })
  }

  return (
    <div className="min-h-screen bg-magnolia-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-midnight-blue mb-6">
            The Sacred <span className="text-sage-green">Garden</span>
          </h1>
          <p className="font-lora text-xl text-midnight-blue/70 max-w-2xl mx-auto">
            Gentle wisdom, healing insights, and practical magic for your entrepreneurial journey
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for wisdom..."
              className="w-full pl-10 pr-4 py-3 border border-warm-gray/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent font-lora"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-sage-green text-midnight-blue"
                    : "bg-white text-midnight-blue/70 hover:bg-sage-green/10 border border-warm-gray/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-8">Featured Wisdom</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-sage-green/90 text-midnight-blue px-3 py-1 rounded-full text-sm font-montserrat font-bold">
                        {post.category}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFavorite(post.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                    >
                      <Heart
                        size={18}
                        className={`${
                          favorites.has(post.id)
                            ? "fill-sage-green text-sage-green"
                            : "text-midnight-blue hover:text-sage-green"
                        } transition-colors duration-200`}
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-midnight-blue/60 text-sm font-montserrat mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="font-playfair text-2xl font-semibold text-midnight-blue mb-3 group-hover:text-sage-green transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="font-lora text-midnight-blue/70 leading-relaxed mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-sage-green/10 text-sage-green text-xs rounded-full font-montserrat"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sage-green hover:text-sage-green/80 font-montserrat font-semibold transition-colors duration-200"
                    >
                      Read Sacred Wisdom →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Posts */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-8">All Wisdom</h2>

          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          {post.category}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(post.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                      >
                        <Heart
                          size={16}
                          className={`${
                            favorites.has(post.id)
                              ? "fill-sage-green text-sage-green"
                              : "text-midnight-blue hover:text-sage-green"
                          } transition-colors duration-200`}
                        />
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 text-midnight-blue/60 text-xs font-montserrat mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-2 line-clamp-2 group-hover:text-sage-green transition-colors duration-200">
                        {post.title}
                      </h3>

                      <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-sage-green/10 text-sage-green text-xs rounded-full font-montserrat"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sage-green hover:text-sage-green/80 font-montserrat font-semibold text-sm transition-colors duration-200"
                      >
                        Read More →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="font-playfair text-2xl text-midnight-blue mb-2">No wisdom found</h3>
                <p className="font-lora text-midnight-blue/60">
                  Try adjusting your search or explore different categories
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  )
}
