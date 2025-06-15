"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Calendar, Mail, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

export default function BookingSuccessClient() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [sessionData, setSessionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch session details from Stripe
      // For now, we'll simulate the data
      setTimeout(() => {
        setSessionData({
          id: sessionId,
          service: "Ancestral Healing Consultation",
          amount: 150,
          customerEmail: "customer@example.com",
          date: new Date().toISOString(),
        })
        setIsLoading(false)
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-green"></div>
      </div>
    )
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-green/20 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-sage-green" />
              </div>
              <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
                Booking Confirmed
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Your healing session has been successfully booked. We're honored to be part of your journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-magnolia-white/10 backdrop-blur-sm border border-magnolia-white/20 mb-8">
                <CardContent className="p-8">
                  <h2 className="font-playfair text-2xl font-bold text-magnolia-white mb-6">Booking Details</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-magnolia-white/10">
                      <span className="font-lora text-magnolia-white/70">Service</span>
                      <span className="font-montserrat font-semibold text-magnolia-white">
                        {sessionData?.service || "Healing Session"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-magnolia-white/10">
                      <span className="font-lora text-magnolia-white/70">Amount Paid</span>
                      <span className="font-playfair text-xl font-bold text-sage-green">
                        ${sessionData?.amount || "150"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-magnolia-white/10">
                      <span className="font-lora text-magnolia-white/70">Booking ID</span>
                      <span className="font-mono text-sm text-magnolia-white">{sessionId?.substring(0, 16)}...</span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="font-lora text-magnolia-white/70">Status</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-green/20 text-sage-green font-montserrat font-semibold text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirmed
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-sage-green/10 border border-sage-green/20 mb-8">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">What Happens Next?</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-sage-green" />
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-magnolia-white mb-1">Confirmation Email</h4>
                        <p className="font-lora text-magnolia-white/80 text-sm">
                          You'll receive a confirmation email with your booking details within the next few minutes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-sage-green" />
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-magnolia-white mb-1">Personal Contact</h4>
                        <p className="font-lora text-magnolia-white/80 text-sm">
                          We'll reach out within 24 hours to schedule your session at a time that works for you.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-sage-green/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-sage-green" />
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-magnolia-white mb-1">Session Preparation</h4>
                        <p className="font-lora text-magnolia-white/80 text-sm">
                          We'll send you a preparation guide to help you get the most from your healing session.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center space-y-4"
            >
              <p className="font-lora text-magnolia-white/80 mb-6">Questions about your booking? We're here to help.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    View All Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
