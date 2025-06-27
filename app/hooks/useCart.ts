"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

// 🌙 Sacred Cart Item Interface
export interface CartItem {
  id: string
  productId: string
  name: string
  format: string
  price: number
  description: string
  image: string
  category: string
  digitalDelivery?: string
  quantity: number
}

// 🌸 Cart Context Interface
interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isInCart: (itemId: string) => boolean
  getCartItemCount: (itemId: string) => number
}

// 🌿 Create Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined)

// 🌙 Cart Hook
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  // 🌸 Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("midnight-magnolia-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  // 🌿 Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("midnight-magnolia-cart", JSON.stringify(items))
  }, [items])

  // 💝 Add item to cart
  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
      }
      return [...prevItems, item]
    })
  }

  // 🗑️ Remove item from cart
  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  // 📝 Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  // 🧹 Clear entire cart
  const clearCart = () => {
    setItems([])
  }

  // 💰 Calculate total price
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // 🔢 Get total item count
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  // ✅ Check if item is in cart
  const isInCart = (itemId: string) => {
    return items.some((item) => item.id === itemId)
  }

  // 🔢 Get specific item count
  const getCartItemCount = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    return item ? item.quantity : 0
  }

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isInCart,
    getCartItemCount,
  }
}

// 🌙 Cart Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart()

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}

// 🌸 Use Cart Context Hook
export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
