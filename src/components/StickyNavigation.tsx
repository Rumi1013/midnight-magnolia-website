import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/design-system.css';

interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  link: string;
  highlight?: boolean;
}

interface StickyNavigationProps {
  containerRef: React.RefObject<HTMLElement>;
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function useScrollY(containerRef: React.RefObject<HTMLElement>) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      } else {
        setScrollY(window.scrollY);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]);

  return scrollY;
}

const StickyNavigation: React.FC<StickyNavigationProps> = ({
  containerRef,
  onNavigate,
  currentSection
}) => {
  const scrollY = useScrollY(containerRef);
  const stickyNavRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = useMemo(
    () => [
      { id: 'home', label: 'Home', icon: '🌙', link: '#home' },
      { id: 'about', label: 'About', icon: '🌿', link: '#about' },
      { id: 'sanctuary', label: 'Sanctuary', icon: '🏛️', link: '#sanctuary' },
      { id: 'memberships', label: 'Memberships', icon: '🌸', link: '#memberships', highlight: true },
      { id: 'services', label: 'Services', icon: '✨', link: '#services' },
      { id: 'community', label: 'Community', icon: '🤝', link: '#community' },
    ],
    [],
  );

  useEffect(() => {
    setIsScrolled(scrollY >= 100);
  }, [scrollY]);

  const handleNavClick = (navItem: NavigationItem) => {
    onNavigate(navItem.id);
    setIsMenuOpen(false);
  };

  return (
    <header 
      ref={stickyNavRef} 
      className={`sticky-navigation ${isScrolled ? 'scrolled' : ''}`}
    >
      <nav className="sticky-nav-container">
        {/* Logo */}
        <motion.div
          className="sticky-nav-logo"
          animate={{
            scale: isScrolled ? 0.8 : 1,
            opacity: isScrolled ? 0.9 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <img
            src="/images/logos/Midnight_MagnoliaJune-16.jpg"
            alt="Midnight Magnolia"
            className="nav-logo-image"
          />
          <motion.span
            className="nav-logo-text"
            animate={{
              opacity: isScrolled ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            Midnight Magnolia
          </motion.span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="sticky-nav-desktop"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            background: isScrolled 
              ? "rgba(250, 243, 224, 0.95)" 
              : "rgba(250, 243, 224, 0.7)",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(10, 25, 47, 0.1)"
              : "none",
            borderRadius: isScrolled ? "9999px" : "0px",
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
        >
          <nav className="nav-links-container">
            {navLinks.map((navItem) => (
              <motion.button
                key={navItem.id}
                className={`nav-link-item ${
                  currentSection === navItem.id ? 'active' : ''
                } ${navItem.highlight ? 'highlight' : ''}`}
                onClick={() => handleNavClick(navItem)}
                whileHover={{ 
                  scale: 1.05,
                  color: "var(--rich-gold)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="nav-link-icon">{navItem.icon}</span>
                <span className="nav-link-label">{navItem.label}</span>
                
                {/* Active indicator */}
                {currentSection === navItem.id && (
                  <motion.div
                    className="nav-active-indicator"
                    layoutId="activeNavIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                
                {/* Highlight glow for special items */}
                {navItem.highlight && (
                  <div className="nav-highlight-glow" />
                )}
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="sticky-nav-mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isMenuOpen ? 45 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="sticky-nav-mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mobile-menu-background" />
              <nav className="mobile-nav-links">
                {navLinks.map((navItem, index) => (
                  <motion.button
                    key={navItem.id}
                    className={`mobile-nav-item ${
                      currentSection === navItem.id ? 'active' : ''
                    } ${navItem.highlight ? 'highlight' : ''}`}
                    onClick={() => handleNavClick(navItem)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      x: 10,
                      backgroundColor: "rgba(212, 175, 55, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mobile-nav-icon">{navItem.icon}</span>
                    <span className="mobile-nav-label">{navItem.label}</span>
                    
                    {currentSection === navItem.id && (
                      <div className="mobile-nav-active" />
                    )}
                  </motion.button>
                ))}
              </nav>
              
              {/* Sacred decorative elements */}
              <div className="mobile-menu-decorations">
                <div className="decoration-firefly decoration-1" />
                <div className="decoration-firefly decoration-2" />
                <div className="decoration-moon" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default StickyNavigation; 