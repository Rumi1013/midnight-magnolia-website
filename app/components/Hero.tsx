"use client"

import { useState, useEffect } from "react"

const AFFIRMATIONS = ["You are worthy of rest", "Your pace is sacred", "Healing is not linear", "You belong here"]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return <HeroSkeleton />

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="celestial-overlay" />
        <FloatingElements />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-logo">
            <div className="logo-circle">
              <span className="logo-icon">🌸</span>
            </div>
          </div>

          <div className="hero-text">
            <p className="hero-subtitle">Welcome to your digital sanctuary</p>

            <h1 className="hero-title">
              Midnight
              <br />
              <span className="text-gold">Magnolia</span>
            </h1>

            <div className="affirmation-container">
              <p className="affirmation" key={currentAffirmation}>
                "{AFFIRMATIONS[currentAffirmation]}"
              </p>
            </div>

            <p className="hero-description">
              Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
              productivity, sacred rituals, and transformative digital tools.
            </p>
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary btn-large">Enter the Garden</button>
            <button className="btn btn-secondary btn-large">Explore Sacred Tools</button>
          </div>

          <div className="hero-stats">
            {[
              { number: "500+", label: "Healing souls" },
              { number: "78", label: "Tarot cards" },
              { number: "24/7", label: "Gentle support" },
            ].map((stat, index) => (
              <div key={index} className="stat">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScrollIndicator />

      <style jsx>{`
        .hero {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--midnight-blue) 0%, var(--midnight-indigo) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .celestial-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 20%, rgba(163, 177, 138, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(155, 143, 181, 0.08) 0%, transparent 50%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: var(--space-2xl) 0;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-logo {
          margin-bottom: var(--space-xl);
        }

        .logo-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(250, 243, 224, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(250, 243, 224, 0.2);
        }

        .logo-icon {
          font-size: 3rem;
          filter: drop-shadow(0 0 10px rgba(250, 243, 224, 0.3));
        }

        .hero-text {
          margin-bottom: var(--space-xl);
        }

        .hero-subtitle {
          color: var(--sage-green);
          font-family: var(--font-ui);
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: var(--space-md);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          color: var(--magnolia-white);
          line-height: 0.9;
          margin-bottom: var(--space-lg);
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .affirmation-container {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-lg);
        }

        .affirmation {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--lavender-mist);
          font-style: italic;
          opacity: 0;
          animation: fadeInOut 4s infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(10px); }
          20%, 80% { opacity: 1; transform: translateY(0); }
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(250, 243, 224, 0.9);
          line-height: 1.6;
          margin-bottom: var(--space-xl);
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          align-items: center;
          margin-bottom: var(--space-xl);
        }

        .btn-large {
          padding: var(--space-md) var(--space-xl);
          font-size: 1.125rem;
          min-width: 200px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-xl);
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--rich-gold);
          text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
        }

        .stat-label {
          font-family: var(--font-ui);
          font-size: 0.875rem;
          color: rgba(250, 243, 224, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (min-width: 640px) {
          .hero-actions {
            flex-direction: row;
            gap: var(--space-lg);
          }
        }
      `}</style>
    </section>
  )
}

function FloatingElements() {
  return (
    <div className="floating-elements">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-element"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        >
          {["🌙", "✨", "🌿", "🕯️"][i % 4]}
        </div>
      ))}

      <style jsx>{`
        .floating-elements {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .floating-element {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0.6;
          animation: float infinite linear;
          filter: drop-shadow(0 0 10px rgba(250, 243, 224, 0.3));
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <p>Begin your journey</p>
      <div className="scroll-mouse">
        <div className="scroll-dot" />
      </div>

      <style jsx>{`
        .scroll-indicator {
          position: absolute;
          bottom: var(--space-lg);
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: rgba(250, 243, 224, 0.6);
          font-family: var(--font-ui);
          font-size: 0.875rem;
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(250, 243, 224, 0.3);
          border-radius: 20px;
          margin: var(--space-xs) auto 0;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .scroll-dot {
          width: 4px;
          height: 12px;
          background-color: rgba(250, 243, 224, 0.6);
          border-radius: 2px;
          animation: scroll-bounce 2s infinite;
        }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

function HeroSkeleton() {
  return (
    <section
      className="hero bg-midnight"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="text-center text-magnolia">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-magnolia/10 rounded-full mx-auto mb-8"></div>
          <div className="h-16 bg-magnolia/10 rounded mb-4"></div>
          <div className="h-8 bg-magnolia/10 rounded mb-8"></div>
        </div>
      </div>
    </section>
  )
}
