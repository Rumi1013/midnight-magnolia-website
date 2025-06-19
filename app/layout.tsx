import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative min-h-screen bg-midnight-blue text-magnolia-white overflow-x-hidden">
            <Header />
            <main className="relative z-10 pt-20">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
