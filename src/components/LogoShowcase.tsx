import React, { useState } from 'react'
import '../styles/design-system.css'
import './LogoShowcase.css'

interface LogoVariation {
  id: string
  name: string
  description: string
  path: string
  category: 'main' | 'accent' | 'mystical' | 'texture'
  usage: string
}

const LogoShowcase: React.FC = () => {
  const [selectedLogo, setSelectedLogo] = useState<LogoVariation | null>(null)

  const logoVariations: LogoVariation[] = [
    {
      id: 'color-logo',
      name: 'Primary Color Logo',
      description: 'Main brand logo with full color palette',
      path: '/images/logos/color-logo.png',
      category: 'main',
      usage: 'Navigation, headers, main branding'
    },
    {
      id: 'golden-final',
      name: 'Golden Magnolia',
      description: 'Elegant gold version for premium contexts',
      path: '/images/logos/goldenFinal22_MM_25.png',
      category: 'accent',
      usage: 'Hero sections, premium services, favicons'
    },
    {
      id: 'paper-texture',
      name: 'Paper Texture',
      description: 'Southern gothic aesthetic with vintage texture',
      path: '/images/logos/paperFinal26_MM_25.png',
      category: 'texture',
      usage: 'Blog headers, storytelling sections'
    },
    {
      id: 'clear-final-7',
      name: 'Clear Transparent',
      description: 'Clean transparent version for overlays',
      path: '/images/logos/ClearFinal7_MM_25.jpeg',
      category: 'main',
      usage: 'Watermarks, subtle branding, backgrounds'
    },
    {
      id: 'classic-final',
      name: 'Classic Traditional',
      description: 'Timeless styling for formal contexts',
      path: '/images/logos/classicFinal21_MM_25.jpeg',
      category: 'main',
      usage: 'Documents, professional materials'
    },
    {
      id: 'mystical-victorian-1',
      name: 'Mystical Victorian I',
      description: 'Ornate Victorian-inspired mystical branding',
      path: '/images/gallery/mystical-victorian-logo-1.png',
      category: 'mystical',
      usage: 'Spiritual services, tarot sections'
    },
    {
      id: 'mystical-victorian-2',
      name: 'Mystical Victorian II',
      description: 'Alternative Victorian mystical styling',
      path: '/images/gallery/mystical-victorian-logo-2.png',
      category: 'mystical',
      usage: 'Ancestral research, sacred spaces'
    },
    {
      id: 'mystical-base',
      name: 'Core Mystical',
      description: 'Essential mystical brand element',
      path: '/images/gallery/mystical-logo.png',
      category: 'mystical',
      usage: 'Justice resources, spiritual content'
    }
  ]

  const categories = [
    { id: 'main', label: 'Main Brand', icon: '🌸', description: 'Primary logo variations' },
    { id: 'accent', label: 'Accent Gold', icon: '✨', description: 'Premium golden versions' },
    { id: 'mystical', label: 'Mystical Victorian', icon: '🔮', description: 'Spiritual and ancestral branding' },
    { id: 'texture', label: 'Textured', icon: '📜', description: 'Southern gothic aesthetic' }
  ]

  const [selectedCategory, setSelectedCategory] = useState<string>('main')

  const filteredLogos = logoVariations.filter(logo => logo.category === selectedCategory)

  return (
    <section className="section logo-showcase">
      <div className="container">
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">🎨 Midnight Magnolia Brand Assets</h2>
          <p className="text-body-lg animate-slide-up">
            A collection of our brand variations, each designed for different contexts and purposes. 
            From mystical Victorian elegance to southern gothic texture, each logo tells part of our story.
          </p>
        </div>

        {/* Category Filter */}
        <div className="logo-category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn logo-category-btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="logo-category-icon">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Description */}
        <div className="text-center logo-category-description">
          <h3 className="text-h3 logo-category-title">
            {categories.find(c => c.id === selectedCategory)?.icon} {categories.find(c => c.id === selectedCategory)?.label}
          </h3>
          <p className="text-body logo-category-text">
            {categories.find(c => c.id === selectedCategory)?.description}
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-3 gap-lg logo-grid">
          {filteredLogos.map((logo) => (
            <div 
              key={logo.id} 
              className="card card-hover animate-slide-up logo-card"
              onClick={() => setSelectedLogo(logo)}
            >
              <div className="logo-card-image-container">
                <img 
                  src={logo.path} 
                  alt={logo.name}
                  className="logo-card-image"
                />
              </div>
              
              <h4 className="text-h4 logo-card-title">
                {logo.name}
              </h4>
              
              <p className="text-body logo-card-description">
                {logo.description}
              </p>
              
              <div className="portfolio-tag logo-card-usage">
                {logo.usage}
              </div>
            </div>
          ))}
        </div>

        {/* Logo Detail Modal */}
        {selectedLogo && (
          <div 
            className="logo-modal-overlay"
            onClick={() => setSelectedLogo(null)}
          >
            <div 
              className="modal-content card logo-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="logo-modal-image-container">
                <img 
                  src={selectedLogo.path} 
                  alt={selectedLogo.name}
                  className="logo-modal-image"
                />
              </div>
              
              <h3 className="text-h2 logo-modal-title">
                {selectedLogo.name}
              </h3>
              
              <p className="text-body-lg logo-modal-description">
                {selectedLogo.description}
              </p>
              
              <div className="logo-modal-usage-section">
                <h4 className="text-h4 logo-modal-usage-title">
                  Usage Guidelines
                </h4>
                <p className="text-body">{selectedLogo.usage}</p>
              </div>
              
              <div className="logo-modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.open(selectedLogo.path, '_blank')}
                >
                  View Full Size 🔍
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedLogo(null)}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="section-divider"></div>

        {/* Brand Guidelines */}
        <div className="grid grid-2 gap-lg">
          <div className="card">
            <h3 className="text-h3 brand-philosophy-title">
              💮 Brand Philosophy
            </h3>
            <p className="text-body collaboration-section">
              Each logo variation represents a different aspect of our healing-centered technology practice:
            </p>
            <ul className="brand-philosophy-list">
              <li className="brand-philosophy-item">
                🌸 <strong>Main logos:</strong> Professional technology services
              </li>
              <li className="brand-philosophy-item">
                ✨ <strong>Golden versions:</strong> Premium offerings and sacred work
              </li>
              <li className="brand-philosophy-item">
                🔮 <strong>Mystical elements:</strong> Spiritual and ancestral services
              </li>
              <li className="brand-philosophy-item">
                📜 <strong>Textured designs:</strong> Southern gothic storytelling
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-h3 brand-philosophy-title">
              🤝 Collaboration Assets
            </h3>
            <p className="text-body collaboration-section">
              Working with us on a project? These brand assets are available for:
            </p>
            <div className="collaboration-actions">
              <button className="btn btn-secondary">
                Download Brand Pack 📦
              </button>
              <button className="btn btn-ghost">
                Request Custom Logo 🎨
              </button>
            </div>
            <p className="text-caption collaboration-note">
              Please maintain brand integrity and reach out for usage guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoShowcase 