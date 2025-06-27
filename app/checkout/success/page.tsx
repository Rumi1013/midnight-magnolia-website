"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Download, Mail, Sparkles, Gift } from "lucide-react"
import Link from "next/link"

const SuccessPageClient = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Fetch order details from Stripe
      fetchOrderDetails(sessionId)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/stripe/session/${sessionId}`)
      const data = await response.json()
      setOrderDetails(data)
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4"></div>
          <p className="font-lora text-magnolia-white/80">Preparing your sacred offerings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-blue py-20">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-midnight-blue" />
          </motion.div>

          {/* Success Message */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-4">
            Sacred Purchase Complete! ✨
          </h1>
          <p className="font-lora text-xl text-magnolia-white/80 mb-8">
            Your healing journey begins now, beautiful soul. Thank you for trusting us with your transformation.
          </p>

          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-magnolia-white rounded-3xl p-8 mb-8 text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-sage-green" size={24} />
              <h2 className="font-playfair text-2xl font-bold text-midnight-blue">Your Sacred Collection</h2>
            </div>

            {/* Digital Delivery Notice */}
            <div className="bg-sage-green/10 border border-sage-green/30 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Download className="text-sage-green" size={20} />
                <h3 className="font-montserrat font-semibold text-sage-green">Instant Access Available</h3>
              </div>
              <p className="font-lora text-midnight-blue/70 text-sm">
                Your digital products are ready for download! Check your email for download links, or access them from
                your customer portal.
              </p>
            </div>

            {/* Email Confirmation */}
            <div className="bg-midnight-blue/5 border border-midnight-blue/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="text-midnight-blue" size={20} />
                <h3 className="font-montserrat font-semibold text-midnight-blue">Confirmation Email Sent</h3>
              </div>
              <p className="font-lora text-midnight-blue/70 text-sm">
                A detailed receipt and download instructions have been sent to your email. Please check your inbox (and
                spam folder just in case).
              </p>
            </div>

            {/* Order ID */}
            {sessionId && (
              <div className="text-center py-4 border-t border-midnight-blue/10">
                <p className="font-montserrat text-sm text-midnight-blue/60">
                  Order ID: <span className="font-mono">{sessionId.slice(-8).toUpperCase()}</span>
                </p>
              </div>
            )}
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Download Portal */}
            <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Download className="text-sage-green mx-auto mb-3" size={32} />
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-2">Access Your Downloads</h3>
              <p className="font-lora text-magnolia-white/70 text-sm mb-4">
                Visit your customer portal to download your digital products anytime.
              </p>
              <Link
                href="/customer/downloads"
                className="inline-block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                Access Portal
              </Link>
            </div>

            {/* Join Community */}
            <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <Gift className="text-rich-gold mx-auto mb-3" size={32} />
              <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-2">Join Our Sacred Circle</h3>
              <p className="font-lora text-magnolia-white/70 text-sm mb-4">
                Connect with other souls on their healing journey in our supportive community.
              </p>
              <Link
                href="/community"
                className="inline-block bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                Join Community
              </Link>
            </div>
          </motion.div>

          {/* Continue Shopping */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="/shop"
              className="inline-block bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white font-lora px-8 py-4 rounded-full transition-all duration-300 border border-magnolia-white/20"
            >
              Continue Exploring Sacred Offerings
            </Link>
          </motion.div>

          {/* Sacred Blessing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="text-4xl mb-4">🌙</div>
            <p className="font-lora text-magnolia-white/60 italic max-w-md mx-auto">
              "May these sacred tools guide you gently toward the healing and transformation your soul seeks. You are
              worthy of all the love and peace you're creating."
            </p>
            <p className="font-montserrat text-sage-green text-sm mt-4">— With love and light, Midnight Magnolia</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading your sacred confirmation...</div>}>
      <SuccessPageClient />
    </Suspense>
  )
}
