'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'

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
    <div className="contact-form-wrap">
      {status === 'success' ? (
        <p className="contact-form-success" role="status">
          Thanks! We&rsquo;ll get back to you soon.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="contact-form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="contact-form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              maxLength={5000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="contact-form-hp" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <p className="contact-form-consent">
            By submitting, you agree to our <Link href="/privacy">Privacy Policy</Link>. Messages
            are sent via Resend and retained so we can reply.
          </p>

          <button type="submit" className="contact-form-submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="contact-form-error" role="alert">
              {errorMsg || 'Something went wrong. Try again or email us directly.'}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
