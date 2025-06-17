"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookOpen, Star } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const books = [
  {
    id: 1,
    title: "The Magnolia Reset: A 90-Day Healing Journal",
    subtitle: "Hardcover Edition",
    description:
      "A beautifully crafted hardcover journal for your sobriety and healing journey. Features high-quality paper, a ribbon marker, and lay-flat binding.",
    price: 47,
    image: "/healing-journal-cover.png",
    rating: 4.9,
    reviews: 127,
    format: "Hardcover, 220 pages",
    bestseller: true,
  },
  {
    id: 2,
    title: "Sacred Productivity: An ADHD-Friendly Planner",
    subtitle: "Spiral-Bound Edition",
    description:
      "A spiral-bound physical planner with flexible templates, energy tracking, and spoon theory integration. Designed to work with your neurodivergent brain.",
    price: 39,
    image: "/placeholder.svg?height=600&width=450&text=Sacred+Productivity+Planner",
    rating: 4.8,
    reviews: 89,
    format: "Spiral-Bound, 180 pages",
    bestseller: false,
  },
  {
    id: 3,
    title: "Midnight Messages: A Southern Gothic Tarot Guidebook",
    subtitle: "Paperback Companion",
    description:
      "The complete guidebook for the Midnight Messages Tarot Deck, featuring detailed card meanings, spreads, and ancestral wisdom. (Deck sold separately).",
    price: 24,
    image: "/placeholder.svg?height=600&width=450&text=Tarot+Guidebook",
    rating: 4.9,
    reviews: 203,
    format: "Paperback, 150 pages",
    bestseller: true,
  },
  {
    id: 4,
    title: "Whispers of the Magnolia: Collected Writings",
    subtitle: "First Edition Hardcover",
    description:
      "A curated collection of essays, poems, and stories from the Midnight Magnolia blog, beautifully bound in a linen hardcover.",
    price: 35,
    image: "/placeholder.svg?height=600&width=450&text=Collected+Writings",
    rating: 4.7,
    reviews: 56,
    format: "Hardcover, 250 pages",
    bestseller: false,
  },
]

export default function PrintBooksClient() {
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
              <BookOpen className="h-16 w-16 text-gold mx-auto mb-4" />
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">The Library</h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                Hold our healing words in your hands. Explore our collection of beautifully printed journals, planners,
                and books, crafted to be cherished companions on your journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Books Grid */}
        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                      <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-playfair text-xl font-bold text-midnight-blue group-hover:text-sage-green transition-colors duration-300">
                        {book.title}
                      </h3>
                      <p className="font-montserrat text-sm text-gray-600 uppercase tracking-wider">{book.subtitle}</p>
                      <div className="flex items-center justify-center gap-2 my-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < Math.floor(book.rating) ? "text-gold fill-gold" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-lora text-sm text-gray-500">({book.reviews})</span>
                      </div>
                      <p className="font-lora text-gray-700 text-sm mb-4 line-clamp-3">{book.description}</p>
                      <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold">
                        Buy for ${book.price}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
