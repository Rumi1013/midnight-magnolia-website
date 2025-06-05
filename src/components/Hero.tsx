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
          {/* Background Images */}
          <div className="hero-visual-bg">
            <img 
              src="/images/gallery/personal-photo-1.jpg" 
              alt="Southern Gothic mansion at night"
              className="hero-bg-image"
            />
            <div className="hero-overlay"></div>
          </div>

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
              className="btn btn-fiesta"
              onClick={() => onNavigate('justice-resources')}
            >
              <span>Justice Resources</span>
              <span>⚖️</span>
            </button>
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

          {/* Additional Visual Elements */}
          <div className="hero-decorative">
            <div className="floating-elements">
              <div className="floating-element" style={{ 
                backgroundImage: 'url(/images/gallery/black-candle-gold-label.png)',
                left: '10%', 
                top: '20%',
                animationDelay: '0s'
              }}></div>
              <div className="floating-element" style={{ 
                backgroundImage: 'url(/images/gallery/stars-glyph.png)',
                right: '15%', 
                top: '30%',
                animationDelay: '2s'
              }}></div>
              <div className="floating-element" style={{ 
                backgroundImage: 'url(/images/gallery/magnolia-flower.png)',
                left: '20%', 
                bottom: '25%',
                animationDelay: '4s'
              }}></div>
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
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.1;
          filter: sepia(20%) hue-rotate(35deg) saturate(1.2);
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(26, 35, 50, 0.9) 0%,
            rgba(10, 25, 41, 0.95) 50%,
            rgba(30, 40, 52, 0.9) 100%
          );
          z-index: -1;
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
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .hero-subtitle {
          margin-bottom: var(--space-md);
          color: var(--text-secondary);
          max-width: 600px;
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
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: rgba(42, 52, 65, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(244, 208, 63, 0.2);
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
        }

        .feature-symbol {
          width: 60px;
          height: 60px;
          filter: brightness(0) invert(1);
        }

        .feature-card:hover .feature-image {
          opacity: 0.2;
          transform: scale(1.1);
        }
        
        .feature-icon {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-sm);
          display: block;
          position: relative;
          z-index: 2;
        }
        
        .feature-card h3 {
          margin-bottom: var(--space-xs);
          color: var(--accent-primary);
          position: relative;
          z-index: 2;
        }
        
        .feature-card p {
          color: var(--text-muted);
          position: relative;
          z-index: 2;
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
          width: 40px;
          height: 40px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
          filter: brightness(0) invert(1) sepia(1) hue-rotate(35deg) saturate(2);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
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
            display: none;
          }

          .hero-bg-image {
            opacity: 0.1;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero 