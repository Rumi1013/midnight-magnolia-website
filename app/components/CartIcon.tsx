"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/app/hooks/useCart"
import SacredCart from "./SacredCart"

export default function CartIcon() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-3 bg-magnolia-white/10 hover:bg-sage-green/20 text-magnolia-white hover:text-sage-green rounded-full transition-all duration-300 group"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        <ShoppingBag size={20} className="transition-transform duration-200 group-hover:scale-110" />

        {/* Item Count Badge */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 bg-sage-green text-midnight-blue text-xs font-montserrat font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
            >
              {itemCount > 99 ? "99+" : itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Sacred Cart Sidebar */}
      <SacredCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
