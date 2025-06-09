import React, { useState, useRef, useEffect } from 'react'
import './styles/design-system.css'
import './theme-light.css'
import './App.css'
import { validateEnvironment, initializeAnalytics } from './lib/integrations'

// Import organized components using clean architecture
import {
  // Layout Components
  Navigation,
  SkipNavigation,
  
  // Hero Components  
  EnhancedHero,
  
  // Organized Component Groups
  DigitalProducts,
  Services,
  Community,
  SpiritualResources,
  
  // Individual Components
  Dashboard,
  ProgressIndicator,
  PauseMoment,
  FireflyEffect,
  FloatingPetals
} from './components'

// Types for better organization
type SectionName = 
  | 'home' 
  | 'products' 
  | 'services' 
  | 'community' 
  | 'spiritual' 
  | 'contact' 
  | 'dashboard'

function App() {
  const [currentSection, setCurrentSection] = useState<SectionName>('home')
  const [showDashboard, setShowDashboard] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNavigate = (section: string) => {
    const validSection = section as SectionName
    setCurrentSection(validSection)
    setShowDashboard(validSection === 'dashboard')
    
    // Smooth scroll to section
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Initialize integrations on app load
  useEffect(() => {
    validateEnvironment()
    initializeAnalytics()
  }, [])

  // Homepage Structure based on implementation guide
  const HomePage = () => (
    <>
      {/* 1. Hero Section - Full-width with rotating affirmations */}
      <section id="hero" className="enhanced-hero-section">
        <EnhancedHero onNavigate={handleNavigate} />
      </section>

      {/* 2. Introduction Section - Brief brand story with photo */}
      <section id="introduction" className="section bg-light">
        <div className="container">
          <div className="grid grid-2 gap-xl items-center">
            <div className="intro-content">
              <h2 className="text-h2 text-dark">🌸 Where Southern Gothic Meets Digital Sanctuary</h2>
              <p className="text-body text-dark">
                I'm Latisha, and I believe technology should serve our healing, not deplete it. 
                Born from the intersection of trauma-informed care and digital innovation, 
                Midnight Magnolia creates space for sustainable growth through code and community.
              </p>
              <p className="text-body text-dark">
                Every product, service, and resource here is crafted with intentionality—
                honoring our ancestors' wisdom while building bridges to liberation.
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => handleNavigate('services')}
              >
                🌙 Learn More About Our Journey
              </button>
            </div>
            <div className="intro-image">
              <img 
                src="/images/gallery/personal-photo-1.jpg" 
                alt="Latisha - Founder of Midnight Magnolia"
                className="rounded-lg shadow-lg"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Showcase - 3-column grid with hover effects */}
      <section id="product-preview" className="section">
        <div className="container">
          <div className="text-center space-y-lg">
            <h2 className="text-h2">✨ Featured Sacred Offerings</h2>
            <p className="text-body">Healing-centered digital products for sustainable growth</p>
          </div>
          
          <div className="grid grid-3 gap-lg">
            {/* Digital Sanctuary Preview */}
            <div className="card card-feature">
              <div className="offering-icon text-h2">📚</div>
              <h3 className="text-h3 text-dark">Digital Sanctuary</h3>
              <p className="text-body text-dark">Healing journals, automation templates, and AI prompts</p>
              <div className="card-footer">
                <span className="price text-accent">$25-$59</span>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleNavigate('products')}
                >
                  Quick Shop
                </button>
              </div>
            </div>

            {/* Sacred Automation Preview */}
            <div className="card card-feature">
              <div className="offering-icon text-h2">🤖</div>
              <h3 className="text-h3 text-dark">Sacred Automation</h3>
              <p className="text-body text-dark">Gentle systems that support, not overwhelm</p>
              <div className="card-footer">
                <span className="price text-accent">$35-$149</span>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleNavigate('products')}
                >
                  Quick Shop
                </button>
              </div>
            </div>

            {/* Justice Resources Preview */}
            <div className="card card-feature">
              <div className="offering-icon text-h2">⚖️</div>
              <h3 className="text-h3 text-dark">Gentle Justice</h3>
              <p className="text-body text-dark">Trauma-informed legal resources and advocacy</p>
              <div className="card-footer">
                <span className="price text-accent">Free-$29</span>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleNavigate('spiritual')}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Content Preview - Latest posts and resources */}
      <section id="content-preview" className="section bg-card">
        <div className="container">
          <div className="text-center space-y-lg">
            <h2 className="text-h2 text-dark">🌙 Sacred Wisdom & Resources</h2>
            <p className="text-body text-dark">Latest insights from our digital grimoire</p>
          </div>
          
          <div className="grid grid-3 gap-lg">
            {/* Latest Blog Post */}
            <div className="card">
              <div className="card-image">
                <img 
                  src="/images/gallery/southern-gothic-1.jpeg" 
                  alt="Understanding Digital Minimalism"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </div>
              <div className="card-content">
                <span className="text-caption text-accent">Digital Wellness</span>
                <h3 className="text-h3 text-dark">Sacred Pause: Digital Minimalism for Healing</h3>
                <p className="text-body text-dark">How intentional technology use supports trauma recovery...</p>
                <a href="#" className="text-accent">Read More (5 min)</a>
              </div>
            </div>

            {/* Upcoming Workshop */}
            <div className="card">
              <div className="card-content">
                <span className="text-caption text-accent">Upcoming Event</span>
                <h3 className="text-h3 text-dark">🌸 Gentle Automation Workshop</h3>
                <p className="text-body text-dark">Learn to create systems that support your wellbeing</p>
                <div className="space-y-sm">
                  <p className="text-caption">January 25, 2024 • 7PM EST</p>
                  <button className="btn btn-primary btn-sm">Register Free</button>
                </div>
              </div>
            </div>

            {/* Free Resource Highlight */}
            <div className="card bg-accent" style={{ background: 'var(--sage-green)' }}>
              <div className="card-content">
                <span className="text-caption" style={{ color: 'var(--midnight-blue)' }}>Free Resource</span>
                <h3 className="text-h3" style={{ color: 'var(--midnight-blue)' }}>🎁 ADHD-Friendly Workflow Guide</h3>
                <p className="text-body" style={{ color: 'var(--midnight-blue)' }}>Gentle productivity templates designed for neurodivergent minds</p>
                <button className="btn" style={{ background: 'var(--midnight-blue)', color: 'var(--antique-cream)' }}>
                  Download Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Community Section - Testimonials and social proof */}
      <section id="community-preview" className="section">
        <div className="container">
          <div className="text-center space-y-lg">
            <h2 className="text-h2">💚 Sacred Community Voices</h2>
            <p className="text-body">Stories from our digital sanctuary family</p>
          </div>
          
          {/* Testimonial Carousel */}
          <div className="testimonial-carousel">
            <div className="testimonial-card card">
              <div className="testimonial-content">
                <p className="text-quote">"Midnight Magnolia helped me create systems that actually support my ADHD brain instead of fighting against it."</p>
                <div className="testimonial-author">
                  <img 
                    src="/images/gallery/personal-photo-2.jpg" 
                    alt="Sarah M."
                    className="author-avatar"
                  />
                  <div>
                    <h4 className="text-body text-accent">Sarah M.</h4>
                    <p className="text-caption">Creative Entrepreneur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Feed Preview */}
          <div className="instagram-preview">
            <h3 className="text-h3 text-center">Follow Our Journey @midnightmagnolia</h3>
            <div className="grid grid-6 gap-sm">
              {[
                "/images/gallery/southern-gothic-2.jpeg",
                "/images/gallery/black-candle-gold-label.png",
                "/images/gallery/gothic-digital-planner.png",
                "/images/gallery/magnolia-flower.png",
                "/images/gallery/tarot-symbol.png",
                "/images/gallery/stars-glyph.png"
              ].map((src, i) => (
                <div key={i} className="instagram-image">
                  <img 
                    src={src}
                    alt={`Instagram post ${i + 1}`}
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup with Incentive */}
          <div className="newsletter-signup card bg-light text-center">
            <h3 className="text-h3 text-dark">🌸 Join Our Digital Garden</h3>
            <p className="text-body text-dark">
              Weekly wisdom, gentle resources, and first access to new offerings. 
              Plus get our free "Sacred Boundaries" digital guide!
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="newsletter-input"
              />
              <button className="btn btn-primary">
                🌙 Join Free
              </button>
            </div>
            <p className="text-caption">No spam, ever. Unsubscribe anytime with love.</p>
          </div>
        </div>
      </section>
    </>
  )

  // Contact section component
  const ContactSection = () => (
    <section className="section" id="contact">
      <div className="container">
        <div className="text-center">
          <h2 className="text-h1">🌙 Ready to Begin?</h2>
          <p className="text-body">
            Let's tend to your digital garden together. Whether you're dreaming of a new website, 
            need automation support, or want to explore how technology can serve your mission.
          </p>
        </div>
        
        <div className="grid grid-3 gap-lg">
          <div className="card text-center">
            <div className="text-h2">✉️</div>
            <h3 className="text-h3">Send a Message</h3>
            <p className="text-body">Share your vision, ask questions, or just say hello.</p>
            <a href="mailto:hello@midnightmagnolia.com" className="btn btn-primary">
              hello@midnightmagnolia.com
            </a>
          </div>
          
          <div className="card text-center">
            <div className="text-h2">📅</div>
            <h3 className="text-h3">Sacred Pause Call</h3>
            <p className="text-body">Let's have a conversation about your needs and dreams.</p>
            <button className="btn btn-secondary">Schedule Discovery Call</button>
          </div>
          
          <div className="card text-center">
            <div className="text-h2">💬</div>
            <h3 className="text-h3">Community Connections</h3>
            <p className="text-body">Find me in digital spaces where healing and justice intersect.</p>
            <div className="flex gap-sm justify-center">
              <a href="#" className="btn btn-ghost">LinkedIn</a>
              <a href="#" className="btn btn-ghost">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Enhanced section rendering based on implementation guide
  const renderSection = () => {
    if (showDashboard) {
      return <Dashboard onNavigate={handleNavigate} />
    }

    switch (currentSection) {
      case 'home':
        return <HomePage />
      
      case 'products':
        return (
          <section className="section">
            <div className="container">
              <h2 className="text-h2 text-center">✨ Digital Sanctuary Collection</h2>
              <DigitalProducts.ShopSection onNavigate={handleNavigate} />
            </div>
          </section>
        )
      
      case 'services':
        return (
          <section className="section">
            <div className="container">
              <h2 className="text-h2 text-center">🌸 Sacred Services</h2>
              <Services.ServicesSection onNavigate={handleNavigate} />
            </div>
          </section>
        )
      
      case 'community':
        return (
          <section className="section">
            <div className="container">
              <h2 className="text-h2 text-center">💚 Sacred Community</h2>
              <Community.CommunitySection onNavigate={handleNavigate} />
            </div>
          </section>
        )
      
      case 'spiritual':
        return (
          <section className="section">
            <div className="container">
              <h2 className="text-h2 text-center">⚖️ Spiritual & Justice Resources</h2>
              <SpiritualResources.JusticeResources onNavigate={handleNavigate} />
            </div>
          </section>
        )
      
      case 'contact':
        return <ContactSection />
      
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app-container" ref={containerRef}>
      {/* Accessibility and ADHD-friendly navigation */}
      <SkipNavigation mainContentId="main-content" />
      <ProgressIndicator />
      <PauseMoment position="bottom-right" />
      
      {/* Atmospheric effects */}
      <FireflyEffect />
      <FloatingPetals />
      
      <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
      
      <main id="main-content" className="main-content">
        {renderSection()}
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            
            {/* Footer Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img 
                  src="/images/logos/Midnight_MagnoliaJune-12.jpg" 
                  alt="Midnight Magnolia Logo"
                  className="footer-logo-image"
                />
                <h3 className="footer-brand-name">Midnight Magnolia</h3>
              </div>
              <p className="footer-tagline">A Southern Gothic Digital Sanctuary</p>
              <p className="footer-description">
                Where trauma-informed AI meets community justice work. 
                Creating healing-centered technology for liberation.
              </p>
            </div>

            {/* Footer Navigation */}
            <div className="footer-nav">
              <h4 className="footer-section-title">Explore</h4>
              <div className="footer-links">
                <button className="footer-link" onClick={() => handleNavigate('services')}>Services</button>
                <button className="footer-link" onClick={() => handleNavigate('products')}>Products</button>
                <button className="footer-link" onClick={() => handleNavigate('community')}>Community</button>
                <button className="footer-link" onClick={() => handleNavigate('spiritual')}>Spiritual Resources</button>
                <button className="footer-link" onClick={() => handleNavigate('contact')}>Contact</button>
              </div>
            </div>

            {/* Social Media & Shop Links */}
            <div className="footer-social">
              <h4 className="footer-section-title">Connect & Support</h4>
              <div className="social-links">
                <a 
                  href="https://www.instagram.com/midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Follow on Instagram"
                >
                  📷 Instagram
                </a>
                <a 
                  href="https://www.tiktok.com/@midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Follow on TikTok"
                >
                  🎵 TikTok
                </a>
                <a 
                  href="https://www.linkedin.com/in/midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Connect on LinkedIn"
                >
                  💼 LinkedIn
                </a>
                <a 
                  href="https://github.com/midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="View on GitHub"
                >
                  🔧 GitHub
                </a>
              </div>
              
              <div className="shop-links">
                <a 
                  href="https://midnightmagnolia.myshopify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shop-link btn btn-secondary"
                >
                  🛒 Shopify Store
                </a>
                <a 
                  href="https://www.etsy.com/shop/MidnightMagnoliaShop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shop-link btn btn-secondary"
                >
                  🎨 Etsy Shop
                </a>
                <a 
                  href="https://www.patreon.com/midnightmagnolia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="shop-link btn btn-accent"
                >
                  💚 Support on Patreon
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-legal">
              <p className="text-caption">
                © 2024 Midnight Magnolia. Made with 💚 for healing, growth, and liberation.
              </p>
              <p className="text-caption">
                🌸 Where community care meets code • 🌙 Trauma-informed technology for justice
              </p>
            </div>
            <div className="footer-disclaimer">
              <p className="text-caption">
                <strong>Legal Disclaimer:</strong> Justice resources are for educational purposes only. 
                Always consult with qualified legal professionals for advice specific to your situation.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
