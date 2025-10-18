import React from 'react'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import BlogList from './components/BlogList.jsx'
import RecoveryWidget from './components/RecoveryWidget.jsx'
import NewsletterForm from './components/NewsletterForm.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'

export default function App(){
  return (
    <div className="mm-app">
      <Hero />
      <section className="intro" aria-labelledby="intro-heading">
        <h2 id="intro-heading">Rooted in ritual. Becoming with ease.</h2>
        <p>
          Midnight Magnolia is a southern-gothic digital healing brand created by
          Latisha Vincent-Waters. We weave ancestry, automation, and recovery
          wisdom into gentle products, guided services, and community automations
          that honor rest as the strategy and creation as the power.
        </p>
      </section>
      <ProductGrid />
      <BlogList />
      <Services />
      <NewsletterForm />
      <RecoveryWidget />
      <Contact />
      <Footer />
    </div>
  )
}
