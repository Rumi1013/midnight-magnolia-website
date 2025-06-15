import Hero from "./components/Hero"
import About from "./components/About"
import Products from "./components/Products"
import Shop from "./components/Shop"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Shop />
      <Footer />
    </main>
  )
}
