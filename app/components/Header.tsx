"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Sacred Tools", href: "#products" },
    { name: "Shop", href: "#shop" },
    { name: "Our Story", href: "#about" },
    { name: "Midnight Musings", href: "#blog" },
    { name: "Justice & Healing", href: "#justice" },
    { name: "Community", href: "#testimonials" },
  ]

  return (
    <>
      {/* Fixed burgundy bar that slides down like a blind */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-900/95 backdrop-blur-md shadow-lg"
          >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
              {/* Logo */}
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5 group">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 overflow-hidden rounded-full">
                      <Image
                        src="/images/logo-minimal.jpg"
                        alt="Midnight Magnolia"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="font-playfair text-lg font-bold text-magnolia-white">Midnight Magnolia</div>
                      <div className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:gap-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-lora text-sm text-magnolia-white hover:text-gold transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex flex-1 justify-end items-center gap-4">
                {/* Theme toggle */}
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full p-2 bg-black/20 text-magnolia-white hover:bg-gold/20 hover:text-gold transition-colors duration-300"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  </button>
                )}

                {/* CTA Button */}
                <button className="hidden sm:block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm">
                  Enter Garden
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden rounded-full p-2 bg-black/20 text-magnolia-white hover:bg-gold/20 hover:text-gold transition-colors duration-300"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
              </div>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden bg-red-900/95 border-t border-black/20"
                >
                  <div className="px-6 py-4 space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-lora text-magnolia-white hover:text-sage-green transition-colors duration-300 py-2"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4">
                      Enter Garden
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transparent header for top of page */}
      {!scrolled && (
        <motion.header
          className="fixed top-0 z-40 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 group">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 overflow-hidden rounded-full">
                    <Image
                      src="/images/logo-minimal.jpg"
                      alt="Midnight Magnolia"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="font-playfair text-xl font-bold text-magnolia-white drop-shadow-lg">
                      Midnight Magnolia
                    </div>
                    <div className="font-montserrat text-xs text-sage-green tracking-wider drop-shadow-md">
                      DIGITAL SANCTUARY
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-lora text-sm text-magnolia-white hover:text-gold transition-colors duration-300 relative group drop-shadow-md"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex flex-1 justify-end items-center gap-4">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full p-2 bg-black/30 text-magnolia-white hover:bg-gold/30 hover:text-gold transition-colors duration-300 backdrop-blur-sm"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
              )}

              {/* CTA Button */}
              <button className="hidden sm:block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm shadow-lg">
                Enter Garden
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden rounded-full p-2 bg-black/30 text-magnolia-white hover:bg-gold/30 hover:text-gold transition-colors duration-300 backdrop-blur-sm"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </motion.header>
      )}
    </>
  )
}
