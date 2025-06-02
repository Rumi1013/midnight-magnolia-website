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
    { id: 'products', label: 'Products', icon: '🔮' },
    { id: 'community', label: 'Community', icon: '💫' },
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
              Midnight Magnolia was born from the ashes of burnout, the trauma of activism, 
              and the journey of self-discovery that follows when you finally choose yourself. 
              My path to creating this brand was neither straightforward nor gentle—but it was necessary.
            </p>
            <p>
              For years, I poured myself into the movement for Black liberation. I showed up in 
              the streets, in the meetings, in the unspoken spaces where freedom was born. I helped 
              free countless individuals, reunite families, and challenge systems of oppression. 
              This work was sacred, and I remain deeply, soulfully grateful to have been part of it.
            </p>
            <p>
              But inside the movement, I found more harm. I experienced exploitation while preaching 
              liberation. I gave everything I had—my time, my mind, my heart—and still, I was used, 
              plotted against, worn down. My literal job was to free Black people. But I had to ask 
              myself: who was freeing me?
            </p>
            <div className="manifesto-quote">
              <p>
                "From the ashes of burnout, the trauma of activism, and the misdiagnosis of my 
                being—I birthed Midnight Magnolia. Not just a business. A sanctuary. A soft rebellion."
              </p>
            </div>
            <p>
              At 42, I received an ADHD diagnosis that finally provided context for what I had 
              experienced as failure. I wasn't broken—I was wired differently in a world that 
              never learned to listen. Today, Midnight Magnolia stands as a testament to what's 
              possible when you transform pain into purpose.
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

          <div className="business-ecosystem">
            <h3>🌙 The Digital Grimoire Ecosystem</h3>
            <p>
              Midnight Magnolia operates as a comprehensive digital ecosystem—part creative studio, part healing sanctuary, 
              part community hub. Our Digital Grimoire serves as the central command hub integrating tarot system development, 
              digital products, Patreon community, and marketplace publishing.
            </p>
            
            <div className="ecosystem-grid">
              <div className="ecosystem-card">
                <h4>🔮 Tarot System Development</h4>
                <p>
                  Currently developing a complete 78-card Southern Oracle Tarot deck featuring historical Black figures 
                  as personas. Each card includes custom affirmations, journal prompts, and healing-centered interpretations 
                  rooted in ancestral wisdom.
                </p>
              </div>
              
              <div className="ecosystem-card">
                <h4>📚 Digital Product Catalog</h4>
                <p>
                  Active product line including Digital Entrepreneur's Starter Kit ($37), Brand Identity Workbook ($29), 
                  and Automation Workflow Templates ($49). Focus on tools that support neurodivergent entrepreneurs 
                  and community organizations.
                </p>
              </div>
              
              <div className="ecosystem-card">
                <h4>💫 Community Revenue Streams</h4>
                <p>
                  Multi-platform approach with Patreon tiers ($3-$75), KDP publishing, Etsy shop, and consulting services. 
                  Currently achieving 67.5% of $4,000 monthly revenue goal through diversified income streams.
                </p>
              </div>
              
              <div className="ecosystem-card">
                <h4>🧠 AI-Powered Content Creation</h4>
                <p>
                  Leveraging AI tools for tarot interpretations, journal prompts, affirmation sets, and product descriptions 
                  while maintaining authentic voice and healing-centered approach. Custom prompt templates ensure brand consistency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy-section">
        <h3>🌺 The Meaning Behind the Name</h3>
        <div className="philosophy-content">
          <div className="name-meaning">
            <div className="meaning-part">
              <h4>Midnight</h4>
              <p>
                Represents the threshold between endings and beginnings, symbolizing transformation, 
                deep introspection, and the power of unseen potential. Midnight is the hour of change, 
                where clarity emerges from darkness, aligning with my transition to a new career and lifestyle.
              </p>
            </div>
            <div className="meaning-part">
              <h4>Magnolia</h4>
              <p>
                Signifies perseverance, dignity, and beauty in resilience. Magnolias bloom through adversity, 
                symbolizing the endurance of Black women in challenging environments. The magnolia tree is strong, 
                deeply rooted, and able to withstand storms—just as this brand is built to thrive through change.
              </p>
            </div>
          </div>
          <blockquote>
            "I am not who I was. But every part of her lives in me. Honored. Released. Transformed."
          </blockquote>
          <p>
            Midnight Magnolia isn't just a creative brand—it's a referendum on how business should work. 
            It's a space for neurodivergent, chronically pained, brilliant Black women like me to rest, 
            to create, to heal, to thrive. It's a model of sustainability that doesn't demand exhaustion 
            as the price of success.
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

  const productCategories = [
    {
      name: "🌙 Southern Oracle Tarot",
      items: ["Magnolia Wisdom deck", "Southern Gothic deck", "Ancestral Guidance cards", "Beginner's reading kit"],
      description: "Tarot and oracle decks featuring southern imagery, Black cultural elements, and traditional symbolism"
    },
    {
      name: "📓 Journals & Stationery",
      items: ["ADHD-friendly planners", "Moon phase journals", "Luxury correspondence sets", "Affirmation cards"],
      description: "Premium paper goods designed for executive function support, mindfulness, and southern elegance"
    },
    {
      name: "🏠 Home Textiles",
      items: ["Table linens", "Decorative pillows", "Bed linens", "Hand towels"],
      description: "Elegant fabric goods featuring magnolia motifs and our signature color palette"
    },
    {
      name: "🎨 Historical & Fan Art Prints",
      items: ["Black history portraits", "Cultural celebration art", "Literary inspirations", "Contemporary fan art"],
      description: "Museum-quality prints celebrating history, heritage, and popular culture with a southern perspective"
    },
    {
      name: "📚 Open Source Publishing",
      items: ["eBooks", "Educational resources", "Community cookbooks", "Digital templates"],
      description: "Accessible digital content supporting education, creativity, and community knowledge-sharing"
    },
    {
      name: "🌿 Digital Wellness Tools",
      items: ["Moon phase apps", "Astrology guides", "Heritage healing resources", "Wellness trackers"],
      description: "Digital platforms connecting ancestral wisdom with modern wellness practices"
    }
  ]

  const patreonTiers = [
    {
      name: "🌱 Seedling",
      price: "$5/month",
      benefits: [
        "Monthly moon phase journal prompts",
        "Early access to digital content",
        "Community Discord access",
        "10% discount on all products"
      ],
      description: "Perfect for those beginning their healing journey"
    },
    {
      name: "🌸 Bloom",
      price: "$15/month",
      benefits: [
        "Everything in Seedling",
        "Monthly virtual office hours with Latisha",
        "Exclusive tarot card previews",
        "20% discount on all products",
        "Priority support for questions"
      ],
      description: "For committed community members seeking deeper connection"
    },
    {
      name: "🌳 Grove",
      price: "$50/month",
      benefits: [
        "Everything in Bloom",
        "Monthly 1:1 consultation call",
        "Custom affirmation cards",
        "30% discount on all products",
        "First access to new product launches"
      ],
      description: "Premium support for entrepreneurs and creators"
    }
  ]

  const renderProducts = () => (
    <div className="products-section">
      <section className="products-hero">
        <h2 className="section-title">🔮 Sacred Creations</h2>
        <p className="products-intro">
          Each product is crafted with intention, infusing healing energy and ancestral wisdom 
          into tools for modern mystics, entrepreneurs, and community builders.
        </p>
      </section>

      <div className="product-categories-grid">
        {productCategories.map((category, index) => (
          <article key={index} className="product-category">
            <div className="product-icon">
              <span className="category-emoji">{category.name.split(' ')[0]}</span>
            </div>
            <h3 className="product-category-title">
              {category.name.replace(/^🌙\s*|^📓\s*|^🏠\s*|^🎨\s*|^📚\s*|^🌿\s*/, '')}
            </h3>
            <p className="product-description">{category.description}</p>
            <div className="product-items">
              {category.items.map((item, i) => (
                <span key={i} className="product-tag">{item}</span>
              ))}
            </div>
            <button className="gentle-cta" onClick={() => handleNavigation('contact')}>
              Learn More →
            </button>
          </article>
        ))}
      </div>

      <section className="tarot-dashboard-preview">
        <h3 className="dashboard-title">🌙 Tarot Creation Dashboard</h3>
        <p className="dashboard-intro">
          Your sacred digital altar where each card, quote, and healing intention lives. 
          Track all 78 cards, personas, and the complete deck development process.
        </p>
        
        <div className="dashboard-features">
          <div className="dashboard-feature">
            <h4>🔮 Deck Overview</h4>
            <p>Track all 78 cards, their personas, progress, and associations.</p>
          </div>
          <div className="dashboard-feature">
            <h4>🌿 Card Builder</h4>
            <p>In-depth reflection template for every card with astrology, meanings, and symbolism.</p>
          </div>
          <div className="dashboard-feature">
            <h4>📚 Persona Library</h4>
            <p>Running log of all figures used in the deck with bios and contributions.</p>
          </div>
          <div className="dashboard-feature">
            <h4>🎨 Design Vault</h4>
            <p>Visual inspiration by card with moodboards and palette references.</p>
          </div>
          <div className="dashboard-feature">
            <h4>💬 Affirmation Archive</h4>
            <p>Browse affirmations filtered by theme: Inner Child, Courage, Rest, Release, Joy.</p>
          </div>
          <div className="dashboard-feature">
            <h4>🧭 Arcana Navigator</h4>
            <p>Major and Minor Arcana organization with elemental and astrological references.</p>
          </div>
        </div>
        
        <div className="tarot-themes">
          <h4>🌘 Recurring Themes & Symbols</h4>
          <div className="theme-tags">
            <span className="theme-tag">Crescent moons</span>
            <span className="theme-tag">Magnolia trees</span>
            <span className="theme-tag">Candles & mirrors</span>
            <span className="theme-tag">Hoodoo elements</span>
            <span className="theme-tag">Southern Gothic imagery</span>
          </div>
        </div>
        
        <p className="tarot-motto">*Rooted in Mystery. Blooming in Truth.*</p>
      </section>
    </div>
  )

  const renderCommunity = () => (
    <div className="community-section">
      <section className="community-hero">
        <h2 className="section-title">💫 Sacred Community</h2>
        <p className="community-intro">
          Join a healing-centered community where Southern wisdom meets modern innovation. 
          Support each other's growth while accessing exclusive resources and connections.
        </p>
      </section>

      <section className="patreon-tiers">
        <h3 className="community-subtitle">🌿 Community Membership Tiers</h3>
        <div className="tiers-grid">
          {patreonTiers.map((tier, index) => (
            <div key={index} className="tier-card">
              <div className="tier-header">
                <h4 className="tier-name">{tier.name}</h4>
                <span className="tier-price">{tier.price}</span>
              </div>
              <p className="tier-description">{tier.description}</p>
              <ul className="tier-benefits">
                {tier.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
              <button className="tier-cta gentle-cta">Join {tier.name.split(' ')[1]} →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="initiatives-overview">
        <h3 className="community-subtitle">🌱 Community Initiatives</h3>
        
        <div className="initiatives-grid">
          <div className="initiative-card">
            <h4>🤖 AI for Black Women Entrepreneurs</h4>
            <p>Making AI tools accessible for business growth through workshops and mentorship.</p>
            <ul>
              <li>Monthly AI workshops</li>
              <li>Personalized tool setup assistance</li>
              <li>Prompt engineering masterclass</li>
            </ul>
          </div>
          
          <div className="initiative-card">
            <h4>💪 Survivor Support Network</h4>
            <p>Data-driven support programs for sexual abuse survivors in Southern communities.</p>
            <ul>
              <li>Support group facilitation</li>
              <li>Resource connecting</li>
              <li>Trauma-informed workplace training</li>
            </ul>
          </div>
          
          <div className="initiative-card">
            <h4>🌾 Southern Tech Accelerator</h4>
            <p>Building tech skills and remote work opportunities for rural Black women.</p>
            <ul>
              <li>Remote work readiness training</li>
              <li>Digital marketing certification</li>
              <li>Tech mentorship matching</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="blog-preview">
        <h3 className="community-subtitle">📝 Southern Roots, Modern Blooms</h3>
        <p className="blog-description">
          Personal narrative and community storytelling exploring disability advocacy, 
          Black Southern experience, and the ADHD journey.
        </p>
        
        <div className="blog-series">
          <div className="series-card">
            <h4>Diagnosis After 40</h4>
            <p>Finding ADHD voice, executive dysfunction solutions, and building systems that work.</p>
          </div>
          <div className="series-card">
            <h4>Southern Activist Chronicles</h4>
            <p>Community organizing in small towns and building inclusive spaces in traditional communities.</p>
          </div>
          <div className="series-card">
            <h4>Living with Invisible Disabilities</h4>
            <p>Navigating social spaces, entrepreneurship, and teaching others about invisible disabilities.</p>
          </div>
        </div>
        
        <div className="memoir-preview">
          <h4>📖 Upcoming Memoir: "Magnolias Also Bloom at Night"</h4>
          <p>
            A journey exploring Black southern identity, late-diagnosis disability, community activism, 
            and entrepreneurship as resistance. Focusing on the transformative decade from 2015-2025.
          </p>
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
      case 'products':
        return renderProducts()
      case 'community':
        return renderCommunity()
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
              <img 
                src="/images/logos/goldenFinal22_MM_25.png" 
                alt="Midnight Magnolia Logo" 
                className="brand-logo"
              />
              <span className="brand-text">Midnight Magnolia</span>
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