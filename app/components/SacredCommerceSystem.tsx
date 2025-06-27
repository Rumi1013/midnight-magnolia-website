"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import SacredProductCard from "./SacredProductCard"
import SacredCart, { type CartItem } from "./SacredCart"
import SacredCheckout, { type CustomerData } from "./SacredCheckout"
import { midnightMagnoliaProducts, type SacredProduct } from "@/lib/products"

interface SacredCommerceSystemProps {
  category?: "healingJournals" | "businessSuite" | "kdpBooks" | "all"
  featured?: boolean
  limit?: number
}

export default function SacredCommerceSystem({ category = "all", featured = false, limit }: SacredCommerceSystemProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: "success" | "error" | "info"
  } | null>(null)

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("mm-sacred-cart")
    const savedWishlist = localStorage.getItem("mm-sacred-wishlist")

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to load cart:", error)
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(new Set(JSON.parse(savedWishlist)))
      } catch (error) {
        console.error("Failed to load wishlist:", error)
      }
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("mm-sacred-cart", JSON.stringify(cart))
  }, [cart])

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("mm-sacred-wishlist", JSON.stringify([...wishlist]))
  }, [wishlist])

  // Get products based on category and filters
  const getProducts = (): SacredProduct[] => {
    let products: SacredProduct[] = []

    if (category === "all") {
      products = [
        ...midnightMagnoliaProducts.healingJournals,
        ...midnightMagnoliaProducts.businessSuite,
        ...midnightMagnoliaProducts.kdpBooks,
      ]
    } else {
      products = midnightMagnoliaProducts[category]
    }

    if (featured) {
      products = products.filter((product) => product.featured)
    }

    if (limit) {
      products = products.slice(0, limit)
    }

    return products
  }

  const products = getProducts()

  // Add to cart
  const handleAddToCart = (productId: string, format: string, price: number) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const itemId = `${productId}-${format}`
    const existingItemIndex = cart.findIndex((item) => item.id === itemId)

    if (existingItemIndex > -1) {
      // Update quantity
      setCart((prev) =>
        prev.map((item, index) => (index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      // Add new item
      const newItem: CartItem = {
        id: itemId,
        productId,
        name: product.name,
        format,
        price,
        quantity: 1,
        image: product.image,
      }
      setCart((prev) => [...prev, newItem])
    }

    showNotification(`${product.name} added to your sacred collection!`, "success")
  }

  // Update cart item quantity
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId)
      return
    }

    setCart((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
    showNotification("Item removed from your sacred collection", "info")
  }

  // Add/remove from wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
        showNotification("Removed from wishlist", "info")
      } else {
        newWishlist.add(productId)
        showNotification("Added to wishlist", "success")
      }
      return newWishlist
    })
  }

  // Proceed to checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  // Complete purchase
  const handleCompletePurchase = async (customerData: CustomerData) => {
    try {
      // Here you would integrate with your payment processor (Stripe, etc.)
      console.log("Processing purchase:", { cart, customerData })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and close checkout
      setCart([])
      setIsCheckoutOpen(false)

      showNotification("Your sacred purchase is complete! Check your email for access details.", "success")

      // Redirect to thank you page
      // window.location.href = '/thank-you'
    } catch (error) {
      console.error("Purchase failed:", error)
      showNotification("There was an issue processing your payment. Please try again.", "error")
      throw error
    }
  }

  // Show notification
  const showNotification = (message: string, type: "success" | "error" | "info") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="relative">
      {/* Sacred Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <SacredProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            isInWishlist={wishlist.has(product.id)}
          />
        ))}
      </div>

      {/* Sacred Cart Toggle Button */}
      {cartItemCount > 0 && (
        <motion.button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-gold hover:bg-gold/90 text-midnight-blue p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-sage-green text-midnight-blue text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          </div>
        </motion.button>
      )}

      {/* Sacred Cart */}
      <SacredCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Sacred Checkout */}
      <SacredCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onCompletePurchase={handleCompletePurchase}
      />

      {/* Sacred Notifications */}
      {notification && (
        <motion.div
          className={`fixed top-6 right-6 max-w-sm p-4 rounded-2xl border-l-4 z-50 ${
            notification.type === "success"
              ? "bg-midnight-blue border-sage-green text-magnolia-white"
              : notification.type === "error"
                ? "bg-midnight-blue border-red-400 text-magnolia-white"
                : "bg-midnight-blue border-gold text-magnolia-white"
          }`}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <p className="font-lora text-sm">{notification.message}</p>
        </motion.div>
      )}
    </div>
  )
}
