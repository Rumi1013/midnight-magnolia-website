import React from "react";
import '../styles/design-system.css';

interface FeatureScrollProps {
  direction: "ltr" | "rtl";
  imageSrc: string;
  children: React.ReactNode;
  topPosition?: string;
}

const SacredFeatureContainer: React.FC<FeatureScrollProps> = ({
  direction,
  children,
  imageSrc,
  topPosition = "50%",
}) => {
  const isLTR = direction === "ltr";

  return (
    <div className="sacred-feature-container">
      {/* Mobile Layout */}
      <div className="sacred-feature-mobile">
        <img
          src={imageSrc}
          alt="Sacred Service"
          className={`sacred-feature-image-mobile ${isLTR ? "order-1" : "order-2"}`}
        />
        <div className={`sacred-feature-content-mobile ${isLTR ? "order-2" : "order-1"}`}>
          {children}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="sacred-feature-desktop">
        <div
          className="sacred-feature-content-sticky"
          data-top-position={topPosition}
        >
          {children}
        </div>
        <div className={`sacred-feature-image-container ${isLTR ? "" : "row-start-1"}`}>
          <div className="sacred-feature-image-wrapper">
            <img
              src={imageSrc}
              alt="Sacred Service"
              className="sacred-feature-image-desktop"
            />
            <div className="sacred-feature-image-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SacredFeatureScroll: React.FC = () => {
  return (
    <section className="sacred-feature-scroll-section">
      {/* Hero Introduction */}
      <div className="sacred-feature-hero">
        <h2 className="sacred-feature-main-title">
          Sacred Digital Offerings
        </h2>
        <p className="sacred-feature-main-subtitle">
          Where trauma-informed technology meets healing-centered design
        </p>
      </div>

      <div className="sacred-features-container">
        {/* Feature 1: Trauma-Informed AI */}
        <SacredFeatureContainer
          topPosition="20%"
          direction="rtl"
          imageSrc="/images/professional/trauma-informed-ai.jpg"
        >
          <div className="sacred-feature-content">
            <div className="feature-element">🤖</div>
            <h3 className="feature-title">Trauma-Informed AI Solutions</h3>
            <p className="feature-description">
              Custom AI tools designed with healing at the center. From chatbots that 
              recognize trauma responses to content generation that honors lived experiences, 
              we create technology that truly serves vulnerable communities.
            </p>
            <ul className="feature-benefits">
              <li>🌸 Compassionate conversation design</li>
              <li>⚖️ Bias-aware algorithm development</li>
              <li>🛡️ Privacy-first data handling</li>
              <li>🌙 Crisis-sensitive user experiences</li>
            </ul>
            <div className="feature-ctas">
              <button className="btn btn-primary">
                Explore AI Solutions
              </button>
              <button className="btn btn-secondary">
                View Case Studies
              </button>
            </div>
          </div>
        </SacredFeatureContainer>

        {/* Feature 2: Healing-Centered Web Development */}
        <SacredFeatureContainer
          topPosition="20%"
          direction="ltr"
          imageSrc="/images/professional/healing-web-development.jpg"
        >
          <div className="sacred-feature-content">
            <div className="feature-element">🌿</div>
            <h3 className="feature-title">Healing-Centered Web Development</h3>
            <p className="feature-description">
              Websites that don't just look beautiful—they create sanctuary. Every 
              interaction is designed to reduce harm, increase accessibility, and 
              honor the full humanity of your community members.
            </p>
            <ul className="feature-benefits">
              <li>♿ WCAG AA+ accessibility standards</li>
              <li>🧠 ADHD-friendly navigation design</li>
              <li>🎨 Culturally responsive aesthetics</li>
              <li>📱 Trauma-informed mobile experiences</li>
            </ul>
            <div className="feature-ctas">
              <button className="btn btn-primary">
                Start Your Project
              </button>
              <button className="btn btn-secondary">
                Portfolio Review
              </button>
            </div>
          </div>
        </SacredFeatureContainer>

        {/* Feature 3: Gentle Justice Legal Tech */}
        <SacredFeatureContainer
          topPosition="20%"
          direction="rtl"
          imageSrc="/images/professional/gentle-justice-tech.jpg"
        >
          <div className="sacred-feature-content">
            <div className="feature-element">⚖️</div>
            <h3 className="feature-title">Gentle Justice Legal Technology</h3>
            <p className="feature-description">
              Legal tech that centers healing over punishment. We build tools for 
              restorative justice practitioners, survivor advocates, and community 
              organizations working toward transformative change.
            </p>
            <ul className="feature-benefits">
              <li>📋 Survivor-centered intake systems</li>
              <li>🤝 Restorative justice case management</li>
              <li>📚 Legal resource automation</li>
              <li>💚 Community healing dashboards</li>
            </ul>
            <div className="feature-ctas">
              <button className="btn btn-primary">
                Discuss Your Needs
              </button>
              <button className="btn btn-secondary">
                Legal Tech Resources
              </button>
            </div>
          </div>
        </SacredFeatureContainer>

        {/* Feature 4: Ancestral Digital Strategy */}
        <SacredFeatureContainer
          topPosition="20%"
          direction="ltr"
          imageSrc="/images/professional/ancestral-digital-strategy.jpg"
        >
          <div className="sacred-feature-content">
            <div className="feature-element">✨</div>
            <h3 className="feature-title">Ancestral Digital Strategy</h3>
            <p className="feature-description">
              Digital strategy rooted in indigenous wisdom and Black liberation practices. 
              We help you build sustainable, community-centered online presence that 
              honors your ancestors while embracing technological innovation.
            </p>
            <ul className="feature-benefits">
              <li>🌱 Sustainable growth frameworks</li>
              <li>👥 Community-centered marketing</li>
              <li>🔄 Regenerative business models</li>
              <li>🎭 Authentic brand storytelling</li>
            </ul>
            <div className="feature-ctas">
              <button className="btn btn-primary">
                Strategy Session
              </button>
              <button className="btn btn-secondary">
                Learn Our Approach
              </button>
            </div>
          </div>
        </SacredFeatureContainer>
      </div>

      {/* Closing Section */}
      <div className="sacred-feature-closing">
        <h3 className="closing-title">Ready to Begin Your Digital Healing Journey?</h3>
        <p className="closing-description">
          Every project starts with a sacred pause—a moment to understand your needs, 
          honor your story, and design technology that truly serves your mission.
        </p>
        <div className="closing-ctas">
          <button className="btn btn-primary btn-lg">
            🌙 Schedule Sacred Consultation
          </button>
          <button className="btn btn-secondary btn-lg">
            🌸 View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default SacredFeatureScroll; 