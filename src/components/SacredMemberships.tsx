import React from 'react';
import '../styles/design-system.css';
import {
  AnimatedCard,
  InteractiveButton,
  GlowText,
  NeonGradientCard,
  SparklesText
} from './MagicUI';

interface MembershipTier {
  id: string;
  name: string;
  price: string;
  icon: string;
  description: string;
  benefits: string[];
  highlighted?: boolean;
  cta: string;
}

const SacredMemberships: React.FC = () => {
  const membershipTiers: MembershipTier[] = [
    {
      id: 'magnolia-seed',
      name: 'Magnolia Seed',
      price: '$3',
      icon: '🌱',
      description: 'Plant the seeds of transformation with gentle support',
      benefits: [
        'Monthly affirmations & wallpapers',
        'Access to community sanctuary',
        'New moon intention prompts',
        'Sacred pause moments'
      ],
      cta: 'Plant Your Seed'
    },
    {
      id: 'crescent-bloom',
      name: 'Crescent Bloom',
      price: '$7',
      icon: '🌙',
      description: 'Embrace the lunar cycles of growth and reflection',
      benefits: [
        'Everything in Magnolia Seed',
        'Tarot spotlights & guidance',
        'Blog access to wisdom stories',
        'Moon phase rituals'
      ],
      cta: 'Begin Blooming'
    },
    {
      id: 'golden-grove',
      name: 'Golden Grove',
      price: '$15',
      icon: '✨',
      description: 'Flourish in the golden light of sustainable abundance',
      benefits: [
        'Everything in Crescent Bloom',
        'Monthly journal pages & templates',
        'Audio rituals for healing',
        'Early access to digital products',
        'Gentle productivity tools'
      ],
      highlighted: true,
      cta: 'Enter the Grove'
    },
    {
      id: 'moonlit-sanctuary',
      name: 'Moonlit Sanctuary',
      price: '$30',
      icon: '🏯',
      description: 'Find refuge in personalized guidance and deep community',
      benefits: [
        'Everything in Golden Grove',
        'Personalized content & recommendations',
        'Monthly healing circles (virtual)',
        'Direct messaging with Latisha',
        'Custom automation templates'
      ],
      cta: 'Enter Your Sanctuary'
    },
    {
      id: 'house-midnight',
      name: 'House of Midnight',
      price: '$75',
      icon: '🏠',
      description: 'The deepest transformation through intimate connection',
      benefits: [
        'Everything in Moonlit Sanctuary',
        'Quarterly care packages (physical)',
        'Monthly 1:1 connection calls',
        'Beta access to all new offerings',
        'Co-creation opportunities',
        'Legacy building support'
      ],
      cta: 'Join the House'
    }
  ];

  return (
    <section className="section sacred-memberships">
      <div className="container">
        <div className="section-header">
          <h2 className="text-h1 animate-fade-in">
            <GlowText
              text="🌸 Sacred Memberships"
              variant="gradient"
              size="xl"
              colors={['var(--rich-gold)', 'var(--sage-green)']}
            />
          </h2>
          <p className="text-body-lg animate-slide-up">
            Join a community rooted in transformation, where every tier nurtures your journey 
            from seed to sanctuary. Choose the level of support that honors where you are now.
          </p>
        </div>

        <div className="membership-tiers-grid">
          {membershipTiers.map((tier, index) => (
            <div key={tier.id} className={`membership-tier-wrapper animate-slide-up animate-delay-${(index + 1) * 100}`}>
              {tier.highlighted ? (
                <NeonGradientCard
                  borderSize={3}
                  neonColors={{
                    firstColor: 'var(--rich-gold)',
                    secondColor: 'var(--sage-green)'
                  }}
                >
                  <div className="membership-tier featured">
                    <div className="tier-badge">
                      <SparklesText
                        text="Most Popular"
                        size="xs"
                        sparkleCount={4}
                      />
                    </div>
                    <div className="tier-header">
                      <div className="tier-icon">{tier.icon}</div>
                      <h3 className="tier-name">{tier.name}</h3>
                      <div className="tier-price">
                        <span className="price-amount">{tier.price}</span>
                        <span className="price-period">/month</span>
                      </div>
                    </div>
                    <p className="tier-description">{tier.description}</p>
                    <ul className="tier-benefits">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="tier-benefit">
                          <span className="benefit-icon">🌿</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <InteractiveButton
                      variant="magic"
                      size="lg"
                      glow={true}
                      className="tier-cta"
                    >
                      {tier.cta} ✨
                    </InteractiveButton>
                  </div>
                </NeonGradientCard>
              ) : (
                <AnimatedCard variant="glow" glowColor="rgba(212, 175, 55, 0.1)">
                  <div className="membership-tier">
                    <div className="tier-header">
                      <div className="tier-icon">{tier.icon}</div>
                      <h3 className="tier-name">{tier.name}</h3>
                      <div className="tier-price">
                        <span className="price-amount">{tier.price}</span>
                        <span className="price-period">/month</span>
                      </div>
                    </div>
                    <p className="tier-description">{tier.description}</p>
                    <ul className="tier-benefits">
                      {tier.benefits.map((benefit, idx) => (
                        <li key={idx} className="tier-benefit">
                          <span className="benefit-icon">🌿</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <InteractiveButton
                      variant="secondary"
                      size="lg"
                      className="tier-cta"
                    >
                      {tier.cta}
                    </InteractiveButton>
                  </div>
                </AnimatedCard>
              )}
            </div>
          ))}
        </div>

        <div className="membership-philosophy">
          <h3 className="text-h2 text-center philosophy-title">
            <GlowText
              text="💫 Our Membership Philosophy"
              variant="shimmer"
              size="md"
              colors={['var(--sage-green)', 'var(--rich-gold)']}
            />
          </h3>
          <div className="grid grid-2 gap-xl">
            <div className="philosophy-point">
              <h4 className="text-h3">🌱 Growth at Your Pace</h4>
              <p className="text-body">
                Every tier honors where you are in your journey. There's no pressure to climb, 
                only invitation to bloom in your current season.
              </p>
            </div>
            <div className="philosophy-point">
              <h4 className="text-h3">🤗 Community Care</h4>
              <p className="text-body">
                Built on mutual aid principles with sliding scale options for those who need them. 
                Community over profit, always.
              </p>
            </div>
            <div className="philosophy-point">
              <h4 className="text-h3">🎯 Trauma-Informed</h4>
              <p className="text-body">
                All content and community interactions center healing, with respect for your 
                energy and boundaries.
              </p>
            </div>
            <div className="philosophy-point">
              <h4 className="text-h3">🔄 Seasonal Flexibility</h4>
              <p className="text-body">
                Pause, upgrade, or downgrade anytime without judgment. Your needs change, 
                and your membership should too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SacredMemberships; 