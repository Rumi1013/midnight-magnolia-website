import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import Loading from "./loading"
import PerformanceMonitor from "@/app/components/PerformanceMonitor"

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
  title: {
    default: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
    template: "%s | Midnight Magnolia",
  },
  description:
    "A digital sanctuary for healing through Southern Gothic grace. Wellness, ancestral wisdom, and gentle productivity for people with chronic illness and ADHD.",
  keywords: [
    "wellness",
    "southern gothic",
    "healing",
    "chronic illness",
    "ADHD",
    "ancestral wisdom",
    "digital sanctuary",
  ],
  authors: [{ name: "Midnight Magnolia" }],
  creator: "Midnight Magnolia",
  publisher: "Midnight Magnolia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://midnightmagnolia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
    description: "A digital sanctuary for healing through Southern Gothic grace.",
    siteName: "Midnight Magnolia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
    description: "A digital sanctuary for healing through Southern Gothic grace.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <PerformanceMonitor />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
