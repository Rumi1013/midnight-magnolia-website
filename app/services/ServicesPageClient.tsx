"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, CheckCircle, ArrowRight } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const services = [
  {
    id: 1,
    title: "Ancestral Healing Consultation",
    description:
      "One-on-one sessions to explore and heal generational trauma through Southern folk wisdom and modern therapeutic approaches.",
    duration: "90 minutes",
    price: 150,
    category: "Individual",
    features: [
      "Personalized ancestral mapping",
      "Trauma-informed guidance",
      "Cultural healing practices",
      "Follow-up resources",
    ],
    image: "/placeholder.svg?height=400&width=600",
    popular: true,
  },
  {
    id: 2,
    title: "Gentle Productivity Coaching",
    description:
      "ADHD and chronic illness-friendly productivity coaching that honors your energy levels and unique brain wiring.",
    duration: "60 minutes",
    price: 120,
    category: "Individual",
    features: ["Spoon theory integration", "Custom systems design", "Energy management strategies", "Ongoing support"],
    image: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
  {
    id: 3,
    title: "Moon Cycle Healing Circle",
    description:
      "Monthly group sessions aligned with lunar phases for intention setting, release work, and community healing.",
    duration: "2 hours",
    price: 45,
    category: "Group",
    features: ["Lunar-aligned practices", "Group meditation", "Ritual guidance", "Community support"],
    image: "/placeholder.svg?height=400&width=600",
    popular: true,
  },
  {
    id: 4,
    title: "Digital Altar Creation",
    description: "Learn to create and maintain sacred digital spaces for your spiritual practice and daily rituals.",
    duration: "45 minutes",
    price: 75,
    category: "Workshop",
    features: ["Custom altar design", "Digital tools training", "Maintenance guidance", "Template library access"],
    image: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
  {
    id: 5,
    title: "Trauma-Informed Movement",
    description:
      "Gentle movement practices designed specifically for trauma survivors to reconnect with their bodies safely.",
    duration: "75 minutes",
    price: 90,
    category: "Workshop",
    features: ["Body-safe practices", "Nervous system regulation", "Adaptive modifications", "Home practice guide"],
    image: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
  {
    id: 6,
    title: "Southern Gothic Storytelling",
    description:
      "Explore your personal narrative through the lens of Southern Gothic tradition, finding beauty in the shadows.",
    duration: "2 hours",
    price: 180,
    category: "Individual",
    features: ["Narrative exploration", "Creative writing prompts", "Shadow work integration", "Personal mythology"],
    image: "/placeholder.svg?height=400&width=600",
    popular: false,
  },
]

const categories = ["All Services", "Individual", "Group", "Workshop"]

export default function ServicesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Services")

  const filteredServices =
    selectedCategory === "All Services" ? services : services.filter((service) => service.category === selectedCategory)

  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6"
              >
                Sacred Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed mb-8"
              >
                Trauma-informed healing services that honor your journey and support your transformation through
                Southern Gothic wisdom and modern therapeutic practices.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="#services">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Explore Our Offerings
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-montserrat text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-sage-green text-midnight-blue shadow-md"
                      : "bg-white text-gray-700 hover:bg-sage-green/20 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 relative">
                    {service.popular && (
                      <Badge className="absolute top-4 right-4 z-10 bg-gold text-midnight-blue font-montserrat font-bold">
                        Popular
                      </Badge>
                    )}

                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-magnolia-white/90 text-midnight-blue">
                          {service.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2 group-hover:text-sage-green transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="font-lora text-gray-700 mb-4 text-sm leading-relaxed">{service.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-sage-green mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Service Details */}
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}
                        </div>
                        <div className="font-playfair text-xl font-bold text-midnight-blue">${service.price}</div>
                      </div>

                      <Button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold transition-all duration-300">
                        Book Session
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F5EDD6]">
          <div className="container mx-auto px-6">
            <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-12 text-center">Healing Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  service: "Ancestral Healing",
                  quote:
                    "This session helped me understand patterns I'd carried for generations. I finally feel free to write my own story.",
                  rating: 5,
                },
                {
                  name: "Marcus T.",
                  service: "Gentle Productivity",
                  quote: "Finally, a productivity system that works with my ADHD instead of against it. Life-changing.",
                  rating: 5,
                },
                {
                  name: "Luna K.",
                  service: "Moon Circle",
                  quote:
                    "The community and ritual practice have become essential to my healing. I look forward to every gathering.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white p-6 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                        ))}
                      </div>
                      <p className="font-lora text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-montserrat font-semibold text-midnight-blue">{testimonial.name}</p>
                        <p className="font-lora text-sm text-gray-600">{testimonial.service}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-midnight-blue">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-6">
                Ready to Begin Your Healing Journey?
              </h2>
              <p className="font-lora text-xl text-magnolia-white/80 mb-8 leading-relaxed">
                Every journey begins with a single step. Let us walk alongside you as you discover your path to
                wholeness and transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/community">
                  <Button
                    variant="outline"
                    className="border-magnolia-white text-magnolia-white hover:bg-magnolia-white hover:text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Join Our Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
