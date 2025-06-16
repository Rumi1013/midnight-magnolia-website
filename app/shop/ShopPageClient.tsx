"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, Heart, Star, ShoppingCart, X, Eye, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const categories = [
  "All Products",
  "Digital Planners",
  "Healing Tools",
  "Sacred Jewelry",
  "Ritual Supplies",
  "Wellness Bundles",
  "Courses & Guides",
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

const products = [
  {
    id: 1,
    name: "Gentle Productivity Planner",
    description: "A trauma-informed digital planner designed for chronic illness warriors and neurodivergent minds.",
    price: 47,
    originalPrice: null,
    category: "Digital Planners",
    image: "/placeholder.svg?height=400&width=400&text=Gentle+Planner",
    rating: 4.9,
    reviews: 127,
    featured: true,
    bestseller: true,
    tags: ["ADHD-friendly", "chronic illness", "digital", "productivity"],
    inStock: true,
    comingSoon: false,
  },
  {
    id: 2,
    name: "Ancestral Healing Journal",
    description: "Connect with your lineage through guided prompts and ancestral wisdom practices.",
    price: 33,
    originalPrice: null,
    category: "Digital Planners",
    image: "/placeholder.svg?height=400&width=400&text=Ancestral+Journal",
    rating: 4.8,
    reviews: 89,
    featured: true,
    bestseller: false,
    tags: ["ancestral healing", "journaling", "spiritual", "digital"],
    inStock: true,
    comingSoon: false,
  },
  {
    id: 3,
    name: "Moon Phase Ritual Kit",
    description: "Everything you need for lunar cycle ceremonies, including candles, crystals, and guide.",
    price: 89,
    originalPrice: 120,
    category: "Ritual Supplies",
    image: "/placeholder.svg?height=400&width=400&text=Moon+Kit",
    rating: 4.7,
    reviews: 156,
    featured: false,
    bestseller: true,
    tags: ["moon phases", "ritual", "crystals", "physical"],
    inStock: true,
    comingSoon: false,
  },
  {
    id: 4,
    name: "Southern Gothic Tarot Deck",
    description: "A beautifully illustrated tarot deck celebrating Southern Gothic aesthetics and wisdom.",
    price: 65,
    originalPrice: null,
    category: "Healing Tools",
    image: "/placeholder.svg?height=400&width=400&text=Tarot+Deck",
    rating: 4.9,
    reviews: 203,
    featured: true,
    bestseller: false,
    tags: ["tarot", "southern gothic", "divination", "physical"],
    inStock: false,
    comingSoon: true,
  },
  {
    id: 5,
    name: "Magnolia Moonstone Necklace",
    description: "Handcrafted moonstone pendant on sterling silver chain, blessed for intuition and healing.",
    price: 156,
    originalPrice: null,
    category: "Sacred Jewelry",
    image: "/placeholder.svg?height=400&width=400&text=Moonstone+Necklace",
    rating: 5.0,
    reviews: 67,
    featured: false,
    bestseller: false,
    tags: ["moonstone", "jewelry", "healing", "handcrafted"],
    inStock: true,
    comingSoon: false,
  },
  {
    id: 6,
    name: "Trauma-Informed Yoga Course",
    description: "6-week online course teaching gentle movement practices for trauma survivors.",
    price: 197,
    originalPrice: 247,
    category: "Courses & Guides",
    image: "/placeholder.svg?height=400&width=400&text=Yoga+Course",
    rating: 4.8,
    reviews: 94,
    featured: true,
    bestseller: false,
    tags: ["trauma-informed", "yoga", "course", "movement"],
    inStock: true,
    comingSoon: false,
  },
  {
    id: 7,
    name: "Sage & Sweetgrass Smudge Bundle",
    description: "Ethically sourced sage and sweetgrass for cleansing rituals and energy clearing.",
    price: 28,
    originalPrice: null,
    category: "Ritual Supplies",
    image: "/placeholder.svg?height=400&width=400&text=Smudge+Bundle",
    rating: 4.6,
    reviews: 178,
    featured: false,
    bestseller: true,
    tags: ["sage", "smudging", "cleansing", "ethically sourced"],
    inStock: true,
    comingSoon: false,
  },
  {
    id: 8,
    name: "Complete Healing Bundle",
    description: "Our most popular products bundled together for a comprehensive healing journey.",
    price: 197,
    originalPrice: 267,
    category: "Wellness Bundles",
    image: "/placeholder.svg?height=400&width=400&text=Healing+Bundle",
    rating: 4.9,
    reviews: 145,
    featured: true,
    bestseller: true,
    tags: ["bundle", "complete", "healing", "value"],
    inStock: true,
    comingSoon: false,
  },
]

export default function ShopPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

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
        case "newest":
          return b.id - a.id
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default: // featured
          return b.featured ? 1 : -1
      }
    })

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac fullPage />

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
                Sacred Tools for Healing
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Thoughtfully crafted products to support your journey of healing, growth, and transformation. Each item
                is designed with trauma-informed principles and Southern Gothic grace.
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
                  placeholder="Search for healing tools, planners, courses..."
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

        {/* Featured Products */}
        <section className="py-16 bg-[#0A192F] border-b border-magnolia-white/10">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-3xl font-bold text-magnolia-white mb-10"
            >
              Featured Products
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter((product) => product.featured)
                .slice(0, 3)
                .map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="bg-magnolia-white/5 backdrop-blur-sm border border-magnolia-white/10 overflow-hidden hover:bg-magnolia-white/10 transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.featured && (
                            <Badge className="bg-gold text-midnight-blue font-montserrat font-bold">FEATURED</Badge>
                          )}
                          {product.bestseller && (
                            <Badge className="bg-sage-green text-midnight-blue font-montserrat font-bold">
                              BESTSELLER
                            </Badge>
                          )}
                          {product.comingSoon && (
                            <Badge className="bg-warm-gray text-magnolia-white font-montserrat font-bold">
                              COMING SOON
                            </Badge>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-4 right-4 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-300"
                        >
                          <Heart
                            size={18}
                            className={`${wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-midnight-blue"}`}
                          />
                        </button>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-gray-400"}`}
                              />
                            ))}
                          </div>
                          <span className="font-lora text-sm text-magnolia-white/70">({product.reviews})</span>
                        </div>

                        <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-2 group-hover:text-sage-green transition-colors duration-300">
                          {product.name}
                        </h3>

                        <p className="font-lora text-magnolia-white/80 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-playfair text-2xl font-bold text-magnolia-white">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="font-lora text-sm text-magnolia-white/50 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Badge variant="secondary" className="bg-sage-green/20 text-sage-green">
                            {product.category}
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold"
                            disabled={!product.inStock}
                          >
                            {product.comingSoon ? "Notify Me" : product.inStock ? "Add to Cart" : "Out of Stock"}
                            <ShoppingCart className="ml-2 h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Shop Content */}
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
                  <ArrowRight size={18} className="text-midnight-blue" />
                </motion.div>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"} bg-white p-6 rounded-xl shadow-sm sticky top-24 h-fit`}
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
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-sage-green font-lora"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Newsletter Signup */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Stay Connected</h2>
                  <p className="font-lora text-gray-700 text-sm mb-4">
                    Get notified about new products, sales, and healing wisdom.
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

              {/* Products Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                      {selectedCategory}
                      <span className="font-lora font-normal text-gray-600 ml-2">
                        ({filteredAndSortedProducts.length})
                      </span>
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
                    <div className="text-6xl mb-4">🛍️</div>
                    <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">No products found</h3>
                    <p className="font-lora text-gray-700 mb-6">
                      {searchQuery
                        ? `No products match "${searchQuery}". Try different keywords or browse our categories.`
                        : "Try adjusting your category filters to find products that interest you."}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory("All Products")
                        setSortBy("featured")
                      }}
                      className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                      >
                        <Card className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {product.bestseller && (
                                <Badge className="bg-sage-green text-midnight-blue font-montserrat font-bold text-xs">
                                  BESTSELLER
                                </Badge>
                              )}
                              {product.comingSoon && (
                                <Badge className="bg-warm-gray text-magnolia-white font-montserrat font-bold text-xs">
                                  COMING SOON
                                </Badge>
                              )}
                              {!product.inStock && !product.comingSoon && (
                                <Badge className="bg-red-500 text-white font-montserrat font-bold text-xs">
                                  OUT OF STOCK
                                </Badge>
                              )}
                            </div>

                            {/* Wishlist Button */}
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                            >
                              <Heart
                                size={16}
                                className={`${wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-midnight-blue"}`}
                              />
                            </button>
                          </div>

                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    className={`${i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="font-lora text-xs text-gray-500">({product.reviews})</span>
                            </div>

                            <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300 line-clamp-2">
                              {product.name}
                            </h3>

                            <p className="font-lora text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between mb-4">
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
                            </div>

                            <div className="flex gap-2">
                              <Button
                                className="flex-1 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold text-sm"
                                disabled={!product.inStock}
                              >
                                {product.comingSoon ? "Notify Me" : product.inStock ? "Add to Cart" : "Out of Stock"}
                              </Button>
                              <Link href={`/shop/${product.id}`}>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="font-lora text-xl text-magnolia-white/80 mb-8 leading-relaxed">
                We're always creating new tools for healing and growth. Let us know what would support your journey, and
                we'll consider it for future offerings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Request a Product
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
