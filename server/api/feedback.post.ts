import { createError, defineEventHandler, readBody } from 'h3'

type FeedbackPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  website?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<FeedbackPayload>(event)

  const name = body.name?.trim()
  const email = body.email?.trim()
  const subject = body.subject?.trim()
  const message = body.message?.trim()
  const website = body.website?.trim()

  // Hidden honeypot field: bots usually fill this.
  if (website) {
    return { ok: true }
  }

  if (!name || !email || !subject || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email, subject, and message are required.' })
  }

  if (!config.feedbackApiKey || !config.feedbackToEmail || !config.feedbackFromEmail) {
    throw createError({ statusCode: 500, statusMessage: 'Feedback email is not configured on the server.' })
  }

  const safe = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

  const safeName = safe(name)
  const safeEmail = safe(email)
  const safeSubject = safe(subject)
  const safeMessage = safe(message).replace(/\n/g, '<br>')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.feedbackApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.feedbackFromEmail,
      to: [config.feedbackToEmail],
      subject: `Portfolio Inquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `<h3>New Portfolio Inquiry</h3><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Subject:</strong> ${safeSubject}</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
      reply_to: email,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw createError({ statusCode: 502, statusMessage: `Email provider error: ${err}` })
  }

  return { ok: true }
})
