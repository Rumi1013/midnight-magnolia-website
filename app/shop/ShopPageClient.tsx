"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag, Filter, ChevronDown, Star, Heart } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const categories = [
  "All Products",
  "Journals & Planners",
  "Digital Altars",
  "Ritual Tools",
  "Home Decor",
  "Pet Wellness",
  "Apparel",
]

const products = [
  {
    id: 1,
    name: "The Magnolia Reset Journal",
    category: "Journals & Planners",
    price: 47,
    image: "/healing-journal-cover.png",
    rating: 4.9,
    reviews: 124,
    comingSoon: true,
    description: "90-day healing journal with daily prompts that honor your pace and celebrate your progress.",
  },
  {
    id: 2,
    name: "Sacred Productivity Planner",
    category: "Journals & Planners",
    price: 29,
    image: "/adhd-friendly-planner.png",
    rating: 4.8,
    reviews: 86,
    comingSoon: true,
    description: "ADHD-friendly planner with gentle structure for chaotic minds with spoon theory integration.",
  },
  {
    id: 3,
    name: "Midnight Moon Mug",
    category: "Home Decor",
    price: 24,
    image: "/midnight-moon-mug.png",
    rating: 4.7,
    reviews: 53,
    comingSoon: false,
    description: "Ceramic mug featuring phases of the moon, perfect for your morning ritual or evening tea.",
  },
  {
    id: 4,
    name: "Southern Gothic Pillow",
    category: "Home Decor",
    price: 35,
    image: "/southern-gothic-pillow.png",
    rating: 4.6,
    reviews: 42,
    comingSoon: false,
    description: "Velvet pillow with magnolia and moon phase embroidery for your sacred rest space.",
  },
  {
    id: 5,
    name: "Magnolia Tote Bag",
    category: "Apparel",
    price: 28,
    image: "/magnolia-tote-bag.png",
    rating: 4.8,
    reviews: 37,
    comingSoon: false,
    description: "Canvas tote featuring our signature magnolia design, perfect for market trips or book hauls.",
  },
  {
    id: 6,
    name: "Digital Altar Subscription",
    category: "Digital Altars",
    price: 15,
    image: "/digital-altar.png",
    rating: 4.9,
    reviews: 68,
    comingSoon: true,
    description: "Monthly digital altar with customizable elements, affirmations, and guided meditations.",
  },
  {
    id: 7,
    name: "Mystical Cat Bandana",
    category: "Pet Wellness",
    price: 18,
    image: "/mystical-cat-bandana.png",
    rating: 4.7,
    reviews: 29,
    comingSoon: false,
    description:
      "Calming bandana for your feline familiar, infused with gentle energy and adorned with protective symbols.",
  },
  {
    id: 8,
    name: "Sacred Paws Bowl",
    category: "Pet Wellness",
    price: 32,
    image: "/sacred-paws-bowl.png",
    rating: 4.8,
    reviews: 24,
    comingSoon: false,
    description: "Ceramic pet bowl with moon phase design, making mealtime a sacred ritual for your animal companion.",
  },
  {
    id: 9,
    name: "Moonlight Pet Collar",
    category: "Pet Wellness",
    price: 22,
    image: "/moonlight-pet-collar.png",
    rating: 4.6,
    reviews: 31,
    comingSoon: false,
    description: "Soft, adjustable collar with protective symbols and a gentle bell to keep your familiar safe.",
  },
  {
    id: 10,
    name: "Healing Herbs Pet Toy",
    category: "Pet Wellness",
    price: 16,
    image: "/healing-herbs-pet-toy.png",
    rating: 4.5,
    reviews: 19,
    comingSoon: false,
    description: "Catnip-filled toy made with organic materials to bring joy and playfulness to your pet's day.",
  },
  {
    id: 11,
    name: "Ancestral Wisdom Journal",
    category: "Journals & Planners",
    price: 35,
    image: "/placeholder-c9sta.png",
    rating: 4.9,
    reviews: 47,
    comingSoon: true,
    description:
      "Connect with your roots through guided reflection and storytelling prompts honoring those who came before.",
  },
  {
    id: 12,
    name: "Moon Cycle Manifestation Journal",
    category: "Journals & Planners",
    price: 25,
    image: "/placeholder-ki7tg.png",
    rating: 4.8,
    reviews: 39,
    comingSoon: true,
    description: "Align your intentions with the natural rhythms of the moon for powerful manifestation.",
  },
]

export default function ShopPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("Featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts =
    selectedCategory === "All Products" ? products : products.filter((product) => product.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price
    if (sortBy === "Price: High to Low") return b.price - a.price
    if (sortBy === "Rating") return b.rating - a.rating
    return 0 // Featured - keep original order
  })

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">Sacred Shop</h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8">
                Curated tools for your healing journey, designed with intention and Southern Gothic grace. Each item
                supports your gentle transformation at your own sacred pace.
              </p>
            </div>
          </div>
        </section>

        {/* Shop Section */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-midnight-blue" />
                  <span className="font-montserrat text-midnight-blue">Filters & Categories</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-midnight-blue transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Categories & Filters */}
              <div
                className={`lg:w-1/4 ${
                  showFilters ? "block" : "hidden lg:block"
                } bg-white p-6 rounded-xl shadow-sm h-fit`}
              >
                <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Categories</h2>
                <ul className="space-y-2 mb-8">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left py-2 px-3 rounded-lg font-lora transition-colors ${
                          selectedCategory === category
                            ? "bg-sage-green/20 text-midnight-blue font-semibold"
                            : "text-gray-700 hover:bg-sage-green/10"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>

                <h2 className="font-playfair text-xl font-bold text-midnight-blue mb-4">Sort By</h2>
                <ul className="space-y-2">
                  {["Featured", "Price: Low to High", "Price: High to Low", "Rating"].map((option) => (
                    <li key={option}>
                      <button
                        onClick={() => setSortBy(option)}
                        className={`w-full text-left py-2 px-3 rounded-lg font-lora transition-colors ${
                          sortBy === option
                            ? "bg-sage-green/20 text-midnight-blue font-semibold"
                            : "text-gray-700 hover:bg-sage-green/10"
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-playfair text-2xl font-bold text-midnight-blue">
                    {selectedCategory}{" "}
                    <span className="font-lora font-normal text-gray-600">({sortedProducts.length})</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sortedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden group relative"
                    >
                      {/* Coming Soon Badge */}
                      {product.comingSoon && (
                        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-4 py-1 rounded-full shadow-lg">
                          COMING SOON
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        aria-label="Add to wishlist"
                        className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-all duration-300"
                      >
                        <Heart size={18} className="text-midnight-blue" />
                      </button>

                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={16} className="text-gold fill-gold" />
                          <span className="font-montserrat text-sm font-semibold text-midnight-blue">
                            {product.rating}
                          </span>
                          <span className="font-montserrat text-xs text-gray-500">({product.reviews})</span>
                        </div>

                        <h3 className="font-playfair text-lg font-bold text-midnight-blue mb-1">{product.name}</h3>
                        <p className="font-lora text-sm text-gray-600 mb-4">{product.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="font-playfair text-xl font-bold text-midnight-blue">${product.price}</span>
                          <button
                            disabled={product.comingSoon}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-montserrat text-sm font-semibold transition-all duration-300 ${
                              product.comingSoon
                                ? "bg-warm-gray text-gray-600 cursor-not-allowed"
                                : "bg-sage-green text-midnight-blue hover:bg-sage-green/90 hover:shadow-md"
                            }`}
                          >
                            <ShoppingBag size={16} />
                            {product.comingSoon ? "Notify Me" : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">Join Our Sacred Circle</h2>
              <p className="font-lora text-xl text-gray-800 mb-8 leading-relaxed">
                Be the first to know when new products arrive, plus receive exclusive discounts and healing wisdom for
                your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-sage-green font-lora"
                />
                <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="font-lora text-sm text-gray-600 mt-4">
                We respect your privacy and will never spam you. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
