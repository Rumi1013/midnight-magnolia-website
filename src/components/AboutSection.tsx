import React from 'react'
import '../styles/design-system.css'

const AboutSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-h1 animate-fade-in">🌙 About Midnight Magnolia</h2>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '700px', margin: '0 auto var(--space-2xl)' }}>
            Born from the intersection of ancestral wisdom and digital innovation, 
            Midnight Magnolia creates technology that heals rather than harms.
          </p>
        </div>

        {/* Founder Story */}
        <div className="grid grid-2 gap-xl" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="card animate-slide-up">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>🌸 Latisha's Journey</h3>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              Midnight Magnolia was born from the ashes of burnout, the trauma of activism, 
              and the journey of self-discovery that follows when you finally choose yourself.
            </p>
            <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
              For years, I poured myself into the movement for Black liberation. I showed up in 
              the streets, in the meetings, in the unspoken spaces where freedom was born. 
              This work was sacred, and I remain deeply grateful to have been part of it.
            </p>
            <p className="text-body">
              But at 42, I received an ADHD diagnosis that finally provided context for what I had 
              experienced as failure. I wasn't broken—I was wired differently in a world that 
              never learned to listen.
            </p>
          </div>
          
          <div className="card animate-slide-up">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>✨ The Transformation</h3>
            <blockquote style={{ 
              fontStyle: 'italic', 
              borderLeft: '3px solid var(--accent-primary)', 
              paddingLeft: 'var(--space-md)', 
              marginBottom: 'var(--space-md)',
              color: 'var(--text-secondary)'
            }}>
              "From the ashes of burnout, the trauma of activism, and the misdiagnosis of my 
              being—I birthed Midnight Magnolia. Not just a business. A sanctuary. A soft rebellion."
            </blockquote>
            <p className="text-body">
              Today, Midnight Magnolia stands as a testament to what's possible when you transform 
              pain into purpose. Every project is an opportunity to center justice, accessibility, 
              and the wisdom of communities who have been building resilience for generations.
            </p>
          </div>
        </div>

        {/* Values & Philosophy */}
        <div className="card card-highlight" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🔮 Our Values & Philosophy
          </h3>
          <div className="grid grid-2 gap-lg">
            <div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🕯️ Healing-Centered Technology
              </h4>
              <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
                Technology that tends to wholeness rather than extraction. Every tool, website, 
                and automation workflow is designed to support human flourishing.
              </p>
              
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🌿 Accessibility First
              </h4>
              <p className="text-body">
                Digital spaces for every nervous system. We center neurodivergent needs, 
                trauma-informed design, and inclusive experiences from the ground up.
              </p>
            </div>
            <div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🌙 Mystical & Practical
              </h4>
              <p className="text-body" style={{ marginBottom: 'var(--space-md)' }}>
                Code infused with ritual and intention. We honor ancestral wisdom while 
                embracing modern innovation to create truly transformative experiences.
              </p>
              
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                💫 Community-Led
              </h4>
              <p className="text-body">
                Your vision guides the journey. We practice collaborative design, sliding 
                scale pricing, and approach every project as sacred partnership.
              </p>
            </div>
          </div>
        </div>

        {/* The Name Meaning */}
        <div className="grid grid-2 gap-xl" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="card animate-slide-up">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>
              🌙 Midnight
            </h3>
            <p className="text-body">
              Represents the threshold between endings and beginnings, symbolizing transformation, 
              deep introspection, and the power of unseen potential. Midnight is the hour of change, 
              where clarity emerges from darkness, aligning with the transition to a new way of being.
            </p>
          </div>
          
          <div className="card animate-slide-up">
            <h3 className="text-h2" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-md)' }}>
              🌸 Magnolia
            </h3>
            <p className="text-body">
              Signifies perseverance, dignity, and beauty in resilience. Magnolias bloom through adversity, 
              symbolizing the endurance of Black women in challenging environments. The magnolia tree is strong, 
              deeply rooted, and able to withstand storms—just as this work is built to thrive through change.
            </p>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="card" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h3 className="text-h2 text-center" style={{ color: 'var(--accent-primary)', marginBottom: 'var(--space-lg)' }}>
            🌿 Areas of Expertise
          </h3>
          <div className="grid grid-3 gap-lg">
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>💻</div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Technical Mastery</h4>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• React & TypeScript</li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Automation (Make.com)</li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Content Management</li>
                <li className="text-body">• SEO & Strategy</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>🌱</div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Community Experience</h4>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Extension Agent Background</li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Grassroots Organizing</li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Grant Writing</li>
                <li className="text-body">• Workshop Facilitation</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-sm)' }}>🔮</div>
              <h4 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>Spiritual Practice</h4>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Trauma-Informed Design</li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Healing-Centered Approach</li>
                <li className="text-body" style={{ marginBottom: 'var(--space-xs)' }}>• Intuitive Strategy</li>
                <li className="text-body">• Sacred Technology Ethics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Quote */}
        <div className="text-center">
          <blockquote style={{ 
            fontSize: 'var(--text-lg)',
            fontStyle: 'italic',
            color: 'var(--accent-primary)',
            marginBottom: 'var(--space-md)'
          }}>
            "I am not who I was. But every part of her lives in me. Honored. Released. Transformed."
          </blockquote>
          <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Midnight Magnolia isn't just a business—it's a referendum on how technology should work. 
            It's a space for healing, creating, and thriving without exhaustion as the price of success.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 