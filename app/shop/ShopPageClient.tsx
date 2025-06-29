"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ShoppingBag,
  Heart,
  Eye,
  Plus,
  Minus,
  X,
  Star,
  Check,
  Sparkles,
  Download,
  Package,
  CreditCard,
  Lock,
  Zap,
} from "lucide-react"

// 🌙 Sacred Product Data with Real Pricing
const midnightMagnoliaProducts = {
  healingJournals: [
    {
      id: "magnolia-reset-90",
      name: "The Magnolia Reset 90-Day Journal",
      description:
        "A sacred journey of transformation through ancestral wisdom and daily reflection. Begin your healing with gentle guidance rooted in Southern Gothic grace.",
      prices: { digital: 29, print: 47 },
      originalPrices: { digital: 39, print: 59 },
      formats: ["digital-pdf", "print-softcover"],
      category: "healing-journals",
      tags: ["healing", "transformation", "ancestral-wisdom"],
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      inStock: true,
      featured: true,
      rating: 4.9,
      reviews: 127,
      deliveryTime: "Instant download",
      includes: [
        "90-day guided journal",
        "Daily reflection prompts",
        "Ancestral wisdom quotes",
        "Progress tracking sheets",
      ],
    },
    {
      id: "midnight-tarot-deck",
      name: "Midnight Messages Tarot Deck",
      description:
        "Divination cards rooted in Southern Gothic wisdom and healing energy. Connect with your intuition through sacred symbolism.",
      prices: { digital: 19, print: 33 },
      formats: ["digital-printable", "print-cards"],
      category: "spiritual-tools",
      tags: ["tarot", "divination", "spiritual-guidance"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      inStock: true,
      featured: true,
      rating: 4.8,
      reviews: 89,
      deliveryTime: "Instant download",
      includes: ["78 tarot cards", "Guidebook PDF", "Spread layouts", "Interpretation guide"],
    },
    {
      id: "sacred-productivity-adhd",
      name: "Sacred Productivity ADHD Planner",
      description:
        "Gentle planning system designed for neurodivergent entrepreneurs and healers. Honor your unique rhythm while achieving your dreams.",
      prices: { digital: 19, print: 29 },
      formats: ["digital-pdf", "print-spiral"],
      category: "productivity",
      tags: ["adhd", "planning", "neurodivergent"],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=500&fit=crop",
      inStock: true,
      featured: true,
      rating: 4.9,
      reviews: 156,
      deliveryTime: "Instant download",
      includes: ["Monthly planning pages", "ADHD-friendly layouts", "Energy tracking", "Goal setting worksheets"],
    },
  ],
  businessSuite: [
    {
      id: "digital-entrepreneur-kit",
      name: "Digital Entrepreneur's Starter Kit",
      description:
        "Complete foundation for building sacred business with authentic marketing. Transform your gifts into sustainable income.",
      prices: { digital: 37 },
      originalPrices: { digital: 67 },
      formats: ["digital-bundle"],
      category: "business-tools",
      tags: ["entrepreneurship", "marketing", "business-strategy"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
      inStock: true,
      rating: 4.7,
      reviews: 203,
      deliveryTime: "Instant download",
      includes: [
        "Business plan template",
        "Marketing strategy guide",
        "Brand identity workbook",
        "Social media templates",
      ],
    },
    {
      id: "brand-identity-workbook",
      name: "Brand Identity Workbook",
      description:
        "Discover your authentic brand voice and visual identity with soul-centered exercises. Create a brand that truly represents your sacred mission.",
      prices: { digital: 29 },
      formats: ["digital-pdf"],
      category: "branding",
      tags: ["branding", "identity", "authenticity"],
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=500&fit=crop",
      inStock: true,
      rating: 4.8,
      reviews: 94,
      deliveryTime: "Instant download",
      includes: ["Brand discovery exercises", "Color palette guide", "Typography selection", "Voice & tone worksheets"],
    },
    {
      id: "notion-dashboard-templates",
      name: "Sacred Business Notion Templates",
      description:
        "Complete business management system with healing-centered workflows. Organize your sacred work with intention and grace.",
      prices: { digital: 49 },
      formats: ["notion-templates"],
      category: "productivity",
      tags: ["notion", "templates", "business-management"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop",
      inStock: true,
      rating: 4.9,
      reviews: 78,
      deliveryTime: "Instant download",
      includes: ["Client management system", "Project tracking templates", "Financial dashboard", "Content calendar"],
    },
  ],
  kdpBooks: [
    {
      id: "magnolia-reset-book",
      name: "The Magnolia Reset - Paperback",
      description:
        "Physical book available through Amazon KDP. Hold the sacred wisdom in your hands with this beautifully printed edition.",
      prices: { kdp: 24.99 },
      formats: ["kdp-paperback"],
      category: "books",
      tags: ["healing", "book", "physical"],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      externalLink: "https://amazon.com/dp/your-book-id",
      inStock: true,
      rating: 4.8,
      reviews: 45,
      deliveryTime: "3-5 business days",
    },
    {
      id: "southern-gothic-poetry",
      name: "Southern Gothic Healing Poetry",
      description:
        "Collection of healing verses rooted in ancestral wisdom. Poetry that speaks to the soul and nurtures transformation.",
      prices: { kdp: 18.99 },
      formats: ["kdp-paperback"],
      category: "books",
      tags: ["poetry", "healing", "southern-gothic"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      externalLink: "https://amazon.com/dp/your-book-id",
      inStock: true,
      rating: 4.7,
      reviews: 32,
      deliveryTime: "3-5 business days",
    },
  ],
}

// 🌸 Sacred Shopping Cart Interface
interface CartItem {
  id: string
  productId: string
  format: string
  price: number
  name: string
  description: string
  image: string
  quantity: number
  type: "digital" | "physical" | "kdp"
}

interface SacredProduct {
  id: string
  name: string
  description: string
  prices: Record<string, number>
  originalPrices?: Record<string, number>
  formats: string[]
  category: string
  tags: string[]
  image: string
  inStock: boolean
  featured?: boolean
  rating?: number
  reviews?: number
  deliveryTime?: string
  includes?: string[]
  externalLink?: string
}

export default function ShopPageClient() {
  // 🌙 Sacred State Management
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<SacredProduct | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedFormats, setSelectedFormats] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // 🌸 Get all products in a flat array
  const allProducts: SacredProduct[] = [
    ...midnightMagnoliaProducts.healingJournals,
    ...midnightMagnoliaProducts.businessSuite,
    ...midnightMagnoliaProducts.kdpBooks,
  ]

  // 🌿 Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => {
          if (selectedCategory === "digital") {
            return product.formats.some((format) => format.includes("digital") || format.includes("notion"))
          }
          if (selectedCategory === "physical") {
            return product.formats.some((format) => format.includes("print") || format.includes("kdp"))
          }
          return product.category === selectedCategory
        })

  // 🌙 Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("mm-sacred-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    const savedFavorites = localStorage.getItem("mm-sacred-favorites")
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  // 🌸 Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("mm-sacred-cart", JSON.stringify(cart))
  }, [cart])

  // 🌿 Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("mm-sacred-favorites", JSON.stringify([...favorites]))
  }, [favorites])

  // 💝 Add to Sacred Collection
  const addToSacredCollection = (product: SacredProduct) => {
    const selectedFormat = selectedFormats[product.id] || product.formats[0]
    const price =
      product.prices[selectedFormat.replace("digital-", "").replace("print-", "").replace("kdp-", "kdp")] ||
      product.prices[Object.keys(product.prices)[0]]

    const cartItem: CartItem = {
      id: `${product.id}-${selectedFormat}`,
      productId: product.id,
      format: selectedFormat,
      price: price,
      name: product.name,
      description: product.description,
      image: product.image,
      quantity: 1,
      type:
        selectedFormat.includes("digital") || selectedFormat.includes("notion")
          ? "digital"
          : selectedFormat.includes("kdp")
            ? "kdp"
            : "physical",
    }

    const existingIndex = cart.findIndex((item) => item.id === cartItem.id)
    if (existingIndex > -1) {
      const newCart = [...cart]
      newCart[existingIndex].quantity += 1
      setCart(newCart)
    } else {
      setCart([...cart, cartItem])
    }

    showNotification(`${product.name} added to your sacred collection! ✨`, "success")
  }

  // 🌙 Remove from cart
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  // 🌸 Update quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // 🌿 Toggle favorite
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  // 💫 Calculate cart totals
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // 🌙 Handle format selection
  const handleFormatSelection = (productId: string, format: string) => {
    setSelectedFormats((prev) => ({ ...prev, [productId]: format }))
  }

  // 🌸 Get format label
  const getFormatLabel = (format: string): string => {
    const labels: Record<string, string> = {
      "digital-pdf": "Digital PDF",
      "digital-printable": "Digital Printable",
      "digital-bundle": "Digital Bundle",
      "notion-templates": "Notion Templates",
      "print-softcover": "Print Softcover",
      "print-hardcover": "Print Hardcover",
      "print-spiral": "Print Spiral",
      "print-cards": "Print Cards",
      "kdp-paperback": "Amazon Paperback",
    }
    return labels[format] || format
  }

  // 🌿 Handle purchase
  const handlePurchase = (product: SacredProduct) => {
    if (product.externalLink) {
      window.open(product.externalLink, "_blank")
      return
    }

    addToSacredCollection(product)
    setIsCartOpen(true)
  }

  // 💫 Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification("Your sacred collection is empty", "info")
      return
    }

    setIsCheckoutOpen(true)
    setIsCartOpen(false)
  }

  // 🌙 Show notification
  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
      type === "success"
        ? "bg-sage-green text-midnight-blue"
        : type === "error"
          ? "bg-red-500 text-magnolia-white"
          : "bg-midnight-blue text-magnolia-white border border-sage-green"
    }`
    notification.textContent = message

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.classList.remove("translate-x-full")
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add("translate-x-full")
      setTimeout(() => notification.remove(), 300)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* 🌸 Sacred Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-midnight-blue via-midnight-blue to-sage-green/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">Sacred Shop</h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
              Transform your creativity into sustainable income with healing-centered digital products and sacred tools
            </p>

            {/* 🌙 Cart Status */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Sacred Collection
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rich-gold text-midnight-blue text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌿 Category Filter */}
      <section className="py-8 px-6 bg-midnight-blue/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: "all", label: "All Sacred Offerings", icon: "🌙" },
              { key: "digital", label: "Digital Downloads", icon: "💫" },
              { key: "physical", label: "Physical Products", icon: "📦" },
              { key: "healing-journals", label: "Healing Journals", icon: "📖" },
              { key: "business-tools", label: "Business Tools", icon: "💼" },
              { key: "books", label: "Sacred Books", icon: "📚" },
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-lora font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.key
                    ? "bg-sage-green text-midnight-blue shadow-lg"
                    : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-magnolia-white"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🌸 Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" layout>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-magnolia-white rounded-3xl overflow-hidden shadow-sm hover:shadow-mystical hover:border-sage-green/30 border border-transparent transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.featured && (
                        <span className="bg-rich-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          ✨ Featured
                        </span>
                      )}
                      {product.originalPrices && (
                        <span className="bg-red-500/90 text-magnolia-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          🔥 Sale
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-200"
                    >
                      <Heart
                        size={18}
                        className={`transition-all duration-200 ${
                          favorites.has(product.id)
                            ? "fill-sage-green text-sage-green"
                            : "text-midnight-blue hover:text-sage-green"
                        }`}
                      />
                    </button>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-midnight-blue/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="bg-magnolia-white/20 backdrop-blur-sm text-magnolia-white p-3 rounded-full hover:bg-magnolia-white/30 transition-colors duration-200"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handlePurchase(product)}
                        className="bg-sage-green text-midnight-blue p-3 rounded-full hover:bg-sage-green/90 transition-colors duration-200"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="fill-rich-gold text-rich-gold" />
                        <span className="font-montserrat text-sm text-midnight-blue/80">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    )}

                    {/* Product Name */}
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1">
                      {product.description}
                    </p>

                    {/* Format Selection */}
                    <div className="mb-4">
                      <p className="font-montserrat text-xs font-semibold text-midnight-blue/80 mb-2">Choose Format:</p>
                      <div className="space-y-2">
                        {product.formats.map((format) => {
                          const formatKey = format.replace("digital-", "").replace("print-", "").replace("kdp-", "kdp")
                          const price = product.prices[formatKey] || product.prices[Object.keys(product.prices)[0]]
                          const originalPrice = product.originalPrices?.[formatKey]

                          return (
                            <label key={format} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`format-${product.id}`}
                                value={format}
                                checked={
                                  selectedFormats[product.id] === format ||
                                  (!selectedFormats[product.id] && format === product.formats[0])
                                }
                                onChange={() => handleFormatSelection(product.id, format)}
                                className="text-sage-green focus:ring-sage-green"
                              />
                              <span className="font-lora text-sm text-midnight-blue flex-1">
                                {getFormatLabel(format)}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="font-playfair font-bold text-midnight-blue">${price}</span>
                                {originalPrice && (
                                  <span className="font-lora text-xs text-midnight-blue/50 line-through">
                                    ${originalPrice}
                                  </span>
                                )}
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="mb-4 text-xs text-midnight-blue/60 flex items-center gap-1">
                      {product.formats.some((f) => f.includes("digital")) ? (
                        <>
                          <Download size={12} />
                          <span>Instant download</span>
                        </>
                      ) : (
                        <>
                          <Package size={12} />
                          <span>{product.deliveryTime}</span>
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => handlePurchase(product)}
                        className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                      >
                        {product.externalLink ? (
                          <>
                            <Package size={16} />
                            View on Amazon
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} />
                            Add to Sacred Collection
                          </>
                        )}
                      </button>
                    </div>

                    {/* Product Tags */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-sage-green/10 text-sage-green text-xs rounded-full font-montserrat"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No offerings found</h3>
              <p className="font-lora text-magnolia-white/60">Try exploring a different category, beautiful soul.</p>
            </div>
          )}
        </div>
      </section>

      {/* 🌙 Sacred Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-40"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-magnolia-white shadow-2xl z-50 flex flex-col"
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-sage-green/20 px-6 py-4 bg-sage-green/5">
                <h2 className="font-playfair text-xl font-semibold text-midnight-blue">Your Sacred Collection</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag size={48} className="text-midnight-blue/30 mx-auto mb-4" />
                    <p className="font-lora text-midnight-blue/60">Your sacred collection is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 font-montserrat text-sage-green hover:text-sage-green/80 transition-colors duration-200"
                    >
                      Continue exploring →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 bg-sage-green/5 rounded-2xl p-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-playfair font-semibold text-midnight-blue text-sm leading-tight mb-1">
                            {item.name}
                          </h3>
                          <p className="font-lora text-xs text-midnight-blue/60 mb-2">{getFormatLabel(item.format)}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-sage-green/20 text-midnight-blue flex items-center justify-center hover:bg-sage-green/30 transition-colors duration-200"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-montserrat font-semibold text-midnight-blue w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-sage-green/20 text-midnight-blue flex items-center justify-center hover:bg-sage-green/30 transition-colors duration-200"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="font-playfair font-bold text-midnight-blue">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-600 transition-colors duration-200 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-sage-green/20 px-6 py-4 bg-sage-green/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-playfair text-lg font-semibold text-midnight-blue">Sacred Total:</span>
                    <span className="font-playfair text-2xl font-bold text-midnight-blue">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-6 rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} />
                    Begin Sacred Checkout
                  </button>

                  {/* Trust Signals */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-midnight-blue/60">
                      <Lock size={12} />
                      <span>Secure checkout protected by Stripe</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-midnight-blue/60">
                      <Zap size={12} />
                      <span>Instant digital delivery to your email</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-midnight-blue/60">
                      <Sparkles size={12} />
                      <span>Lifetime access to all digital products</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🌸 Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight-blue/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-magnolia-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-2">
                      {quickViewProduct.name}
                    </h2>
                    {quickViewProduct.rating && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-rich-gold text-rich-gold" />
                          <span className="font-montserrat text-sm text-midnight-blue/80">
                            {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                      src={quickViewProduct.image || "/placeholder.svg"}
                      alt={quickViewProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <p className="font-lora text-midnight-blue/80 leading-relaxed mb-6">
                      {quickViewProduct.description}
                    </p>

                    {/* What's Included */}
                    {quickViewProduct.includes && (
                      <div className="mb-6">
                        <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-3">
                          What's Included:
                        </h3>
                        <ul className="space-y-2">
                          {quickViewProduct.includes.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 font-lora text-sm text-midnight-blue/70">
                              <Check size={16} className="text-sage-green flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Format Selection */}
                    <div className="mb-6">
                      <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-3">
                        Choose Your Format:
                      </h3>
                      <div className="space-y-3">
                        {quickViewProduct.formats.map((format) => {
                          const formatKey = format.replace("digital-", "").replace("print-", "").replace("kdp-", "kdp")
                          const price =
                            quickViewProduct.prices[formatKey] ||
                            quickViewProduct.prices[Object.keys(quickViewProduct.prices)[0]]
                          const originalPrice = quickViewProduct.originalPrices?.[formatKey]

                          return (
                            <label
                              key={format}
                              className="flex items-center gap-3 p-3 border border-sage-green/20 rounded-xl hover:bg-sage-green/5 cursor-pointer transition-colors duration-200"
                            >
                              <input
                                type="radio"
                                name={`quickview-format-${quickViewProduct.id}`}
                                value={format}
                                defaultChecked={format === quickViewProduct.formats[0]}
                                className="text-sage-green focus:ring-sage-green"
                              />
                              <div className="flex-1">
                                <p className="font-montserrat font-semibold text-midnight-blue">
                                  {getFormatLabel(format)}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-playfair text-xl font-bold text-midnight-blue">${price}</span>
                                  {originalPrice && (
                                    <span className="font-lora text-sm text-midnight-blue/50 line-through">
                                      ${originalPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          handlePurchase(quickViewProduct)
                          setQuickViewProduct(null)
                        }}
                        className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-6 rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={20} />
                        Add to Sacred Collection
                      </button>

                      <button
                        onClick={() => toggleFavorite(quickViewProduct.id)}
                        className={`w-full border-2 font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                          favorites.has(quickViewProduct.id)
                            ? "border-sage-green bg-sage-green text-midnight-blue"
                            : "border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue"
                        }`}
                      >
                        <Heart size={18} className={favorites.has(quickViewProduct.id) ? "fill-current" : ""} />
                        {favorites.has(quickViewProduct.id) ? "Saved to Favorites" : "Save to Favorites"}
                      </button>
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-6 p-4 bg-sage-green/10 rounded-xl">
                      <div className="flex items-center gap-2 text-sm text-midnight-blue/70">
                        {quickViewProduct.formats.some((f) => f.includes("digital")) ? (
                          <>
                            <Download size={16} className="text-sage-green" />
                            <span>Instant download after purchase</span>
                          </>
                        ) : (
                          <>
                            <Package size={16} className="text-sage-green" />
                            <span>Ships in {quickViewProduct.deliveryTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌿 Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight-blue/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-magnolia-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-2">
                      Complete Your Sacred Purchase
                    </h2>
                    <p className="font-lora text-midnight-blue/70">
                      You're one step away from beginning your transformation journey
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Order Summary */}
                <div className="bg-sage-green/10 rounded-2xl p-6 mb-8">
                  <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-montserrat font-semibold text-midnight-blue text-sm">{item.name}</p>
                          <p className="font-lora text-xs text-midnight-blue/60">
                            {getFormatLabel(item.format)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-playfair font-bold text-midnight-blue">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="border-t border-sage-green/20 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-playfair text-lg font-semibold text-midnight-blue">Total:</span>
                        <span className="font-playfair text-2xl font-bold text-midnight-blue">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-montserrat font-semibold text-midnight-blue mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent font-lora"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block font-montserrat font-semibold text-midnight-blue mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent font-lora"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-montserrat font-semibold text-midnight-blue mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-sage-green/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent font-lora"
                      placeholder="your.sacred.email@example.com"
                    />
                  </div>

                  {/* Payment Section Placeholder */}
                  <div className="bg-sage-green/5 rounded-2xl p-6">
                    <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-4">Payment Information</h3>
                    <div className="bg-magnolia-white border-2 border-dashed border-sage-green/30 rounded-xl p-8 text-center">
                      <CreditCard size={48} className="text-sage-green mx-auto mb-4" />
                      <p className="font-lora text-midnight-blue/70 mb-2">Stripe Payment Integration</p>
                      <p className="font-montserrat text-xs text-midnight-blue/50">
                        Secure payment processing will be integrated here
                      </p>
                    </div>
                  </div>

                  {/* Complete Purchase Button */}
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      showNotification("Payment integration coming soon! Your sacred products await. ✨", "info")
                    }}
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-6 rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock size={20} />
                    Complete Sacred Purchase
                  </button>

                  {/* Trust Message */}
                  <div className="text-center">
                    <p className="font-lora text-sm text-midnight-blue/70 leading-relaxed">
                      By completing this purchase, you're investing in your sacred transformation journey. All digital
                      products include lifetime access and loving support.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
