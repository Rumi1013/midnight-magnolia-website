"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Download, Mail, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

export default function PurchaseSuccessClient() {
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
          resource: "Complete Ancestral Healing Course",
          amount: 197,
          customerEmail: "customer@example.com",
          date: new Date().toISOString(),
          downloadLinks: [
            { name: "Course Introduction Video", url: "#", type: "video" },
            { name: "Week 1-4 Workbook", url: "#", type: "pdf" },
            { name: "Week 5-8 Workbook", url: "#", type: "pdf" },
            { name: "Guided Meditation Audio", url: "#", type: "audio" },
            { name: "Bonus Resources", url: "#", type: "pdf" },
          ],
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-gold" />
              </div>
              <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-magnolia-white mb-4">
                Purchase Complete
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Thank you for your purchase! Your premium resources are ready for download.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-magnolia-white/10 backdrop-blur-sm border border-magnolia-white/20 mb-8">
                <CardContent className="p-8">
                  <h2 className="font-playfair text-2xl font-bold text-magnolia-white mb-6">Purchase Details</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-magnolia-white/10">
                      <span className="font-lora text-magnolia-white/70">Resource</span>
                      <span className="font-montserrat font-semibold text-magnolia-white">
                        {sessionData?.resource || "Premium Resource"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-magnolia-white/10">
                      <span className="font-lora text-magnolia-white/70">Amount Paid</span>
                      <span className="font-playfair text-xl font-bold text-gold">${sessionData?.amount || "197"}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-magnolia-white/10">
                      <span className="font-lora text-magnolia-white/70">Order ID</span>
                      <span className="font-mono text-sm text-magnolia-white">{sessionId?.substring(0, 16)}...</span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="font-lora text-magnolia-white/70">Access</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold/20 text-gold font-montserrat font-semibold text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Lifetime
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
              <Card className="bg-gold/10 border border-gold/20 mb-8">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-6">Your Downloads</h3>

                  <div className="space-y-3">
                    {sessionData?.downloadLinks?.map((link: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-magnolia-white/5 rounded-lg hover:bg-magnolia-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gold" />
                          <span className="font-lora text-magnolia-white">{link.name}</span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gold hover:bg-gold/90 text-midnight-blue font-montserrat font-semibold"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-magnolia-white/5 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gold mt-0.5" />
                      <div>
                        <h4 className="font-montserrat font-semibold text-magnolia-white mb-1">Email Confirmation</h4>
                        <p className="font-lora text-magnolia-white/80 text-sm">
                          Download links have also been sent to your email address for future access.
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
              <p className="font-lora text-magnolia-white/80 mb-6">
                Need help accessing your resources? We're here to support you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Get Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/resources">
                  <Button
                    variant="outline"
                    className="border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Browse More Resources
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
