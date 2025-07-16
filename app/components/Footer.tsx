export default function Footer() {
  return (
    <footer className="bg-midnight-indigo py-16">
      <div className="container">
        <div className="text-center">
          <h3 className="font-playfair text-3xl font-bold text-magnolia-white">Midnight Magnolia</h3>
          <p className="mt-4 font-playfair italic text-lavender-mist">Rooted in mystery, blooming in truth</p>

          <div className="mt-8 flex justify-center gap-8">
            <a
              href="#"
              className="font-montserrat text-magnolia-white transition-colors hover:text-gold focus:text-gold focus:outline-none"
            >
              Instagram
            </a>
            <a
              href="#"
              className="font-montserrat text-magnolia-white transition-colors hover:text-gold focus:text-gold focus:outline-none"
            >
              Newsletter
            </a>
            <a
              href="#"
              className="font-montserrat text-magnolia-white transition-colors hover:text-gold focus:text-gold focus:outline-none"
            >
              Contact
            </a>
          </div>

          <div className="mt-8 border-t border-magnolia-white/20 pt-8">
            <p className="font-montserrat text-sm text-lavender-mist">© 2024 Midnight Magnolia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
