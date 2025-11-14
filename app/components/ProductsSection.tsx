"use client"

import { useState, useEffect } from "react"

export default function ProductsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const featuredProducts = [
    {
      title: "The Magnolia Reset",
      subtitle: "90-Day Healing Journal",
      description:
        "A gentle companion for your sobriety and healing journey, with daily prompts that honor your pace and celebrate your progress.",
      price: "$47",
      digitalPrice: "$29",
      image: "📖",
      category: "Healing Journals",
      features: ["Daily affirmations", "Sobriety tracker", "Gentle accountability", "Progress celebration"],
      available: ["Digital Download", "KDP Paperback", "Hardcover Edition"],
      comingSoon: true,
    },
    {
      title: "Midnight Messages",
      subtitle: "Tarot & Affirmation Deck",
      description:
        "78 beautiful cards featuring Black icons with Southern Gothic elegance, ancestral wisdom, and empowering affirmations.",
      price: "$33",
      digitalPrice: "$19",
      image: "🔮",
      category: "Tarot & Divination",
      features: ["78 unique cards", "Digital guidebook", "Monthly spreads", "Ancestor wisdom"],
      available: ["Digital Deck", "Print-on-Demand", "Deluxe Physical Set"],
      comingSoon: true,
    },
    {
      title: "Sacred Productivity",
      subtitle: "ADHD-Friendly Planner",
      description:
        "Planning tools that work with your neurodivergent brain, not against it. Gentle structure for chaotic minds with spoon theory integration.",
      price: "$29",
      digitalPrice: "$19",
      image: "📝",
      category: "Digital Planners",
      features: ["Flexible templates", "Energy tracking", "Spoon theory integration", "Executive function support"],
      available: ["Digital Templates", "Printable PDF", "KDP Spiral Bound"],
      comingSoon: true,
    },
  ]

  if (!mounted) {
    return (
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#0A192F" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", color: "#FAF3E0" }}>
          <p>Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products" style={{ padding: "5rem 1.5rem", backgroundColor: "#0A192F" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#A3B18A",
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Sacred Tools for Transformation
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: "bold",
              color: "#FAF3E0",
              marginBottom: "1.5rem",
              fontFamily: "serif",
            }}
          >
            Featured Products
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "rgba(250, 243, 224, 0.8)",
              maxWidth: "768px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Carefully crafted tools to support your healing journey. Each product is designed with love, intention, and
            deep respect for your unique path.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {featuredProducts.map((product, index) => (
            <div
              key={product.title}
              style={{
                backgroundColor: "#F5EDD6",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)"
                e.currentTarget.style.transform = "scale(1.02)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              {/* Coming Soon Banner */}
              {product.comingSoon && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "linear-gradient(45deg, #D4AF37, #A3B18A)",
                    color: "#0A192F",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    padding: "0.5rem 1.5rem",
                    transform: "rotate(12deg)",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    zIndex: 10,
                  }}
                >
                  COMING SOON
                </div>
              )}

              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem", transition: "transform 0.3s ease" }}>
                  {product.image}
                </div>
                <div
                  style={{
                    backgroundColor: "#0A192F",
                    color: "#FAF3E0",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    display: "inline-block",
                    marginBottom: "0.75rem",
                  }}
                >
                  {product.category}
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#0A192F",
                    marginBottom: "0.5rem",
                    fontFamily: "serif",
                  }}
                >
                  {product.title}
                </h3>
                <p
                  style={{
                    color: "#0A192F",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {product.subtitle}
                </p>
              </div>

              <p style={{ color: "#374151", lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1 }}>
                {product.description}
              </p>

              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#0A192F", marginBottom: "0.75rem" }}>
                  Available Formats:
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {product.available.map((format, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#0A192F",
                        color: "#FAF3E0",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0" }}>
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "#6B7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#A3B18A",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <div style={{ color: "#D4AF37", fontSize: "1.5rem", fontWeight: "bold", fontFamily: "serif" }}>
                      {product.digitalPrice}
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "0.875rem" }}>Digital</div>
                  </div>
                  <div>
                    <div style={{ color: "#0A192F", fontSize: "1.5rem", fontWeight: "bold", fontFamily: "serif" }}>
                      {product.price}
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "0.875rem" }}>Print</div>
                  </div>
                </div>
                <button
                  style={{
                    width: "100%",
                    fontWeight: "600",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                    border: "none",
                    transition: "all 0.3s ease",
                    minHeight: "44px",
                    cursor: product.comingSoon ? "not-allowed" : "pointer",
                    backgroundColor: product.comingSoon ? "#D4B99F" : "#A3B18A",
                    color: product.comingSoon ? "#6B7280" : "#0A192F",
                  }}
                  disabled={product.comingSoon}
                  onMouseOver={(e) => {
                    if (!product.comingSoon) {
                      e.currentTarget.style.backgroundColor = "rgba(163, 177, 138, 0.9)"
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!product.comingSoon) {
                      e.currentTarget.style.backgroundColor = "#A3B18A"
                      e.currentTarget.style.boxShadow = "none"
                    }
                  }}
                >
                  {product.comingSoon ? "Coming Soon" : "Add to Altar"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <button
            style={{
              border: "2px solid #A3B18A",
              backgroundColor: "transparent",
              color: "#A3B18A",
              fontWeight: "600",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              transition: "all 0.3s ease",
              minHeight: "44px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#A3B18A"
              e.currentTarget.style.color = "#0A192F"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "#A3B18A"
            }}
          >
            Explore All Sacred Tools
          </button>
        </div>
      </div>
    </section>
  )
}
