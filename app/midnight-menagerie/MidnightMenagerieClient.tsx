"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Star, ShoppingCart, PawPrint } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const petProducts = [
  {
    id: 1,
    name: "Mystical Cat Bandana",
    description: "A soft, cotton bandana with celestial prints to adorn your feline familiar.",
    price: 22,
    category: "Apparel",
    image: "/mystical-cat-bandana.png",
    rating: 4.9,
    reviews: 88,
    bestseller: true,
    tags: ["cat", "bandana", "celestial", "familiar"],
  },
  {
    id: 2,
    name: "Sacred Paws Food Bowl",
    description: "A ceramic food bowl inscribed with protective sigils for blessed mealtimes.",
    price: 38,
    category: "Supplies",
    image: "/sacred-paws-bowl.png",
    rating: 4.8,
    reviews: 102,
    bestseller: false,
    tags: ["bowl", "ceramic", "sigil", "dog", "cat"],
  },
  {
    id: 3,
    name: "Moonlight Pet Collar Charm",
    description: "A silver-plated moonstone charm to bring calming energy to your pet's collar.",
    price: 18,
    category: "Accessories",
    image: "/moonlight-pet-collar.png",
    rating: 5.0,
    reviews: 154,
    bestseller: true,
    tags: ["charm", "moonstone", "calming", "collar"],
  },
  {
    id: 4,
    name: "Healing Herbs Catnip Toy",
    description: "A plush toy filled with organic catnip and a blend of calming herbs like lavender and chamomile.",
    price: 15,
    category: "Toys",
    image: "/healing-herbs-pet-toy.png",
    rating: 4.7,
    reviews: 211,
    bestseller: true,
    tags: ["toy", "catnip", "herbal", "calming"],
  },
  {
    id: 5,
    name: "Canine Ancestor Chew Toy",
    description: "A durable, non-toxic chew toy shaped like a wolf, honoring your dog's wild lineage.",
    price: 25,
    category: "Toys",
    image: "/placeholder.svg?height=400&width=400&text=Wolf+Chew+Toy",
    rating: 4.6,
    reviews: 95,
    bestseller: false,
    tags: ["dog", "chew toy", "durable", "ancestor"],
  },
  {
    id: 6,
    name: "Familiar Protection Amulet",
    description: "A small, lightweight amulet with tourmaline and obsidian to attach to your pet's bed or carrier.",
    price: 29,
    category: "Accessories",
    image: "/placeholder.svg?height=400&width=400&text=Protection+Amulet",
    rating: 4.9,
    reviews: 76,
    bestseller: false,
    tags: ["protection", "amulet", "crystal", "energy"],
  },
]

export default function MidnightMenagerieClient() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac fullPage />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <PawPrint className="h-16 w-16 text-gold mx-auto mb-4" />
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">
                Midnight Menagerie
              </h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Sacred tools and adornments for your beloved familiars. Because our animal companions deserve healing,
                protection, and a touch of magic too.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {petProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.bestseller && (
                        <Badge className="absolute top-4 left-4 bg-gold text-midnight-blue font-montserrat font-bold">
                          BESTSELLER
                        </Badge>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                      >
                        <Heart
                          size={18}
                          className={`${wishlist.includes(product.id) ? "text-red-500 fill-current" : "text-midnight-blue"}`}
                        />
                      </button>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-sage-green text-sage-green">
                          {product.category}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Star size={14} className="text-gold fill-gold" />
                          <span className="font-lora text-sm text-gray-600">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="font-lora text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-playfair text-2xl font-bold text-midnight-blue">${product.price}</span>
                        <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
