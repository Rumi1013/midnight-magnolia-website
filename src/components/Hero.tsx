import React from 'react'
import '../styles/design-system.css'
import { 
  AnimatedCard, 
  InteractiveButton, 
  GlowText, 
  NeonGradientCard,
  SparklesText
} from './MagicUI'

interface HeroProps {
  onNavigate: (section: string) => void
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="hero-section section">
      <div className="container">
        <div className="text-center hero-content">
          <div className="hero-title-container">
            <img 
              src="/images/logos/Midnight_MagnoliaJune-16.jpg" 
              alt="Midnight Magnolia"
              className="hero-title-logo"
            />
            <h1 className="text-h1 animate-fade-in">
              <SparklesText 
                text="Midnight Magnolia"
                size="xl"
                sparkleCount={12}
                as="span"
              />
            </h1>
          </div>
          
          <p className="text-body-lg animate-slide-up">
            <GlowText 
              text="✨ Healing-Centered Technology & Community Justice ✨"
              variant="gradient"
              size="md"
              colors={['var(--contrast-gold)', 'var(--lavender-mist)']}
            />
          </p>
          
          <p className="text-body animate-slide-up">
            Where Southern Gothic meets digital sanctuary. Technology that serves liberation, 
            honors ancestral wisdom, and centers community care.
          </p>
        </div>

        {/* Hero Products Section */}
        <div className="hero-products-section">
          <h2 className="hero-products-title">
            <GlowText 
              text="🌿 Sacred Digital Offerings"
              variant="shimmer"
              size="lg"
              colors={['var(--accent-primary)', 'var(--sage-green)']}
            />
          </h2>
          
          <div className="grid grid-3 gap-lg">
            {/* Justice Resources Card */}
            <AnimatedCard variant="glow" glowColor="rgba(212, 175, 55, 0.2)">
              <div className="hero-product-card" onClick={() => onNavigate('justice-resources')}>
                <div className="hero-product-icon">⚖️</div>
                <h3 className="text-h3">Justice Resources</h3>
                <p className="text-body">
                  Legal aid tools from Soros Justice Fellowship research
                </p>
                <InteractiveButton variant="secondary" size="sm">
                  Explore Resources →
                </InteractiveButton>
              </div>
            </AnimatedCard>

            {/* AI Document Generator Card */}
            <NeonGradientCard 
              borderSize={2}
              neonColors={{
                firstColor: 'var(--lavender-mist)',
                secondColor: 'var(--contrast-gold)'
              }}
            >
              <div className="hero-product-card" onClick={() => onNavigate('trauma-informed-ai')}>
                <div className="hero-product-icon">🤖</div>
                <h3 className="text-h3">
                  <SparklesText 
                    text="AI Document Generator"
                    size="sm"
                    sparkleCount={6}
                    as="h3"
                  />
                </h3>
                <p className="text-body">
                  Trauma-informed AI for community-centered documentation
                </p>
                <InteractiveButton variant="magic" size="sm" glow={true}>
                  Generate ✨
                </InteractiveButton>
              </div>
            </NeonGradientCard>

            {/* Digital Archive Card */}
            <AnimatedCard variant="float" glowColor="rgba(163, 177, 138, 0.2)">
              <div className="hero-product-card" onClick={() => onNavigate('portfolio')}>
                <div className="hero-product-icon">📚</div>
                <h3 className="text-h3">Digital Archive</h3>
                <p className="text-body">
                  210 items preserving ancestral wisdom and family stories
                </p>
                <InteractiveButton variant="secondary" size="sm">
                  Explore Archive →
                </InteractiveButton>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center hero-cta">
          <h3 className="text-h2">
            <GlowText 
              text="Ready to Begin Your Sacred Journey?"
              variant="gradient"
              size="md"
              colors={['var(--accent-primary)', 'var(--lavender-mist)']}
            />
          </h3>
          <div className="hero-cta-buttons">
            <InteractiveButton
              variant="magic"
              size="lg"
              glow={true}
              onClick={() => onNavigate('services')}
            >
              ✨ Explore Services ✨
            </InteractiveButton>
            <InteractiveButton
              variant="secondary"
              size="lg"
              magnetic={true}
              onClick={() => onNavigate('portfolio')}
            >
              🌸 View Portfolio
            </InteractiveButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 