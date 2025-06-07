import React from 'react'
import '../styles/design-system.css'

interface HeroProps {
  onNavigate: (section: string) => void
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* Clean, focused hero content */}
          <div className="hero-main animate-fade-in">
            
            {/* Hero Header - Clean and Compelling */}
            <div className="hero-header">
              <h1 className="hero-title text-display hero-title-container">
                <img 
                  src="/images/logos/Midnight_MagnoliaJune-16.jpg" 
                  alt="Midnight Magnolia"
                  className="hero-title-logo"
                />
                Midnight Magnolia
              </h1>
              <p className="hero-tagline text-h2">
                A Southern Gothic Digital Sanctuary
              </p>
              <p className="hero-subtitle text-body-lg">
                Where trauma-informed AI meets community justice work. 
                Creating healing-centered technology for liberation.
              </p>
            </div>

            {/* Featured Products Grid - Visual Showcase */}
            <div className="featured-products">
              <h2 className="text-h2 hero-products-title">
                ✨ Digital Products & Services
              </h2>
              
              <div className="products-grid">
                {/* Justice Resources */}
                <div className="product-showcase card" onClick={() => onNavigate('justice-resources')}>
                  <div className="product-visual">
                    <img 
                      src="/images/professional/justice-resources-hero.svg" 
                      alt="Justice Resources"
                      className="product-background-image"
                    />
                    <div className="product-overlay">
                      <div className="product-icon">⚖️</div>
                      <div className="product-badge">FREE</div>
                    </div>
                  </div>
                  <h3 className="text-h3">Justice Resources</h3>
                  <p className="text-body">Soros Fellowship legacy: parole packages, arrest guides, expungement tools</p>
                  <button className="btn btn-primary">Explore Resources</button>
                </div>

                {/* AI Document Generator */}
                <div className="product-showcase card" onClick={() => onNavigate('trauma-ai')}>
                  <div className="product-visual">
                    <img 
                      src="/images/professional/ai-generator-hero.svg" 
                      alt="AI Document Generator"
                      className="product-background-image"
                    />
                    <div className="product-overlay">
                      <div className="product-icon">🤖</div>
                      <div className="product-badge">NEW</div>
                    </div>
                  </div>
                  <h3 className="text-h3">AI Civil Doc Generator</h3>
                  <p className="text-body">Trauma-informed AI that helps create legal documents with dignity</p>
                  <button className="btn btn-primary">Try Generator</button>
                </div>

                {/* Digital Archive */}
                <div className="product-showcase card" onClick={() => onNavigate('archive')}>
                  <div className="product-visual">
                    <img 
                      src="/images/professional/archive-hero.svg" 
                      alt="Digital Archive"
                      className="product-background-image"
                    />
                    <div className="product-overlay">
                      <div className="product-icon">📚</div>
                      <div className="product-badge">GROWING</div>
                    </div>
                  </div>
                  <h3 className="text-h3">Ancestral Archive</h3>
                  <p className="text-body">693 items documenting Southern Black heritage and spiritual journeys</p>
                  <button className="btn btn-primary">Explore Archive</button>
                </div>
              </div>
            </div>

            {/* Revenue Streams - Prominent */}
            <div className="revenue-showcase">
              <div className="revenue-header">
                <h2 className="text-h2">🛍️ Support Our Mission</h2>
                <p className="text-body">Get beautiful digital products while supporting community justice work</p>
              </div>
              
              <div className="revenue-grid grid grid-3 gap-md">
                <a 
                  href="https://midnightmagnolia.myshopify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="revenue-card card"
                >
                  <div className="revenue-icon">🛒</div>
                  <h3 className="text-h3">Shopify Store</h3>
                  <p className="text-caption">Tarot decks, journals, healing tools</p>
                </a>
                
                <a 
                  href="https://www.etsy.com/shop/MidnightMagnoliaShop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="revenue-card card"
                >
                  <div className="revenue-icon">🎨</div>
                  <h3 className="text-h3">Etsy Shop</h3>
                  <p className="text-caption">Printable art, vintage archives</p>
                </a>
                
                <a 
                  href="https://www.patreon.com/midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="revenue-card card"
                >
                  <div className="revenue-icon">💚</div>
                  <h3 className="text-h3">Patreon</h3>
                  <p className="text-caption">Monthly healing content & early access</p>
                </a>
              </div>
            </div>

            {/* Social Proof & CTA */}
            <div className="hero-cta">
              <div className="stats-row">
                <div className="stat">
                  <span className="stat-number text-h2">693</span>
                  <span className="stat-label text-caption">Archive Items</span>
                </div>
                <div className="stat">
                  <span className="stat-number text-h2">5</span>
                  <span className="stat-label text-caption">Justice Tools</span>
                </div>
                <div className="stat">
                  <span className="stat-number text-h2">∞</span>
                  <span className="stat-label text-caption">Healing Possibilities</span>
                </div>
              </div>
              
              <div className="cta-buttons">
                <button 
                  className="btn btn-accent btn-large"
                  onClick={() => onNavigate('services')}
                >
                  Start Your Digital Sanctuary 🌙
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => onNavigate('about')}
                >
                  Our Story ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 