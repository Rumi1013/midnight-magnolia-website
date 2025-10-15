"use client"

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A192F",
        color: "#FAF3E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "3rem",
          height: "3rem",
          border: "4px solid #D4AF37",
          borderTop: "4px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "1rem",
        }}
      ></div>
      <p>Loading your sanctuary...</p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen bg-midnight-blue flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-full h-full border-4 border-sage-green/20 border-t-sage-green rounded-full"
            />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-magnolia-white mb-2">Loading Sacred Content</h2>
          <p className="font-lora text-magnolia-white/80">Preparing your healing sanctuary...</p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="h-1 bg-gradient-to-r from-sage-green to-gold rounded-full max-w-xs mx-auto"
        />
      </div>
    </div>
  )
}
