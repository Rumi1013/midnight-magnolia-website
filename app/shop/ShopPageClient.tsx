"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Search, Filter, Heart, ShoppingBag, Star, Download, Sparkles, ChevronDown } from "lucide-react"
import { useCart } from "@/app/hooks/useCart"

// 🌙 Complete Sacred Product Database
const SACRED_PRODUCTS = [
  // Sacred Home Collection
  {
    id: "southern-gothic-pillow",
    name: "Southern Gothic Throw Pillow",
    description: "Mystical magnolia design on premium velvet, perfect for creating your sacred healing space.",
    category: "sacred-home",
    subcategory: "Comfort & Decor",
    price: 29.99,
    originalPrice: 34.99,
    image: "/southern-gothic-pillow.png",
    images: ["/southern-gothic-pillow.png", "/placeholder.svg?height=400&width=400&text=Pillow+Detail"],
    tags: ["home", "comfort", "magnolia", "velvet", "healing-space"],
    healingNeed: ["spiritual-growth", "comfort"],
    energyLevel: "quick-decision",
    format: "physical",
    inStock: true,
    stockCount: 24,
    isNew: true,
    isBestseller: false,
    accessibility: ["soft-texture", "hypoallergenic"],
    reviews: { rating: 4.8, count: 47 },
  },
  {
    id: "midnight-moon-mug",
    name: "Midnight Moon Ceramic Mug",
    description: "Hand-crafted ceramic mug with crescent moon design, perfect for your morning ritual or evening tea.",
    category: "sacred-home",
    subcategory: "Ritual & Ceremony",
    price: 19.99,
    image: "/elegant-moon-magnolia-mug.png",
    images: ["/elegant-moon-magnolia-mug.png", "/placeholder.svg?height=400&width=400&text=Mug+Detail"],
    tags: ["ceramic", "moon", "ritual", "morning", "tea"],
    healingNeed: ["daily-ritual", "mindfulness"],
    energyLevel: "quick-decision",
    format: "physical",
    inStock: true,
    stockCount: 18,
    isNew: false,
    isBestseller: true,
    accessibility: ["dishwasher-safe", "microwave-safe"],
    reviews: { rating: 4.9, count: 89 },
  },
  {
    id: "magnolia-candleholder",
    name: "Magnolia Bloom Candleholder",
    description:
      "Elegant brass candleholder with magnolia motifs, creates sacred ambiance for meditation and reflection.",
    category: "sacred-home",
    subcategory: "Ritual & Ceremony",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400&text=Candleholder",
    tags: ["brass", "candles", "meditation", "ambiance", "magnolia"],
    healingNeed: ["meditation", "spiritual-growth"],
    energyLevel: "consider-gently",
    format: "physical",
    inStock: true,
    stockCount: 12,
    isNew: false,
    isBestseller: false,
    accessibility: ["stable-base", "easy-cleaning"],
    reviews: { rating: 4.7, count: 23 },
  },

  // Mystical Accessories
  {
    id: "magnolia-tote-bag",
    name: "Magnolia Bloom Tote Bag",
    description:
      "Sustainable canvas tote with hand-drawn magnolia design, perfect for carrying your sacred essentials.",
    category: "mystical-accessories",
    subcategory: "Bags & Carriers",
    price: 34.99,
    image: "/magnolia-tote-bag.png",
    images: ["/magnolia-tote-bag.png", "/placeholder.svg?height=400&width=400&text=Tote+Interior"],
    tags: ["canvas", "sustainable", "magnolia", "tote", "essentials"],
    healingNeed: ["daily-support", "eco-conscious"],
    energyLevel: "quick-decision",
    format: "physical",
    inStock: true,
    stockCount: 31,
    isNew: false,
    isBestseller: true,
    accessibility: ["comfortable-straps", "lightweight"],
    reviews: { rating: 4.8, count: 156 },
  },
  {
    id: "crescent-moon-necklace",
    name: "Crescent Moon Protection Necklace",
    description:
      "Sterling silver crescent moon pendant with protective intentions, handcrafted for your spiritual journey.",
    category: "mystical-accessories",
    subcategory: "Jewelry & Adornment",
    price: 22.99,
    image: "/placeholder.svg?height=400&width=400&text=Moon+Necklace",
    tags: ["sterling-silver", "moon", "protection", "pendant", "spiritual"],
    healingNeed: ["protection", "spiritual-growth"],
    energyLevel: "consider-gently",
    format: "physical",
    inStock: true,
    stockCount: 8,
    isNew: true,
    isBestseller: false,
    accessibility: ["adjustable-chain", "hypoallergenic"],
    reviews: { rating: 4.9, count: 34 },
  },

  // Midnight Menagerie
  {
    id: "mystical-cat-bandana",
    name: "Mystical Cat Bandana",
    description: "Soft cotton bandana with celestial patterns, perfect for your familiar's spiritual style.",
    category: "midnight-menagerie",
    subcategory: "Pet Accessories",
    price: 16.99,
    image: "/mystical-cat-bandana.png",
    images: ["/mystical-cat-bandana.png", "/placeholder.svg?height=400&width=400&text=Bandana+Detail"],
    tags: ["cotton", "celestial", "cat", "bandana", "familiar"],
    healingNeed: ["pet-bonding", "spiritual-connection"],
    energyLevel: "quick-decision",
    format: "physical",
    inStock: true,
    stockCount: 22,
    isNew: false,
    isBestseller: true,
    accessibility: ["soft-fabric", "adjustable-fit"],
    reviews: { rating: 4.7, count: 67 },
  },
  {
    id: "sacred-paws-bowl",
    name: "Sacred Paws Food Bowl",
    description: "Ceramic pet bowl with protective symbols, blessed for your beloved companion's nourishment.",
    category: "midnight-menagerie",
    subcategory: "Feeding & Care",
    price: 22.99,
    image: "/sacred-paws-bowl.png",
    images: ["/sacred-paws-bowl.png", "/placeholder.svg?height=400&width=400&text=Bowl+Bottom"],
    tags: ["ceramic", "protective", "symbols", "pet", "nourishment"],
    healingNeed: ["pet-wellness", "spiritual-protection"],
    energyLevel: "consider-gently",
    format: "physical",
    inStock: true,
    stockCount: 15,
    isNew: false,
    isBestseller: false,
    accessibility: ["non-slip-base", "easy-cleaning"],
    reviews: { rating: 4.6, count: 28 },
  },

  // Healing Journals & Planners
  {
    id: "magnolia-reset-journal-print",
    name: "The Magnolia Reset Journal - Hardcover",
    description:
      "90-day guided healing journal in premium hardcover format, designed for gentle transformation at your own pace.",
    category: "healing-journals",
    subcategory: "Transformation Journals",
    price: 47.0,
    image: "/healing-journal-cover.png",
    images: ["/healing-journal-cover.png", "/placeholder.svg?height=400&width=400&text=Journal+Pages"],
    tags: ["90-day", "guided", "healing", "transformation", "hardcover"],
    healingNeed: ["trauma-recovery", "personal-growth"],
    energyLevel: "guidance-needed",
    format: "physical",
    inStock: true,
    stockCount: 28,
    isNew: false,
    isBestseller: true,
    accessibility: ["large-print-option", "spiral-bound-available"],
    reviews: { rating: 4.9, count: 234 },
  },
  {
    id: "sacred-productivity-planner-print",
    name: "Sacred Productivity Planner - Spiral Bound",
    description:
      "ADHD-friendly planner designed for neurodivergent souls, honoring your natural rhythms and energy cycles.",
    category: "healing-journals",
    subcategory: "ADHD & Neurodivergent",
    price: 29.0,
    image: "/placeholder.svg?height=400&width=400&text=ADHD+Planner",
    tags: ["adhd", "neurodivergent", "productivity", "spiral-bound", "gentle"],
    healingNeed: ["adhd-support", "productivity"],
    energyLevel: "take-your-time",
    format: "physical",
    inStock: true,
    stockCount: 19,
    isNew: true,
    isBestseller: true,
    accessibility: ["adhd-tested", "executive-function-friendly"],
    reviews: { rating: 4.8, count: 167 },
  },

  // Digital Products
  {
    id: "magnolia-reset-journal-digital",
    name: "The Magnolia Reset Journal - Digital PDF",
    description:
      "Instant download PDF version with fillable fields, perfect for digital journaling and immediate access.",
    category: "digital-downloads",
    subcategory: "Digital Journals",
    price: 25.0,
    image: "/healing-journal-cover.png",
    tags: ["pdf", "fillable", "instant-download", "digital", "healing"],
    healingNeed: ["trauma-recovery", "personal-growth"],
    energyLevel: "quick-decision",
    format: "digital",
    inStock: true,
    stockCount: 999,
    isNew: false,
    isBestseller: true,
    accessibility: ["screen-reader-compatible", "fillable-fields"],
    reviews: { rating: 4.8, count: 189 },
    digitalDelivery: "instant",
  },
  {
    id: "notion-templates-bundle",
    name: "Sacred Productivity Notion Templates",
    description: "12 customizable Notion templates for business, wellness, and creative projects with video tutorials.",
    category: "digital-downloads",
    subcategory: "Productivity Templates",
    price: 49.0,
    image: "/placeholder.svg?height=400&width=400&text=Notion+Templates",
    tags: ["notion", "templates", "productivity", "business", "wellness"],
    healingNeed: ["productivity", "business-growth"],
    energyLevel: "guidance-needed",
    format: "digital",
    inStock: true,
    stockCount: 999,
    isNew: true,
    isBestseller: false,
    accessibility: ["video-tutorials", "step-by-step-guides"],
    reviews: { rating: 4.7, count: 92 },
    digitalDelivery: "instant",
    patreonExclusive: true,
  },

  // Business & Automation Tools
  {
    id: "digital-entrepreneur-kit",
    name: "Digital Entrepreneur's Starter Kit",
    description:
      "Complete business foundation package with templates, guides, and automation workflows for spiritual entrepreneurs.",
    category: "business-tools",
    subcategory: "Entrepreneur Resources",
    price: 37.0,
    image: "/placeholder.svg?height=400&width=400&text=Business+Kit",
    tags: ["business", "entrepreneur", "templates", "automation", "spiritual"],
    healingNeed: ["business-growth", "financial-healing"],
    energyLevel: "guidance-needed",
    format: "digital",
    inStock: true,
    stockCount: 999,
    isNew: false,
    isBestseller: true,
    accessibility: ["beginner-friendly", "step-by-step"],
    reviews: { rating: 4.9, count: 145 },
    digitalDelivery: "instant",
  },
]

// 🌸 Sacred Categories
const SACRED_CATEGORIES = [
  {
    key: "all",
    label: "All Sacred Offerings",
    icon: "✨",
    description: "Every tool for your healing journey",
    color: "bg-sage-green",
  },
  {
    key: "sacred-home",
    label: "Sacred Home Collection",
    icon: "🏠",
    description: "Transform your space into a healing sanctuary",
    color: "bg-rich-gold",
  },
  {
    key: "mystical-accessories",
    label: "Mystical Accessories",
    icon: "💫",
    description: "Carry your magic wherever you go",
    color: "bg-purple-600",
  },
  {
    key: "midnight-menagerie",
    label: "Midnight Menagerie",
    icon: "🐱",
    description: "Sacred accessories for your beloved familiars",
    color: "bg-indigo-600",
  },
  {
    key: "healing-journals",
    label: "Healing Journals & Planners",
    icon: "📖",
    description: "Guided tools for transformation and growth",
    color: "bg-emerald-600",
  },
  {
    key: "digital-downloads",
    label: "Digital Downloads",
    icon: "💻",
    description: "Instant access to healing resources",
    color: "bg-cyan-600",
  },
  {
    key: "business-tools",
    label: "Business & Automation",
    icon: "💼",
    description: "Sacred tools for conscious entrepreneurs",
    color: "bg-orange-600",
  },
]

// 🌿 Healing Needs Filter
const HEALING_NEEDS = [
  { key: "all", label: "All Healing Needs", icon: "🌟" },
  { key: "adhd-support", label: "ADHD Support", icon: "🧠" },
  { key: "trauma-recovery", label: "Trauma Recovery", icon: "💚" },
  { key: "spiritual-growth", label: "Spiritual Growth", icon: "🌙" },
  { key: "daily-ritual", label: "Daily Ritual", icon: "☀️" },
  { key: "productivity", label: "Gentle Productivity", icon: "📝" },
  { key: "business-growth", label: "Business Growth", icon: "📈" },
]

// 🌙 Energy Level Filter
const ENERGY_LEVELS = [
  { key: "all", label: "All Energy Levels", icon: "⚡" },
  { key: "quick-decision", label: "Quick Decision", icon: "⚡", description: "Easy choices for low-energy days" },
  { key: "consider-gently", label: "Consider Gently", icon: "🌸", description: "Take your time to decide" },
  { key: "guidance-needed", label: "Guidance Needed", icon: "🤝", description: "Complex choices with support" },
  { key: "take-your-time", label: "Take Your Time", icon: "🕰️", description: "No pressure, explore freely" },
]

export default function ShopPageClient() {
  const [products, setProducts] = useState(SACRED_PRODUCTS)
  const [filteredProducts, setFilteredProducts] = useState(SACRED_PRODUCTS)
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeHealingNeed, setActiveHealingNeed] = useState("all")
  const [activeEnergyLevel, setActiveEnergyLevel] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { addToCart, isInCart } = useCart()

  // 🌸 Filter products based on all criteria
  useEffect(() => {
    let filtered = [...products]

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((product) => product.category === activeCategory)
    }

    // Healing need filter
    if (activeHealingNeed !== "all") {
      filtered = filtered.filter((product) => product.healingNeed?.includes(activeHealingNeed))
    }

    // Energy level filter
    if (activeEnergyLevel !== "all") {
      filtered = filtered.filter((product) => product.energyLevel === activeEnergyLevel)
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => (a.isNew ? -1 : 1))
        break
      case "popular":
        filtered.sort((a, b) => (b.reviews?.count || 0) - (a.reviews?.count || 0))
        break
      case "rating":
        filtered.sort((a, b) => (b.reviews?.rating || 0) - (a.reviews?.rating || 0))
        break
      default: // featured
        filtered.sort((a, b) => (a.isBestseller ? -1 : 1))
    }

    setFilteredProducts(filtered)
  }, [products, activeCategory, activeHealingNeed, activeEnergyLevel, priceRange, searchQuery, sortBy])

  // 💝 Toggle favorite
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

  // 🛍️ Add to sacred collection
  const addToSacredCollection = (product: any) => {
    const cartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      format: product.format,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      digitalDelivery: product.digitalDelivery,
      quantity: 1,
    }
    addToCart(cartItem)
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* 🌙 Mystical Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Floating Magnolia Petals */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-8 h-8 opacity-20"
          >
            <Image src="/magnolia-petal-1.png" alt="" fill className="object-contain" />
          </motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            className="absolute top-32 right-16 w-6 h-6 opacity-15"
          >
            <Image src="/magnolia-petal-2.png" alt="" fill className="object-contain" />
          </motion.div>
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 3, 0] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-20 left-1/4 w-10 h-10 opacity-10"
          >
            <Image src="/magnolia-petal-3.png" alt="" fill className="object-contain" />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              Welcome to Your Sacred Marketplace
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Curated healing tools and sacred offerings designed to support your wellness journey with Southern Gothic
              grace. Every item chosen with intention for your transformation.
            </p>

            {/* Sacred Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-midnight-blue/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="What does your heart need today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-sage-green/30 
                           focus:border-sage-green focus:outline-none bg-magnolia-white/95 
                           font-lora text-midnight-blue placeholder-midnight-blue/60"
                />
              </div>
            </div>

            {/* Gentle Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-magnolia-white/70 font-lora text-sm">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-sage-green" />
                <span>{filteredProducts.length} sacred offerings available</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-rich-gold" />
                <span>147 healing journeys started this month</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-sage-green" />
                <span>4.8 average healing rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌸 Sacred Categories */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {SACRED_CATEGORIES.map((category) => {
              const categoryCount = products.filter((p) => category.key === "all" || p.category === category.key).length
              return (
                <motion.button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-2xl text-center transition-all duration-300 group
                           ${
                             activeCategory === category.key
                               ? "bg-sage-green text-midnight-blue shadow-lg"
                               : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20"
                           }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-lora font-semibold text-sm leading-tight mb-1">{category.label}</div>
                  <div className="text-xs opacity-75">{categoryCount} items</div>
                  <div className="text-xs opacity-60 mt-1 line-clamp-2">{category.description}</div>

                  {activeCategory === category.key && (
                    <motion.div
                      layoutId="category-indicator"
                      className="absolute inset-0 bg-sage-green rounded-2xl -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 🌿 Gentle Filters & Sort */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-magnolia-white/10 text-magnolia-white 
                       rounded-full hover:bg-sage-green/20 transition-colors duration-300"
            >
              <Filter size={18} />
              <span className="font-lora">Gentle Filters</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-magnolia-white/10 text-magnolia-white rounded-full 
                         border border-sage-green/30 focus:border-sage-green focus:outline-none font-lora"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="popular">Most Loved</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="text-magnolia-white/70 font-lora text-sm">{filteredProducts.length} offerings found</div>
            </div>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-magnolia-white/5 rounded-2xl p-6 mb-6 border border-sage-green/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Healing Needs */}
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-3">By Healing Need</h3>
                    <div className="space-y-2">
                      {HEALING_NEEDS.map((need) => (
                        <button
                          key={need.key}
                          onClick={() => setActiveHealingNeed(need.key)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2
                                   ${
                                     activeHealingNeed === need.key
                                       ? "bg-sage-green text-midnight-blue"
                                       : "text-magnolia-white/80 hover:bg-sage-green/10"
                                   }`}
                        >
                          <span>{need.icon}</span>
                          <span className="font-lora text-sm">{need.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Energy Levels */}
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-3">By Energy Level</h3>
                    <div className="space-y-2">
                      {ENERGY_LEVELS.map((level) => (
                        <button
                          key={level.key}
                          onClick={() => setActiveEnergyLevel(level.key)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200
                                   ${
                                     activeEnergyLevel === level.key
                                       ? "bg-sage-green text-midnight-blue"
                                       : "text-magnolia-white/80 hover:bg-sage-green/10"
                                   }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span>{level.icon}</span>
                            <span className="font-lora text-sm font-semibold">{level.label}</span>
                          </div>
                          {level.description && <p className="text-xs opacity-75 ml-6">{level.description}</p>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-magnolia-white/80 font-lora text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full accent-sage-green"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPriceRange([0, 25])}
                          className="px-3 py-2 bg-sage-green/10 text-sage-green rounded-lg hover:bg-sage-green/20 
                                   transition-colors duration-200 font-lora text-sm"
                        >
                          Under $25
                        </button>
                        <button
                          onClick={() => setPriceRange([25, 50])}
                          className="px-3 py-2 bg-sage-green/10 text-sage-green rounded-lg hover:bg-sage-green/20 
                                   transition-colors duration-200 font-lora text-sm"
                        >
                          $25-$50
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ✨ Sacred Products Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-4">No offerings found</h3>
              <p className="font-lora text-magnolia-white/60 mb-8">
                Try adjusting your filters or exploring a different path, beautiful soul.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all")
                  setActiveHealingNeed("all")
                  setActiveEnergyLevel("all")
                  setSearchQuery("")
                  setPriceRange([0, 100])
                }}
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold 
                         px-8 py-4 rounded-full transition-all duration-300"
              >
                Show All Sacred Offerings
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-magnolia-white rounded-3xl overflow-hidden shadow-sm hover:shadow-mystical
                             border border-transparent hover:border-sage-green/30 transition-all duration-300
                             h-full flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.name} - Sacred offering`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Sacred Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                            ✨ New
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-rich-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                            🌟 Beloved
                          </span>
                        )}
                        {product.format === "digital" && (
                          <span className="bg-cyan-500/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold flex items-center gap-1">
                            <Download size={10} />
                            Digital
                          </span>
                        )}
                        {product.patreonExclusive && (
                          <span className="bg-purple-600/90 text-magnolia-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                            👑 Patreon
                          </span>
                        )}
                      </div>

                      {/* Favorite Heart */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-3 right-3 p-2 bg-magnolia-white/80 hover:bg-magnolia-white 
                                 rounded-full transition-all duration-200 group/heart"
                        aria-label={`${favorites.has(product.id) ? "Remove from" : "Add to"} sacred wishlist`}
                      >
                        <Heart
                          size={18}
                          className={`transition-all duration-200 ${
                            favorites.has(product.id)
                              ? "fill-sage-green text-sage-green"
                              : "text-midnight-blue group-hover/heart:text-sage-green"
                          }`}
                        />
                      </button>

                      {/* Energy Level Indicator */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-midnight-blue/80 text-magnolia-white px-2 py-1 rounded-full text-xs font-lora">
                          {ENERGY_LEVELS.find((level) => level.key === product.energyLevel)?.icon}{" "}
                          {ENERGY_LEVELS.find((level) => level.key === product.energyLevel)?.label}
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category & Reviews */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sage-green font-montserrat text-xs font-semibold uppercase tracking-wide">
                          {product.subcategory}
                        </span>
                        {product.reviews && (
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-rich-gold text-rich-gold" />
                            <span className="font-montserrat text-xs text-midnight-blue/70">
                              {product.reviews.rating} ({product.reviews.count})
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Healing Needs Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.healingNeed?.slice(0, 2).map((need) => (
                          <span
                            key={need}
                            className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat"
                          >
                            {HEALING_NEEDS.find((n) => n.key === need)?.label}
                          </span>
                        ))}
                      </div>

                      {/* Accessibility Features */}
                      {product.accessibility && product.accessibility.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-sage-green text-xs">♿</span>
                            <span className="font-montserrat text-xs font-semibold text-sage-green">
                              Accessibility Features:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {product.accessibility.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="bg-sage-green/5 text-sage-green px-2 py-1 rounded text-xs font-lora"
                              >
                                {feature.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-playfair text-2xl font-bold text-midnight-blue">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="font-lora text-sm text-midnight-blue/50 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => addToSacredCollection(product)}
                          disabled={isInCart(product.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full font-montserrat font-semibold text-sm
                                   transition-all duration-200 hover:shadow-md focus:outline-none 
                                   focus:ring-2 focus:ring-rich-gold focus:ring-offset-2
                                   ${
                                     isInCart(product.id)
                                       ? "bg-sage-green/50 text-midnight-blue/70 cursor-not-allowed"
                                       : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue"
                                   }`}
                        >
                          {isInCart(product.id) ? (
                            <>
                              <Sparkles size={16} />
                              In Collection
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={16} />
                              Add to Collection
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* 🌙 Sacred Promise Footer */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-sage-green/10 border border-sage-green/30 rounded-3xl p-8">
            <h3 className="font-playfair text-2xl font-bold text-magnolia-white mb-4">Our Sacred Promise</h3>
            <p className="font-lora text-magnolia-white/80 mb-6 leading-relaxed">
              Every offering in our sacred marketplace is chosen with intention for your healing journey. We honor your
              investment in transformation with our 30-day money-back guarantee and lifetime support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-montserrat font-semibold text-sage-green mb-1">Healing Guarantee</h4>
                <p className="font-lora text-sm text-magnolia-white/70">30-day money-back promise</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-montserrat font-semibold text-sage-green mb-1">Lifetime Support</h4>
                <p className="font-lora text-sm text-magnolia-white/70">We're here for your journey</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🌙</div>
                <h4 className="font-montserrat font-semibold text-sage-green mb-1">Sacred Community</h4>
                <p className="font-lora text-sm text-magnolia-white/70">Join thousands of healing souls</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
