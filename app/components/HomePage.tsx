"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Heart, Zap, Moon, BookOpen, Users, Mail } from "lucide-react"

// Core Offerings based on revenue targets and products
const coreOfferings = [
  {
    title: "The Digital Grimoire",
    description: "Automation templates & Notion systems to achieve financial sovereignty.",
    icon: Zap,
    link: "/shop?tag=digital-sanctuary",
  },
  {
    title: "Rooted in Resilience",
    description: "Journals, workbooks, and mentorship for trauma-informed healing.",
    icon: Heart,
    link: "/shop?tag=resilience",
  },
  {
    title: "Moonlit Mystery",
    description: "Tarot systems, affirmation decks, and Southern Gothic art prints.",
    icon: Moon,
    link: "/shop?tag=mystery",
  },
]

// Brand Narratives
const narratives = [
  {
    title: "Transformation Story",
    text: "The midnight hour reveals clarity. Our brand is born from career transition and healing, embracing change as the path to financial autonomy.",
    icon: Sparkles,
  },
  {
    title: "Technology as Liberation",
    text: "Automation is not hustle; it is a tool for ease. We use Make.com and Notion to free up your precious time and energy.",
    icon: Zap,
  },
  {
    title: "Resilience & Strength",
    text: "Like the magnolia that blooms through adversity, our tools are built for endurance and self-preservation.",
    icon: BookOpen,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-midnight-blue text-magnolia-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b-2 border-sage-green/30 py-20 text-center">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-blue via-midnight-blue to-deep-plum/20" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/50 bg-gradient-to-br from-gold/10 to-sage-green/10 backdrop-blur-sm shadow-2xl">
              <Image
                src="/magnolia-logo.svg"
                alt="Midnight Magnolia logo"
                width={64}
                height={64}
                className="drop-shadow-lg"
              />
            </div>
          </motion.div>

          <motion.h1
            className="mb-6 font-playfair text-5xl font-bold leading-tight text-gold md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build Digital Magic.
            <br />
            Heal Through Design.
          </motion.h1>

          <motion.p
            className="mb-8 font-lora text-xl text-magnolia-white md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where ancestral wisdom meets digital innovation. We transform resilience and Southern Gothic elegance into
            sustainable income streams.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/shop"
              className="inline-block rounded-full bg-gold px-8 py-4 font-montserrat text-lg font-bold uppercase tracking-wider text-midnight-blue shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gold/90 hover:shadow-2xl focus-visible-enhanced"
            >
              Explore The Digital Sanctuary
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRAND NARRATIVE PILLARS */}
      <section className="bg-gradient-to-b from-midnight-blue to-deep-plum/30 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-3">
          {narratives.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={index}
                className="rounded-lg border border-sage-green/30 bg-midnight-blue/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-3 flex justify-center">
                  <IconComponent className="h-10 w-10 text-gold" />
                </div>
                <h3 className="mb-2 font-montserrat text-xl font-semibold text-magnolia-white">{item.title}</h3>
                <p className="font-lora text-sm text-magnolia-white/80">{item.text}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* FEATURED PRODUCT CATEGORIES */}
      <section className="px-4 py-20">
        <h2 className="mb-12 text-center font-playfair text-4xl font-bold text-gold md:text-5xl">
          Our Core Offerings
        </h2>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {coreOfferings.map((offering, index) => {
            const IconComponent = offering.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  href={offering.link}
                  className="group block rounded-xl border border-gold/40 bg-gradient-to-br from-deep-plum/20 to-midnight-blue p-8 transition-all duration-300 hover:border-gold hover:shadow-2xl hover:shadow-gold/10 focus-visible-enhanced"
                >
                  <div className="mb-4 flex items-center">
                    <IconComponent className="mr-3 h-6 w-6 text-gold transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-playfair text-2xl font-semibold text-magnolia-white">{offering.title}</h3>
                  </div>
                  <p className="mb-4 font-lora text-base text-magnolia-white/80">{offering.description}</p>
                  <span className="inline-block font-montserrat text-sm text-sage-green transition-colors duration-300 group-hover:text-gold">
                    Explore Products →
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* LEAD GENERATION / COMMUNITY CTA */}
      <section className="bg-gradient-to-b from-midnight-blue to-deep-plum/30 px-4 py-16 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Moon className="mx-auto mb-4 h-12 w-12 text-gold" />
          
          <h2 className="mb-4 font-playfair text-3xl font-bold text-gold md:text-4xl">
            Join the Collective Rise
          </h2>
          
          <p className="mb-6 font-lora text-lg text-magnolia-white/90">
            Protect your peace and prosperity. Subscribe to the Midnight Moonletter for neurodivergent-friendly tips,
            exclusive prompts, and affiliate resources.
          </p>

          {/* Email subscription form */}
          <form className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your sacred email address"
              className="flex-1 rounded-lg border-2 border-gold/50 bg-midnight-blue px-4 py-3 font-lora text-magnolia-white placeholder:text-magnolia-white/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-lg bg-gold px-6 py-3 font-montserrat font-bold uppercase text-midnight-blue transition-all duration-300 hover:bg-gold/90 hover:shadow-lg focus-visible-enhanced"
              aria-label="Subscribe to newsletter"
            >
              <span className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" />
                Claim Sanctuary
              </span>
            </button>
          </form>

          <p className="mt-4 font-lora text-xs text-magnolia-white/60">
            We respect your energy. Unsubscribe anytime. No spam, only sacred wisdom.
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-sage-green/20 bg-midnight-blue px-4 py-8 text-center">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-lora italic text-sage-green">
            "A magnolia blooms even after the storm—so will you."
          </p>

          <div className="mb-4 flex justify-center gap-6 text-gold">
            <Moon className="h-5 w-5" aria-label="Moon icon" />
            <Users className="h-5 w-5" aria-label="Community icon" />
            <Sparkles className="h-5 w-5" aria-label="Sparkles icon" />
          </div>

          <nav className="mb-4 space-x-6 font-montserrat text-xs uppercase tracking-wider">
            <Link href="/about" className="text-magnolia-white transition-colors duration-300 hover:text-gold">
              About
            </Link>
            <Link href="/shop" className="text-magnolia-white transition-colors duration-300 hover:text-gold">
              Shop
            </Link>
            <Link href="/community" className="text-magnolia-white transition-colors duration-300 hover:text-gold">
              Community
            </Link>
            <Link href="/contact" className="text-magnolia-white transition-colors duration-300 hover:text-gold">
              Contact
            </Link>
          </nav>

          <p className="font-lora text-xs text-warm-gray">
            © {new Date().getFullYear()} Midnight Magnolia, operated under Rumi-Nations, LLC.
          </p>
        </div>
      </footer>
    </div>
  )
}

