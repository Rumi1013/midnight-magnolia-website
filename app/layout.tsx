import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FloatingMoon from "./components/FloatingMoon"
import FloatingZodiac from "./components/FloatingZodiac"
import PerformanceMonitor from "./components/PerformanceMonitor"
import ErrorBoundary from "./components/ErrorBoundary"

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
  title: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
  description:
    "A digital sanctuary for healing through Southern Gothic grace. Wellness, ancestral wisdom, and gentle productivity for people with chronic illness and ADHD.",
  keywords: [
    "wellness",
    "Southern Gothic",
    "healing",
    "chronic illness",
    "ADHD",
    "ancestral wisdom",
    "digital sanctuary",
  ],
  authors: [{ name: "Midnight Magnolia" }],
  creator: "Midnight Magnolia",
  publisher: "Midnight Magnolia",
  openGraph: {
    title: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
    description: "A digital sanctuary for healing through Southern Gothic grace",
    type: "website",
    locale: "en_US",
    siteName: "Midnight Magnolia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
    description: "A digital sanctuary for healing through Southern Gothic grace",
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <div className="relative min-h-screen bg-midnight-blue text-magnolia-white overflow-x-hidden">
              <FloatingMoon />
              <FloatingZodiac />
              <Header />
              <main className="relative z-10">{children}</main>
              <Footer />
              <PerformanceMonitor />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
