"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, Clock, Tag, ChevronRight, BookOpen, Filter, X, Heart, Share2 } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const categories = [
  "All Posts",
  "Ancestral Wisdom",
  "Gentle Productivity",
  "Healing Practices",
  "Southern Gothic",
  "ADHD & Neurodivergence",
  "Ritual & Ceremony",
  "Personal Stories",
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "popular", label: "Most Popular" },
  { value: "longest", label: "Longest Read" },
  { value: "shortest", label: "Quick Reads" },
]

const blogPosts = [
  {
    id: 1,
    title: "Embracing the Shadows: Finding Healing in Southern Gothic Traditions",
    excerpt:
      "Explore how the haunting beauty of Southern Gothic literature and aesthetics can provide a framework for processing trauma and finding peace in the shadows.",
    category: "Southern Gothic",
    author: "Latisha Vincent-Waters",
    date: "June 4, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=800&text=Southern+Gothic",
    featured: true,
    popular: true,
    tags: ["trauma healing", "southern gothic", "literature", "aesthetics"],
    likes: 247,
    comments: 18,
  },
  {
    id: 2,
    title: "The Gentle Revolution: Productivity Systems for Chronically Ill & Neurodivergent Folks",
    excerpt:
      "Traditional productivity systems often fail those with chronic illness or ADHD. Discover gentler approaches that honor your energy levels and unique brain wiring.",
    category: "Gentle Productivity",
    author: "Latisha Vincent-Waters",
    date: "May 28, 2024",
    readTime: "12 min read",
    image: "/placeholder.svg?height=600&width=800&text=Gentle+Productivity",
    featured: true,
    popular: false,
    tags: ["productivity", "adhd", "chronic illness", "neurodivergent"],
    likes: 189,
    comments: 24,
  },
  {
    id: 3,
    title: "Ancestral Kitchen Witchery: Healing Recipes From Black Southern Traditions",
    excerpt:
      "Rediscover the healing power of traditional recipes passed down through generations of Black Southern families, and how cooking can become a sacred ritual.",
    category: "Ancestral Wisdom",
    author: "Latisha Vincent-Waters",
    date: "May 15, 2024",
    readTime: "10 min read",
    image: "/placeholder.svg?height=600&width=800&text=Kitchen+Witchery",
    featured: false,
    popular: true,
    tags: ["ancestral wisdom", "cooking", "ritual", "tradition"],
    likes: 312,
    comments: 31,
  },
  {
    id: 4,
    title: "Moon Phase Rituals: Aligning Your Healing Journey with Lunar Cycles",
    excerpt:
      "Learn how to create simple yet powerful rituals that align with the phases of the moon, helping you set intentions, release what no longer serves you, and celebrate growth.",
    category: "Ritual & Ceremony",
    author: "Latisha Vincent-Waters",
    date: "May 7, 2024",
    readTime: "9 min read",
    image: "/placeholder.svg?height=600&width=800&text=Moon+Rituals",
    featured: false,
    popular: false,
    tags: ["moon phases", "ritual", "intention setting", "healing"],
    likes: 156,
    comments: 12,
  },
  {
    id: 5,
    title: "The ADHD Tax: Financial Wellness Strategies for Neurodivergent Minds",
    excerpt:
      "Managing finances with ADHD presents unique challenges. Discover compassionate approaches to budgeting, bill payment, and financial planning that work with your brain.",
    category: "ADHD & Neurodivergence",
    author: "Latisha Vincent-Waters",
    date: "April 22, 2024",
    readTime: "11 min read",
    image: "/placeholder.svg?height=600&width=800&text=ADHD+Finance",
    featured: false,
    popular: true,
    tags: ["adhd", "finance", "budgeting", "neurodivergent"],
    likes: 203,
    comments: 19,
  },
  {
    id: 6,
    title: "Trauma-Informed Movement: Gentle Practices for Reconnecting with Your Body",
    excerpt:
      "Traditional exercise can be triggering for trauma survivors. Explore gentle, trauma-informed movement practices that help you rebuild a loving relationship with your body.",
    category: "Healing Practices",
    author: "Latisha Vincent-Waters",
    date: "April 10, 2024",
    readTime: "7 min read",
    image: "/placeholder.svg?height=600&width=800&text=Trauma+Movement",
    featured: false,
    popular: false,
    tags: ["trauma healing", "movement", "body connection", "gentle"],
    likes: 134,
    comments: 8,
  },
  {
    id: 7,
    title: "My Journey from Corporate Burnout to Sacred Entrepreneurship",
    excerpt:
      "A personal story of leaving the corporate world behind to build a business aligned with healing, purpose, and ancestral wisdom. The messy, beautiful truth of transformation.",
    category: "Personal Stories",
    author: "Latisha Vincent-Waters",
    date: "March 28, 2024",
    readTime: "15 min read",
    image: "/placeholder.svg?height=600&width=800&text=Personal+Journey",
    featured: true,
    popular: true,
    tags: ["personal story", "entrepreneurship", "burnout", "transformation"],
    likes: 428,
    comments: 47,
  },
  {
    id: 8,
    title: "Creating Digital Altars: Sacred Space in a Virtual World",
    excerpt:
      "In our increasingly digital lives, learn how to create meaningful virtual sacred spaces that support your spiritual practice and healing journey.",
    category: "Ritual & Ceremony",
    author: "Latisha Vincent-Waters",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=800&text=Digital+Altars",
    featured: false,
    popular: false,
    tags: ["digital altar", "sacred space", "virtual ritual", "technology"],
    likes: 98,
    comments: 6,
  },
]

export default function BlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = blogPosts.filter((post) => {
      // Category filter
      if (selectedCategory !== "All Posts" && post.category !== selectedCategory) return false

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category.toLowerCase().includes(query)
        )
      }

      return true
    })

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "popular":
          return b.likes - a.likes
        case "longest":
          return Number.parseInt(b.readTime) - Number.parseInt(a.readTime)
        case "shortest":
          return Number.parseInt(a.readTime) - Number.parseInt(b.readTime)
        default: // newest
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured)

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6"
              >
                Midnight Musings
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Healing wisdom, ancestral stories, and gentle guidance for your journey. Our writings honor the shadows
                while illuminating paths toward wholeness.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 pr-12 rounded-full bg-magnolia-white/10 backdrop-blur-sm border border-magnolia-white/20 text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-sage-green/50 font-lora"
                />
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-magnolia-white/70"
                  size={18}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-magnolia-white/70 hover:text-magnolia-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && searchQuery === "" && selectedCategory === "All Posts" && (
          <section className="py-16 bg-[#0A192F] border-b border-magnolia-white/10">
            <div className="container mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-3xl font-bold text-magnolia-white mb-10"
              >
                Featured Stories
              </motion.h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`} className="block">
                      <div className="relative h-80 overflow-hidden rounded-xl mb-6">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 to-transparent" />

                        {/* Post badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {post.featured && (
                            <span className="bg-gold text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                              FEATURED
                            </span>
                          )}
                          {post.popular && (
                            <span className="bg-sage-green text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                              POPULAR
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-0 left-0 p-6">
                          <span className="inline-block px-4 py-1 rounded-full bg-sage-green/90 text-midnight-blue font-montserrat text-xs font-semibold mb-3">
                            {post.category}
                          </span>
                          <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-2 group-hover:text-sage-green transition-colors duration-300">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-4 text-magnolia-white/70 mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span className="font-lora text-sm">{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span className="font-lora text-sm">{post.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-magnolia-white/60">
                            <div className="flex items-center gap-1">
                              <Heart size={14} />
                              <span className="font-lora text-sm">{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen size={14} />
                              <span className="font-lora text-sm">{post.comments} comments</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Content */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm border border-warm-gray/20"
              >
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-midnight-blue" />
                  <span className="font-montserrat text-midnight-blue">Filters & Categories</span>
                </div>
                <motion.div animate={{ rotate: showFilters ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronRight size={18} className="text-midnight-blue" />
                </motion.div>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Categories & Filters */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`lg:w-1/4 ${
                    showFilters ? "block" : "hidden lg:block"
                  } bg-white p-6 rounded-xl shadow-sm sticky top-24 h-fit`}
                >
                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Categories</h2>
                  <ul className="space-y-2 mb-8">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left py-3 px-4 rounded-lg font-lora transition-all duration-300 ${
                            selectedCategory === category
                              ? "bg-sage-green/20 text-midnight-blue font-semibold border-l-4 border-sage-green"
                              : "text-gray-700 hover:bg-sage-green/10 hover:translate-x-1"
                          }`}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Sort By</h2>
                  <ul className="space-y-2 mb-8">
                    {sortOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          onClick={() => setSortBy(option.value)}
                          className={`w-full text-left py-3 px-4 rounded-lg font-lora transition-all duration-300 ${
                            sortBy === option.value
                              ? "bg-sage-green/20 text-midnight-blue font-semibold border-l-4 border-sage-green"
                              : "text-gray-700 hover:bg-sage-green/10 hover:translate-x-1"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Newsletter Signup */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Join Our Circle</h2>
                    <p className="font-lora text-gray-700 text-sm mb-4">
                      Receive healing wisdom and new articles directly in your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-sage-green font-lora mb-3"
                    />
                    <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                      Subscribe
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Blog Posts Grid */}
              <div className="lg:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                      {selectedCategory}{" "}
                      <span className="font-lora font-normal text-gray-600">({filteredAndSortedPosts.length})</span>
                    </h2>
                    {searchQuery && <p className="font-lora text-gray-600 mt-1">Searching for "{searchQuery}"</p>}
                  </div>
                </div>

                {filteredAndSortedPosts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 rounded-xl text-center shadow-sm"
                  >
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">No articles found</h3>
                    <p className="font-lora text-gray-700 mb-6">
                      {searchQuery
                        ? `No articles match "${searchQuery}". Try different keywords or browse our categories.`
                        : "Try adjusting your category filters to find articles that interest you."}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All Posts")
                        setSortBy("newest")
                      }}
                      className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredAndSortedPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
                      >
                        <Link href={`/blog/${post.id}`} className="block">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Post badges */}
                            <div className="absolute top-4 left-4 flex gap-2">
                              {post.featured && (
                                <span className="bg-gold text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                                  FEATURED
                                </span>
                              )}
                              {post.popular && (
                                <span className="bg-sage-green text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                                  POPULAR
                                </span>
                              )}
                            </div>

                            {/* Action buttons */}
                            <div className="absolute top-4 right-4 flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  toggleLike(post.id)
                                }}
                                className={`p-2 rounded-full shadow-sm transition-all duration-300 ${
                                  likedPosts.includes(post.id)
                                    ? "bg-red-500 text-white"
                                    : "bg-white/80 hover:bg-white text-midnight-blue"
                                }`}
                              >
                                <Heart size={16} className={likedPosts.includes(post.id) ? "fill-current" : ""} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  // Share functionality
                                }}
                                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-all duration-300 text-midnight-blue"
                              >
                                <Share2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Tag size={14} className="text-sage-green" />
                              <span className="font-montserrat text-xs font-semibold text-sage-green">
                                {post.category}
                              </span>
                            </div>

                            <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3 group-hover:text-sage-green transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h3>

                            <p className="font-lora text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  <span className="font-lora text-xs">{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span className="font-lora text-xs">{post.readTime}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Heart size={14} />
                                  <span className="font-lora text-xs">{post.likes}</span>
                                </div>
                                <span className="font-montserrat text-sage-green text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                                  Read More <ChevronRight size={14} />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
