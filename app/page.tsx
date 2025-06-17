import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import JusticeSection from "./components/JusticeSection"
// ProductsSection and ShopSection are removed as their content is merged into ShopifySection
import ShopifySection from "./components/ShopifySection" // This is now the main product showcase
import BlogSection from "./components/BlogSection"
import TestimonialsSection from "./components/TestimonialsSection"
import NewsletterSection from "./components/NewsletterSection"

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <JusticeSection />
      <ShopifySection /> {/* Consolidated product showcase */}
      <BlogSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
