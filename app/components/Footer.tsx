"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, Moon, Star } from "lucide-react"

const footerLinks = {
  sacred: [
    { name: "Sacred Tools", href: "/shop" },
    { name: "Digital Journals", href: "/shop?category=journals" },
    { name: "Healing Resources", href: "/blog" },
    { name: "Community", href: "/community" },
  ],
  support: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refunds" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-midnight-blue border-t border-sage-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center">
                <Moon size={16} className="text-midnight-blue" />
              </div>
              <span className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</span>
            </div>
            <p className="font-lora text-magnolia-white/70 text-sm leading-relaxed mb-4">
              A digital sanctuary for healing through Southern Gothic grace, ancestral wisdom, and gentle productivity.
            </p>
            <div className="flex items-center space-x-2 text-magnolia-white/60">
              <Heart size={14} className="fill-sage-green text-sage-green" />
              <span className="font-lora text-xs">Made with love for healing souls</span>
            </div>
          </div>

          {/* Sacred Offerings */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Sacred Offerings</h3>
            <ul className="space-y-2">
              {footerLinks.sacred.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sage-green/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="font-lora text-magnolia-white/60 text-sm">© 2024 Midnight Magnolia. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Star size={16} className="text-sage-green" />
              </motion.div>
              <span className="font-lora text-magnolia-white/60 text-xs">Blessed with ancestral wisdom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
