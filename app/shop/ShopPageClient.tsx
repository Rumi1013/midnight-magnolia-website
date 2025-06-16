"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, Heart, Star, ShoppingCart, X, Eye, ArrowRight, Download, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const categories = [
  "All Products",
  "Digital Planners",
  "Healing Journals",
  "Course Bundles",
  "Ritual Tools",
  "Membership Access",
  "1:1 Sessions",
  "Wellness Bundles",
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "bestseller", label: "Best Sellers" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

const products = [
  {
    id: 1,
    name: "The Magnolia Reset Journal",
    description:
      "90-day healing journal with daily prompts that honor your pace and celebrate your progress. Includes sobriety tracking, mood monitoring, and gentle accountability.",
    price: 47,
    originalPrice: 67,
    category: "Healing Journals",
    image: "/healing-journal-cover.png",
    rating: 4.9,
    reviews: 247,
    featured: true,
    bestseller: true,
    tags: ["healing", "sobriety", "self-care", "mindfulness", "digital"],
    inStock: true,
    comingSoon: false,
    type: "digital",
    downloadable: true,
    features: [
      "90 days of guided prompts",
      "Sobriety milestone tracking",
      "Mood & energy monitoring",
      "Weekly reflection pages",
      "Printable or digital use",
      "Bonus meditation audio",
    ],
  },
  {
    id: 2,
    name: "Sacred Productivity Planner",
    description:
      "ADHD-friendly planner with gentle structure for chaotic minds. Includes spoon theory integration, energy tracking, and neurodivergent-friendly layouts.",
    price: 29,
    originalPrice: 39,
    category: "Digital Planners",
    image: "/placeholder.svg?height=400&width=400&text=Sacred+Productivity",
    rating: 4.8,
    reviews: 189,
    featured: true,
    bestseller: false,
    tags: ["adhd", "productivity", "planning", "neurodivergent", "digital"],
    inStock: true,
    comingSoon: false,
    type: "digital",
    downloadable: true,
    features: [
      "Spoon theory tracking",
      "ADHD-friendly layouts",
      "Energy level monitoring",
      "Gentle goal setting",
      "Weekly & monthly views",
      "Customizable templates",
    ],
  },
  {
    id: 3,
    name: "Ancestral Healing Course Bundle",
    description:
      "Complete 8-week course on connecting with ancestral wisdom and healing generational trauma. Includes video lessons, workbooks, and group coaching calls.",
    price: 297,
    originalPrice: 397,
    category: "Course Bundles",
    image: "/placeholder.svg?height=400&width=400&text=Ancestral+Healing",
    rating: 4.9,
    reviews: 156,
    featured: true,
    bestseller: true,
    tags: ["ancestral healing", "trauma", "course", "video", "coaching"],
    inStock: true,
    comingSoon: false,
    type: "course",
    downloadable: false,
    features: [
      "8 weeks of video content",
      "Downloadable workbooks",
      "Live group coaching calls",
      "Private community access",
      "Lifetime access",
      "Certificate of completion",
    ],
  },
  {
    id: 4,
    name: "Midnight Magnolia Membership",
    description:
      "Monthly membership with exclusive content, live sessions, community access, and discounts on all products and services.",
    price: 47,
    originalPrice: null,
    category: "Membership Access",
    image: "/placeholder.svg?height=400&width=400&text=Membership",
    rating: 4.8,
    reviews: 312,
    featured: true,
    bestseller: false,
    tags: ["membership", "community", "exclusive", "monthly", "recurring"],
    inStock: true,
    comingSoon: false,
    type: "subscription",
    downloadable: false,
    features: [
      "Monthly live healing circles",
      "Exclusive digital resources",
      "20% off all products",
      "Private community access",
      "Monthly guest experts",
      "Cancel anytime",
    ],
  },
  {
    id: 5,
    name: "Trauma-Informed Productivity System",
    description:
      "Complete system for gentle productivity that works with trauma responses and chronic illness. Includes planners, trackers, and video tutorials.",
    price: 97,
    originalPrice: 147,
    category: "Wellness Bundles",
    image: "/placeholder.svg?height=400&width=400&text=Productivity+System",
    rating: 4.7,
    reviews: 203,
    featured: false,
    bestseller: true,
    tags: ["trauma-informed", "productivity", "system", "bundle", "video"],
    inStock: true,
    comingSoon: false,
    type: "bundle",
    downloadable: true,
    features: [
      "Complete planner system",
      "Energy tracking tools",
      "Video tutorials",
      "Trauma response guides",
      "Customizable templates",
      "Email support included",
    ],
  },
  {
    id: 6,
    name: "1:1 Ancestral Healing Session",
    description:
      "90-minute personalized session exploring your ancestral lineage and healing generational patterns. Includes pre-session preparation and follow-up resources.",
    price: 197,
    originalPrice: null,
    category: "1:1 Sessions",
    image: "/placeholder.svg?height=400&width=400&text=1on1+Session",
    rating: 5.0,
    reviews: 89,
    featured: true,
    bestseller: false,
    tags: ["1:1", "ancestral", "healing", "session", "personalized"],
    inStock: true,
    comingSoon: false,
    type: "service",
    downloadable: false,
    features: [
      "90-minute virtual session",
      "Pre-session questionnaire",
      "Personalized healing plan",
      "Follow-up resources",
      "Recording provided",
      "30-day email support",
    ],
  },
  {
    id: 7,
    name: "Moon Cycle Ritual Kit",
    description:
      "Complete digital kit for lunar cycle ceremonies. Includes guided meditations, ritual instructions, journal prompts, and printable altar cards.",
    price: 33,
    originalPrice: null,
    category: "Ritual Tools",
    image: "/placeholder.svg?height=400&width=400&text=Moon+Ritual",
    rating: 4.6,
    reviews: 178,
    featured: false,
    bestseller: false,
    tags: ["moon phases", "ritual", "meditation", "digital", "printable"],
    inStock: true,
    comingSoon: false,
    type: "digital",
    downloadable: true,
    features: [
      "4 moon phase rituals",
      "Guided meditation audio",
      "Printable altar cards",
      "Journal prompts",
      "Intention setting guides",
      "Seasonal variations",
    ],
  },
  {
    id: 8,
    name: "Complete Healing Journey Bundle",
    description:
      "Our most comprehensive offering: includes all digital products, 3 months membership, and 2 group coaching sessions. Everything you need for transformation.",
    price: 497,
    originalPrice: 697,
    category: "Wellness Bundles",
    image: "/placeholder.svg?height=400&width=400&text=Complete+Bundle",
    rating: 4.9,
    reviews: 145,
    featured: true,
    bestseller: true,
    tags: ["bundle", "complete", "healing", "value", "transformation"],
    inStock: true,
    comingSoon: false,
    type: "bundle",
    downloadable: true,
    features: [
      "All digital products included",
      "3 months membership access",
      "2 group coaching sessions",
      "Private community access",
      "Lifetime product updates",
      "Payment plan available",
    ],
  },
  {
    id: 9,
    name: "Gentle Business Building Course",
    description:
      "6-week course on building a trauma-informed business that aligns with your values and supports your healing journey. Perfect for sensitive entrepreneurs.",
    price: 197,
    originalPrice: 247,
    category: "Course Bundles",
    image: "/placeholder.svg?height=400&width=400&text=Business+Course",
    rating: 4.8,
    reviews: 94,
    featured: false,
    bestseller: false,
    tags: ["business", "entrepreneurship", "course", "trauma-informed", "gentle"],
    inStock: true,
    comingSoon: false,
    type: "course",
    downloadable: false,
    features: [
      "6 weeks of content",
      "Business planning templates",
      "Marketing for sensitives",
      "Pricing strategies",
      "Community support",
      "Guest expert sessions",
    ],
  },
  {
    id: 10,
    name: "ADHD Entrepreneur Toolkit",
    description:
      "Specialized toolkit for neurodivergent business owners. Includes planning systems, focus techniques, and energy management strategies designed for ADHD brains.",
    price: 67,
    originalPrice: 97,
    category: "Digital Planners",
    image: "/placeholder.svg?height=400&width=400&text=ADHD+Toolkit",
    rating: 4.7,
    reviews: 167,
    featured: false,
    bestseller: true,
    tags: ["adhd", "entrepreneur", "toolkit", "neurodivergent", "business"],
    inStock: true,
    comingSoon: false,
    type: "digital",
    downloadable: true,
    features: [
      "ADHD-friendly planning system",
      "Focus technique guides",
      "Energy management tools",
      "Time blocking templates",
      "Hyperfocus tracking",
      "Burnout prevention guides",
    ],
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
        case "bestseller":
          if (a.bestseller && !b.bestseller) return -1
          if (!a.bestseller && b.bestseller) return 1
          return b.reviews - a.reviews
        case "newest":
          return b.id - a.id
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default: // featured
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.reviews - a.reviews
      }
    })

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getProductIcon = (type: string) => {
    switch (type) {
      case "digital":
        return <Download size={16} className="text-sage-green" />
      case "course":
        return <Play size={16} className="text-sage-green" />
      case "subscription":
        return <Star size={16} className="text-gold" />
      case "service":
        return <Heart size={16} className="text-sage-green" />
      default:
        return <ShoppingCart size={16} className="text-sage-green" />
    }
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
                Sacred Tools for Transformation
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Thoughtfully crafted digital products, courses, and services to support your healing journey. Each
                offering is designed with trauma-informed principles and tested by our community of sensitive souls.
              </motion.p>

              {/* Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Download className="h-6 w-6 text-sage-green mx-auto mb-2" />
                  <p className="font-montserrat text-sm text-magnolia-white">Instant Digital Delivery</p>
                </div>
                <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Heart className="h-6 w-6 text-sage-green mx-auto mb-2" />
                  <p className="font-montserrat text-sm text-magnolia-white">Trauma-Informed Design</p>
                </div>
                <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Star className="h-6 w-6 text-gold mx-auto mb-2" />
                  <p className="font-montserrat text-sm text-magnolia-white">Community Tested</p>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative max-w-xl mx-auto"
              >
                <input
                  type="text"
                  placeholder="Search planners, courses, sessions, bundles..."
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
                    <Card className="bg-magnolia-white/5 backdrop-blur-sm border border-magnolia-white/10 overflow-hidden hover:bg-magnolia-white/10 transition-all duration-300 h-full">
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
                          {product.originalPrice && (
                            <Badge className="bg-red-500 text-white font-montserrat font-bold">
                              SAVE ${product.originalPrice - product.price}
                            </Badge>
                          )}
                        </div>

                        {/* Product Type Icon */}
                        <div className="absolute top-4 right-4 bg-magnolia-white/90 p-2 rounded-full">
                          {getProductIcon(product.type)}
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute bottom-4 right-4 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-300"
                        >
                          <Heart
                            size={18}
                            className={`${wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-midnight-blue"}`}
                          />
                        </button>
                      </div>

                      <CardContent className="p-6 flex flex-col h-full">
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
                          <span className="font-lora text-sm text-magnolia-white/70">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-2 group-hover:text-sage-green transition-colors duration-300">
                          {product.name}
                        </h3>

                        <p className="font-lora text-magnolia-white/80 text-sm mb-4 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        {/* Key Features */}
                        <div className="mb-4">
                          <p className="font-montserrat text-xs text-sage-green font-semibold mb-2">KEY FEATURES:</p>
                          <ul className="text-xs text-magnolia-white/70 space-y-1">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-sage-green rounded-full" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

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

                        <div className="flex gap-2 mt-auto">
                          <Button
                            className="flex-1 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold"
                            disabled={!product.inStock}
                          >
                            {product.type === "subscription"
                              ? "Subscribe"
                              : product.type === "service"
                                ? "Book Now"
                                : product.downloadable
                                  ? "Buy & Download"
                                  : "Enroll Now"}
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
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-sage-green font-lora mb-8"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Price Ranges */}
                <div className="mb-8">
                  <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-4">Price Ranges</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Under $50</span>
                      <span>{products.filter((p) => p.price < 50).length}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>$50 - $100</span>
                      <span>{products.filter((p) => p.price >= 50 && p.price <= 100).length}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>$100 - $200</span>
                      <span>{products.filter((p) => p.price > 100 && p.price <= 200).length}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>$200+</span>
                      <span>{products.filter((p) => p.price > 200).length}</span>
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="pt-8 border-t border-gray-200">
                  <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Stay Connected</h2>
                  <p className="font-lora text-gray-700 text-sm mb-4">
                    Get notified about new products, exclusive discounts, and healing wisdom.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-sage-green font-lora mb-3"
                  />
                  <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg">
                    Subscribe & Save 10%
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredAndSortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group"
                      >
                        <Card className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="flex">
                            <div className="w-1/3 relative h-48">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />

                              {/* Product Type Icon */}
                              <div className="absolute top-2 right-2 bg-white/90 p-1 rounded-full">
                                {getProductIcon(product.type)}
                              </div>
                            </div>

                            <div className="w-2/3 p-4 flex flex-col">
                              {/* Badges */}
                              <div className="flex flex-wrap gap-1 mb-2">
                                {product.bestseller && (
                                  <Badge className="bg-sage-green text-midnight-blue font-montserrat font-bold text-xs">
                                    BESTSELLER
                                  </Badge>
                                )}
                                {product.originalPrice && (
                                  <Badge className="bg-red-500 text-white font-montserrat font-bold text-xs">
                                    SAVE ${product.originalPrice - product.price}
                                  </Badge>
                                )}
                              </div>

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

                              <p className="font-lora text-gray-700 text-sm mb-3 line-clamp-2 flex-grow">
                                {product.description}
                              </p>

                              {/* Key Features */}
                              <div className="mb-3">
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {product.features.slice(0, 2).map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <div className="w-1 h-1 bg-sage-green rounded-full" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex items-center justify-between mb-3">
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
                                  onClick={() => toggleWishlist(product.id)}
                                  className="p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
                                >
                                  <Heart
                                    size={16}
                                    className={`${wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-gray-400"}`}
                                  />
                                </button>
                              </div>

                              <div className="flex gap-2 mt-auto">
                                <Button
                                  className="flex-1 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold text-sm"
                                  disabled={!product.inStock}
                                >
                                  {product.type === "subscription"
                                    ? "Subscribe"
                                    : product.type === "service"
                                      ? "Book"
                                      : product.downloadable
                                        ? "Buy"
                                        : "Enroll"}
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
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">Transformation Stories</h2>
              <p className="font-lora text-xl text-gray-800 leading-relaxed">
                Real results from our community of healing souls
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  product: "The Magnolia Reset Journal",
                  quote:
                    "This journal helped me track my sobriety journey with such gentleness. 6 months clean and counting!",
                  rating: 5,
                  verified: true,
                },
                {
                  name: "Marcus T.",
                  product: "ADHD Entrepreneur Toolkit",
                  quote:
                    "Finally, business tools that work WITH my ADHD brain instead of against it. My productivity has tripled.",
                  rating: 5,
                  verified: true,
                },
                {
                  name: "Luna K.",
                  product: "Ancestral Healing Course",
                  quote:
                    "I've reconnected with my lineage in ways I never thought possible. This course changed my life.",
                  rating: 5,
                  verified: true,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-gold fill-gold" />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge className="bg-sage-green text-midnight-blue font-montserrat font-bold text-xs">
                        VERIFIED PURCHASE
                      </Badge>
                    )}
                  </div>
                  <p className="font-lora text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-montserrat font-semibold text-midnight-blue">{testimonial.name}</p>
                    <p className="font-lora text-sm text-gray-600">{testimonial.product}</p>
                  </div>
                </motion.div>
              ))}
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
                Ready to Begin Your Transformation?
              </h2>
              <p className="font-lora text-xl text-magnolia-white/80 mb-8 leading-relaxed">
                Join thousands of souls who have found healing, productivity, and peace through our trauma-informed
                tools and community support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Book a 1:1 Session
                  </Button>
                </Link>
                <Link href="/community">
                  <Button
                    variant="outline"
                    className="border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Join Our Community
                  </Button>
                </Link>
              </div>

              {/* Money-back guarantee */}
              <div className="mt-8 p-4 bg-magnolia-white/10 backdrop-blur-sm rounded-lg">
                <p className="font-lora text-magnolia-white/80 text-sm">
                  💝 30-day money-back guarantee on all digital products • 🎁 Free shipping on orders over $100 • ⭐
                  4.8/5 average rating from 1,200+ customers
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
