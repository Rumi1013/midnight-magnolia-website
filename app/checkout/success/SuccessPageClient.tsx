"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Download, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SuccessPageClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch order details from your backend
      // For now, we'll simulate this
      setTimeout(() => {
        setOrderDetails({
          id: sessionId,
          total: 89.97,
          items: [
            {
              name: "The Magnolia Reset 90-Day Journal",
              format: "digital",
              price: 29.0,
              digitalDelivery: true,
            },
            {
              name: "Sacred Productivity ADHD Planner",
              format: "print",
              price: 29.0,
              digitalDelivery: false,
            },
          ],
        })
        setLoading(false)
      }, 1500)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" />
          <p className="font-lora text-magnolia-white/80">Preparing your sacred confirmation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-sage-green rounded-full mb-8"
          >
            <CheckCircle size={40} className="text-midnight-blue" />
          </motion.div>

          {/* Success Message */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">
            Your Sacred Journey Begins
          </h1>
          <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Thank you for investing in your healing, beautiful soul. Your sacred offerings are being prepared with love
            and intention.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-magnolia-white/10 border border-sage-green/30 rounded-3xl p-8 mb-8 text-left"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-sage-green" size={24} />
                <h2 className="font-playfair text-2xl font-bold text-magnolia-white">Your Sacred Collection</h2>
              </div>

              <div className="space-y-4 mb-6">
                {orderDetails.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-sage-green/20">
                    <div>
                      <h3 className="font-lora font-semibold text-magnolia-white">{item.name}</h3>
                      <p className="font-montserrat text-sm text-sage-green">
                        {item.format.charAt(0).toUpperCase() + item.format.slice(1)} Format
                        {item.digitalDelivery && (
                          <span className="ml-2 inline-flex items-center gap-1">
                            <Download size={12} />
                            Instant Access
                          </span>
                        )}
                      </p>
                    </div>
                    <span className="font-playfair font-bold text-magnolia-white">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xl">
                <span className="font-playfair font-bold text-magnolia-white">Sacred Investment:</span>
                <span className="font-playfair font-bold text-sage-green">${orderDetails.total.toFixed(2)}</span>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-sage-green/10 border border-sage-green/30 rounded-2xl p-6">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-playfair font-bold text-magnolia-white mb-2">Check Your Email</h3>
              <p className="font-lora text-sm text-magnolia-white/70">
                Your confirmation and digital downloads are waiting in your inbox.
              </p>
            </div>

            <div className="bg-sage-green/10 border border-sage-green/30 rounded-2xl p-6">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-playfair font-bold text-magnolia-white mb-2">Physical Items</h3>
              <p className="font-lora text-sm text-magnolia-white/70">
                Print items will be lovingly crafted and shipped within 3-5 business days.
              </p>
            </div>

            <div className="bg-sage-green/10 border border-sage-green/30 rounded-2xl p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-playfair font-bold text-magnolia-white mb-2">Lifetime Support</h3>
              <p className="font-lora text-sm text-magnolia-white/70">
                We're here for your entire healing journey. Reach out anytime.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/shop"
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Continue Exploring
            </Link>
            <Link
              href="/community"
              className="bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white border border-sage-green/30 font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Join Our Community
            </Link>
          </motion.div>

          {/* Sacred Promise */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 p-6 bg-rich-gold/10 border border-rich-gold/30 rounded-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="text-rich-gold" size={20} />
              <span className="font-montserrat font-semibold text-rich-gold">Our Sacred Promise</span>
            </div>
            <p className="font-lora text-magnolia-white/80 leading-relaxed">
              If these tools don't support your healing journey within 30 days, we'll lovingly refund your investment.
              Your transformation matters more than our profit.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
