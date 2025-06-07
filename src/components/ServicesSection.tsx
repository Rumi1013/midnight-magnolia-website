import React, { useState } from 'react'
import '../styles/design-system.css'
import { AnimatedCard, InteractiveButton, GlowText, SparklesText, NeonGradientCard } from './MagicUI'

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
        {/* Enhanced Header */}
        <div className="text-center services-header">
          <h2 className="text-h1 animate-fade-in">
            <SparklesText 
              text="🌿 Service Constellation"
              size="xl"
              sparkleCount={15}
              sparkleColor="var(--sage-green)"
              as="h2"
            />
          </h2>
          <p className="text-body-lg animate-slide-up services-description">
            Each service is a doorway to transformation, a chance to center healing in our digital spaces. 
            Technology that serves rather than extracts, workflows that honor your rhythm.
          </p>
        </div>

        {/* Enhanced Services Grid with Special Featured Card */}
        <div className="services-grid grid grid-3 gap-lg services-grid-container">
          {/* Special Featured Justice Resources with Neon Card */}
          {services[0] && (
            <NeonGradientCard
              borderSize={3}
              borderRadius={24}
              neonColors={{
                firstColor: 'var(--contrast-gold)',
                secondColor: 'var(--accent-primary)'
              }}
              className="services-card"
            >
              <div 
                onMouseEnter={() => setActiveService(services[0].id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="service-header text-center services-header-section">
                  <div className="service-icon services-icon">
                    {services[0].icon}
                  </div>
                  <h3 className="text-h2 services-title">
                    <SparklesText 
                      text={services[0].title}
                      size="md"
                      sparkleCount={8}
                      as="h3"
                    />
                  </h3>
                  <p className="text-caption services-subtitle">
                    <GlowText 
                      text={services[0].subtitle}
                      variant="gradient"
                      size="sm"
                      colors={['var(--contrast-gold)', 'var(--accent-primary)']}
                    />
                  </p>
                  <p className="text-body services-description-text">
                    {services[0].description}
                  </p>
                </div>

                <div className="service-offerings">
                  <h4 className="text-h3 services-offerings-title">
                    <SparklesText 
                      text="Sacred Offerings:"
                      size="sm"
                      sparkleCount={5}
                      as="h4"
                    />
                  </h4>
                  <ul className="services-offerings-list">
                    {services[0].offerings.slice(0, 4).map((offering, index) => (
                      <li 
                        key={index}
                        className="text-body services-offering-item"
                      >
                        <span className="services-offering-bullet">
                          ✨
                        </span>
                        {offering}
                      </li>
                    ))}
                    <li className="text-caption">+ {services[0].offerings.length - 4} more sacred resources</li>
                  </ul>
                </div>

                <div className="services-cta-container">
                  <InteractiveButton
                    variant="magic"
                    glow={true}
                    className="services-cta-button"
                  >
                    Explore Justice Hub →
                  </InteractiveButton>
                </div>
              </div>
            </NeonGradientCard>
          )}

          {/* Regular Service Cards with Enhanced Magic */}
          {services.slice(1).map((service) => (
            <AnimatedCard 
              key={service.id}
              variant={activeService === service.id ? 'glow' : 'float'}
              glowColor={
                service.id === 'automation' ? 'rgba(139, 123, 155, 0.3)' :
                service.id === 'web' ? 'rgba(163, 177, 138, 0.3)' :
                'rgba(212, 175, 55, 0.2)'
              }
              className={`service-card services-card ${activeService === service.id ? 'card-highlight' : ''}`}
            >
              <div 
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="service-header text-center services-header-section">
                  <div className="service-icon services-icon">
                    {service.icon}
                  </div>
                  <h3 className="text-h2 services-title">
                    <GlowText 
                      text={service.title}
                      variant={activeService === service.id ? 'glow' : 'gradient'}
                      size="md"
                    />
                  </h3>
                  <p className="text-caption services-subtitle">
                    {service.subtitle}
                  </p>
                  <p className="text-body services-description-text">
                    {service.description}
                  </p>
                </div>

                <div className="service-offerings">
                  <h4 className="text-h3 services-offerings-title">
                    <GlowText 
                      text="Sacred Offerings:"
                      variant="shimmer"
                      size="sm"
                      colors={['var(--accent-primary)', 'var(--contrast-gold)']}
                    />
                  </h4>
                  <ul className="services-offerings-list">
                    {service.offerings.map((offering, index) => (
                      <li 
                        key={index}
                        className="text-body services-offering-item"
                      >
                        <span className="services-offering-bullet">
                          •
                        </span>
                        {offering}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="services-cta-container">
                  <InteractiveButton
                    variant="secondary"
                    magnetic={true}
                    glow={activeService === service.id}
                    className="services-cta-button"
                  >
                    Plant this seed →
                  </InteractiveButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Enhanced Pricing Philosophy with Neon Card */}
        <NeonGradientCard 
          borderSize={2}
          borderRadius={20}
          neonColors={{
            firstColor: 'var(--lavender-mist)',
            secondColor: 'var(--sage-green)'
          }}
        >
          <div className="services-pricing-section">
            <h3 className="text-h2 text-center services-pricing-title">
              <SparklesText 
                text="🔮 Pricing Philosophy"
                size="lg"
                sparkleCount={12}
                as="h3"
              />
            </h3>
            <div className="grid grid-2 gap-lg">
              <div>
                <p className="text-body services-pricing-description">
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
                <div className="pricing-category services-pricing-category">
                  <span className="text-body">Document Projects</span>
                  <span className="text-body services-pricing-amount">
                    <GlowText text="$250 - $1,500" variant="glow" size="sm" />
                  </span>
                </div>
                <div className="pricing-category services-pricing-category">
                  <span className="text-body">Automation Systems</span>
                  <span className="text-body services-pricing-amount">
                    <GlowText text="$500 - $2,500" variant="glow" size="sm" />
                  </span>
                </div>
                <div className="pricing-category services-pricing-category">
                  <span className="text-body">Website Development</span>
                  <span className="text-body services-pricing-amount">
                    <GlowText text="$800 - $5,000" variant="glow" size="sm" />
                  </span>
                </div>
                <div className="pricing-category services-pricing-category">
                  <span className="text-body">Research & Strategy</span>
                  <span className="text-body services-pricing-amount">
                    <GlowText text="$150/hr" variant="glow" size="sm" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </NeonGradientCard>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-body-lg services-final-cta-description">
            <SparklesText 
              text="Ready to begin your transformation journey?"
              size="md"
              sparkleCount={8}
            />
          </p>
          <div className="services-cta-buttons">
            <InteractiveButton
              variant="magic"
              size="lg"
              glow={true}
              className="services-final-cta-primary"
            >
              ✨ Schedule Sacred Pause Call ✨
            </InteractiveButton>
            <InteractiveButton
              variant="secondary"
              size="lg"
              magnetic={true}
            >
              🌿 View Portfolio
            </InteractiveButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 