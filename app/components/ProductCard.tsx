"use client"

import { useState } from "react"
import { useCart } from "../hooks/useCart"

interface ProductFormat {
  name: string
  price: number
  type: "digital" | "print" | "physical"
}

interface ProductCardProps {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  image: string
  formats: ProductFormat[]
  features: string[]
  comingSoon?: boolean
  bestseller?: boolean
}

export default function ProductCard({
  id,
  title,
  subtitle,
  description,
  category,
  image,
  formats,
  features,
  comingSoon = false,
  bestseller = false,
}: ProductCardProps) {
  const [selectedFormat, setSelectedFormat] = useState(formats[0])
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: `${id}-${selectedFormat.name}`,
      name: `${title} - ${selectedFormat.name}`,
      price: selectedFormat.price,
      image,
      format: selectedFormat.name,
      type: selectedFormat.type,
    })
  }

  return (
    <div className="relative bg-magnolia-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 max-w-sm mx-auto">
      {/* Coming Soon Banner */}
      {comingSoon && (
        <div className="absolute -top-2 -right-2 bg-gold text-midnight-blue px-4 py-1 rounded-full text-sm font-montserrat font-semibold transform rotate-12 z-10">
          COMING SOON
        </div>
      )}

      {/* Bestseller Badge */}
      {bestseller && (
        <div className="absolute -top-2 -left-2 bg-sage-green text-midnight-blue px-4 py-1 rounded-full text-sm font-montserrat font-semibold z-10">
          Bestseller
        </div>
      )}

      {/* Product Image */}
      <div className="flex justify-center mb-6">
        <div className="text-6xl">{image}</div>
      </div>

      {/* Category Badge */}
      <div className="flex justify-center mb-4">
        <span className="bg-midnight-blue text-magnolia-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Product Title */}
      <h3 className="font-playfair text-2xl font-bold text-midnight-blue text-center mb-2">{title}</h3>
      <p className="font-montserrat text-sm text-midnight-blue/80 text-center mb-4 uppercase tracking-wider">
        {subtitle}
      </p>

      {/* Description */}
      <p className="font-lora text-midnight-blue/70 text-center mb-6 leading-relaxed">{description}</p>

      {/* Available Formats */}
      <div className="mb-6">
        <p className="font-montserrat text-sm font-semibold text-midnight-blue mb-3">Available Formats:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {formats.map((format) => (
            <button
              key={format.name}
              onClick={() => setSelectedFormat(format)}
              className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold transition-all duration-300 ${
                selectedFormat.name === format.name
                  ? "bg-midnight-blue text-magnolia-white"
                  : "bg-warm-gray text-midnight-blue hover:bg-midnight-blue hover:text-magnolia-white"
              }`}
            >
              {format.name}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm font-lora text-midnight-blue/70">
            <span className="w-2 h-2 bg-sage-green rounded-full mr-3 flex-shrink-0"></span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Pricing */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-playfair text-2xl font-bold text-gold">${selectedFormat.price}</span>
          <p className="font-montserrat text-xs text-midnight-blue/60 capitalize">{selectedFormat.type}</p>
        </div>
        {formats.length > 1 && (
          <div className="text-right">
            <span className="font-playfair text-2xl font-bold text-midnight-blue">
              ${formats[formats.length - 1].price}
            </span>
            <p className="font-montserrat text-xs text-midnight-blue/60 capitalize">
              {formats[formats.length - 1].type}
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={comingSoon ? undefined : handleAddToCart}
        disabled={comingSoon}
        className={`w-full py-4 rounded-full font-montserrat font-semibold text-lg transition-all duration-300 ${
          comingSoon
            ? "bg-warm-gray text-midnight-blue/60 cursor-not-allowed"
            : "bg-sage-green hover:bg-sage-green/90 text-midnight-blue hover:shadow-lg hover:scale-105"
        }`}
      >
        {comingSoon ? "Coming Soon" : "Add to Sacred Collection"}
      </button>
    </div>
  )
}
