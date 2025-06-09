import React, { useState, useEffect } from 'react'
import '../styles/design-system.css'
import { InteractiveButton, GlowText } from './MagicUI'

interface NavigationItem {
  id: string
  label: string
  icon: string
  type: 'single' | 'dropdown'
  submenu?: { id: string; label: string; icon: string }[]
  subItems?: { icon?: React.ReactNode; id: string; label: string; highlight?: boolean }[]
}

interface NavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: '🌙', type: 'single' },
    { id: 'about', label: 'About', icon: '🌿', type: 'single' },
    { 
      id: 'digital-sanctuary', 
      label: 'Digital Sanctuary', 
      icon: '🏛️', 
      type: 'dropdown',
      submenu: [
        { id: 'digital-art', label: 'Digital Art', icon: '🎨' },
        { id: 'journals', label: 'Healing Journals', icon: '📔' },
        { id: 'automation', label: 'Automation Templates', icon: '⚡' },
        { id: 'ai-prompts', label: 'AI Prompt Library', icon: '🤖' }
      ]
    },
    { 
      id: 'memberships', 
      label: 'Sacred Memberships', 
      icon: '🌸', 
      type: 'dropdown',
      submenu: [
        { id: 'magnolia-seed', label: 'Magnolia Seed ($3)', icon: '🌱' },
        { id: 'crescent-bloom', label: 'Crescent Bloom ($7)', icon: '🌙' },
        { id: 'golden-grove', label: 'Golden Grove ($15)', icon: '✨' },
        { id: 'moonlit-sanctuary', label: 'Moonlit Sanctuary ($30)', icon: '🏯' },
        { id: 'house-midnight', label: 'House of Midnight ($75)', icon: '🏠' }
      ]
    },
    { 
      id: 'services', 
      label: 'Services', 
      icon: '⚖️', 
      type: 'dropdown',
      submenu: [
        { id: 'web-development', label: 'Web Development', icon: '💻' },
        { id: 'brand-identity', label: 'Brand Identity', icon: '🎭' },
        { id: 'digital-strategy', label: 'Digital Strategy', icon: '🗺️' },
        { id: 'trauma-informed-legal', label: 'Gentle Justice Portal', icon: '⚖️' }
      ]
    },
    { 
      id: 'portfolio', 
      label: 'Sacred Portfolio', 
      icon: '🖼️', 
      type: 'dropdown',
      submenu: [
        { id: 'southern-roots', label: 'Southern Roots Series', icon: '🌳' },
        { id: 'digital-heritage', label: 'Digital Heritage', icon: '📚' },
        { id: 'client-transformations', label: 'Client Transformations', icon: '🦋' },
        { id: 'technical-showcases', label: 'Technical Showcases', icon: '⚙️' }
      ]
    },
    { id: 'contact', label: 'Connect', icon: '✉️', type: 'single' }
  ]

  // Use one consistent beautiful logo instead of complex switching
  const getLogo = () => {
    return isScrolled 
      ? "/images/logos/Midnight_MagnoliaJune-15.jpg"  // Smaller version when scrolled
      : "/images/logos/Midnight_MagnoliaJune-16.jpg"  // Full logo when at top
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuItemClick = (item: NavigationItem) => {
    if (item.type === 'single') {
      onNavigate(item.id)
      setIsMenuOpen(false)
      setActiveDropdown(null)
    } else {
      // Toggle dropdown
      setActiveDropdown(activeDropdown === item.id ? null : item.id)
    }
  }

  const handleSubmenuClick = (itemId: string) => {
    onNavigate(itemId)
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className="main-header">
      <div className="container">
        <nav className="navigation">
          {/* Enhanced Brand with Magic Text */}
          <InteractiveButton
            variant="ghost"
            magnetic={true}
            onClick={() => handleMenuItemClick(navigationItems[0])}
            className="brand-button"
          >
            <img 
              src={getLogo()} 
              alt="Midnight Magnolia Logo"
              className={`brand-logo ${
                currentSection === 'justice-resources' || currentSection === 'trauma-ai' 
                  ? 'justice-glow' 
                  : ''
              }`}
            />
            <div className="brand-text">
              <span className="brand-name text-h3">
                <GlowText 
                  text="Midnight Magnolia"
                  variant="gradient"
                  size="sm"
                  colors={['var(--accent-primary)', 'var(--lavender-mist)']}
                />
              </span>
              <span className="brand-tagline text-caption">Digital Sanctuary</span>
            </div>
          </InteractiveButton>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Enhanced Navigation Menu */}
          <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
            {navigationItems.map((item) => (
              <div 
                key={item.id} 
                className={`nav-item ${item.type === 'dropdown' ? 'nav-dropdown' : ''}`}
              >
                {item.type === 'single' ? (
                  <InteractiveButton
                    variant={currentSection === item.id ? 'primary' : 'ghost'}
                    magnetic={true}
                    onClick={() => handleMenuItemClick(item)}
                    className="nav-link"
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </InteractiveButton>
                ) : (
                  <>
                    <InteractiveButton
                      variant={item.submenu?.some(sub => sub.id === currentSection) ? 'primary' : 'ghost'}
                      magnetic={true}
                      onClick={() => handleMenuItemClick(item)}
                      className="nav-link nav-link-dropdown"
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className={`dropdown-arrow ${activeDropdown === item.id ? 'dropdown-arrow-open' : ''}`}>
                        ▼
                      </span>
                    </InteractiveButton>
                    
                    {/* Enhanced Dropdown Menu */}
                    <div className={`dropdown-menu ${activeDropdown === item.id ? 'dropdown-menu-open' : ''}`}>
                      {item.submenu?.map((subItem) => (
                        <InteractiveButton
                          key={subItem.id}
                          variant={currentSection === subItem.id ? 'primary' : 'ghost'}
                          onClick={() => handleSubmenuClick(subItem.id)}
                          className="dropdown-item"
                        >
                          <span className="nav-icon">{subItem.icon}</span>
                          <span>{subItem.label}</span>
                        </InteractiveButton>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navigation