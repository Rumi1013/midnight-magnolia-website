"use client"

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A192F",
        color: "#FAF3E0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "3rem",
          height: "3rem",
          border: "4px solid #D4AF37",
          borderTop: "4px solid transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "1rem",
        }}
      ></div>
      <p>Loading your sanctuary...</p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
