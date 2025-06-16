import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import LogoShowcase from "./components/LogoShowcase"
import JusticeSection from "./components/JusticeSection"
import ProductsSection from "./components/ProductsSection"
import ShopifySection from "./components/ShopifySection"
import ShopSection from "./components/ShopSection"
import BlogSection from "./components/BlogSection"
import TestimonialsSection from "./components/TestimonialsSection"
import NewsletterSection from "./components/NewsletterSection"

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <LogoShowcase />
      <JusticeSection />
      <ProductsSection />
      <ShopifySection />
      <ShopSection />
      <BlogSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
