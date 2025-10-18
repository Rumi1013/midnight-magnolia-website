import React, { useState } from 'react'

export default function NewsletterForm(){
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')

  const endpoint = import.meta.env.VITE_NEWSLETTER_WEBHOOK_URL

  async function submit(e){
    e.preventDefault()
    if(!endpoint){ setStatus('error'); return }
    setStatus('pending')
    try{
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, name, source:'midnight-magnolia-site' })
      })
      if(!res.ok) throw new Error(await res.text())
      setStatus('ok')
      setEmail(''); setName('')
    }catch(err){
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section className="mm-container newsletter">
      <h2>Moonletter — gentle updates, sacred tools</h2>
      <form onSubmit={submit} className="newsletter-form" aria-label="Newsletter signup">
        <label>
          <span className="sr-only">Name</span>
          <input type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Email</span>
          <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <button className="cta" disabled={status==='pending'}>{status==='pending'?'Sending…':'Join the Moonletter'}</button>
      </form>
      {status==='ok' && <p className="note success">You’re in. Check your inbox for a soft hello.</p>}
      {status==='error' && <p className="note error">Can’t reach the newsletter service. Set VITE_NEWSLETTER_WEBHOOK_URL.</p>}
    </section>
  )
}
