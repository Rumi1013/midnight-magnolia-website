import { useState } from 'react'
import './App.css'

function App() {
  const [activeService, setActiveService] = useState<string | null>(null)

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
        'Grant proposals with justice narratives'
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
        'Custom AI prompts for creative support'
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
        'Community hubs with gentle boundaries'
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
        'Tech stack consulting that supports'
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
        'Hybrid experiences that bridge worlds'
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
        'Digital altar pieces for sacred spaces'
      ]
    }
  ]

  return (
    <div className="sanctuary">
      <header className="sanctuary-header">
        <h1 className="sanctuary-title">
          🌸 Midnight Magnolia
        </h1>
        <p className="sanctuary-subtitle">
          Where Southern wisdom meets digital craft
        </p>
        <p className="sanctuary-tagline">
          Healing-centered technology for community builders, creatives, and change-makers
        </p>
      </header>
      
      <main className="sanctuary-content">
        <section className="intro-section">
          <p className="gentle-text">
            From Extension Agent to healing-centered technologist, I weave together 
            community care principles with digital mastery. Each service is a doorway 
            to transformation, each project a chance to center healing in our digital spaces.
          </p>
        </section>

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
                <a href="#contact" className="gentle-cta">Plant this seed →</a>
              </article>
            ))}
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
        </section>

        <section id="contact" className="contact-sanctuary">
          <h3>🌙 Ready to Begin?</h3>
          <p>Let's tend to your digital garden together.</p>
          <div className="contact-options">
            <a href="mailto:hello@midnightmagnolia.com" className="gentle-button">
              ✉️ Send a Message
            </a>
            <a href="#" className="gentle-button secondary">
              📅 Sacred Pause Call
            </a>
          </div>
        </section>
      </main>
      
      <footer className="sanctuary-footer">
        <p>Made with 💚 for healing, growth, and liberation</p>
        <p className="footer-note">🌸 Midnight Magnolia Portfolio • Where community care meets code</p>
      </footer>
    </div>
  )
}

export default App