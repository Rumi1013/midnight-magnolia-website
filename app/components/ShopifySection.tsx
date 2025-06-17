"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Truck, Shield, Gift, BookOpen, Palette, ShoppingBag, Edit3 } from "lucide-react"

// Data merged from ProductsSection.tsx
const digitalProductsData = [
  {
    name: "The Magnolia Reset",
    subtitle: "90-Day Healing Journal",
    description:
      "A gentle companion for your sobriety and healing journey, with daily prompts that honor your pace and celebrate your progress.",
    price: "$47", // Assuming this is print price
    digitalPrice: "$29",
    image: "📖", // Emoji placeholder, replace with actual image path if available
    category: "Healing Journals",
    features: ["Daily affirmations", "Sobriety tracker", "Gentle accountability", "Progress celebration"],
    available: ["Digital Download", "KDP Paperback", "Hardcover Edition"],
    bestseller: true,
    type: "Digital Tool / Journal",
    comingSoon: true,
    rating: 4.9, // Added for consistency
    reviews: 150, // Added for consistency
    originalPrice: "$35", // Example original digital price
  },
  {
    name: "Midnight Messages",
    subtitle: "Tarot & Affirmation Deck",
    description:
      "78 beautiful cards featuring Black icons with Southern Gothic elegance, ancestral wisdom, and empowering affirmations.",
    price: "$33", // Assuming this is print price
    digitalPrice: "$19",
    image: "🔮", // Emoji placeholder
    category: "Tarot & Divination",
    features: ["78 unique cards", "Digital guidebook", "Monthly spreads", "Ancestor wisdom"],
    available: ["Digital Deck", "Print-on-Demand", "Deluxe Physical Set"],
    bestseller: true,
    type: "Digital Tool / Tarot",
    comingSoon: true,
    rating: 4.8,
    reviews: 180,
    originalPrice: "$25",
  },
  {
    name: "Sacred Productivity",
    subtitle: "ADHD-Friendly Planner",
    description:
      "Planning tools that work with your neurodivergent brain, not against it. Gentle structure for chaotic minds with spoon theory integration.",
    price: "$29", // Assuming this is print price
    digitalPrice: "$19",
    image: "📝", // Emoji placeholder
    category: "Digital Planners",
    features: ["Flexible templates", "Energy tracking", "Spoon theory integration", "Executive function support"],
    available: ["Digital Templates", "Printable PDF", "KDP Spiral Bound"],
    bestseller: false,
    type: "Digital Tool / Planner",
    comingSoon: true,
    rating: 4.7,
    reviews: 120,
    originalPrice: "$24",
  },
]

// Data for physical merchandise (already in ShopifySection)
const physicalProductsData = [
  {
    name: "Magnolia Bloom Tote Bag",
    description: "Elegant tote featuring our signature magnolia design on premium eco-canvas.",
    price: "$34.99",
    originalPrice: "$42.99",
    rating: 4.8,
    reviews: 127,
    image: "/magnolia-tote-bag.png",
    category: "Accessories",
    bestseller: true,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Southern Gothic Throw Pillow",
    description: "Decorative pillow with mystical Southern Gothic motifs in midnight blue and gold.",
    price: "$29.99",
    originalPrice: "$35.99",
    rating: 4.9,
    reviews: 89,
    image: "/southern-gothic-pillow.png",
    category: "Home Decor",
    bestseller: false,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Midnight Moon Mug",
    description: "Ceramic mug featuring crescent moon and magnolia design in our signature colors.",
    price: "$19.99",
    originalPrice: "$24.99",
    rating: 4.7,
    reviews: 203,
    image: "/midnight-moon-mug.png",
    category: "Kitchenware",
    bestseller: true,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Healing Journey Journal Cover",
    description: "Hardcover journal with our exclusive Southern Gothic artwork.",
    price: "$24.99",
    originalPrice: "$29.99",
    rating: 4.9,
    reviews: 156,
    image: "/healing-journal-cover.png", // Placeholder, ensure this image exists
    category: "Stationery",
    bestseller: false,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Mystical Cat Bandana",
    description: "Soft cotton bandana featuring crescent moons and stars for your magical familiar.",
    price: "$16.99",
    originalPrice: "$21.99",
    rating: 4.8,
    reviews: 94,
    image: "/mystical-cat-bandana.png",
    category: "Pet Accessories",
    bestseller: true,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Sacred Paws Food Bowl",
    description: "Ceramic pet bowl with protective symbols and magnolia motifs.",
    price: "$22.99",
    originalPrice: "$27.99",
    rating: 4.6,
    reviews: 67,
    image: "/sacred-paws-bowl.png",
    category: "Pet Accessories",
    bestseller: false,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Moonlight Pet Collar",
    description: "Adjustable collar with celestial charms and soft padding for comfort.",
    price: "$28.99",
    originalPrice: "$34.99",
    rating: 4.7,
    reviews: 112,
    image: "/moonlight-pet-collar.png",
    category: "Pet Accessories",
    bestseller: false,
    type: "Physical Merchandise",
    comingSoon: true,
  },
  {
    name: "Healing Herbs Pet Toy",
    description: "Organic catnip toy shaped like sage bundle for spiritual cleansing play.",
    price: "$12.99",
    originalPrice: "$16.99",
    rating: 4.9,
    reviews: 203,
    image: "/healing-herbs-pet-toy.png",
    category: "Pet Accessories",
    bestseller: true,
    type: "Physical Merchandise",
    comingSoon: true,
  },
]

// Combined featured products
const combinedFeaturedProducts = [...digitalProductsData, ...physicalProductsData]

// Data merged from ShopSection.tsx for Collections
const shopCategoriesData = [
  {
    name: "Healing Journals & Planners",
    description: "Physical and digital journals designed for gentle productivity and healing.",
    itemCount: digitalProductsData.filter((p) => p.category === "Healing Journals" || p.category === "Digital Planners")
      .length,
    image: digitalProductsData.find((p) => p.category === "Healing Journals")?.image || "/images/logo-book.jpg", // Use actual image or fallback
    icon: <BookOpen className="h-8 w-8 text-sage-green" />,
    logo: "/images/logo-book.jpg",
    comingSoon: true,
  },
  {
    name: "Kindle Direct Publishing",
    description: "Physical books and journals available through Amazon KDP.",
    itemCount: 6, // Example count
    image: "/images/logo-main.jpg", // Placeholder
    icon: <BookOpen className="h-8 w-8 text-sage-green" />, // Re-using, consider specific KDP icon
    logo: "/images/logo-main.jpg",
    comingSoon: true,
  },
  {
    name: "Tarot & Divination",
    description: "Beautiful cards featuring Black icons with Southern Gothic elegance.",
    itemCount: digitalProductsData.filter((p) => p.category === "Tarot & Divination").length,
    image: digitalProductsData.find((p) => p.category === "Tarot & Divination")?.image || "/images/logo-circular.jpg",
    icon: <Edit3 className="h-8 w-8 text-sage-green" />, // Lucide icon for 'Edit3' as 'PenTool'
    logo: "/images/logo-circular.jpg",
    comingSoon: true,
  },
  {
    name: "Business & Automation",
    description: "Tools for building your digital empire with gentle structure.",
    itemCount: 5, // Example count
    image: "/images/logo-minimal.jpg", // Placeholder
    icon: <ShoppingBag className="h-8 w-8 text-sage-green" />, // Lucide icon for 'ShoppingBag' as 'Briefcase'
    logo: "/images/logo-minimal.jpg",
    comingSoon: true,
  },
  {
    name: "Art & Merchandise",
    description: "Southern Gothic inspired artwork and physical products.",
    itemCount: physicalProductsData.filter(
      (p) =>
        p.category === "Accessories" ||
        p.category === "Home Decor" ||
        p.category === "Kitchenware" ||
        p.category === "Stationery",
    ).length,
    image: physicalProductsData.find((p) => p.category === "Home Decor")?.image || "/images/logo-smoke.jpg",
    icon: <Palette className="h-8 w-8 text-sage-green" />,
    logo: "/images/logo-smoke.jpg",
    comingSoon: true,
  },
  {
    name: "Midnight Menagerie", // Added from physical products
    description: "Sacred accessories for your beloved animal companions.",
    itemCount: physicalProductsData.filter((p) => p.category === "Pet Accessories").length,
    image: physicalProductsData.find((p) => p.category === "Pet Accessories")?.image || "/mystical-cat-bandana.png",
    icon: <Heart className="h-8 w-8 text-sage-green" />, // Lucide icon for 'Heart'
    logo: "/images/logo-minimal.jpg", // Example logo
    comingSoon: true,
  },
]

const storeFeatures = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Thoughtful Delivery", // Adjusted from "Free Shipping"
    description: "Carefully packaged items, shipping details at checkout.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Quality & Intention", // Adjusted
    description: "Crafted with care, 30-day return policy.",
  },
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Healing Bundles",
    description: "Curated sets for your journey (coming soon).",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Made with Love",
    description: "Each item infused with intention.",
  },
]

export default function ShopifySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 }) // Adjusted amount
  const [activeTab, setActiveTab] = useState("featured")

  return (
    <section ref={ref} id="shop" className="py-20 bg-[#F5EDD6]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="bg-midnight-blue text-magnolia-white font-montserrat text-sm tracking-wider uppercase px-4 py-2 rounded-full inline-block mb-4 font-bold">
            Sacred Marketplace
          </p>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-midnight-blue mb-6">Tools for Your Altar</h2>
          <p className="font-lora text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of digital tools, physical merchandise, and sacred offerings designed to
            support your healing journey and adorn your sacred space.
          </p>
        </motion.div>

        <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-12 bg-magnolia-white/50 rounded-full p-1">
            <TabsTrigger
              value="featured"
              className="font-montserrat data-[state=active]:bg-sage-green data-[state=active]:text-midnight-blue data-[state=active]:shadow-md rounded-full py-2.5"
            >
              Featured Offerings
            </TabsTrigger>
            <TabsTrigger
              value="collections"
              className="font-montserrat data-[state=active]:bg-sage-green data-[state=active]:text-midnight-blue data-[state=active]:shadow-md rounded-full py-2.5"
            >
              Browse Collections
            </TabsTrigger>
            <TabsTrigger
              value="our-promise"
              className="font-montserrat data-[state=active]:bg-sage-green data-[state=active]:text-midnight-blue data-[state=active]:shadow-md rounded-full py-2.5"
            >
              Our Sacred Promise
            </TabsTrigger>
          </TabsList>

          {/* Featured Products Tab - Now includes digital and physical */}
          <TabsContent value="featured">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === "featured" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <p className="text-magnolia-white">Featured products temporarily hidden for debugging.</p>
            </motion.div>
          </TabsContent>

          {/* Collections Tab - Now uses shopCategoriesData */}
          <TabsContent value="collections">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === "collections" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {shopCategoriesData.map((collection, index) => (
                <Card
                  key={collection.name}
                  className="bg-white border-sage-green/20 overflow-hidden hover:shadow-xl transition-shadow group rounded-3xl flex flex-col"
                >
                  <div className="relative h-48 w-full">
                    {typeof collection.image === "string" && collection.image.startsWith("/") ? (
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-warm-gray/10 text-6xl group-hover:scale-110 transition-transform duration-300">
                        {collection.image} {/* Emoji or placeholder */}
                      </div>
                    )}
                    {collection.comingSoon && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-gold to-sage-green text-midnight-blue font-montserrat font-bold text-xs px-3 py-1 rounded-full shadow-lg z-10">
                        COMING SOON
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      {collection.icon}
                      <CardTitle className="font-playfair text-xl text-midnight-blue group-hover:text-sage-green transition-colors">
                        {collection.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="font-lora text-gray-700 text-sm leading-relaxed">
                      {collection.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t border-warm-gray/20">
                    <span className="font-montserrat text-sm text-sage-green font-semibold">
                      {collection.itemCount} offerings
                    </span>
                    <button
                      className={`font-montserrat font-semibold text-sm transition-colors duration-300 ${collection.comingSoon ? "text-warm-gray cursor-not-allowed" : "text-sage-green hover:text-midnight-blue"}`}
                      disabled={collection.comingSoon}
                    >
                      {collection.comingSoon ? "Coming Soon" : "Explore Collection →"}
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* Our Promise Tab */}
          <TabsContent value="our-promise">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={activeTab === "our-promise" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {storeFeatures.map((feature) => (
                  <Card
                    key={feature.title}
                    className="bg-white border-sage-green/20 text-center hover:shadow-xl transition-shadow rounded-3xl p-2"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-center text-sage-green mb-3">{feature.icon}</div>
                      <CardTitle className="font-playfair text-lg text-midnight-blue">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-lora text-gray-700 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-midnight-blue/5 rounded-3xl p-8 md:p-12 text-center">
                <h3 className="font-playfair text-3xl font-bold text-midnight-blue mb-6">Our Sacred Promise</h3>
                <p className="font-lora text-gray-800 leading-relaxed max-w-3xl mx-auto mb-8 text-lg">
                  Every product in our shop is chosen or designed to support your healing journey. We believe that the
                  objects in your space should bring you peace, inspiration, and gentle reminders of your own sacred
                  worth. From the moment you place your order to the day it arrives at your door, we infuse every step
                  with intention and love.
                </p>
                <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-10 py-4 rounded-full transition-all duration-300 min-h-[48px] text-base hover:shadow-lg">
                  Visit Our Full Shopify Store (Coming Soon)
                </button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
