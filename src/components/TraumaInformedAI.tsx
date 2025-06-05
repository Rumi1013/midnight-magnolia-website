import React from 'react'
import '../styles/design-system.css'

const TraumaInformedAI: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h1 className="text-h1 animate-fade-in">🧠 Trauma-Informed AI Development</h1>
          <p className="text-body-lg animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
            Building artificial intelligence systems that recognize trauma responses, prioritize safety, 
            and create healing-centered digital experiences for all users.
          </p>
        </div>

        {/* Core Principles */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            ✨ Core Principles
          </h2>
          
          <div className="grid grid-2 gap-lg">
            <div className="card-feature">
              <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                🛡️
              </div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Safety-First Design
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                AI systems that recognize trauma responses and provide safe, predictable interactions. 
                No sudden changes, clear consent processes, and always giving users control over their experience.
              </p>
            </div>

            <div className="card-feature">
              <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                🔍
              </div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Transparent Processing
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Clear explanations of how AI makes decisions, what data it uses, and how to modify 
                or opt out of automated processes. Mystery breeds mistrust in vulnerable populations.
              </p>
            </div>

            <div className="card-feature">
              <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                💜
              </div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Nervous System Awareness
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                AI that recognizes signs of dysregulation and responds with calming interfaces, 
                slower pacing, and grounding techniques rather than efficiency optimization.
              </p>
            </div>

            <div className="card-feature">
              <div style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-md)' }}>
                🌱
              </div>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                Healing-Centered Outcomes
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Success metrics that prioritize user wellbeing, community connection, and emotional safety 
                over engagement, retention, or profit maximization.
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Applications */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            🔧 Applications & Use Cases
          </h2>
          
          <div className="grid grid-3 gap-lg">
            <div className="card">
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>
                  💬
                </div>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                  Trauma-Aware Chatbots
                </h3>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  Conversational AI that recognizes trauma language patterns and responds with validation, 
                  safety, and appropriate resources rather than standard customer service scripts.
                </p>
              </div>
            </div>

            <div className="card">
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>
                  📱
                </div>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                  Adaptive Interfaces
                </h3>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  User interfaces that adjust based on stress indicators, offering simplified layouts, 
                  calmer colors, and reduced cognitive load during difficult moments.
                </p>
              </div>
            </div>

            <div className="card">
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>
                  📊
                </div>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                  Wellbeing Analytics
                </h3>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  Data analysis that identifies patterns of user distress and proactively offers support, 
                  breaks, or connections to human helpers rather than pushing for continued engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Research & Development */}
        <div style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h2 text-center" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-2xl)' 
          }}>
            🔬 Current Research & Development
          </h2>
          
          <div className="grid grid-2 gap-lg">
            <div className="card-highlight">
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🧠 Nervous System Detection Models
              </h3>
              <p className="text-body" style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)'
              }}>
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
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🌈 Inclusive Training Datasets
              </h3>
              <p className="text-body" style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)'
              }}>
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
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🔒 Privacy-Preserving Wellness AI
              </h3>
              <p className="text-body" style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)'
              }}>
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
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🤝 Community-Centered AI Ethics
              </h3>
              <p className="text-body" style={{ 
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-md)'
              }}>
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
          <h2 className="text-h2" style={{ 
            color: 'var(--accent-primary)', 
            marginBottom: 'var(--space-lg)' 
          }}>
            🤝 Collaborative Development
          </h2>
          <p className="text-body-lg" style={{ 
            marginBottom: 'var(--space-lg)',
            maxWidth: '700px',
            margin: '0 auto var(--space-lg)'
          }}>
            This work cannot be done in isolation. I seek partnerships with trauma therapists, 
            community organizers, AI researchers, and technology companies committed to ethical development.
          </p>
          
          <div className="grid grid-3 gap-lg" style={{ marginBottom: 'var(--space-2xl)' }}>
            <div className="card">
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🩺 Mental Health Professionals
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Collaborating with trauma therapists and counselors to ensure AI systems reflect 
                evidence-based approaches to healing and safety.
              </p>
            </div>

            <div className="card">
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🔬 AI Researchers
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Working with academic institutions and research labs to develop new methodologies 
                for trauma-informed machine learning.
              </p>
            </div>

            <div className="card">
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-sm)' }}>
                🏢 Ethical Tech Companies
              </h3>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Partnering with organizations ready to prioritize user wellbeing over engagement 
                metrics and implement trauma-informed design principles.
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: 'var(--space-md)', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button className="btn btn-primary">
              Partner with Us 🤝
            </button>
            <button className="btn btn-secondary">
              Research Collaboration 📚
            </button>
            <button className="btn btn-ghost">
              Speaking & Workshops 🎤
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TraumaInformedAI 