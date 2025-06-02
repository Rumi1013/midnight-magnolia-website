import React, { useState } from 'react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: '🌸' },
    { id: 'services', label: 'Services', icon: '🌿' },
    { id: 'about', label: 'About', icon: '🌙' },
    { id: 'contact', label: 'Contact', icon: '💫' }
  ];

  return (
    <nav className="main-navigation">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
      
      <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
        {navigation.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-link ${currentSection === item.id ? 'nav-link-active' : ''}`}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;