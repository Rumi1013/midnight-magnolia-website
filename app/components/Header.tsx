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
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Menagerie", href: "/midnight-menagerie" },
    { name: "Print Books", href: "/print-books" },
    { name: "Genealogy", href: "/genealogy" },
    { name: "Our Story", href: "/about" },
    { name: "Musings", href: "/blog" },
    { name: "Justice", href: "/justice" },
    { name: "Contact", href: "/contact" },
  ]

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.5 } },
  }

  const navItemVariants = {
    hover: { color: "#D4AF37" /* rich-gold */, scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? "bg-midnight-blue/90 backdrop-blur-md shadow-xl" : "bg-midnight-blue/80 backdrop-blur-sm shadow-lg"}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <div className="flex items-center gap-3">
              <motion.div
                className="relative w-10 h-10 overflow-hidden rounded-full"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Image
                  src="/images/logo-minimal.jpg"
                  alt="Midnight Magnolia Logo"
                  fill
                  sizes="40px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  priority // Prioritize logo loading
                />
              </motion.div>
              <div>
                {/* The title in the logo area remains gold as per your previous request */}
                <div className="font-playfair text-xl font-bold text-rich-gold">Midnight Magnolia</div>
                <div className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-5 xl:gap-x-6">
          {navigation.map((item) => (
            <motion.div
              key={item.name}
              whileHover="hover"
              whileTap="tap"
              variants={{}} // Empty variants to allow children to animate
            >
              <Link
                href={item.href}
                className="font-lora text-sm text-magnolia-white transition-colors duration-300 relative group"
              >
                <motion.span variants={navItemVariants}>{item.name}</motion.span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rich-gold transition-all duration-300"
                  variants={{ hover: { width: "100%" }, initial: { width: "0%" } }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-1 justify-end items-center gap-3">
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-magnolia-white hover:bg-rich-gold/20 hover:text-rich-gold transition-colors duration-300"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </motion.button>
          )}
          <Link href="/contact">
            {" "}
            {/* Example: Direct link to contact or a "Get Started" page */}
            <motion.button
              className="hidden sm:block bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-5 py-2 rounded-full transition-all duration-300 text-sm shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -1, boxShadow: "0 8px 15px rgba(163, 177, 138, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Enter Garden
            </motion.button>
          </Link>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden rounded-full p-2 text-magnolia-white hover:bg-rich-gold/20 hover:text-rich-gold transition-colors duration-300"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-midnight-blue/95 border-t border-rich-gold/20"
          >
            <div className="px-5 py-4 space-y-3">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-lora text-magnolia-white hover:text-rich-gold transition-colors duration-300 py-2 text-base"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.05, duration: 0.3 }}
              >
                <Link href="/contact" className="w-full">
                  <button
                    className="w-full bg-sage-green hover:bg-sage-green/90 text-midnight-blue font-montserrat font-semibold px-6 py-3 rounded-full transition-all duration-300 mt-3 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Enter Garden
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
