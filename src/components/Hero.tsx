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
          <div className="hero-text animate-fade-in">
            <h1 className="text-display hero-title">
              <span className="animate-glow">🌸</span> Midnight Magnolia
            </h1>
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
          </div>
          
          <div className="hero-actions animate-slide-up">
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('services')}
            >
              <span>Explore Services</span>
              <span>🌙</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('about')}
            >
              <span>Our Story</span>
              <span>✨</span>
            </button>
          </div>
          
          <div className="hero-features">
            <div className="feature-grid grid grid-3 gap-lg">
              <div className="feature-card card">
                <div className="feature-icon">🕸️</div>
                <h3 className="text-h3">Web Sanctuaries</h3>
                <p className="text-caption">Digital spaces that feel like coming home</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">🤖</div>
                <h3 className="text-h3">Gentle Automation</h3>
                <p className="text-caption">Workflows that breathe with your rhythm</p>
              </div>
              <div className="feature-card card">
                <div className="feature-icon">🎨</div>
                <h3 className="text-h3">Sacred Design</h3>
                <p className="text-caption">Visuals that carry meaning and intention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            var(--bg-primary) 0%,
            var(--bg-secondary) 50%,
            var(--midnight-mist) 100%
          );
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(123, 160, 91, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(200, 181, 219, 0.04) 0%, transparent 50%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/gallery/stars-glyph.png') repeat;
          background-size: 200px 200px;
          opacity: 0.1;
          z-index: 0;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-title {
          margin-bottom: var(--space-lg);
          color: var(--text-primary);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .hero-subtitle {
          margin-bottom: var(--space-md);
          color: var(--text-secondary);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-description {
          margin-bottom: var(--space-2xl);
          color: var(--text-muted);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-actions {
          margin-bottom: var(--space-3xl);
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .hero-features {
          margin-top: var(--space-3xl);
        }
        
        .feature-card {
          text-align: center;
          transition: all var(--transition-normal);
        }
        
        .feature-card:hover {
          transform: translateY(-4px);
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
        }
      `}</style>
    </section>
  )
}

export default Hero 