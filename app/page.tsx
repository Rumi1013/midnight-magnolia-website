import Hero from "./components/Hero"
import ProductGrid from "./components/ProductGrid"
import AboutSection from "./components/AboutSection"
import BlogSection from "./components/BlogSection"
import NewsletterSection from "./components/NewsletterSection"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductGrid />
      <AboutSection />
      <BlogSection />
      <NewsletterSection />
    </div>
  )
}
