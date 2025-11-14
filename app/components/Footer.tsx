import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-midnight-blue border-t border-magnolia-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/magnolia-logo.png"
                  alt="Midnight Magnolia"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-playfair text-2xl font-bold text-magnolia-white">Midnight Magnolia</div>
                <div className="font-montserrat text-sm text-sage-green tracking-wider">
                  DIGITAL SANCTUARY FOR HEALING
                </div>
              </div>
            </div>
            <p className="font-lora text-magnolia-white/70 leading-relaxed max-w-md">
              Where ancestral wisdom meets Southern Gothic grace. Your journey of healing through gentle productivity
              and sacred rituals begins here.
            </p>
            <div className="flex gap-4 mt-6">
              {["🌙", "✨", "🌱", "🕯️"].map((emoji, index) => (
                <div key={index} className="text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Sacred Tools */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Sacred Tools</h3>
            <ul className="space-y-3">
              {[
                { name: "The Magnolia Reset", href: "/shop" },
                { name: "Midnight Messages", href: "/blog" },
                { name: "Sacred Productivity", href: "/shop" },
                { name: "Healing Journals", href: "/shop" },
                { name: "Ritual Guides", href: "/shop" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-magnolia-white mb-4">Community</h3>
            <ul className="space-y-3">
              {[
                { name: "Our Story", href: "/about" },
                { name: "Healing Circle", href: "/community" },
                { name: "Testimonials", href: "/about" },
                { name: "Support", href: "/contact" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-lora text-magnolia-white/70 hover:text-sage-green transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-magnolia-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-lora text-magnolia-white/60 text-sm">
            © 2024 Midnight Magnolia. Crafted with love and intention. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
              Privacy
            </Link>
            <Link href="#" className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
              Terms
            </Link>
            <Link href="#" className="font-lora text-magnolia-white/60 hover:text-sage-green transition-colors text-sm">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
