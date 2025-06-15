import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Midnight Magnolia - Southern Gothic Digital Sanctuary",
  description:
    "Where ancestral wisdom meets Southern Gothic grace. A digital sanctuary for healing through gentle productivity, sacred rituals, and transformative tools.",
  keywords: ["healing", "wellness", "Southern Gothic", "digital sanctuary", "ancestral wisdom"],
  authors: [{ name: "Midnight Magnolia" }],
  creator: "Midnight Magnolia",
  publisher: "Midnight Magnolia",
  openGraph: {
    title: "Midnight Magnolia - Southern Gothic Digital Sanctuary",
    description: "Where ancestral wisdom meets Southern Gothic grace.",
    url: "https://midnightmagnolia.com",
    siteName: "Midnight Magnolia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Magnolia - Southern Gothic Digital Sanctuary",
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
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="font-lora antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
