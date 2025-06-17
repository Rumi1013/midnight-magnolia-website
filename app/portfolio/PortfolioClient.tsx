"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const projects = [
  {
    id: 1,
    title: "Midnight Messages Tarot Deck",
    category: "Illustration & Product Design",
    image: "/southern-gothic-tarot.png",
    description: "A 78-card tarot deck featuring Black icons, Southern Gothic elegance, and ancestral wisdom.",
  },
  {
    id: 2,
    title: "The Sanctuary Sessions",
    category: "Brand Identity & Web Design",
    image: "/ethereal-wellness-website.png",
    description: "Visual identity and web design for a collective of trauma-informed healing practitioners.",
  },
  {
    id: 3,
    title: "Whispers of the Bayou",
    category: "Photography Series",
    image: "/placeholder-zi8cc.png",
    description: "A black and white photography series exploring the haunting beauty of Louisiana's wetlands.",
  },
  {
    id: 4,
    title: "Generational Threads",
    category: "Textile Art",
    image: "/abstract-gold-quilt.png",
    description:
      "A series of quilts using traditional techniques to tell stories of ancestral migration and resilience.",
  },
  {
    id: 5,
    title: "Digital Altar Project",
    category: "Interactive Art & UX Design",
    image: "/digital-altar-tablet.png",
    description: "An interactive web experience allowing users to build and tend to their own digital sacred space.",
  },
  {
    id: 6,
    title: "Poetic Justice",
    category: "Publication Design",
    image: "/placeholder.svg?height=600&width=800",
    description: "Layout and cover design for a collection of poetry on healing and social justice.",
  },
]

export default function PortfolioClient() {
  return (
    <>
      <FloatingMoon />
      <FloatingZodiac fullPage />

      <main className="min-h-screen bg-midnight-blue pt-24">
        <section className="py-20 bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6">Creative Works</h1>
              <p className="font-lora text-xl text-magnolia-white/80 leading-relaxed">
                A portfolio of art, design, and collaborative projects that embody the spirit of Midnight Magnolia—where
                healing meets creativity.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative block bg-black rounded-xl overflow-hidden"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <Badge className="bg-sage-green text-midnight-blue w-fit mb-2">{project.category}</Badge>
                    <h3 className="font-playfair text-2xl font-bold text-white">{project.title}</h3>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-magnolia-white/90 font-lora mb-4">{project.description}</p>
                      <button className="flex items-center gap-2 text-gold font-montserrat font-semibold">
                        <Eye size={16} /> View Project
                      </button>
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
