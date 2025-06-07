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
  const [isScrolled, setIsScrolled] = useState(false)

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
    { id: 'portfolio', label: 'Portfolio', icon: '📚', type: 'single' },
    { id: 'archive', label: 'Archive', icon: '🗂️', type: 'single' },
    { id: 'blog', label: 'Stories', icon: '📝', type: 'single' },
    { id: 'shop', label: 'Shop', icon: '🛒', type: 'single' },
    { id: 'membership', label: 'Community', icon: '💚', type: 'single' },
    { id: 'brand', label: 'Brand', icon: '🎨', type: 'single' },
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
              className="brand-logo"
              style={{
                transition: 'all var(--transition-smooth)',
                filter: currentSection === 'justice-resources' || currentSection === 'trauma-ai' 
                  ? 'drop-shadow(0 0 8px var(--accent-primary))' 
                  : 'none'
              }}
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

      <style jsx>{`
        .main-header {
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
          background: rgba(26, 35, 50, 0.95);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-bottom: 2px solid var(--accent-primary);
          padding: var(--space-md) 0;
          box-shadow: var(--shadow-lg);
        }

        .navigation {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-button {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: var(--space-xs);
          border-radius: var(--radius-md);
          transition: all var(--transition-normal);
        }

        .brand-button:hover {
          background: var(--bg-glass-hover);
          transform: scale(1.05);
        }

        .brand-logo {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-full);
          object-fit: cover;
          filter: drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3));
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .brand-name {
          color: var(--accent-primary);
          margin: 0;
        }

        .brand-tagline {
          color: var(--text-muted);
          margin: 0;
        }

        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: var(--space-xs);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          position: relative;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--accent-primary);
          border-radius: 1px;
          transition: all var(--transition-normal);
          position: absolute;
        }

        .hamburger span:nth-child(1) { top: 0; }
        .hamburger span:nth-child(2) { top: 8px; }
        .hamburger span:nth-child(3) { top: 16px; }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg);
          top: 8px;
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg);
          top: 8px;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          white-space: nowrap;
        }

        .nav-link-active {
          background: var(--bg-glass-hover);
          border-color: var(--accent-primary);
        }

        .nav-icon {
          font-size: var(--text-sm);
        }

        .dropdown-arrow {
          font-size: var(--text-xs);
          transition: transform var(--transition-normal);
        }

        .dropdown-arrow-open {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          background: var(--bg-secondary);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all var(--transition-normal);
          z-index: 9999;
          padding: var(--space-xs);
        }

        .dropdown-menu-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          width: 100%;
          text-align: left;
          margin-bottom: var(--space-xs);
        }

        .dropdown-item:last-child {
          margin-bottom: 0;
        }

        .dropdown-item-active {
          background: var(--accent-primary);
          color: var(--night-primary);
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block;
          }

          .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all var(--transition-normal);
            padding: var(--space-md);
          }

          .nav-menu-open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .nav-item {
            width: 100%;
          }

          .nav-link {
            width: 100%;
            text-align: left;
            margin-bottom: var(--space-xs);
          }

          .dropdown-menu {
            position: static;
            box-shadow: none;
            border: none;
            background: var(--bg-glass);
            margin-left: var(--space-md);
            opacity: 1;
            visibility: visible;
            transform: none;
            padding: var(--space-xs) 0;
          }

          .brand-text {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}

export default Navigation