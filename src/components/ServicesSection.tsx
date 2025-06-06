import React, { useState } from 'react'
import '../styles/design-system.css'

interface Service {
  id: string
  icon: string
  title: string
  subtitle: string
  description: string
  offerings: string[]
}

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null)

  const services: Service[] = [
    {
      id: 'civil-docs',
      icon: '⚖️',
      title: 'Justice Resource Ecosystem',
      subtitle: 'Soros Justice Fellowship Legacy Project',
      description: 'Comprehensive legal resource platform born from fellowship research and community organizing with Black Liberation Fund.',
      offerings: [
        'Parole Package Development Guidelines',
        'Know Your Rights: Arrest Resource Guide',
        'Project Exodus: Expungement & Pardon Initiative',
        'Partnership resources with SC Legal Services',
        'Root & Rebound collaboration tools',
        'Inspire 60 community connections',
        'Sliding scale access with donation support',
        'Black Liberation Fund legacy preservation'
      ]
    },
    {
      id: 'documents',
      icon: '📜',
      title: 'Document Alchemy',
      subtitle: 'Transforming ideas into polished, accessible content',
      description: 'Transform your vision into words that heal and guide.',
      offerings: [
        'Brand guides rooted in your truth',
        'Curriculum that centers care', 
        'Technical docs with tender language',
        'Grant proposals with justice narratives',
        'Community education materials',
        'Policy briefs and advocacy documents'
      ]
    },
    {
      id: 'automation',
      icon: '🤖',
      title: 'Automation Rituals',
      subtitle: 'Gentle productivity for tender nervous systems',
      description: 'Workflows that breathe with your rhythm.',
      offerings: [
        'Make.com workflows for ADHD-friendly automation',
        'Notion + Airtable content systems',
        'Email sequences via HubSpot/Mailchimp',
        'Custom AI prompts for creative support',
        'CRM setup for community organizations',
        'Social media scheduling systems'
      ]
    },
    {
      id: 'web',
      icon: '🕸️',
      title: 'Web Weaving',
      subtitle: 'Sites that feel like coming home',
      description: 'Digital spaces infused with magnolia energy.',
      offerings: [
        'Southern Gothic design with React',
        'Responsive healing spaces',
        'E-commerce gardens with soul',
        'Community hubs with gentle boundaries',
        'Portfolio sanctuaries for creatives',
        'Event registration and management sites'
      ]
    },
    {
      id: 'research',
      icon: '📚',
      title: 'Research & Strategy',
      subtitle: 'Deep roots, clear vision',
      description: 'Uncovering authentic paths forward.',
      offerings: [
        'Brand archaeology sessions',
        'SEO with soul and intention',
        'Community needs assessment',
        'Tech stack consulting that supports',
        'Digital literacy program development',
        'Organizational capacity evaluations'
      ]
    },
    {
      id: 'events',
      icon: '🎨',
      title: 'Event Planning & Curation',
      subtitle: 'Gatherings that ground and inspire',
      description: 'Sacred spaces for connection and growth.',
      offerings: [
        'Virtual workshop design',
        'Digital retreat planning',
        'Launch ceremonies as sacred moments',
        'Hybrid experiences that bridge worlds',
        'Community listening sessions',
        'Educational conference coordination'
      ]
    },
    {
      id: 'artwork',
      icon: '🖼️',
      title: 'Digital Commission Artwork',
      subtitle: 'Sacred geometry meets Southern Gothic',
      description: 'Visual symbols that carry meaning.',
      offerings: [
        'Brand iconography and sigils',
        'Tarot card designs for modern mystics',
        'Social media templates in your palette',
        'Digital altar pieces for sacred spaces',
        'Educational infographics',
        'Community event graphics'
      ]
    }
  ]

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h1 animate-fade-in">🌿 Service Constellation</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Each service is a doorway to transformation, a chance to center healing in our digital spaces. 
            Technology that serves rather than extracts, workflows that honor your rhythm.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-3 gap-lg" style={{ marginBottom: 'var(--space-3xl)' }}>
          {services.map((service) => (
            <article 
              key={service.id}
              className={`service-card card ${activeService === service.id ? 'card-highlight' : ''} animate-slide-up`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              style={{ 
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                position: 'relative',
                minHeight: '400px'
              }}
            >
              <div className="service-header text-center" style={{ marginBottom: 'var(--space-lg)' }}>
                <div className="service-icon" style={{ 
                  fontSize: 'var(--text-4xl)', 
                  marginBottom: 'var(--space-md)',
                  transition: 'transform var(--transition-normal)'
                }}>
                  {service.icon}
                </div>
                <h3 className="text-h2" style={{ marginBottom: 'var(--space-xs)' }}>
                  {service.title}
                </h3>
                <p className="text-caption" style={{ 
                  color: 'var(--accent-primary)',
                  fontStyle: 'italic',
                  marginBottom: 'var(--space-sm)'
                }}>
                  {service.subtitle}
                </p>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
              </div>

              <div className="service-offerings">
                <h4 className="text-h3" style={{ 
                  marginBottom: 'var(--space-md)',
                  color: 'var(--accent-primary)'
                }}>
                  Sacred Offerings:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {service.offerings.map((offering, index) => (
                    <li 
                      key={index}
                      className="text-body"
                      style={{ 
                        marginBottom: 'var(--space-xs)',
                        paddingLeft: 'var(--space-sm)',
                        position: 'relative'
                      }}
                    >
                      <span style={{ 
                        position: 'absolute',
                        left: 0,
                        color: 'var(--accent-primary)'
                      }}>
                        •
                      </span>
                      {offering}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ 
                position: 'absolute',
                bottom: 'var(--space-lg)',
                left: 'var(--space-lg)',
                right: 'var(--space-lg)'
              }}>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  Plant this seed →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pricing Philosophy */}
        <div className="card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            🔮 Pricing Philosophy
          </h3>
          <div className="grid grid-2 gap-lg">
            <div>
              <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
                At Midnight Magnolia, we practice <strong>sliding scale pricing</strong> rooted 
                in mutual aid principles. Our rates reflect the value of lived experience, 
                technical mastery, and trauma-informed care.
              </p>
              <p className="text-body">
                We offer payment plans, trade opportunities, and reduced rates for 
                liberation-focused organizations. Let's find what works for your vision and resources.
              </p>
            </div>
            <div className="pricing-ranges">
              <div className="pricing-category" style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-sm)',
                padding: 'var(--space-sm)',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span className="text-body">Document Projects</span>
                <span className="text-body" style={{ color: 'var(--accent-primary)', fontWeight: 'var(--weight-medium)' }}>
                  $250 - $1,500
                </span>
              </div>
              <div className="pricing-category" style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-sm)',
                padding: 'var(--space-sm)',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span className="text-body">Automation Systems</span>
                <span className="text-body" style={{ color: 'var(--accent-primary)', fontWeight: 'var(--weight-medium)' }}>
                  $500 - $2,500
                </span>
              </div>
              <div className="pricing-category" style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-sm)',
                padding: 'var(--space-sm)',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span className="text-body">Website Development</span>
                <span className="text-body" style={{ color: 'var(--accent-primary)', fontWeight: 'var(--weight-medium)' }}>
                  $800 - $5,000
                </span>
              </div>
              <div className="pricing-category" style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-sm)',
                background: 'var(--bg-glass)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span className="text-body">Research & Strategy</span>
                <span className="text-body" style={{ color: 'var(--accent-primary)', fontWeight: 'var(--weight-medium)' }}>
                  $150/hr
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-body-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            Ready to begin your transformation journey?
          </p>
          <button className="btn btn-primary" style={{ marginRight: 'var(--space-md)' }}>
            Schedule Sacred Pause Call
          </button>
          <button className="btn btn-secondary">
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 