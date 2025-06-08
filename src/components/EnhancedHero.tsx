import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/design-system.css';
import {
  InteractiveButton,
  GlowText,
  SparklesText,
  AnimatedCard
} from './MagicUI';

interface EnhancedHeroProps {
  onNavigate: (section: string) => void;
}

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({ onNavigate }) => {
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  });

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="enhanced-hero-section">
      {/* Atmospheric Background */}
      <div className="hero-atmospheric-bg">
        <div className="firefly firefly-1"></div>
        <div className="firefly firefly-2"></div>
        <div className="firefly firefly-3"></div>
        
        <div className="magnolia-petals">
          <div className="petal petal-1"></div>
          <div className="petal petal-2"></div>
          <div className="petal petal-3"></div>
        </div>
      </div>

      <div className="container">
        <div className="enhanced-hero-content">
          {/* Logo and Title */}
          <div className="text-center">
            <img
              src="/images/logos/Midnight_MagnoliaJune-08.jpg"
              alt="Midnight Magnolia - Southern Gothic Digital Sanctuary"
              className="enhanced-hero-logo animate-fade-in"
            />
            
            <h1 className="enhanced-hero-title animate-slide-up animate-delay-200">
              <GlowText text="Midnight Magnolia" />
            </h1>
            
            <p className="enhanced-hero-subtitle animate-slide-up animate-delay-300">
              A <SparklesText text="Southern Gothic Digital Sanctuary" /> where trauma-informed AI 
              meets healing-centered technology. Creating liberation through code, community through care.
            </p>
          </div>

          {/* Sacred CTAs */}
          <motion.div
            animate={fadeInInView ? "animate" : "initial"}
            variants={fadeUpVariants}
            className="enhanced-hero-ctas"
            initial={false}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
          >
            <InteractiveButton
              variant="magic"
              size="lg"
              glow={true}
              onClick={() => onNavigate('memberships')}
              className="hero-primary-cta"
            >
              ✨ Enter the Sanctuary ✨
            </InteractiveButton>
            <InteractiveButton
              variant="secondary"
              size="lg"
              magnetic={true}
              onClick={() => onNavigate('services')}
              className="hero-secondary-cta"
            >
              🌸 Explore Sacred Services
            </InteractiveButton>
          </motion.div>

          {/* Sacred Offerings Preview */}
          <motion.div
            animate={fadeInInView ? "animate" : "initial"}
            variants={fadeUpVariants}
            initial={false}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
            className="enhanced-hero-offerings"
          >
            <div className="offerings-atmospheric-glow"></div>
            
            <div className="grid grid-3 gap-lg">
              <AnimatedCard variant="float" glowColor="rgba(212, 175, 55, 0.2)">
                <div className="offering-preview">
                  <div className="offering-icon">📚</div>
                  <h3 className="offering-title">Digital Sanctuary</h3>
                  <p className="offering-description">
                    Healing journals, automation templates, and AI prompts for sustainable growth
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard variant="glow" glowColor="rgba(163, 177, 138, 0.2)">
                <div className="offering-preview">
                  <div className="offering-icon">🌸</div>
                  <h3 className="offering-title">Sacred Memberships</h3>
                  <p className="offering-description">
                    From Magnolia Seed to House of Midnight - find your community tier
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard variant="glow" glowColor="rgba(212, 175, 55, 0.3)">
                <div className="offering-preview">
                  <div className="offering-icon">⚖️</div>
                  <h3 className="offering-title">Gentle Justice</h3>
                  <p className="offering-description">
                    Trauma-informed legal resources and healing-centered advocacy tools
                  </p>
                </div>
              </AnimatedCard>
            </div>

            {/* Decorative Border with Southern Gothic Elements */}
            <div className="offerings-border">
              <div className="border-magnolia left"></div>
              <div className="border-magnolia right"></div>
              <div className="border-moon"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero; 