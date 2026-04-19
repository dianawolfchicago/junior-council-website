import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

// Admins who are allowed to send invitations. Lowercased for comparison.
const ADMIN_EMAILS = [
  'dianawolfchicago@gmail.com',
]

const SIGN_UP_URL =
  process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/sign-up`
    : 'https://junior-council-website.vercel.app/sign-up'

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Verify caller is admin
  const user = await clerkClient().users.getUser(userId)
  const callerEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress?.toLowerCase()
  if (!callerEmail || !ADMIN_EMAILS.includes(callerEmail)) {
    return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })
  }

  let body: { email?: string; firstName?: string; lastName?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  try {
    const invitation = await clerkClient().invitations.createInvitation({
      emailAddress: email,
      redirectUrl: SIGN_UP_URL,
      publicMetadata: {
        invitedBy: callerEmail,
        firstName: body.firstName || undefined,
        lastName: body.lastName || undefined,
      },
    })
    return NextResponse.json({ ok: true, invitationId: invitation.id })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Could not send invitation'
    // Clerk returns a structured error for duplicate invites etc.
    const clerkErr = err as { errors?: { message: string; longMessage?: string }[] }
    const first = clerkErr.errors?.[0]
    return NextResponse.json({ error: first?.longMessage || first?.message || msg }, { status: 400 })
  }
}
