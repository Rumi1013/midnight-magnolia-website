"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingBag, Heart, AlertCircle, RefreshCw, Sparkles } from "lucide-react"

// 🌙 Sacred product interface
interface SacredProduct {
  id: string
  name: string
  price: number
  image: string
  description: string
  availableForSale: boolean
  isBlessed?: boolean
  isBestseller?: boolean
  isNew?: boolean
}

export default function ShopPageClient() {
  const [products, setProducts] = useState<SacredProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // 🌸 Fetch products safely on client side only
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/shopify/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }

      const data = await response.json()

      if (data.success && data.products) {
        setProducts(data.products)
      } else {
        throw new Error(data.message || "Failed to load products")
      }
    } catch (err: any) {
      console.error("Error fetching products:", err)
      setError(err.message || "Failed to connect to sacred sanctuary")
    } finally {
      setLoading(false)
    }
  }

  // 🌙 Load products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [])

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

  return (
    <div className="min-h-screen bg-midnight-blue">
      {/* 🌸 Sacred Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">Sacred Shop</h1>
            <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
              Curated healing tools and sacred offerings designed to support your wellness journey with Southern Gothic
              grace.
            </p>

            {/* 🌙 Status Indicator */}
            <div className="flex items-center justify-center gap-2 text-sm">
              {loading && (
                <>
                  <RefreshCw size={16} className="animate-spin text-sage-green" />
                  <span className="text-sage-green">Connecting to sacred sanctuary...</span>
                </>
              )}
              {!loading && !error && products.length > 0 && (
                <>
                  <Sparkles size={16} className="text-sage-green" />
                  <span className="text-sage-green">Sacred connection established</span>
                </>
              )}
              {error && (
                <>
                  <AlertCircle size={16} className="text-red-400" />
                  <span className="text-red-400">Connection disrupted</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌿 Products Section */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* 🌸 Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4"></div>
              <p className="font-lora text-magnolia-white/80">Loading sacred offerings...</p>
            </div>
          )}

          {/* 💔 Error State */}
          {error && !loading && (
            <div className="text-center py-16 max-w-2xl mx-auto">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h3 className="font-playfair text-3xl text-magnolia-white mb-4">Sacred Connection Disrupted</h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-6">
                <p className="font-lora text-red-300 text-sm leading-relaxed">{error}</p>
              </div>
              <button
                onClick={fetchProducts}
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
              >
                Restore Sacred Connection
              </button>
            </div>
          )}

          {/* ✨ Products Grid */}
          {!loading && !error && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-magnolia-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=400&text=Sacred+Product"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Badges */}
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
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-200"
                    >
                      <Heart
                        size={18}
                        className={`transition-all duration-200 ${
                          favorites.has(product.id) ? "fill-sage-green text-sage-green" : "text-midnight-blue"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Product Name */}
                    <h3 className="font-playfair text-xl font-semibold text-midnight-blue mb-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {product.description || "A sacred offering for your healing journey"}
                    </p>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-2xl font-bold text-midnight-blue">${product.price}</span>
                      <button
                        disabled={!product.availableForSale}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-montserrat font-semibold text-sm transition-all duration-200 ${
                          product.availableForSale
                            ? "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-md"
                            : "bg-warm-gray/50 text-midnight-blue/50 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingBag size={16} />
                        {product.availableForSale ? "Add to Cart" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 🌙 Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="font-playfair text-3xl text-magnolia-white/80 mb-4">No Sacred Offerings Found</h3>
              <p className="font-lora text-magnolia-white/60 mb-8 max-w-md mx-auto">
                The sanctuary is being prepared with new offerings. Please return soon, beautiful soul.
              </p>
              <button
                onClick={fetchProducts}
                className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Check for New Offerings
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
