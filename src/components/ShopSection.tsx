import React, { useState } from 'react'
import '../styles/design-system.css'

interface DigitalProduct {
  id: string
  title: string
  price: string
  originalPrice?: string
  category: string
  description: string
  features: string[]
  image: string
  bestseller?: boolean
  comingSoon?: boolean
}

const ShopSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const digitalProducts: DigitalProduct[] = [
    {
      id: 'entrepreneur-kit',
      title: 'Digital Entrepreneur Starter Kit',
      price: '$37',
      originalPrice: '$49',
      category: 'business',
      description: 'Everything you need to launch your healing-centered digital business. Created specifically for neurodivergent entrepreneurs.',
      features: [
        'Business plan template for creatives',
        'ADHD-friendly workflow systems',
        'Brand messaging workbook',
        'Social media content templates',
        'Financial tracking spreadsheets',
        'Community-building strategies guide'
      ],
      image: '/images/gallery/digital-entrepreneur-kit.png',
      bestseller: true
    },
    {
      id: 'brand-identity',
      title: 'Brand Identity Workbook',
      price: '$29',
      category: 'design',
      description: 'Deep dive into your authentic brand essence with this comprehensive workbook rooted in Southern wisdom.',
      features: [
        'Brand archaeology exercises',
        'Values clarification prompts',
        'Visual identity guidelines',
        'Voice and tone development',
        'Target audience research templates',
        'Brand story framework'
      ],
      image: '/images/gallery/brand-identity-workbook.png'
    },
    {
      id: 'automation-templates',
      title: 'Automation Workflow Templates',
      price: '$49',
      category: 'automation',
      description: 'Gentle automation workflows for Make.com that respect your energy and support sustainable business growth.',
      features: [
        '10 Make.com workflow templates',
        'Email automation sequences',
        'Social media scheduling flows',
        'Client onboarding automation',
        'Invoice and payment tracking',
        'ADHD-friendly system documentation'
      ],
      image: '/images/gallery/automation-templates.png'
    },
    {
      id: 'southern-oracle-deck',
      title: 'Southern Oracle Tarot Deck',
      price: 'Coming Soon',
      category: 'mystical',
      description: '78-card tarot deck featuring historical Black figures as personas, with healing-centered interpretations.',
      features: [
        '78 custom-designed cards',
        'Historical Black figure personas',
        'Healing-centered interpretations',
        'Digital and print versions',
        'Companion guidebook',
        'Journal prompts for each card'
      ],
      image: '/images/gallery/southern-oracle-preview.png',
      comingSoon: true
    },
    {
      id: 'digital-grimoire',
      title: 'Digital Grimoire Planner',
      price: '$25',
      category: 'planning',
      description: 'ADHD-friendly digital planning system that honors your cycles and supports gentle productivity.',
      features: [
        'Monthly and weekly planning pages',
        'Energy tracking templates',
        'Project management layouts',
        'Ritual and self-care prompts',
        'Financial tracking pages',
        'Compatibility with GoodNotes and Notability'
      ],
      image: '/images/gallery/gothic-digital-planner.png'
    },
    {
      id: 'content-templates',
      title: 'Southern Gothic Social Templates',
      price: '$19',
      category: 'design',
      description: 'Mystical social media templates that capture the essence of Southern Gothic aesthetic.',
      features: [
        '50+ Instagram post templates',
        'Story highlight covers',
        'Pinterest pin designs',
        'Quote card templates',
        'Event announcement layouts',
        'Canva and Photoshop versions'
      ],
      image: '/images/gallery/social-templates.png'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Products', icon: '🌟' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'automation', label: 'Automation', icon: '🤖' },
    { id: 'mystical', label: 'Mystical', icon: '🔮' },
    { id: 'planning', label: 'Planning', icon: '📝' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? digitalProducts 
    : digitalProducts.filter(product => product.category === selectedCategory)

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h1 animate-fade-in">🛍️ Digital Sanctuary Shop</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Thoughtfully crafted digital tools and resources to support your healing journey, 
            creative practice, and business growth. Each product is designed with neurodivergent 
            entrepreneurs and community builders in mind.
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
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-3 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card card animate-slide-up" style={{ 
              position: 'relative',
              minHeight: '500px'
            }}>
              {product.bestseller && (
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-sm)',
                  right: 'var(--space-sm)',
                  background: 'var(--accent-primary)',
                  color: 'var(--night-primary)',
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-bold)',
                  zIndex: 2
                }}>
                  ✨ BESTSELLER
                </div>
              )}

              <div className="product-image" style={{
                width: '100%',
                height: '200px',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-4xl)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>
                {product.category === 'business' && '💼'}
                {product.category === 'design' && '🎨'}
                {product.category === 'automation' && '🤖'}
                {product.category === 'mystical' && '🔮'}
                {product.category === 'planning' && '📝'}
              </div>

              <div className="product-header" style={{ marginBottom: 'var(--space-md)' }}>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-xs)' }}>
                  {product.title}
                </h3>
                <div className="product-pricing" style={{ marginBottom: 'var(--space-sm)' }}>
                  <span className="current-price text-h2" style={{ 
                    color: 'var(--accent-primary)',
                    fontWeight: 'var(--weight-bold)'
                  }}>
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="original-price text-body" style={{ 
                      textDecoration: 'line-through',
                      color: 'var(--text-muted)',
                      marginLeft: 'var(--space-sm)'
                    }}>
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  {product.description}
                </p>
              </div>

              <div className="product-features" style={{ marginBottom: 'var(--space-lg)' }}>
                <h4 className="text-h3" style={{ 
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--accent-primary)',
                  fontSize: 'var(--text-lg)'
                }}>
                  What's Included:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li 
                      key={index}
                      className="text-body"
                      style={{ 
                        marginBottom: 'var(--space-xs)',
                        paddingLeft: 'var(--space-sm)',
                        position: 'relative',
                        fontSize: 'var(--text-sm)'
                      }}
                    >
                      <span style={{ 
                        position: 'absolute',
                        left: 0,
                        color: 'var(--accent-primary)'
                      }}>
                        ✨
                      </span>
                      {feature}
                    </li>
                  ))}
                  {product.features.length > 4 && (
                    <li className="text-caption" style={{ 
                      fontStyle: 'italic',
                      color: 'var(--text-muted)',
                      paddingLeft: 'var(--space-sm)'
                    }}>
                      + {product.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              <div style={{ 
                position: 'absolute',
                bottom: 'var(--space-lg)',
                left: 'var(--space-lg)',
                right: 'var(--space-lg)'
              }}>
                {product.comingSoon ? (
                  <button className="btn btn-ghost" style={{ width: '100%' }} disabled>
                    🌱 Sprouting Soon
                  </button>
                ) : (
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Add to Cart 🛒
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Shop Features */}
        <div className="shop-features grid grid-3 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="feature-card card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>💝</div>
            <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Instant Access</h3>
            <p className="text-body">
              Download immediately after purchase. All products include lifetime updates 
              and access to our private community.
            </p>
          </div>
          
          <div className="feature-card card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>🌙</div>
            <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>ADHD-Friendly</h3>
            <p className="text-body">
              Every resource is designed with neurodivergent entrepreneurs in mind—
              clear, accessible, and gentle on your nervous system.
            </p>
          </div>
          
          <div className="feature-card card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>💚</div>
            <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>30-Day Guarantee</h3>
            <p className="text-body">
              If our products don't serve your healing journey, we'll refund your investment
              with no questions asked.
            </p>
          </div>
        </div>

        {/* Community Support */}
        <div className="card text-center">
          <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🌸 Join Our Creative Community
          </h3>
          <p className="text-body-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            Every purchase includes access to our private Discord community where you can 
            connect with other healing-centered entrepreneurs, get implementation support, 
            and share your journey.
          </p>
          <div className="community-stats" style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-lg)'
          }}>
            <div className="stat">
              <div className="text-h2" style={{ color: 'var(--accent-primary)' }}>500+</div>
              <div className="text-caption">Community Members</div>
            </div>
            <div className="stat">
              <div className="text-h2" style={{ color: 'var(--accent-primary)' }}>4.9/5</div>
              <div className="text-caption">Average Rating</div>
            </div>
            <div className="stat">
              <div className="text-h2" style={{ color: 'var(--accent-primary)' }}>98%</div>
              <div className="text-caption">Satisfaction Rate</div>
            </div>
          </div>
          <button className="btn btn-secondary">
            Learn More About Community
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShopSection 