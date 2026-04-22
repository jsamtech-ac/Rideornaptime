import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, message, website } = (body ?? {}) as {
    name?: unknown
    email?: unknown
    message?: unknown
    website?: unknown
  }

  if (typeof website === 'string' && website.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const nameStr = typeof name === 'string' ? name.trim() : ''
  const emailStr = typeof email === 'string' ? email.trim() : ''
  const messageStr = typeof message === 'string' ? message.trim() : ''

  if (!nameStr || !emailStr || !messageStr) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(emailStr) || emailStr.length > 254) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (nameStr.length > 100 || messageStr.length > 5000) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ashu@jsamtech.com',
    replyTo: emailStr,
    subject: `Ride or Naptime — New Contact Form: ${nameStr}`,
    text: `Name: ${nameStr}\nEmail: ${emailStr}\n\nMessage:\n${messageStr}\n`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1C1917; line-height: 1.6;">
        <h2 style="margin: 0 0 16px; font-size: 18px;">New contact form submission</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(nameStr)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(emailStr)}</p>
        <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(messageStr)}</p>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json({ error: 'Could not send message.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
