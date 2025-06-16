"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Filter, ChevronDown, Star, Heart, Search, X, Eye } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const categories = [
  "All Products",
  "Journals & Planners",
  "Digital Altars",
  "Ritual Tools",
  "Home Decor",
  "Pet Wellness",
  "Apparel",
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

const products = [
  {
    id: 1,
    name: "The Magnolia Reset Journal",
    category: "Journals & Planners",
    price: 47,
    originalPrice: 67,
    image: "/healing-journal-cover.png",
    rating: 4.9,
    reviews: 124,
    comingSoon: true,
    featured: true,
    bestseller: true,
    description: "90-day healing journal with daily prompts that honor your pace and celebrate your progress.",
    tags: ["healing", "sobriety", "self-care", "mindfulness"],
    inStock: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: "Sacred Productivity Planner",
    category: "Journals & Planners",
    price: 29,
    image: "/placeholder.svg?height=400&width=400&text=Sacred+Productivity",
    rating: 4.8,
    reviews: 86,
    comingSoon: true,
    featured: false,
    bestseller: false,
    description: "ADHD-friendly planner with gentle structure for chaotic minds with spoon theory integration.",
    tags: ["adhd", "productivity", "planning", "neurodivergent"],
    inStock: true,
    stockCount: 23,
  },
  {
    id: 3,
    name: "Midnight Moon Mug",
    category: "Home Decor",
    price: 24,
    image: "/midnight-moon-mug.png",
    rating: 4.7,
    reviews: 53,
    comingSoon: false,
    featured: true,
    bestseller: false,
    description: "Ceramic mug featuring phases of the moon, perfect for your morning ritual or evening tea.",
    tags: ["ceramic", "moon", "ritual", "tea"],
    inStock: true,
    stockCount: 8,
  },
  {
    id: 4,
    name: "Southern Gothic Pillow",
    category: "Home Decor",
    price: 35,
    image: "/southern-gothic-pillow.png",
    rating: 4.6,
    reviews: 42,
    comingSoon: false,
    featured: false,
    bestseller: true,
    description: "Velvet pillow with magnolia and moon phase embroidery for your sacred rest space.",
    tags: ["velvet", "embroidery", "comfort", "decor"],
    inStock: false,
    stockCount: 0,
  },
  {
    id: 5,
    name: "Magnolia Tote Bag",
    category: "Apparel",
    price: 28,
    image: "/magnolia-tote-bag.png",
    rating: 4.8,
    reviews: 37,
    comingSoon: false,
    featured: false,
    bestseller: false,
    description: "Canvas tote featuring our signature magnolia design, perfect for market trips or book hauls.",
    tags: ["canvas", "tote", "sustainable", "magnolia"],
    inStock: true,
    stockCount: 12,
  },
  {
    id: 6,
    name: "Digital Altar Subscription",
    category: "Digital Altars",
    price: 15,
    image: "/placeholder.svg?height=400&width=400&text=Digital+Altar",
    rating: 4.9,
    reviews: 68,
    comingSoon: true,
    featured: true,
    bestseller: false,
    description: "Monthly digital altar with customizable elements, affirmations, and guided meditations.",
    tags: ["digital", "subscription", "meditation", "altar"],
    inStock: true,
    stockCount: 999,
  },
]

export default function ShopPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof products)[0] | null>(null)

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (selectedCategory !== "All Products" && product.category !== selectedCategory) return false

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id
        default: // featured
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          if (a.bestseller && !b.bestseller) return -1
          if (!a.bestseller && b.bestseller) return 1
          return 0
      }
    })

    return filtered
  }, [selectedCategory, sortBy, searchQuery])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
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
                Sacred Shop
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Curated tools for your healing journey, designed with intention and Southern Gothic grace. Each item
                supports your gentle transformation at your own sacred pace.
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
                  placeholder="Search sacred tools..."
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

        {/* Shop Section */}
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
                <ChevronDown
                  size={18}
                  className={`text-midnight-blue transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
                />
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
                  } bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24`}
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

                  {/* Wishlist Summary */}
                  {wishlist.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">
                        Wishlist ({wishlist.length})
                      </h2>
                      <button className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                        View Wishlist
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Product Grid */}
              <div className="lg:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                      {selectedCategory}{" "}
                      <span className="font-lora font-normal text-gray-600">({filteredAndSortedProducts.length})</span>
                    </h2>
                    {searchQuery && <p className="font-lora text-gray-600 mt-1">Searching for "{searchQuery}"</p>}
                  </div>
                </div>

                {filteredAndSortedProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 rounded-xl text-center shadow-sm"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">No products found</h3>
                    <p className="font-lora text-gray-700 mb-6">
                      {searchQuery
                        ? `No products match "${searchQuery}". Try adjusting your search or browse our categories.`
                        : "Try adjusting your category filters to find what you're looking for."}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All Products")
                      }}
                      className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden group relative hover:shadow-lg transition-all duration-300"
                      >
                        {/* Product Badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                          {product.comingSoon && (
                            <span className="bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              COMING SOON
                            </span>
                          )}
                          {product.bestseller && (
                            <span className="bg-red-600 text-white font-montserrat font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              BESTSELLER
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-gray-500 text-white font-montserrat font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                              OUT OF STOCK
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            aria-label="Add to wishlist"
                            className={`p-2 rounded-full shadow-sm transition-all duration-300 ${
                              wishlist.includes(product.id)
                                ? "bg-red-500 text-white"
                                : "bg-white/80 hover:bg-white text-midnight-blue"
                            }`}
                          >
                            <Heart size={18} className={wishlist.includes(product.id) ? "fill-current" : ""} />
                          </button>
                          <button
                            onClick={() => setQuickViewProduct(product)}
                            aria-label="Quick view"
                            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-all duration-300 text-midnight-blue"
                          >
                            <Eye size={18} />
                          </button>
                        </div>

                        {/* Product Image */}
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {product.originalPrice && (
                            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                              SAVE ${product.originalPrice - product.price}
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <div className="flex items-center gap-1 mb-2">
                            <Star size={16} className="text-gold fill-gold" />
                            <span className="font-montserrat text-sm font-semibold text-midnight-blue">
                              {product.rating}
                            </span>
                            <span className="font-montserrat text-xs text-gray-500">({product.reviews})</span>
                          </div>

                          <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-1 group-hover:text-sage-green transition-colors duration-300">
                            {product.name}
                          </h3>
                          <p className="font-lora text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {product.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-playfair text-xl font-bold text-midnight-blue">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="font-lora text-sm text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <button
                              disabled={product.comingSoon || !product.inStock}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full font-montserrat text-sm font-semibold transition-all duration-300 ${
                                product.comingSoon || !product.inStock
                                  ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                                  : "bg-sage-green text-midnight-blue hover:bg-sage-green/90 hover:shadow-md hover:scale-105"
                              }`}
                            >
                              <ShoppingBag size={16} />
                              {product.comingSoon ? "Notify Me" : !product.inStock ? "Out of Stock" : "Add to Cart"}
                            </button>
                          </div>

                          {/* Stock indicator */}
                          {product.inStock && product.stockCount <= 10 && product.stockCount > 0 && (
                            <p className="font-lora text-xs text-red-600 mt-2">
                              Only {product.stockCount} left in stock
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-4xl font-bold text-midnight-blue mb-6"
              >
                Join Our Sacred Circle
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-gray-800 mb-8 leading-relaxed"
              >
                Be the first to know when new products arrive, plus receive exclusive discounts and healing wisdom for
                your journey.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-sage-green font-lora"
                />
                <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Subscribe
                </button>
              </motion.div>
              <p className="font-lora text-sm text-gray-600 mt-4">
                We respect your privacy and will never spam you. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full"
                >
                  <X size={20} />
                </button>
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <Image
                      src={quickViewProduct.image || "/placeholder.svg"}
                      alt={quickViewProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={16} className="text-gold fill-gold" />
                      <span className="font-montserrat text-sm font-semibold text-midnight-blue">
                        {quickViewProduct.rating}
                      </span>
                      <span className="font-montserrat text-xs text-gray-500">({quickViewProduct.reviews})</span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">
                      {quickViewProduct.name}
                    </h3>
                    <p className="font-lora text-gray-700 mb-4">{quickViewProduct.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {quickViewProduct.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-sage-green/10 text-sage-green px-3 py-1 rounded-full text-sm font-montserrat"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">
                        ${quickViewProduct.price}
                      </span>
                      {quickViewProduct.originalPrice && (
                        <span className="font-lora text-lg text-gray-500 line-through">
                          ${quickViewProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      disabled={quickViewProduct.comingSoon || !quickViewProduct.inStock}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 ${
                        quickViewProduct.comingSoon || !quickViewProduct.inStock
                          ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                          : "bg-sage-green text-midnight-blue hover:bg-sage-green/90 hover:shadow-lg"
                      }`}
                    >
                      <ShoppingBag size={18} />
                      {quickViewProduct.comingSoon
                        ? "Notify Me"
                        : !quickViewProduct.inStock
                          ? "Out of Stock"
                          : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
