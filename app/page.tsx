"use client"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-magnolia">
      {/* Hero Section */}
      <section className="section bg-midnight text-magnolia">
        <div className="container text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">Midnight Magnolia</h1>
          <p className="font-body text-xl md:text-2xl mb-8 text-lavender max-w-3xl mx-auto">
            Where ancestral wisdom blooms under midnight skies. A digital sanctuary for healing through Southern Gothic
            grace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary">Enter the Garden</button>
            <button className="btn btn-secondary">Explore Our Story</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-midnight mb-6">Sacred Healing Space</h2>
            <p className="font-body text-lg text-midnight max-w-2xl mx-auto">
              We create gentle sanctuaries for Black women, spoonies, and spiritual entrepreneurs seeking healing
              through ancestral wisdom.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="font-display text-2xl font-semibold mb-3 text-midnight">Gentle Productivity</h3>
              <p className="font-body text-midnight">
                Honor your energy cycles with tools designed for chronic illness and ADHD.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="font-display text-2xl font-semibold mb-3 text-midnight">Ancestral Wisdom</h3>
              <p className="font-body text-midnight">
                Connect with the healing traditions passed down through generations.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-display text-2xl font-semibold mb-3 text-midnight">Sacred Community</h3>
              <p className="font-body text-midnight">
                Join a supportive circle of healers, creators, and spiritual entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section bg-midnight text-magnolia">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Sacred Tools</h2>
            <p className="font-body text-lg text-lavender max-w-2xl mx-auto">
              Thoughtfully crafted resources for your healing journey.
            </p>
          </div>

          <div className="grid grid-2">
            <div className="card bg-midnight-indigo border-sage">
              <div className="h-48 bg-sage rounded-lg mb-6 flex items-center justify-center">
                <span className="text-midnight font-display text-2xl">📖</span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3 text-magnolia">The Magnolia Reset Journal</h3>
              <p className="font-body text-lavender mb-4">
                A 90-day guided journey through healing, rest, and gentle transformation.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-ui font-semibold text-lg">Coming Soon</span>
                <button className="btn btn-primary">Join Waitlist</button>
              </div>
            </div>

            <div className="card bg-midnight-indigo border-sage">
              <div className="h-48 bg-lavender-mist rounded-lg mb-6 flex items-center justify-center">
                <span className="text-midnight font-display text-2xl">🌙</span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3 text-magnolia">Moon Cycle Planner</h3>
              <p className="font-body text-lavender mb-4">
                Align your productivity with lunar wisdom and natural rhythms.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-ui font-semibold text-lg">Coming Soon</span>
                <button className="btn btn-primary">Join Waitlist</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-midnight mb-6">Sacred Shop</h2>
            <p className="font-body text-lg text-midnight max-w-2xl mx-auto">
              Curated tools and treasures for your healing altar.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <div className="h-48 bg-sage rounded-lg mb-4 flex items-center justify-center">
                <span className="text-midnight font-display text-2xl">☕</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-midnight">Midnight Moon Mug</h3>
              <p className="font-body text-sm text-midnight mb-3">
                Sip your morning ritual from this celestial vessel.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-ui font-semibold">$24</span>
                <button className="btn btn-primary text-sm px-4 py-2">Add to Altar</button>
              </div>
            </div>

            <div className="card">
              <div className="h-48 bg-lavender-mist rounded-lg mb-4 flex items-center justify-center">
                <span className="text-midnight font-display text-2xl">👜</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-midnight">Magnolia Tote</h3>
              <p className="font-body text-sm text-midnight mb-3">Carry your sacred tools in Southern Gothic style.</p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-ui font-semibold">$32</span>
                <button className="btn btn-primary text-sm px-4 py-2">Add to Altar</button>
              </div>
            </div>

            <div className="card">
              <div className="h-48 bg-petal-blush rounded-lg mb-4 flex items-center justify-center">
                <span className="text-midnight font-display text-2xl">🕯️</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-midnight">Healing Ritual Candle</h3>
              <p className="font-body text-sm text-midnight mb-3">Hand-poured with intention and sacred herbs.</p>
              <div className="flex justify-between items-center">
                <span className="text-gold font-ui font-semibold">$28</span>
                <button className="btn btn-primary text-sm px-4 py-2">Add to Altar</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section bg-midnight text-magnolia">
        <div className="container">
          <div className="text-center">
            <h3 className="font-display text-3xl font-bold mb-4">Midnight Magnolia</h3>
            <p className="font-body text-lavender mb-6">Rooted in mystery, blooming in truth</p>
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-magnolia hover:text-gold transition-colors">
                Instagram
              </a>
              <a href="#" className="text-magnolia hover:text-gold transition-colors">
                Newsletter
              </a>
              <a href="#" className="text-magnolia hover:text-gold transition-colors">
                Contact
              </a>
            </div>
            <p className="font-ui text-sm text-lavender">© 2024 Midnight Magnolia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
