import React from 'react';
import '../styles/design-system.css';
import './Hero.css';
import {
  AnimatedCard,
  InteractiveButton,
  GlowText,
  NeonGradientCard,
  SparklesText
} from './MagicUI';

interface MainHeroProps {
  onNavigate: (section: string) => void;
}

const MainHero: React.FC<MainHeroProps> = ({ onNavigate }) => {
  return (
    <section className="hero-section section">
      <div className="container">
        <div className="hero-background">
          <div className="hero-overlay" />
        </div>

        <div className="text-center hero-content">
          <img
            src="/images/logos/midnight-magnolia.svg"
            alt="Midnight Magnolia"
            className="hero-logo"
          />

          <h1 className="text-h1">
            <span className="sr-only">Midnight Magnolia</span>
            <img
              src="/images/logos/wordmark.svg"
              alt=""
              aria-hidden="true"
              className="hero-wordmark"
            />
          </h1>

          <p className="hero-subtitle">
            Southern Gothic Digital Sanctuary
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
            {/* Digital Entrepreneur's Starter Kit */}
            <AnimatedCard variant="glow" glowColor="rgba(212, 175, 55, 0.2)">
              <div className="hero-product-card" onClick={() => onNavigate('digital-art')}>
                <div className="hero-product-icon">📚</div>
                <h3 className="text-h3">Digital Entrepreneur's Starter Kit</h3>
                <p className="text-body">
                  Business plans with soul, moon-aligned content calendars, and gentle automation
                </p>
                <InteractiveButton variant="secondary" size="sm">
                  Transform Your Vision →
                </InteractiveButton>
              </div>
            </AnimatedCard>

            {/* Healing Journals & Planners */}
            <NeonGradientCard
              borderSize={2}
              neonColors={{
                firstColor: 'var(--sage-green)',
                secondColor: 'var(--rich-gold)'
              }}
            >
              <div className="hero-product-card" onClick={() => onNavigate('journals')}>
                <div className="hero-product-icon">📔</div>
                <h3 className="text-h3">
                  <SparklesText
                    text="Healing Journals & Planners"
                    size="sm"
                    sparkleCount={6}
                    as="h3"
                  />
                </h3>
                <p className="text-body">
                  Sober & Soft sobriety journal, Magnolia Reset 90-day healing planner, ADHD-friendly trackers
                </p>
                <InteractiveButton variant="magic" size="sm" glow={true}>
                  Begin Healing ✨
                </InteractiveButton>
              </div>
            </NeonGradientCard>

            {/* Sacred Memberships */}
            <AnimatedCard variant="float" glowColor="rgba(163, 177, 138, 0.2)">
              <div className="hero-product-card" onClick={() => onNavigate('memberships')}>
                <div className="hero-product-icon">🌸</div>
                <h3 className="text-h3">Sacred Memberships</h3>
                <p className="text-body">
                  From Magnolia Seed ($3) to House of Midnight ($75) - find your perfect sanctuary tier
                </p>
                <InteractiveButton variant="secondary" size="sm">
                  Find Your Circle →
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
  );
};

export default MainHero;
