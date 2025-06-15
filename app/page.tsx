import Hero from "./components/Hero"
import About from "./components/About"
import Products from "./components/Products"
import Shop from "./components/Shop"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <Shop />
      <Newsletter />
      <Footer />
    </main>
  )
}
