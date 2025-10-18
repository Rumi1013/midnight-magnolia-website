import React, { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const endpoint = import.meta.env.VITE_CONTACT_WEBHOOK_URL

  async function submit(e){
    e.preventDefault()
    if(!endpoint){ setStatus('error'); return }
    setStatus('pending')
    try{
      const res = await fetch(endpoint, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ name, email, message, source:'midnight-magnolia-contact' })
      })
      if(!res.ok) throw new Error(await res.text())
      setStatus('ok'); setName(''); setEmail(''); setMessage('')
    }catch(err){ console.error(err); setStatus('error') }
  }

  return (
    <section id="contact" className="mm-container contact">
      <h2>Contact — gentle collaboration</h2>
      <p className="note">For services, Shopify/Etsy setup, or research requests, send a note here.</p>
      <form className="contact-form" onSubmit={submit} aria-label="Contact form">
        <label>
          <span className="sr-only">Name</span>
          <input type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Email</span>
          <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label className="full">
          <span className="sr-only">Message</span>
          <textarea required placeholder="Tell me what you need, and I’ll propose the softest path forward." value={message} onChange={e=>setMessage(e.target.value)} />
        </label>
        <button className="cta" disabled={status==='pending'}>{status==='pending'?'Sending…':'Send'}</button>
      </form>
      {status==='ok' && <p className="note success">Received. I’ll reply gently and clearly.</p>}
      {status==='error' && <p className="note error">Can’t reach the inbox. Set VITE_CONTACT_WEBHOOK_URL.</p>}
    </section>
  )
}
