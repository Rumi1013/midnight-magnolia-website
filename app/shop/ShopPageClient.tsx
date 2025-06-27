"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Heart, ShoppingCart, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Sacred Healing Journal",
    description: "A beautifully crafted journal for your healing journey with guided prompts and moon phase tracking.",
    price: 28,
    originalPrice: 35,
    image: "/placeholder.svg?height=300&width=300&text=Sacred+Journal",
    category: "Digital Tools",
    rating: 4.9,
    reviews: 127,
    isFavorite: false,
    inCart: false,
  },
  {
    id: 2,
    name: "Midnight Moon Mug",
    description: "Sip your sacred beverages in Southern Gothic style with this hand-glazed ceramic mug.",
    price: 24,
    image: "/placeholder.svg?height=300&width=300&text=Moon+Mug",
    category: "Sacred Tools",
    rating: 4.8,
    reviews: 89,
    isFavorite: true,
    inCart: false,
  },
  {
    id: 3,
    name: "Magnolia Wisdom Cards",
    description: "Daily affirmations and gentle guidance cards featuring Southern Gothic artwork.",
    price: 32,
    image: "/placeholder.svg?height=300&width=300&text=Wisdom+Cards",
    category: "Digital Tools",
    rating: 5.0,
    reviews: 203,
    isFavorite: false,
    inCart: true,
  },
  {
    id: 4,
    name: "Ancestral Healing Planner",
    description: "A comprehensive planner designed for gentle productivity and chronic illness management.",
    price: 45,
    originalPrice: 55,
    image: "/placeholder.svg?height=300&width=300&text=Healing+Planner",
    category: "Digital Tools",
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
    inCart: false,
  },
  {
    id: 5,
    name: "Southern Gothic Candle",
    description: "Hand-poured soy candle with magnolia and sage scents to create your sacred space.",
    price: 28,
    image: "/placeholder.svg?height=300&width=300&text=Gothic+Candle",
    category: "Sacred Tools",
    rating: 4.7,
    reviews: 94,
    isFavorite: true,
    inCart: false,
  },
  {
    id: 6,
    name: "Digital Ritual Guide",
    description: "Comprehensive guide to creating meaningful daily rituals for healing and transformation.",
    price: 19,
    image: "/placeholder.svg?height=300&width=300&text=Ritual+Guide",
    category: "Digital Tools",
    rating: 4.8,
    reviews: 178,
    isFavorite: false,
    inCart: false,
  },
]

const categories = ["All", "Digital Tools", "Sacred Tools", "Planners", "Guides"]

export default function ShopPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cartItems, setCartItems] = useState<number[]>([3])
  const [favorites, setFavorites] = useState<number[]>([2, 5])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleCart = (productId: number) => {
    setCartItems((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-magnolia-white pt-20">
      {/* Header */}
      <section className="bg-midnight-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-magnolia-white mb-6">
              Sacred
              <span className="text-gold"> Marketplace</span>
            </h1>
            <p className="font-lora text-xl text-magnolia-white/80 max-w-2xl mx-auto">
              Discover tools, treasures, and wisdom to support your healing journey
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-midnight-blue/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sacred tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-sage-green/20 focus:border-sage-green focus:outline-none font-montserrat"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-montserrat font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-sage-green text-midnight-blue"
                    : "bg-sage-green/20 text-midnight-blue hover:bg-sage-green/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-sage-green/10 flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id) ? "text-red-500 fill-current" : "text-midnight-blue/60"
                    }`}
                  />
                </button>

                {/* Sale Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-gold text-midnight-blue px-3 py-1 rounded-full font-montserrat font-bold text-sm">
                    Sale
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-sage-green/20 text-sage-green font-montserrat text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-current" />
                    <span className="font-montserrat text-sm text-midnight-blue/70">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">{product.name}</h3>

                <p className="font-lora text-midnight-blue/70 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat text-2xl font-bold text-sage-green">${product.price}</span>
                    {product.originalPrice && (
                      <span className="font-montserrat text-lg text-midnight-blue/50 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      cartItems.includes(product.id)
                        ? "bg-sage-green text-midnight-blue"
                        : "bg-midnight-blue text-magnolia-white hover:bg-midnight-blue/90"
                    }`}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-sage-green" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-midnight-blue mb-2">No Sacred Tools Found</h3>
            <p className="font-lora text-midnight-blue/70 mb-6">Try adjusting your search or browse all categories</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 bg-midnight-blue text-magnolia-white p-4 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              <div>
                <p className="font-montserrat font-semibold">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
                </p>
                <p className="font-lora text-sm text-magnolia-white/80">
                  Total: $
                  {cartItems.reduce((sum, id) => {
                    const product = products.find((p) => p.id === id)
                    return sum + (product?.price || 0)
                  }, 0)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
