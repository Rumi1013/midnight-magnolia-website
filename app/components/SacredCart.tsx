"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, Sparkles, Download, CreditCard } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/app/hooks/useCart"

interface SacredCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function SacredCart({ isOpen, onClose }: SacredCartProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // 🌸 Handle checkout
  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsCheckingOut(true)
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            format: item.format,
            digitalDelivery: item.digitalDelivery,
          })),
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Something went wrong. Please try again gently.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-magnolia-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage-green/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-sage-green" size={24} />
                <div>
                  <h2 className="font-playfair text-xl font-bold text-midnight-blue">Sacred Collection</h2>
                  <p className="font-lora text-sm text-midnight-blue/70">
                    {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-sage-green/10 rounded-full transition-colors duration-200"
                aria-label="Close cart"
              >
                <X className="text-midnight-blue" size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌸</div>
                  <h3 className="font-playfair text-xl text-midnight-blue/80 mb-2">Your collection is empty</h3>
                  <p className="font-lora text-midnight-blue/60 mb-6">
                    Discover sacred offerings to support your healing journey.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 bg-sage-green/5 rounded-2xl border border-sage-green/10"
                    >
                      {/* Product Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64&text=Product"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        {item.digitalDelivery === "instant" && (
                          <div className="absolute top-1 right-1 bg-sage-green text-midnight-blue rounded-full p-1">
                            <Download size={8} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-playfair font-semibold text-midnight-blue text-sm leading-tight mb-1">
                          {item.name}
                        </h4>
                        <p className="font-montserrat text-xs text-sage-green font-semibold mb-1">
                          {item.format.charAt(0).toUpperCase() + item.format.slice(1)} Format
                        </p>
                        <p className="font-lora text-xs text-midnight-blue/60 line-clamp-2">{item.description}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-sage-green/20 rounded-full transition-colors duration-200"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} className="text-midnight-blue" />
                            </button>
                            <span className="font-montserrat text-sm font-semibold text-midnight-blue w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-sage-green/20 rounded-full transition-colors duration-200"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} className="text-midnight-blue" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-playfair font-bold text-midnight-blue">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="font-lora text-xs text-midnight-blue/50 hover:text-red-500 transition-colors duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sage-green/20 p-6 bg-sage-green/5">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-playfair text-lg font-semibold text-midnight-blue">Sacred Investment:</span>
                  <span className="font-playfair text-2xl font-bold text-midnight-blue">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-sage-green hover:bg-sage-green/90 disabled:bg-sage-green/50 
                           text-midnight-blue font-montserrat font-semibold py-4 rounded-2xl 
                           transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-midnight-blue border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      Continue Your Journey
                    </>
                  )}
                </button>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-midnight-blue/60 hover:text-midnight-blue font-lora text-sm transition-colors duration-200"
                >
                  Clear Collection
                </button>

                {/* Sacred Promise */}
                <div className="mt-4 p-3 bg-magnolia-white rounded-lg border border-sage-green/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-sage-green" />
                    <span className="font-montserrat text-xs font-semibold text-sage-green">Sacred Promise</span>
                  </div>
                  <p className="font-lora text-xs text-midnight-blue/70 leading-relaxed">
                    30-day healing guarantee • Instant digital delivery • Lifetime support for your journey
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
