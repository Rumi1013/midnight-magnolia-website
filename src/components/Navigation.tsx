import React, { useState, useEffect } from 'react'
import '../styles/design-system.css'

interface NavigationItem {
  id: string
  label: string
  icon: string
  type: 'single' | 'dropdown'
  submenu?: { id: string; label: string; icon: string }[]
}

interface NavigationProps {
  currentSection: string
  onNavigate: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [_isScrolled, setIsScrolled] = useState(false)

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: '🌙', type: 'single' },
    { id: 'about', label: 'About', icon: '🌿', type: 'single' },
    { 
      id: 'services', 
      label: 'Services', 
      icon: '✨', 
      type: 'dropdown',
      submenu: [
        { id: 'services', label: 'All Services', icon: '🔮' },
        { id: 'trauma-ai', label: 'Trauma-Informed AI', icon: '🧠' },
        { id: 'justice-resources', label: 'Justice Resources', icon: '⚖️' }
      ]
    },
    { 
      id: 'digital-sanctuary', 
      label: 'Digital Sanctuary', 
      icon: '🏛️', 
      type: 'dropdown',
      submenu: [
        { id: 'archive', label: 'Ancestral Archive', icon: '📚' },
        { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
        { id: 'blog', label: 'Stories & Wisdom', icon: '📝' }
      ]
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: '💚', 
      type: 'dropdown',
      submenu: [
        { id: 'membership', label: 'Healing Circle', icon: '🌸' },
        { id: 'shop', label: 'Sacred Shop', icon: '🛒' },
        { id: 'brand', label: 'Brand Assets', icon: '🎭' }
      ]
    },
    { id: 'contact', label: 'Contact', icon: '✉️', type: 'single' }
  ]

  // Use one consistent beautiful logo instead of complex switching
  const getLogo = () => {
    return '/images/logos/Midnight_MagnoliaJune-15.jpg' // Your beautiful new logo
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuItemClick = (item: NavigationItem) => {
    if (item.type === 'dropdown') {
      setActiveDropdown(activeDropdown === item.id ? null : item.id)
    } else {
      setActiveDropdown(null)
      setIsMenuOpen(false)
      
      // Fix navigation scroll offset
      if (item.id === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        setTimeout(() => {
          const headerHeight = 100 // Increased for proper clearance
          const targetElement = document.querySelector(`[data-section="${item.id}"]`)
          if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - headerHeight
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
      
      onNavigate(item.id)
    }
  }

  const handleSubmenuClick = (itemId: string) => {
    setActiveDropdown(null)
    setIsMenuOpen(false)
    
    // Add scroll offset for sticky header
    if (itemId !== 'home') {
      setTimeout(() => {
        const headerHeight = 100 // Increased for proper clearance
        const targetElement = document.querySelector(`[data-section="${itemId}"]`)
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerHeight
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    
    onNavigate(itemId)
  }

  return (
    <header className="main-header">
      <div className="container">
        <nav className="navigation">
          {/* Brand */}
          <button 
            className="brand-button"
            onClick={() => handleMenuItemClick(navigationItems[0])}
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
              <span className="brand-name text-h3">Midnight Magnolia</span>
              <span className="brand-tagline text-caption">Digital Sanctuary</span>
            </div>
          </button>

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

          {/* Navigation Menu */}
          <div className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
            {navigationItems.map((item) => (
              <div 
                key={item.id} 
                className={`nav-item ${item.type === 'dropdown' ? 'nav-dropdown' : ''}`}
              >
                {item.type === 'single' ? (
                  <button
                    className={`nav-link btn btn-ghost ${currentSection === item.id ? 'nav-link-active' : ''}`}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <>
                    <button
                      className={`nav-link nav-link-dropdown btn btn-ghost ${
                        item.submenu?.some(sub => sub.id === currentSection) ? 'nav-link-active' : ''
                      }`}
                      onClick={() => handleMenuItemClick(item)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className={`dropdown-arrow ${activeDropdown === item.id ? 'dropdown-arrow-open' : ''}`}>
                        ▼
                      </span>
                    </button>
                    <div className={`dropdown-menu ${activeDropdown === item.id ? 'dropdown-menu-open' : ''}`}>
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.id}
                          className={`dropdown-item btn btn-ghost ${currentSection === subItem.id ? 'dropdown-item-active' : ''}`}
                          onClick={() => handleSubmenuClick(subItem.id)}
                        >
                          <span className="nav-icon">{subItem.icon}</span>
                          <span>{subItem.label}</span>
                        </button>
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