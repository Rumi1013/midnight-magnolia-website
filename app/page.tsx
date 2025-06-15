"use client"

import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import ProductsSection from "./components/ProductsSection"
import ShopSection from "./components/ShopSection"
import TestimonialsSection from "./components/TestimonialsSection"
import NewsletterSection from "./components/NewsletterSection"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <ProductsSection />
      <ShopSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
