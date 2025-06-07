import React, { useState, useEffect } from 'react'
import '../styles/design-system.css'
import './ArtGallerySection.css'

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

  useEffect(() => {
    // Set background images for gallery items
    filteredArtwork.forEach((artwork) => {
      const element = document.querySelector(`[data-bg-image="${artwork.image}"]`) as HTMLElement
      if (element) {
        element.style.backgroundImage = `url(${artwork.image})`
      }
    })
  }, [filteredArtwork])

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">🖼️ Sacred Visual Stories</h2>
          <p className="text-body-lg animate-slide-up gallery-header-description">
            Where Southern Gothic meets digital mysticism. Each piece tells a story of transformation, 
            healing, and the sacred beauty found in complexity. Art that honors both shadow and light.
          </p>
        </div>

        {/* Category Filter */}
        <div className="gallery-category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn gallery-category-btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedCategory(category.id)}
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
              className="portfolio-item animate-slide-up gallery-portfolio-item"
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div 
                className="portfolio-image gallery-portfolio-image"
                data-bg-image={artwork.image}
              >
                <div className="gallery-year-badge">
                  {artwork.year}
                </div>
                
                <div className="gallery-medium-badge">
                  {artwork.medium}
                </div>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-tags gallery-portfolio-tags">
                  {artwork.techniques.slice(0, 2).map((technique, index) => (
                    <span key={index} className="portfolio-tag">
                      {technique}
                    </span>
                  ))}
                  {artwork.available && (
                    <span className="portfolio-tag gallery-available-tag">
                      Available
                    </span>
                  )}
                </div>

                <h3 className="text-h3 gallery-portfolio-title">
                  {artwork.title}
                </h3>
                
                <p className="text-body gallery-portfolio-description">
                  {artwork.description}
                </p>

                {artwork.price && (
                  <div className="gallery-price-section">
                    <span className="text-caption gallery-price-text">
                      💰 {artwork.price}
                    </span>
                  </div>
                )}

                <button className="btn btn-secondary gallery-view-details-btn">
                  View Details →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Artwork Detail Modal */}
        {selectedArtwork && (
          <div 
            className="gallery-modal-overlay"
            onClick={() => setSelectedArtwork(null)}
          >
            <div 
              className="modal-content card gallery-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArtwork(null)}
                className="gallery-modal-close"
              >
                ×
              </button>

              <div className="grid grid-2 gap-lg">
                <div>
                  <img 
                    src={selectedArtwork.image} 
                    alt={selectedArtwork.title}
                    className="gallery-modal-image"
                  />
                </div>
                
                <div>
                  <h2 className="text-h2 gallery-modal-title">
                    {selectedArtwork.title}
                  </h2>
                  
                  <div className="gallery-modal-meta">
                    <p className="text-body"><strong>Medium:</strong> {selectedArtwork.medium}</p>
                    <p className="text-body"><strong>Year:</strong> {selectedArtwork.year}</p>
                    {selectedArtwork.dimensions && (
                      <p className="text-body"><strong>Dimensions:</strong> {selectedArtwork.dimensions}</p>
                    )}
                  </div>

                  <p className="text-body gallery-modal-description">
                    {selectedArtwork.description}
                  </p>

                  {selectedArtwork.story && (
                    <div className="gallery-modal-section">
                      <h4 className="text-h3 gallery-modal-section-title">
                        The Story Behind
                      </h4>
                      <p className="text-body gallery-modal-story-text">
                        {selectedArtwork.story}
                      </p>
                    </div>
                  )}

                  <div className="gallery-modal-section">
                    <h4 className="text-h3 gallery-modal-section-title">
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
                    <div className="gallery-modal-section">
                      <h4 className="text-h3 gallery-modal-section-title">
                        Inspiration
                      </h4>
                      <p className="text-body gallery-modal-inspiration-text">
                        {selectedArtwork.inspiration}
                      </p>
                    </div>
                  )}

                  {selectedArtwork.available && selectedArtwork.price && (
                    <div className="gallery-modal-acquisition">
                      <h4 className="text-h3 gallery-modal-section-title">
                        Acquisition Information
                      </h4>
                      <p className="text-body gallery-modal-price">
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
          <h3 className="text-h2 gallery-commission-title">
            🎨 Commission Sacred Art
          </h3>
          <p className="text-body-lg gallery-commission-description">
            Looking for custom artwork that honors your story, spiritual practice, or vision? 
            I create commissioned pieces that blend Southern Gothic aesthetics with personal meaning.
          </p>
          <div className="gallery-commission-buttons">
            <button className="btn btn-primary">
              Commission Artwork 🎨
            </button>
            <button className="btn btn-secondary">
              View Commission Process
            </button>
          </div>
          <p className="text-caption gallery-commission-note">
            Custom pieces starting at $150. Sliding scale available for community members.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ArtGallerySection 