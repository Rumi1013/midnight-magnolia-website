"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Check, Heart, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading')
  
  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent')
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret')
    
    if (paymentIntentId && paymentIntentClientSecret) {
      // Verify payment status with Stripe
      setPaymentStatus('success')
    } else {
      setPaymentStatus('error')
    }
  }, [searchParams])

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-sage-green border-t-transparent mx-auto mb-4" role="status" aria-label="Loading payment confirmation"></div>
          <p className="font-lora text-magnolia-white/80">Confirming your sacred purchase...</p>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-red-400 text-6xl mb-6" aria-hidden="true">⚠️</div>
          <h1 className="font-playfair text-3xl text-magnolia-white mb-4">
            Something went wrong
          </h1>
          <p className="font-lora text-magnolia-white/70 mb-8">
            We couldn't confirm your payment. Please check your email or contact support.
          </p>
          <Link
            href="/shop"
            className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300"
            aria-label="Return to shop to try again"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight-blue">
      <div className="max-w-4xl mx-auto px-4 py-20">
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
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-8"
            role="img"
            aria-label="Success checkmark"
          >
            <Check size={48} className="text-midnight-blue" />
          </motion.div>

          {/* Thank You Message */}
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
            Sacred Purchase Complete! <span aria-hidden="true">✨</span>
          </h1>
          
          <p className="font-lora text-xl text-magnolia-white/80 mb-8 max-w-2xl mx-auto">
            Your transformation journey begins now. Check your email for instant access to your digital products 
            and detailed instructions for your sacred tools.
          </p>

          {/* What Happens Next */}
          <div className="bg-magnolia-white/5 rounded-3xl p-8 mb-12 max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl font-semibold text-magnolia-white mb-6">
              What happens next?
            </h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                  <span className="text-midnight-blue font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-magnolia-white mb-1">
                    Check Your Email
                  </h3>
                  <p className="font-lora text-magnolia-white/70 text-sm">
                    Your download links and access instructions are on their way to your inbox.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                  <span className="text-midnight-blue font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-magnolia-white mb-1">
                    Download Your Products
                  </h3>
                  <p className="font-lora text-magnolia-white/70 text-sm">
                    Access your digital products immediately with lifetime download rights.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                  <span className="text-midnight-blue font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-magnolia-white mb-1">
                    Begin Your Journey
                  </h3>
                  <p className="font-lora text-magnolia-white/70 text-sm">
                    Start your transformation with our gentle, healing-centered approach.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/shop"
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              aria-label="Explore more sacred offerings in our shop"
            >
              <Sparkles size={20} aria-hidden="true" />
              Explore More Sacred Offerings
            </Link>
            
            <Link
              href="/community"
              className="border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-midnight-blue font-montserrat font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Join our sacred healing community"
            >
              <Heart size={20} aria-hidden="true" />
              Join Our Sacred Community
            </Link>
          </div>

          {/* Support Information */}
          <div className="bg-sage-green/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="font-playfair text-xl font-semibold text-magnolia-white mb-4">
              Need Help?
            </h3>
            <p className="font-lora text-magnolia-white/70 mb-4">
              If you have any questions about your purchase or need assistance accessing your products, 
              our support team is here to help.
            </p>
            <Link
              href="/contact"
              className="text-sage-green hover:text-gold font-montserrat font-semibold underline transition-colors duration-300"
              aria-label="Contact our support team"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}