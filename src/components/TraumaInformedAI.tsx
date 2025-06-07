import React from 'react'
import '../styles/design-system.css'

const TraumaInformedAI: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="trauma-ai-header">
            <img 
              src="/images/logos/clearFinal23_MM_25.jpeg" 
              alt="Trauma-Informed Technology"
              className="trauma-ai-header-logo"
            />
            <h1 className="text-h1 animate-fade-in">
              <div className="trauma-ai-header-title">
                <img 
                  src="/images/logos/clearFinal23_MM_25.jpeg" 
                  alt="Trauma-Informed Technology"
                  className="trauma-ai-header-logo"
                />
                Trauma-Informed AI Development
              </div>
            </h1>
          </div>
          <p className="text-body-lg animate-slide-up trauma-ai-description">
            Creating technology that honors nervous system responses, trauma histories, and the 
            full spectrum of human experience. AI that serves healing, not harm.
          </p>
        </div>

        {/* Core Principles */}
        <div className="trauma-ai-section-mb">
          <h2 className="text-h2 text-center trauma-ai-section-title">
            ✨ Core Principles
          </h2>
          
          <div className="grid grid-2 gap-lg">
            <div className="card-feature">
              <div className="trauma-ai-principle-icon">
                🛡️
              </div>
              <h3 className="text-h3 trauma-ai-principle-title">
                Safety-First Design
              </h3>
              <p className="text-body trauma-ai-principle-description">
                AI systems that recognize trauma responses and provide safe, predictable interactions. 
                No sudden changes, clear consent processes, and always giving users control over their experience.
              </p>
            </div>

            <div className="card-feature">
              <div className="trauma-ai-principle-icon">
                🔍
              </div>
              <h3 className="text-h3 trauma-ai-principle-title">
                Transparent Processing
              </h3>
              <p className="text-body trauma-ai-principle-description">
                Clear explanations of how AI makes decisions, what data it uses, and how to modify 
                or opt out of automated processes. Mystery breeds mistrust in vulnerable populations.
              </p>
            </div>

            <div className="card-feature">
              <div className="trauma-ai-principle-icon">
                💜
              </div>
              <h3 className="text-h3 trauma-ai-principle-title">
                Nervous System Awareness
              </h3>
              <p className="text-body trauma-ai-principle-description">
                AI that recognizes signs of dysregulation and responds with calming interfaces, 
                slower pacing, and grounding techniques rather than efficiency optimization.
              </p>
            </div>

            <div className="card-feature">
              <div className="trauma-ai-principle-icon">
                🌱
              </div>
              <h3 className="text-h3 trauma-ai-principle-title">
                Healing-Centered Outcomes
              </h3>
              <p className="text-body trauma-ai-principle-description">
                Success metrics that prioritize user wellbeing, community connection, and emotional safety 
                over engagement, retention, or profit maximization.
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Applications */}
        <div className="trauma-ai-section-mb">
          <h2 className="text-h2 text-center trauma-ai-section-title">
            🔧 Applications & Use Cases
          </h2>
          
          <div className="grid grid-3 gap-lg">
            <div className="card">
              <div className="trauma-ai-app-section">
                <div className="trauma-ai-app-icon">
                  💬
                </div>
                <h3 className="text-h3 trauma-ai-app-title">
                  Trauma-Aware Chatbots
                </h3>
                <p className="text-body trauma-ai-app-description">
                  Conversational AI that recognizes trauma language patterns and responds with validation, 
                  safety, and appropriate resources rather than standard customer service scripts.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="trauma-ai-app-section">
                <div className="trauma-ai-app-icon">
                  📱
                </div>
                <h3 className="text-h3 trauma-ai-app-title">
                  Adaptive Interfaces
                </h3>
                <p className="text-body trauma-ai-app-description">
                  User interfaces that adjust based on stress indicators, offering simplified layouts, 
                  calmer colors, and reduced cognitive load during difficult moments.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="trauma-ai-app-section">
                <div className="trauma-ai-app-icon">
                  📊
                </div>
                <h3 className="text-h3 trauma-ai-app-title">
                  Wellbeing Analytics
                </h3>
                <p className="text-body trauma-ai-app-description">
                  Data analysis that identifies patterns of user distress and proactively offers support, 
                  breaks, or connections to human helpers rather than pushing for continued engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Research & Development */}
        <div className="trauma-ai-section-mb">
          <h2 className="text-h2 text-center trauma-ai-section-title">
            🔬 Current Research & Development
          </h2>
          
          <div className="grid grid-2 gap-lg">
            <div className="card-highlight">
              <h3 className="text-h3 trauma-ai-research-title">
                🧠 Nervous System Detection Models
              </h3>
              <p className="text-body trauma-ai-research-description">
                Developing machine learning models that can identify signs of nervous system dysregulation 
                through interaction patterns, typing cadence, and language choice.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Machine Learning</span>
                <span className="portfolio-tag">Natural Language Processing</span>
                <span className="portfolio-tag">Behavioral Analysis</span>
              </div>
            </div>

            <div className="card-highlight">
              <h3 className="text-h3 trauma-ai-research-title">
                🌈 Inclusive Training Datasets
              </h3>
              <p className="text-body trauma-ai-research-description">
                Creating training datasets that include diverse trauma responses, neurodivergent communication 
                patterns, and culturally specific expressions of distress and healing.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Data Ethics</span>
                <span className="portfolio-tag">Inclusive Design</span>
                <span className="portfolio-tag">Cultural Competency</span>
              </div>
            </div>

            <div className="card-highlight">
              <h3 className="text-h3 trauma-ai-research-title">
                🔒 Privacy-Preserving Wellness AI
              </h3>
              <p className="text-body trauma-ai-research-description">
                Developing AI systems that can provide trauma-informed support without storing sensitive 
                personal data or creating profiles that could be used against vulnerable users.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Privacy Engineering</span>
                <span className="portfolio-tag">Federated Learning</span>
                <span className="portfolio-tag">Data Minimization</span>
              </div>
            </div>

            <div className="card-highlight">
              <h3 className="text-h3 trauma-ai-research-title">
                🤝 Community-Centered AI Ethics
              </h3>
              <p className="text-body trauma-ai-research-description">
                Building ethical frameworks for AI development that center the needs and wisdom of trauma 
                survivors, marginalized communities, and healing practitioners.
              </p>
              <div className="portfolio-tags">
                <span className="portfolio-tag">Ethics Research</span>
                <span className="portfolio-tag">Community Engagement</span>
                <span className="portfolio-tag">Participatory Design</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Collaboration */}
        <div className="text-center">
          <h2 className="text-h2 trauma-ai-collab-title">
            🤝 Collaborative Development
          </h2>
          <p className="text-body-lg trauma-ai-collab-description">
            This work cannot be done in isolation. I seek partnerships with trauma therapists, 
            community organizers, AI researchers, and technology companies committed to ethical development.
          </p>
          
          <div className="grid grid-3 gap-lg trauma-ai-collab-grid">
            <div className="card">
              <h3 className="text-h3 trauma-ai-collab-card-title">
                🩺 Mental Health Professionals
              </h3>
              <p className="text-body trauma-ai-collab-card-description">
                Collaborating with trauma therapists and counselors to ensure AI systems reflect 
                evidence-based approaches to healing and safety.
              </p>
            </div>

            <div className="card">
              <h3 className="text-h3 trauma-ai-collab-card-title">
                🔬 AI Researchers
              </h3>
              <p className="text-body trauma-ai-collab-card-description">
                Working with academic institutions and research labs to develop new methodologies 
                for trauma-informed machine learning.
              </p>
            </div>

            <div className="card">
              <h3 className="text-h3 trauma-ai-collab-card-title">
                🏢 Ethical Tech Companies
              </h3>
              <p className="text-body trauma-ai-collab-card-description">
                Partnering with organizations ready to prioritize user wellbeing over engagement 
                metrics and implement trauma-informed design principles.
              </p>
            </div>
          </div>

          <div className="trauma-ai-cta-buttons">
            <button type="button" className="btn btn-primary">
              Partner with Us 🤝
            </button>
            <button type="button" className="btn btn-secondary">
              Research Collaboration 📚
            </button>
            <button type="button" className="btn btn-ghost">
              Speaking & Workshops 🎤
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TraumaInformedAI 