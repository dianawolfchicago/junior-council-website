import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

const ADMIN_EMAILS = ['dianawolfchicago@gmail.com']

function getServiceClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function requireAdminOrTreasurer() {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  if (ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) return user

  // Check if user has Treasurer board_title
  const adminSupabase = getServiceClient()
  const { data: profile } = await adminSupabase
    .from('profiles')
    .select('board_title')
    .eq('id', user.id)
    .single()

  if (profile?.board_title === 'Treasurer') return user
  return null
}

// PATCH — toggle dues_paid for a user (admin or treasurer only)
export async function PATCH(req: Request) {
  const user = await requireAdminOrTreasurer()
  if (!user) return NextResponse.json({ error: 'Forbidden — admin or treasurer only' }, { status: 403 })

  let body: { userId?: string; dues_paid?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { userId, dues_paid } = body
  if (!userId || dues_paid === undefined) {
    return NextResponse.json({ error: 'userId and dues_paid are required' }, { status: 400 })
  }

  const adminSupabase = getServiceClient()
  const { error } = await adminSupabase
    .from('profiles')
    .update({ dues_paid })
    .eq('id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
