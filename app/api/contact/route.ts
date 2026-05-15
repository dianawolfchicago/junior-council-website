import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Routing map — some reasons go to multiple recipients
const routingMap: Record<string, string[]> = {
  membership:  ['membership@juniorcouncil.org'],
  corporate:   ['corporate@juniorcouncil.org'],
  hospitality: ['hospitality@juniorcouncil.org'],
  inkind:      ['hospitality@juniorcouncil.org'],
  gala:        ['snowball@juniorcouncil.org', 'president@juniorcouncil.org'],
  media:       ['social@juniorcouncil.org', 'media@juniorcouncil.org'],
  general:     ['president@juniorcouncil.org', 'secretary@juniorcouncil.org'],
}

const reasonLabels: Record<string, string> = {
  membership:  'Membership Inquiry',
  corporate:   'Corporate Partnership',
  hospitality: 'Hospitality Partnership',
  inkind:      'In-Kind Donation',
  gala:        'Gala / Event Inquiry',
  media:       'Media & Press',
  general:     'General Inquiry',
}

export async function POST(req: Request) {
  let body: {
    firstName?: string
    lastName?: string
    email?: string
    organization?: string
    reason?: string
    message?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { firstName, lastName, email, organization, reason, message } = body

  if (!firstName || !lastName || !email || !reason || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const toEmails = routingMap[reason]

  if (!toEmails || toEmails.length === 0) {
    return NextResponse.json({ error: 'Unknown contact reason' }, { status: 400 })
  }

  const reasonLabel = reasonLabels[reason] ?? reason

  const { error } = await resend.emails.send({
    from: 'Junior Council Website <noreply@juniorcouncil.org>',
    to: toEmails,
    replyTo: email,
    subject: `[JC Contact] ${reasonLabel} — ${firstName} ${lastName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #C1121F; padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Junior Council</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">New contact form submission</p>
        </div>
        <div style="background: #f9f9f9; padding: 32px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Name</td>
              <td style="padding: 8px 0; color: #111;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Email</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${email}" style="color: #C1121F;">${email}</a></td>
            </tr>
            ${organization ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Organization</td>
              <td style="padding: 8px 0; color: #111;">${organization}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Reason</td>
              <td style="padding: 8px 0; color: #111;">${reasonLabel}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; border-top: 2px solid #C1121F; padding-top: 24px;">
            <p style="color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; margin: 0 0 8px;">Message</p>
            <p style="color: #111; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
        </div>
        <div style="background: #1a1a1a; padding: 16px 32px; text-align: center;">
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">This message was sent via the Junior Council contact form at juniorcouncil.org</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
