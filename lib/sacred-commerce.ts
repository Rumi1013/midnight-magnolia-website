// 🌙 Sacred Commerce System Types and Utilities

export interface SacredProduct {
  id: string
  name: string
  description: string
  prices: { [key: string]: number }
  originalPrice?: number
  image: string
  category: "healing-journals" | "business-suite" | "kdp-books" | "physical-products"
  type: "digital-download" | "shopify-product" | "kdp-book"
  formats: string[]
  tags: string[]
  featured?: boolean
  inStock: boolean
  deliveryTime?: string
  shipping?: string
  externalLink?: string
  shopifyId?: string
}

export interface CartItem extends SacredProduct {
  selectedFormat: string
  quantity: number
  cartId: string
}

export interface CheckoutData {
  customer: {
    firstName: string
    lastName: string
    email: string
  }
  items: CartItem[]
  total: number
}

// 🌸 Sacred Commerce Utilities
export class SacredCommerceUtils {
  static formatPrice(price: number): string {
    return `$${price.toFixed(2)}`
  }

  static generateCartId(productId: string, format: string): string {
    return `${productId}-${format}`
  }

  static calculateCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => {
      const price = Object.values(item.prices)[0]
      return total + price * item.quantity
    }, 0)
  }

  static getFormatLabel(format: string): string {
    const labels: { [key: string]: string } = {
      digital: "Digital PDF",
      print: "Print Edition",
      physical: "Physical Product",
      kdp: "Amazon Paperback",
    }
    return labels[format] || format
  }

  static saveToLocalStorage(key: string, data: any): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  static loadFromLocalStorage<T>(key: string, defaultValue: T): T {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : defaultValue
    }
    return defaultValue
  }

  static createNotification(message: string, type: "success" | "error" | "info" = "info") {
    return { message, type }
  }
}

// 🌿 Sacred Product Categories
export const SACRED_CATEGORIES = {
  "healing-journals": {
    label: "Healing Journals",
    description: "Sacred journals for transformation and healing",
    icon: "📖",
  },
  "business-suite": {
    label: "Business Suite",
    description: "Tools for sacred entrepreneurship",
    icon: "💼",
  },
  "physical-products": {
    label: "Physical Products",
    description: "Tangible items for your sacred space",
    icon: "🕯️",
  },
  "kdp-books": {
    label: "Sacred Books",
    description: "Published books available on Amazon",
    icon: "📚",
  },
} as const

// 🌙 Sacred Payment Integration (Placeholder for Stripe)
export class SacredPaymentProcessor {
  private stripePublicKey: string

  constructor(stripePublicKey: string) {
    this.stripePublicKey = stripePublicKey
  }

  async createPaymentIntent(checkoutData: CheckoutData) {
    // This would integrate with your Stripe backend
    console.log("Creating payment intent for:", checkoutData)

    // Placeholder implementation
    return {
      clientSecret: "pi_placeholder_client_secret",
      paymentIntentId: "pi_placeholder_id",
    }
  }

  async confirmPayment(clientSecret: string, paymentMethod: any) {
    // This would confirm the payment with Stripe
    console.log("Confirming payment:", { clientSecret, paymentMethod })

    // Placeholder implementation
    return {
      success: true,
      paymentIntent: {
        id: "pi_confirmed_id",
        status: "succeeded",
      },
    }
  }
}

// 🌸 Sacred Email Delivery (Placeholder)
export class SacredEmailDelivery {
  static async sendDigitalProducts(customerEmail: string, items: CartItem[]) {
    console.log("Sending digital products to:", customerEmail)
    console.log("Items:", items)

    // This would integrate with your email service
    // to send download links for digital products

    return {
      success: true,
      message: "Digital products delivered successfully",
    }
  }

  static async sendOrderConfirmation(customerEmail: string, orderData: CheckoutData) {
    console.log("Sending order confirmation to:", customerEmail)
    console.log("Order:", orderData)

    return {
      success: true,
      message: "Order confirmation sent",
    }
  }
}
