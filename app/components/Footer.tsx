"use client"

import Link from "next/link"
import { Heart, Mail, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-midnight-blue text-magnolia-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-playfair text-2xl font-bold">
                Midnight <span className="text-gold">Magnolia</span>
              </span>
            </Link>
            <p className="font-lora text-magnolia-white/80 mb-4 max-w-md">
              A digital sanctuary where ancestral wisdom meets Southern Gothic grace. Transform your healing journey
              through sacred tools and gentle productivity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-magnolia-white/60 hover:text-sage-green transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-magnolia-white/60 hover:text-sage-green transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-magnolia-white/60 hover:text-sage-green transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4">Sacred Paths</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Sacred Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Wisdom Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Connect
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4">Sacred Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-lora text-magnolia-white/80 hover:text-sage-green transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-green/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-lora text-magnolia-white/60 text-sm">
            © 2024 Midnight Magnolia. Made with <Heart className="inline h-4 w-4 text-sage-green" /> for healing souls.
          </p>
          <p className="font-lora text-magnolia-white/60 text-sm mt-2 md:mt-0">
            Your journey is sacred. Your pace is perfect.
          </p>
        </div>
      </div>
    </footer>
  )
}
