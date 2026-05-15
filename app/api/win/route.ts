import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const routingMap: Record<string, { label: string; emails: string[] }> = {
  corporate:   { label: 'Corporate Sponsor',     emails: ['corporate@juniorcouncil.org'] },
  auction:     { label: 'Silent Auction Item',   emails: ['transformation@juniorcouncil.org'] },
  hospitality: { label: 'Hospitality Partner',   emails: ['hospitality@juniorcouncil.org'] },
  inkind:      { label: 'In-Kind Donation',      emails: ['hospitality@juniorcouncil.org'] },
}

export async function POST(req: Request) {
  // Verify user is authenticated
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: {
    type?: string
    donorName?: string
    contactName?: string
    contactEmail?: string
    notes?: string
    submittedBy?: string
  }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { type, donorName, contactName, contactEmail, notes, submittedBy } = body
  if (!type || !donorName) {
    return NextResponse.json({ error: 'type and donorName are required' }, { status: 400 })
  }

  const route = routingMap[type]
  if (!route) return NextResponse.json({ error: 'Unknown donation type' }, { status: 400 })

  const { error } = await resend.emails.send({
    from: 'Junior Council Portal <noreply@juniorcouncil.org>',
    to: route.emails,
    replyTo: user.email ?? undefined,
    subject: `[JC Win] ${route.label} — ${donorName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #C1121F; padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">Junior Council</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">A member just logged a win!</p>
        </div>
        <div style="background: #f9f9f9; padding: 32px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Submitted By</td>
              <td style="padding: 8px 0; color: #111;">${submittedBy || user.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Type</td>
              <td style="padding: 8px 0; color: #111;">${route.label}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Donor / Company</td>
              <td style="padding: 8px 0; color: #111; font-weight: bold;">${donorName}</td>
            </tr>
            ${contactName ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Contact Name</td>
              <td style="padding: 8px 0; color: #111;">${contactName}</td>
            </tr>` : ''}
            ${contactEmail ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Contact Email</td>
              <td style="padding: 8px 0; color: #111;"><a href="mailto:${contactEmail}" style="color: #C1121F;">${contactEmail}</a></td>
            </tr>` : ''}
          </table>
          ${notes ? `
          <div style="margin-top: 24px; border-top: 2px solid #C1121F; padding-top: 24px;">
            <p style="color: #666; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; margin: 0 0 8px;">Notes</p>
            <p style="color: #111; line-height: 1.6; white-space: pre-wrap; margin: 0;">${notes}</p>
          </div>` : ''}
        </div>
        <div style="background: #1a1a1a; padding: 16px 32px; text-align: center;">
          <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 0;">Submitted via the Junior Council Member Portal</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
