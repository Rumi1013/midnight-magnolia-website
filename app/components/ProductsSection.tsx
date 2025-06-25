"use client"

import { motion } from "framer-motion"
import ProductCard from "./ProductCard"

const featuredProducts = [
  {
    id: "magnolia-reset",
    title: "The Magnolia Reset",
    subtitle: "90-DAY HEALING JOURNAL",
    description:
      "A gentle companion for your sobriety and healing journey, with daily prompts that honor your pace and celebrate your progress.",
    category: "HEALING JOURNALS",
    image: "📖",
    formats: [
      { name: "Digital Download", price: 29, type: "digital" as const },
      { name: "KDP Paperback", price: 47, type: "print" as const },
      { name: "Hardcover Edition", price: 67, type: "print" as const },
    ],
    features: ["Daily affirmations", "Sobriety tracker", "Gentle accountability", "Progress celebration"],
    comingSoon: true,
  },
  {
    id: "midnight-messages",
    title: "Midnight Messages",
    subtitle: "TAROT & AFFIRMATION DECK",
    description:
      "78 beautiful cards featuring Black icons with Southern Gothic elegance, ancestral wisdom, and empowering affirmations.",
    category: "TAROT & DIVINATION",
    image: "🔮",
    formats: [
      { name: "Digital Deck", price: 19, type: "digital" as const },
      { name: "Print-on-Demand", price: 33, type: "print" as const },
      { name: "Deluxe Physical Set", price: 55, type: "physical" as const },
    ],
    features: ["78 unique cards", "Digital guidebook", "Monthly spreads", "Ancestor wisdom"],
    comingSoon: true,
  },
  {
    id: "sacred-productivity",
    title: "Sacred Productivity",
    subtitle: "ADHD-FRIENDLY PLANNER",
    description:
      "Planning tools that work with your neurodivergent brain, not against it. Gentle structure for chaotic minds with spoon theory integration.",
    category: "DIGITAL PLANNERS",
    image: "📝",
    formats: [
      { name: "Digital Templates", price: 19, type: "digital" as const },
      { name: "Printable PDF", price: 29, type: "print" as const },
      { name: "KDP Spiral Bound", price: 39, type: "print" as const },
    ],
    features: ["Flexible templates", "Energy tracking", "Spoon theory integration", "Executive function support"],
    comingSoon: true,
  },
]

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-midnight-blue relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-sage-green/20 text-2xl">✨</div>
        <div className="absolute top-40 right-20 text-gold/20 text-3xl">🌙</div>
        <div className="absolute bottom-20 left-20 text-sage-green/20 text-2xl">🌸</div>
      </div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-montserrat text-sage-green text-sm uppercase tracking-wider mb-4">
            SACRED TOOLS FOR TRANSFORMATION
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-magnolia-white mb-6">Featured Products</h2>
          <p className="font-lora text-magnolia-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Carefully crafted tools to support your healing journey. Each product is designed with love, intention, and
            deep respect for your unique path.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
