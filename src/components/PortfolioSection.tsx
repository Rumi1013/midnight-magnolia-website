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
      id: 'ancestral-research-documentation',
      title: 'Ancestral Research & Cultural Documentation',
      client: 'Personal Research Project',
      category: 'community-justice',
      description: 'Ongoing genealogy research and spiritual journey documentation, exploring family history and African diasporic traditions through travel, archives, and sacred sites.',
      challenge: 'Preserving family stories scattered across generations while respectfully learning about hoodoo and Yoruba traditions, requiring careful research methodology and cultural sensitivity.',
      solution: 'Developed systematic approach to genealogy research using digital tools, combined with immersive cultural learning through visits to sacred sites and historical locations.',
      results: [
        'Digital family archive with photos and documents from Google Drive',
        'Cultural learning journeys to Oyotunji, Savannah, New Orleans, and EJI',
        'Documentation of spiritual practices and ancestral connections',
        'Research methodology for African diasporic genealogy',
        'Integration of family history with broader historical context'
      ],
      technologies: ['Google Drive', 'Digital Archives', 'Genealogy Software', 'Cultural Documentation'],
      image: '/images/portfolio/ancestral-research.png',
      year: '2022-2024',
      testimonial: {
        quote: 'This research has helped me understand not just where I come from, but how my ancestors\' wisdom lives in my work today.',
        author: 'Personal Reflection',
        role: 'Ancestral Journey'
      }
    },
    {
      id: 'justice-weekend-2023',
      title: 'Justice Weekend 2023 - Event Coordination',
      client: 'Community Coalition',
      category: 'community-justice',
      description: 'Planned and coordinated multi-day community justice event featuring expungement clinics, bail fund education, and liberation strategy workshops.',
      challenge: 'Coordinating complex event with legal services, community education, and activist training while ensuring accessibility and safety for all participants.',
      solution: 'Developed comprehensive event management system with volunteer coordination, legal clinic logistics, and community safety protocols.',
      results: [
        'Successfully coordinated 3-day weekend event',
        'Facilitated expungement clinics serving 40+ community members',
        'Organized bail fund education and rapid response training',
        'Created digital organizing toolkit for future events',
        'Established ongoing volunteer network and resource sharing'
      ],
      technologies: ['Event Management Tools', 'Signal', 'Google Workspace', 'Canva'],
      image: '/images/portfolio/justice-weekend.png',
      year: '2023',
      testimonial: {
        quote: 'The coordination and accessibility planning made this event possible for our entire community. Every detail was thoughtfully planned with justice and care in mind.',
        author: 'Community Organizer',
        role: 'Local Justice Coalition'
      }
    },
    {
      id: 'expungement-event-series',
      title: 'Monthly Expungement Clinic Coordination',
      client: 'Legal Aid Partnership',
      category: 'community-justice',
      description: 'Organized recurring expungement clinics connecting community members with volunteer attorneys for record clearing assistance.',
      challenge: 'Creating sustainable, accessible legal aid events that serve rural communities with limited transportation and varying work schedules.',
      solution: 'Established mobile clinic model with multiple locations, flexible scheduling, and comprehensive intake and follow-up systems.',
      results: [
        'Launched monthly clinic serving 3 rural counties',
        'Connected 100+ individuals with expungement services',
        'Developed multilingual intake and resource materials',
        'Created volunteer attorney training and support system',
        'Established partnerships with local libraries and community centers'
      ],
      technologies: ['Scheduling Software', 'Google Forms', 'Translation Tools', 'Database Management'],
      image: '/images/portfolio/expungement-clinics.png',
      year: '2023-2024'
    },
    {
      id: 'bail-fund-organizing',
      title: 'Community Bail Fund & Rapid Response Network',
      client: 'Mutual Aid Collective',
      category: 'community-justice',
      description: 'Developed digital infrastructure and organizing systems for community bail fund and rapid response to arrests and court support.',
      challenge: 'Creating secure, responsive system for bail assistance while protecting community member privacy and maintaining rapid response capability.',
      solution: 'Built secure communication networks, emergency contact systems, and resource coordination platform using encrypted tools and community care principles.',
      results: [
        'Established 24/7 rapid response communication network',
        'Coordinated bail assistance for 25+ community members',
        'Created court support and accompaniment program',
        'Developed digital security training for activists',
        'Built sustainable fundraising and resource sharing system'
      ],
      technologies: ['Signal', 'Encrypted Communication', 'Secure Fundraising Platforms', 'Database Security'],
      image: '/images/portfolio/bail-fund.png',
      year: '2022-2024'
    },
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
    },
    {
      id: 'liberation-resource-hub',
      title: 'Black Liberation Digital Resource Hub',
      client: 'Community Partnership',
      category: 'community-justice',
      description: 'Curated and organized comprehensive digital resource collection for Black liberation organizing, including legal resources, mutual aid networks, and educational materials.',
      challenge: 'Information scattered across platforms with varying accessibility and security concerns for activist communities.',
      solution: 'Created centralized, secure resource hub with mobile-friendly access, offline capabilities, and regular community input for updates.',
      results: [
        'Compiled 200+ vetted resources across 15 categories',
        'Implemented secure sharing protocols for sensitive materials',
        'Created mobile-optimized interface for field organizing',
        'Established community review and update process',
        'Integrated with existing mutual aid networks'
      ],
      technologies: ['Secure Web Platforms', 'Offline Sync', 'Community Content Management', 'Encrypted Storage'],
      image: '/images/portfolio/liberation-hub.png',
      year: '2022-2024'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Work', icon: '🌟' },
    { id: 'community-justice', label: 'Community Justice', icon: '✊🏾' },
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
          <div className="portfolio-header">
            <img 
              src="/images/logos/clearFinal6_MM_25.jpeg" 
              alt="Sacred Tech"
              className="portfolio-header-logo"
            />
            <h2 className="text-h1 animate-fade-in">
              <div className="portfolio-header-title">
                Sacred Tech Portfolio
              </div>
            </h2>
          </div>
          <p className="text-body-lg animate-slide-up portfolio-description">
            Technology projects rooted in community care, justice organizing, and healing-centered design. 
            Each project tells a story of how code can serve liberation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter portfolio-category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-ghost'} portfolio-category-button`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="portfolio-item animate-slide-up">
              <div className="portfolio-image portfolio-image-container">
                {item.category === 'community-justice' && '✊🏾'}
                {item.category === 'web-development' && '🕸️'}
                {item.category === 'brand-automation' && '🤖'}
                {item.category === 'event-planning' && '🎨'}
                {item.category === 'digital-products' && '📦'}
                {item.category === 'education' && '📚'}
                {item.category === 'community-platform' && '💫'}
                
                <div className="portfolio-year-badge">
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

                <h3 className="text-h3 portfolio-item-title">
                  {item.title}
                </h3>
                
                <p className="text-caption portfolio-client">
                  {item.client}
                </p>

                <p className="text-body portfolio-item-description">
                  {item.description}
                </p>

                <div className="project-details portfolio-project-details">
                  <h4 className="text-h3 portfolio-results-title">
                    Key Results:
                  </h4>
                  <ul className="portfolio-results-list">
                    {item.results.map((result, index) => (
                      <li 
                        key={index}
                        className="text-body portfolio-result-item"
                      >
                        <span className="portfolio-result-icon">
                          ✨
                        </span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {item.testimonial && (
                  <div className="testimonial portfolio-testimonial">
                    <p className="text-body portfolio-testimonial-quote">
                      "{item.testimonial.quote}"
                    </p>
                    <div className="testimonial-author">
                      <p className="text-caption portfolio-testimonial-author">
                        — {item.testimonial.author}
                      </p>
                      <p className="text-caption portfolio-testimonial-role">
                        {item.testimonial.role}
                      </p>
                    </div>
                  </div>
                )}

                <button type="button" className="btn btn-secondary portfolio-case-study-button">
                  View Case Study →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="section-divider"></div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-h2 portfolio-cta-title">
            🌱 Ready to Create Something Sacred Together?
          </h3>
          <p className="text-body-lg portfolio-cta-description">
            Every project begins with listening. Let's have a conversation about your vision, 
            your community's needs, and how technology can serve your mission.
          </p>
          <div className="portfolio-cta-buttons">
            <button type="button" className="btn btn-primary">
              Schedule Sacred Pause Call 📅
            </button>
            <button type="button" className="btn btn-secondary">
              View Services 🌿
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection 