import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "./components/Header"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "./components/Footer"
import FloatingMoon from "./components/FloatingMoon"
import FloatingZodiac from "./components/FloatingZodiac"
import PerformanceMonitor from "./components/PerformanceMonitor"
import ErrorBoundary from "./components/ErrorBoundary"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="relative min-h-screen bg-midnight-blue text-magnolia-white overflow-x-hidden">
              <FloatingMoon />
              <FloatingZodiac />
              <Header />
              <main className="pt-20">{children}</main>
              <Footer />
              <PerformanceMonitor />
            </div>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
