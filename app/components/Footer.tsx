import Link from "next/link"
import { Heart, Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: "Instagram", href: "https://instagram.com", icon: Instagram, ariaLabel: "Midnight Magnolia on Instagram" },
    { name: "Facebook", href: "https://facebook.com", icon: Facebook, ariaLabel: "Midnight Magnolia on Facebook" },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter, ariaLabel: "Midnight Magnolia on Twitter" },
    // { name: 'YouTube', href: '#', icon: Youtube, ariaLabel: "Midnight Magnolia on YouTube" }, // Assuming YouTube might not be primary
  ]

  const footerNavLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Accessibility", href: "/accessibility-statement" },
    { name: "Contact Us", href: "/contact" },
  ]

  const exploreLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our Story", href: "/about" },
    { name: "Musings (Blog)", href: "/blog" },
    { name: "Justice & Healing", href: "/justice" },
  ]

  return (
    <footer className="bg-midnight-blue/90 backdrop-blur-sm text-magnolia-white border-t border-warm-gray/20 pt-16 pb-8 px-6 font-lora">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/logo-minimal.jpg" // Ensure this path is correct
                    alt="Midnight Magnolia Logo"
                    fill
                    className="rounded-full object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl text-gold group-hover:text-sage-green transition-colors">
                    Midnight Magnolia
                  </h3>
                  <p className="font-montserrat text-xs text-sage-green tracking-wider">DIGITAL SANCTUARY</p>
                </div>
              </div>
            </Link>
            <p className="text-sm text-warm-gray leading-relaxed">
              Healing through Southern Gothic grace. Ancestral wisdom for modern souls with chronic illness & ADHD.
            </p>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <h4 className="font-playfair text-lg text-magnolia-white mb-4">Explore Our Garden</h4>
            <ul className="space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-sage-green transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Social */}
          <div>
            <h4 className="font-playfair text-lg text-magnolia-white mb-4">Stay Connected</h4>
            <ul className="space-y-2 text-sm mb-6">
              {footerNavLinks.slice(0, 2).map(
                (
                  link, // Show first 2 quick links
                ) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-warm-gray hover:text-sage-green transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <h4 className="font-playfair text-lg text-magnolia-white mb-3">Follow Our Journey</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-gray hover:text-gold transition-colors duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter Placeholder */}
          <div>
            <h4 className="font-playfair text-lg text-magnolia-white mb-4">Receive Healing Words</h4>
            <p className="text-sm text-warm-gray mb-3">
              Join our newsletter for gentle guidance, new offerings, and moon-phase wisdom.
            </p>
            {/* This form is a placeholder. Actual implementation would need a Client Component for interactivity and submission. */}
            <form action="#" method="POST" className="flex">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="footer-email"
                id="footer-email"
                placeholder="Your email sanctuary"
                required
                className="bg-midnight-blue/50 border border-warm-gray/30 text-magnolia-white px-3 py-2.5 rounded-l-md focus:ring-2 focus:ring-gold focus:border-gold text-sm w-full placeholder:text-warm-gray/70"
              />
              <button
                type="submit"
                className="bg-sage-green text-midnight-blue px-4 py-2.5 rounded-r-md hover:bg-sage-green/90 transition-colors text-sm font-montserrat font-semibold"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-warm-gray/60 mt-2">We honor your privacy. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="border-t border-warm-gray/20 pt-8 mt-8 text-center">
          <div className="flex justify-center items-center space-x-4 mb-3">
            {footerNavLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-warm-gray hover:text-magnolia-white transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <p className="text-xs text-warm-gray">
            &copy; {currentYear} Midnight Magnolia. Crafted with{" "}
            <Heart className="inline h-3 w-3 text-gold fill-current" /> in the heart of the South. All rights reserved.
          </p>
          <p className="text-xs text-warm-gray/70 mt-2">
            This digital sanctuary is for informational and inspirational purposes only and does not constitute medical
            advice. Please consult with a qualified healthcare professional for any health concerns.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
