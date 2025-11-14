"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  Check,
  Package,
  Truck,
  Shield,
  Download,
} from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"
import type { Product } from "../data/products"
import ReactMarkdown from "react-markdown"

interface ProductPageClientProps {
  product: Product
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)

  const images = product.images || [product.image]
  const isDigital = product.category === "Digital Altars" || product.category === "Journals & Planners" && product.price > 40

  const handleAddToCart = () => {
    // TODO: Integrate with Shopify cart
    alert(`Added ${quantity} x ${product.name} to cart!`)
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24 pb-20">
        {/* Back Button */}
        <div className="container mx-auto px-6 mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sage-green hover:text-rich-gold transition-colors duration-300 font-lora"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </Link>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden mb-4 border border-rich-gold/20 shadow-2xl bg-magnolia-white/5">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.comingSoon && (
                  <div className="absolute top-4 right-4 bg-rich-gold text-midnight-blue px-4 py-2 rounded-full font-montserrat text-sm font-semibold">
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? "border-sage-green"
                          : "border-magnolia-white/20 hover:border-magnolia-white/40"
                      }`}
                    >
                      <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Category */}
              <div className="flex items-center gap-3">
                <span className="text-sage-green font-montserrat text-sm font-semibold uppercase tracking-wider">
                  {product.category}
                </span>
                {isDigital && (
                  <span className="flex items-center gap-1 text-rich-gold font-montserrat text-sm">
                    <Download size={14} />
                    Digital Product
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating) ? "fill-rich-gold text-rich-gold" : "text-magnolia-white/30"
                      }
                    />
                  ))}
                </div>
                <span className="font-lora text-magnolia-white/70 text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="font-lora text-lg text-magnolia-white/80 leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 py-4 border-y border-magnolia-white/20">
                <span className="font-playfair text-4xl font-bold text-rich-gold">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="font-lora text-xl text-magnolia-white/50 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="font-montserrat text-sm font-semibold text-sage-green bg-sage-green/20 px-3 py-1 rounded-full">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              {!product.comingSoon && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-magnolia-white/20 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-magnolia-white hover:bg-magnolia-white/10 transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 text-magnolia-white font-montserrat">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-magnolia-white hover:bg-magnolia-white/10 transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                        liked
                          ? "bg-rich-gold border-rich-gold text-midnight-blue"
                          : "border-magnolia-white/30 text-magnolia-white hover:border-magnolia-white/50"
                      }`}
                    >
                      <Heart size={20} fill={liked ? "currentColor" : "none"} />
                    </button>
                    <button className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-magnolia-white/30 text-magnolia-white hover:border-magnolia-white/50 transition-all duration-300">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Coming Soon */}
              {product.comingSoon && (
                <div className="bg-rich-gold/20 border border-rich-gold/30 rounded-xl p-6 text-center">
                  <p className="font-montserrat text-rich-gold font-semibold mb-3">
                    This product is coming soon!
                  </p>
                  <p className="font-lora text-magnolia-white/80 text-sm mb-4">
                    Sign up to be notified when it becomes available.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 rounded-lg bg-midnight-blue border border-magnolia-white/20 text-magnolia-white placeholder-magnolia-white/50 focus:outline-none focus:ring-2 focus:ring-sage-green"
                    />
                    <button className="bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue font-montserrat font-semibold px-6 py-2 rounded-lg transition-all duration-300">
                      Notify Me
                    </button>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-3 pt-4">
                {isDigital ? (
                  <>
                    <div className="flex items-center gap-3 text-magnolia-white/80">
                      <Download className="text-sage-green" size={20} />
                      <span className="font-lora text-sm">Instant digital download</span>
                    </div>
                    <div className="flex items-center gap-3 text-magnolia-white/80">
                      <Shield className="text-sage-green" size={20} />
                      <span className="font-lora text-sm">Lifetime access + updates</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-magnolia-white/80">
                      <Truck className="text-sage-green" size={20} />
                      <span className="font-lora text-sm">Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center gap-3 text-magnolia-white/80">
                      <Package className="text-sage-green" size={20} />
                      <span className="font-lora text-sm">Ships within 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-3 text-magnolia-white/80">
                      <Shield className="text-sage-green" size={20} />
                      <span className="font-lora text-sm">30-day return policy</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Detailed Description */}
          <div className="max-w-7xl mx-auto mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Long Description */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="font-lora text-magnolia-white/90 leading-relaxed">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h2 className="font-playfair text-3xl font-bold text-magnolia-white mt-8 mb-4">
                            {children}
                          </h2>
                        ),
                        h2: ({ children }) => (
                          <h3 className="font-playfair text-2xl font-bold text-sage-green mt-6 mb-3">
                            {children}
                          </h3>
                        ),
                        h3: ({ children }) => (
                          <h4 className="font-playfair text-xl font-bold text-magnolia-white mt-4 mb-2">
                            {children}
                          </h4>
                        ),
                        p: ({ children }) => <p className="text-lg leading-relaxed mb-4">{children}</p>,
                        strong: ({ children }) => <strong className="text-rich-gold font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 ml-4 mb-4">{children}</ul>,
                        li: ({ children }) => <li className="text-magnolia-white/80">{children}</li>,
                      }}
                    >
                      {product.longDescription}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Features */}
                <div className="bg-magnolia-white/5 backdrop-blur-sm border border-magnolia-white/10 rounded-2xl p-6">
                  <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="text-sage-green flex-shrink-0 mt-1" size={18} />
                        <span className="font-lora text-magnolia-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Included */}
                <div className="bg-magnolia-white/5 backdrop-blur-sm border border-magnolia-white/10 rounded-2xl p-6">
                  <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {product.whatsIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Package className="text-rich-gold flex-shrink-0 mt-1" size={18} />
                        <span className="font-lora text-magnolia-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-sage-green/20 text-sage-green font-lora text-xs border border-sage-green/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

