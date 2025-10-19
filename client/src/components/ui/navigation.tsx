import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/DD927ECB-BEA2-4D80-A9A5-22E371277B56_1760072655904.png";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3" data-testid="link-home">
              <img 
                src={logoImage} 
                alt="Midnight Magnolia Logo" 
                className="h-10 w-10 object-contain magnolia-icon"
              />
              <span className="font-display text-2xl font-bold text-foreground">
                Midnight Magnolia
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-home-nav"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-about"
            >
              About
            </a>
            <a 
              href="/shop" 
              className="nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-shop"
            >
              Shop
            </a>
            <a 
              href="/tiers" 
              className="nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-tiers"
            >
              Membership
            </a>
            <button 
              onClick={() => scrollToSection('journal')}
              className="nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="button-journal-portal"
            >
              Journal Portal
            </button>
            <a 
              href="/dashboard" 
              className="btn-gold px-6 py-2 rounded-full text-accent-foreground font-accent text-sm font-semibold"
              data-testid="button-creator-dashboard"
            >
              Creator Dashboard
            </a>
            <a 
              href="/admin" 
              className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-accent text-sm font-semibold transition-colors"
              data-testid="button-admin-panel"
            >
              <i className="fas fa-shield-halved mr-2"></i>
              Admin
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-accent" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a 
              href="/" 
              className="block nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-home-mobile"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="block nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-about-mobile"
            >
              About
            </a>
            <a 
              href="/shop" 
              className="block nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-shop-mobile"
            >
              Shop
            </a>
            <a 
              href="/tiers" 
              className="block nav-link font-accent text-sm uppercase tracking-wide"
              data-testid="link-tiers-mobile"
            >
              Membership
            </a>
            <button 
              onClick={() => scrollToSection('journal')}
              className="block nav-link font-accent text-sm uppercase tracking-wide text-left"
              data-testid="button-journal-portal-mobile"
            >
              Journal Portal
            </button>
            <a 
              href="/dashboard" 
              className="block btn-gold px-6 py-2 rounded-full text-accent-foreground font-accent text-sm font-semibold text-center"
              data-testid="button-creator-dashboard-mobile"
            >
              Creator Dashboard
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
