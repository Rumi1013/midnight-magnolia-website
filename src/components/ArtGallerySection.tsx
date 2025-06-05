import React, { useState } from 'react'
import '../styles/design-system.css'

interface ArtworkItem {
  id: string
  title: string
  medium: string
  year: string
  category: string
  description: string
  image: string
  dimensions?: string
  story?: string
  techniques: string[]
  inspiration?: string
  available?: boolean
  price?: string
}

const ArtGallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null)

  const artworkItems: ArtworkItem[] = [
    {
      id: 'southern-gothic-mansion',
      title: 'Ancestral Sanctuary',
      medium: 'Digital Art',
      year: '2024',
      category: 'southern-gothic',
      description: 'A haunting yet beautiful representation of Southern Gothic architecture, where ancestral memories and modern mysticism converge under moonlight.',
      image: '/images/gallery/southern-gothic-mansion-night.png',
      dimensions: 'Digital Canvas',
      story: 'This piece emerged from late-night reflections on family history and the complex beauty of Southern landscapes. The mansion represents both the weight of history and the possibility of transformation—how we can honor our roots while creating new narratives.',
      techniques: ['Digital Painting', 'Atmospheric Lighting', 'Symbolic Composition'],
      inspiration: 'Inspired by family stories of old Southern homes and the way moonlight can make even difficult histories feel sacred.',
      available: true,
      price: 'Print Available'
    },
    {
      id: 'southern-gothic-landscape',
      title: 'Midnight Magnolia Dreams',
      medium: 'Digital Photography Composite',
      year: '2024',
      category: 'southern-gothic',
      description: 'A mystical landscape where Southern Gothic atmosphere meets digital artistry, featuring ethereal lighting and symbolic natural elements.',
      image: '/images/gallery/southern-gothic-1.jpeg',
      dimensions: 'High Resolution Digital',
      story: 'Created during a period of deep reflection on place and identity. This piece explores how the American South can be both beautiful and haunting, holding space for complexity and nuance.',
      techniques: ['Digital Photography', 'Composite Imaging', 'Color Grading', 'Symbolic Layering'],
      inspiration: 'The interplay between light and shadow in Southern landscapes, and how they mirror the complexity of Southern identity.',
      available: true,
      price: 'Commission Basis'
    },
    {
      id: 'gothic-atmosphere',
      title: 'Whispers in the Fog',
      medium: 'Digital Art',
      year: '2024',
      category: 'southern-gothic',
      description: 'An atmospheric piece capturing the mysterious beauty of Southern Gothic aesthetic through digital manipulation and symbolic imagery.',
      image: '/images/gallery/southern-gothic-2.jpeg',
      dimensions: 'Variable Digital Print Sizes',
      story: 'This work explores the liminal spaces where memory and reality blur. Created as part of a series examining how we process intergenerational trauma while finding beauty in our origins.',
      techniques: ['Digital Manipulation', 'Atmospheric Processing', 'Symbolic Integration'],
      inspiration: 'Early morning walks through Southern landscapes where fog creates natural mystery and transforms familiar places into something otherworldly.',
      available: true,
      price: 'Starting at $50'
    },
    {
      id: 'black-candle-ritual',
      title: 'Sacred Illumination',
      medium: 'Digital Art & Typography',
      year: '2024',
      category: 'mystical',
      description: 'A powerful meditation on ritual, intention, and the sacred act of lighting candles for transformation and healing.',
      image: '/images/gallery/black-candle-gold-label.png',
      dimensions: '8" x 10" Digital Print',
      story: 'Created for personal ritual practice and later shared with the community. This piece represents the power of intention and the way simple acts like lighting candles can become profound spiritual practices.',
      techniques: ['Digital Illustration', 'Sacred Geometry', 'Typography Design', 'Color Symbolism'],
      inspiration: 'Personal ritual practices and the universal human need for sacred moments in daily life.',
      available: true,
      price: '$25 Digital, $45 Print'
    },
    {
      id: 'gothic-digital-planner',
      title: 'ADHD-Friendly Sacred Planner',
      medium: 'Digital Design',
      year: '2024',
      category: 'functional-art',
      description: 'A beautifully designed digital planner that honors both Gothic aesthetics and neurodivergent planning needs.',
      image: '/images/gallery/gothic-digital-planner.png',
      dimensions: 'Digital Download - Multiple Formats',
      story: 'Born from personal frustration with traditional planners that didn\'t work for ADHD brains. This combines visual beauty with functional design that actually supports executive function.',
      techniques: ['UX Design', 'Visual Hierarchy', 'Accessibility Design', 'Gothic Aesthetics'],
      inspiration: 'The intersection of beauty and function—proving that accessibility tools can also be visually stunning.',
      available: true,
      price: '$25 Digital Download'
    },
    {
      id: 'magnolia-symbol',
      title: 'Magnolia Essence',
      medium: 'Digital Icon Design',
      year: '2024',
      category: 'symbols',
      description: 'A minimalist yet powerful representation of the magnolia flower, symbolizing resilience, dignity, and Southern beauty.',
      image: '/images/gallery/magnolia-flower.png',
      dimensions: 'Vector Format - Scalable',
      story: 'This symbol emerged as part of the Midnight Magnolia brand identity work. The magnolia represents both personal and collective resilience—how we can maintain our dignity and beauty even in challenging circumstances.',
      techniques: ['Vector Design', 'Minimalist Aesthetic', 'Symbolic Representation'],
      inspiration: 'The magnolia trees that bloom throughout the South, representing endurance and the ability to find beauty in any season.',
      available: false,
      price: 'Brand Asset'
    },
    {
      id: 'tarot-symbol',
      title: 'Mystical Gateway',
      medium: 'Digital Symbol Design',
      year: '2024',
      category: 'mystical',
      description: 'A sacred symbol designed for tarot and divination practices, incorporating both traditional and contemporary mystical elements.',
      image: '/images/gallery/tarot-symbol.png',
      dimensions: 'Vector Format',
      story: 'Created as part of the Southern Oracle Tarot deck development. This symbol serves as a gateway between the earthly and spiritual realms, honoring both African diasporic wisdom and Southern spiritual traditions.',
      techniques: ['Sacred Geometry', 'Symbol Design', 'Vector Illustration'],
      inspiration: 'Ancient symbols of protection and wisdom, adapted for contemporary spiritual practice.',
      available: true,
      price: 'Part of Tarot Deck Collection'
    },
    {
      id: 'celestial-guide',
      title: 'Stellar Navigation',
      medium: 'Digital Glyph',
      year: '2024',
      category: 'symbols',
      description: 'A celestial navigation symbol that combines astronomical accuracy with mystical aesthetics.',
      image: '/images/gallery/stars-glyph.png',
      dimensions: 'Vector Format - Multiple Sizes',
      story: 'Developed for the website\'s navigation and spiritual content. This glyph represents guidance, both literal and metaphorical—how we find our way through both physical and spiritual landscapes.',
      techniques: ['Astronomical Research', 'Glyph Design', 'Mystical Symbolism'],
      inspiration: 'The way our ancestors used stars for navigation, and how we still look to the heavens for guidance and inspiration.',
      available: false,
      price: 'Design Element'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Works', icon: '🎨', description: 'Complete collection' },
    { id: 'southern-gothic', label: 'Southern Gothic', icon: '🏚️', description: 'Atmospheric landscapes and architecture' },
    { id: 'mystical', label: 'Mystical & Ritual', icon: '🔮', description: 'Sacred imagery and spiritual symbols' },
    { id: 'symbols', label: 'Symbols & Glyphs', icon: '✨', description: 'Meaningful iconography and design elements' },
    { id: 'functional-art', label: 'Functional Art', icon: '📋', description: 'Beautiful tools for daily life' }
  ]

  const filteredArtwork = selectedCategory === 'all' 
    ? artworkItems 
    : artworkItems.filter(item => item.category === selectedCategory)

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">🖼️ Sacred Visual Stories</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Where Southern Gothic meets digital mysticism. Each piece tells a story of transformation, 
            healing, and the sacred beauty found in complexity. Art that honors both shadow and light.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter" style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-3xl)',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ fontSize: 'var(--text-sm)' }}
              title={category.description}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="portfolio-grid">
          {filteredArtwork.map((artwork) => (
            <article 
              key={artwork.id} 
              className="portfolio-item animate-slide-up"
              onClick={() => setSelectedArtwork(artwork)}
              style={{ cursor: 'pointer' }}
            >
              <div className="portfolio-image" style={{
                backgroundImage: `url(${artwork.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-md)',
                  right: 'var(--space-md)',
                  background: 'var(--bg-highlight)',
                  color: 'var(--accent-primary)',
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-semibold)',
                  border: '1px solid var(--border-primary)'
                }}>
                  {artwork.year}
                </div>
                
                <div style={{
                  position: 'absolute',
                  bottom: 'var(--space-md)',
                  left: 'var(--space-md)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'var(--text-primary)',
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)'
                }}>
                  {artwork.medium}
                </div>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-tags" style={{ marginBottom: 'var(--space-sm)' }}>
                  {artwork.techniques.slice(0, 2).map((technique, index) => (
                    <span key={index} className="portfolio-tag">
                      {technique}
                    </span>
                  ))}
                  {artwork.available && (
                    <span className="portfolio-tag" style={{ 
                      background: 'var(--sage-green)', 
                      color: 'var(--night-primary)' 
                    }}>
                      Available
                    </span>
                  )}
                </div>

                <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                  {artwork.title}
                </h3>
                
                <p className="text-body" style={{ 
                  marginBottom: 'var(--space-md)',
                  color: 'var(--text-secondary)'
                }}>
                  {artwork.description}
                </p>

                {artwork.price && (
                  <div style={{ 
                    padding: 'var(--space-sm)',
                    background: 'var(--bg-highlight)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    marginBottom: 'var(--space-md)'
                  }}>
                    <span className="text-caption" style={{ color: 'var(--accent-primary)' }}>
                      💰 {artwork.price}
                    </span>
                  </div>
                )}

                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  View Details →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Artwork Detail Modal */}
        {selectedArtwork && (
          <div 
            className="modal-overlay" 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setSelectedArtwork(null)}
          >
            <div 
              className="modal-content card"
              style={{ 
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'auto',
                margin: 'var(--space-lg)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArtwork(null)}
                style={{
                  position: 'absolute',
                  top: 'var(--space-md)',
                  right: 'var(--space-md)',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-2xl)',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>

              <div className="grid grid-2 gap-lg">
                <div>
                  <img 
                    src={selectedArtwork.image} 
                    alt={selectedArtwork.title}
                    style={{ 
                      width: '100%', 
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-md)'
                    }}
                  />
                </div>
                
                <div>
                  <h2 className="text-h2" style={{ marginBottom: 'var(--space-sm)' }}>
                    {selectedArtwork.title}
                  </h2>
                  
                  <div style={{ marginBottom: 'var(--space-md)' }}>
                    <p className="text-body"><strong>Medium:</strong> {selectedArtwork.medium}</p>
                    <p className="text-body"><strong>Year:</strong> {selectedArtwork.year}</p>
                    {selectedArtwork.dimensions && (
                      <p className="text-body"><strong>Dimensions:</strong> {selectedArtwork.dimensions}</p>
                    )}
                  </div>

                  <p className="text-body" style={{ 
                    marginBottom: 'var(--space-lg)',
                    color: 'var(--text-secondary)'
                  }}>
                    {selectedArtwork.description}
                  </p>

                  {selectedArtwork.story && (
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                      <h4 className="text-h3" style={{ 
                        color: 'var(--accent-primary)',
                        marginBottom: 'var(--space-sm)'
                      }}>
                        The Story Behind
                      </h4>
                      <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                        {selectedArtwork.story}
                      </p>
                    </div>
                  )}

                  <div style={{ marginBottom: 'var(--space-lg)' }}>
                    <h4 className="text-h3" style={{ 
                      color: 'var(--accent-primary)',
                      marginBottom: 'var(--space-sm)'
                    }}>
                      Techniques Used
                    </h4>
                    <div className="portfolio-tags">
                      {selectedArtwork.techniques.map((technique, index) => (
                        <span key={index} className="portfolio-tag">
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedArtwork.inspiration && (
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                      <h4 className="text-h3" style={{ 
                        color: 'var(--accent-primary)',
                        marginBottom: 'var(--space-sm)'
                      }}>
                        Inspiration
                      </h4>
                      <p className="text-body" style={{ 
                        fontStyle: 'italic',
                        color: 'var(--text-secondary)'
                      }}>
                        {selectedArtwork.inspiration}
                      </p>
                    </div>
                  )}

                  {selectedArtwork.available && selectedArtwork.price && (
                    <div style={{ 
                      padding: 'var(--space-lg)',
                      background: 'var(--bg-highlight)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-primary)',
                      textAlign: 'center'
                    }}>
                      <h4 className="text-h3" style={{ 
                        color: 'var(--accent-primary)',
                        marginBottom: 'var(--space-sm)'
                      }}>
                        Acquisition Information
                      </h4>
                      <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
                        💰 {selectedArtwork.price}
                      </p>
                      <button className="btn btn-primary">
                        Inquire About This Piece
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="section-divider"></div>

        {/* Commission Information */}
        <div className="card text-center">
          <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🎨 Commission Sacred Art
          </h3>
          <p className="text-body-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            Looking for custom artwork that honors your story, spiritual practice, or vision? 
            I create commissioned pieces that blend Southern Gothic aesthetics with personal meaning.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-md)', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'var(--space-lg)'
          }}>
            <button className="btn btn-primary">
              Commission Artwork 🎨
            </button>
            <button className="btn btn-secondary">
              View Commission Process
            </button>
          </div>
          <p className="text-caption" style={{ color: 'var(--text-muted)' }}>
            Custom pieces starting at $150. Sliding scale available for community members.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ArtGallerySection 