"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Search, Filter, X } from "lucide-react"

const products = [
  {
    id: 1,
    name: "The Magnolia Reset 90-Day Journal",
    price: 29.0,
    image: "/placeholder.svg?height=400&width=400&text=Sacred+Journal",
    category: "Digital Tools",
    subcategory: "Journals",
    inStock: true,
  },
  {
    id: 2,
    name: "Midnight Messages Tarot Deck",
    price: 19.0,
    image: "/placeholder.svg?height=400&width=400&text=Tarot+Deck",
    category: "Digital Tools",
    subcategory: "Divination",
    inStock: true,
  },
  {
    id: 3,
    name: "Sacred Productivity ADHD Planner",
    price: 19.0,
    image: "/placeholder.svg?height=400&width=400&text=ADHD+Planner",
    category: "Digital Tools",
    subcategory: "Planners",
    inStock: true,
  },
  {
    id: 4,
    name: "Rose Quartz Heart Healing Set",
    price: 35.0,
    image: "/placeholder.svg?height=400&width=400&text=Rose+Quartz",
    category: "Sacred Tools",
    subcategory: "Crystals",
    inStock: true,
  },
  {
    id: 5,
    name: "Sacred Cleansing Herb Bundle",
    price: 28.0,
    image: "/placeholder.svg?height=400&width=400&text=Herb+Bundle",
    category: "Sacred Tools",
    subcategory: "Herbs",
    inStock: true,
  },
  {
    id: 6,
    name: "Midnight Moon Ritual Candle Set",
    price: 45.0,
    image: "/placeholder.svg?height=400&width=400&text=Candle+Set",
    category: "Sacred Tools",
    subcategory: "Candles",
    inStock: true,
  },
  {
    id: 7,
    name: "Digital Entrepreneur Starter Kit",
    price: 37.0,
    image: "/placeholder.svg?height=400&width=400&text=Starter+Kit",
    category: "Digital Tools",
    subcategory: "Business",
    inStock: true,
  },
  {
    id: 8,
    name: "Sacred Pet Blessing Kit",
    price: 24.0,
    image: "/placeholder.svg?height=400&width=400&text=Pet+Kit",
    category: "Sacred Tools",
    subcategory: "Pet Care",
    inStock: true,
  },
  {
    id: 9,
    name: "Ancestral Wisdom Oracle Cards",
    price: 32.0,
    image: "/placeholder.svg?height=400&width=400&text=Oracle+Cards",
    category: "Digital Tools",
    subcategory: "Divination",
    inStock: true,
  },
  {
    id: 10,
    name: "Southern Gothic Art Print Set",
    price: 22.0,
    image: "/placeholder.svg?height=400&width=400&text=Art+Prints",
    category: "Sacred Tools",
    subcategory: "Art",
    inStock: true,
  },
  {
    id: 11,
    name: "Healing Affirmation Cards",
    price: 18.0,
    image: "/placeholder.svg?height=400&width=400&text=Affirmation+Cards",
    category: "Digital Tools",
    subcategory: "Wellness",
    inStock: true,
  },
  {
    id: 12,
    name: "Magnolia Moon Phase Tracker",
    price: 15.0,
    image: "/placeholder.svg?height=400&width=400&text=Moon+Tracker",
    category: "Digital Tools",
    subcategory: "Planners",
    inStock: true,
  },
]

const categories = [
  { name: "Digital Tools", count: 6, subcategories: ["Journals", "Divination", "Planners", "Business", "Wellness"] },
  { name: "Sacred Tools", count: 6, subcategories: ["Crystals", "Herbs", "Candles", "Pet Care", "Art"] },
]

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Best selling", value: "best-selling" },
  { label: "Alphabetically, A-Z", value: "title-ascending" },
  { label: "Alphabetically, Z-A", value: "title-descending" },
  { label: "Price, low to high", value: "price-ascending" },
  { label: "Price, high to low", value: "price-descending" },
  { label: "Date, old to new", value: "created-ascending" },
  { label: "Date, new to old", value: "created-descending" },
]

export default function ShopPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSubcategory && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-ascending":
        return a.price - b.price
      case "price-descending":
        return b.price - a.price
      case "title-ascending":
        return a.name.localeCompare(b.name)
      case "title-descending":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedSubcategory("")
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Free shipping banner */}
      <div className="bg-gray-100 text-center py-2">
        <p className="text-sm text-gray-600">Free shipping on sacred orders over $50</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-2xl font-light text-gray-900 mb-6">All Sacred Tools</h2>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Filter:</h3>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-700 mb-2">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCategory === category.name}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCategory(category.name)
                                } else {
                                  setSelectedCategory("")
                                  setSelectedSubcategory("")
                                }
                              }}
                              className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {category.name} ({category.count})
                            </span>
                          </label>

                          {/* Subcategories */}
                          {selectedCategory === category.name && (
                            <div className="ml-6 mt-2 space-y-1">
                              {category.subcategories.map((sub) => (
                                <label key={sub} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={selectedSubcategory === sub}
                                    onChange={(e) => {
                                      setSelectedSubcategory(e.target.checked ? sub : "")
                                    }}
                                    className="w-3 h-3 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                                  />
                                  <span className="ml-2 text-xs text-gray-600">
                                    {sub} ({products.filter((p) => p.subcategory === sub).length})
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear filters */}
              {(selectedCategory || selectedSubcategory || searchTerm) && (
                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700 underline">
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile search */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  />
                </div>

                {/* Mobile categories */}
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.name}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategory === category.name}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategory(category.name)
                            } else {
                              setSelectedCategory("")
                              setSelectedSubcategory("")
                            }
                          }}
                          className="w-4 h-4 text-gray-600 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <button onClick={clearFilters} className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
              </p>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 group-hover:shadow-md transition-shadow duration-200">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)} USD</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
                <button onClick={clearFilters} className="text-sm text-gray-700 hover:text-gray-900 underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
