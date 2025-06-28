"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"

// 🌙 Sacred product interface
interface SacredProduct {
  id: number
  name: string
  price: number
  image: string
  category: "All" | "Journals" | "Art" | "Candles"
  description: string
  rating: number
  reviews: number
  isBlessed?: boolean // ✨ Special products
}

const products: SacredProduct[] = [
  // Digital Sacred Tools
  {
    id: 1,
    name: "The Magnolia Reset 90-Day Journal",
    price: 29,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    category: "Journals",
    description: "Sacred transformation through ancestral wisdom and daily reflection",
    rating: 4.9,
    reviews: 127,
    isBlessed: true,
  },
  {
    id: 2,
    name: "Midnight Messages Tarot Deck",
    price: 19,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    category: "Art",
    description: "Digital tarot deck rooted in Southern Gothic wisdom",
    rating: 4.8,
    reviews: 89,
    isBlessed: true,
  },
  {
    id: 3,
    name: "Sacred Productivity ADHD Planner",
    price: 19,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=400&fit=crop",
    category: "Journals",
    description: "Gentle planning system for neurodivergent entrepreneurs",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    name: "Rose Quartz Crystal Set",
    price: 35,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
    category: "Candles",
    description: "Hand-selected crystals for heart healing and self-love",
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 5,
    name: "Sacred Herb Bundle Collection",
    price: 28,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
    category: "Candles",
    description: "Ethically sourced herbs for cleansing and protection",
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 6,
    name: "Midnight Moon Candle Set",
    price: 45,
    image: "https://images.unsplash.com/photo-1546878819-a4ce9d29e200?w=300&h=400&fit=crop",
    category: "Candles",
    description: "Hand-poured candles for sacred ceremonies",
    rating: 4.9,
    reviews: 112,
    isBlessed: true,
  },
  {
    id: 7,
    name: "Digital Entrepreneur Starter Kit",
    price: 37,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=400&fit=crop",
    category: "Journals",
    description: "Complete business foundation with authentic marketing",
    rating: 4.8,
    reviews: 203,
  },
  {
    id: 8,
    name: "Sacred Pet Blessing Kit",
    price: 24,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=400&fit=crop",
    category: "Art",
    description: "Healing tools and blessings for your beloved companions",
    rating: 4.7,
    reviews: 67,
  },
]

interface ProductGridProps {
  products: SacredProduct[]
  className?: string
}

// 🌿 Gentle filter categories
const SACRED_CATEGORIES = [
  { key: "All", label: "All Offerings", icon: "🌙" },
  { key: "Journals", label: "Sacred Journals", icon: "📖" },
  { key: "Art", label: "Digital Art", icon: "🎨" },
  { key: "Candles", label: "Candle Magic", icon: "🕯️" },
] as const

export default function ProductGrid({ products: propProducts, className = "" }: ProductGridProps) {
  // 🌸 Gentle state management
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [visibleCount, setVisibleCount] = useState(8)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  // 🌿 Filter products with intention
  const filteredProducts = products.filter((product) => activeCategory === "All" || product.category === activeCategory)

  const visibleProducts = filteredProducts.slice(0, visibleCount)
  const hasMoreProducts = visibleCount < filteredProducts.length

  // 💝 Toggle favorite with gentle animation
  const toggleFavorite = (productId: number) => {
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

  // 🌙 Load more with sacred patience
  const loadMoreOfferings = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length))
  }

  return (
    <section className={`py-16 ${className}`} aria-label="Sacred product offerings">
      {/* 🌸 Gentle category filters */}
      <div className="mb-12">
        <nav role="tablist" aria-label="Product categories">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {SACRED_CATEGORIES.map((category) => (
              <li key={category.key} role="none">
                <button
                  role="tab"
                  aria-selected={activeCategory === category.key}
                  aria-controls="product-grid"
                  onClick={() => {
                    setActiveCategory(category.key)
                    setVisibleCount(8) // Reset count when filtering
                  }}
                  className={`
                    group relative px-6 py-3 rounded-full font-lora text-sm sm:text-base
                    transition-all duration-300 ease-in-out
                    ${
                      activeCategory === category.key
                        ? "bg-sage-green text-midnight-blue shadow-lg"
                        : "bg-magnolia-white/10 text-magnolia-white hover:bg-sage-green/20 hover:text-magnolia-white"
                    }
                  `}
                >
                  <span className="mr-2" aria-hidden="true">
                    {category.icon}
                  </span>
                  {category.label}

                  {/* 🌙 Gentle selection indicator */}
                  {activeCategory === category.key && (
                    <motion.div
                      layoutId="category-indicator"
                      className="absolute inset-0 bg-sage-green rounded-full -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 🌿 Sacred product grid */}
      <div id="product-grid" role="region" aria-live="polite">
        <motion.ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group"
              >
                <article
                  className="
                    bg-magnolia-white rounded-xl overflow-hidden shadow-sm
                    hover:shadow-mystical hover:border-sage-green/30
                    border border-transparent transition-all duration-300
                    h-full flex flex-col max-w-sm mx-auto
                  "
                >
                  {/* 🌸 Product image with gentle hover */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} - Sacred offering`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* 🌙 Blessed indicator */}
                    {product.isBlessed && (
                      <div className="absolute top-3 left-3 bg-rich-gold/90 text-midnight-blue px-2 py-1 rounded-full text-xs font-montserrat font-semibold">
                        ✨ Blessed
                      </div>
                    )}

                    {/* 💝 Favorite button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`${favorites.has(product.id) ? "Remove from" : "Add to"} favorites`}
                      className="
                        absolute top-3 right-3 p-2 rounded-full
                        bg-magnolia-white/80 hover:bg-magnolia-white
                        transition-all duration-200 group/heart
                      "
                    >
                      <Heart
                        size={18}
                        className={`
                          transition-all duration-200
                          ${
                            favorites.has(product.id)
                              ? "fill-sage-green text-sage-green"
                              : "text-midnight-blue group-hover/heart:text-sage-green"
                          }
                        `}
                      />
                    </button>
                  </div>

                  {/* 🌿 Product details */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* ⭐ Rating with gentle stars */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-rich-gold text-rich-gold" />
                      <span className="font-montserrat text-sm text-midnight-blue/80">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* 🌸 Product name */}
                    <h3 className="font-playfair text-lg font-semibold text-midnight-blue mb-2 leading-tight line-clamp-2">
                      {product.name}
                    </h3>

                    {/* 🌿 Description */}
                    <p className="font-lora text-midnight-blue/70 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                      {product.description}
                    </p>

                    {/* 🌙 Price and action */}
                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-xl font-bold text-midnight-blue">${product.price}</span>

                      <button
                        className="
                          flex items-center gap-2 px-3 py-2 rounded-full
                          bg-sage-green hover:bg-sage-green/90 text-midnight-blue
                          font-montserrat font-semibold text-xs
                          transition-all duration-200 hover:shadow-md
                          focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2
                        "
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {/* 🌸 Load more with sacred patience */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <motion.button
              onClick={loadMoreOfferings}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="
                px-8 py-4 rounded-full border-2 border-sage-green
                text-sage-green hover:bg-sage-green hover:text-midnight-blue
                font-lora font-semibold transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-rich-gold focus:ring-offset-2
              "
            >
              Reveal More Sacred Offerings
            </motion.button>
          </div>
        )}

        {/* 🌙 Gentle empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-2">No offerings found</h3>
            <p className="font-lora text-magnolia-white/60">Try exploring a different category, beautiful soul.</p>
          </div>
        )}
      </div>
    </section>
  )
}
