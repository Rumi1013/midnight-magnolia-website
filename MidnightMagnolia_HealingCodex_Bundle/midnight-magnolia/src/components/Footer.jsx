import React from 'react'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="mood-ring" aria-live="polite">
          <strong>🌿 Sage · grounded ease</strong>
          <p>
            🌼 Southern Gold steadies balance · 🌺 Plum honors elevated creativity · 🌑 Midnight invites reset.
          </p>
        </div>
        <h2 className="footer-heading">Stay rooted in ritual and gentle autonomy.</h2>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#shop">Shop</a>
          <a href="#services">Services</a>
          <a href="#blog">Journal</a>
          <a href="#contact">Contact</a>
        </nav>
        <div id="accessibility" className="sr-only">
          Accessibility Promise: WCAG AA+ contrast, motion under 3% luminance shift, skip links, and transcripts for every audio ritual.
        </div>
        <div id="privacy" className="sr-only">
          Privacy: Reflections are encrypted, never sold, and removable on request through Wise/Stripe compliant workflows.
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Midnight Magnolia</span>
          <span>Crafted in the South with care and quiet resilience.</span>
          <a href="#accessibility">Accessibility Promise</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
