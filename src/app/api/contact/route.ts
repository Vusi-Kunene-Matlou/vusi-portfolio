import { Resend } from 'resend'
import { profile } from '@/data/resume'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, message, company } = body as Record<string, unknown>

  // Honeypot: real users never fill this hidden field in.
  if (typeof company === 'string' && company.trim().length > 0) {
    return Response.json({ ok: true })
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    name.trim().length === 0 ||
    message.trim().length === 0 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return Response.json(
      { error: 'Please provide a valid name, email, and message.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.')
    return Response.json(
      { error: 'Contact form is not configured yet.' },
      { status: 503 }
    )
  }

  const resend = new Resend(apiKey)
  const toEmail = process.env.CONTACT_TO_EMAIL || profile.email
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

  const { error } = await resend.emails.send({
    from: `Portfolio Contact Form <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    console.error('Failed to send contact email:', error)
    return Response.json(
      { error: 'Failed to send your message. Please try again later.' },
      { status: 502 }
    )
  }

  return Response.json({ ok: true })
}
