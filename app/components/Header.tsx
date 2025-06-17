import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-midnight-blue py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-playfair text-xl font-bold text-rich-gold">Midnight Magnolia</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/about" className="text-magnolia-white hover:text-rich-gold">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-magnolia-white hover:text-rich-gold">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-magnolia-white hover:text-rich-gold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
