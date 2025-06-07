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
        <div className="hero-main">
          <div className="hero-header text-center">
            <div className="hero-title-container">
              <img 
                src="/images/logos/clearFinal1_MM_25.jpeg" 
                alt="Midnight Magnolia"
                className="hero-title-logo"
              />
              <h1 className="hero-title text-h1">
                <SparklesText 
                  text="Midnight Magnolia"
                  size="xl"
                  sparkleCount={12}
                  sparkleColor="var(--contrast-gold)"
                  as="span"
                />
              </h1>
            </div>
            
            <p className="hero-tagline text-body-lg">
              <GlowText 
                text="🌸 Sacred Technology for Community Liberation 🌸"
                variant="gradient"
                size="lg"
                colors={['var(--sage-green)', 'var(--lavender-mist)', 'var(--contrast-gold)']}
              />
            </p>
            
            <p className="hero-subtitle text-body">
              Weaving healing-centered digital experiences rooted in Southern wisdom, 
              ancestral knowledge, and trauma-informed innovation.
            </p>
          </div>

          {/* Enhanced Featured Products with Neon Cards */}
          <div className="featured-products">
            <h2 className="hero-products-title text-h2 text-center">
              <SparklesText 
                text="✨ Sacred Offerings ✨"
                size="lg"
                sparkleCount={8}
                as="h2"
              />
            </h2>
            
            <div className="products-grid grid grid-3 gap-lg">
              <NeonGradientCard
                borderSize={3}
                borderRadius={24}
                neonColors={{
                  firstColor: 'var(--contrast-gold)',
                  secondColor: 'var(--accent-primary)'
                }}
              >
                <div className="product-showcase">
                  <div className="product-visual">
                    <div className="product-background-image">
                      🏛️
                    </div>
                    <div className="product-overlay">
                      <div className="product-icon">⚖️</div>
                      <h3 className="text-h3">
                        <GlowText 
                          text="Justice Resources"
                          variant="glow"
                          size="md"
                        />
                      </h3>
                      <p className="text-body">
                        Soros Fellowship legacy: parole packages, expungement guides, 
                        and know-your-rights resources born from community organizing.
                      </p>
                      <InteractiveButton
                        variant="magic"
                        size="md"
                        glow={true}
                        onClick={() => onNavigate('justice-resources')}
                      >
                        Explore Justice Hub →
                      </InteractiveButton>
                      <div className="product-badge">
                        <SparklesText 
                          text="Fellowship Legacy"
                          size="sm"
                          sparkleCount={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </NeonGradientCard>

              <AnimatedCard 
                variant="glow"
                glowColor="rgba(139, 123, 155, 0.4)"
                delay={200}
              >
                <div className="product-showcase">
                  <div className="product-visual">
                    <div className="product-background-image">
                      🌸
                    </div>
                    <div className="product-overlay">
                      <div className="product-icon">🔮</div>
                      <h3 className="text-h3">
                        <GlowText 
                          text="Healing Tech Services"
                          variant="gradient"
                          size="md"
                        />
                      </h3>
                      <p className="text-body">
                        Trauma-informed automation, ADHD-friendly workflows, 
                        and Southern Gothic web experiences that honor your journey.
                      </p>
                      <InteractiveButton
                        variant="secondary"
                        magnetic={true}
                        onClick={() => onNavigate('services')}
                      >
                        Sacred Services →
                      </InteractiveButton>
                      <div className="product-badge">
                        <SparklesText 
                          text="Trauma-Informed"
                          size="sm"
                          sparkleCount={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <NeonGradientCard
                borderSize={2}
                borderRadius={20}
                neonColors={{
                  firstColor: 'var(--sage-green)',
                  secondColor: 'var(--lavender-mist)'
                }}
              >
                <div className="product-showcase">
                  <div className="product-visual">
                    <div className="product-background-image">
                      📚
                    </div>
                    <div className="product-overlay">
                      <div className="product-icon">🌿</div>
                      <h3 className="text-h3">
                        <GlowText 
                          text="Digital Sanctuary"
                          variant="shimmer"
                          size="md"
                        />
                      </h3>
                      <p className="text-body">
                        Mystical digital tools, Southern Oracle tarot deck, 
                        and community resources for healing-centered entrepreneurs.
                      </p>
                      <InteractiveButton
                        variant="ghost"
                        magnetic={true}
                        onClick={() => onNavigate('shop')}
                      >
                        Enter Sanctuary →
                      </InteractiveButton>
                      <div className="product-badge">
                        <SparklesText 
                          text="Digital Grimoire"
                          size="sm"
                          sparkleCount={5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </NeonGradientCard>
            </div>
          </div>

          {/* Enhanced Revenue Showcase */}
          <div className="revenue-showcase">
            <h3 className="revenue-header text-h2 text-center">
              <SparklesText 
                text="🌱 Growing with Sacred Purpose"
                size="lg"
                sparkleCount={10}
                as="h3"
              />
            </h3>
            
            <div className="revenue-grid grid grid-2 gap-lg">
              <NeonGradientCard
                borderSize={2}
                neonColors={{
                  firstColor: 'var(--contrast-gold)',
                  secondColor: 'var(--accent-primary)'
                }}
              >
                <div className="revenue-card">
                  <div className="revenue-icon">💫</div>
                  <h4 className="text-h3">
                    <GlowText 
                      text="Community Impact"
                      variant="glow"
                      size="md"
                    />
                  </h4>
                  <p className="text-body">
                    Building sustainable technology practice through healing-centered 
                    approach, supporting 500+ community members and growing thoughtfully.
                  </p>
                </div>
              </NeonGradientCard>
              
              <AnimatedCard variant="float" delay={300}>
                <div className="revenue-card">
                  <div className="revenue-icon">🌸</div>
                  <h4 className="text-h3">
                    <GlowText 
                      text="Ancestral Wisdom"
                      variant="gradient"
                      size="md"
                    />
                  </h4>
                  <p className="text-body">
                    Every project honors Southern roots, combines traditional healing 
                    with modern innovation, and centers community liberation.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="hero-cta text-center">
            <h3 className="text-h2">
              <SparklesText 
                text="🌙 Ready to Begin Your Sacred Journey? 🌙"
                size="lg"
                sparkleCount={15}
                as="h3"
              />
            </h3>
            
            <div className="cta-buttons">
              <InteractiveButton
                variant="magic"
                size="lg"
                glow={true}
                onClick={() => onNavigate('services')}
              >
                ✨ Schedule Sacred Pause Call ✨
              </InteractiveButton>
              <InteractiveButton
                variant="secondary"
                size="lg"
                magnetic={true}
                onClick={() => onNavigate('portfolio')}
              >
                🌿 Explore Sacred Work
              </InteractiveButton>
            </div>
            
            <div className="stats-row">
              <div className="stat">
                <div className="stat-number text-h2">
                  <GlowText 
                    text="500+"
                    variant="glow"
                    size="lg"
                  />
                </div>
                <div className="stat-label text-caption">Community Members</div>
              </div>
              <div className="stat">
                <div className="stat-number text-h2">
                  <GlowText 
                    text="50+"
                    variant="glow"
                    size="lg"
                  />
                </div>
                <div className="stat-label text-caption">Sacred Projects</div>
              </div>
              <div className="stat">
                <div className="stat-number text-h2">
                  <GlowText 
                    text="3 Years"
                    variant="glow"
                    size="lg"
                  />
                </div>
                <div className="stat-label text-caption">Healing-Centered Practice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 