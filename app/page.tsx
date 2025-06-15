export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A192F",
        color: "#FAF3E0",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>Midnight Magnolia</h1>
      </header>

      <main>
        <section style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              color: "#FAF3E0",
            }}
          >
            Welcome to Your Digital Sanctuary
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#D4B99F",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            A Southern Gothic wellness brand blending healing, ancestral wisdom, and gentle productivity.
          </p>
          <button
            style={{
              backgroundColor: "#A3B18A",
              color: "#0A192F",
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1.125rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Enter the Garden
          </button>
        </section>

        <section style={{ marginBottom: "4rem" }}>
          <h3
            style={{
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#FAF3E0",
            }}
          >
            Sacred Offerings
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#0A192F",
                border: "1px solid rgba(212, 185, 159, 0.2)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <h4 style={{ color: "#D4AF37", marginBottom: "0.5rem" }}>Healing Rituals</h4>
              <p style={{ color: "#D4B99F", fontSize: "0.875rem", marginBottom: "1rem" }}>
                Gentle practices for mind, body, and spirit
              </p>
              <p style={{ color: "#FAF3E0" }}>
                Discover sacred rituals designed for those with chronic illness and ADHD.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#0A192F",
                border: "1px solid rgba(212, 185, 159, 0.2)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <h4 style={{ color: "#D4AF37", marginBottom: "0.5rem" }}>Ancestral Wisdom</h4>
              <p style={{ color: "#D4B99F", fontSize: "0.875rem", marginBottom: "1rem" }}>
                Time-honored knowledge for modern souls
              </p>
              <p style={{ color: "#FAF3E0" }}>Connect with the wisdom of those who came before.</p>
            </div>

            <div
              style={{
                backgroundColor: "#0A192F",
                border: "1px solid rgba(212, 185, 159, 0.2)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <h4 style={{ color: "#D4AF37", marginBottom: "0.5rem" }}>Gentle Productivity</h4>
              <p style={{ color: "#D4B99F", fontSize: "0.875rem", marginBottom: "1rem" }}>
                Sustainable systems that honor your energy
              </p>
              <p style={{ color: "#FAF3E0" }}>Build productivity systems that work with your natural rhythms.</p>
            </div>
          </div>
        </section>

        <section
          style={{
            textAlign: "center",
            backgroundColor: "rgba(10, 25, 47, 0.5)",
            padding: "3rem 2rem",
            borderRadius: "0.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#FAF3E0",
            }}
          >
            Join Our Garden Community
          </h3>
          <p
            style={{
              color: "#D4B99F",
              marginBottom: "2rem",
              maxWidth: "500px",
              margin: "0 auto 2rem",
            }}
          >
            Receive gentle guidance and sacred offerings delivered to your inbox.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              maxWidth: "400px",
              margin: "0 auto",
              flexDirection: "window.innerWidth < 640 ? column : row",
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#0A192F",
                border: "1px solid rgba(212, 185, 159, 0.2)",
                borderRadius: "0.5rem",
                color: "#FAF3E0",
              }}
            />
            <button
              style={{
                backgroundColor: "#D4AF37",
                color: "#0A192F",
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        </section>
      </main>

      <footer
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(212, 185, 159, 0.2)",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#D4B99F", fontSize: "0.875rem" }}>
          © 2024 Midnight Magnolia. Made with love and Southern Gothic grace.
        </p>
      </footer>
    </div>
  )
}
