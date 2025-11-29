export default function Hero() {
  return (
    <header className="hero hero-pattern" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <span className="tagline">Rest is strategy · Creation is power</span>
        <h1 id="hero-heading">Midnight Magnolia</h1>
        <p className="hero-copy">
          A southern-gothic healing studio weaving ritual, recovery, and soft power into digital sanctuaries.
          Our systems hold your business while you stay rooted in ease.
        </p>
        <div className="hero-actions">
          <a className="cta" href="/shop" data-testid="button-browse-collection">
            Enter the Healing Codex
          </a>
          <a className="cta secondary" href="/tiers" data-testid="button-join-collective">
            Join the Collective
          </a>
          <p className="note" role="note">
            🌕 Guided AA & SMART reflections · 🌿 Automations that honor rest · 🌺 Ritual design for creative recovery
          </p>
        </div>
      </div>
    </header>
  );
}
