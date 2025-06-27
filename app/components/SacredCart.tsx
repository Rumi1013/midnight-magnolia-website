"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Minus, Plus, Trash2, Lock, Zap, Gift } from "lucide-react"
import { formatLabels } from "@/lib/products"

export interface CartItem {
  id: string
  productId: string
  name: string
  format: string
  price: number
  quantity: number
  image?: string
}

interface SacredCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onProceedToCheckout: () => void
}

export default function SacredCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: SacredCartProps) {
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(total)
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Sacred Backdrop */}
          <motion.div
            className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sacred Cart Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-midnight-blue border-l-2 border-gold z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Sacred Header */}
            <div className="sticky top-0 bg-midnight-blue border-b border-gold/20 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="font-playfair text-2xl font-bold text-magnolia-white">Your Sacred Collection</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-magnolia-white/10 transition-colors duration-200"
                  aria-label="Close sacred cart"
                >
                  <X size={24} className="text-magnolia-white" />
                </button>
              </div>
              {totalItems > 0 && (
                <p className="font-lora text-magnolia-white/70 text-sm mt-2">
                  {totalItems} sacred {totalItems === 1 ? "item" : "items"} in your collection
                </p>
              )}
            </div>

            {/* Sacred Cart Content */}
            <div className="flex-1 p-6">
              {items.length === 0 ? (
                /* Empty Sacred State */
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🌸</div>
                  <h3 className="font-playfair text-2xl text-magnolia-white/80 mb-4">Your Sacred Collection Awaits</h3>
                  <p className="font-lora text-magnolia-white/60 mb-8 max-w-sm mx-auto">
                    Begin your transformation journey by adding sacred offerings to your collection.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
                  >
                    Continue Sacred Journey
                  </button>
                </div>
              ) : (
                /* Sacred Items */
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-midnight-blue/50 rounded-2xl p-4 border border-gold/20"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <div className="flex gap-4">
                        {/* Item Image */}
                        <div className="w-16 h-16 bg-magnolia-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <ShoppingBag size={24} className="text-gold" />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-playfair text-lg font-semibold text-magnolia-white mb-1 truncate">
                            {item.name}
                          </h4>
                          <p className="font-lora text-magnolia-white/70 text-sm mb-2">{formatLabels[item.format]}</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="w-8 h-8 rounded-full bg-magnolia-white/10 hover:bg-magnolia-white/20 flex items-center justify-center transition-colors duration-200"
                              >
                                <Minus size={14} className="text-magnolia-white" />
                              </button>
                              <span className="font-montserrat text-magnolia-white font-semibold min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-magnolia-white/10 hover:bg-magnolia-white/20 flex items-center justify-center transition-colors duration-200"
                              >
                                <Plus size={14} className="text-magnolia-white" />
                              </button>
                            </div>

                            {/* Price and Remove */}
                            <div className="flex items-center gap-3">
                              <span className="font-playfair text-lg font-bold text-gold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-2 rounded-full hover:bg-red-500/20 transition-colors duration-200"
                                aria-label="Remove from sacred collection"
                              >
                                <Trash2 size={16} className="text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sacred Summary & Checkout */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-midnight-blue border-t border-gold/20 p-6">
                {/* Sacred Subtotal */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-playfair text-xl text-magnolia-white">Sacred Subtotal:</span>
                  <span className="font-playfair text-2xl font-bold text-gold">${subtotal.toFixed(2)}</span>
                </div>

                {/* Sacred Trust Signals */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-midnight-blue/50 rounded-2xl border border-gold/20">
                  <div className="text-center">
                    <Lock size={20} className="text-sage-green mx-auto mb-1" />
                    <span className="font-montserrat text-xs text-magnolia-white/80">Sacred Secure</span>
                  </div>
                  <div className="text-center">
                    <Zap size={20} className="text-gold mx-auto mb-1" />
                    <span className="font-montserrat text-xs text-magnolia-white/80">Instant Access</span>
                  </div>
                  <div className="text-center">
                    <Gift size={20} className="text-sage-green mx-auto mb-1" />
                    <span className="font-montserrat text-xs text-magnolia-white/80">Lifetime Support</span>
                  </div>
                </div>

                {/* Sacred Actions */}
                <div className="space-y-3">
                  <button
                    onClick={onProceedToCheckout}
                    className="w-full bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-bold py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    Begin Sacred Checkout
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-transparent border border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold py-3 rounded-full transition-all duration-300"
                  >
                    Continue Sacred Journey
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
