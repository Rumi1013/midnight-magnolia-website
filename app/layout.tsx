import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ErrorBoundary from "@/app/components/ErrorBoundary"
import PerformanceMonitor from "@/app/components/PerformanceMonitor"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mona_Sans as FontSans } from "next/font/google"
import { Young_Serif as FontSerif } from "next/font/google"
import { Lora } from "next/font/google"
import { Montserrat } from "next/font/google"

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif-playfair",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif-lora",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarnings>
      <body className={`${inter.variable} ${playfair.variable} ${lora.variable} ${montserrat.variable} antialiased`}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <div className="relative min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <PerformanceMonitor />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
