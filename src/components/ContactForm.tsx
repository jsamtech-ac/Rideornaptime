'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      })
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) {
        setErrorMsg(data?.error ?? '')
        throw new Error('Request failed')
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="footer-contact" aria-labelledby="footer-contact-heading">
      <h2 id="footer-contact-heading" className="footer-contact-heading">
        Got a tip or question? We&rsquo;d love to hear from you.
      </h2>

      {status === 'success' ? (
        <p className="footer-contact-success" role="status">
          Thanks! We&rsquo;ll get back to you soon.
        </p>
      ) : (
        <form className="footer-contact-form" onSubmit={handleSubmit} noValidate>
          <div className="footer-contact-field">
            <label htmlFor="footer-contact-name">Name</label>
            <input
              id="footer-contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="footer-contact-field">
            <label htmlFor="footer-contact-email">Email</label>
            <input
              id="footer-contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="footer-contact-field">
            <label htmlFor="footer-contact-message">Message</label>
            <textarea
              id="footer-contact-message"
              name="message"
              rows={4}
              required
              maxLength={5000}
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="footer-contact-hp" aria-hidden="true">
            <label htmlFor="footer-contact-website">Website</label>
            <input
              id="footer-contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="footer-contact-submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="footer-contact-error" role="alert">
              {errorMsg || 'Something went wrong. Try again or email us directly.'}
            </p>
          )}
        </form>
      )}
    </section>
  )
}
