"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/app/hooks/useCart"

export default function CartIcon() {
  const { state, dispatch } = useCart()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch({ type: "TOGGLE_CART" })}
      className="relative text-magnolia-white hover:text-gold hover:bg-midnight-blue/20 transition-colors"
      aria-label={`Shopping cart with ${state.items.length} items`}
    >
      <ShoppingBag className="h-5 w-5" />
      {state.items.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-gold text-midnight-blue text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {state.items.length}
        </span>
      )}
    </Button>
  )
}
