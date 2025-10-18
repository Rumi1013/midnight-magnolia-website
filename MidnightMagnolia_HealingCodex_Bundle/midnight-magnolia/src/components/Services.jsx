import React from 'react'

export default function Services(){
  const items = [
    { title:'Shopify / Etsy Setup', desc:'Storefront setup, product SEO, Printify integration, and analytics.', cta:'#contact' },
    { title:'Automation Workflows', desc:'Make.com + Notion systems that publish, email, and back up without stress.', cta:'#contact' },
    { title:'Web Design Intensive', desc:'Dark-mode, high-contrast sites with Midnight Magnolia aesthetics.', cta:'#contact' },
    { title:'Research & Genealogy', desc:'Sensitive, trauma-informed archival research and narrative building.', cta:'#contact' }
  ]
  return (
    <section id="services" className="mm-container services">
      <h2>Services — automation with heart</h2>
      <div className="grid">
        {items.map((s,i)=>(
          <article key={i} className="card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a className="cta small" href={s.cta}>Inquire</a>
          </article>
        ))}
      </div>
    </section>
  )
}
