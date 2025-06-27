"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-midnight-blue border-t border-sage-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image src="/images/logo-minimal.jpg" alt="Midnight Magnolia" fill className="object-cover" />
              </div>
              <div>
                <div className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</div>
                <div className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</div>
              </div>
            </Link>

            <p className="font-lora text-magnolia-white/80 leading-relaxed mb-6 max-w-md">
              Where ancestral wisdom meets Southern Gothic grace. Your digital sanctuary for healing, transformation,
              and gentle productivity.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-magnolia-white/60">
                <Heart size={16} className="text-sage-green" />
                <span className="font-montserrat text-sm">Made with love in the South</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Sacred Paths</h3>
            <ul className="space-y-3">
              {[
                { name: "Sacred Tools", href: "/shop" },
                { name: "Midnight Musings", href: "/blog" },
                { name: "Our Story", href: "/about" },
                { name: "Justice & Healing", href: "/justice" },
                { name: "Community", href: "/community" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-magnolia-white/70 text-sm">
                <Mail size={14} className="text-sage-green" />
                <span className="font-montserrat">hello@midnightmagnolia.com</span>
              </li>
              <li className="flex items-center gap-2 text-magnolia-white/70 text-sm">
                <MapPin size={14} className="text-sage-green" />
                <span className="font-montserrat">Southern United States</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-montserrat text-sm font-semibold text-magnolia-white mb-3">Join Our Sacred Circle</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email..."
                  className="flex-1 px-3 py-2 bg-magnolia-white/10 border border-sage-green/30 rounded-full text-magnolia-white placeholder-magnolia-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-sage-green"
                />
                <button className="bg-sage-green hover:bg-sage-green/90 text-midnight-blue px-4 py-2 rounded-full font-montserrat font-semibold text-sm transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-sage-green/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-magnolia-white/60 font-montserrat text-sm">
              © {currentYear} Midnight Magnolia. All rights reserved. Made with sacred intention.
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-magnolia-white/60 hover:text-sage-green font-montserrat text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-magnolia-white/60 hover:text-sage-green font-montserrat text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
