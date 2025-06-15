"use client"

const VALUES = [
  {
    icon: "🌙",
    title: "Trauma-Informed",
    description: "Every tool designed with gentleness and understanding for your healing journey.",
  },
  {
    icon: "🌸",
    title: "Ancestral Wisdom",
    description: "Honoring the strength and knowledge passed down through generations of resilient women.",
  },
  {
    icon: "✨",
    title: "Neurodivergent Friendly",
    description: "Celebrating different minds with tools that work with your brain, not against it.",
  },
  {
    icon: "🕊️",
    title: "Inclusive Sanctuary",
    description: "A safe space for all identities, especially Black women and marginalized voices.",
  },
  {
    icon: "🔮",
    title: "Digital Innovation",
    description: "Blending ancient wisdom with modern technology for accessible healing tools.",
  },
  {
    icon: "🚗",
    title: "Community Support",
    description: "From digital products to local courier services, we support your whole life.",
  },
]

export default function About() {
  return (
    <section className="section bg-magnolia">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-badge">Our Sacred Mission</div>

            <h2 className="section-title">
              Healing is not linear,
              <br />
              <span className="text-gold">and that's beautiful</span>
            </h2>

            <div className="about-text">
              <p>
                Founded by <strong>Latisha Vincent-Waters</strong> under Rumi-Nations LLC, Midnight Magnolia is a
                digital sanctuary where Southern Gothic grace meets ancestral wisdom. We create tools for souls seeking
                transformation through gentle productivity and sacred rituals.
              </p>
              <p>
                Whether you're navigating chronic illness, ADHD, sobriety, or simply seeking a more mindful approach to
                life and business, you belong here. Every ritual, every journal prompt, every gentle reminder is crafted
                with love for the beautifully complex human you are.
              </p>
              <p>
                From our healing journals and tarot decks to our courier services and digital business tools, everything
                we create honors your pace, your story, and your unique journey toward wholeness.
              </p>
            </div>

            <div className="feature-cards">
              <div className="feature-card">
                <div className="feature-icon">🌱</div>
                <h3>Gentle Growth</h3>
                <p>Progress at your own sacred pace</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🕯️</div>
                <h3>Sacred Rituals</h3>
                <p>Daily practices for inner peace</p>
              </div>
            </div>
          </div>

          <div className="values-grid">
            {VALUES.map((value, index) => (
              <div key={value.title} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <div className="value-content">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3xl);
          align-items: start;
        }

        .section-badge {
          background-color: var(--sage-green);
          color: var(--magnolia-white);
          font-family: var(--font-ui);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: var(--space-xs) var(--space-md);
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: var(--space-md);
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          color: var(--midnight-blue);
          line-height: 1.2;
          margin-bottom: var(--space-xl);
        }

        .about-text {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #374151;
          margin-bottom: var(--space-xl);
        }

        .about-text p {
          margin-bottom: var(--space-md);
        }

        .about-text strong {
          color: var(--midnight-blue);
          font-weight: 600;
        }

        .feature-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }

        .feature-card {
          text-align: center;
          padding: var(--space-md);
          background: rgba(10, 25, 47, 0.05);
          border-radius: 1rem;
          transition: var(--transition-gentle);
        }

        .feature-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-soft);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: var(--space-xs);
        }

        .feature-card h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--midnight-blue);
          margin-bottom: var(--space-xs);
        }

        .feature-card p {
          font-size: 0.875rem;
          color: #6B7280;
        }

        .values-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .value-card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
          padding: var(--space-md);
          background: white;
          border-radius: 1rem;
          box-shadow: var(--shadow-soft);
          border: 1px solid var(--dewdrop-silver);
          transition: var(--transition-gentle);
        }

        .value-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .value-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .value-content h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--midnight-blue);
          margin-bottom: var(--space-xs);
        }

        .value-content p {
          color: #6B7280;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
          }
          
          .feature-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
