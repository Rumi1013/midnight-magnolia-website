import React from 'react'
import '../styles/design-system.css'

interface PatreonTier {
  name: string
  price: string
  description: string
  benefits: string[]
  popular?: boolean
}

const CommunitySection: React.FC = () => {
  const patreonTiers: PatreonTier[] = [
    {
      name: 'Seedling Support',
      price: '$3/month',
      description: 'Perfect for those beginning their healing-centered business journey.',
      benefits: [
        'Monthly community check-ins',
        'Access to private Discord server',
        'Resource library access',
        'Monthly motivation wallpapers',
        'Early access to blog posts'
      ]
    },
    {
      name: 'Blooming Creator',
      price: '$15/month',
      description: 'For entrepreneurs ready to implement healing-centered practices.',
      benefits: [
        'Everything in Seedling Support',
        'Monthly group coaching calls',
        'Templates and workflow guides',
        'Behind-the-scenes content',
        'Product launch support',
        'Priority community support'
      ],
      popular: true
    },
    {
      name: 'Sacred Partnership',
      price: '$35/month',
      description: 'Deep collaboration for established healing-centered businesses.',
      benefits: [
        'Everything in Blooming Creator',
        'Quarterly 1:1 strategy sessions',
        'Custom automation recommendations',
        'Brand development feedback',
        'Direct message access',
        'Beta testing opportunities'
      ]
    },
    {
      name: 'Magnolia Guardian',
      price: '$75/month',
      description: 'Executive-level support for visionary leaders and organizations.',
      benefits: [
        'Everything in Sacred Partnership',
        'Monthly 1:1 intensive calls',
        'Custom resource creation',
        'Priority project consultation',
        'Speaking/collaboration opportunities',
        'Legacy project involvement'
      ]
    }
  ]

  const communityInitiatives = [
    {
      title: 'AI for Black Women Entrepreneurs',
      icon: '🤖',
      description: 'Making AI tools accessible for business growth through workshops and mentorship.',
      features: [
        'Monthly AI workshops',
        'Personalized tool setup assistance',
        'Prompt engineering masterclass',
        'Ethics in AI discussions'
      ]
    },
    {
      title: 'Survivor Support Network',
      icon: '💪',
      description: 'Data-driven support programs for sexual abuse survivors in Southern communities.',
      features: [
        'Support group facilitation',
        'Resource connecting',
        'Trauma-informed workplace training',
        'Healing-centered business practices'
      ]
    },
    {
      title: 'Southern Tech Accelerator',
      icon: '🌾',
      description: 'Building tech skills and remote work opportunities for rural Black women.',
      features: [
        'Remote work readiness training',
        'Digital marketing certification',
        'Tech mentorship matching',
        'Community partnership development'
      ]
    }
  ]

  const blogSeries = [
    {
      title: 'Diagnosis After 40',
      description: 'Finding ADHD voice, executive dysfunction solutions, and building systems that work.',
      icon: '🧠'
    },
    {
      title: 'Southern Activist Chronicles',
      description: 'Community organizing in small towns and building inclusive spaces in traditional communities.',
      icon: '✊🏾'
    },
    {
      title: 'Living with Invisible Disabilities',
      description: 'Navigating social spaces, entrepreneurship, and teaching others about invisible disabilities.',
      icon: '🌙'
    }
  ]

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center community-header">
          <h2 className="text-h1 animate-fade-in">💫 Sacred Community</h2>
          <p className="text-body-lg animate-slide-up community-description">
            Join a healing-centered community where Southern wisdom meets modern innovation. 
            Support each other's growth while accessing exclusive resources and connections.
          </p>
        </div>

        {/* Patreon Tiers */}
        <div className="community-tiers-section">
          <h3 className="text-h2 text-center community-tiers-section-title">
            🌿 Community Membership Tiers
          </h3>
          
          <div className="tiers-grid grid grid-2 gap-lg">
            {patreonTiers.map((tier, index) => (
              <article 
                key={index} 
                className={`tier-card card community-tier-card ${tier.popular ? 'card-highlight' : ''} animate-slide-up`}
              >
                {tier.popular && (
                  <div className="community-tier-popular-badge">
                    ✨ MOST POPULAR
                  </div>
                )}

                <div className="tier-header text-center community-tier-header">
                  <h4 className="text-h2 community-tier-title">
                    {tier.name}
                  </h4>
                  <div className="tier-price text-h1 community-tier-price">
                    {tier.price}
                  </div>
                  <p className="text-body community-tier-description">
                    {tier.description}
                  </p>
                </div>

                <div className="tier-benefits community-tier-benefits">
                  <h5 className="text-h3 community-tier-benefits-title">
                    Sacred Offerings:
                  </h5>
                  <ul className="community-tier-benefits-list">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li 
                        key={benefitIndex}
                        className="text-body community-tier-benefit-item"
                      >
                        <span className="community-tier-benefit-icon">
                          ✨
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="community-tier-cta">
                  <button type="button" className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} community-tier-button`}>
                    Join on Patreon 🌸
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Community Initiatives */}
        <div className="community-initiatives-section">
          <h3 className="text-h2 text-center community-initiatives-section-title">
            🌱 Community Initiatives
          </h3>
          
          <div className="initiatives-grid grid grid-3 gap-lg">
            {communityInitiatives.map((initiative, index) => (
              <div key={index} className="initiative-card card animate-slide-up">
                <div className="text-center community-initiative-content">
                  <div className="community-initiative-icon">
                    {initiative.icon}
                  </div>
                  <h4 className="text-h3 community-initiative-title">
                    {initiative.title}
                  </h4>
                  <p className="text-body community-initiative-description">
                    {initiative.description}
                  </p>
                </div>
                
                <ul className="community-initiative-features">
                  {initiative.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="text-body community-initiative-feature"
                    >
                      <span className="community-initiative-feature-bullet">
                        •
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Series Preview */}
        <div className="community-blog-section">
          <h3 className="text-h2 text-center community-blog-section-title">
            📝 Southern Roots, Modern Blooms
          </h3>
          <p className="text-body-lg text-center community-blog-description">
            Personal narrative and community storytelling exploring disability advocacy, 
            Black Southern experience, and the ADHD journey.
          </p>
          
          <div className="blog-series grid grid-3 gap-lg">
            {blogSeries.map((series, index) => (
              <div key={index} className="series-card card animate-slide-up text-center">
                <div className="community-blog-series-icon">
                  {series.icon}
                </div>
                <h4 className="text-h3 community-blog-series-title">
                  {series.title}
                </h4>
                <p className="text-body community-blog-series-description">
                  {series.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="card community-revenue-section">
          <h3 className="text-h2 text-center community-revenue-section-title">
            📊 Building Sustainable Community
          </h3>
          <p className="text-body text-center community-revenue-description">
            Transparent insights into building a healing-centered technology practice. 
            Growing slowly and sustainably, prioritizing community care over rapid scaling.
          </p>
          
          <div className="revenue-streams grid grid-2 gap-lg">
            <div className="revenue-card community-revenue-card">
              <h4 className="text-h3 community-revenue-card-title">
                💫 Community Building
              </h4>
              <div className="revenue-amount text-h1 community-revenue-amount">
                Early Stage
              </div>
              <p className="text-body">
                Focusing on authentic connections and sustainable growth rather than vanity metrics
              </p>
            </div>
            
            <div className="revenue-card community-revenue-card">
              <h4 className="text-h3 community-revenue-card-title">
                🔮 Services & Products
              </h4>
              <div className="revenue-amount text-h1 community-revenue-amount">
                Growing
              </div>
              <p className="text-body">
                Building portfolio and refining offerings based on community needs and feedback
              </p>
            </div>
          </div>
          
          <div className="growth-principles community-growth-principles">
            <h4 className="text-h3 text-center community-growth-title">
              🌱 Our Growth Principles
            </h4>
            <div className="principles-grid grid grid-2 gap-lg">
              <div className="principle-card text-center">
                <div className="community-principle-icon">🌿</div>
                <h5 className="text-h3 community-principle-title">Sustainable Pace</h5>
                <p className="text-body community-principle-description">
                  Growing at a pace that honors capacity and prevents burnout
                </p>
              </div>
              <div className="principle-card text-center">
                <div className="community-principle-icon">💚</div>
                <h5 className="text-h3 community-principle-title">Community First</h5>
                <p className="text-body community-principle-description">
                  Prioritizing authentic relationships over rapid customer acquisition
                </p>
              </div>
              <div className="principle-card text-center">
                <div className="community-principle-icon">🔄</div>
                <h5 className="text-h3 community-principle-title">Iterative Learning</h5>
                <p className="text-body community-principle-description">
                  Continuously refining based on community feedback and needs
                </p>
              </div>
              <div className="principle-card text-center">
                <div className="community-principle-icon">⚖️</div>
                <h5 className="text-h3 community-principle-title">Accessible Pricing</h5>
                <p className="text-body community-principle-description">
                  Sliding scale and payment plans to serve diverse economic situations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-h2 community-cta-title">
            🌸 Ready to Join Our Sacred Community?
          </h3>
          <p className="text-body-lg community-cta-description">
            Choose the membership tier that resonates with your journey and join us in creating 
            healing-centered technology and business practices.
          </p>
          <div className="community-cta-buttons">
            <button type="button" className="btn btn-primary">
              Join on Patreon 💫
            </button>
            <button type="button" className="btn btn-secondary">
              Explore Free Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection 