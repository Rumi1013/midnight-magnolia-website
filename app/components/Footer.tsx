"use client"

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A192F", borderTop: "1px solid rgba(250, 243, 224, 0.1)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ fontSize: "2rem" }}>🌸</div>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FAF3E0", fontFamily: "serif" }}>
                  Midnight Magnolia
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#A3B18A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  DIGITAL SANCTUARY FOR HEALING
                </div>
              </div>
            </div>
            <p style={{ color: "rgba(250, 243, 224, 0.7)", lineHeight: "1.6", maxWidth: "400px" }}>
              Where ancestral wisdom meets Southern Gothic grace. Your journey of healing through gentle productivity
              and sacred rituals begins here.
            </p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
              {["🌙", "✨", "🌱", "🕯️"].map((emoji, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Sacred Tools */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#FAF3E0",
                marginBottom: "1rem",
                fontFamily: "serif",
              }}
            >
              Sacred Tools
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "The Magnolia Reset",
                "Midnight Messages",
                "Sacred Productivity",
                "Healing Journals",
                "Ritual Guides",
              ].map((item) => (
                <li key={item} style={{ marginBottom: "0.75rem" }}>
                  <a
                    href="#"
                    style={{
                      color: "rgba(250, 243, 224, 0.7)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#A3B18A"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "rgba(250, 243, 224, 0.7)"
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#FAF3E0",
                marginBottom: "1rem",
                fontFamily: "serif",
              }}
            >
              Community
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Our Story", "Healing Circle", "Testimonials", "Support", "Contact"].map((item) => (
                <li key={item} style={{ marginBottom: "0.75rem" }}>
                  <a
                    href="#"
                    style={{
                      color: "rgba(250, 243, 224, 0.7)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = "#A3B18A"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = "rgba(250, 243, 224, 0.7)"
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div
          style={{
            borderTop: "1px solid rgba(250, 243, 224, 0.1)",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(250, 243, 224, 0.6)", fontSize: "0.875rem", textAlign: "center" }}>
            © 2024 Midnight Magnolia. Crafted with love and intention. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: "rgba(250, 243, 224, 0.6)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#A3B18A"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "rgba(250, 243, 224, 0.6)"
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
