"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Clock, Heart, Share2, BookOpen, Tag } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Gentle Productivity for Chronic Illness",
    excerpt:
      "Discovering sustainable ways to create and accomplish while honoring your energy levels and healing journey. Learn to work with your body's natural rhythms.",
    content:
      "Living with chronic illness requires a complete reimagining of productivity. Traditional productivity advice often feels harsh and unsustainable when you're managing fluctuating energy levels, pain, and the unpredictable nature of chronic conditions...",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Wellness",
    tags: ["productivity", "chronic illness", "energy management"],
    image: "/placeholder.svg?height=400&width=600&text=Gentle+Productivity",
    author: "Midnight Magnolia",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Sacred Rituals for Daily Healing",
    excerpt:
      "Simple, meaningful practices that can transform your daily routine into a sacred healing ritual. Discover the power of intentional moments.",
    content:
      "Healing doesn't always happen in grand gestures or dramatic transformations. Often, it's found in the quiet moments, the gentle rituals we create to honor our journey...",
    date: "December 12, 2024",
    readTime: "7 min read",
    category: "Rituals",
    tags: ["rituals", "healing", "daily practice"],
    image: "/placeholder.svg?height=400&width=600&text=Sacred+Rituals",
    author: "Midnight Magnolia",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Ancestral Wisdom in Modern Times",
    excerpt:
      "How ancient healing practices can support our contemporary wellness journey with grace and intention. Bridging old wisdom with new understanding.",
    content:
      "Our ancestors understood something we're just beginning to remember: healing is not just about fixing what's broken, but about returning to wholeness...",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Wisdom",
    tags: ["ancestral wisdom", "healing", "tradition"],
    image: "/placeholder.svg?height=400&width=600&text=Ancestral+Wisdom",
    author: "Midnight Magnolia",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Creating Your Sacred Space",
    excerpt:
      "Transform any corner of your home into a sanctuary for healing and reflection. Simple steps to create a space that nurtures your soul.",
    content:
      "Your sacred space doesn't need to be elaborate or expensive. It simply needs to be yours—a place where you can breathe, reflect, and reconnect with your inner wisdom...",
    date: "December 8, 2024",
    readTime: "4 min read",
    category: "Home",
    tags: ["sacred space", "home", "sanctuary"],
    image: "/placeholder.svg?height=400&width=600&text=Sacred+Space",
    author: "Midnight Magnolia",
    isFavorite: false,
  },
  {
    id: 5,
    title: "The Art of Gentle Boundaries",
    excerpt:
      "Learning to protect your energy while maintaining compassion. How to set boundaries that honor both yourself and others.",
    content:
      "Boundaries aren't walls—they're sacred thresholds that help us determine what we allow into our energy field and what we choose to keep out...",
    date: "December 5, 2024",
    readTime: "8 min read",
    category: "Wellness",
    tags: ["boundaries", "self-care", "energy protection"],
    image: "/placeholder.svg?height=400&width=600&text=Gentle+Boundaries",
    author: "Midnight Magnolia",
    isFavorite: true,
  },
  {
    id: 6,
    title: "Moon Phases and Healing Cycles",
    excerpt:
      "Aligning your healing journey with lunar cycles for deeper transformation. Understanding the sacred rhythm of renewal.",
    content:
      "The moon has been humanity's timekeeper for millennia, guiding our ancestors through cycles of planting, harvesting, and healing...",
    date: "December 3, 2024",
    readTime: "6 min read",
    category: "Rituals",
    tags: ["moon phases", "cycles", "healing"],
    image: "/placeholder.svg?height=400&width=600&text=Moon+Phases",
    author: "Midnight Magnolia",
    isFavorite: false,
  },
]

const categories = ["All", "Wellness", "Rituals", "Wisdom", "Home"]

export default function BlogPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([2, 5])
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (postId: number) => {
    setFavorites((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="min-h-screen bg-magnolia-white pt-20">
      {/* Header */}
      <section className="bg-midnight-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              The Sacred
              <span className="text-gold"> Garden</span>
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Gentle wisdom and healing words for your transformation journey
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search healing wisdom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-sage-green/20 focus:border-sage-green focus:outline-none font-montserrat"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-montserrat font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-sage-green text-midnight-blue"
                    : "bg-sage-green/20 text-midnight-blue hover:bg-sage-green/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Post Image */}
              <div className="relative aspect-video bg-sage-green/10 flex items-center justify-center">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(post.id)
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(post.id) ? "text-red-500 fill-current" : "text-midnight-blue/60"
                    }`}
                  />
                </button>
              </div>

              {/* Post Info */}
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

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-warm-gray/20 text-midnight-blue/70 font-montserrat text-xs px-2 py-1 rounded-full"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-montserrat text-sm text-midnight-blue/60">By {post.author}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle share functionality
                    }}
                    className="p-2 rounded-full hover:bg-sage-green/10 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-midnight-blue/60" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-sage-green" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">No Healing Words Found</h3>
            <p className="font-lora text-midnight-blue/70 mb-6">Try adjusting your search or browse all categories</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
              View All Posts
            </button>
          </div>
        )}
      </div>

      {/* Full Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-midnight-blue/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-magnolia-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-magnolia-white border-b border-sage-green/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="bg-sage-green/20 text-sage-green font-montserrat text-sm font-semibold px-3 py-1 rounded-full">
                  {selectedPost.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-midnight-blue/60">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="font-montserrat">{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="font-montserrat">{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full hover:bg-sage-green/10 transition-colors"
              >
                <span className="text-2xl text-midnight-blue/60">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <img
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                className="w-full aspect-video object-cover rounded-xl mb-6"
              />

              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-4">
                {selectedPost.title}
              </h1>

              <p className="font-lora text-lg text-midnight-blue/80 mb-6 leading-relaxed">{selectedPost.excerpt}</p>

              <div className="prose prose-lg max-w-none">
                <p className="font-lora text-midnight-blue/80 leading-relaxed">{selectedPost.content}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-sage-green/20">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-sage-green/20 text-sage-green font-montserrat text-sm px-3 py-1 rounded-full"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
