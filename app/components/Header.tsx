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
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollY, setLastScrollY] = useState(0)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? "down" : "up"

      setScrollDirection(direction)
      setScrolled(currentScrollY > 80)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navigation = [
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our Story", href: "/about" },
    { name: "Musings", href: "/blog" },
    { name: "Justice", href: "/justice" },
    { name: "Contact", href: "/contact" },
  ]

  // Enhanced blind-like animation variants
  const blindVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        duration: 0.6,
      },
    },
    hidden: {
      y: -120,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for blind-like motion
        delay: scrollDirection === "down" ? 0.1 : 0,
      },
    },
  }

  const transparentHeaderVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.6,
        delay: 0.2,
      },
    },
    hidden: {
      y: -80,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: [0.4, 0.0, 0.6, 1],
      },
    },
  }

  return (
    <>
      {/* Burgundy bar that slides up like a blind when scrolling */}
      <AnimatePresence mode="wait">
        {!scrolled && (
          <motion.div
            key="burgundy-header"
            variants={blindVariants}
            initial="visible"
            animate="visible"
            exit="hidden"
            className="fixed top-0 left-0 right-0 z-50 bg-red-900/95 backdrop-blur-md shadow-xl"
            style={{
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.nav
              className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo */}
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5 group">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative w-10 h-10 overflow-hidden rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src="/images/logo-minimal.jpg"
                        alt="Midnight Magnolia"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                    <div>
                      <div className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</div>
                      <div className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:gap-x-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="font-lora text-sm text-magnolia-white hover:text-gold transition-colors duration-300 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex flex-1 justify-end items-center gap-4">
                {/* Theme toggle */}
                {mounted && (
                  <motion.button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full p-2 bg-black/20 text-magnolia-white hover:bg-gold/20 hover:text-gold transition-colors duration-300"
                    aria-label="Toggle theme"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  </motion.button>
                )}

                {/* CTA Button */}
                <motion.button
                  className="hidden sm:block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg text-sm"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(163, 177, 138, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enter Garden
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden rounded-full p-2 bg-black/20 text-magnolia-white hover:bg-gold/20 hover:text-gold transition-colors duration-300"
                  aria-label="Toggle menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </motion.button>
              </div>
            </motion.nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.4,
                  }}
                  className="lg:hidden bg-red-900/95 border-t border-black/20"
                >
                  <div className="px-6 py-4 space-y-4">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block font-lora text-magnolia-white hover:text-sage-green transition-colors duration-300 py-2"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.button
                      className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enter Garden
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transparent header that appears when scrolled */}
      <AnimatePresence mode="wait">
        {scrolled && (
          <motion.header
            key="transparent-header"
            variants={transparentHeaderVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 z-40 w-full"
          >
            <motion.nav
              className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(8px)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo */}
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5 group">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="relative w-8 h-8 overflow-hidden rounded-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image
                        src="/images/logo-minimal.jpg"
                        alt="Midnight Magnolia"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                    <div>
                      <div className="font-playfair text-lg font-bold text-magnolia-white drop-shadow-lg">
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
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="font-lora text-sm text-magnolia-white hover:text-gold transition-colors duration-300 relative group drop-shadow-md"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-green transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex flex-1 justify-end items-center gap-4">
                {/* Theme toggle */}
                {mounted && (
                  <motion.button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full p-2 bg-black/30 text-magnolia-white hover:bg-gold/30 hover:text-gold transition-colors duration-300 backdrop-blur-sm"
                    aria-label="Toggle theme"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  </motion.button>
                )}

                {/* CTA Button */}
                <motion.button
                  className="hidden sm:block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-2 rounded-full transition-all duration-300 text-sm shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(163, 177, 138, 0.4)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Enter Garden
                </motion.button>

                {/* Mobile menu button */}
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden rounded-full p-2 bg-black/30 text-magnolia-white hover:bg-gold/30 hover:text-gold transition-colors duration-300 backdrop-blur-sm"
                  aria-label="Toggle menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </motion.button>
              </div>
            </motion.nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  )
}
