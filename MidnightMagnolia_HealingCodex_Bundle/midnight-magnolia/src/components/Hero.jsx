import React from 'react'

export default function Hero(){
  return (
    <header className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <span className="tagline">Rest is strategy · Creation is power</span>
        <h1 id="hero-heading">Midnight Magnolia</h1>
        <p className="hero-copy">
          A southern-gothic healing studio weaving ritual, recovery, and soft
          power into digital sanctuaries. Our systems hold your business while
          you stay rooted in ease.
        </p>
        <div className="hero-actions">
          <a className="cta" href="#codex">Enter the Healing Codex</a>
          <p className="note">
            🌕 Guided AA & SMART reflections · 🌿 Mood-ring footer with gentle motion
          </p>
        </div>
      </div>
    </header>
  )
}
