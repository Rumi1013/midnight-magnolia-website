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
              <h1 className="hero-title text-display" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)' }}>
                <img 
                  src="/images/logos/midnight-magnolia-hero.svg" 
                  alt="Midnight Magnolia"
                  style={{ 
                    width: '60px', 
                    height: '60px',
                    filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3))'
                  }}
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
              <h2 className="text-h2" style={{ textAlign: 'center', marginBottom: 'var(--space-lg)', color: 'var(--accent-primary)' }}>
                ✨ Digital Products & Services
              </h2>
              
              <div className="products-grid grid grid-3 gap-lg">
                {/* Justice Resources */}
                <div className="product-showcase card" onClick={() => onNavigate('justice-resources')}>
                  <div className="product-visual">
                    <div className="product-icon">⚖️</div>
                    <div className="product-badge">FREE</div>
                  </div>
                  <h3 className="text-h3">Justice Resources</h3>
                  <p className="text-body">Soros Fellowship legacy: parole packages, arrest guides, expungement tools</p>
                  <button className="btn btn-primary">Explore Resources</button>
                </div>

                {/* AI Document Generator */}
                <div className="product-showcase card" onClick={() => onNavigate('trauma-ai')}>
                  <div className="product-visual">
                    <div className="product-icon">🤖</div>
                    <div className="product-badge">NEW</div>
                  </div>
                  <h3 className="text-h3">AI Civil Doc Generator</h3>
                  <p className="text-body">Trauma-informed AI that helps create legal documents with dignity</p>
                  <button className="btn btn-primary">Try Generator</button>
                </div>

                {/* Digital Archive */}
                <div className="product-showcase card" onClick={() => onNavigate('archive')}>
                  <div className="product-visual">
                    <div className="product-icon">📚</div>
                    <div className="product-badge">GROWING</div>
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

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: var(--space-3xl) 0;
          position: relative;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        }

        .hero-main {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-header {
          text-align: center;
          margin-bottom: var(--space-3xl);
        }

        .hero-title {
          margin-bottom: var(--space-md);
          color: var(--accent-primary);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-tagline {
          margin-bottom: var(--space-lg);
          color: var(--text-secondary);
          font-style: italic;
        }

        .hero-subtitle {
          max-width: 800px;
          margin: 0 auto var(--space-2xl);
          color: var(--text-primary);
          line-height: 1.6;
        }

        .featured-products {
          margin-bottom: var(--space-3xl);
        }

        .products-grid {
          margin-bottom: var(--space-2xl);
        }

        .product-showcase {
          text-align: center;
          padding: var(--space-xl);
          cursor: pointer;
          transition: all var(--transition-normal);
          border: 2px solid var(--border-primary);
        }

        .product-showcase:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-strong);
          border-color: var(--accent-primary);
        }

        .product-visual {
          position: relative;
          margin-bottom: var(--space-lg);
        }

        .product-icon {
          font-size: 3rem;
          margin-bottom: var(--space-sm);
        }

        .product-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-sm);
          font-size: var(--text-xs);
          font-weight: var(--weight-bold);
        }

        .revenue-showcase {
          margin-bottom: var(--space-3xl);
          text-align: center;
        }

        .revenue-header {
          margin-bottom: var(--space-xl);
        }

        .revenue-card {
          padding: var(--space-lg);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-normal);
          border: 2px solid var(--border-primary);
        }

        .revenue-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
          box-shadow: var(--shadow-md);
        }

        .revenue-icon {
          font-size: 2.5rem;
          margin-bottom: var(--space-md);
        }

        .hero-cta {
          text-align: center;
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: var(--space-xl);
          margin-bottom: var(--space-xl);
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          color: var(--accent-primary);
          font-weight: var(--weight-bold);
        }

        .stat-label {
          color: var(--text-muted);
        }

        .cta-buttons {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: var(--space-xl) 0;
          }
          
          .products-grid,
          .revenue-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-row {
            gap: var(--space-md);
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero 