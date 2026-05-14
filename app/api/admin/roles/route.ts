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

async function requireAdmin() {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? '')) return null
  return user
}

// GET — list all profiles (admin only)
export async function GET() {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })

  const adminSupabase = getServiceClient()
  const { data, error } = await adminSupabase
    .from('profiles')
    .select('id, email, full_name, role, board_title, dues_paid')
    .order('full_name', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ profiles: data })
}

// PATCH — update a user's role (admin only)
export async function PATCH(req: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })

  let body: { userId?: string; role?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { userId, role } = body
  if (!userId || !role) {
    return NextResponse.json({ error: 'userId and role are required' }, { status: 400 })
  }
  if (!['member', 'board', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  const adminSupabase = getServiceClient()

  // Prevent demoting other admins
  const { data: target } = await adminSupabase
    .from('profiles')
    .select('role, email')
    .eq('id', userId)
    .single()

  if (target?.role === 'admin' && target?.email !== user.email) {
    return NextResponse.json({ error: 'Cannot modify another admin account' }, { status: 403 })
  }

  const { error } = await adminSupabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// PATCH board_title — update a user's board title (admin only)
export async function PUT(req: Request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })

  let body: { userId?: string; board_title?: string }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { userId, board_title } = body
  if (!userId || board_title === undefined) {
    return NextResponse.json({ error: 'userId and board_title are required' }, { status: 400 })
  }

  const adminSupabase = getServiceClient()
  const { error } = await adminSupabase
    .from('profiles')
    .update({ board_title })
    .eq('id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
