"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A192F",
        color: "#FAF3E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h2>
        <p style={{ color: "#D4B99F", marginBottom: "2rem" }}>Our digital garden needs a moment to rest.</p>
        <button
          onClick={reset}
          style={{
            backgroundColor: "#A3B18A",
            color: "#0A192F",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
