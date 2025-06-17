import Link from "next/link"

export default function Header() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Community", href: "/community" },
    { name: "Menagerie", href: "/midnight-menagerie" },
    { name: "Print Books", href: "/print-books" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Genealogy", href: "/genealogy" },
  ]

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          My Website
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-gray-500">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
