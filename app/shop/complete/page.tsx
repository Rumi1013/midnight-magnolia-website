"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShoppingCart, Heart, Eye, Plus, Minus, X, Menu, Download, Package, CreditCard, Check } from "lucide-react"

// 🌙 Sacred Product Interface
interface SacredProduct {
  id: string
  name: string
  description: string
  prices: { [key: string]: number }
  originalPrice?: number
  image: string
  category: "healing-journals" | "business-suite" | "kdp-books" | "physical-products"
  type: "digital-download" | "shopify-product" | "kdp-external"
  formats: string[]
  tags: string[]
  featured?: boolean
  inStock: boolean
  externalLink?: string
  deliveryTime?: string
  shipping?: string
  shopifyId?: string
}

interface CartItem extends SacredProduct {
  selectedFormat: string
  quantity: number
  cartId: string
}

export default function CompleteSacredShop() {
  const [currentSection, setCurrentSection] = useState("hero")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<SacredProduct | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // 🌸 Sacred Product Catalog
  const sacredProducts: SacredProduct[] = [
    // Healing Journals & Planners
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
      name: "Vegan Leather Journal Set",
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

    // KDP Books
    {
      id: "magnolia-reset-book",
      name: "The Magnolia Reset - Paperback",
      description: "Physical book available through Amazon KDP with guided transformation exercises",
      prices: { kdp: 24.99 },
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      category: "kdp-books",
      type: "kdp-external",
      formats: ["kdp"],
      tags: ["book", "healing", "transformation"],
      externalLink: "https://amazon.com/dp/your-book-id",
      inStock: true,
    },
  ]

  // Navigation sections
  const navigationSections = [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "shop", label: "Sacred Collection", href: "#shop" },
    { id: "digital", label: "Digital Downloads", href: "#digital" },
    { id: "physical", label: "Physical Products", href: "#physical" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" },
  ]

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? sacredProducts
      : sacredProducts.filter((product) => product.category === selectedCategory)

  // Format labels
  const getFormatLabel = (format: string) => {
    const labels: { [key: string]: string } = {
      digital: "Digital PDF",
      print: "Print Edition",
      physical: "Physical Product",
      kdp: "Amazon Paperback",
    }
    return labels[format] || format
  }

  // Add to cart function
  const addToSacredCollection = (product: SacredProduct, selectedFormat: string) => {
    const price = product.prices[selectedFormat]
    const cartId = `${product.id}-${selectedFormat}`

    const existingItem = cart.find((item) => item.cartId === cartId)

    if (existingItem) {
      setCart(cart.map((item) => (item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      const cartItem: CartItem = {
        ...product,
        selectedFormat,
        quantity: 1,
        cartId,
        prices: { [selectedFormat]: price },
      }
      setCart([...cart, cartItem])
    }

    // Show success notification
    showNotification(`${product.name} added to your sacred collection!`, "success")
  }

  // Remove from cart
  const removeFromCart = (cartId: string) => {
    setCart(cart.filter((item) => item.cartId !== cartId))
  }

  // Update quantity
  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(cartId)
    } else {
      setCart(cart.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    const price = item.prices[item.selectedFormat] || 0
    return total + price * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Handle navigation
  const handleNavigation = (sectionId: string) => {
    setCurrentSection(sectionId)
    setIsMobileMenuOpen(false)

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle purchase
  const handlePurchase = (product: SacredProduct, format: string) => {
    if (product.type === "kdp-external" && product.externalLink) {
      window.open(product.externalLink, "_blank")
    } else {
      addToSacredCollection(product, format)
      setIsCartOpen(true)
    }
  }

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      showNotification("Your sacred collection is empty", "info")
      return
    }

    setIsCheckoutOpen(true)
  }

  // Complete purchase
  const completePurchase = async (customerData: any) => {
    setIsProcessingPayment(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and show success
      setCart([])
      setIsCheckoutOpen(false)
      setIsCartOpen(false)
      showNotification("Your sacred purchase is complete! Check your email for access details.", "success")
    } catch (error) {
      showNotification("There was an issue processing your payment. Please try again.", "error")
    } finally {
      setIsProcessingPayment(false)
    }
  }

  // Toggle favorite
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

  // Show notification
  const showNotification = (message: string, type: "success" | "error" | "info") => {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
      type === "success"
        ? "bg-sage-green text-midnight-blue"
        : type === "error"
          ? "bg-red-500 text-white"
          : "bg-midnight-blue text-magnolia-white border border-gold"
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

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("mm-sacred-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    const savedFavorites = localStorage.getItem("mm-favorites")
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("mm-sacred-cart", JSON.stringify(cart))
  }, [cart])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("mm-favorites", JSON.stringify([...favorites]))
  }, [favorites])

  return (
    <div className="min-h-screen bg-midnight-blue text-magnolia-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-midnight-blue/95 backdrop-blur-sm border-b border-gold/20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-playfair text-gold">Midnight Magnolia</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    className={`px-3 py-2 rounded-md text-sm font-montserrat font-medium transition-colors duration-200 hover:text-gold hover:bg-midnight-blue/50 ${
                      currentSection === section.id ? "text-gold bg-midnight-blue/50" : "text-magnolia-white/80"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-magnolia-white/80 hover:text-gold transition-colors duration-200"
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
                  className="text-magnolia-white/80 hover:text-gold transition-colors duration-200"
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
              className="md:hidden bg-midnight-blue/95 backdrop-blur-sm border-t border-gold/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleNavigation(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-montserrat font-medium transition-colors duration-200 hover:text-gold hover:bg-midnight-blue/50 ${
                      currentSection === section.id ? "text-gold bg-midnight-blue/50" : "text-magnolia-white/80"
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

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight-blue via-midnight-blue to-sage-green/20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-playfair text-gold mb-6">Sacred Commerce</h1>
            <p className="text-xl md:text-2xl text-magnolia-white/80 mb-8 leading-relaxed">
              Transform Your Healing Journey Into Sustainable Abundance
            </p>
            <p className="text-lg text-sage-green mb-12 max-w-2xl mx-auto font-lora">
              Southern Gothic digital products for healers, creators, and entrepreneurs seeking authentic transformation
              through ancestral wisdom
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button
                onClick={() => handleNavigation("shop")}
                className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Enter Sacred Marketplace
              </button>
              <button
                onClick={() => handleNavigation("digital")}
                className="w-full sm:w-auto border-2 border-gold text-gold hover:bg-gold hover:text-midnight-blue font-montserrat font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Explore Digital Sanctuary
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-20 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair text-gold mb-6">Sacred Collection</h2>
            <p className="text-xl text-magnolia-white/80 max-w-3xl mx-auto font-lora">
              Discover our curated selection of healing-centered digital downloads and sacred physical products
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: "all", label: "All Sacred Offerings" },
              { key: "healing-journals", label: "Healing Journals" },
              { key: "business-suite", label: "Business Suite" },
              { key: "physical-products", label: "Physical Products" },
              { key: "kdp-books", label: "Published Books" },
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-gold text-midnight-blue shadow-lg"
                    : "bg-midnight-blue/50 text-magnolia-white/80 hover:bg-sage-green/20 hover:text-sage-green border border-sage-green/30"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToSacredCollection}
                onQuickView={setQuickViewProduct}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.has(product.id)}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      <section id="digital" className="py-20 bg-gradient-to-br from-midnight-blue to-sage-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair text-gold mb-6">Digital Sanctuary</h2>
            <p className="text-xl text-magnolia-white/80 max-w-3xl mx-auto font-lora">
              Instant access to transformative digital resources for your healing and business journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacredProducts
              .filter((p) => p.type === "digital-download")
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-midnight-blue to-sage-green/20 rounded-3xl p-6 border border-sage-green/30 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                >
                  <div className="relative aspect-[4/5] mb-4 rounded-2xl overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                        <Download className="w-3 h-3 inline mr-1" />
                        Digital
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-playfair font-semibold text-magnolia-white mb-3">{product.name}</h3>
                  <p className="text-magnolia-white/70 mb-4 font-lora">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-playfair font-bold text-gold">${product.prices.digital}</span>
                    <span className="text-sm text-sage-green flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Instant Access
                    </span>
                  </div>

                  <button
                    onClick={() => handlePurchase(product, "digital")}
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    Begin Sacred Download
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Physical Products Section */}
      <section id="physical" className="py-20 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair text-gold mb-6">Sacred Artifacts</h2>
            <p className="text-xl text-magnolia-white/80 max-w-3xl mx-auto font-lora">
              Beautiful, handcrafted items to enhance your sacred space and daily practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacredProducts
              .filter((p) => p.type === "shopify-product")
              .map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-midnight-blue to-warm-gray/20 rounded-3xl p-6 border border-warm-gray/30 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
                >
                  <div className="relative aspect-[4/5] mb-4 rounded-2xl overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-warm-gray/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                        <Package className="w-3 h-3 inline mr-1" />
                        Physical
                      </span>
                    </div>
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                          SACRED SALE
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-playfair font-semibold text-magnolia-white mb-3">{product.name}</h3>
                  <p className="text-magnolia-white/70 mb-4 font-lora">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-playfair font-bold text-gold">${product.prices.physical}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-magnolia-white/50 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
                        product.inStock ? "bg-sage-green/20 text-sage-green" : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {product.inStock ? "In Sacred Stock" : "Temporarily Unavailable"}
                    </span>
                  </div>

                  <div className="text-sm text-magnolia-white/60 mb-4 font-lora">🚚 {product.shipping}</div>

                  <button
                    onClick={() => handlePurchase(product, "physical")}
                    disabled={!product.inStock}
                    className={`w-full font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 ${
                      product.inStock
                        ? "bg-warm-gray hover:bg-warm-gray/90 text-midnight-blue hover:shadow-lg"
                        : "bg-midnight-blue/50 text-magnolia-white/50 cursor-not-allowed border border-magnolia-white/20"
                    }`}
                  >
                    {product.inStock ? "Add to Sacred Collection" : "Awaiting Restock"}
                  </button>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-midnight-blue to-sage-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-playfair text-gold mb-8">About Our Sacred Mission</h2>
            <p className="text-xl text-magnolia-white/80 leading-relaxed mb-8 font-lora">
              Midnight Magnolia transforms creativity into sustainable income through Southern Gothic digital products.
              Founded by a healer, coder, and creative entrepreneur, we bridge the gap between spiritual practice and
              digital strategy.
            </p>
            <p className="text-lg text-sage-green font-lora">
              Our mission is to provide authentic, healing-centered resources for entrepreneurs, creators, and anyone
              seeking transformation through ancestral wisdom and modern innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-playfair text-gold mb-8">Connect With Our Sacred Community</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-midnight-blue/50 rounded-3xl p-6 border border-gold/30">
                <h3 className="text-xl font-playfair font-semibold text-magnolia-white mb-4">Sacred Correspondence</h3>
                <p className="text-magnolia-white/80 mb-4 font-lora">latisha@midnightmagnolia.com</p>
                <p className="text-magnolia-white/80 mb-4 font-lora">803-387-2552</p>
                <p className="text-magnolia-white/80 font-lora">Summerville, SC</p>
              </div>
              <div className="bg-midnight-blue/50 rounded-3xl p-6 border border-sage-green/30">
                <h3 className="text-xl font-playfair font-semibold text-magnolia-white mb-4">
                  Follow Our Sacred Journey
                </h3>
                <div className="space-y-2">
                  <p className="text-magnolia-white/80 font-lora">Instagram: @rumi_nationz</p>
                  <p className="text-magnolia-white/80 font-lora">Facebook: @ruminationsshop</p>
                  <p className="text-magnolia-white/80 font-lora">LinkedIn: @latishavwaters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-midnight-blue shadow-xl z-50 border-l border-gold/30"
            >
              <div className="flex h-full flex-col">
                {/* Cart Header */}
                <div className="flex items-center justify-between border-b border-gold/30 px-6 py-4">
                  <h2 className="text-lg font-playfair font-semibold text-magnolia-white">Your Sacred Collection</h2>
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
                    <div className="text-center text-magnolia-white/60 mt-8">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="font-lora">Your sacred collection awaits your first offering</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.cartId}
                          className="flex items-center space-x-4 bg-midnight-blue/50 rounded-2xl p-4 border border-sage-green/20"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-playfair font-medium text-magnolia-white truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-magnolia-white/60 font-lora">
                              {getFormatLabel(item.selectedFormat)}
                            </p>
                            <p className="text-sm text-gold font-montserrat">${item.prices[item.selectedFormat]}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="text-magnolia-white/60 hover:text-magnolia-white transition-colors duration-200 p-1"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-magnolia-white font-montserrat font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="text-magnolia-white/60 hover:text-magnolia-white transition-colors duration-200 p-1"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1"
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
                  <div className="border-t border-gold/30 px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-playfair font-semibold text-magnolia-white">Sacred Total:</span>
                      <span className="text-2xl font-playfair font-bold text-gold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      Begin Sacred Checkout
                    </button>
                    <div className="mt-3 text-center">
                      <p className="text-xs text-magnolia-white/60 font-lora">
                        ✓ Secure sacred checkout • ✓ Instant digital delivery • ✓ Lifetime access
                      </p>
                    </div>
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
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center min-h-screen px-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-midnight-blue rounded-3xl max-w-2xl w-full p-6 border border-gold/30 shadow-2xl"
              >
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 text-magnolia-white/60 hover:text-magnolia-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={quickViewProduct.image || "/placeholder.svg"}
                      alt={quickViewProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-playfair font-semibold text-magnolia-white mb-3">
                      {quickViewProduct.name}
                    </h2>
                    <p className="text-magnolia-white/70 mb-4 font-lora">{quickViewProduct.description}</p>

                    {/* Format Selection */}
                    <div className="mb-6">
                      <p className="text-sm text-sage-green font-montserrat font-medium mb-2">Choose Format:</p>
                      <div className="space-y-2">
                        {quickViewProduct.formats.map((format) => (
                          <label key={format} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`quickview-format-${quickViewProduct.id}`}
                              value={format}
                              className="text-gold focus:ring-gold"
                            />
                            <span className="text-magnolia-white font-lora">
                              {getFormatLabel(format)} - ${quickViewProduct.prices[format]}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          const selectedFormat = document.querySelector(
                            `input[name="quickview-format-${quickViewProduct.id}"]:checked`,
                          ) as HTMLInputElement
                          if (selectedFormat) {
                            addToSacredCollection(quickViewProduct, selectedFormat.value)
                            setQuickViewProduct(null)
                          } else {
                            showNotification("Please select a format", "info")
                          }
                        }}
                        className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300"
                      >
                        Add to Sacred Collection
                      </button>
                      <button
                        onClick={() => {
                          const selectedFormat = document.querySelector(
                            `input[name="quickview-format-${quickViewProduct.id}"]:checked`,
                          ) as HTMLInputElement
                          if (selectedFormat) {
                            handlePurchase(quickViewProduct, selectedFormat.value)
                            setQuickViewProduct(null)
                          } else {
                            showNotification("Please select a format", "info")
                          }
                        }}
                        className="w-full border border-gold text-gold hover:bg-gold hover:text-midnight-blue font-montserrat font-medium py-3 px-4 rounded-full transition-all duration-300"
                      >
                        Purchase Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-midnight-blue rounded-3xl max-w-2xl w-full p-6 border border-gold/30 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="absolute top-4 right-4 text-magnolia-white/60 hover:text-magnolia-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-playfair font-semibold text-magnolia-white mb-2">
                    Complete Your Sacred Purchase
                  </h2>
                  <p className="text-magnolia-white/70 font-lora">
                    You're one step away from beginning your transformation journey
                  </p>
                </div>

                {/* Order Summary */}
                <div className="mb-6 p-4 bg-midnight-blue/50 rounded-2xl border border-sage-green/20">
                  <h3 className="text-lg font-playfair font-semibold text-magnolia-white mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.cartId} className="flex justify-between items-center text-sm">
                        <span className="text-magnolia-white/80 font-lora">
                          {item.name} ({getFormatLabel(item.selectedFormat)}) × {item.quantity}
                        </span>
                        <span className="text-gold font-montserrat">
                          ${(item.prices[item.selectedFormat] * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-sage-green/20 mt-3 pt-3 flex justify-between items-center">
                    <span className="text-lg font-playfair font-semibold text-magnolia-white">Total:</span>
                    <span className="text-xl font-playfair font-bold text-gold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Customer Information Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    completePurchase({
                      email: formData.get("email"),
                      firstName: formData.get("firstName"),
                      lastName: formData.get("lastName"),
                    })
                  }}
                >
                  <div className="space-y-4 mb-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-montserrat font-medium text-magnolia-white mb-2"
                      >
                        Sacred Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-midnight-blue/50 border border-gold/30 rounded-xl text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 font-lora"
                        placeholder="your.sacred.email@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-montserrat font-medium text-magnolia-white mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-midnight-blue/50 border border-gold/30 rounded-xl text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 font-lora"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-montserrat font-medium text-magnolia-white mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-midnight-blue/50 border border-gold/30 rounded-xl text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 font-lora"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="mb-6 p-4 bg-midnight-blue/50 rounded-2xl border border-gold/30">
                    <h3 className="text-lg font-playfair font-semibold text-magnolia-white mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Sacred Payment
                    </h3>
                    <div className="text-center py-8 text-magnolia-white/60 font-lora">
                      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-gold" />
                      </div>
                      <p>Secure payment processing will be integrated here</p>
                      <p className="text-sm mt-2">Stripe Elements will be mounted in production</p>
                    </div>
                  </div>

                  {/* Complete Purchase Button */}
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className={`w-full font-montserrat font-bold py-4 px-6 rounded-full transition-all duration-300 ${
                      isProcessingPayment
                        ? "bg-gold/50 text-midnight-blue/50 cursor-not-allowed"
                        : "bg-gold hover:bg-gold/90 text-midnight-blue hover:shadow-lg"
                    }`}
                  >
                    {isProcessingPayment ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-midnight-blue border-t-transparent mr-2"></div>
                        Processing Sacred Transaction...
                      </span>
                    ) : (
                      `Complete Sacred Purchase - $${cartTotal.toFixed(2)}`
                    )}
                  </button>

                  <p className="text-center text-xs text-magnolia-white/60 mt-4 font-lora">
                    By completing this purchase, you're investing in your sacred transformation journey. All digital
                    products include lifetime access and loving support.
                  </p>
                </form>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-gold/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="text-sage-green">
                      <div className="w-8 h-8 mx-auto mb-2">🔒</div>
                      <p className="text-xs font-lora">Secure Checkout</p>
                    </div>
                    <div className="text-sage-green">
                      <div className="w-8 h-8 mx-auto mb-2">⚡</div>
                      <p className="text-xs font-lora">Instant Delivery</p>
                    </div>
                    <div className="text-sage-green">
                      <div className="w-8 h-8 mx-auto mb-2">💝</div>
                      <p className="text-xs font-lora">Lifetime Access</p>
                    </div>
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

// Product Card Component
function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  onToggleFavorite,
  isFavorite,
  onPurchase,
}: {
  product: SacredProduct
  onAddToCart: (product: SacredProduct, format: string) => void
  onQuickView: (product: SacredProduct) => void
  onToggleFavorite: (productId: string) => void
  isFavorite: boolean
  onPurchase: (product: SacredProduct, format: string) => void
}) {
  const [selectedFormat, setSelectedFormat] = useState(product.formats[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-midnight-blue/50 rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-sage-green/20 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/20 group"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
              ✨ Sacred Featured
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
              SACRED SALE
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-200"
        >
          <Heart
            size={18}
            className={`transition-all duration-200 ${
              isFavorite ? "fill-sage-green text-sage-green" : "text-midnight-blue"
            }`}
          />
        </button>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-midnight-blue/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button
            onClick={() => onQuickView(product)}
            className="bg-magnolia-white/20 backdrop-blur-sm text-magnolia-white p-2 rounded-full hover:bg-magnolia-white/30 transition-colors duration-200"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => onAddToCart(product, selectedFormat)}
            className="bg-gold text-midnight-blue p-2 rounded-full hover:bg-gold/90 transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-playfair font-semibold text-magnolia-white mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-magnolia-white/70 text-sm mb-4 line-clamp-3 font-lora">{product.description}</p>

        {/* Format Selection */}
        {product.formats.length > 1 && (
          <div className="mb-4">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 bg-midnight-blue/50 border border-sage-green/30 rounded-lg text-magnolia-white text-sm font-lora focus:outline-none focus:border-gold"
            >
              {product.formats.map((format) => (
                <option key={format} value={format}>
                  {format === "digital"
                    ? "Digital PDF"
                    : format === "print"
                      ? "Print Edition"
                      : format === "physical"
                        ? "Physical Product"
                        : format === "kdp"
                          ? "Amazon Paperback"
                          : format}{" "}
                  - ${product.prices[format]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-playfair font-bold text-gold">${product.prices[selectedFormat]}</span>
            {product.originalPrice && (
              <span className="text-lg text-magnolia-white/50 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-montserrat font-medium ${
              product.type === "digital-download"
                ? "bg-sage-green/20 text-sage-green"
                : product.type === "shopify-product"
                  ? "bg-warm-gray/20 text-warm-gray"
                  : "bg-gold/20 text-gold"
            }`}
          >
            {product.type === "digital-download"
              ? "Digital"
              : product.type === "shopify-product"
                ? "Physical"
                : "External"}
          </span>
        </div>

        {/* Product Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-sage-green/20 text-sage-green text-xs rounded font-lora">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onAddToCart(product, selectedFormat)}
            className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-3 px-4 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Add to Sacred Collection
          </button>
          <button
            onClick={() => onPurchase(product, selectedFormat)}
            className="w-full border border-gold text-gold hover:bg-gold hover:text-midnight-blue font-montserrat font-medium py-2 px-4 rounded-full transition-all duration-300"
          >
            {product.type === "digital-download"
              ? "Buy Now - Instant Download"
              : product.type === "kdp-external"
                ? "View on Amazon"
                : "Buy Now - Ships Soon"}
          </button>
        </div>

        {/* Delivery Info */}
        <div className="mt-3 text-xs text-magnolia-white/60 font-lora">
          {product.type === "digital-download"
            ? `✓ ${product.deliveryTime}`
            : product.type === "shopify-product"
              ? `🚚 ${product.shipping}`
              : "📚 Available on Amazon"}
        </div>
      </div>
    </motion.div>
  )
}
