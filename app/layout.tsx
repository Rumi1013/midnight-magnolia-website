import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Midnight Magnolia - Digital Sanctuary for Healing",
  description:
    "Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle productivity, sacred rituals, and transformative digital tools.",
  keywords: ["healing", "wellness", "productivity", "spiritual", "Southern Gothic", "ancestral wisdom"],
  authors: [{ name: "Midnight Magnolia" }],
  creator: "Midnight Magnolia",
  publisher: "Midnight Magnolia",
  openGraph: {
    title: "Midnight Magnolia - Digital Sanctuary for Healing",
    description: "Where ancestral wisdom meets Southern Gothic grace.",
    url: "https://midnightmagnolia.com",
    siteName: "Midnight Magnolia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Magnolia - Digital Sanctuary for Healing",
    description: "Where ancestral wisdom meets Southern Gothic grace.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
