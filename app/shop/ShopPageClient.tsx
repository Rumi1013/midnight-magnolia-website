"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Search, ChevronDown, X, Heart, ShoppingBag, Star, Filter } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
}

const SACRED_PRODUCTS: Product[] = [
  {
    id: "magnolia-reset-journal",
    name: "The Magnolia Reset 90-Day Journal",
    price: 29,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Journals",
    rating: 4.9,
    reviews: 127,
    inStock: true,
    isNew: true,
  },
  {
    id: "midnight-tarot-deck",
    name: "Midnight Messages Tarot Deck",
    price: 19,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Divination",
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: "adhd-sacred-planner",
    name: "Sacred Productivity ADHD Planner",
    price: 19,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Planners",
    rating: 4.9,
    reviews: 156,
    inStock: true,
  },
  {
    id: "rose-quartz-set",
    name: "Rose Quartz Heart Healing Set",
    price: 35,
    originalPrice: 42,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=500&fit=crop",
    category: "Sacred Tools",
    subcategory: "Crystals",
    rating: 4.7,
    reviews: 73,
    inStock: true,
    isSale: true,
  },
  {
    id: "sacred-herb-bundle",
    name: "Sacred Cleansing Herb Bundle",
    price: 28,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
    category: "Sacred Tools",
    subcategory: "Herbs",
    rating: 4.8,
    reviews: 94,
    inStock: true,
  },
  {
    id: "midnight-candle-set",
    name: "Midnight Moon Ritual Candle Set",
    price: 45,
    image: "https://images.unsplash.com/photo-1546878819-a4ce9d29e200?w=400&h=500&fit=crop",
    category: "Sacred Tools",
    subcategory: "Candles",
    rating: 4.9,
    reviews: 112,
    inStock: true,
    isNew: true,
  },
  {
    id: "entrepreneur-kit",
    name: "Digital Entrepreneur Starter Kit",
    price: 37,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Business",
    rating: 4.8,
    reviews: 203,
    inStock: true,
  },
  {
    id: "pet-blessing-kit",
    name: "Sacred Pet Blessing Kit",
    price: 24,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=500&fit=crop",
    category: "Pet Blessings",
    subcategory: "Healing Kits",
    rating: 4.7,
    reviews: 67,
    inStock: true,
  },
  {
    id: "moon-phase-tracker",
    name: "Moon Phase Ritual Tracker",
    price: 15,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Trackers",
    rating: 4.6,
    reviews: 89,
    inStock: true,
  },
  {
    id: "ancestral-wisdom-cards",
    name: "Ancestral Wisdom Oracle Cards",
    price: 32,
    originalPrice: 38,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Divination",
    rating: 4.9,
    reviews: 145,
    inStock: true,
    isSale: true,
  },
  {
    id: "healing-meditation-bundle",
    name: "Healing Meditation Audio Bundle",
    price: 25,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
    category: "Digital Tools",
    subcategory: "Audio",
    rating: 4.8,
    reviews: 178,
    inStock: true,
  },
  {
    id: "southern-gothic-art-prints",
    name: "Southern Gothic Art Print Collection",
    price: 18,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    category: "Digital Art",
    subcategory: "Prints",
    rating: 4.7,
    reviews: 92,
    inStock: true,
  },
]

const FILTER_CATEGORIES = {
  "Digital Tools": [
    { name: "Journals", count: 3 },
    { name: "Planners", count: 2 },
    { name: "Divination", count: 2 },
    { name: "Business", count: 1 },
    { name: "Trackers", count: 1 },
    { name: "Audio", count: 1 },
  ],
  "Sacred Tools": [
    { name: "Crystals", count: 1 },
    { name: "Herbs", count: 1 },
    { name: "Candles", count: 1 },
  ],
  "Pet Blessings": [{ name: "Healing Kits", count: 1 }],
  "Digital Art": [{ name: "Prints", count: 1 }],
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

export default function ShopPageClient() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [cart, setCart] = useState<Set<string>>(new Set())

  // Filter and sort products
  const filteredProducts = SACRED_PRODUCTS.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) {
      return false
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory],
    )
  }

  const toggleFavorite = (productId: string) => {
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

  const addToCart = (productId: string) => {
    setCart((prev) => new Set([...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-magnolia-white pt-16">
      {/* Free Shipping Banner */}
      <div className="bg-sage-green/20 text-center py-2">
        <p className="font-montserrat text-sm text-midnight-blue">✨ Free shipping on digital orders over $50</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-8 border-b border-sage-green/20">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-midnight-blue mb-2">Sacred Collection</h1>
          <p className="font-lora text-midnight-blue/70">
            Transform your healing journey with our curated digital tools and sacred offerings
          </p>
        </div>

        <div className="flex gap-8 py-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-green/10">
                <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-4">Filter:</h3>

                {/* Category Filters */}
                <div className="space-y-6">
                  {Object.entries(FILTER_CATEGORIES).map(([category, subcategories]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-sage-green border-sage-green/30 rounded focus:ring-sage-green"
                          />
                          <span className="ml-3 font-montserrat font-medium text-midnight-blue">{category}</span>
                        </label>
                      </div>

                      {/* Subcategories */}
                      <div className="ml-7 space-y-2">
                        {subcategories.map((sub) => (
                          <label key={sub.name} className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(sub.name)}
                                onChange={() => toggleSubcategory(sub.name)}
                                className="w-3 h-3 text-sage-green border-sage-green/30 rounded focus:ring-sage-green"
                              />
                              <span className="ml-2 font-montserrat text-sm text-midnight-blue/80">{sub.name}</span>
                            </div>
                            <span className="font-montserrat text-xs text-midnight-blue/60">({sub.count})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Filters */}
                {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedSubcategories([])
                    }}
                    className="w-full mt-6 py-2 px-4 border border-sage-green/30 rounded-full font-montserrat text-sm text-midnight-blue hover:bg-sage-green/10 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-sage-green/30 rounded-full font-montserrat text-sm text-midnight-blue"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              <div className="flex items-center gap-4">
                <span className="font-montserrat text-sm text-midnight-blue/70">
                  {sortedProducts.length} sacred offerings
                </span>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-sage-green/30 rounded-full px-4 py-2 pr-8 font-montserrat text-sm text-midnight-blue focus:outline-none focus:ring-2 focus:ring-sage-green"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-midnight-blue/60 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-sage-green/20"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-sage-green/5">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-sage-green text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-gold text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-midnight-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full transition-colors ${
                          favorites.has(product.id)
                            ? "bg-sage-green text-midnight-blue"
                            : "bg-magnolia-white/90 text-midnight-blue hover:bg-magnolia-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.has(product.id) ? "fill-current" : ""}`} />
                      </button>

                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue p-2 rounded-full transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-gold fill-current" />
                      <span className="font-montserrat text-xs text-midnight-blue/70">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="font-playfair font-semibold text-midnight-blue mb-2 line-clamp-2 text-sm md:text-base">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="font-montserrat font-bold text-midnight-blue">${product.price}</span>
                      {product.originalPrice && (
                        <span className="font-montserrat text-sm text-midnight-blue/50 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-sage-green" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">No Sacred Offerings Found</h3>
                <p className="font-lora text-midnight-blue/70 mb-6">
                  Try adjusting your filters to discover more healing tools
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedSubcategories([])
                  }}
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300"
                >
                  View All Offerings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-blue/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-magnolia-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-xl font-semibold text-midnight-blue">Filter</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-full hover:bg-sage-green/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-midnight-blue" />
                  </button>
                </div>

                {/* Mobile Filter Content - Same as desktop */}
                <div className="space-y-6">
                  {Object.entries(FILTER_CATEGORIES).map(([category, subcategories]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 text-sage-green border-sage-green/30 rounded focus:ring-sage-green"
                          />
                          <span className="ml-3 font-montserrat font-medium text-midnight-blue">{category}</span>
                        </label>
                      </div>

                      <div className="ml-7 space-y-2">
                        {subcategories.map((sub) => (
                          <label key={sub.name} className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(sub.name)}
                                onChange={() => toggleSubcategory(sub.name)}
                                className="w-3 h-3 text-sage-green border-sage-green/30 rounded focus:ring-sage-green"
                              />
                              <span className="ml-2 font-montserrat text-sm text-midnight-blue/80">{sub.name}</span>
                            </div>
                            <span className="font-montserrat text-xs text-midnight-blue/60">({sub.count})</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full mt-8 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
