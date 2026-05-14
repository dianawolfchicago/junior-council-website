'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

type MemberProfile = {
  id: string
  email: string
  full_name: string
  role: 'member' | 'board' | 'admin'
  board_title: string
  dues_paid: boolean
}

const BOARD_TITLES = [
  '', 'President', 'Vice President', 'Treasurer', 'Secretary',
  'Snowball', 'Engagement', 'Recruitment', 'Education', 'Silent Auction',
  'W4AC / Fundraising Pages', 'Corporate Co-Chair', 'Creative', 'PR',
  'Hospitality', 'Transformation Director',
]

export default function RolesPage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<MemberProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'error'; msg: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user || user.email?.toLowerCase() !== 'dianawolfchicago@gmail.com') {
        router.replace('/portal')
      }
    })
  }, [router])

  useEffect(() => {
    fetch('/api/admin/roles')
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return }
        setProfiles(data.profiles)
      })
      .catch(() => setError('Failed to load members'))
      .finally(() => setLoading(false))
  }, [])

  const updateRole = async (userId: string, newRole: 'member' | 'board') => {
    setUpdating(userId + '-role')
    setStatusMsg(null)
    try {
      const res = await fetch('/api/admin/roles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update role')
      setProfiles(p => p.map(m => m.id === userId ? { ...m, role: newRole } : m))
      setStatusMsg({ type: 'ok', msg: 'Role updated successfully.' })
      setTimeout(() => setStatusMsg(null), 3000)
    } catch (err) {
      setStatusMsg({ type: 'error', msg: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setUpdating(null)
    }
  }

  const updateBoardTitle = async (userId: string, board_title: string) => {
    setUpdating(userId + '-title')
    setStatusMsg(null)
    try {
      const res = await fetch('/api/admin/roles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, board_title }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update title')
      setProfiles(p => p.map(m => m.id === userId ? { ...m, board_title } : m))
      setStatusMsg({ type: 'ok', msg: 'Board title updated.' })
      setTimeout(() => setStatusMsg(null), 3000)
    } catch (err) {
      setStatusMsg({ type: 'error', msg: err instanceof Error ? err.message : 'Something went wrong' })
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="min-h-screen bg-jc-gray flex flex-col">
      <nav className="bg-jc-black border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/portal" className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portal
        </Link>
        <span className="text-jc-red text-xs font-black uppercase tracking-widest">Admin Only</span>
      </nav>

      <div className="flex-grow px-4 py-12 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Admin</span>
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
          </div>
          <h1 className="text-jc-black font-black text-3xl sm:text-4xl tracking-tight">
            Manage <span className="text-jc-red">Roles & Titles</span>
          </h1>
          <p className="text-jc-gray-dark text-sm mt-2">
            Set member roles and board titles. Board title controls feature access (e.g. Treasurer sees Dues Tracker).
          </p>
        </div>

        {statusMsg && (
          <div className={`mb-6 px-4 py-3 border ${statusMsg.type === 'ok' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className={`text-xs font-bold ${statusMsg.type === 'ok' ? 'text-green-700' : 'text-red-600'}`}>{statusMsg.msg}</p>
          </div>
        )}

        <div className="bg-white border border-jc-gray-mid shadow-sm">
          {loading ? (
            <div className="px-6 py-12 text-center">
              <p className="text-jc-gray-dark text-sm">Loading members…</p>
            </div>
          ) : error ? (
            <div className="px-6 py-12 text-center">
              <p className="text-red-600 text-sm font-bold">{error}</p>
            </div>
          ) : (
            <>
              <div className="hidden sm:grid grid-cols-[1fr_1fr_100px_180px_160px] gap-4 px-6 py-3 border-b border-jc-gray-mid bg-jc-gray/50">
                <span className="text-jc-black text-xs font-black uppercase tracking-widest">Name</span>
                <span className="text-jc-black text-xs font-black uppercase tracking-widest">Email</span>
                <span className="text-jc-black text-xs font-black uppercase tracking-widest">Role</span>
                <span className="text-jc-black text-xs font-black uppercase tracking-widest">Board Title</span>
                <span className="text-jc-black text-xs font-black uppercase tracking-widest">Action</span>
              </div>

              <div className="divide-y divide-jc-gray-mid">
                {profiles.map(member => (
                  <div key={member.id} className="grid sm:grid-cols-[1fr_1fr_100px_180px_160px] gap-4 px-6 py-4 items-center">
                    <div>
                      <p className="text-jc-black font-bold text-sm">{member.full_name || '—'}</p>
                    </div>
                    <div>
                      <p className="text-jc-gray-dark text-sm truncate">{member.email}</p>
                    </div>
                    <div>
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 ${
                        member.role === 'admin' ? 'bg-purple-100 text-purple-700'
                        : member.role === 'board' ? 'bg-blue-100 text-blue-700'
                        : 'bg-jc-gray text-jc-gray-dark'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                    <div>
                      {member.role === 'admin' ? (
                        <span className="text-jc-gray-dark text-xs italic">—</span>
                      ) : (
                        <select
                          value={member.board_title}
                          onChange={e => updateBoardTitle(member.id, e.target.value)}
                          disabled={updating === member.id + '-title'}
                          className="w-full border border-jc-gray-mid focus:border-jc-red outline-none px-2 py-1.5 text-xs bg-white text-jc-black disabled:opacity-50"
                        >
                          {BOARD_TITLES.map(t => (
                            <option key={t} value={t}>{t || '— No title —'}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div>
                      {member.role === 'admin' ? (
                        <span className="text-jc-gray-dark text-xs italic">Cannot modify</span>
                      ) : member.role === 'board' ? (
                        <button
                          onClick={() => updateRole(member.id, 'member')}
                          disabled={updating === member.id + '-role'}
                          className="border border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red disabled:opacity-50 text-xs font-bold uppercase px-4 py-2 transition-colors"
                        >
                          {updating === member.id + '-role' ? 'Saving…' : 'Remove Board'}
                        </button>
                      ) : (
                        <button
                          onClick={() => updateRole(member.id, 'board')}
                          disabled={updating === member.id + '-role'}
                          className="bg-jc-red hover:bg-jc-red-dark disabled:opacity-50 text-white text-xs font-bold uppercase px-4 py-2 transition-colors"
                        >
                          {updating === member.id + '-role' ? 'Saving…' : 'Grant Board'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-3 border-t border-jc-gray-mid bg-jc-gray/30">
                <p className="text-jc-gray-dark text-xs">{profiles.length} member{profiles.length !== 1 ? 's' : ''} total</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
