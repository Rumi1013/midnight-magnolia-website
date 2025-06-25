"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/app/hooks/useCart"
import Image from "next/image"

export default function SacredCart() {
  const { state, dispatch } = useCart()

  if (!state.isOpen) return null

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items.map((item) => ({
            name: `${item.name} (${item.format})`,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => dispatch({ type: "CLOSE_CART" })} />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-midnight-blue border-l border-warm-gray/20 z-50 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-warm-gray/20">
            <h2 className="text-xl font-playfair text-magnolia-white">Sacred Collection</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="text-magnolia-white hover:text-gold"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-warm-gray/50 mb-4" />
                <p className="text-warm-gray text-lg mb-2">Your sacred collection is empty</p>
                <p className="text-warm-gray/70 text-sm">Add some healing tools to begin your journey</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${item.format}`}
                    className="flex items-center space-x-4 p-4 bg-warm-gray/5 rounded-lg"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-lora text-magnolia-white text-sm font-medium">{item.name}</h3>
                      <p className="text-warm-gray text-xs">{item.format}</p>
                      <p className="text-gold font-medium">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) },
                          })
                        }
                        className="h-8 w-8 text-magnolia-white hover:text-gold"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-magnolia-white w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }
                        className="h-8 w-8 text-magnolia-white hover:text-gold"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="p-6 border-t border-warm-gray/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-magnolia-white font-lora">Sacred Total:</span>
                <span className="text-gold font-playfair text-xl font-bold">${state.total.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-medium py-3 rounded-lg transition-colors"
              >
                Begin Sacred Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
