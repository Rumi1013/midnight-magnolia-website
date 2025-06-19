import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import ProductsSection from "./components/ProductsSection"
import ShopSection from "./components/ShopSection"
import ShopifySection from "./components/ShopifySection"
import BlogSection from "./components/BlogSection"
import JusticeSection from "./components/JusticeSection"
import TestimonialsSection from "./components/TestimonialsSection"
import NewsletterSection from "./components/NewsletterSection"
import FloatingMoon from "./components/FloatingMoon"
import FloatingZodiac from "./components/FloatingZodiac"

export default function HomePage() {
  return (
    <>
      <FloatingMoon />
      <FloatingZodiac />
      <Hero />
      <AboutSection />
      <ProductsSection />
      <ShopSection />
      <ShopifySection />
      <BlogSection />
      <JusticeSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
