import React from 'react'

const seed = [
  {slug:'eulogy-for-the-life-i-survived', title:'Eulogy for the Life I Survived', excerpt:'A reflection on grief, reclamation, and rebuilding a life with gentleness.'},
  {slug:'ai-with-heart', title:'AI With Heart: Automation as Liberation', excerpt:'Turning technology into a tool for rest, not burnout.'},
  {slug:'the-softest-wins', title:'The Softest Wins', excerpt:'Choosing ease over hustle is a quiet, radical strategy.'}
]

export default function BlogList(){
  return (
    <section id="blog" className="mm-container blog">
      <h2>Blog — Letters from the Magnolia Porch</h2>
      <div className="list">
        {seed.map(p => (
          <article key={p.slug} className="card">
            <h3>{p.title}</h3>
            <p>{p.excerpt}</p>
            <a className="cta small" href={"#post-"+p.slug}>Read</a>
          </article>
        ))}
      </div>
    </section>
  )
}
