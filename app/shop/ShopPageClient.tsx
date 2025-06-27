"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShoppingCart, Heart, Eye, X, Search, Star, Download, Sparkles } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: "digital" | "physical" | "kdp" | "pet" | "artwork"
  type: "instant-download" | "physical-product" | "amazon-book" | "pet-product" | "digital-art"
  tags: string[]
  featured?: boolean
  inStock: boolean
  rating: number
  reviews: number
  deliveryInfo: string
}

const MIDNIGHT_MAGNOLIA_PRODUCTS: Product[] = [
  {
    id: "magnolia-reset-journal",
    name: "The Magnolia Reset 90-Day Journal",
    description: "Sacred transformation through ancestral wisdom and daily reflection practices",
    price: 29,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
    category: "digital",
    type: "instant-download",
    tags: ["healing", "transformation", "journal"],
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 127,
    deliveryInfo: "Instant PDF download",
  },
  {
    id: "midnight-tarot-deck",
    name: "Midnight Messages Tarot Deck",
    description: "Digital tarot deck rooted in Southern Gothic wisdom and healing energy",
    price: 19,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    category: "digital",
    type: "instant-download",
    tags: ["tarot", "divination", "spiritual"],
    featured: true,
    inStock: true,
    rating: 4.8,
    reviews: 89,
    deliveryInfo: "Digital cards + guidebook PDF",
  },
  {
    id: "adhd-sacred-planner",
    name: "Sacred Productivity ADHD Planner",
    description: "Gentle planning system designed for neurodivergent entrepreneurs and healers",
    price: 19,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=500&fit=crop",
    category: "digital",
    type: "instant-download",
    tags: ["adhd", "planning", "productivity"],
    inStock: true,
    rating: 4.9,
    reviews: 156,
    deliveryInfo: "Printable PDF planner",
  },
  {
    id: "rose-quartz-set",
    name: "Rose Quartz Heart Healing Set",
    description: "Hand-selected rose quartz crystals for heart chakra healing and self-love",
    price: 35,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=500&fit=crop",
    category: "physical",
    type: "physical-product",
    tags: ["crystals", "healing", "self-love"],
    inStock: true,
    rating: 4.7,
    reviews: 73,
    deliveryInfo: "Ships in 3-5 business days",
  },
  {
    id: "sacred-herb-bundle",
    name: "Sacred Cleansing Herb Bundle",
    description: "Ethically sourced herbs including sage, lavender, and rosemary for cleansing",
    price: 28,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
    category: "physical",
    type: "physical-product",
    tags: ["herbs", "cleansing", "ritual"],
    inStock: true,
    rating: 4.8,
    reviews: 94,
    deliveryInfo: "Ships in 2-4 business days",
  },
  {
    id: "midnight-candle-set",
    name: "Midnight Moon Ritual Candle Set",
    description: "Hand-poured soy candles infused with essential oils for sacred ceremonies",
    price: 45,
    image: "https://images.unsplash.com/photo-1546878819-a4ce9d29e200?w=400&h=500&fit=crop",
    category: "physical",
    type: "physical-product",
    tags: ["candles", "ritual", "ceremony"],
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 112,
    deliveryInfo: "Ships in 3-5 business days",
  },
]

export default function ShopPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<any[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const filteredProducts = MIDNIGHT_MAGNOLIA_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const handlePurchase = (product: Product) => {
    if (product.type === "amazon-book") {
      window.open(`https://amazon.com/dp/your-book-id-${product.id}`, "_blank")
    } else {
      addToCart(product)
      setIsCartOpen(true)
    }
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* Header */}
      <div className="bg-midnight-blue border-b border-sage-green/20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-4">
              Sacred Midnight Magnolia Collection
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto">
              Transform your creativity into sustainable income with our complete collection of digital products and
              sacred tools
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magnolia-white/60 h-5 w-5" />
              <input
                type="text"
                placeholder="Search sacred offerings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-magnolia-white/10 border border-sage-green/30 rounded-full text-magnolia-white placeholder-magnolia-white/60 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-sage-green hover:bg-sage-green/90 text-midnight-blue px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Sacred Collection
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-midnight-blue text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-midnight-blue py-6 border-b border-sage-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: "all", label: "All Sacred Offerings", icon: "🌙" },
              { key: "digital", label: "Digital Products", icon: "📱" },
              { key: "physical", label: "Sacred Tools", icon: "🕯️" },
              { key: "pet", label: "Pet Blessings", icon: "🐾" },
              { key: "artwork", label: "Digital Art", icon: "🎨" },
              { key: "kdp", label: "Published Books", icon: "📚" },
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full font-montserrat font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category.key
                    ? "bg-sage-green text-midnight-blue shadow-lg"
                    : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-sage-green border border-sage-green/30"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-magnolia-white rounded-2xl overflow-hidden shadow-sm hover:shadow-mystical transition-all duration-300 border border-transparent hover:border-sage-green/30 h-full flex flex-col group"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {product.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                        ✨ Featured
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-midnight-blue/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-magnolia-white/20 backdrop-blur-sm text-magnolia-white p-2 rounded-full hover:bg-magnolia-white/30 transition-colors duration-200"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        favorites.has(product.id)
                          ? "bg-sage-green text-midnight-blue"
                          : "bg-magnolia-white/20 backdrop-blur-sm text-magnolia-white hover:bg-magnolia-white/30"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${favorites.has(product.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-gold text-gold" />
                    <span className="font-montserrat text-sm text-midnight-blue/80">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-2 leading-tight line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-3 flex-1 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-playfair text-xl font-bold text-midnight-blue">${product.price}</span>
                    <span className="px-2 py-1 rounded-full text-xs font-montserrat font-medium bg-blue-500/20 text-blue-700">
                      {product.type === "instant-download" ? "Digital" : "Physical"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-sage-green/20 text-sage-green text-xs rounded font-montserrat"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={!product.inStock}
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    Add to Sacred Collection
                  </button>

                  <div className="mt-2 text-xs text-midnight-blue/60 text-center flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" />
                    {product.deliveryInfo}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="h-16 w-16 text-sage-green/50 mx-auto mb-4" />
              <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No sacred offerings found</h3>
              <p className="font-lora text-magnolia-white/60">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-magnolia-white shadow-2xl z-50"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-sage-green/20 px-6 py-4 bg-midnight-blue">
                  <h2 className="font-playfair text-lg font-semibold text-magnolia-white">Your Sacred Collection</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-magnolia-white/60 hover:text-magnolia-white transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {cart.length === 0 ? (
                    <div className="text-center mt-8">
                      <Sparkles className="h-12 w-12 text-sage-green/50 mx-auto mb-4" />
                      <p className="font-lora text-midnight-blue/60">Your sacred collection awaits</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 bg-sage-green/5 rounded-2xl p-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-playfair text-sm font-medium text-midnight-blue truncate">
                              {item.name}
                            </h3>
                            <p className="font-montserrat text-sm font-bold text-midnight-blue">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-montserrat text-midnight-blue font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-sage-green/20 px-6 py-4 bg-sage-green/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-playfair text-lg font-semibold text-midnight-blue">Sacred Total:</span>
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        alert("Checkout functionality would be implemented here!")
                        setIsCartOpen(false)
                      }}
                      className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-4 rounded-full transition-all duration-300 hover:shadow-lg mb-3"
                    >
                      Begin Sacred Checkout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-midnight-blue/90 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-magnolia-white rounded-3xl max-w-2xl w-full p-6 border-2 border-gold/20"
              >
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 text-midnight-blue/60 hover:text-midnight-blue"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Image
                    src={quickViewProduct.image || "/placeholder.svg"}
                    alt={quickViewProduct.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div>
                    <h2 className="font-playfair text-2xl font-semibold text-midnight-blue mb-3">
                      {quickViewProduct.name}
                    </h2>
                    <p className="font-lora text-midnight-blue/70 mb-4">{quickViewProduct.description}</p>

                    <div className="flex items-center justify-between mb-6">
                      <span className="font-playfair text-3xl font-bold text-midnight-blue">
                        ${quickViewProduct.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-gold text-gold" />
                        <span className="font-montserrat text-sm text-midnight-blue/80">
                          {quickViewProduct.rating} ({quickViewProduct.reviews})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handlePurchase(quickViewProduct)
                        setQuickViewProduct(null)
                      }}
                      className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300"
                    >
                      Add to Sacred Collection
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
