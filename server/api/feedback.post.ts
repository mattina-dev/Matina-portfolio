import { createError, defineEventHandler, readBody } from 'h3'

type FeedbackPayload = {
  subject?: string
  message?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<FeedbackPayload>(event)

  const subject = body.subject?.trim()
  const message = body.message?.trim()

  if (!subject || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Subject and message are required.' })
  }

  if (!config.feedbackApiKey || !config.feedbackToEmail || !config.feedbackFromEmail) {
    throw createError({ statusCode: 500, statusMessage: 'Feedback email is not configured on the server.' })
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.feedbackApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.feedbackFromEmail,
      to: [config.feedbackToEmail],
      subject: `Portfolio Feedback: ${subject}`,
      text: `Subject: ${subject}\n\nMessage:\n${message}`,
      html: `<h3>New Portfolio Feedback</h3><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw createError({ statusCode: 502, statusMessage: `Email provider error: ${err}` })
  }

  return { ok: true }
})
