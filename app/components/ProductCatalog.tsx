"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShoppingBag, Download, Heart, Sparkles } from "lucide-react"
import { useCart } from "@/app/hooks/useCart"

// 🌙 Sacred Product Database
const SACRED_PRODUCTS = [
  {
    id: "magnolia-reset-journal",
    name: "The Magnolia Reset 90-Day Journal",
    description:
      "Transform your healing journey with this sacred 90-day guided journal designed for gentle transformation at your own divine pace.",
    category: "journals",
    subcategory: "Healing Journals",
    tags: ["healing", "transformation", "90-day", "guided", "sacred"],
    formats: [
      { type: "digital", price: 29, description: "Instant PDF download with fillable fields" },
      { type: "print", price: 47, description: "Premium paperback with cream pages" },
      { type: "hardcover", price: 67, description: "Luxury hardcover with gold foil details" },
    ],
    images: ["/healing-journal-cover.png", "/placeholder.svg?height=400&width=300&text=Journal+Interior"],
    isBlessed: true,
    isBestseller: true,
    patreonExclusive: false,
    digitalDelivery: "instant",
    printFulfillment: "pod",
  },
  {
    id: "midnight-messages-tarot",
    name: "Midnight Messages Tarot Deck",
    description:
      "78-card Southern Gothic tarot deck channeling ancestral wisdom and healing energy for your spiritual journey.",
    category: "spiritual",
    subcategory: "Tarot & Divination",
    tags: ["tarot", "divination", "southern gothic", "ancestral", "spiritual"],
    formats: [
      { type: "digital", price: 19, description: "High-res printable PDF cards + guidebook" },
      { type: "print", price: 33, description: "Professional card stock with guidebook" },
      { type: "deluxe", price: 55, description: "Premium cards with velvet pouch & crystals" },
    ],
    images: [
      "/placeholder.svg?height=400&width=300&text=Tarot+Deck",
      "/placeholder.svg?height=400&width=300&text=Card+Spread",
    ],
    isBlessed: true,
    isNew: true,
    patreonExclusive: false,
    digitalDelivery: "instant",
    printFulfillment: "pod",
  },
  {
    id: "sacred-productivity-planner",
    name: "Sacred Productivity ADHD Planner",
    description:
      "Gentle productivity system designed specifically for neurodivergent souls, honoring your natural rhythms and energy cycles.",
    category: "planners",
    subcategory: "ADHD & Neurodivergent",
    tags: ["adhd", "productivity", "neurodivergent", "gentle", "planning"],
    formats: [
      { type: "digital", price: 19, description: "PDF planner with hyperlinked navigation" },
      { type: "print", price: 29, description: "Spiral-bound for easy daily use" },
    ],
    images: [
      "/placeholder.svg?height=400&width=300&text=ADHD+Planner",
      "/placeholder.svg?height=400&width=300&text=Planner+Pages",
    ],
    isBlessed: false,
    isBestseller: true,
    patreonExclusive: false,
    digitalDelivery: "instant",
    printFulfillment: "pod",
  },
  {
    id: "digital-entrepreneur-kit",
    name: "Digital Entrepreneur's Starter Kit",
    description:
      "Complete business foundation package with templates, guides, and automation workflows for spiritual entrepreneurs.",
    category: "business",
    subcategory: "Entrepreneur Resources",
    tags: ["business", "entrepreneur", "templates", "automation", "spiritual"],
    formats: [{ type: "digital", price: 37, description: "Complete digital package with bonus resources" }],
    images: [
      "/placeholder.svg?height=400&width=300&text=Business+Kit",
      "/placeholder.svg?height=400&width=300&text=Templates",
    ],
    isBlessed: true,
    isNew: false,
    patreonExclusive: false,
    digitalDelivery: "instant",
    printFulfillment: null,
  },
  {
    id: "brand-identity-workbook",
    name: "Brand Identity Workbook",
    description:
      "Discover your authentic brand voice and visual identity with this comprehensive workbook designed for conscious creators.",
    category: "business",
    subcategory: "Branding & Design",
    tags: ["branding", "identity", "design", "workbook", "authentic"],
    formats: [{ type: "digital", price: 29, description: "Interactive PDF with fillable worksheets" }],
    images: [
      "/placeholder.svg?height=400&width=300&text=Brand+Workbook",
      "/placeholder.svg?height=400&width=300&text=Brand+Pages",
    ],
    isBlessed: false,
    isBestseller: false,
    patreonExclusive: false,
    digitalDelivery: "instant",
    printFulfillment: null,
  },
  {
    id: "notion-dashboard-templates",
    name: "Notion Dashboard Templates",
    description:
      "Sacred productivity suite with 12 customizable Notion templates for business, wellness, and creative projects.",
    category: "digital-tools",
    subcategory: "Productivity Templates",
    tags: ["notion", "templates", "productivity", "dashboard", "organization"],
    formats: [{ type: "digital", price: 49, description: "12 Notion templates + video tutorials" }],
    images: [
      "/placeholder.svg?height=400&width=300&text=Notion+Templates",
      "/placeholder.svg?height=400&width=300&text=Dashboard+View",
    ],
    isBlessed: true,
    isBestseller: false,
    patreonExclusive: true,
    digitalDelivery: "instant",
    printFulfillment: null,
  },
]

// 🌸 Product Categories
const SACRED_CATEGORIES = [
  { key: "all", label: "All Sacred Offerings", icon: "✨", count: 0 },
  { key: "journals", label: "Healing Journals", icon: "📖", count: 0 },
  { key: "spiritual", label: "Spiritual Tools", icon: "🔮", count: 0 },
  { key: "planners", label: "Sacred Planners", icon: "📅", count: 0 },
  { key: "business", label: "Business Magic", icon: "💼", count: 0 },
  { key: "digital-tools", label: "Digital Sanctuaries", icon: "💻", count: 0 },
]

interface ProductCatalogProps {
  className?: string
}

export default function ProductCatalog({ className = "" }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedFormat, setSelectedFormat] = useState<Record<string, string>>({})
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { addToCart, isInCart, getCartItemCount } = useCart()

  // 🌿 Filter products by category
  const filteredProducts = SACRED_PRODUCTS.filter(
    (product) => activeCategory === "all" || product.category === activeCategory,
  )

  // 🌙 Update category counts
  const categoriesWithCounts = SACRED_CATEGORIES.map((category) => ({
    ...category,
    count:
      category.key === "all"
        ? SACRED_PRODUCTS.length
        : SACRED_PRODUCTS.filter((p) => p.category === category.key).length,
  }))

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

  // 🛍️ Get selected format for product
  const getSelectedFormat = (product: any) => {
    const formatKey = selectedFormat[product.id] || product.formats[0].type
    return product.formats.find((f: any) => f.type === formatKey) || product.formats[0]
  }

  // 🌸 Add to sacred collection (cart)
  const addToSacredCollection = (product: any) => {
    const format = getSelectedFormat(product)
    const cartItem = {
      id: `${product.id}-${format.type}`,
      productId: product.id,
      name: product.name,
      format: format.type,
      price: format.price,
      description: format.description,
      image: product.images[0],
      category: product.category,
      digitalDelivery: product.digitalDelivery,
      quantity: 1,
    }
    addToCart(cartItem)
  }

  return (
    <section className={`py-16 ${className}`}>
      {/* 🌙 Sacred Categories */}
      <div className="mb-12">
        <nav className="flex flex-wrap justify-center gap-4">
          {categoriesWithCounts.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`group relative px-6 py-4 rounded-2xl font-lora text-sm lg:text-base
                       transition-all duration-300 min-h-[70px] flex flex-col items-center justify-center
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
              <span className="text-xs opacity-75">({category.count})</span>

              {activeCategory === category.key && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute inset-0 bg-sage-green rounded-2xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ✨ Sacred Products Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const selectedFormat = getSelectedFormat(product)
            const cartItemId = `${product.id}-${selectedFormat.type}`
            const inCart = isInCart(cartItemId)

            return (
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
                {/* 🌸 Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={`${product.name} - Sacred offering`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Sacred Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isBlessed && (
                      <span className="bg-rich-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                        ✨ Blessed
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                        🌟 Bestseller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-midnight-blue/90 text-magnolia-white px-2 py-1 rounded-full text-xs font-montserrat font-bold">
                        ✨ New
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
                    aria-label={`${favorites.has(product.id) ? "Remove from" : "Add to"} favorites`}
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

                  {/* Digital Delivery Badge */}
                  {product.digitalDelivery === "instant" && (
                    <div className="absolute bottom-3 left-3 bg-sage-green/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-bold flex items-center gap-1">
                      <Download size={12} />
                      Instant Access
                    </div>
                  )}
                </div>

                {/* 🌿 Product Details */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Product Name */}
                  <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2 leading-tight">
                    {product.name}
                  </h3>

                  {/* Category */}
                  <div className="text-sage-green font-montserrat text-sm font-semibold mb-2">
                    {product.subcategory}
                  </div>

                  {/* Description */}
                  <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1">
                    {product.description}
                  </p>

                  {/* Format Selection */}
                  {product.formats.length > 1 && (
                    <div className="mb-4">
                      <label className="block font-montserrat text-xs font-semibold text-midnight-blue/80 mb-2">
                        Choose Format:
                      </label>
                      <select
                        value={selectedFormat[product.id] || product.formats[0].type}
                        onChange={(e) =>
                          setSelectedFormat((prev) => ({
                            ...prev,
                            [product.id]: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-sage-green/30 rounded-lg font-lora text-sm
                                 focus:outline-none focus:border-sage-green bg-magnolia-white"
                      >
                        {product.formats.map((format) => (
                          <option key={format.type} value={format.type}>
                            {format.type.charAt(0).toUpperCase() + format.type.slice(1)} - ${format.price}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-midnight-blue/60 mt-1 font-lora">{selectedFormat.description}</p>
                    </div>
                  )}

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

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">
                        ${selectedFormat.price}
                      </span>
                      {product.formats.length > 1 && (
                        <span className="font-lora text-sm text-midnight-blue/50">{selectedFormat.type}</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToSacredCollection(product)}
                      disabled={inCart}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-montserrat font-semibold text-sm
                               transition-all duration-200 hover:shadow-md focus:outline-none 
                               focus:ring-2 focus:ring-rich-gold focus:ring-offset-2
                               ${
                                 inCart
                                   ? "bg-sage-green/50 text-midnight-blue/70 cursor-not-allowed"
                                   : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue"
                               }`}
                    >
                      {inCart ? (
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
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* 🌙 Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No offerings found</h3>
          <p className="font-lora text-magnolia-white/60">Try exploring a different category, beautiful soul.</p>
        </div>
      )}
    </section>
  )
}
