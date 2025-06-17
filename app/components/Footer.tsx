import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Justice", href: "/justice" },
    { name: "Portfolio", href: "/portfolio" },
  ]

  return (
    <footer className="bg-midnight-blue-darker text-warm-gray border-t border-warm-gray/20 mt-24 relative z-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
          {footerLinks.map((link) => (
            <div key={link.name} className="px-5 py-2">
              <Link
                href={link.href}
                className="text-base text-warm-gray hover:text-magnolia-white transition-colors font-lora"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-base text-warm-gray/80 font-montserrat flex items-center justify-center gap-2">
          Crafted with <Heart className="w-4 h-4 text-sage-green" /> in the digital twilight.
        </p>
        <p className="mt-2 text-center text-sm text-warm-gray/60 font-montserrat">
          &copy; {new Date().getFullYear()} Midnight Magnolia. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
