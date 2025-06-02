import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="sanctuary">
      <header className="sanctuary-header">
        <h1 className="sanctuary-title">
          🌸 Midnight Magnolia
        </h1>
        <p className="sanctuary-subtitle">
          Your digital healing sanctuary
        </p>
      </header>
      
      <main className="sanctuary-content">
        <div className="healing-circle">
          <button 
            className="gentle-button" 
            onClick={() => setCount((count) => count + 1)}
          >
            Breathe with intention: {count}
          </button>
        </div>
        
        <section className="wisdom-section">
          <p className="gentle-text">
            Welcome to your peaceful space. Here, you can find stillness,
            reflect on your journey, and nurture your inner growth.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🌙 Mindful Moments</h3>
              <p>Take time to center yourself</p>
            </div>
            <div className="feature-card">
              <h3>✨ Gentle Guidance</h3>
              <p>Supportive tools for your journey</p>
            </div>
            <div className="feature-card">
              <h3>🌱 Growth Space</h3>
              <p>Room to flourish and bloom</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="sanctuary-footer">
        <p>Made with 💚 for healing and growth</p>
      </footer>
    </div>
  )
}

export default App