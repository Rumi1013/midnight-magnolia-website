import type React from "react"
import ThemeToggle from "./ThemeToggle"
import CartIcon from "./CartIcon"

interface HeaderProps {
  ctaText: string
  ctaLink: string
}

const Header: React.FC<HeaderProps> = ({ ctaText, ctaLink }) => {
  return (
    <header className="bg-white dark:bg-gray-800 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          My Store
        </a>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartIcon />
          <a
            href={ctaLink}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
