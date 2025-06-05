import { useState, useEffect } from 'react'
import './styles/design-system.css'
import './App.css'
import { validateEnvironment, initializeAnalytics } from './lib/integrations'
import FloatingPetals from './components/FloatingPetals'
import FireflyEffect from './components/FireflyEffect'
import ProgressIndicator from './components/ProgressIndicator'
import PauseMoment from './components/PauseMoment'
import SkipNavigation from './components/SkipNavigation'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ShopSection from './components/ShopSection'
import CommunitySection from './components/CommunitySection'
import PortfolioSection from './components/PortfolioSection'
import BlogSection from './components/BlogSection'
import TraumaInformedAI from './components/TraumaInformedAI'
import JusticeResources from './components/JusticeResources'
import LogoShowcase from './components/LogoShowcase'
import ArchiveSection from './components/ArchiveSection'
import { PerformanceProvider } from './context/PerformanceContext'

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const handleNavigation = (section: string) => {
    setCurrentSection(section)
    
    // Add smooth scroll with offset for sticky header
    setTimeout(() => {
      if (section === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        // Scroll to top of main content with proper header offset
        const headerHeight = 120 // Increased for better clearance
        const yOffset = -headerHeight
        const element = document.getElementById('main-content')
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({
            top: Math.max(0, y), // Ensure we don't scroll to negative position
            behavior: 'smooth'
          })
        }
      }
    }, 100)
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
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '600px', margin: '0 auto var(--space-2xl)' }}>
            Let's tend to your digital garden together. Whether you're dreaming of a new website, 
            need automation support, or want to explore how technology can serve your mission.
          </p>
        </div>
        
        <div className="grid grid-3 gap-lg">
          <div className="card animate-slide-up text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>✉️</div>
            <h3 className="text-h3">Send a Message</h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-lg)' }}>
              Share your vision, ask questions, or just say hello.
            </p>
            <a href="mailto:hello@midnightmagnolia.com" className="btn btn-primary">
              hello@midnightmagnolia.com
            </a>
          </div>
          
          <div className="card animate-slide-up text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>📅</div>
            <h3 className="text-h3">Sacred Pause Call</h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-lg)' }}>
              Let's have a conversation about your needs and dreams.
            </p>
            <button className="btn btn-secondary">
              Schedule Discovery Call
            </button>
          </div>
          
          <div className="card animate-slide-up text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>💬</div>
            <h3 className="text-h3">Community Connections</h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-lg)' }}>
              Find me in digital spaces where healing and justice intersect.
            </p>
            <div className="flex gap-sm justify-center">
              <a href="#" className="btn btn-ghost">LinkedIn</a>
              <a href="#" className="btn btn-ghost">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
          <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
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

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <div data-section="home"><Hero onNavigate={handleNavigation} /></div>
      case 'about':
        return <div data-section="about"><AboutSection /></div>
      case 'services':
        return <div data-section="services"><ServicesSection /></div>
      case 'shop':
        return <div data-section="shop"><ShopSection /></div>
      case 'membership':
        return <div data-section="membership"><CommunitySection /></div>
      case 'portfolio':
        return <div data-section="portfolio"><PortfolioSection /></div>
      case 'blog':
        return <div data-section="blog"><BlogSection /></div>
      case 'trauma-ai':
        return <div data-section="trauma-ai"><TraumaInformedAI /></div>
      case 'justice-resources':
        return <div data-section="justice-resources"><JusticeResources /></div>
      case 'brand':
        return <div data-section="brand"><LogoShowcase /></div>
      case 'contact':
        return <div data-section="contact">{renderContact()}</div>
      case 'archive':
        return <div data-section="archive"><ArchiveSection /></div>
      default:
        return <div data-section="home"><Hero onNavigate={handleNavigation} /></div>
    }
  }

  return (
    <PerformanceProvider>
      <div className="app-container">
        {/* Accessibility and ADHD-friendly navigation components */}
        <SkipNavigation mainContentId="main-content" />
        <ProgressIndicator />
        <PauseMoment position="bottom-right" />
        
        {/* Ambient animation components */}
        <FloatingPetals />
        <FireflyEffect />
        
        <Navigation currentSection={currentSection} onNavigate={handleNavigation} />
        
        <main id="main-content" className="main-content">
          {renderCurrentSection()}
        </main>
        
        <footer className="app-footer">
          <div className="container text-center">
            <p className="text-body">Made with 💚 for healing, growth, and liberation</p>
            <p className="text-caption">🌸 Midnight Magnolia • Where community care meets code</p>
          </div>
        </footer>
      </div>
    </PerformanceProvider>
  )
}

export default App
