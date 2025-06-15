import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Midnight Magnolia",
  description: "A Southern Gothic wellness brand blending healing, ancestral wisdom, and gentle productivity",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
