import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FloatingMoon from "./components/FloatingMoon"
import FloatingZodiac from "./components/FloatingZodiac"
import PerformanceMonitor from "./components/PerformanceMonitor"
import ErrorBoundary from "./components/ErrorBoundary"

// Define fonts according to brand guidelines (example)
import { Playfair_Display, Lora, Montserrat } from "next/font/google"

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
  title: "Midnight Magnolia | Sacred Healing & Wellness",
  description:
    "Southern Gothic wellness sanctuary blending ancestral wisdom with modern healing practices for those with chronic illness and ADHD.",
  keywords:
    "Southern Gothic, wellness, healing, ancestral wisdom, chronic illness, ADHD, gentle productivity, spiritual, mindfulness, Midnight Magnolia",
  authors: [{ name: "Midnight Magnolia" }],
  creator: "Midnight Magnolia",
  publisher: "Midnight Magnolia",
  // Add more metadata as needed: openGraph, twitter cards, icons, etc.
  icons: {
    icon: "/favicon.ico", // Example, replace with actual favicon
    apple: "/apple-touch-icon.png", // Example
  },
  openGraph: {
    title: "Midnight Magnolia | Sacred Healing & Wellness",
    description: "Discover a digital sanctuary for healing through Southern Gothic grace.",
    url: "https://www.midnightmagnolia.com", // Replace with actual URL
    siteName: "Midnight Magnolia",
    images: [
      {
        url: "/og-image.jpg", // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: "Midnight Magnolia Brand Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Magnolia | Sacred Healing & Wellness",
    description: "Explore ancestral wisdom and gentle productivity in our Southern Gothic wellness sanctuary.",
    // creator: "@YourTwitterHandle", // If you have one
    images: ["/twitter-image.jpg"], // Replace with actual Twitter image URL
  },
  robots: {
    // Control search engine indexing
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },,
  // manifest: '/site.webmanifest', // If you have a PWA manifest
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${montserrat.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="bg-midnight-blue text-magnolia-white font-lora antialiased flex flex-col min-h-screen">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div className="relative flex flex-col flex-1 overflow-x-hidden">
              {" "}
              {/* Ensure overflow-x-hidden is on a high-level container */}
              <FloatingMoon />
              <FloatingZodiac />
              <Header />
              <main className="pt-20 flex-grow">{children}</main> {/* pt-20 to account for fixed header height */}
              <Footer />
              <PerformanceMonitor />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
