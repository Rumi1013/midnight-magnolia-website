"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ShopifyDebugPage() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/shopify/test-connection")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Failed to reach test endpoint",
        details: { message: error.message },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-midnight-blue pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-magnolia-white mb-4">
            🌙 Sacred Shopify Connection Test
          </h1>
          <p className="font-lora text-magnolia-white/80 text-lg">
            Test your Shopify API credentials with healing energy
          </p>
        </motion.div>

        <div className="bg-magnolia-white/10 backdrop-blur-sm rounded-2xl p-8">
          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue 
                     font-montserrat font-semibold py-4 px-8 rounded-full 
                     transition-all duration-300 hover:shadow-lg disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-midnight-blue border-t-transparent" />
                Testing Sacred Connection...
              </div>
            ) : (
              "Test Shopify Connection ✨"
            )}
          </button>

          {testResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
              <div
                className={`p-6 rounded-xl ${
                  testResult.success
                    ? "bg-sage-green/20 border border-sage-green/30"
                    : "bg-red-500/20 border border-red-500/30"
                }`}
              >
                <h3
                  className={`font-playfair text-xl font-bold mb-4 ${
                    testResult.success ? "text-sage-green" : "text-red-400"
                  }`}
                >
                  {testResult.success ? "✨ Connection Successful!" : "💔 Connection Failed"}
                </h3>

                <pre className="bg-midnight-blue/50 text-magnolia-white p-4 rounded-lg overflow-auto text-sm font-mono">
                  {JSON.stringify(testResult, null, 2)}
                </pre>

                {testResult.success && testResult.shop && (
                  <div className="mt-4 p-4 bg-sage-green/10 rounded-lg">
                    <h4 className="font-montserrat font-semibold text-sage-green mb-2">Shop Details:</h4>
                    <p className="text-magnolia-white/80">
                      <strong>Name:</strong> {testResult.shop.name}
                      <br />
                      <strong>Domain:</strong> {testResult.shop.primaryDomain?.url}
                      <br />
                      <strong>Currency:</strong> {testResult.shop.currencyCode}
                    </p>
                  </div>
                )}

                {!testResult.success && (
                  <div className="mt-4 p-4 bg-red-500/10 rounded-lg">
                    <h4 className="font-montserrat font-semibold text-red-400 mb-2">Troubleshooting:</h4>
                    <div className="text-magnolia-white/80 text-sm space-y-2">
                      {testResult.details?.hasDomain === false && (
                        <p>❌ Missing SHOPIFY_STOREFRONT_ADMIN environment variable</p>
                      )}
                      {testResult.details?.hasToken === false && (
                        <p>❌ Missing SHOPIFY_ADMIN_API environment variable</p>
                      )}
                      {testResult.error?.includes("401") && (
                        <p>❌ Invalid Storefront Access Token - check your SHOPIFY_ADMIN_API value</p>
                      )}
                      {testResult.error?.includes("404") && (
                        <p>❌ Invalid shop domain - check your SHOPIFY_STOREFRONT_ADMIN value</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 bg-magnolia-white/5 rounded-2xl p-6">
          <h3 className="font-playfair text-xl font-bold text-magnolia-white mb-4">🌿 Environment Variables Needed:</h3>
          <div className="space-y-2 font-mono text-sm text-magnolia-white/80">
            <p>
              <strong>SHOPIFY_STOREFRONT_ADMIN:</strong> your-shop.myshopify.com
            </p>
            <p>
              <strong>SHOPIFY_ADMIN_API:</strong> your-storefront-access-token
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
