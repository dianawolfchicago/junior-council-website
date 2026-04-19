import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

// Admins who are allowed to generate invite links. Lowercased for comparison.
const ADMIN_EMAILS = [
  'dianawolfchicago@gmail.com',
]

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://junior-council-website.vercel.app'

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

  // Build the signup link to OUR custom sign-up page. No Clerk
  // invitation email — admin shares this link directly so we never
  // bounce through accounts.dev.
  const params = new URLSearchParams({ email })
  if (body.firstName) params.set('firstName', body.firstName)
  if (body.lastName) params.set('lastName', body.lastName)
  const signUpLink = `${SITE_URL}/sign-up?${params.toString()}`

  return NextResponse.json({ ok: true, signUpLink })
}
