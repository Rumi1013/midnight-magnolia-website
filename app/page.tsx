import Hero from "./components/Hero"
import ProductGrid from "./components/ProductGrid"
import AboutSection from "./components/AboutSection"
import BlogSection from "./components/BlogSection"
import NewsletterSection from "./components/NewsletterSection"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-midnight-blue">
      <Hero />
      <ProductGrid products={[]} />
      <AboutSection />
      <BlogSection />
      <NewsletterSection />
    </main>
  )
}
