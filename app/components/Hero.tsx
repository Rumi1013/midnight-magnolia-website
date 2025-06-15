"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section
        style={{
          minHeight: "100vh",
          backgroundColor: "#0A192F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAF3E0",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>Midnight Magnolia</h1>
          <p style={{ fontSize: "1.25rem", color: "#D4B99F" }}>Loading your digital sanctuary...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A192F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FAF3E0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(163, 177, 138, 0.1) 0%, transparent 50%)",
          opacity: 0.3,
        }}
      />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem", maxWidth: "1200px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }}>
          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Logo placeholder */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "rgba(250, 243, 224, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "3rem",
              }}
            >
              🌸
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p
                style={{
                  color: "#A3B18A",
                  fontSize: "0.875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Welcome to your digital sanctuary
              </p>

              <h1
                style={{
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: "bold",
                  color: "#FAF3E0",
                  lineHeight: "0.9",
                  fontFamily: "serif",
                }}
              >
                Midnight
                <br />
                <span style={{ color: "#D4AF37" }}>Magnolia</span>
              </h1>

              <p
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(250, 243, 224, 0.9)",
                  lineHeight: "1.6",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle
                productivity, sacred rituals, and transformative digital tools.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
              <button
                style={{
                  backgroundColor: "#A3B18A",
                  color: "#0A192F",
                  padding: "1rem 2.5rem",
                  borderRadius: "9999px",
                  border: "none",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "56px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(163, 177, 138, 0.9)"
                  e.currentTarget.style.transform = "scale(1.05)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#A3B18A"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                Enter the Garden
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#FAF3E0",
                  padding: "1rem 2.5rem",
                  borderRadius: "9999px",
                  border: "2px solid rgba(250, 243, 224, 0.3)",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: "56px",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#D4AF37"
                  e.currentTarget.style.color = "#D4AF37"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(250, 243, 224, 0.3)"
                  e.currentTarget.style.color = "#FAF3E0"
                }}
              >
                Explore Sacred Tools
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                paddingTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[
                { number: "500+", label: "Healing souls" },
                { number: "78", label: "Tarot cards" },
                { number: "24/7", label: "Gentle support" },
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <p style={{ color: "#D4AF37", fontSize: "2rem", fontWeight: "bold", fontFamily: "serif" }}>
                    {stat.number}
                  </p>
                  <p style={{ color: "rgba(250, 243, 224, 0.6)", fontSize: "0.875rem" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "rgba(250, 243, 224, 0.6)",
        }}
      >
        <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>Begin your journey</p>
        <div
          style={{
            width: "24px",
            height: "40px",
            border: "2px solid rgba(250, 243, 224, 0.3)",
            borderRadius: "20px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "12px",
              backgroundColor: "rgba(250, 243, 224, 0.6)",
              borderRadius: "2px",
              marginTop: "8px",
            }}
          />
        </div>
      </div>
    </section>
  )
}
