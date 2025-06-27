import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import ProductsSection from "./components/ProductsSection"
import BlogSection from "./components/BlogSection"
import NewsletterSection from "./components/NewsletterSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-midnight-blue">
      <Hero />
      <AboutSection />
      <ProductsSection />
      <BlogSection />
      <NewsletterSection />
    </div>
  )
}
