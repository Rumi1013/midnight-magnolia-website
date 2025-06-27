import Link from "next/link"
import { Heart, Moon, Star } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-midnight-blue border-t border-magnolia-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-midnight-blue font-bold text-sm">MM</span>
              </div>
              <span className="font-playfair text-xl font-bold text-magnolia-white">Midnight Magnolia</span>
            </div>
            <p className="font-lora text-magnolia-white/80 mb-4 max-w-md">
              A digital sanctuary where ancestral wisdom meets Southern Gothic grace. Your healing journey begins here,
              beautiful soul.
            </p>
            <div className="flex items-center space-x-4">
              <Moon className="w-5 h-5 text-gold" />
              <Star className="w-5 h-5 text-sage-green" />
              <Heart className="w-5 h-5 text-warm-gray" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Sacred Paths</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Sacred Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Healing Words
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Connect
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Sacred Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Gentle Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Sacred Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-montserrat text-magnolia-white/80 hover:text-sage-green transition-colors"
                >
                  Sacred Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-magnolia-white/10 mt-8 pt-8 text-center">
          <p className="font-lora text-magnolia-white/60">
            © 2024 Midnight Magnolia. Crafted with sacred intention and boundless love.
          </p>
        </div>
      </div>
    </footer>
  )
}
