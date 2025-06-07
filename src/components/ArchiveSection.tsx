import React, { useState } from 'react'
import '../styles/design-system.css'
import './ArchiveSection.css'

interface ArchiveCollection {
  id: string
  title: string
  description: string
  icon: string
  status: 'active' | 'growing' | 'planning'
  itemCount: number
  features: string[]
  notionLink?: string
}

const ArchiveSection: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string>('genealogy')

  const archiveCollections: ArchiveCollection[] = [
    {
      id: 'genealogy',
      title: 'Ancestral Genealogy Database',
      description: 'Comprehensive digital archive documenting family lineage from Charleston, SC to New Orleans, LA, with connections to Gullah Geechee culture and sacred geography.',
      icon: '🌿',
      status: 'active',
      itemCount: 47,
      features: [
        'Family trees with census records (1870-1950)',
        'Freedmen\'s Bureau documentation',
        'Church records and burial sites',
        'Migration patterns and settlement maps',
        'Oral history recordings and transcripts',
        'Sacred site connections (Penn Center, Oyotunji)'
      ],
      notionLink: 'https://notion.so/midnightmagnolia/genealogy'
    },
    {
      id: 'spiritual',
      title: 'Spiritual Journey Archive',
      description: 'Documentation of visits to sacred sites, spiritual practices, and connections to Yoruba traditions, hoodoo, and Southern Black spiritual heritage.',
      icon: '🔮',
      status: 'growing',
      itemCount: 23,
      features: [
        'Oyotunji Village pilgrimage documentation',
        'Savannah mystical geography mapping',
        'New Orleans spiritual site visits',
        'Ritual practices and seasonal celebrations',
        'Ancestor veneration techniques',
        'Divination records and interpretations'
      ]
    },
    {
      id: 'documents',
      title: 'Historical Document Collection',
      description: 'Digitized letters, land deeds, photographs, and family artifacts creating a comprehensive record of Southern Black life and resilience.',
      icon: '📜',
      status: 'active',
      itemCount: 89,
      features: [
        'Scanned family photographs (1890s-1990s)',
        'Original letters and correspondence',
        'Land deeds and property records',
        'Religious materials and hymnals',
        'Recipe collections and food traditions',
        'Civil rights era documentation'
      ]
    },
    {
      id: 'cultural',
      title: 'Cultural Knowledge Archive',
      description: 'Living repository of Southern Black traditions, including food culture, healing practices, storytelling, and community wisdom.',
      icon: '🌾',
      status: 'growing',
      itemCount: 34,
      features: [
        'Traditional recipe collections with stories',
        'Herbal medicine and healing practices',
        'Storytelling traditions and folklore',
        'Craft techniques and textile work',
        'Music and spiritual song traditions',
        'Community organizing histories'
      ]
    },
    {
      id: 'research',
      title: 'Academic Research Database',
      description: 'Scholarly articles, books, and research materials supporting genealogy work and cultural understanding of the African diaspora in the South.',
      icon: '📚',
      status: 'planning',
      itemCount: 17,
      features: [
        'Gullah Geechee cultural research',
        'African diaspora academic papers',
        'Plantation records and analysis',
        'Migration studies and demographics',
        'Spiritual practice comparative studies',
        'Community resilience documentation'
      ]
    }
  ]

  const activeCollection = archiveCollections.find(c => c.id === selectedCollection)

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="archive-header-logo-container">
            <img 
              src="/images/logos/clearFinal1_MM_25.jpeg" 
              alt="Digital Archive"
              className="archive-header-logo"
            />
            <h2 className="text-h1 animate-fade-in">
              <div className="archive-header-title-container">
                Digital Archive & Ancestral Preservation
              </div>
            </h2>
          </div>
          <p className="text-body-lg animate-slide-up archive-header-description">
            Building comprehensive digital archives that preserve Southern Black heritage, family histories, 
            and cultural wisdom through Notion databases, digitized documents, and spiritual research.
          </p>
        </div>

        {/* Archive Overview Stats */}
        <div className="grid grid-4 gap-lg archive-stats-grid">
          <div className="card text-center">
            <div className="archive-stat-icon">📊</div>
            <h3 className="text-h2 archive-stat-number">210</h3>
            <p className="text-caption">Total Archived Items</p>
          </div>
          <div className="card text-center">
            <div className="archive-stat-icon">🗃️</div>
            <h3 className="text-h2 archive-stat-number">5</h3>
            <p className="text-caption">Active Collections</p>
          </div>
          <div className="card text-center">
            <div className="archive-stat-icon">📍</div>
            <h3 className="text-h2 archive-stat-number">8</h3>
            <p className="text-caption">Sacred Sites Documented</p>
          </div>
          <div className="card text-center">
            <div className="archive-stat-icon">🌍</div>
            <h3 className="text-h2 archive-stat-number">150+</h3>
            <p className="text-caption">Years of History</p>
          </div>
        </div>

        {/* Collection Navigation */}
        <div className="archive-collections-section">
          <h3 className="text-h2 text-center archive-collections-title">
            Archive Collections
          </h3>
          
          <div className="flex gap-sm justify-center archive-collection-nav">
            {archiveCollections.map((collection) => (
              <button
                key={collection.id}
                className={`btn archive-collection-btn ${selectedCollection === collection.id ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedCollection(collection.id)}
              >
                <span>{collection.icon}</span>
                <span>{collection.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Collection Details */}
        {activeCollection && (
          <div className="card-spirit archive-collection-details">
            <div className="grid grid-2 gap-lg">
              <div>
                <div className="archive-collection-header">
                  <div className="archive-collection-icon">{activeCollection.icon}</div>
                  <div>
                    <h3 className="text-h3 archive-collection-title">
                      {activeCollection.title}
                    </h3>
                    <div className="archive-collection-meta">
                      <span className={`portfolio-tag ${activeCollection.status === 'active' ? 'available' : ''}`}>
                        {activeCollection.status === 'active' ? '✅ Active' : 
                         activeCollection.status === 'growing' ? '🌱 Growing' : '📅 Planning'}
                      </span>
                      <span className="text-caption archive-collection-count">
                        {activeCollection.itemCount} items
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-body archive-collection-description">
                  {activeCollection.description}
                </p>

                {activeCollection.notionLink && (
                  <button className="btn btn-secondary">
                    View in Notion 📖
                  </button>
                )}
              </div>

              <div>
                <h4 className="text-h3 archive-features-title">
                  Collection Contents
                </h4>
                <ul className="archive-features-list">
                  {activeCollection.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="text-body archive-feature-item"
                    >
                      <span className="archive-feature-bullet">
                        ✨
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Notion Integration Features */}
        <div className="archive-notion-section">
          <h3 className="text-h2 text-center archive-notion-title">
            Notion Archive Infrastructure
          </h3>
          
          <div className="grid grid-3 gap-lg">
            <div className="card">
              <div className="archive-notion-icon">🗂️</div>
              <h3 className="text-h3 archive-notion-heading">
                Interconnected Databases
              </h3>
              <p className="text-body archive-notion-text">
                Relational Notion databases linking family members, locations, documents, 
                and spiritual practices across generations and geography.
              </p>
            </div>

            <div className="card">
              <div className="archive-notion-icon">🔍</div>
              <h3 className="text-h3 archive-notion-heading">
                Advanced Search & Tagging
              </h3>
              <p className="text-body archive-notion-text">
                Sophisticated tagging system for locations, time periods, spiritual practices, 
                and family connections enabling deep research and discovery.
              </p>
            </div>

            <div className="card">
              <div className="archive-notion-icon">📱</div>
              <h3 className="text-h3 archive-notion-heading">
                Mobile Research Access
              </h3>
              <p className="text-body archive-notion-text">
                Mobile-optimized Notion workspace allowing field research, 
                photo documentation, and real-time archive updates during site visits.
              </p>
            </div>

            <div className="card">
              <div className="archive-notion-icon">🔗</div>
              <h3 className="text-h3 archive-notion-heading">
                Cross-Platform Integration
              </h3>
              <p className="text-body archive-notion-text">
                Notion APIs connecting archive data to website content, 
                product generation, and automated research workflows.
              </p>
            </div>

            <div className="card">
              <div className="archive-notion-icon">📊</div>
              <h3 className="text-h3 archive-notion-heading">
                Research Analytics
              </h3>
              <p className="text-body archive-notion-text">
                Dashboard views tracking research progress, source verification, 
                and connections discovered across different archive collections.
              </p>
            </div>

            <div className="card">
              <div className="archive-notion-icon">🎯</div>
              <h3 className="text-h3 archive-notion-heading">
                Product Pipeline Integration
              </h3>
              <p className="text-body archive-notion-text">
                Archive research directly feeds into digital products, 
                tarot cards, journals, and educational materials for the shop.
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Community Access & Collaboration */}
        <div className="grid grid-2 gap-lg archive-community-section">
          <div className="card">
            <h3 className="text-h2 archive-community-title">
              🤝 Community Archive Project
            </h3>
            <p className="text-body archive-community-text">
              Building collaborative archive spaces where families can contribute their own 
              stories, documents, and cultural knowledge to preserve Southern Black heritage collectively.
            </p>
            <div className="archive-community-text">
              <h4 className="text-h3 archive-community-heading">How to Contribute:</h4>
              <ul className="archive-community-list">
                <li className="archive-community-item">
                  📝 Share family stories and oral histories
                </li>
                <li className="archive-community-item">
                  📷 Submit historical photographs with context
                </li>
                <li className="archive-community-item">
                  📍 Add sacred sites and spiritual locations
                </li>
                <li className="archive-community-item">
                  🍲 Contribute recipes and cultural practices
                </li>
              </ul>
            </div>
            <button className="btn btn-primary">
              Join Archive Project
            </button>
          </div>

          <div className="card">
            <h3 className="text-h2 archive-community-title">
              📚 Research Methodology
            </h3>
            <p className="text-body archive-community-text">
              Trauma-informed approach to genealogy research that honors both the pain 
              and resilience in our family histories while building healing-centered archives.
            </p>
            <div className="archive-community-text">
              <h4 className="text-h3 archive-community-heading">Core Principles:</h4>
              <ul className="archive-community-list">
                <li className="archive-community-item">
                  💚 Center healing and wellness in research
                </li>
                <li className="archive-community-item">
                  🌱 Honor both trauma and triumph equally
                </li>
                <li className="archive-community-item">
                  🔒 Protect sensitive family information
                </li>
                <li className="archive-community-item">
                  ✨ Create beauty from difficult histories
                </li>
              </ul>
            </div>
            <button className="btn btn-secondary">
              Research Guidelines
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card text-center">
          <h3 className="text-h2 archive-cta-title">
            🌱 Growing the Digital Archive
          </h3>
          <p className="text-body-lg archive-cta-text">
            This archive work is ongoing, growing with each new discovery, family connection, 
            and spiritual insight. Join us in preserving and celebrating Southern Black heritage 
            through thoughtful digital curation.
          </p>
          <div className="archive-cta-buttons">
            <button className="btn btn-primary">
              Explore Full Archive 📖
            </button>
            <button className="btn btn-secondary">
              Contribute Stories 📝
            </button>
            <button className="btn btn-ghost">
              Research Resources 🔍
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArchiveSection 