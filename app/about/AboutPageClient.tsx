"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  Sparkles,
  Moon,
  BookOpen,
  Zap,
  Users,
  Target,
  Compass,
  Flower2,
} from "lucide-react"
import FloatingMoon from "@/app/components/FloatingMoon"
import FloatingZodiac from "@/app/components/FloatingZodiac"

const values = [
  {
    icon: Heart,
    title: "Trauma-Informed Care",
    description:
      "Every tool, product, and resource is designed with trauma sensitivity at its core. We honor your healing journey at your pace.",
  },
  {
    icon: Sparkles,
    title: "Southern Gothic Elegance",
    description:
      "We embrace the beauty in shadows and find strength in the haunting. Our aesthetic celebrates resilience through darkness.",
  },
  {
    icon: Zap,
    title: "Technology as Liberation",
    description:
      "Automation and digital tools aren't for hustle culture—they're instruments of freedom, rest, and reclaimed time.",
  },
  {
    icon: Users,
    title: "Neurodivergent-Friendly",
    description:
      "Built by and for ADHD and neurodivergent minds. We design for executive function challenges, not against them.",
  },
]

const milestones = [
  {
    year: "2020",
    title: "The Dark Night",
    description:
      "A career transition and personal healing crisis became the catalyst. Technology became a lifeline during isolation.",
  },
  {
    year: "2021",
    title: "Building in the Shadows",
    description:
      "Learning automation, Notion systems, and digital product creation while navigating chronic illness and ADHD.",
  },
  {
    year: "2023",
    title: "Midnight Magnolia Blooms",
    description:
      "Launched as a sanctuary for those who refuse to choose between technology and soul, between ambition and rest.",
  },
  {
    year: "2024",
    title: "Community Expansion",
    description:
      "Growing a collective of healers, creators, and seekers who believe in gentle productivity and ancestral wisdom.",
  },
]

export default function AboutPageClient() {
  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />

      <main className="min-h-screen bg-midnight-blue pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-midnight-blue to-midnight-blue/80">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-magnolia-white/30 bg-gradient-to-br from-magnolia-white/20 to-gold/20 backdrop-blur-sm">
                  <Image
                    src="/magnolia-badge.png"
                    alt="Midnight Magnolia"
                    width={120}
                    height={120}
                    className="drop-shadow-lg"
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-playfair text-5xl lg:text-6xl font-bold text-magnolia-white mb-6"
              >
                Where Shadows Bloom Into Strength
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-lora text-xl text-magnolia-white/80 leading-relaxed max-w-3xl mx-auto"
              >
                Midnight Magnolia is a <span className="text-sage-green font-semibold">digital sanctuary</span> born
                from the intersection of ancestral wisdom, trauma-informed healing, and modern technology. We believe
                your liberation doesn't require burnout—it requires{" "}
                <span className="text-rich-gold font-semibold italic">gentleness, systems, and soul</span>.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Founder's Story Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue/80 to-deep-plum/20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden border border-rich-gold/30 shadow-2xl">
                    <Image
                      src="/magnolia-hero.png"
                      alt="Latisha Vincent-Waters, Founder"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/60 to-transparent" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-rich-gold text-midnight-blue px-6 py-4 rounded-xl shadow-xl">
                    <p className="font-playfair text-sm font-semibold">
                      Latisha Vincent-Waters
                      <br />
                      <span className="font-lora text-xs font-normal">Founder & Healer</span>
                    </p>
                  </div>
                </motion.div>

                {/* Story */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-6">
                    From Midnight to Magnolia
                  </h2>
                  <div className="space-y-4 font-lora text-magnolia-white/80 leading-relaxed">
                    <p>
                      I was drowning. A career transition, generational trauma, chronic illness, and an ADHD diagnosis
                      that finally explained <span className="italic">everything</span>. The world told me to "hustle
                      harder," but my body and mind were begging me to rest.
                    </p>
                    <p>
                      In that dark space—what I call the <span className="text-sage-green font-semibold">midnight hour</span>—I
                      discovered something unexpected: <span className="font-semibold">technology could be gentle</span>.
                      Automation wasn't about productivity for profit. It was about{" "}
                      <span className="text-rich-gold font-semibold">protecting my peace and energy</span>.
                    </p>
                    <p>
                      I built systems in Notion, automated workflows with Make.com, and created digital products that
                      worked <span className="italic">for me</span>, not against me. I reconnected with the ancestral
                      wisdom of my Southern Black heritage—the same magnolia that blooms after storms, the same roots
                      that hold through floods.
                    </p>
                    <p className="text-sage-green font-semibold">
                      Midnight Magnolia is my offering to those who refuse to choose between healing and building,
                      between rest and ambition, between magic and technology.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/shop"
                      className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full text-center transition-all duration-300 hover:shadow-lg"
                    >
                      Explore Our Tools
                    </Link>
                    <Link
                      href="/community"
                      className="bg-magnolia-white/10 hover:bg-magnolia-white/20 text-magnolia-white font-montserrat font-semibold px-8 py-3 rounded-full text-center transition-all duration-300 border border-magnolia-white/30"
                    >
                      Join Our Community
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-magnolia-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-4">
                  Our Core Values
                </h2>
                <p className="font-lora text-xl text-gray-700 max-w-2xl mx-auto">
                  These principles guide every product, service, and interaction at Midnight Magnolia.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 hover:border-sage-green hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-sage-green/20 p-3 rounded-lg">
                        <value.icon className="h-6 w-6 text-sage-green" />
                      </div>
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-midnight-blue mb-2">
                          {value.title}
                        </h3>
                        <p className="font-lora text-gray-700">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline Section */}
        <section className="py-20 bg-[#0A192F]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="font-playfair text-4xl font-bold text-magnolia-white mb-4">
                  Our Journey
                </h2>
                <p className="font-lora text-xl text-magnolia-white/80">
                  From darkness to bloom—the path that led us here.
                </p>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage-green/30" />

                {/* Timeline items */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative pl-20"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-1 w-5 h-5 rounded-full bg-sage-green border-4 border-midnight-blue" />

                      <div className="bg-magnolia-white/5 backdrop-blur-sm border border-magnolia-white/10 rounded-xl p-6 hover:border-sage-green/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-montserrat text-sm font-bold text-rich-gold bg-rich-gold/20 px-3 py-1 rounded-full">
                            {milestone.year}
                          </span>
                          <h3 className="font-playfair text-xl font-bold text-magnolia-white">
                            {milestone.title}
                          </h3>
                        </div>
                        <p className="font-lora text-magnolia-white/70">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gradient-to-b from-midnight-blue/80 to-deep-plum/20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-magnolia-white/5 backdrop-blur-sm border border-rich-gold/30 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-rich-gold" />
                    <h3 className="font-playfair text-2xl font-bold text-magnolia-white">Our Mission</h3>
                  </div>
                  <p className="font-lora text-magnolia-white/80 leading-relaxed">
                    To empower Black women, neurodivergent creators, and trauma survivors with{" "}
                    <span className="text-sage-green font-semibold">gentle technology solutions</span> that honor rest,
                    healing, and ancestral wisdom while building sustainable income streams.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-magnolia-white/5 backdrop-blur-sm border border-sage-green/30 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Compass className="h-8 w-8 text-sage-green" />
                    <h3 className="font-playfair text-2xl font-bold text-magnolia-white">Our Vision</h3>
                  </div>
                  <p className="font-lora text-magnolia-white/80 leading-relaxed">
                    A world where <span className="text-rich-gold font-semibold">healing and building coexist</span>,
                    where technology liberates instead of exploits, and where every person has access to tools that
                    honor their full humanity.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-sage-green">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-playfair text-4xl font-bold text-midnight-blue mb-6">
                  Ready to Begin Your Journey?
                </h2>
                <p className="font-lora text-xl text-midnight-blue/80 mb-8">
                  Join our community of healers, creators, and gentle rebels who are building lives of freedom and
                  peace.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="bg-midnight-blue hover:bg-midnight-blue/90 text-magnolia-white font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    Explore Our Products
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-magnolia-white hover:bg-magnolia-white/90 text-midnight-blue font-montserrat font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  >
                    Get in Touch
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
