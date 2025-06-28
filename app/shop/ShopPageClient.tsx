"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Grid, List, Star, Heart, ShoppingBag, X } from "lucide-react"

// Product interface
interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  subcategory: string
  description: string
  rating: number
  reviews: number
  tags: string[]
  isDigital: boolean
  isFeatured: boolean
}

// All Midnight Magnolia products
const allProducts: Product[] = [
  {
    id: 1,
    name: "The Magnolia Reset 90-Day Journal",
    price: 29,
    image: "/placeholder.svg?height=400&width=400&text=Sacred+Journal",
    category: "Digital Tools",
    subcategory: "Journals",
    description: "Sacred transformation through ancestral wisdom and daily reflection practices",
    rating: 4.9,
    reviews: 127,
    tags: ["healing", "journaling", "transformation"],
    isDigital: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Midnight Messages Tarot Deck",
    price: 19,
    image: "/placeholder.svg?height=400&width=400&text=Tarot+Deck",
    category: "Digital Tools",
    subcategory: "Divination",
    description: "Digital tarot deck rooted in Southern Gothic wisdom and healing energy",
    rating: 4.8,
    reviews: 89,
    tags: ["tarot", "divination", "spiritual"],
    isDigital: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Sacred Productivity ADHD Planner",
    price: 19,
    image: "/placeholder.svg?height=400&width=400&text=ADHD+Planner",
    category: "Digital Tools",
    subcategory: "Planners",
    description: "Gentle planning system designed for neurodivergent entrepreneurs and healers",
    rating: 4.9,
    reviews: 156,
    tags: ["adhd", "planning", "productivity"],
    isDigital: true,
    isFeatured: false,
  },
  {
    id: 4,
    name: "Rose Quartz Heart Healing Set",
    price: 35,
    image: "/placeholder.svg?height=400&width=400&text=Rose+Quartz",
    category: "Sacred Tools",
    subcategory: "Crystals",
    description: "Hand-selected rose quartz crystals for heart chakra healing and self-love",
    rating: 4.7,
    reviews: 73,
    tags: ["crystals", "healing", "love"],
    isDigital: false,
    isFeatured: false,
  },
  {
    id: 5,
    name: "Sacred Herb Bundle Collection",
    price: 28,
    image: "/placeholder.svg?height=400&width=400&text=Herb+Bundle",
    category: "Sacred Tools",
    subcategory: "Herbs",
    description: "Ethically sourced herbs for cleansing, protection, and sacred ceremonies",
    rating: 4.8,
    reviews: 94,
    tags: ["herbs", "cleansing", "protection"],
    isDigital: false,
    isFeatured: false,
  },
  {
    id: 6,
    name: "Midnight Moon Candle Set",
    price: 45,
    image: "/placeholder.svg?height=400&width=400&text=Moon+Candles",
    category: "Sacred Tools",
    subcategory: "Candles",
    description: "Hand-poured candles infused with lunar energy for sacred ceremonies and rituals",
    rating: 4.9,
    reviews: 112,
    tags: ["candles", "moon", "ritual"],
    isDigital: false,
    isFeatured: true,
  },
  {
    id: 7,
    name: "Digital Entrepreneur Starter Kit",
    price: 37,
    image: "/placeholder.svg?height=400&width=400&text=Business+Kit",
    category: "Digital Tools",
    subcategory: "Business",
    description: "Complete business foundation with authentic marketing strategies for healers",
    rating: 4.8,
    reviews: 203,
    tags: ["business", "marketing", "entrepreneur"],
    isDigital: true,
    isFeatured: false,
  },
  {
    id: 8,
    name: "Sacred Pet Blessing Kit",
    price: 24,
    image: "/placeholder.svg?height=400&width=400&text=Pet+Blessing",
    category: "Sacred Tools",
    subcategory: "Pet Care",
    description: "Healing tools and blessings for your beloved animal companions",
    rating: 4.7,
    reviews: 67,
    tags: ["pets", "blessing", "healing"],
    isDigital: false,
    isFeatured: false,
  },
  {
    id: 9,
    name: "Ancestral Wisdom Oracle Cards",
    price: 22,
    image: "/placeholder.svg?height=400&width=400&text=Oracle+Cards",
    category: "Digital Tools",
    subcategory: "Divination",
    description: "Connect with ancestral guidance through beautifully illustrated oracle cards",
    rating: 4.8,
    reviews: 145,
    tags: ["oracle", "ancestors", "guidance"],
    isDigital: true,
    isFeatured: false,
  },
  {
    id: 10,
    name: "Healing Ritual Bath Salts",
    price: 18,
    image: "/placeholder.svg?height=400&width=400&text=Bath+Salts",
    category: "Sacred Tools",
    subcategory: "Bath & Body",
    description: "Luxurious bath salts infused with healing herbs and essential oils",
    rating: 4.6,
    reviews: 89,
    tags: ["bath", "healing", "relaxation"],
    isDigital: false,
    isFeatured: false,
  },
  {
    id: 11,
    name: "Southern Gothic Art Print Collection",
    price: 15,
    image: "/placeholder.svg?height=400&width=400&text=Art+Prints",
    category: "Digital Tools",
    subcategory: "Art",
    description: "Downloadable art prints featuring Southern Gothic mysticism and magnolia motifs",
    rating: 4.7,
    reviews: 92,
    tags: ["art", "prints", "gothic"],
    isDigital: true,
    isFeatured: false,
  },
  {
    id: 12,
    name: "Chronic Illness Comfort Kit",
    price: 42,
    image: "/placeholder.svg?height=400&width=400&text=Comfort+Kit",
    category: "Sacred Tools",
    subcategory: "Wellness",
    description: "Curated comfort items for managing chronic illness with grace and self-compassion",
    rating: 4.9,
    reviews: 178,
    tags: ["chronic illness", "comfort", "wellness"],
    isDigital: false,
    isFeatured: true,
  },
]

const categories = [
  { name: "All", count: allProducts.length },
  { name: "Digital Tools", count: allProducts.filter((p) => p.category === "Digital Tools").length },
  { name: "Sacred Tools", count: allProducts.filter((p) => p.category === "Sacred Tools").length },
]

const subcategories = [
  "All",
  "Journals",
  "Planners",
  "Divination",
  "Business",
  "Art",
  "Crystals",
  "Herbs",
  "Candles",
  "Bath & Body",
  "Pet Care",
  "Wellness",
]

export default function ShopPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubcategory, setSelectedSubcategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSubcategory = selectedSubcategory === "All" || product.subcategory === selectedSubcategory

      return matchesSearch && matchesCategory && matchesSubcategory
    })

    // Sort products
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedSubcategory, sortBy])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedSubcategory("All")
    setSortBy("featured")
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-midnight-blue mb-4">Sacred Collection</h1>
          <p className="font-lora text-midnight-blue/70 text-lg">
            Discover tools and treasures for your healing journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-warm-gray/20 rounded-lg p-6 sticky top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between mb-4 p-3 border border-warm-gray/20 rounded-lg"
              >
                <span className="font-montserrat font-semibold text-midnight-blue">Filters</span>
                <Filter size={20} className="text-midnight-blue" />
              </button>

              <div className={`${showFilters ? "block" : "hidden"} lg:block space-y-6`}>
                {/* Search */}
                <div>
                  <label className="block font-montserrat font-semibold text-midnight-blue mb-2">Search</label>
                  <div className="relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/40"
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent font-lora"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block font-montserrat font-semibold text-midnight-blue mb-3">Category</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          selectedCategory === category.name
                            ? "bg-sage-green text-midnight-blue"
                            : "text-midnight-blue/70 hover:bg-sage-green/10"
                        }`}
                      >
                        <span className="font-lora">{category.name}</span>
                        <span className="ml-2 text-xs">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                <div>
                  <label className="block font-montserrat font-semibold text-midnight-blue mb-3">Type</label>
                  <div className="space-y-2">
                    {subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                          selectedSubcategory === subcategory
                            ? "bg-sage-green text-midnight-blue"
                            : "text-midnight-blue/70 hover:bg-sage-green/10"
                        }`}
                      >
                        <span className="font-lora">{subcategory}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 border border-warm-gray/30 text-midnight-blue/70 rounded-lg hover:bg-warm-gray/10 transition-colors duration-200 font-lora"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-lora text-midnight-blue/70">{filteredProducts.length} products</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-warm-gray/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-green font-lora text-midnight-blue"
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-warm-gray/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-sage-green text-midnight-blue" : "text-midnight-blue/70 hover:bg-sage-green/10"}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-sage-green text-midnight-blue" : "text-midnight-blue/70 hover:bg-sage-green/10"}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`group bg-white border border-warm-gray/20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      {/* Product Image */}
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes={
                            viewMode === "list" ? "192px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          }
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isFeatured && (
                            <span className="bg-gold text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                              Featured
                            </span>
                          )}
                          <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                            {product.isDigital ? "Digital" : "Physical"}
                          </span>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                        >
                          <Heart
                            size={16}
                            className={`${
                              favorites.has(product.id)
                                ? "fill-sage-green text-sage-green"
                                : "text-midnight-blue hover:text-sage-green"
                            } transition-colors duration-200`}
                          />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex-1">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={14} className="fill-gold text-gold" />
                          <span className="font-montserrat text-sm text-midnight-blue/80">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-2 line-clamp-2">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="font-lora text-midnight-blue/70 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-sage-green/10 text-sage-green text-xs rounded-full font-montserrat"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <span className="font-playfair text-xl font-bold text-midnight-blue">${product.price}</span>
                          <button className="flex items-center gap-2 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-4 py-2 rounded-full transition-colors duration-200">
                            <ShoppingBag size={16} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <div className="text-6xl mb-4">🌸</div>
                  <h3 className="font-playfair text-2xl text-midnight-blue mb-2">No products found</h3>
                  <p className="font-lora text-midnight-blue/60 mb-4">Try adjusting your search or filters</p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-sage-green hover:text-sage-green/80 font-montserrat font-semibold"
                  >
                    <X size={16} />
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
