"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Mail, User, Lock, Sparkles } from "lucide-react"
import type { CartItem } from "./SacredCart"
import { formatLabels } from "@/lib/products"

interface SacredCheckoutProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onCompletePurchase: (customerData: CustomerData) => Promise<void>
}

export interface CustomerData {
  email: string
  firstName: string
  lastName: string
}

export default function SacredCheckout({ isOpen, onClose, items, onCompletePurchase }: SacredCheckoutProps) {
  const [customerData, setCustomerData] = useState<CustomerData>({
    email: "",
    firstName: "",
    lastName: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const orderTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(orderTotal)
  }, [items])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      await onCompletePurchase(customerData)
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Sacred Backdrop */}
          <motion.div
            className="fixed inset-0 bg-midnight-blue/95 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sacred Checkout Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="bg-midnight-blue border-2 border-gold rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Sacred Header */}
              <div className="sticky top-0 bg-midnight-blue border-b border-gold/20 p-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-magnolia-white mb-2">
                      Complete Your Sacred Purchase
                    </h2>
                    <p className="font-lora text-magnolia-white/70">
                      You're one step away from beginning your transformation journey
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-magnolia-white/10 transition-colors duration-200"
                    aria-label="Close checkout"
                  >
                    <X size={24} className="text-magnolia-white" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Order Summary */}
                  <div className="order-2 lg:order-1">
                    <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4 flex items-center gap-2">
                      <Sparkles size={20} className="text-gold" />
                      Sacred Order Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start p-4 bg-midnight-blue/50 rounded-2xl border border-gold/20"
                        >
                          <div className="flex-1">
                            <h4 className="font-lora text-magnolia-white font-semibold mb-1">{item.name}</h4>
                            <p className="font-montserrat text-magnolia-white/70 text-sm">
                              {formatLabels[item.format]} × {item.quantity}
                            </p>
                          </div>
                          <span className="font-playfair text-gold font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gold/20 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-playfair text-xl text-magnolia-white">Sacred Total:</span>
                        <span className="font-playfair text-2xl font-bold text-gold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information Form */}
                  <div className="order-1 lg:order-2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4 flex items-center gap-2">
                          <User size={20} className="text-sage-green" />
                          Sacred Contact Information
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="email"
                              className="block font-montserrat text-magnolia-white font-semibold mb-2"
                            >
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail
                                size={20}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-magnolia-white/50"
                              />
                              <input
                                type="email"
                                id="email"
                                required
                                value={customerData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="your.sacred.email@example.com"
                                className="w-full pl-12 pr-4 py-4 bg-midnight-blue/50 border border-gold/30 rounded-2xl text-magnolia-white placeholder-magnolia-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-200"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="firstName"
                                className="block font-montserrat text-magnolia-white font-semibold mb-2"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                required
                                value={customerData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                placeholder="Your first name"
                                className="w-full px-4 py-4 bg-midnight-blue/50 border border-gold/30 rounded-2xl text-magnolia-white placeholder-magnolia-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-200"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="lastName"
                                className="block font-montserrat text-magnolia-white font-semibold mb-2"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                required
                                value={customerData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                placeholder="Your last name"
                                className="w-full px-4 py-4 bg-midnight-blue/50 border border-gold/30 rounded-2xl text-magnolia-white placeholder-magnolia-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-200"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sacred Payment Section */}
                      <div>
                        <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4 flex items-center gap-2">
                          <CreditCard size={20} className="text-gold" />
                          Sacred Payment
                        </h3>

                        <div className="p-6 bg-midnight-blue/50 border border-gold/30 rounded-2xl">
                          <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                              <Lock size={32} className="text-sage-green mx-auto mb-3" />
                              <p className="font-lora text-magnolia-white/80 text-sm">
                                Secure payment processing will be integrated here
                              </p>
                              <p className="font-montserrat text-magnolia-white/60 text-xs mt-2">
                                Stripe Payment Element placeholder
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sacred Completion */}
                      <div className="space-y-4">
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full py-4 rounded-full font-montserrat font-bold text-lg transition-all duration-300 ${
                            isProcessing
                              ? "bg-warm-gray/50 text-midnight-blue/50 cursor-not-allowed"
                              : "bg-gold hover:bg-gold/90 text-midnight-blue hover:shadow-lg"
                          }`}
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-midnight-blue/30 border-t-midnight-blue rounded-full animate-spin"></div>
                              Processing Sacred Purchase...
                            </span>
                          ) : (
                            "Complete Sacred Purchase"
                          )}
                        </button>

                        <p className="font-lora text-magnolia-white/70 text-sm text-center leading-relaxed">
                          By completing this purchase, you're investing in your sacred transformation journey. All
                          digital products include lifetime access and loving support.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
