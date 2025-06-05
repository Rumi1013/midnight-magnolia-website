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
        <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h1 animate-fade-in">💫 Sacred Community</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Join a healing-centered community where Southern wisdom meets modern innovation. 
            Support each other's growth while accessing exclusive resources and connections.
          </p>
        </div>

        {/* Patreon Tiers */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            🌿 Community Membership Tiers
          </h3>
          
          <div className="tiers-grid grid grid-2 gap-lg">
            {patreonTiers.map((tier, index) => (
              <article 
                key={index} 
                className={`tier-card card ${tier.popular ? 'card-highlight' : ''} animate-slide-up`}
                style={{ 
                  position: 'relative',
                  minHeight: '400px'
                }}
              >
                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--space-sm)',
                    right: 'var(--space-sm)',
                    background: 'var(--accent-primary)',
                    color: 'var(--night-primary)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--weight-bold)',
                    zIndex: 2
                  }}>
                    ✨ MOST POPULAR
                  </div>
                )}

                <div className="tier-header text-center" style={{ marginBottom: 'var(--space-lg)' }}>
                  <h4 className="text-h2" style={{ marginBottom: 'var(--space-xs)' }}>
                    {tier.name}
                  </h4>
                  <div className="tier-price text-h1" style={{ 
                    color: 'var(--accent-primary)',
                    fontWeight: 'var(--weight-bold)',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    {tier.price}
                  </div>
                  <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                    {tier.description}
                  </p>
                </div>

                <div className="tier-benefits" style={{ marginBottom: 'var(--space-lg)' }}>
                  <h5 className="text-h3" style={{ 
                    marginBottom: 'var(--space-md)',
                    color: 'var(--accent-primary)',
                    fontSize: 'var(--text-lg)'
                  }}>
                    Sacred Offerings:
                  </h5>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li 
                        key={benefitIndex}
                        className="text-body"
                        style={{ 
                          marginBottom: 'var(--space-xs)',
                          paddingLeft: 'var(--space-sm)',
                          position: 'relative'
                        }}
                      >
                        <span style={{ 
                          position: 'absolute',
                          left: 0,
                          color: 'var(--accent-primary)'
                        }}>
                          ✨
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ 
                  position: 'absolute',
                  bottom: 'var(--space-lg)',
                  left: 'var(--space-lg)',
                  right: 'var(--space-lg)'
                }}>
                  <button className={`btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                    Join on Patreon 🌸
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Community Initiatives */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            🌱 Community Initiatives
          </h3>
          
          <div className="initiatives-grid grid grid-3 gap-lg">
            {communityInitiatives.map((initiative, index) => (
              <div key={index} className="initiative-card card animate-slide-up">
                <div className="text-center" style={{ marginBottom: 'var(--space-lg)' }}>
                  <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                    {initiative.icon}
                  </div>
                  <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                    {initiative.title}
                  </h4>
                  <p className="text-body" style={{ 
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-md)'
                  }}>
                    {initiative.description}
                  </p>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {initiative.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="text-body"
                      style={{ 
                        marginBottom: 'var(--space-xs)',
                        paddingLeft: 'var(--space-sm)',
                        position: 'relative'
                      }}
                    >
                      <span style={{ 
                        position: 'absolute',
                        left: 0,
                        color: 'var(--accent-primary)'
                      }}>
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
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            📝 Southern Roots, Modern Blooms
          </h3>
          <p className="text-body-lg text-center" style={{ 
            maxWidth: '600px', 
            margin: '0 auto var(--space-2xl)',
            color: 'var(--text-secondary)'
          }}>
            Personal narrative and community storytelling exploring disability advocacy, 
            Black Southern experience, and the ADHD journey.
          </p>
          
          <div className="blog-series grid grid-3 gap-lg">
            {blogSeries.map((series, index) => (
              <div key={index} className="series-card card animate-slide-up text-center">
                <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-md)' }}>
                  {series.icon}
                </div>
                <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                  {series.title}
                </h4>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  {series.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            📊 Community Growth & Impact
          </h3>
          <p className="text-body text-center" style={{ 
            marginBottom: 'var(--space-2xl)',
            color: 'var(--text-secondary)'
          }}>
            Transparent insights into our multi-stream approach to sustainable creative business. 
            Building towards $4,000 monthly recurring revenue through diversified offerings.
          </p>
          
          <div className="revenue-streams grid grid-2 gap-lg">
            <div className="revenue-card" style={{
              background: 'var(--bg-glass)',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <h4 className="text-h3" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-sm)' }}>
                💫 Patreon Community
              </h4>
              <div className="revenue-amount text-h1" style={{ 
                color: 'var(--accent-primary)',
                marginBottom: 'var(--space-sm)'
              }}>
                $350 / $500
              </div>
              <div className="progress-bar" style={{
                width: '100%',
                height: '8px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-sm)'
              }}>
                <div className="progress-fill" style={{
                  width: '70%',
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--muted-gold))',
                  borderRadius: 'var(--radius-sm)'
                }}></div>
              </div>
              <p className="text-body">Growing membership base across all tiers with high engagement</p>
            </div>
            
            <div className="revenue-card" style={{
              background: 'var(--bg-glass)',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <h4 className="text-h3" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-sm)' }}>
                🔮 Digital Products
              </h4>
              <div className="revenue-amount text-h1" style={{ 
                color: 'var(--accent-primary)',
                marginBottom: 'var(--space-sm)'
              }}>
                $900 / $1,500
              </div>
              <div className="progress-bar" style={{
                width: '100%',
                height: '8px',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-sm)'
              }}>
                <div className="progress-fill" style={{
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--muted-gold))',
                  borderRadius: 'var(--radius-sm)'
                }}></div>
              </div>
              <p className="text-body">Active products generating consistent sales with high customer ratings</p>
            </div>
          </div>
          
          <div className="growth-metrics grid grid-4 gap-lg" style={{ marginTop: 'var(--space-2xl)' }}>
            <div className="metric-card text-center">
              <div className="metric-number text-h1" style={{ color: 'var(--accent-primary)' }}>1,025</div>
              <h5 className="text-body" style={{ color: 'var(--text-secondary)' }}>Email Subscribers</h5>
              <div className="metric-growth text-caption" style={{ color: 'var(--sage-green)' }}>+175 this month</div>
            </div>
            <div className="metric-card text-center">
              <div className="metric-number text-h1" style={{ color: 'var(--accent-primary)' }}>2,650</div>
              <h5 className="text-body" style={{ color: 'var(--text-secondary)' }}>Social Following</h5>
              <div className="metric-growth text-caption" style={{ color: 'var(--sage-green)' }}>+350 this month</div>
            </div>
            <div className="metric-card text-center">
              <div className="metric-number text-h1" style={{ color: 'var(--accent-primary)' }}>4,100</div>
              <h5 className="text-body" style={{ color: 'var(--text-secondary)' }}>Website Visitors</h5>
              <div className="metric-growth text-caption" style={{ color: 'var(--sage-green)' }}>+900 this month</div>
            </div>
            <div className="metric-card text-center">
              <div className="metric-number text-h1" style={{ color: 'var(--accent-primary)' }}>2.7%</div>
              <h5 className="text-body" style={{ color: 'var(--text-secondary)' }}>Conversion Rate</h5>
              <div className="metric-growth text-caption" style={{ color: 'var(--sage-green)' }}>+0.6% this month</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🌸 Ready to Join Our Sacred Community?
          </h3>
          <p className="text-body-lg" style={{ marginBottom: 'var(--space-lg)' }}>
            Choose the membership tier that resonates with your journey and join us in creating 
            healing-centered technology and business practices.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary">
              Join on Patreon 💫
            </button>
            <button className="btn btn-secondary">
              Explore Free Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection 