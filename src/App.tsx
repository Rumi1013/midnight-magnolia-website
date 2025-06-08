import React, { useState, useRef, useEffect } from 'react'
import './styles/design-system.css'
import './theme-light.css'
import './App.css'
import { validateEnvironment, initializeAnalytics } from './lib/integrations'
import ProgressIndicator from './components/ProgressIndicator'
import PauseMoment from './components/PauseMoment'
import SkipNavigation from './components/SkipNavigation'
import Navigation from './components/Navigation'
// Import MainHero component instead of the problematic Hero component
import MainHero from './components/MainHero'
import ServicesSection from './components/ServicesSection'
import ShopSection from './components/ShopSection'
import CommunitySection from './components/CommunitySection'
import SacredMemberships from './components/SacredMemberships'
import PortfolioSection from './components/PortfolioSection'
import BlogSection from './components/BlogSection'
import TraumaInformedAI from './components/TraumaInformedAI'
import JusticeResources from './components/JusticeResources'
import LogoShowcase from './components/LogoShowcase'
import ArchiveSection from './components/ArchiveSection'
import Dashboard from './components/Dashboard'
import { PerformanceProvider } from './context/PerformanceContext'
import EnhancedHero from './components/EnhancedHero'
import SacredTestimonials from './components/SacredTestimonials'
import SacredFeatureScroll from './components/SacredFeatureScroll'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [showDashboard, setShowDashboard] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
    setShowDashboard(section === 'dashboard')
    
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

  const renderContact = () => (
    <section className="section">
      <div className="container">
        <div className="text-center">
          <h2 className="text-h1 animate-fade-in">🌙 Ready to Begin?</h2>
          <p className="text-body-lg animate-slide-up contact-intro-text">
            Let's tend to your digital garden together. Whether you're dreaming of a new website, 
            need automation support, or want to explore how technology can serve your mission.
          </p>
        </div>
        
        <div className="grid grid-3 gap-lg">
          <div className="card animate-slide-up text-center">
            <div className="contact-icon">✉️</div>
            <h3 className="text-h3">Send a Message</h3>
            <p className="text-body contact-text">
              Share your vision, ask questions, or just say hello.
            </p>
            <a href="mailto:hello@midnightmagnolia.com" className="btn btn-primary">
              hello@midnightmagnolia.com
            </a>
          </div>
          
          <div className="card animate-slide-up text-center">
            <div className="contact-icon">📅</div>
            <h3 className="text-h3">Sacred Pause Call</h3>
            <p className="text-body contact-text">
              Let's have a conversation about your needs and dreams.
            </p>
            <button className="btn btn-secondary">
              Schedule Discovery Call
            </button>
          </div>
          
          <div className="card animate-slide-up text-center">
            <div className="contact-icon">💬</div>
            <h3 className="text-h3">Community Connections</h3>
            <p className="text-body contact-text">
              Find me in digital spaces where healing and justice intersect.
            </p>
            <div className="flex gap-sm justify-center">
              <a href="#" className="btn btn-ghost">LinkedIn</a>
              <a href="#" className="btn btn-ghost">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="card contact-card-centered">
          <p className="text-body contact-text">
            <strong>Response Time:</strong> I typically respond within 24-48 hours. 
            If you need urgent support, please mention that in your message.
          </p>
          <p className="text-body">
            <strong>Sliding Scale:</strong> All initial consultations include discussion 
            of pricing that works for your budget and situation.
          </p>
        </div>
      </div>
    </section>
  )

  // Define section type for better type safety
  type SectionName = 'home' | 'about' | 'services' | 'shop' | 'memberships' |
    'portfolio' | 'blog' | 'trauma-ai' | 'justice-resources' | 'brand' | 
    'contact' | 'archive' | 'hero' | 'digital-art' | 'journals' | 'automation' |
    'ai-prompts' | 'magnolia-seed' | 'crescent-bloom' | 'golden-grove' |
    'moonlit-sanctuary' | 'house-midnight' | 'web-development' | 'brand-identity' |
    'digital-strategy' | 'trauma-informed-legal' | 'southern-roots' | 
    'digital-heritage' | 'client-transformations' | 'technical-showcases' |
    'sanctuary' | 'testimonials' | 'community' | 'sacred-feature-scroll'

  // Reusable Section component to avoid repetition
  const Section: React.FC<{
    name: SectionName;
    children: React.ReactNode;
  }> = ({ name, children }) => (
    <div data-section={name}>{children}</div>
  );

  // Function to render the MainHero component
  const renderHero = () => <MainHero onNavigate={handleNavigate} />;

  // Enhanced section components mapping
  const sectionComponents: {[key in SectionName]: React.ReactNode} = {
    home: <EnhancedHero onNavigate={handleNavigate} />,
    about: <ArchiveSection />,
    sanctuary: <ServicesSection />,
    memberships: <SacredMemberships />,
    services: <ServicesSection />,
    community: <CommunitySection />,
    testimonials: <SacredTestimonials />,
    shop: <ShopSection />,
    portfolio: <PortfolioSection />,
    blog: <BlogSection />,
    'trauma-ai': <TraumaInformedAI />,
    'justice-resources': <JusticeResources />,
    brand: <LogoShowcase />,
    contact: renderContact(),
    archive: <ArchiveSection />,
    hero: renderHero(),
    'digital-art': <ShopSection />,
    'journals': <ShopSection />,
    'automation': <ShopSection />,
    'ai-prompts': <ShopSection />,
    'magnolia-seed': <SacredMemberships />,
    'crescent-bloom': <SacredMemberships />,
    'golden-grove': <SacredMemberships />,
    'moonlit-sanctuary': <SacredMemberships />,
    'house-midnight': <SacredMemberships />,
    'web-development': <ServicesSection />,
    'brand-identity': <ServicesSection />,
    'digital-strategy': <ServicesSection />,
    'trauma-informed-legal': <JusticeResources />,
    'southern-roots': <PortfolioSection />,
    'digital-heritage': <PortfolioSection />,
    'client-transformations': <PortfolioSection />,
    'technical-showcases': <PortfolioSection />,
    'sacred-feature-scroll': <SacredFeatureScroll />
  };

  const renderMainContent = () => {
    if (showDashboard) {
      return <Dashboard onNavigate={handleNavigate} />
    }

    // Check if currentSection is a valid key in our mapping
    const isValidSection = (section: string): section is SectionName => 
      Object.keys(sectionComponents).includes(section);
    
    // Default to hero if currentSection is not in the mapping
    const sectionName = isValidSection(currentSection) ? currentSection : 'hero';
    
    return (
      <Section name={sectionName}>
        {sectionComponents[sectionName] || renderHero()}
      </Section>
    );
  }

  return (
    <PerformanceProvider>
      <div className="app-container" ref={containerRef}>
        {/* Accessibility and ADHD-friendly navigation components */}
        <SkipNavigation mainContentId="main-content" />
        <ProgressIndicator />
        <PauseMoment position="bottom-right" />
        
        <Navigation currentSection={currentSection} onNavigate={handleNavigate} />
        
        <main id="main-content" className="main-content">
          {renderMainContent()}
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
                  <button className="footer-link" onClick={() => handleNavigate('justice-resources')}>Justice Resources</button>
                  <button className="footer-link" onClick={() => handleNavigate('archive')}>Digital Archive</button>
                  <button className="footer-link" onClick={() => handleNavigate('blog')}>Stories</button>
                  <button className="footer-link" onClick={() => handleNavigate('about')}>About</button>
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
    </PerformanceProvider>
  )
}

export default App
