"use client"
import Image from "next/image"

const Header = () => {
  return (
    <header className="bg-sage-green py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <a href="/">
            <Image src="/logo.svg" alt="Magnolia Sacred Logo" width={150} height={50} />
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-magnolia-white hover:text-sage-green transition-colors duration-300 font-lora"
          >
            Home
          </button>
          <button
            onClick={() => (window.location.href = "/about")}
            className="text-magnolia-white hover:text-sage-green transition-colors duration-300 font-lora"
          >
            About
          </button>
          <button
            onClick={() => (window.location.href = "/shop/complete")}
            className="text-magnolia-white hover:text-sage-green transition-colors duration-300 font-lora"
          >
            Sacred Collection
          </button>
          <button
            onClick={() => (window.location.href = "/blog")}
            className="text-magnolia-white hover:text-sage-green transition-colors duration-300 font-lora"
          >
            Blog
          </button>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="text-magnolia-white hover:text-sage-green transition-colors duration-300 font-lora"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu (Placeholder) */}
        <div className="md:hidden">
          {/* Add mobile menu icon/button here */}
          {/* Example: */}
          <button className="text-magnolia-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
