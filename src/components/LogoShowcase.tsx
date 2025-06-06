import React, { useState } from 'react'
import '../styles/design-system.css'

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
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">🎨 Midnight Magnolia Brand Assets</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            A collection of our brand variations, each designed for different contexts and purposes. 
            From mystical Victorian elegance to southern gothic texture, each logo tells part of our story.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter" style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-3xl)',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                minWidth: '120px'
              }}
            >
              <span style={{ fontSize: 'var(--text-lg)' }}>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Description */}
        <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
          <h3 className="text-h3" style={{ color: 'var(--accent-primary)' }}>
            {categories.find(c => c.id === selectedCategory)?.icon} {categories.find(c => c.id === selectedCategory)?.label}
          </h3>
          <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
            {categories.find(c => c.id === selectedCategory)?.description}
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-3 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          {filteredLogos.map((logo) => (
            <div 
              key={logo.id} 
              className="card card-hover animate-slide-up"
              onClick={() => setSelectedLogo(logo)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ 
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-lg)',
                marginBottom: 'var(--space-md)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={logo.path} 
                  alt={logo.name}
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '150px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              <h4 className="text-h4" style={{ marginBottom: 'var(--space-sm)' }}>
                {logo.name}
              </h4>
              
              <p className="text-body" style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-sm)',
                fontSize: 'var(--text-sm)'
              }}>
                {logo.description}
              </p>
              
              <div className="portfolio-tag" style={{ fontSize: 'var(--text-xs)' }}>
                {logo.usage}
              </div>
            </div>
          ))}
        </div>

        {/* Logo Detail Modal */}
        {selectedLogo && (
          <div 
            className="modal-overlay"
            onClick={() => setSelectedLogo(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 'var(--space-lg)'
            }}
          >
            <div 
              className="modal-content card"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto'
              }}
            >
              <div style={{ 
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-2xl)',
                marginBottom: 'var(--space-lg)',
                textAlign: 'center'
              }}>
                <img 
                  src={selectedLogo.path} 
                  alt={selectedLogo.name}
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              <h3 className="text-h2" style={{ 
                color: 'var(--accent-primary)',
                marginBottom: 'var(--space-md)'
              }}>
                {selectedLogo.name}
              </h3>
              
              <p className="text-body-lg" style={{ 
                marginBottom: 'var(--space-lg)',
                color: 'var(--text-secondary)'
              }}>
                {selectedLogo.description}
              </p>
              
              <div style={{ 
                background: 'var(--bg-glass)',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-lg)'
              }}>
                <h4 className="text-h4" style={{ marginBottom: 'var(--space-sm)' }}>
                  Usage Guidelines
                </h4>
                <p className="text-body">{selectedLogo.usage}</p>
              </div>
              
              <div style={{ 
                display: 'flex',
                gap: 'var(--space-md)',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}>
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
            <h3 className="text-h3" style={{ 
              color: 'var(--accent-primary)',
              marginBottom: 'var(--space-lg)'
            }}>
              💮 Brand Philosophy
            </h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              Each logo variation represents a different aspect of our healing-centered technology practice:
            </p>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              color: 'var(--text-secondary)'
            }}>
              <li style={{ marginBottom: 'var(--space-sm)' }}>
                🌸 <strong>Main logos:</strong> Professional technology services
              </li>
              <li style={{ marginBottom: 'var(--space-sm)' }}>
                ✨ <strong>Golden versions:</strong> Premium offerings and sacred work
              </li>
              <li style={{ marginBottom: 'var(--space-sm)' }}>
                🔮 <strong>Mystical elements:</strong> Spiritual and ancestral services
              </li>
              <li style={{ marginBottom: 'var(--space-sm)' }}>
                📜 <strong>Textured designs:</strong> Southern gothic storytelling
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h3 className="text-h3" style={{ 
              color: 'var(--accent-primary)',
              marginBottom: 'var(--space-lg)'
            }}>
              🤝 Collaboration Assets
            </h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-lg)' }}>
              Working with us on a project? These brand assets are available for:
            </p>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)'
            }}>
              <button className="btn btn-secondary">
                Download Brand Pack 📦
              </button>
              <button className="btn btn-ghost">
                Request Custom Logo 🎨
              </button>
            </div>
            <p className="text-caption" style={{ 
              color: 'var(--text-muted)',
              marginTop: 'var(--space-md)'
            }}>
              Please maintain brand integrity and reach out for usage guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoShowcase 