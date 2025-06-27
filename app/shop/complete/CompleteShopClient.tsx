"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ShoppingCart,
  Heart,
  Eye,
  Plus,
  Minus,
  X,
  Menu,
  Download,
  Package,
  CreditCard,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react"

// 🌙 Sacred Product Interface
interface SacredProduct {
  id: string
  name: string
  description: string
  prices: { [key: string]: number }
  originalPrice?: number
  image: string
  category: "healing-journals" | "business-suite" | "kdp-books" | "physical-products"
  type: "digital-download" | "shopify-product" | "kdp-book"
  formats: string[]
  tags: string[]
  featured?: boolean
  inStock: boolean
  deliveryTime?: string
  shipping?: string
  externalLink?: string
  shopifyId?: string
}

// 🌸 Cart Item Interface
interface CartItem extends SacredProduct {
  selectedFormat: string
  quantity: number
  cartId: string
}

export default function CompleteShopClient() {
  // 🌙 State Management
  const [currentSection, setCurrentSection] = useState("hero")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<SacredProduct | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  // 🌿 Sacred Product Catalog
  const sacredProducts: SacredProduct[] = [
    // Healing Journals
    {
      id: "magnolia-reset-90",
      name: "The Magnolia Reset 90-Day Journal",
      description: "A sacred journey of transformation through ancestral wisdom and daily reflection practices",
      prices: { digital: 29, print: 47 },
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      category: "healing-journals",
      type: "digital-download",
      formats: ["digital", "print"],
      tags: ["healing", "transformation", "ancestral-wisdom"],
      featured: true,
      inStock: true,
      deliveryTime: "Instant download",
    },
    {
      id: "midnight-tarot-deck",
      name: "Midnight Messages Tarot Deck",
      description: "Divination cards rooted in Southern Gothic wisdom and healing energy",
      prices: { digital: 19, print: 33 },
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      category: "healing-journals",
      type: "digital-download",
      formats: ["digital", "print"],
      tags: ["tarot", "divination", "spiritual-guidance"],
      featured: true,
      inStock: true,
      deliveryTime: "Instant download",
    },
    {
      id: "sacred-productivity-adhd",
      name: "Sacred Productivity ADHD Planner",
      description: "Gentle planning system designed for neurodivergent entrepreneurs and healers",
      prices: { digital: 19, print: 29 },
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=500&fit=crop",
      category: "healing-journals",
      type: "digital-download",
      formats: ["digital", "print"],
      tags: ["adhd", "planning", "neurodivergent"],
      featured: true,
      inStock: true,
      deliveryTime: "Instant download",
    },

    // Business Suite
    {
      id: "digital-entrepreneur-kit",
      name: "Digital Entrepreneur's Starter Kit",
      description: "Complete foundation for building sacred business with authentic marketing strategies",
      prices: { digital: 37 },
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop",
      category: "business-suite",
      type: "digital-download",
      formats: ["digital"],
      tags: ["entrepreneurship", "marketing", "business-strategy"],
      inStock: true,
      deliveryTime: "Instant download",
    },
    {
      id: "brand-identity-workbook",
      name: "Brand Identity Workbook",
      description: "Discover your authentic brand voice and visual identity with soul-centered exercises",
      prices: { digital: 29 },
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop",
      category: "business-suite",
      type: "digital-download",
      formats: ["digital"],
      tags: ["branding", "identity", "authenticity"],
      inStock: true,
      deliveryTime: "Instant download",
    },
    {
      id: "notion-dashboard-templates",
      name: "Sacred Business Notion Templates",
      description: "Complete business management system with healing-centered workflows",
      prices: { digital: 49 },
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=500&fit=crop",
      category: "business-suite",
      type: "digital-download",
      formats: ["digital"],
      tags: ["notion", "templates", "business-management"],
      inStock: true,
      deliveryTime: "Instant download",
    },

    // Physical Products
    {
      id: "vegan-leather-journal",
      name: "Vegan Leather Journal Set with Pen & Pouch",
      description: "Handcrafted journal with matching pouch and premium pen for sacred writing",
      prices: { physical: 25 },
      image: "https://images.unsplash.com/photo-1455791875203-27095cc5129b?w=400&h=500&fit=crop",
      category: "physical-products",
      type: "shopify-product",
      formats: ["physical"],
      tags: ["journal", "writing", "luxury"],
      featured: true,
      inStock: true,
      shipping: "3-5 business days",
      shopifyId: "journal-set-001",
    },
    {
      id: "essential-oil-diffuser",
      name: "Sacred Space Essential Oil Diffuser",
      description: "Premium ultrasonic diffuser for creating healing atmospheres",
      prices: { physical: 63 },
      originalPrice: 75,
      image: "https://images.unsplash.com/photo-1615891113000-53d3ce9b2aee?w=400&h=500&fit=crop",
      category: "physical-products",
      type: "shopify-product",
      formats: ["physical"],
      tags: ["aromatherapy", "wellness", "diffuser"],
      inStock: true,
      shipping: "2-4 business days",
      shopifyId: "diffuser-001",
    },
    {
      id: "sacred-candles",
      name: "Midnight Ritual Candles Set",
      description: "Hand-poured candles for sacred ceremonies and meditation",
      prices: { physical: 45 },
      image: "https://images.unsplash.com/photo-1546878819-a4ce9d29e200?w=400&h=500&fit=crop",
      category: "physical-products",
      type: "shopify-product",
      formats: ["physical"],
      tags: ["candles", "ritual", "meditation"],
      inStock: true,
      shipping: "3-5 business days",
      shopifyId: "candles-ritual",
    },

    // KDP Books
    {
      id: "magnolia-reset-book",
      name: "The Magnolia Reset - Paperback",
      description: "Physical book available through Amazon KDP with healing wisdom",
      prices: { kdp: 24.99 },
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      category: "kdp-books",
      type: "kdp-book",
      formats: ["kdp"],
      tags: ["book", "healing", "transformation"],
      externalLink: "https://amazon.com/dp/your-book-id",
      inStock: true,
    },
  ]

  // 🌸 Navigation sections
  const navigationSections = [
    { id: "hero", label: "Sacred Home", href: "#hero" },
    { id: "shop", label: "Sacred Collection", href: "#shop" },
    { id: "digital", label: "Digital Downloads", href: "#digital" },
    { id: "physical", label: "Physical Products", href: "#physical" },
    { id: "about", label: "Our Story", href: "#about" },
    { id: "contact", label: "Sacred Contact", href: "#contact" },
  ]

  // 🌿 Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? sacredProducts
      : sacredProducts.filter((product) => product.category === selectedCategory)

  // 💝 Load cart from localStorage on mount
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

  // 🌙 Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem("mm-sacred-cart", JSON.stringify(newCart))
  }

  // 🌸 Save favorites to localStorage
  const saveFavorites = (newFavorites: Set<string>) => {
    setFavorites(newFavorites)
    localStorage.setItem("mm-sacred-favorites", JSON.stringify(Array.from(newFavorites)))
  }

  // 💫 Show notification
  const showNotification = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // 🌿 Add to sacred collection
  const addToSacredCollection = (product: SacredProduct, selectedFormat?: string) => {
    const format = selectedFormat || product.formats[0]
    const price = product.prices[format] || Object.values(product.prices)[0]

    const cartId = `${product.id}-${format}`
    const existingItem = cart.find((item) => item.cartId === cartId)

    if (existingItem) {
      const newCart = cart.map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item))
      saveCart(newCart)
    } else {
      const newItem: CartItem = {
        ...product,
        selectedFormat: format,
        quantity: 1,
        cartId,
        prices: { [format]: price },
      }
      saveCart([...cart, newItem])
    }

    showNotification(`${product.name} added to your sacred collection!`, "success")
  }

  // 🌙 Remove from cart
  const removeFromCart = (cartId: string) => {
    const newCart = cart.filter((item) => item.cartId !== cartId)
    saveCart(newCart)
    showNotification("Item removed from sacred collection", "info")
  }

  // 🌸 Update quantity
  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(cartId)
    } else {
      const newCart = cart.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item))
      saveCart(newCart)
    }
  }

  // 💝 Toggle favorite
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
      showNotification("Removed from sacred wishlist", "info")
    } else {
      newFavorites.add(productId)
      showNotification("Added to sacred wishlist", "success")
    }
    saveFavorites(newFavorites)
  }

  // 🌿 Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = Object.values(item.prices)[0]
    return total + price * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // 🌙 Handle navigation
  const handleNavigation = (sectionId: string) => {
    setCurrentSection(sectionId)
    setIsMobileMenuOpen(false)

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 💫 Handle purchase
  const handlePurchase = (product: SacredProduct, selectedFormat?: string) => {
    if (product.type === "kdp-book" && product.externalLink) {
      window.open(product.externalLink, "_blank")
      return
    }

    addToSacredCollection(product, selectedFormat)
    setIsCartOpen(true)
  }

  // 🌸 Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      showNotification("Your sacred collection is empty", "info")
      return
    }

    setIsCheckoutOpen(true)
    setIsCartOpen(false)
  }

  // 🌿 Format labels
  const getFormatLabel = (format: string) => {
    const labels: { [key: string]: string } = {
      digital: "Digital PDF",
      print: "Print Edition",
      physical: "Physical Product",
      kdp: "Amazon Paperback",
    }
    return labels[format] || format
  }

  return (
    <div className="min-h-screen bg-midnight-blue text-magnolia-white">
      {/* 🌙 Sacred Navigation Header */}
      <nav className="fixed top-0 w-full bg-midnight-blue/95 backdrop-blur-sm border-b border-gold/20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image src="/images/logo-minimal.jpg" alt="Midnight Magnolia" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</div>
                  <div className="font-montserrat text-xs text-sage-green tracking-wider">SACRED COMMERCE</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavigation(section.id)}
                  className={`font-lora text-sm transition-colors duration-300 hover:text-sage-green relative group ${
                    currentSection === section.id ? "text-sage-green" : "text-magnolia-white"
                  }`}
                >
                  {section.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-magnolia-white hover:text-sage-green transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-midnight-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-magnolia-white hover:text-sage-green transition-colors duration-200"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-midnight-blue border-t border-gold/20"
            >
              <div className="px-6 py-4 space-y-4">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    className={`block w-full text-left font-lora transition-colors duration-300 py-2 ${
                      currentSection === section.id ? "text-sage-green" : "text-magnolia-white hover:text-sage-green"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 🌸 Sacred Hero Section */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight-blue via-midnight-blue to-sage-green/20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-gold mb-6">Sacred Commerce</h1>
            <p className="font-lora text-xl md:text-2xl text-magnolia-white/90 mb-8 leading-relaxed">
              Transform Your Creativity Into Sustainable Income
            </p>
            <p className="font-lora text-lg text-sage-green mb-12 max-w-2xl mx-auto">
              Southern Gothic digital products for healers, creators, and entrepreneurs seeking authentic transformation
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={() => handleNavigation("shop")}
                className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Enter Sacred Sanctuary
              </button>
              <button
                onClick={() => handleNavigation("digital")}
                className="w-full sm:w-auto border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Explore Digital Offerings
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌿 Sacred Shop Section */}
      <section id="shop" className="py-20 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-6">Sacred Collection</h2>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto">
              Discover our curated selection of healing-centered digital downloads and sacred physical products
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "healing-journals", "business-suite", "physical-products", "kdp-books"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold text-midnight-blue shadow-lg"
                    : "bg-midnight-blue/50 text-magnolia-white border border-sage-green/30 hover:bg-sage-green/20 hover:text-sage-green"
                }`}
              >
                {category === "all"
                  ? "All Sacred Offerings"
                  : category === "healing-journals"
                    ? "Healing Journals"
                    : category === "business-suite"
                      ? "Business Suite"
                      : category === "physical-products"
                        ? "Physical Products"
                        : "Sacred Books"}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-magnolia-white rounded-3xl overflow-hidden shadow-sm hover:shadow-mystical transition-all duration-300 border border-transparent hover:border-sage-green/30 h-full flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
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
                        <span className="bg-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          ✨ Featured
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-red-500/90 text-magnolia-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          SACRED SALE
                        </span>
                      )}
                    </div>

                    {/* Overlay Actions */}
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

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Product Name */}
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1">
                      {product.description}
                    </p>

                    {/* Format Selection */}
                    {product.formats.length > 1 && (
                      <div className="mb-4">
                        <p className="font-montserrat text-xs text-midnight-blue/60 mb-2">Choose Format:</p>
                        <div className="space-y-1">
                          {product.formats.map((format) => (
                            <label key={format} className="flex items-center text-sm">
                              <input
                                type="radio"
                                name={`format-${product.id}`}
                                value={format}
                                defaultChecked={format === product.formats[0]}
                                className="mr-2 accent-sage-green"
                              />
                              <span className="text-midnight-blue">
                                {getFormatLabel(format)} - ${product.prices[format]}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-playfair text-2xl font-bold text-midnight-blue">
                          ${Object.values(product.prices)[0]}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-midnight-blue/50 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
                          product.type === "digital-download"
                            ? "bg-blue-500/20 text-blue-700"
                            : product.type === "kdp-book"
                              ? "bg-purple-500/20 text-purple-700"
                              : "bg-green-500/20 text-green-700"
                        }`}
                      >
                        {product.type === "digital-download"
                          ? "Digital"
                          : product.type === "kdp-book"
                            ? "Amazon"
                            : "Physical"}
                      </span>
                    </div>

                    {/* Product Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-sage-green/20 text-sage-green text-xs rounded font-montserrat"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {product.type === "kdp-book" && product.externalLink ? (
                        <a
                          href={product.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 text-center block"
                        >
                          View on Amazon
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            const selectedFormat =
                              product.formats.length > 1
                                ? (
                                    document.querySelector(
                                      `input[name="format-${product.id}"]:checked`,
                                    ) as HTMLInputElement
                                  )?.value || product.formats[0]
                                : product.formats[0]
                            handlePurchase(product, selectedFormat)
                          }}
                          disabled={!product.inStock}
                          className={`w-full font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 ${
                            product.inStock
                              ? "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                              : "bg-warm-gray/50 text-midnight-blue/50 cursor-not-allowed"
                          }`}
                        >
                          {product.inStock ? "Add to Sacred Collection" : "Currently Unavailable"}
                        </button>
                      )}
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-3 text-xs text-midnight-blue/60 text-center">
                      {product.type === "digital-download"
                        ? `✓ ${product.deliveryTime}`
                        : product.type === "shopify-product"
                          ? `🚚 ${product.shipping}`
                          : "📚 Available on Amazon"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 🌙 Digital Products Section */}
      <section id="digital" className="py-20 bg-gradient-to-b from-midnight-blue to-sage-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-6">Digital Sacred Offerings</h2>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto">
              Instant access to transformative digital resources for your healing and business journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacredProducts
              .filter((p) => p.type === "digital-download")
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-magnolia-white to-magnolia-white/95 rounded-3xl p-6 border border-sage-green/20 hover:border-sage-green/50 transition-all duration-300 hover:shadow-mystical"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                  <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-3">{product.name}</h3>
                  <p className="font-lora text-midnight-blue/70 mb-4">{product.description}</p>

                  {/* Formats */}
                  <div className="mb-4">
                    <p className="font-montserrat text-sm text-sage-green font-medium mb-2">Includes:</p>
                    <ul className="text-sm text-midnight-blue/70 space-y-1">
                      {product.formats.map((format, index) => (
                        <li key={index} className="flex items-center">
                          <Download className="w-3 h-3 text-sage-green mr-2" />
                          {getFormatLabel(format)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-playfair text-2xl font-bold text-midnight-blue">
                      ${Object.values(product.prices)[0]}
                    </span>
                    <span className="text-sm text-sage-green font-montserrat">✓ Instant Download</span>
                  </div>

                  <button
                    onClick={() => handlePurchase(product)}
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    Get Sacred Access
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 🌸 Physical Products Section */}
      <section id="physical" className="py-20 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-6">Sacred Physical Offerings</h2>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-3xl mx-auto">
              Beautiful, handcrafted items to enhance your sacred space and daily practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacredProducts
              .filter((p) => p.type === "shopify-product")
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-magnolia-white to-magnolia-white/95 rounded-3xl p-6 border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-mystical"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                  <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-3">{product.name}</h3>
                  <p className="font-lora text-midnight-blue/70 mb-4">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">
                        ${Object.values(product.prices)[0]}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-midnight-blue/50 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
                        product.inStock ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In Sacred Stock" : "Temporarily Unavailable"}
                    </span>
                  </div>

                  <div className="text-sm text-midnight-blue/60 mb-4 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    {product.shipping}
                  </div>

                  <button
                    onClick={() => handlePurchase(product)}
                    disabled={!product.inStock}
                    className={`w-full font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 ${
                      product.inStock
                        ? "bg-gold hover:bg-gold/90 text-midnight-blue hover:shadow-lg"
                        : "bg-warm-gray/50 text-midnight-blue/50 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Add to Sacred Collection" : "Currently Unavailable"}
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 🌿 About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-midnight-blue to-sage-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-8">
              About Sacred Midnight Magnolia
            </h2>
            <p className="font-lora text-xl text-magnolia-white/90 leading-relaxed mb-8">
              Midnight Magnolia transforms creativity into sustainable income through Southern Gothic digital products.
              Founded by a healer, coder, and creative entrepreneur, we bridge the gap between spiritual practice and
              digital strategy.
            </p>
            <p className="font-lora text-lg text-sage-green">
              Our mission is to provide authentic, healing-centered resources for entrepreneurs, creators, and anyone
              seeking transformation through ancestral wisdom and modern innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🌙 Contact Section */}
      <section id="contact" className="py-20 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-8">Sacred Connection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-magnolia-white/5 rounded-3xl p-6 border border-sage-green/20">
                <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4">Reach Our Sacred Space</h3>
                <p className="font-lora text-magnolia-white/80 mb-4">latisha@midnightmagnolia.com</p>
                <p className="font-lora text-magnolia-white/80 mb-4">803-387-2552</p>
                <p className="font-lora text-magnolia-white/80">Summerville, SC</p>
              </div>
              <div className="bg-magnolia-white/5 rounded-3xl p-6 border border-gold/20">
                <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4">
                  Follow Our Sacred Journey
                </h3>
                <div className="space-y-2">
                  <p className="font-lora text-magnolia-white/80">Instagram: @rumi_nationz</p>
                  <p className="font-lora text-magnolia-white/80">Facebook: @ruminationsshop</p>
                  <p className="font-lora text-magnolia-white/80">LinkedIn: @latishavwaters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌸 Sacred Shopping Cart Sidebar */}
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
              className="fixed right-0 top-0 h-full w-full max-w-md bg-magnolia-white shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex h-full flex-col">
                {/* Cart Header */}
                <div className="flex items-center justify-between border-b border-sage-green/20 px-6 py-4 bg-midnight-blue">
                  <h2 className="font-playfair text-lg font-semibold text-magnolia-white">Your Sacred Collection</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-magnolia-white/60 hover:text-magnolia-white transition-colors duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {cart.length === 0 ? (
                    <div className="text-center mt-8">
                      <Sparkles className="h-12 w-12 text-sage-green/50 mx-auto mb-4" />
                      <p className="font-lora text-midnight-blue/60">Your sacred collection awaits</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.cartId}
                          className="flex items-center space-x-4 bg-sage-green/5 rounded-2xl p-4 border border-sage-green/10"
                        >
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
                            <p className="font-montserrat text-xs text-midnight-blue/60">
                              {getFormatLabel(item.selectedFormat)}
                            </p>
                            <p className="font-montserrat text-sm font-bold text-midnight-blue">
                              ${Object.values(item.prices)[0]}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200 p-1"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-montserrat text-midnight-blue font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200 p-1"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-400 hover:text-red-600 transition-colors duration-200 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
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
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-4 rounded-full transition-all duration-300 hover:shadow-lg mb-3"
                    >
                      Begin Sacred Checkout
                    </button>
                    <div className="text-center">
                      <p className="font-montserrat text-xs text-midnight-blue/60">
                        ✓ Secure checkout • ✓ Instant digital delivery • ✓ Lifetime access
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🌿 Quick View Modal */}
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
                className="relative bg-magnolia-white rounded-3xl max-w-2xl w-full p-6 border-2 border-gold/20 shadow-2xl"
              >
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200"
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

                    {quickViewProduct.formats.length > 1 && (
                      <div className="mb-4">
                        <p className="font-montserrat text-sm text-sage-green font-medium mb-2">Available Formats:</p>
                        <ul className="text-sm text-midnight-blue/70 space-y-1">
                          {quickViewProduct.formats.map((format, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-sage-green rounded-full mr-2"></span>
                                {getFormatLabel(format)}
                              </span>
                              <span className="font-montserrat font-bold">${quickViewProduct.prices[format]}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <span className="font-playfair text-3xl font-bold text-midnight-blue">
                        ${Object.values(quickViewProduct.prices)[0]}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-montserrat font-medium ${
                          quickViewProduct.type === "digital-download"
                            ? "bg-blue-500/20 text-blue-700"
                            : quickViewProduct.type === "kdp-book"
                              ? "bg-purple-500/20 text-purple-700"
                              : "bg-green-500/20 text-green-700"
                        }`}
                      >
                        {quickViewProduct.type === "digital-download"
                          ? "Digital Download"
                          : quickViewProduct.type === "kdp-book"
                            ? "Amazon Book"
                            : "Physical Product"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {quickViewProduct.type === "kdp-book" && quickViewProduct.externalLink ? (
                        <a
                          href={quickViewProduct.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 text-center block"
                        >
                          View on Amazon
                        </a>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              addToSacredCollection(quickViewProduct)
                              setQuickViewProduct(null)
                            }}
                            className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300"
                          >
                            Add to Sacred Collection
                          </button>
                          <button
                            onClick={() => {
                              handlePurchase(quickViewProduct)
                              setQuickViewProduct(null)
                            }}
                            className="w-full border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-medium py-3 px-4 rounded-full transition-all duration-300"
                          >
                            Buy Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌙 Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-midnight-blue/95 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-magnolia-white rounded-3xl max-w-2xl w-full p-8 border-2 border-gold/20 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 text-midnight-blue/60 hover:text-midnight-blue transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="mb-6">
                  <h2 className="font-playfair text-3xl font-bold text-midnight-blue mb-2">
                    Complete Your Sacred Purchase
                  </h2>
                  <p className="font-lora text-midnight-blue/70">
                    You're one step away from beginning your transformation journey
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-sage-green/10 rounded-2xl p-6 mb-6 border border-sage-green/20">
                  <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-4">Sacred Order Summary</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center">
                        <div>
                          <p className="font-lora text-midnight-blue font-medium">{item.name}</p>
                          <p className="font-montserrat text-sm text-midnight-blue/60">
                            {getFormatLabel(item.selectedFormat)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-montserrat font-bold text-midnight-blue">
                          ${(Object.values(item.prices)[0] * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-sage-green/20 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-playfair text-xl font-bold text-midnight-blue">Sacred Total:</span>
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Information Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-montserrat text-sm font-medium text-midnight-blue mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-xl bg-magnolia-white text-midnight-blue font-lora focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block font-montserrat text-sm font-medium text-midnight-blue mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-sage-green/30 rounded-xl bg-magnolia-white text-midnight-blue font-lora focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-montserrat text-sm font-medium text-midnight-blue mb-2">
                      Sacred Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-sage-green/30 rounded-xl bg-magnolia-white text-midnight-blue font-lora focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
                      placeholder="your.sacred.email@example.com"
                    />
                  </div>

                  {/* Payment Section Placeholder */}
                  <div className="bg-gold/10 rounded-2xl p-6 border border-gold/20">
                    <div className="flex items-center mb-4">
                      <CreditCard className="h-5 w-5 text-gold mr-2" />
                      <h3 className="font-playfair text-lg font-semibold text-midnight-blue">Sacred Payment</h3>
                    </div>
                    <div className="bg-magnolia-white/50 rounded-xl p-4 text-center">
                      <p className="font-lora text-midnight-blue/70 mb-2">Stripe Payment Integration</p>
                      <p className="font-montserrat text-sm text-midnight-blue/60">
                        Secure payment processing will be integrated here
                      </p>
                    </div>
                  </div>

                  {/* Sacred Completion */}
                  <div className="space-y-4">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault()
                        showNotification("Sacred checkout would process here with Stripe integration!", "info")
                        setIsCheckoutOpen(false)
                      }}
                      className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-4 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      Complete Sacred Purchase
                    </button>
                    <p className="font-lora text-center text-midnight-blue/60 text-sm leading-relaxed">
                      By completing this purchase, you're investing in your sacred transformation journey. All digital
                      products include lifetime access and loving support.
                    </p>
                  </div>
                </form>

                {/* Sacred Trust Signals */}
                <div className="mt-8 pt-6 border-t border-sage-green/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center mb-2">
                        <Check className="h-5 w-5 text-sage-green" />
                      </div>
                      <p className="font-montserrat text-xs text-midnight-blue/70">Secure Checkout</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mb-2">
                        <Download className="h-5 w-5 text-gold" />
                      </div>
                      <p className="font-montserrat text-xs text-midnight-blue/70">Instant Access</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center mb-2">
                        <Heart className="h-5 w-5 text-sage-green" />
                      </div>
                      <p className="font-montserrat text-xs text-midnight-blue/70">Lifetime Support</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌸 Sacred Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={`fixed top-20 right-4 z-50 max-w-sm p-4 rounded-2xl shadow-lg border ${
              notification.type === "success"
                ? "bg-sage-green/90 text-midnight-blue border-sage-green"
                : notification.type === "error"
                  ? "bg-red-500/90 text-magnolia-white border-red-500"
                  : "bg-gold/90 text-midnight-blue border-gold"
            }`}
          >
            <div className="flex items-center">
              {notification.type === "success" && <Check className="h-5 w-5 mr-2" />}
              {notification.type === "error" && <AlertCircle className="h-5 w-5 mr-2" />}
              {notification.type === "info" && <Sparkles className="h-5 w-5 mr-2" />}
              <p className="font-lora text-sm">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
