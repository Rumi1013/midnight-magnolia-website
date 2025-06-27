"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, ShoppingBag, ExternalLink, Sparkles, Star } from "lucide-react"
import type { SacredProduct } from "@/lib/products"
import { formatLabels } from "@/lib/products"

interface SacredProductCardProps {
  product: SacredProduct
  onAddToCart: (productId: string, format: string, price: number) => void
  onAddToWishlist: (productId: string) => void
  isInWishlist: boolean
}

export default function SacredProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}: SacredProductCardProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>(product.formats[0])
  const [isHovered, setIsHovered] = useState(false)

  const selectedPrice = product.prices[selectedFormat] || Object.values(product.prices)[0]

  const handleAddToCart = () => {
    if (product.externalLink) {
      window.open(product.externalLink, "_blank")
      return
    }
    onAddToCart(product.id, selectedFormat, selectedPrice)
  }

  const getBadgeInfo = () => {
    if (product.featured) return { text: "Sacred Featured", color: "bg-gold text-midnight-blue" }
    if (product.tags.includes("bestseller")) return { text: "Bestseller", color: "bg-sage-green text-midnight-blue" }
    if (product.tags.includes("new")) return { text: "New", color: "bg-magnolia-white text-midnight-blue" }
    return null
  }

  const badge = getBadgeInfo()

  return (
    <motion.div
      className="bg-magnolia-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col group border border-gold/20"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sacred Product Image */}
      <div className="relative aspect-square overflow-hidden bg-midnight-blue/5">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=400&text=Sacred+Product"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Sacred Overlay */}
        <motion.div
          className="absolute inset-0 bg-midnight-blue/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="text-gold mx-auto mb-2" size={32} />
            <p className="text-magnolia-white font-lora text-sm">Sacred Preview</p>
          </motion.div>
        </motion.div>

        {/* Sacred Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-montserrat font-bold ${badge.color}`}>
              {badge.text}
            </span>
          )}
        </div>

        {/* Sacred Wishlist Button */}
        <button
          onClick={() => onAddToWishlist(product.id)}
          className="absolute top-4 right-4 p-3 rounded-full bg-magnolia-white/90 hover:bg-magnolia-white transition-all duration-200 hover:scale-110"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={`transition-all duration-200 ${
              isInWishlist ? "fill-sage-green text-sage-green" : "text-midnight-blue hover:text-sage-green"
            }`}
          />
        </button>
      </div>

      {/* Sacred Product Details */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Sacred Product Name */}
        <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-3 leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Sacred Description */}
        <p className="font-lora text-midnight-blue/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* Sacred Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-midnight-blue/10 text-midnight-blue/70 rounded-full text-xs font-montserrat"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Sacred Format Selection */}
        {product.formats.length > 1 && !product.externalLink && (
          <div className="mb-4">
            <label className="block font-montserrat text-midnight-blue/80 text-sm font-semibold mb-2">
              Choose Format:
            </label>
            <div className="space-y-2">
              {product.formats.map((format) => (
                <label key={format} className="flex items-center cursor-pointer group/format">
                  <input
                    type="radio"
                    name={`format-${product.id}`}
                    value={format}
                    checked={selectedFormat === format}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-200 ${
                      selectedFormat === format
                        ? "border-gold bg-gold"
                        : "border-midnight-blue/30 group-hover/format:border-gold"
                    }`}
                  >
                    {selectedFormat === format && <div className="w-2 h-2 bg-midnight-blue rounded-full m-0.5"></div>}
                  </div>
                  <span className="font-lora text-sm text-midnight-blue flex-1">
                    {formatLabels[format]} - ${product.prices[format]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sacred Price Display */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-playfair text-2xl font-bold text-midnight-blue">${selectedPrice}</span>
            {product.formats.length === 1 && (
              <p className="font-montserrat text-midnight-blue/60 text-xs">{formatLabels[product.formats[0]]}</p>
            )}
          </div>
          {product.featured && (
            <div className="flex items-center gap-1">
              <Star size={16} className="text-gold fill-gold" />
              <span className="font-montserrat text-xs text-midnight-blue/70">Featured</span>
            </div>
          )}
        </div>

        {/* Sacred Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-montserrat font-bold text-sm transition-all duration-300 ${
              product.inStock
                ? product.externalLink
                  ? "bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white hover:shadow-lg"
                  : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                : "bg-warm-gray/50 text-midnight-blue/50 cursor-not-allowed"
            }`}
          >
            {product.externalLink ? (
              <>
                <ExternalLink size={18} />
                View on Amazon
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                {product.inStock ? "Add to Sacred Collection" : "Currently Unavailable"}
              </>
            )}
          </button>

          {!product.externalLink && (
            <button
              onClick={() => onAddToWishlist(product.id)}
              className="w-full bg-transparent border border-sage-green/50 text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold py-3 rounded-full transition-all duration-300"
            >
              {isInWishlist ? "♥ Saved to Wishlist" : "♡ Save for Later"}
            </button>
          )}
        </div>

        {/* Sacred Trust Signal */}
        {!product.externalLink && (
          <div className="mt-4 pt-4 border-t border-midnight-blue/10">
            <div className="flex items-center justify-center gap-2 text-midnight-blue/60">
              <div className="w-2 h-2 bg-sage-green rounded-full"></div>
              <span className="font-montserrat text-xs">Instant Digital Delivery</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
