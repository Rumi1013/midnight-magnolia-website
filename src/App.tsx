import { useState } from 'react'
import './App.css'

function App() {
  const [activeService, setActiveService] = useState<string | null>(null)
  const [currentSection, setCurrentSection] = useState('home')

  const services = [
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

  const navigation = [
    { id: 'home', label: 'Home', icon: '🌸' },
    { id: 'about', label: 'About', icon: '🌙' },
    { id: 'services', label: 'Services', icon: '🌿' },
    { id: 'experience', label: 'Experience', icon: '💫' },
    { id: 'contact', label: 'Contact', icon: '✨' }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = (section: string) => {
    setCurrentSection(section)
    setIsMenuOpen(false)
  }

  const renderHome = () => (
    <div className="home-section">
      <section className="hero-sanctuary">
        <div className="hero-content">
          <h1 className="sanctuary-title">
            🌸 Midnight Magnolia
          </h1>
          <p className="sanctuary-subtitle">
            Where Southern wisdom meets digital craft
          </p>
          <p className="sanctuary-tagline">
            Healing-centered technology for community builders, creatives, and change-makers
          </p>
          <div className="hero-actions">
            <button 
              className="gentle-button primary"
              onClick={() => handleNavigation('services')}
            >
              Explore Services
            </button>
            <button 
              className="gentle-button secondary"
              onClick={() => handleNavigation('about')}
            >
              My Story
            </button>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <p className="gentle-text">
          From Extension Agent to healing-centered technologist, I weave together 
          community care principles with digital mastery. Each service is a doorway 
          to transformation, each project a chance to center healing in our digital spaces.
        </p>
      </section>

      <section className="featured-services">
        <h2 className="section-title">🌿 Service Highlights</h2>
        <div className="service-preview-grid">
          {services.slice(0, 3).map((service) => (
            <div key={service.id} className="service-preview">
              <div className="service-preview-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button 
                className="gentle-cta"
                onClick={() => handleNavigation('services')}
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderAbout = () => (
    <div className="about-section">
      <section className="about-hero">
        <h2 className="section-title">🌙 About Latisha</h2>
        <div className="about-content">
          <div className="about-story">
            <h3>From Extension Agent to Healing-Centered Technologist</h3>
            <p>
              My journey began in the rich soil of community service as an Extension Agent, 
              where I learned that true change happens when we center the voices and needs 
              of the people we serve. This foundation in community care and education became 
              the bedrock of my approach to technology and digital strategy.
            </p>
            <p>
              Through my work with organizations like the Black Liberation Fund, I discovered 
              how technology could amplify justice work and create pathways for liberation. 
              I witnessed firsthand how the right digital tools, implemented with intention 
              and care, could transform not just workflows but entire movements.
            </p>
            <p>
              Today, I bring together my Extension background, my commitment to community 
              care, and my technical expertise to create digital solutions that honor both 
              ancestral wisdom and cutting-edge innovation. Every project is an opportunity 
              to plant seeds of healing in our digital landscape.
            </p>
          </div>
          
          <div className="credentials-grid">
            <div className="credential-card">
              <h4>🎓 Educational Foundation</h4>
              <ul>
                <li>Extension Agent Background</li>
                <li>Community Development Focus</li>
                <li>Adult Education Principles</li>
                <li>Program Evaluation Methods</li>
              </ul>
            </div>
            
            <div className="credential-card">
              <h4>💻 Technical Expertise</h4>
              <ul>
                <li>React & TypeScript Development</li>
                <li>Automation & Integration (Make.com)</li>
                <li>Content Management Systems</li>
                <li>SEO & Digital Strategy</li>
              </ul>
            </div>
            
            <div className="credential-card">
              <h4>🌱 Community Experience</h4>
              <ul>
                <li>Black Liberation Fund</li>
                <li>Grassroots Organizing</li>
                <li>Grant Writing & Fundraising</li>
                <li>Workshop Facilitation</li>
              </ul>
            </div>
            
            <div className="credential-card">
              <h4>🔮 Spiritual Practice</h4>
              <ul>
                <li>Trauma-Informed Approaches</li>
                <li>Healing-Centered Design</li>
                <li>Intuitive Strategy</li>
                <li>Sacred Technology Ethics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy-section">
        <h3>🌺 My Philosophy</h3>
        <div className="philosophy-content">
          <blockquote>
            "Technology is not neutral. Every line of code, every design choice, 
            every automation we create either perpetuates harm or plants seeds 
            of healing. I choose healing, every time."
          </blockquote>
          <p>
            My approach to digital work is grounded in the understanding that 
            technology should serve liberation, not oppression. This means 
            building with accessibility in mind, centering marginalized voices, 
            and creating systems that support rather than exploit.
          </p>
        </div>
      </section>
    </div>
  )

  const renderServices = () => (
    <div className="services-section">
      <section className="portfolio-sanctuary">
        <h2 className="services-title">🌿 Service Constellation</h2>
        
        <div className="service-grid">
          {services.map((service) => (
            <article 
              key={service.id}
              className={`service-offering ${activeService === service.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="icon-vessel">
                <span className="service-icon">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-description">{service.description}</p>
              <ul className="service-seeds">
                {service.offerings.map((offering, index) => (
                  <li key={index}>{offering}</li>
                ))}
              </ul>
              <button 
                className="gentle-cta"
                onClick={() => handleNavigation('contact')}
              >
                Plant this seed →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-philosophy">
        <h3>🔮 Pricing Philosophy</h3>
        <p>
          At Midnight Magnolia, we practice <strong>sliding scale pricing</strong> rooted 
          in mutual aid principles. Our rates reflect the value of lived experience, 
          technical mastery, and trauma-informed care. We offer payment plans, trade 
          opportunities, and reduced rates for liberation-focused organizations.
        </p>
        <p className="pricing-note">
          Let's find what works for your vision and resources.
        </p>
        <div className="pricing-ranges">
          <div className="pricing-category">
            <h4>Document Projects</h4>
            <span className="price-range">$250 - $1,500</span>
          </div>
          <div className="pricing-category">
            <h4>Automation Systems</h4>
            <span className="price-range">$500 - $2,500</span>
          </div>
          <div className="pricing-category">
            <h4>Website Development</h4>
            <span className="price-range">$800 - $5,000</span>
          </div>
          <div className="pricing-category">
            <h4>Research & Strategy</h4>
            <span className="price-range">$150/hr or project-based</span>
          </div>
        </div>
      </section>
    </div>
  )

  const renderExperience = () => (
    <div className="experience-section">
      <h2 className="section-title">💫 Professional Journey</h2>
      
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-marker">🌱</div>
          <div className="timeline-content">
            <h3>Extension Agent</h3>
            <p className="timeline-period">Foundation Years</p>
            <p>
              Developed community education programs, facilitated workshops, 
              and learned the art of meeting people where they are. This role 
              taught me that effective change comes from listening deeply and 
              building trust with communities.
            </p>
            <ul>
              <li>Program development and evaluation</li>
              <li>Community needs assessment</li>
              <li>Workshop facilitation and adult education</li>
              <li>Grant writing and resource development</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-marker">✊🏾</div>
          <div className="timeline-content">
            <h3>Community Organizer & Activist</h3>
            <p className="timeline-period">Building Movement</p>
            <p>
              Engaged in grassroots organizing and justice work, including 
              significant contributions to the Black Liberation Fund. Learned 
              how digital tools could amplify community voices and create 
              pathways for liberation.
            </p>
            <ul>
              <li>Strategic communications and storytelling</li>
              <li>Event planning and community mobilization</li>
              <li>Digital advocacy and online organizing</li>
              <li>Coalition building across difference</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-marker">💻</div>
          <div className="timeline-content">
            <h3>Digital Strategist & Developer</h3>
            <p className="timeline-period">Tech for Liberation</p>
            <p>
              Evolved into creating digital solutions that center healing and 
              justice. Developed expertise in web development, automation, and 
              creating technology that serves rather than exploits communities.
            </p>
            <ul>
              <li>Full-stack web development (React, TypeScript)</li>
              <li>Business automation and integration</li>
              <li>Content strategy and SEO optimization</li>
              <li>Digital accessibility and inclusive design</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-marker">🌸</div>
          <div className="timeline-content">
            <h3>Midnight Magnolia</h3>
            <p className="timeline-period">Present</p>
            <p>
              Founded Midnight Magnolia to offer healing-centered technology 
              services that honor both ancestral wisdom and innovation. 
              Specializing in serving community organizations, creatives, 
              and change-makers who are building a more just world.
            </p>
            <ul>
              <li>Trauma-informed technology design</li>
              <li>Community-centered digital strategy</li>
              <li>Sliding scale and mutual aid pricing</li>
              <li>Integration of spiritual practice and tech work</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="skills-constellation">
        <h3>🔮 Skills & Expertise</h3>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>💻 Technical Skills</h4>
            <div className="skill-tags">
              <span className="skill-tag">React</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Make.com</span>
              <span className="skill-tag">Notion</span>
              <span className="skill-tag">Airtable</span>
              <span className="skill-tag">Shopify</span>
              <span className="skill-tag">WordPress</span>
              <span className="skill-tag">HubSpot</span>
              <span className="skill-tag">Mailchimp</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h4>🌱 Community Skills</h4>
            <div className="skill-tags">
              <span className="skill-tag">Program Development</span>
              <span className="skill-tag">Workshop Facilitation</span>
              <span className="skill-tag">Grant Writing</span>
              <span className="skill-tag">Community Organizing</span>
              <span className="skill-tag">Needs Assessment</span>
              <span className="skill-tag">Adult Education</span>
            </div>
          </div>
          
          <div className="skill-category">
            <h4>🎨 Creative Skills</h4>
            <div className="skill-tags">
              <span className="skill-tag">Content Strategy</span>
              <span className="skill-tag">Brand Development</span>
              <span className="skill-tag">Visual Design</span>
              <span className="skill-tag">Copywriting</span>
              <span className="skill-tag">Event Curation</span>
              <span className="skill-tag">Digital Art</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderContact = () => (
    <div className="contact-section">
      <section className="contact-sanctuary">
        <h2 className="section-title">🌙 Ready to Begin?</h2>
        <p className="contact-intro">
          Let's tend to your digital garden together. Whether you're dreaming of 
          a new website, need automation support, or want to explore how technology 
          can serve your mission, I'm here to listen and co-create.
        </p>
        
        <div className="contact-methods">
          <div className="contact-method">
            <div className="contact-icon">✉️</div>
            <h3>Send a Message</h3>
            <p>Share your vision, ask questions, or just say hello.</p>
            <a href="mailto:hello@midnightmagnolia.com" className="gentle-button">
              hello@midnightmagnolia.com
            </a>
          </div>
          
          <div className="contact-method">
            <div className="contact-icon">📅</div>
            <h3>Sacred Pause Call</h3>
            <p>Let's have a conversation about your needs and dreams.</p>
            <a href="#" className="gentle-button secondary">
              Schedule Discovery Call
            </a>
          </div>
          
          <div className="contact-method">
            <div className="contact-icon">💬</div>
            <h3>Community Connections</h3>
            <p>Find me in digital spaces where healing and justice intersect.</p>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
        </div>
        
        <div className="contact-note">
          <p>
            <strong>Response Time:</strong> I typically respond within 24-48 hours. 
            If you need urgent support, please mention that in your message.
          </p>
          <p>
            <strong>Sliding Scale:</strong> All initial consultations include discussion 
            of pricing that works for your budget and situation.
          </p>
        </div>
      </section>

      <section className="wisdom-waters">
        <blockquote className="testimonial">
          <p>
            "Latisha brought both technical excellence and ancestral knowing 
            to our project. The automation she built doesn't just work—it 
            breathes with our organization's rhythm."
          </p>
          <cite>— Community Partner</cite>
        </blockquote>
      </section>
    </div>
  )

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return renderHome()
      case 'about':
        return renderAbout()
      case 'services':
        return renderServices()
      case 'experience':
        return renderExperience()
      case 'contact':
        return renderContact()
      default:
        return renderHome()
    }
  }

  return (
    <div className="sanctuary">
      <header className="main-header">
        <div className="header-content">
          <div className="brand-section">
            <button 
              className="brand-button"
              onClick={() => handleNavigation('home')}
            >
              🌸 Midnight Magnolia
            </button>
          </div>
          
          <nav className="main-navigation">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
            
            <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-link ${currentSection === item.id ? 'nav-link-active' : ''}`}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="sanctuary-content">
        {renderCurrentSection()}
      </main>
      
      <footer className="sanctuary-footer">
        <p>Made with 💚 for healing, growth, and liberation</p>
        <p className="footer-note">🌸 Midnight Magnolia Portfolio • Where community care meets code</p>
      </footer>
    </div>
  )
}

export default App