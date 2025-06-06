import React, { useState } from 'react';

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home', icon: '🌸' },
    { id: 'services', label: 'Services', icon: '🌿' },
    { id: 'about', label: 'About', icon: '🌙' },
    { id: 'contact', label: 'Contact', icon: '💫' }
  ];

  return (
    <header className="sanctuary-header">
      <div className="header-content">
        <div className="brand-section">
          <h1 className="sanctuary-title" onClick={() => onNavigate('home')}>
            🌸 Midnight Magnolia
          </h1>
          <p className="sanctuary-subtitle">
            Where Southern wisdom meets digital craft
          </p>
        </div>
        
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
      </div>
    </header>
  );
};

export default Header;