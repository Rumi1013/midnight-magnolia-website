import React, { useState } from 'react'
import '../styles/design-system.css'

interface PortfolioItem {
  id: string
  title: string
  client: string
  category: string
  description: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  image: string
  year: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
}

const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'midnight-magnolia-website',
      title: 'Midnight Magnolia Website Redesign',
      client: 'Personal Project',
      category: 'web-development',
      description: 'Complete rebuild of business website using React and TypeScript with accessibility-first design principles.',
      challenge: 'Needed a professional website that reflected the healing-centered technology approach while being accessible to diverse audiences.',
      solution: 'Built with React/TypeScript, implemented ADHD-friendly navigation, trauma-informed design principles, and comprehensive accessibility features.',
      results: [
        'Mobile-responsive design with 98% accessibility score',
        'Modular component architecture for easy maintenance',
        'Integrated floating animations and ambient effects',
        'Clear service offerings and authentic storytelling'
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'CSS Custom Properties'],
      image: '/images/portfolio/mm-website.png',
      year: '2024'
    },
    {
      id: 'automation-workflow-templates',
      title: 'ADHD-Friendly Automation Templates',
      client: 'Digital Product',
      category: 'brand-automation',
      description: 'Collection of Make.com workflow templates designed specifically for neurodivergent entrepreneurs.',
      challenge: 'Most automation templates assume neurotypical workflows and consistent capacity, which doesn\'t work for ADHD brains.',
      solution: 'Created flexible templates with visual organization, buffer time built-in, and multiple input methods for different processing styles.',
      results: [
        'Templates for email management and client onboarding',
        'Visual workflow documentation with screenshots',
        'Flexible timing that adapts to variable capacity',
        'Integration guides for common ADHD tools'
      ],
      technologies: ['Make.com', 'Airtable', 'Gmail', 'Slack'],
      image: '/images/portfolio/automation-templates.png',
      year: '2024'
    },
    {
      id: 'community-organizing-toolkit',
      title: 'Digital Organizing Toolkit for Small Towns',
      client: 'Concept Project',
      category: 'community-platform',
      description: 'Resource collection and templates for grassroots organizing in rural Southern communities.',
      challenge: 'Small town organizers need different tools than urban activists, with emphasis on relationship-building and accessibility.',
      solution: 'Developed toolkit including communication templates, event planning guides, and digital security resources tailored for rural contexts.',
      results: [
        'Communication templates for different audiences',
        'Event planning worksheets and checklists',
        'Digital security guide for activists',
        'Resource sharing and mutual aid frameworks'
      ],
      technologies: ['Google Workspace', 'Signal', 'WordPress', 'Canva'],
      image: '/images/portfolio/organizing-toolkit.png',
      year: '2024'
    },
    {
      id: 'digital-accessibility-audit',
      title: 'Website Accessibility Consulting',
      client: 'Local Nonprofit',
      category: 'web-development',
      description: 'Accessibility audit and recommendations for community organization website.',
      challenge: 'Organization\'s website had barriers for users with disabilities and wasn\'t mobile-friendly.',
      solution: 'Conducted comprehensive accessibility audit using WAVE tools and provided detailed remediation plan with implementation support.',
      results: [
        'Identified 15+ accessibility barriers',
        'Provided detailed remediation roadmap',
        'Improved color contrast and navigation',
        'Added alt text and keyboard navigation support'
      ],
      technologies: ['WAVE', 'Lighthouse', 'Screen Readers', 'HTML/CSS'],
      image: '/images/portfolio/accessibility-audit.png',
      year: '2023',
      testimonial: {
        quote: 'The accessibility audit helped us understand how to make our website truly welcoming to our entire community.',
        author: 'Community Organizer',
        role: 'Local Nonprofit (Name Withheld)'
      }
    },
    {
      id: 'brand-identity-workbook',
      title: 'Brand Identity Workbook for Healing-Centered Businesses',
      client: 'Digital Product',
      category: 'digital-products',
      description: 'Comprehensive workbook helping trauma survivors and neurodivergent entrepreneurs develop authentic brand identity.',
      challenge: 'Most brand guides don\'t account for trauma responses or neurodivergent processing styles.',
      solution: 'Created workbook with multiple formats, trauma-informed prompts, and flexible approaches to brand development.',
      results: [
        'PDF and interactive digital versions',
        'Trauma-informed prompting and pacing',
        'Multiple completion pathways',
        'Integration with ADHD-friendly tools'
      ],
      technologies: ['Canva Pro', 'Google Forms', 'PDF Creation'],
      image: '/images/portfolio/brand-workbook.png',
      year: '2024'
    },
    {
      id: 'tech-literacy-curriculum',
      title: 'Digital Literacy Curriculum Design',
      client: 'Community Partnership',
      category: 'education',
      description: 'Curriculum development for digital literacy program serving rural communities.',
      challenge: 'Existing tech education doesn\'t account for limited infrastructure, diverse learning styles, or community context.',
      solution: 'Developed modular curriculum with offline components, multiple learning formats, and community-centered examples.',
      results: [
        'Modular lessons for flexible scheduling',
        'Offline and low-bandwidth alternatives',
        'Community-specific examples and case studies',
        'Trainer guides and assessment tools'
      ],
      technologies: ['Google Workspace', 'Canva', 'Video Creation Tools'],
      image: '/images/portfolio/tech-curriculum.png',
      year: '2023'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Work', icon: '🌟' },
    { id: 'web-development', label: 'Web Development', icon: '🕸️' },
    { id: 'brand-automation', label: 'Brand & Automation', icon: '🤖' },
    { id: 'event-planning', label: 'Event Planning', icon: '🎨' },
    { id: 'digital-products', label: 'Digital Products', icon: '📦' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'community-platform', label: 'Community Platforms', icon: '💫' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">💼 Portfolio of Sacred Work</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Real projects, real impact. Each piece of work represents a partnership rooted in justice, 
            accessibility, and community care. These are the digital spaces where healing happens.
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

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="portfolio-item animate-slide-up">
              <div className="portfolio-image" style={{
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                fontSize: 'var(--text-4xl)',
                position: 'relative'
              }}>
                {item.category === 'web-development' && '🕸️'}
                {item.category === 'brand-automation' && '🤖'}
                {item.category === 'event-planning' && '🎨'}
                {item.category === 'digital-products' && '📦'}
                {item.category === 'education' && '📚'}
                {item.category === 'community-platform' && '💫'}
                
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
                  {item.year}
                </div>
              </div>

              <div className="portfolio-content">
                <div className="portfolio-tags">
                  {item.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="portfolio-tag">
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="portfolio-tag">
                      +{item.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                  {item.title}
                </h3>
                
                <p className="text-caption" style={{ 
                  color: 'var(--accent-primary)',
                  marginBottom: 'var(--space-md)',
                  fontWeight: 'var(--weight-medium)'
                }}>
                  {item.client}
                </p>

                <p className="text-body" style={{ 
                  marginBottom: 'var(--space-lg)',
                  color: 'var(--text-secondary)'
                }}>
                  {item.description}
                </p>

                <div className="project-details" style={{ marginBottom: 'var(--space-lg)' }}>
                  <h4 className="text-h3" style={{ 
                    fontSize: 'var(--text-lg)',
                    marginBottom: 'var(--space-sm)',
                    color: 'var(--accent-primary)'
                  }}>
                    Key Results:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {item.results.map((result, index) => (
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
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {item.testimonial && (
                  <div className="testimonial" style={{
                    background: 'var(--bg-highlight)',
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    marginBottom: 'var(--space-lg)'
                  }}>
                    <p className="text-body" style={{ 
                      fontStyle: 'italic',
                      marginBottom: 'var(--space-sm)',
                      color: 'var(--text-secondary)'
                    }}>
                      "{item.testimonial.quote}"
                    </p>
                    <div className="testimonial-author">
                      <p className="text-caption" style={{ 
                        color: 'var(--accent-primary)',
                        fontWeight: 'var(--weight-semibold)'
                      }}>
                        — {item.testimonial.author}
                      </p>
                      <p className="text-caption" style={{ color: 'var(--text-muted)' }}>
                        {item.testimonial.role}
                      </p>
                    </div>
                  </div>
                )}

                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  View Case Study →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="section-divider"></div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-h2" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            🌱 Ready to Create Something Sacred Together?
          </h3>
          <p className="text-body-lg" style={{ 
            marginBottom: 'var(--space-lg)',
            maxWidth: '600px',
            margin: '0 auto var(--space-lg)'
          }}>
            Every project begins with listening. Let's have a conversation about your vision, 
            your community's needs, and how technology can serve your mission.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-md)', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button className="btn btn-primary">
              Schedule Sacred Pause Call 📅
            </button>
            <button className="btn btn-secondary">
              View Services 🌿
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection 