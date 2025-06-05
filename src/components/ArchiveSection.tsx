import React, { useState } from 'react'
import '../styles/design-system.css'

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
      itemCount: 247,
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
      itemCount: 89,
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
      itemCount: 156,
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
      itemCount: 134,
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
      itemCount: 67,
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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-lg)'
          }}>
            <img 
              src="/images/logos/clearFinal1_MM_25.jpeg" 
              alt="Digital Archive"
              style={{ 
                width: '45px', 
                height: '45px',
                opacity: 0.8
              }}
            />
            <h2 className="text-h1 animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                Digital Archive & Ancestral Preservation
              </div>
            </h2>
          </div>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Building comprehensive digital archives that preserve Southern Black heritage, family histories, 
            and cultural wisdom through Notion databases, digitized documents, and spiritual research.
          </p>
        </div>

        {/* Archive Overview Stats */}
        <div className="grid grid-4 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>📊</div>
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)' }}>693</h3>
            <p className="text-caption">Total Archived Items</p>
          </div>
          <div className="card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>🗃️</div>
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)' }}>5</h3>
            <p className="text-caption">Active Collections</p>
          </div>
          <div className="card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>📍</div>
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)' }}>8</h3>
            <p className="text-caption">Sacred Sites Documented</p>
          </div>
          <div className="card text-center">
            <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>🌍</div>
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)' }}>150+</h3>
            <p className="text-caption">Years of History</p>
          </div>
        </div>

        {/* Collection Navigation */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            Archive Collections
          </h3>
          
          <div className="flex gap-sm justify-center" style={{ flexWrap: 'wrap' }}>
            {archiveCollections.map((collection) => (
              <button
                key={collection.id}
                className={`btn ${selectedCollection === collection.id ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setSelectedCollection(collection.id)}
                style={{ fontSize: 'var(--text-sm)' }}
              >
                <span>{collection.icon}</span>
                <span>{collection.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Collection Details */}
        {activeCollection && (
          <div className="card-spirit" style={{ marginBottom: 'var(--space-3xl)' }}>
            <div className="grid grid-2 gap-lg">
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-sm)',
                  marginBottom: 'var(--space-md)'
                }}>
                  <div style={{ fontSize: 'var(--text-3xl)' }}>{activeCollection.icon}</div>
                  <div>
                    <h3 className="text-h3" style={{ marginBottom: 'var(--space-xs)' }}>
                      {activeCollection.title}
                    </h3>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                      <span className={`portfolio-tag ${activeCollection.status === 'active' ? 'available' : ''}`}>
                        {activeCollection.status === 'active' ? '✅ Active' : 
                         activeCollection.status === 'growing' ? '🌱 Growing' : '📅 Planning'}
                      </span>
                      <span className="text-caption" style={{ color: 'var(--text-muted)' }}>
                        {activeCollection.itemCount} items
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-body" style={{ 
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  {activeCollection.description}
                </p>

                {activeCollection.notionLink && (
                  <button className="btn btn-secondary">
                    View in Notion 📖
                  </button>
                )}
              </div>

              <div>
                <h4 className="text-h3" style={{ 
                  marginBottom: 'var(--space-md)',
                  color: 'var(--accent-primary)'
                }}>
                  Collection Contents
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {activeCollection.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="text-body"
                      style={{ 
                        marginBottom: 'var(--space-sm)',
                        paddingLeft: 'var(--space-md)',
                        position: 'relative'
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
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Notion Integration Features */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            Notion Archive Infrastructure
          </h3>
          
          <div className="grid grid-3 gap-lg">
            <div className="card">
              <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>🗂️</div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Interconnected Databases
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Relational Notion databases linking family members, locations, documents, 
                and spiritual practices across generations and geography.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>🔍</div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Advanced Search & Tagging
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Sophisticated tagging system for locations, time periods, spiritual practices, 
                and family connections enabling deep research and discovery.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>📱</div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Mobile Research Access
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Mobile-optimized Notion workspace allowing field research, 
                photo documentation, and real-time archive updates during site visits.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>🔗</div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Cross-Platform Integration
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Notion APIs connecting archive data to website content, 
                product generation, and automated research workflows.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>📊</div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Research Analytics
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Dashboard views tracking research progress, source verification, 
                and connections discovered across different archive collections.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>🎯</div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Product Pipeline Integration
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Archive research directly feeds into digital products, 
                tarot cards, journals, and educational materials for the shop.
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Community Access & Collaboration */}
        <div className="grid grid-2 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="card">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>
              🤝 Community Archive Project
            </h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              Building collaborative archive spaces where families can contribute their own 
              stories, documents, and cultural knowledge to preserve Southern Black heritage collectively.
            </p>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>How to Contribute:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  📝 Share family stories and oral histories
                </li>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  📷 Submit historical photographs with context
                </li>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  📍 Add sacred sites and spiritual locations
                </li>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  🍲 Contribute recipes and cultural practices
                </li>
              </ul>
            </div>
            <button className="btn btn-primary">
              Join Archive Project
            </button>
          </div>

          <div className="card">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>
              📚 Research Methodology
            </h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              Trauma-informed approach to genealogy research that honors both the pain 
              and resilience in our family histories while building healing-centered archives.
            </p>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Core Principles:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  💚 Center healing and wellness in research
                </li>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  🌱 Honor both trauma and triumph equally
                </li>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
                  🔒 Protect sensitive family information
                </li>
                <li style={{ marginBottom: 'var(--space-xs)' }}>
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
          <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🌱 Growing the Digital Archive
          </h3>
          <p className="text-body-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            This archive work is ongoing, growing with each new discovery, family connection, 
            and spiritual insight. Join us in preserving and celebrating Southern Black heritage 
            through thoughtful digital curation.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-md)', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
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

      <style jsx>{`
        .portfolio-tag.available {
          background: var(--bg-highlight);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }
      `}</style>
    </section>
  )
}

export default ArchiveSection 