import React, { useState } from 'react'
import '../styles/design-system.css'

interface ResourceCategory {
  id: string
  title: string
  icon: string
  description: string
  resources: Resource[]
}

interface Resource {
  title: string
  description: string
  type: 'guide' | 'template' | 'tool' | 'partnership'
  status: 'available' | 'in-development' | 'planning'
}

const JusticeResources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('parole')

  const resourceCategories: ResourceCategory[] = [
    {
      id: 'parole',
      title: 'Parole Package Guidelines',
      icon: '📋',
      description: 'Comprehensive guides to help incarcerated individuals and their families develop effective parole packages that tell their story and demonstrate readiness for release. Proper preparation can significantly reduce legal consultation costs and improve hearing outcomes.',
      resources: [
        {
          title: 'Parole Package Development Workbook',
          description: 'Step-by-step guide for building compelling parole packages that center human dignity and transformation.',
          type: 'guide',
          status: 'available'
        },
        {
          title: 'Family Support Letter Templates',
          description: 'Templates and guidance for family members writing support letters for parole hearings.',
          type: 'template',
          status: 'available'
        },
        {
          title: 'Employment Verification Tools',
          description: 'Resources for securing and documenting employment opportunities post-release.',
          type: 'tool',
          status: 'in-development'
        },
        {
          title: 'Housing Plan Development',
          description: 'Guidelines for creating stable housing plans that parole boards find credible.',
          type: 'guide',
          status: 'available'
        }
      ]
    },
    {
      id: 'arrest',
      title: 'Know Your Rights: Arrest Resources',
      icon: '🛡️',
      description: 'Essential information for anyone facing arrest, including immediate steps, legal rights, and community support resources. Understanding your rights and proper procedures can help avoid costly mistakes and ensure better legal representation when needed.',
      resources: [
        {
          title: 'Immediate Response Checklist',
          description: 'Quick reference card for the first 24 hours after arrest - what to do and what not to do.',
          type: 'guide',
          status: 'available'
        },
        {
          title: 'Family Notification Templates',
          description: 'Scripts and templates for arrested individuals to communicate essential information to family.',
          type: 'template',
          status: 'available'
        },
        {
          title: 'Bail Fund Connection Guide',
          description: 'How to access community bail funds and mutual aid networks during crisis.',
          type: 'tool',
          status: 'available'
        },
        {
          title: 'Legal Rights Reference',
          description: 'Pocket-sized cards with Miranda rights, lawyer contact protocols, and interrogation guidance.',
          type: 'guide',
          status: 'in-development'
        }
      ]
    },
    {
      id: 'exodus',
      title: 'Project Exodus: Expungement & Pardons',
      icon: '🗝️',
      description: 'Initiative developed with Black Liberation Fund, SC Legal Services, Root & Rebound, and Inspire 60 to make record clearing accessible to our communities. These partnerships help navigate South Carolina\'s complex legal landscape while controlling the typically steep costs of expungement and pardon processes.',
      resources: [
        {
          title: 'Expungement Eligibility Assessment',
          description: 'Self-assessment tool to determine eligibility for record expungement in South Carolina.',
          type: 'tool',
          status: 'available'
        },
        {
          title: 'Pardon Application Support',
          description: 'Guidance for navigating the gubernatorial pardon process with dignity and strategy.',
          type: 'guide',
          status: 'available'
        },
        {
          title: 'SC Legal Services Partnership Portal',
          description: 'Direct connection to legal aid services for qualifying individuals.',
          type: 'partnership',
          status: 'available'
        },
        {
          title: 'Root & Rebound Collaboration',
          description: 'Access to national expertise on record clearing and reentry support.',
          type: 'partnership',
          status: 'available'
        },
        {
          title: 'Inspire 60 Community Connection',
          description: 'Peer support network for individuals navigating record clearing processes.',
          type: 'partnership',
          status: 'available'
        }
      ]
    }
  ]

  const activeResources = resourceCategories.find(cat => cat.id === activeCategory)

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
              src="/images/logos/clearFinal4_MM_25.jpeg" 
              alt="Justice Work"
              style={{ 
                width: '38px', 
                height: '38px',
                opacity: 0.8
              }}
            />
            <h2 className="text-h1 animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <img 
                  src="/images/logos/clearFinal4_MM_25.jpeg" 
                  alt="Justice Work"
                  style={{ 
                    width: '38px', 
                    height: '38px',
                    opacity: 0.8
                  }}
                />
                Justice Resources
              </div>
            </h2>
          </div>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Born from my Soros Justice Fellowship work, these resources help people navigate 
            the legal system with dignity and access. Educational materials to demystify complex 
            processes and support community liberation.
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="card" style={{ 
          marginBottom: 'var(--space-3xl)', 
          border: '2px solid var(--accent-secondary)',
          background: 'var(--bg-highlight)'
        }}>
          <h2 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            ⚖️ Legal Notice & Educational Purpose
          </h2>
          <div className="text-center">
            <p className="text-body" style={{ 
              marginBottom: 'var(--space-md)',
              fontWeight: 'var(--weight-medium)'
            }}>
              <strong>Educational Resources Only:</strong> All information provided here is for 
              educational purposes only and does not substitute the advice of an attorney, which 
              is recommended for the best outcome in any legal matter.
            </p>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              However, these resources are designed to help you understand the legal process, 
              prepare necessary documentation, and navigate the system more effectively - 
              <strong>helping you control the steep legal expenses in South Carolina</strong> by 
              being better prepared for attorney consultations and court proceedings.
            </p>
            <p className="text-body" style={{ 
              fontStyle: 'italic',
              color: 'var(--text-secondary)'
            }}>
              Knowledge is power, and preparation reduces costs. These tools help you make the 
              most of professional legal assistance when you can access it.
            </p>
          </div>
        </div>

        {/* Fellowship Context */}
        <div className="card card-marigold" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            🏛️ Soros Justice Fellowship Legacy
          </h2>
          <div className="grid grid-2 gap-lg">
            <div>
              <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
                This ecosystem emerged from my Soros Justice Fellowship research into barriers 
                facing formerly incarcerated individuals seeking reintegration. The fellowship 
                revealed systematic gaps in accessible legal resources and community support.
              </p>
              <p className="text-body">
                Working with Black Liberation Fund, I developed partnerships with SC Legal Services, 
                Root & Rebound, and Inspire 60 to create comprehensive, culturally responsive 
                resources that center human dignity and community wisdom.
              </p>
            </div>
            <div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)', color: 'var(--accent-primary)' }}>
                🤝 Community Partnerships
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>
                  • <strong>Black Liberation Fund</strong> - Community organizing and mutual aid
                </li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>
                  • <strong>SC Legal Services</strong> - Legal aid and advocacy
                </li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>
                  • <strong>Root & Rebound</strong> - National reentry expertise
                </li>
                <li className="text-body">
                  • <strong>Inspire 60</strong> - Peer support and community connection
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resource Categories */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            📚 Resource Categories
          </h2>
          
          {/* Category Navigation */}
          <div className="flex gap-sm justify-center" style={{ marginBottom: 'var(--space-2xl)', flexWrap: 'wrap' }}>
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.icon}</span>
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Details */}
          {activeResources && (
            <div className="card card-spirit">
              <div className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                  {activeResources.icon}
                </div>
                <h3 className="text-h2" style={{ marginBottom: 'var(--space-sm)' }}>
                  {activeResources.title}
                </h3>
                <p className="text-body-lg" style={{ color: 'var(--text-secondary)' }}>
                  {activeResources.description}
                </p>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-2 gap-lg">
                {activeResources.resources.map((resource, index) => (
                  <div key={index} className="card" style={{ background: 'var(--bg-card-hover)' }}>
                    <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-sm)' }}>
                      <h4 className="text-h3" style={{ color: 'var(--accent-primary)' }}>
                        {resource.title}
                      </h4>
                      <span className={`portfolio-tag ${resource.status === 'available' ? 'available' : ''}`}>
                        {resource.status === 'available' ? '✅ Available' : 
                         resource.status === 'in-development' ? '🔨 In Development' : '📅 Planning'}
                      </span>
                    </div>
                    <p className="text-body" style={{ 
                      color: 'var(--text-secondary)', 
                      marginBottom: 'var(--space-md)' 
                    }}>
                      {resource.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="portfolio-tag">
                        {resource.type === 'guide' ? '📖 Guide' :
                         resource.type === 'template' ? '📝 Template' :
                         resource.type === 'tool' ? '🔧 Tool' : '🤝 Partnership'}
                      </span>
                      <button className="btn btn-ghost" style={{ fontSize: 'var(--text-sm)' }}>
                        {resource.status === 'available' ? 'Access Resource' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Access & Support */}
        <div className="grid grid-2 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="card">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>
              💚 Free Access, Community Supported
            </h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              All resources are provided at no cost to individuals and families navigating the 
              justice system. This work is sustained through donations to Black Liberation Fund 
              and community mutual aid.
            </p>
            <button className="btn btn-primary">
              Support Black Liberation Fund
            </button>
          </div>

          <div className="card">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>
              🛡️ Trauma-Informed Approach
            </h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              Every resource is designed with understanding of the trauma, stress, and systemic 
              barriers faced by justice-involved individuals and their families. Clear language, 
              step-by-step guidance, and emotional support are built into every tool.
            </p>
            <button className="btn btn-ghost">
              Learn About Our Approach
            </button>
          </div>
        </div>

        {/* South Carolina Specific Challenges */}
        <div className="card card-spirit" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            🏛️ Addressing South Carolina's Legal Challenges
          </h3>
          <div className="grid grid-3 gap-lg">
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>💰</div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Cost Control</h4>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Legal fees in SC can be overwhelming. Our resources help you prepare thoroughly, 
                reducing attorney consultation time and improving case outcomes.
              </p>
            </div>
            
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>📋</div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Complex Procedures</h4>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                SC's legal processes can be confusing. Step-by-step guides break down complex 
                procedures into manageable steps with clear timelines.
              </p>
            </div>
            
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>🤝</div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Community Support</h4>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Partnership network provides local expertise and peer support specific to 
                South Carolina's legal landscape and community resources.
              </p>
            </div>
          </div>
        </div>

        {/* Legacy Statement */}
        <div className="card card-highlight text-center">
          <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🌱 Preserving Black Liberation Fund Legacy
          </h3>
          <p className="text-body-lg" style={{ 
            marginBottom: 'var(--space-lg)',
            maxWidth: '700px',
            margin: '0 auto var(--space-lg)'
          }}>
            This work honors the vision and organizing efforts of Black Liberation Fund, ensuring 
            that resources developed through fellowship research and community collaboration remain 
            accessible to those who need them most. This platform preserves and extends our 
            collective organizing legacy.
          </p>
          <p className="text-body" style={{ 
            fontStyle: 'italic',
            color: 'var(--text-muted)'
          }}>
            "Justice delayed is justice denied, but justice work sustained is justice multiplied."
          </p>
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

export default JusticeResources 