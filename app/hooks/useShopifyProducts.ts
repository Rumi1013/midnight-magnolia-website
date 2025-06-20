"use client"

import { useState, useEffect } from "react"

// 🌙 Sacred product interface
interface ShopifyProduct {
  id: string
  shopifyId: string
  name: string
  handle: string
  description: string
  price: number
  maxPrice?: number
  originalPrice?: number
  image: string
  images: Array<{ url: string; alt: string; width?: number; height?: number }>
  category: string
  subcategory: string
  vendor: string
  tags: string[]
  availableForSale: boolean
  totalInventory: number
  isBlessed?: boolean
  isBestseller?: boolean
  isNew?: boolean
  createdAt: string
  updatedAt: string
  variantId?: string
  quantityAvailable?: number
}

interface UseShopifyProductsReturn {
  products: ShopifyProduct[]
  loading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  refetch: () => void
  connectionStatus: "connecting" | "connected" | "error" | "idle"
}

export function useShopifyProducts(limit = 20): UseShopifyProductsReturn {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [cursor, setCursor] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error" | "idle">("idle")

  // 🌸 Test connection first
  const testConnection = async () => {
    try {
      setConnectionStatus("connecting")
      const response = await fetch("/api/shopify/test-connection")
      const data = await response.json()

      if (data.success) {
        console.log("✨ Sacred Shopify connection established:", data.shop?.name)
        setConnectionStatus("connected")
        return true
      } else {
        console.error("💔 Sacred connection failed:", data.error)
        setError(`Connection failed: ${data.error}`)
        setConnectionStatus("error")
        return false
      }
    } catch (err: any) {
      console.error("💔 Connection test error:", err)
      setError("Unable to test sacred connection")
      setConnectionStatus("error")
      return false
    }
  }

  // 🌸 Fetch sacred products from Shopify
  const fetchProducts = async (after?: string | null, append = false) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        limit: limit.toString(),
      })

      if (after) {
        params.append("after", after)
      }

      console.log("🌙 Fetching sacred products...")
      const response = await fetch(`/api/shopify/products?${params}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || data.error || "Failed to fetch sacred products")
      }

      console.log(`✨ Received ${data.products.length} sacred products`)

      if (append) {
        setProducts((prev) => [...prev, ...data.products])
      } else {
        setProducts(data.products)
      }

      setHasMore(data.pagination.hasNextPage)
      setCursor(data.pagination.lastCursor)
      setConnectionStatus("connected")
    } catch (err: any) {
      console.error("Sacred product fetch error:", err)
      setError(err.message || "Unable to connect to product sanctuary")
      setConnectionStatus("error")
    } finally {
      setLoading(false)
    }
  }

  // 🌿 Load more sacred offerings
  const loadMore = () => {
    if (!loading && hasMore && cursor) {
      fetchProducts(cursor, true)
    }
  }

  // 🌙 Refetch all products
  const refetch = async () => {
    setCursor(null)
    setProducts([])

    // Test connection first, then fetch products
    const connectionOk = await testConnection()
    if (connectionOk) {
      await fetchProducts(null, false)
    }
  }

  // 🌸 Initial sacred connection and fetch
  useEffect(() => {
    const initializeShop = async () => {
      const connectionOk = await testConnection()
      if (connectionOk) {
        await fetchProducts()
      }
    }

    initializeShop()
  }, [])

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    connectionStatus,
  }
}
