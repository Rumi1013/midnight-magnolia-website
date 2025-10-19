import logoImage from "@assets/DD927ECB-BEA2-4D80-A9A5-22E371277B56_1760072655904.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Midnight Magnolia Logo" 
                className="h-8 w-8 object-contain magnolia-icon"
              />
              <span className="font-display text-xl font-bold">Midnight Magnolia</span>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Rooted in mystery. Blooming in truth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wide font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-home">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-about">
                  About
                </a>
              </li>
              <li>
                <a href="/shop" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-shop">
                  Shop
                </a>
              </li>
              <li>
                <a href="/tiers" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-membership">
                  Membership
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wide font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('journal')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-body text-sm text-muted-foreground hover:text-accent transition-colors text-left"
                  data-testid="footer-button-journal-portal"
                >
                  Journal Portal
                </button>
              </li>
              <li>
                <a href="/dashboard" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-dashboard">
                  Creator Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-docs">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="font-body text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-support">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-accent text-sm uppercase tracking-wide font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.instagram.com/noirmagnoliasc/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors" data-testid="social-instagram">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="https://www.facebook.com/midnightmagnoliasc/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors" data-testid="social-facebook">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="https://www.patreon.com/MidnightMagnoliaSC" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-foreground transition-colors" data-testid="social-patreon">
                <i className="fab fa-patreon text-2xl"></i>
              </a>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Join our community of conscious creators
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              <a href="mailto:latisha@midnight-magnolia.com" className="text-accent hover:underline">
                latisha@midnight-magnolia.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="font-accent text-sm text-muted-foreground mb-4 md:mb-0 text-center md:text-left">
            <p className="mb-1">
              <strong>Midnight Magnolia</strong> | © 2025 Rumi-Nations LLC
            </p>
            <p>Summerville, SC</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="font-accent text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="font-accent text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-terms">
              Terms of Service
            </a>
            <a href="#" className="font-accent text-sm text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-cookies">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
