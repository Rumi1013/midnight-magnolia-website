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
            <section className="intro">
          <h2>Rooted in Resilience. Blooming in Truth.</h2>
          <p>
            Midnight Magnolia is a Southern-Gothic digital atelier weaving art, ancestry,
            and automation into healing-centered products: journals, tarot, and
            creative systems.
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