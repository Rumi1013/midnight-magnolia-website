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
        <div className="section-header">
          <div className="shop-header">
            <img 
              src="/images/logos/goldenFinal22_MM_25.png" 
              alt="Midnight Magnolia Premium"
              className="shop-header-logo-main"
            />
            <h2 className="text-h1 animate-fade-in">
              <div className="shop-header-title">
                <img 
                  src="/images/logos/clearFinal2_MM_25.jpeg" 
                  alt="Digital Sanctuary"
                  className="shop-header-logo-secondary"
                />
                Digital Sanctuary Shop
              </div>
            </h2>
          </div>
          <p className="text-body-lg animate-slide-up shop-description">
            Healing-centered digital tools, spiritual resources, and community care materials. 
            Each purchase supports ongoing justice work and community organizing efforts.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter shop-category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'} shop-category-button`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-3 gap-lg shop-products-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card card animate-slide-up shop-product-card">
              {product.bestseller && (
                <div className="shop-bestseller-badge">
                  ✨ BESTSELLER
                </div>
              )}

              <div className="product-image shop-product-image">
                {product.category === 'business' && '💼'}
                {product.category === 'design' && '🎨'}
                {product.category === 'automation' && '🤖'}
                {product.category === 'mystical' && '🔮'}
                {product.category === 'planning' && '📝'}
              </div>

              <div className="product-header shop-product-header">
                <h3 className="text-h3 shop-product-title">
                  {product.title}
                </h3>
                <div className="product-pricing shop-product-pricing">
                  <span className="current-price text-h2 shop-current-price">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="original-price text-body shop-original-price">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-body shop-product-description">
                  {product.description}
                </p>
              </div>

              <div className="product-features shop-product-features">
                <h4 className="text-h3 shop-features-title">
                  What's Included:
                </h4>
                <ul className="shop-features-list">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li 
                      key={index}
                      className="text-body shop-feature-item"
                    >
                      <span className="shop-feature-icon">
                        ✨
                      </span>
                      {feature}
                    </li>
                  ))}
                  {product.features.length > 4 && (
                    <li className="text-caption shop-additional-features">
                      + {product.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              <div className="shop-product-cta">
                {product.comingSoon ? (
                  <button type="button" className="btn btn-ghost shop-cta-button" disabled>
                    🌱 Sprouting Soon
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary shop-cta-button">
                    Add to Cart 🛒
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Shop Features */}
        <div className="shop-features grid grid-3 gap-lg shop-features-section">
          <div className="feature-card card text-center">
            <div className="shop-feature-icon-large">💝</div>
            <h3 className="text-h3 shop-feature-title">Instant Access</h3>
            <p className="text-body">
              Download immediately after purchase. All products include lifetime updates 
              and access to our private community.
            </p>
          </div>
          
          <div className="feature-card card text-center">
            <div className="shop-feature-icon-large">🌙</div>
            <h3 className="text-h3 shop-feature-title">ADHD-Friendly</h3>
            <p className="text-body">
              Every resource is designed with neurodivergent entrepreneurs in mind—
              clear, accessible, and gentle on your nervous system.
            </p>
          </div>
          
          <div className="feature-card card text-center">
            <div className="shop-feature-icon-large">💚</div>
            <h3 className="text-h3 shop-feature-title">30-Day Guarantee</h3>
            <p className="text-body">
              If our products don't serve your healing journey, we'll refund your investment
              with no questions asked.
            </p>
          </div>
        </div>

        {/* Community Support */}
        <div className="card text-center">
          <h3 className="text-h2 shop-community-title">
            🌸 Join Our Creative Community
          </h3>
          <p className="text-body-lg shop-community-description">
            Every purchase includes access to our private Discord community where you can 
            connect with other healing-centered entrepreneurs, get implementation support, 
            and share your journey.
          </p>
          <div className="community-stats shop-community-stats">
            <div className="stat">
              <div className="text-h2 shop-stat-number">500+</div>
              <div className="text-caption">Community Members</div>
            </div>
            <div className="stat">
              <div className="text-h2 shop-stat-number">4.9/5</div>
              <div className="text-caption">Average Rating</div>
            </div>
            <div className="stat">
              <div className="text-h2 shop-stat-number">98%</div>
              <div className="text-caption">Satisfaction Rate</div>
            </div>
          </div>
          <button type="button" className="btn btn-secondary">
            Learn More About Community
          </button>
        </div>
      </div>
    </section>
  )
}

export default ShopSection 