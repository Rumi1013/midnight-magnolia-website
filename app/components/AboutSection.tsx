"use client"

import { useState, useEffect } from "react"

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#FAF3E0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  const values = [
    {
      icon: "🌙",
      title: "Trauma-Informed",
      description: "Every tool designed with gentleness and understanding for your healing journey.",
    },
    {
      icon: "🌸",
      title: "Ancestral Wisdom",
      description: "Honoring the strength and knowledge passed down through generations of resilient women.",
    },
    {
      icon: "✨",
      title: "Neurodivergent Friendly",
      description: "Celebrating different minds with tools that work with your brain, not against it.",
    },
    {
      icon: "🕊️",
      title: "Inclusive Sanctuary",
      description: "A safe space for all identities, especially Black women and marginalized voices.",
    },
    {
      icon: "🔮",
      title: "Digital Innovation",
      description: "Blending ancient wisdom with modern technology for accessible healing tools.",
    },
    {
      icon: "🚗",
      title: "Community Support",
      description: "From digital products to local courier services, we support your whole life.",
    },
  ]

  return (
    <section style={{ padding: "5rem 1.5rem", backgroundColor: "#FAF3E0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Left content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span
                style={{
                  backgroundColor: "#A3B18A",
                  color: "#FAF3E0",
                  fontSize: "0.875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  display: "inline-block",
                  fontWeight: "bold",
                  width: "fit-content",
                }}
              >
                Our Sacred Mission
              </span>
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: "bold",
                  color: "#0A192F",
                  lineHeight: "1.2",
                  fontFamily: "serif",
                }}
              >
                Healing is not linear,
                <br />
                <span style={{ color: "#D4AF37" }}>and that's beautiful</span>
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                fontSize: "1.125rem",
                lineHeight: "1.7",
              }}
            >
              <p style={{ color: "#374151" }}>
                Founded by <strong style={{ color: "#0A192F" }}>Latisha Vincent-Waters</strong> under Rumi-Nations LLC,
                Midnight Magnolia is a digital sanctuary where Southern Gothic grace meets ancestral wisdom. We create
                tools for souls seeking transformation through gentle productivity and sacred rituals.
              </p>
              <p style={{ color: "#374151" }}>
                Whether you're navigating chronic illness, ADHD, sobriety, or simply seeking a more mindful approach to
                life and business, you belong here. Every ritual, every journal prompt, every gentle reminder is crafted
                with love for the beautifully complex human you are.
              </p>
              <p style={{ color: "#374151" }}>
                From our healing journals and tarot decks to our courier services and digital business tools, everything
                we create honors your pace, your story, and your unique journey toward wholeness.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  backgroundColor: "rgba(10, 25, 47, 0.05)",
                  borderRadius: "1rem",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🌱</div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0A192F",
                    marginBottom: "0.5rem",
                    fontFamily: "serif",
                  }}
                >
                  Gentle Growth
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Progress at your own sacred pace</p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  backgroundColor: "rgba(163, 177, 138, 0.1)",
                  borderRadius: "1rem",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🕯️</div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#0A192F",
                    marginBottom: "0.5rem",
                    fontFamily: "serif",
                  }}
                >
                  Sacred Rituals
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Daily practices for inner peace</p>
              </div>
            </div>
          </div>

          {/* Right content - Values grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {values.map((value, index) => (
              <div
                key={value.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(212, 185, 159, 0.2)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div style={{ fontSize: "2rem", flexShrink: 0 }}>{value.icon}</div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#0A192F",
                      marginBottom: "0.5rem",
                      fontFamily: "serif",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p style={{ color: "#6B7280", lineHeight: "1.6" }}>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
