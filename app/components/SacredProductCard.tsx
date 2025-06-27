"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag, Heart, ExternalLink, Sparkles } from "lucide-react"
import { type SacredProduct, formatLabels } from "@/lib/products"

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

  return (
    <motion.article
      className="bg-midnight-blue rounded-3xl overflow-hidden shadow-sm hover:shadow-mystical transition-all duration-300 h-full flex flex-col group border border-gold/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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

        {/* Sacred Overlay */}
        <motion.div
          className="absolute inset-0 bg-midnight-blue/80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg">
            Quick Sacred View
          </button>
        </motion.div>

        {/* Sacred Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gold/90 text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold flex items-center gap-1">
              <Sparkles size={12} />
              Sacred Featured
            </span>
          )}
          {product.tags.includes("bestseller") && (
            <span className="bg-sage-green/90 text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
              🌟 Bestseller
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="bg-magnolia-white/90 text-midnight-blue px-3 py-1 rounded-full text-xs font-montserrat font-bold">
              ✨ New
            </span>
          )}
        </div>

        {/* Sacred Heart Button */}
        <button
          onClick={() => onAddToWishlist(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-magnolia-white/80 hover:bg-magnolia-white transition-all duration-200"
        >
          <Heart
            size={18}
            className={`transition-all duration-200 ${
              isInWishlist ? "fill-sage-green text-sage-green" : "text-midnight-blue"
            }`}
          />
        </button>
      </div>

      {/* Sacred Product Details */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-3 leading-tight">{product.name}</h3>

        {/* Description */}
        <p className="font-lora text-magnolia-white/80 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

        {/* Format Selection */}
        {product.formats.length > 1 && !product.externalLink && (
          <div className="mb-4 p-4 bg-midnight-blue/50 rounded-2xl border border-gold/20">
            <h4 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3">Choose Sacred Format:</h4>
            <div className="space-y-2">
              {product.formats.map((format) => (
                <label key={format} className="flex items-center cursor-pointer group">
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
                        : "border-magnolia-white/50 group-hover:border-gold/70"
                    }`}
                  >
                    {selectedFormat === format && <div className="w-2 h-2 bg-midnight-blue rounded-full m-0.5"></div>}
                  </div>
                  <span className="font-lora text-magnolia-white text-sm flex-1">
                    {formatLabels[format]} - ${product.prices[format]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Display */}
        <div className="mb-4">
          <span className="font-playfair text-3xl font-bold text-gold">${selectedPrice}</span>
          {product.formats.length === 1 && (
            <span className="font-lora text-magnolia-white/70 text-sm ml-2">{formatLabels[product.formats[0]]}</span>
          )}
        </div>

        {/* Sacred Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-montserrat font-semibold text-sm transition-all duration-200 ${
              product.inStock
                ? product.externalLink
                  ? "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg"
                  : "bg-gold hover:bg-gold/90 text-midnight-blue hover:shadow-lg"
                : "bg-warm-gray/50 text-midnight-blue/50 cursor-not-allowed"
            }`}
          >
            {product.externalLink ? (
              <>
                <ExternalLink size={16} />
                View on Amazon
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                {product.inStock ? "Add to Sacred Collection" : "Currently Unavailable"}
              </>
            )}
          </button>

          {!product.externalLink && (
            <button
              onClick={() => onAddToWishlist(product.id)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-montserrat font-semibold text-sm bg-transparent text-sage-green border border-sage-green hover:bg-sage-green hover:text-midnight-blue transition-all duration-200"
            >
              <Heart size={16} className={isInWishlist ? "fill-current" : ""} />
              {isInWishlist ? "Saved to Wishlist" : "Save for Later"}
            </button>
          )}
        </div>

        {/* Sacred Tags */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gold/20">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-3 py-1 bg-sage-green/20 text-sage-green text-xs font-montserrat rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
