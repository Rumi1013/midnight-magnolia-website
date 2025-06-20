"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart, ShoppingBag, Download, Search, X, RefreshCw, Wifi, WifiOff } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"
import { useShopifyProducts } from "@/app/hooks/useShopifyProducts"

// 🌙 Additional digital products to complement Shopify
const DIGITAL_OFFERINGS = [
  {
    id: "digital-001",
    name: "Moon Cycle Manifestation Planner",
    price: 12,
    image: "/placeholder.svg?height=400&width=300&text=Moon+Planner",
    category: "digital",
    subcategory: "Digital Planners",
    description: "PDF planner to align your intentions with lunar cycles for powerful manifestation.",
    tags: ["moon cycles", "manifestation", "PDF", "lunar"],
    downloadable: true,
    isNew: true,
  },
  {
    id: "digital-002",
    name: "Sacred Morning Ritual Cards",
    price: 8,
    image: "/placeholder.svg?height=400&width=300&text=Ritual+Cards",
    category: "digital",
    subcategory: "Digital Tools",
    description: "Printable cards with gentle morning rituals to start your day with intention.",
    tags: ["morning ritual", "printable", "cards", "intention"],
    downloadable: true,
  },
  {
    id: "auto-001",
    name: "Gentle Content Creation System",
    price: 47,
    image: "/placeholder.svg?height=400&width=300&text=Content+System",
    category: "automation",
    subcategory: "Content Systems",
    description: "Notion template + automation for creating healing content without burnout.",
    tags: ["notion", "content creation", "automation", "burnout prevention"],
    isBlessed: true,
  },
]

// 🌿 Sacred categories
const SACRED_CATEGORIES = [
  {
    key: "all",
    label: "All Sacred Offerings",
    icon: "✨",
    description: "Every tool for your healing journey",
  },
  {
    key: "physical",
    label: "Physical Treasures",
    icon: "🌸",
    description: "Tangible items to bless your space",
  },
  {
    key: "digital",
    label: "Digital Sanctuaries",
    icon: "🌙",
    description: "Downloadable tools and templates",
  },
  {
    key: "automation",
    label: "Sacred Systems",
    icon: "⚡",
    description: "Gentle productivity and healing workflows",
  },
] as const

export default function ShopPageClient() {
  // 🌸 Sacred state management
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // 🌙 Connect to Shopify sanctuary
  const {
    products: shopifyProducts,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    connectionStatus,
  } = useShopifyProducts(20)

  // 🌿 Combine Shopify products with digital offerings
  const allOfferings = [
    ...shopifyProducts.map((product) => ({
      ...product,
      category: "physical" as const,
      downloadable: false,
    })),
    ...DIGITAL_OFFERINGS,
  ]

  // 🌸 Load favorites from sacred storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("midnight-magnolia-favorites")
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  // 💝 Toggle favorite with loving energy
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
    localStorage.setItem("midnight-magnolia-favorites", JSON.stringify([...newFavorites]))
  }

  // 🌿 Filter and search with gentle intention
  const filteredOfferings = allOfferings.filter((offering) => {
    const matchesCategory = activeCategory === "all" || offering.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      offering.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offering.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  // 🌙 Sort with sacred order
  const sortedOfferings = [...filteredOfferings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default: // featured
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || (b.isBlessed ? 1 : 0) - (a.isBlessed ? 1 : 0)
    }
  })

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* 🌸 Sacred Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue via-midnight-blue/95 to-midnight-blue/90">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-magnolia-white mb-6">Sacred Shop</h1>
              <p className="font-lora text-xl lg:text-2xl text-magnolia-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
                A curated collection of healing tools, wisdom, and sacred systems. Each offering is crafted with
                intention to support your gentle transformation at your own divine pace.
              </p>

              {/* 🌿 Sacred search */}
              <div className="max-w-md mx-auto relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-midnight-blue/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search sacred offerings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-full bg-magnolia-white text-midnight-blue font-lora
                           placeholder-midnight-blue/60 focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-midnight-blue/60 hover:text-midnight-blue"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 🌙 Sacred Categories */}
        <section className="py-12 bg-magnolia-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category navigation */}
              <nav className="mb-8">
                <ul className="flex flex-wrap justify-center gap-4">
                  {SACRED_CATEGORIES.map((category) => (
                    <li key={category.key}>
                      <button
                        onClick={() => setActiveCategory(category.key)}
                        className={`group relative px-6 py-4 rounded-2xl font-lora text-sm lg:text-base
                                 transition-all duration-300 min-h-[60px] flex flex-col items-center justify-center
                                 ${
                                   activeCategory === category.key
                                     ? "bg-sage-green text-midnight-blue shadow-lg scale-105"
                                     : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:scale-102"
                                 }`}
                      >
                        <span className="text-2xl mb-1" aria-hidden="true">
                          {category.icon}
                        </span>
                        <span className="font-semibold text-center leading-tight">{category.label}</span>

                        {/* Gentle selection indicator */}
                        {activeCategory === category.key && (
                          <motion.div
                            layoutId="category-indicator"
                            className="absolute inset-0 bg-sage-green rounded-2xl -z-10"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sort options */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                  { key: "featured", label: "Featured" },
                  { key: "newest", label: "Newest" },
                  { key: "price-low", label: "Price: Low to High" },
                  { key: "price-high", label: "Price: High to Low" },
                ].map((sort) => (
                  <button
                    key={sort.key}
                    onClick={() => setSortBy(sort.key)}
                    className={`px-4 py-2 rounded-full font-montserrat text-sm transition-all duration-200
                             ${
                               sortBy === sort.key
                                 ? "bg-rich-gold text-midnight-blue"
                                 : "bg-magnolia-white/10 text-magnolia-white hover:bg-magnolia-white/20"
                             }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 🌸 Sacred Offerings Grid */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            {/* Results header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-midnight-blue">Sacred Offerings</h2>
                <div className="flex items-center gap-4">
                  <p className="font-lora text-midnight-blue/70">
                    {loading ? "Loading sacred offerings..." : `${sortedOfferings.length} offerings found`}
                  </p>

                  {/* 🌙 Connection status indicator */}
                  <div className="flex items-center gap-2">
                    {connectionStatus === "connected" && (
                      <div className="flex items-center gap-1 text-sage-green">
                        <Wifi size={16} />
                        <span className="font-montserrat text-sm">Connected</span>
                      </div>
                    )}
                    {connectionStatus === "connecting" && (
                      <div className="flex items-center gap-1 text-rich-gold">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-rich-gold border-t-transparent" />
                        <span className="font-montserrat text-sm">Connecting...</span>
                      </div>
                    )}
                    {connectionStatus === "error" && (
                      <div className="flex items-center gap-1 text-red-500">
                        <WifiOff size={16} />
                        <span className="font-montserrat text-sm">Disconnected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <button
                  onClick={refetch}
                  className="flex items-center gap-2 px-4 py-2 bg-sage-green text-midnight-blue 
                           rounded-full font-montserrat font-semibold hover:bg-sage-green/90 transition-all duration-200"
                >
                  <RefreshCw size={16} />
                  Reconnect
                </button>
              )}
            </div>

            {/* Error state with healing energy */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 bg-sage-green/10 rounded-2xl mb-8"
              >
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">
                  Sacred Connection Temporarily Resting
                </h3>
                <p className="font-lora text-midnight-blue/70 mb-4">
                  Our product spirits are taking a gentle pause. Please try reconnecting in a moment.
                </p>
                <button
                  onClick={refetch}
                  className="px-6 py-3 bg-sage-green text-midnight-blue font-montserrat font-semibold 
                           rounded-full hover:bg-sage-green/90 transition-all duration-200"
                >
                  Reconnect to Sacred Shop
                </button>
              </motion.div>
            )}

            {/* Loading state */}
            {loading && sortedOfferings.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                    <div className="aspect-[4/5] bg-gray-200" />
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded mb-4" />
                      <div className="h-6 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sacred offerings grid */}
            {!loading || sortedOfferings.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {sortedOfferings.map((offering) => (
                    <motion.article
                      key={offering.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-mystical
                               border border-transparent hover:border-sage-green/30 transition-all duration-300
                               h-full flex flex-col"
                    >
                      {/* Product image */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={offering.image || "/placeholder.svg"}
                          alt={`${offering.name} - Sacred offering`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {offering.isBlessed && (
                            <span className="bg-rich-gold text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                              ✨ Blessed
                            </span>
                          )}
                          {offering.isBestseller && (
                            <span className="bg-sage-green text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                              🌟 Bestseller
                            </span>
                          )}
                          {offering.isNew && (
                            <span className="bg-midnight-blue text-magnolia-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                              ✨ New
                            </span>
                          )}
                        </div>

                        {/* Category indicator */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          <span className="bg-magnolia-white/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat">
                            {offering.subcategory}
                          </span>
                          {offering.downloadable && (
                            <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat flex items-center gap-1">
                              <Download size={12} />
                              Digital
                            </span>
                          )}
                        </div>

                        {/* Favorite button */}
                        <button
                          onClick={() => toggleFavorite(offering.id)}
                          className="absolute bottom-3 right-3 p-2 bg-magnolia-white/90 hover:bg-magnolia-white 
                                   rounded-full transition-all duration-200 group/heart"
                          aria-label={`${favorites.has(offering.id) ? "Remove from" : "Add to"} favorites`}
                        >
                          <Heart
                            size={18}
                            className={`transition-all duration-200 ${
                              favorites.has(offering.id)
                                ? "fill-sage-green text-sage-green"
                                : "text-midnight-blue group-hover/heart:text-sage-green"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Product details */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Name */}
                        <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2 leading-tight">
                          {offering.name}
                        </h3>

                        {/* Description */}
                        <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1">
                          {offering.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {offering.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="bg-sage-green/10 text-sage-green px-2 py-1 rounded-full text-xs font-montserrat"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Price and action */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-playfair text-2xl font-bold text-midnight-blue">
                              ${offering.price}
                            </span>
                            {offering.originalPrice && (
                              <span className="font-lora text-sm text-midnight-blue/50 line-through">
                                ${offering.originalPrice}
                              </span>
                            )}
                          </div>

                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-sage-green hover:bg-sage-green/90 
                                     text-midnight-blue font-montserrat font-semibold text-sm rounded-full
                                     transition-all duration-200 hover:shadow-md focus:outline-none 
                                     focus:ring-2 focus:ring-rich-gold focus:ring-offset-2"
                            aria-label={`Add ${offering.name} to cart`}
                          >
                            {offering.downloadable ? <Download size={16} /> : <ShoppingBag size={16} />}
                            <span className="hidden sm:inline">
                              {offering.downloadable ? "Download" : "Add to Cart"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : null}

            {/* Load more for Shopify products */}
            {hasMore && !loading && (
              <div className="text-center mt-12">
                <motion.button
                  onClick={loadMore}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-sage-green hover:bg-sage-green/90 text-midnight-blue
                           font-montserrat font-semibold rounded-full transition-all duration-300
                           hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2"
                >
                  Reveal More Sacred Offerings
                </motion.button>
              </div>
            )}

            {/* Empty state */}
            {sortedOfferings.length === 0 && !loading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">No offerings found</h3>
                <p className="font-lora text-midnight-blue/70 mb-6">
                  Try adjusting your search or exploring a different category, beautiful soul.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                  className="px-6 py-3 bg-sage-green text-midnight-blue font-montserrat font-semibold 
                           rounded-full hover:bg-sage-green/90 transition-all duration-200"
                >
                  View All Offerings
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* 🌙 Sacred Newsletter */}
        <section className="py-20 bg-gradient-to-b from-[#F5EDD6] to-magnolia-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">Join Our Sacred Circle</h2>
              <p className="font-lora text-xl text-midnight-blue/80 mb-8 leading-relaxed">
                Be the first to know when new offerings arrive, plus receive exclusive discounts and healing wisdom for
                your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your sacred email..."
                  className="flex-1 px-6 py-4 rounded-full border border-sage-green/30 
                           focus:outline-none focus:border-sage-green font-lora
                           placeholder-midnight-blue/50"
                />
                <button
                  className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                                 font-montserrat font-semibold px-8 py-4 rounded-full 
                                 transition-all duration-300 hover:shadow-lg"
                >
                  Join Circle
                </button>
              </div>
              <p className="font-lora text-sm text-midnight-blue/60 mt-4">
                We honor your privacy and will never spam you. Unsubscribe with love anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
