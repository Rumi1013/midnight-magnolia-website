import React, { useEffect, useState } from 'react'
import productsLocal from '../data/products.json'
import { fetchAllProducts } from '../integrations/commerce'

export default function ProductGrid(){
  const [products, setProducts] = useState(productsLocal)
  const [errors, setErrors] = useState([])

  useEffect(()=>{
    (async()=>{
      const { items, errors } = await fetchAllProducts()
      setProducts(items)
      setErrors(errors || [])
    })()
  }, [])

  return (
    <section id="shop" className="mm-container shop">
      <h2>Shop — Digital & Healing Tools</h2>
      {errors.length ? <p className="note">Some inventory sources are resting: {errors.join(', ')}</p> : null}
      <div className="grid">
        {products.map(p => (
          <article key={p.slug} className="card">
            {p.image ? <img className="thumb" src={p.image} alt={p.title} /> : null}
            <h3>{p.title}</h3>
            <p className="pill">{p.type} {p.source ? `• ${p.source}`: ''}</p>
            {p.price!==null && p.price!==undefined ? <p className="price">${Number(p.price).toFixed(2)}</p> : null}
            {p.tags ? <p className="tags">{p.tags.join(' · ')}</p> : null}
            <a className="cta small" href={p.url || ("#buy-"+p.slug)} target={p.url?'_blank':undefined} rel="noreferrer">View</a>
          </article>
        ))}
      </div>
    </section>
  )
}
