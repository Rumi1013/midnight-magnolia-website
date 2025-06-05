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
          {/* Multiple Background Images for Visual Richness */}
          <div className="hero-visual-bg">
            <img 
              src="/images/gallery/southern-gothic-mansion-night.png" 
              alt="Southern Gothic mansion with mystical atmosphere"
              className="hero-bg-image hero-bg-primary"
            />
            <img 
              src="/images/gallery/southern-gothic-1.jpeg" 
              alt="Gothic architecture detail"
              className="hero-bg-image hero-bg-secondary"
            />
            <div className="hero-overlay"></div>
          </div>

          {/* Decorative Background Elements */}
          <div className="floating-element" style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            opacity: 0.1,
            zIndex: 1
          }}>
            <img src="/images/logos/goldenFinal22_MM_25.png" alt="" style={{ width: '120px', height: '120px' }} />
          </div>
          
          <div className="floating-element" style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            opacity: 0.08,
            zIndex: 1
          }}>
            <img src="/images/logos/ClearFinal7_MM_25.jpeg" alt="" style={{ width: '100px', height: '100px' }} />
          </div>

          {/* Main Content */}
          <div className="hero-content animate-fade-in" style={{ 
            position: 'relative', 
            zIndex: 3,
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Hero Header with Premium Logo */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-lg)'
            }}>
              <img 
                src="/images/logos/goldenFinal22_MM_25.png" 
                alt="Midnight Magnolia Premium"
                style={{ 
                  width: '60px', 
                  height: '60px',
                  filter: 'drop-shadow(0 0 12px var(--accent-primary))'
                }}
              />
              <h1 className="hero-title text-h1">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  Midnight Magnolia
                  <img 
                    src="/images/logos/ClearFinal7_MM_25.jpeg" 
                    alt="Magnolia Bloom"
                    style={{ 
                      width: '45px', 
                      height: '45px',
                      opacity: 0.9,
                      filter: 'brightness(1.2)'
                    }}
                  />
                </div>
              </h1>
              <img 
                src="/images/logos/goldenFinal22_MM_25.png" 
                alt="Midnight Magnolia Premium"
                style={{ 
                  width: '60px', 
                  height: '60px',
                  filter: 'drop-shadow(0 0 12px var(--accent-primary))'
                }}
              />
            </div>

            <p className="text-body-lg hero-subtitle">
              Where Southern Gothic meets digital mysticism. A sanctuary for community care, 
              healing technology, and transformative digital experiences.
            </p>
            
            <div className="hero-description">
              <p className="text-body">
                Rooted in mystery, blooming through code, ritual, and resilience. 
                We create technology services that center healing in digital spaces.
              </p>
            </div>
            
            <div className="hero-actions animate-slide-up">
              <button 
                className="btn btn-accent"
                onClick={() => onNavigate('justice-resources')}
                aria-label="Explore Justice Resources"
              >
                <span>Justice Resources</span>
                <span>⚖️</span>
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('shop')}
                aria-label="Shop Digital Products"
              >
                <span>Shop</span>
                <span>🛍️</span>
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onNavigate('about')}
                aria-label="Our Story"
              >
                <span>Our Story</span>
                <span>✨</span>
              </button>
            </div>

            {/* Revenue Streams - Prominent Display */}
            <div className="revenue-streams animate-slide-up">
              <p className="revenue-intro text-body">Support our work & get digital goodies:</p>
              <div className="revenue-buttons">
                <a 
                  href="https://midnightmagnolia.myshopify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary revenue-btn"
                >
                  <span>🛒</span>
                  <span>Shopify Store</span>
                </a>
                <a 
                  href="https://www.etsy.com/shop/MidnightMagnoliaShop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary revenue-btn"
                >
                  <span>🎨</span>
                  <span>Etsy Shop</span>
                </a>
                <a 
                  href="https://www.patreon.com/midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-accent revenue-btn"
                >
                  <span>💚</span>
                  <span>Patreon</span>
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Cards with Visual Elements */}
          <div className="hero-features">
            <div className="feature-grid grid grid-3 gap-lg">
              <div className="feature-card card card-marigold" onClick={() => onNavigate('justice-resources')}>
                <div className="feature-image">
                  <img src="/images/gallery/mystical-logo.png" alt="Justice resources" className="feature-bg" />
                </div>
                <div className="feature-content">
                  <div className="feature-icon">⚖️</div>
                  <h3 className="text-h3">Justice Resources</h3>
                  <p className="text-caption">Soros Fellowship legacy - free legal aid tools</p>
                </div>
              </div>
              
              <div className="feature-card card card-spirit" onClick={() => onNavigate('services')}>
                <div className="feature-image">
                  <img src="/images/gallery/gothic-digital-planner.png" alt="Digital services" className="feature-bg" />
                </div>
                <div className="feature-content">
                  <div className="feature-icon">🕸️</div>
                  <h3 className="text-h3">Web Sanctuaries</h3>
                  <p className="text-caption">Digital spaces that feel like coming home</p>
                </div>
              </div>
              
              <div className="feature-card card" onClick={() => onNavigate('trauma-ai')}>
                <div className="feature-image">
                  <img src="/images/gallery/personal-photo-2.jpg" alt="Trauma-informed design" className="feature-bg" />
                </div>
                <div className="feature-content">
                  <div className="feature-icon">🧠</div>
                  <h3 className="text-h3">Trauma-Informed AI</h3>
                  <p className="text-caption">Intelligence systems that prioritize healing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          background: var(--bg-fiesta);
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(255, 140, 0, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(106, 76, 147, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 107, 157, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(67, 97, 238, 0.05) 0%, transparent 50%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-visual-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -2;
        }

        .hero-bg-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-bg-primary {
          opacity: 0.15;
          filter: sepia(20%) hue-rotate(35deg) saturate(1.2);
          z-index: -2;
        }

        .hero-bg-secondary {
          opacity: 0.08;
          filter: sepia(40%) hue-rotate(45deg) saturate(1.5);
          z-index: -3;
          transform: scale(1.1);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(26, 35, 50, 0.85) 0%,
            rgba(10, 25, 41, 0.9) 50%,
            rgba(30, 40, 52, 0.85) 100%
          );
          z-index: -1;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .hero-title {
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .hero-subtitle {
          margin-bottom: var(--space-md);
          color: var(--text-secondary);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          margin-bottom: var(--space-2xl);
          color: var(--text-muted);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-actions {
          margin-bottom: var(--space-xl);
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-features {
          margin-top: var(--space-3xl);
        }

        .feature-grid {
          position: relative;
          z-index: 2;
        }
        
        .feature-card {
          text-align: center;
          transition: all var(--transition-normal);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: rgba(42, 52, 65, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(244, 208, 63, 0.2);
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-glow);
          border-color: var(--accent-primary);
        }

        .feature-image {
          position: absolute;
          top: -20px;
          right: -20px;
          opacity: 0.1;
          transition: all var(--transition-normal);
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: var(--radius-md);
        }

        .feature-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0) invert(1);
        }

        .feature-card:hover .feature-image {
          opacity: 0.2;
          transform: scale(1.1);
        }

        .feature-content {
          position: relative;
          z-index: 2;
          padding: var(--space-md);
        }
        
        .feature-icon {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-sm);
          display: block;
        }
        
        .feature-card h3 {
          margin-bottom: var(--space-xs);
          color: var(--accent-primary);
        }
        
        .feature-card p {
          color: var(--text-muted);
        }

        .hero-decorative {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .floating-elements {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .floating-element {
          position: absolute;
          width: 60px;
          height: 60px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
          filter: brightness(0) invert(1) sepia(1) hue-rotate(35deg) saturate(2);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.6;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: var(--space-2xl) 0;
            min-height: 80vh;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: center;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }

          .floating-element {
            width: 40px;
            height: 40px;
          }

          .hero-bg-image {
            opacity: 0.1;
          }

          .feature-image {
            width: 60px;
            height: 60px;
          }
        }

        .revenue-streams {
          margin-bottom: var(--space-3xl);
          text-align: center;
        }

        .revenue-intro {
          margin-bottom: var(--space-md);
          color: var(--text-secondary);
          font-weight: var(--weight-medium);
        }

        .revenue-buttons {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }

        .revenue-btn {
          min-width: 160px;
          font-weight: var(--weight-bold);
          transition: all var(--transition-normal);
          text-decoration: none;
        }

        .revenue-btn:hover {
          transform: translateY(-3px) scale(1.05);
        }

        .btn-accent {
          background: linear-gradient(135deg, var(--marigold-orange), var(--cempasuchil-gold));
          color: var(--pure-white);
          border: 2px solid var(--marigold-orange);
          box-shadow: var(--shadow-marigold);
        }

        .btn-accent:hover {
          background: linear-gradient(135deg, var(--cempasuchil-gold), var(--altar-candle));
          box-shadow: var(--shadow-candle);
          border-color: var(--cempasuchil-gold);
        }
      `}</style>
    </section>
  )
}

export default Hero 