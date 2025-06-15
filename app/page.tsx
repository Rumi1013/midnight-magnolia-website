import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import ProductsSection from "./components/ProductsSection"
import ShopSection from "./components/ShopSection"
import JusticeSection from "./components/JusticeSection"
import TestimonialsSection from "./components/TestimonialsSection"
import NewsletterSection from "./components/NewsletterSection"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutSection />
      <ProductsSection />
      <ShopSection />
      <JusticeSection />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
