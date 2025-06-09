/**
 * 🌙 MIDNIGHT MAGNOLIA COMPONENT ARCHITECTURE
 * Organized following clean architecture patterns
 * Based on Products & Services framework
 */

// ===== LAYOUT COMPONENTS =====
export { default as Navigation } from './Navigation';
export { default as SkipNavigation } from './SkipNavigation';

// ===== HERO COMPONENTS =====
export { default as EnhancedHero } from './EnhancedHero';
export { default as MainHero } from './MainHero';

// ===== PRODUCT COMPONENTS =====
export { default as ShopSection } from './ShopSection';
export { default as PortfolioSection } from './PortfolioSection';
export { default as LogoShowcase } from './LogoShowcase';

// ===== SERVICE COMPONENTS =====
export { default as ServicesSection } from './ServicesSection';
export { default as TraumaInformedAI } from './TraumaInformedAI';

// ===== COMMUNITY COMPONENTS =====
export { default as CommunitySection } from './CommunitySection';
export { default as SacredMemberships } from './SacredMemberships';
export { default as SacredTestimonials } from './SacredTestimonials';

// ===== CONTENT COMPONENTS =====
export { default as JusticeResources } from './JusticeResources';
export { default as ArtGallerySection } from './ArtGallerySection';
export { default as ArchiveSection } from './ArchiveSection';

// ===== FEATURE COMPONENTS =====
export { default as Dashboard } from './Dashboard';
export { default as ProgressIndicator } from './ProgressIndicator';
export { default as PauseMoment } from './PauseMoment';

// ===== EFFECT COMPONENTS =====
export { default as FireflyEffect } from './FireflyEffect';
export { default as FloatingPetals } from './FloatingPetals';

// ===== COMPONENT GROUPS BY BUSINESS LOGIC =====

/**
 * DIGITAL PRODUCTS ($25-$59)
 */
export const DigitalProducts = {
  ShopSection,
  PortfolioSection,
  LogoShowcase
};

/**
 * SERVICES ($199-$799+)
 */
export const Services = {
  ServicesSection,
  TraumaInformedAI
};

/**
 * COMMUNITY TIERS ($3-$75)
 */
export const Community = {
  CommunitySection,
  SacredMemberships,
  SacredTestimonials
};

/**
 * SPIRITUAL & CULTURAL RESOURCES
 */
export const SpiritualResources = {
  JusticeResources,
  ArtGallerySection,
  ArchiveSection
}; 