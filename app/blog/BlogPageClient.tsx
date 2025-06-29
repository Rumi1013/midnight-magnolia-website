"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Calendar, Clock, Heart, Tag } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Gentle Productivity for Chronic Illness Warriors",
    excerpt:
      "Discover how to honor your energy cycles while building a sustainable creative practice that works with your body, not against it.",
    content: "Full blog post content would go here...",
    image: "/placeholder.svg?height=400&width=600&text=Gentle+Productivity",
    category: "Wellness",
    tags: ["chronic illness", "productivity", "self-care"],
    date: "Dec 15, 2024",
    readTime: "8 min read",
    author: "Midnight Magnolia",
    featured: true,
  },
  {
    id: 2,
    title: "Sacred Boundaries: The Art of Saying No with Grace",
    excerpt:
      "Learn to set boundaries that protect your energy while maintaining relationships, rooted in Southern wisdom and ancestral knowing.",
    content: "Full blog post content would go here...",
    image: "/placeholder.svg?height=400&width=600&text=Sacred+Boundaries",
    category: "Mindset",
    tags: ["boundaries", "relationships", "self-care"],
    date: "Dec 12, 2024",
    readTime: "6 min read",
    author: "Midnight Magnolia",
    featured: false,
  },
  {
    id: 3,
    title: "Moon Phases and Business Cycles: Aligning with Natural Rhythms",
    excerpt:
      "Harness the power of lunar cycles to optimize your business strategy and honor your natural creative ebbs and flows.",
    content: "Full blog post content would go here...",
    image: "/placeholder.svg?height=400&width=600&text=Moon+Business",
    category: "Business",
    tags: ["moon phases", "business", "natural rhythms"],
    date: "Dec 10, 2024",
    readTime: "10 min read",
    author: "Midnight Magnolia",
    featured: true,
  },
  {
    id: 4,
    title: "Creating Sacred Space in Small Homes",
    excerpt:
      "Transform any corner of your home into a healing sanctuary, regardless of space constraints or budget limitations.",
    content: "Full blog post content would go here...",
    image: "/placeholder.svg?height=400&width=600&text=Sacred+Space",
    category: "Lifestyle",
    tags: ["sacred space", "home", "ritual"],
    date: "Dec 8, 2024",
    readTime: "7 min read",
    author: "Midnight Magnolia",
    featured: false,
  },
  {
    id: 5,
    title: "The Healing Power of Southern Gothic Aesthetics",
    excerpt:
      "Explore how embracing darkness and beauty can become a powerful tool for processing trauma and finding strength.",
    content: "Full blog post content would go here...",
    image: "/placeholder.svg?height=400&width=600&text=Gothic+Healing",
    category: "Healing",
    tags: ["southern gothic", "aesthetics", "trauma healing"],
    date: "Dec 5, 2024",
    readTime: "9 min read",
    author: "Midnight Magnolia",
    featured: false,
  },
  {
    id: 6,
    title: "Building Community as an Introverted Entrepreneur",
    excerpt:
      "Strategies for creating meaningful connections and building your business community while honoring your introverted nature.",
    content: "Full blog post content would go here...",
    image: "/placeholder.svg?height=400&width=600&text=Introverted+Business",
    category: "Business",
    tags: ["introvert", "community", "entrepreneurship"],
    date: "Dec 3, 2024",
    readTime: "8 min read",
    author: "Midnight Magnolia",
    featured: false,
  },
]

const categories = ["All", "Wellness", "Mindset", "Business", "Lifestyle", "Healing"]

export default function BlogPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])

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
    <div className="min-h-screen bg-magnolia-white pt-16">
      {/* Hero Section */}
      <section className="bg-midnight-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              Sacred
              <span className="text-gold"> Wisdom</span>
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Gentle guidance, ancestral wisdom, and practical magic for your healing journey
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sacred wisdom..."
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

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <div className="mb-16">
            <h2 className="font-playfair text-2xl font-bold text-midnight-blue mb-8">Featured Wisdom</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts
                .filter((post) => post.featured)
                .map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                        <span className="bg-gold/90 text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
                          Featured
                        </span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(post.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(post.id) ? "text-red-500 fill-current" : "text-midnight-blue/60"
                          }`}
                        />
                      </button>
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

                      <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-3 group-hover:text-sage-green transition-colors duration-200">
                        {post.title}
                      </h3>

                      <p className="font-lora text-midnight-blue/70 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center gap-2 mb-4">
                        <Tag className="h-4 w-4 text-sage-green" />
                        <div className="flex gap-2 flex-wrap">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-sage-green/20 text-sage-green text-xs rounded font-montserrat"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-4 rounded-full transition-all duration-300">
                        Read Sacred Wisdom
                      </button>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                <button
                  onClick={() => toggleFavorite(post.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(post.id) ? "text-red-500 fill-current" : "text-midnight-blue/60"
                    }`}
                  />
                </button>
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

                <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-2 line-clamp-2 group-hover:text-sage-green transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="font-lora text-midnight-blue/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-sage-green/20 text-sage-green text-xs rounded font-montserrat"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-2 px-4 rounded-full transition-all duration-300">
                  Read More
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-sage-green" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">No Sacred Wisdom Found</h3>
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
    </div>
  )
}
