import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Lora, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Midnight Magnolia - Digital Sanctuary for Healing & Transformation",
  description:
    "Where ancestral wisdom meets Southern Gothic grace. Begin your journey of healing through gentle productivity, sacred rituals, and transformative digital tools.",
  keywords:
    "healing, Southern Gothic, wellness, ADHD, productivity, digital sanctuary, transformation, ancestral wisdom",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable} ${lora.variable} ${montserrat.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
