'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

// ─── Types ───────────────────────────────────────────────────────────────────

type Comment    = { id: number; author: string; text: string; time: string }
type PollOption = { id: number; text: string; votes: number }
type Post = {
  id: number; author: string; initials: string; time: string
  text: string; image?: string; likes: number; liked: boolean
  comments: Comment[]; showComments: boolean
  poll?: PollOption[]; votedOption?: number
}
type Tab = 'dashboard' | 'calendar' | 'impact' | 'resources' | 'profile'

type Profile = {
  name: string; pronouns: string; avatar: string | null; bio: string
  jobTitle: string; company: string; college: string; degree: string
  gradYear: string; neighborhood: string; linkedin: string; instagram: string
  whyJoined: string; funFact: string; interests: string[]
}

// ─── Seed posts ───────────────────────────────────────────────────────────────

const seedPosts: Post[] = [
  {
    id: 1, author: 'Eve Voci', initials: 'EV', time: '2h ago',
    text: 'So proud of everything this team accomplished at Snowball 2026. $242,000 raised — you all are incredible. Cannot wait to top it next year!',
    likes: 14, liked: false, comments: [
      { id: 1, author: 'Hailie Schroll', text: "Best night of the year, every year. Let's go 2027!", time: '1h ago' },
      { id: 2, author: 'Catie Hinton',   text: 'So grateful to be part of this team.',               time: '45m ago' },
    ], showComments: false,
  },
  {
    id: 2, author: 'Hailie Schroll', initials: 'HS', time: '1d ago',
    text: "Quick poll for the team — what night works best for our summer happy hour?",
    likes: 5, liked: false, comments: [], showComments: false,
    poll: [
      { id: 1, text: 'Thursday, July 10',  votes: 7 },
      { id: 2, text: 'Friday, July 18',    votes: 4 },
      { id: 3, text: 'Saturday, July 26',  votes: 2 },
    ],
  },
  {
    id: 3, author: 'Brooklyn Mychalowych', initials: 'BM', time: '3d ago',
    text: 'Just finished the new JC branding assets — really excited about where the creative direction is going this year. Sneak peek coming soon!',
    likes: 21, liked: false, comments: [
      { id: 1, author: 'Jessica Linley', text: 'Cannot wait to see it!', time: '2d ago' },
    ], showComments: false,
  },
]

// ─── Events ───────────────────────────────────────────────────────────────────

type CalEvent = { id: string; title: string; dateKey: string; date: string; time: string; location: string; type: string; personal?: boolean; createdBy?: string }
type RsvpRecord = { id: string; eventId: string; userId: string; status: 'yes' | 'no'; fullName: string }

const eventTypeColors: Record<string,string> = {
  Meeting:'bg-blue-100 text-blue-700', Event:'bg-purple-100 text-purple-700',
  Fundraiser:'bg-green-100 text-green-700', Social:'bg-yellow-100 text-yellow-700',
  Personal:'bg-pink-100 text-pink-700',
}
const eventTypeDots: Record<string,string> = {
  Meeting:'bg-blue-500', Event:'bg-purple-500', Fundraiser:'bg-green-500', Social:'bg-yellow-500',
  Personal:'bg-pink-500',
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

// ─── Impact goals ─────────────────────────────────────────────────────────────

const donationSubGoals = [
  { id:'corporate',   label:'Corporate donor'     },
  { id:'auction',     label:'Silent auction item' },
  { id:'hospitality', label:'Hospitality partner' },
  { id:'inkind',      label:'In-kind donation'    },
]

const TOTAL_GOALS = 3   // OneCause · Any 1 donation · 3+ events

const DONATION_ROUTES: Record<string,string> = {
  corporate:   'Marisa Stefani & Jessica Linley',
  auction:     'Erin Bylina',
  hospitality: 'Emily Splinter',
  inkind:      'Diana Wolf',
}

// ─── Resources ────────────────────────────────────────────────────────────────

const resources = [
  { title:'JC Google Drive',          desc:'Access shared documents, assets, and files.',                         icon:'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', link:'https://drive.google.com', tag:'Drive'      },
  { title:'Corporate Packet PDF',     desc:'Share with potential corporate sponsors.',                            icon:'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', link:'/JC-Corporate-Packet.pdf', tag:'PDF'        },
  { title:'Brand Guidelines',         desc:'Logos, colors, fonts, and usage rules.',                             icon:'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', link:'#', tag:'Design'     },
  { title:'Member Handbook',          desc:'Everything you need to know as a JC member.',                        icon:'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', link:'#', tag:'Handbook'   },
  { title:'Social Media Kit',         desc:'Pre-made graphics and captions for posting about JC.',               icon:'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', link:'#', tag:'Social'     },
  { title:'Donation Outreach Email Templates', desc:'Ready-to-send email templates for sponsor outreach.',       icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', link:'#', tag:'Templates'  },
]

// ─── Profile ─────────────────────────────────────────────────────────────────

const INTEREST_TAGS = [
  'Philanthropy','Networking','Events & Hospitality','Art & Culture',
  'Fitness & Wellness','Food & Wine','Travel','Real Estate',
  'Finance','Healthcare','Tech','Marketing & PR','Fashion','Music','Sports',
]

const PRONOUNS_OPTIONS = ['She/Her','He/Him','They/Them','She/They','He/They','Prefer not to say']

const defaultProfile: Profile = {
  name:'Member Name', pronouns:'', avatar:null, bio:'',
  jobTitle:'', company:'', college:'', degree:'', gradYear:'',
  neighborhood:'', linkedin:'', instagram:'', whyJoined:'', funFact:'', interests:[],
}

// ─────────────────────────────────────────────────────────────────────────────

export default function PortalPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [duesModalOpen, setDuesModalOpen] = useState(false)
  const [duesPaid, setDuesPaid] = useState(false)
  const [boardTitle, setBoardTitle] = useState('')
  const [allMembers, setAllMembers] = useState<{id:string; full_name:string; email:string; dues_paid:boolean}[]>([])
  const [duesToggling, setDuesToggling] = useState<string|null>(null)
  const [navMenuOpen, setNavMenuOpen] = useState(false)

  // Role + org events + RSVPs
  const [myRole, setMyRole] = useState<'member'|'board'|'admin'>('member')
  const [orgEvents, setOrgEvents] = useState<CalEvent[]>([])
  const [rsvpMap, setRsvpMap] = useState<Record<string,'yes'|'no'>>({})
  const [allRsvps, setAllRsvps] = useState<RsvpRecord[]>([])
  const [eventFormOpen, setEventFormOpen] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string|null>(null)
  const [eventForm, setEventForm] = useState({ title:'', dateKey:'', time:'', location:'', type:'Meeting' })
  const [eventSaving, setEventSaving] = useState(false)

  // Admin invite modal
  const isAdmin = myRole === 'admin'
  const isBoard = myRole === 'board' || myRole === 'admin'
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({ email:'', firstName:'', lastName:'' })
  const [inviteStatus, setInviteStatus] = useState<{type:'idle'|'sending'|'ok'|'error', msg?:string}>({type:'idle'})
  const sendInvite = async () => {
    if (!inviteForm.email.trim()) return
    setInviteStatus({type:'sending'})
    try {
      const res = await fetch('/api/admin/invite', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(inviteForm),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send invitation')
      setInviteStatus({type:'ok', msg:`Invitation sent to ${inviteForm.email}`})
      setInviteForm({ email:'', firstName:'', lastName:'' })
      setTimeout(() => setInviteStatus({type:'idle'}), 4000)
    } catch (err) {
      setInviteStatus({type:'error', msg: err instanceof Error ? err.message : 'Something went wrong'})
    }
  }
  const resetInviteModal = () => {
    setInviteModalOpen(false)
    setInviteStatus({type:'idle'})
    setInviteForm({ email:'', firstName:'', lastName:'' })
  }

  // Goals
  const [checked, setChecked] = useState<Record<string,boolean>>({})
  const toggleGoal = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }))
  const isDonationComplete = donationSubGoals.some(g => checked[g.id])
  const completedCount =
    (checked['oncause']   ? 1 : 0) +
    (isDonationComplete   ? 1 : 0) +
    (checked['attended3'] ? 1 : 0)

  // Donor submission form
  const [donorForm, setDonorForm] = useState({ type:'', donorName:'', contactName:'', contactEmail:'', notes:'' })
  const [donorSubmitted, setDonorSubmitted] = useState(false)
  const handleDonorSubmit = () => {
    if (!donorForm.type || !donorForm.donorName.trim()) return
    setDonorSubmitted(true)
    setTimeout(() => {
      setDonorSubmitted(false)
      setDonorForm({ type:'', donorName:'', contactName:'', contactEmail:'', notes:'' })
    }, 5000)
  }

  // Calendar
  const today = new Date()
  const [calYear,  setCalYear]    = useState(today.getFullYear())
  const [calMonth, setCalMonth]   = useState(today.getMonth())
  const pad = (n:number) => String(n).padStart(2,'0')
  const todayKey = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`
  const [selectedDay, setSelectedDay] = useState<string|null>(todayKey)
  const prevMonth = () => { if (calMonth===0){setCalMonth(11);setCalYear(y=>y-1)}else setCalMonth(m=>m-1); setSelectedDay(null) }
  const nextMonth = () => { if (calMonth===11){setCalMonth(0);setCalYear(y=>y+1)}else setCalMonth(m=>m+1); setSelectedDay(null) }
  const daysInMonth    = new Date(calYear, calMonth+1, 0).getDate()
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay()

  // Personal events (per-user, stored in Supabase `personal_events` table)
  const [personalEvents, setPersonalEvents] = useState<CalEvent[]>([])
  useEffect(() => {
    if (!user) { setPersonalEvents([]); return }
    const supabase = createClient()
    supabase
      .from('personal_events')
      .select('id, title, date_key, time, location')
      .order('date_key', { ascending: true })
      .then(({ data }) => {
        if (!data) return
        setPersonalEvents(
          data.map((r: { id: string; title: string; date_key: string; time: string | null; location: string | null }) => ({
            id: r.id,
            title: r.title,
            dateKey: r.date_key,
            date: new Date(r.date_key + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: r.time || '',
            location: r.location || '',
            type: 'Personal',
            personal: true,
          }))
        )
      })
  }, [user])

  // Add Personal Event form
  const [personalForm, setPersonalForm] = useState({ title:'', dateKey:'', time:'', location:'' })
  const [personalFormOpen, setPersonalFormOpen] = useState(false)
  const [personalSaving, setPersonalSaving] = useState(false)
  const openPersonalForm = () => {
    setPersonalForm({ title:'', dateKey: selectedDay || todayKey, time:'', location:'' })
    setPersonalFormOpen(true)
  }
  const savePersonalEvent = async () => {
    if (!user || !personalForm.title.trim() || !personalForm.dateKey) return
    setPersonalSaving(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('personal_events')
      .insert({
        user_id: user.id,
        title: personalForm.title.trim(),
        date_key: personalForm.dateKey,
        time: personalForm.time.trim() || null,
        location: personalForm.location.trim() || null,
      })
      .select('id, title, date_key, time, location')
      .single()
    setPersonalSaving(false)
    if (error || !data) return
    const newEvent: CalEvent = {
      id: data.id,
      title: data.title,
      dateKey: data.date_key,
      date: new Date(data.date_key + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: data.time || '',
      location: data.location || '',
      type: 'Personal',
      personal: true,
    }
    setPersonalEvents(p => [...p, newEvent])
    setSelectedDay(data.date_key)
    setPersonalFormOpen(false)
  }
  const deletePersonalEvent = async (id: string) => {
    const supabase = createClient()
    await supabase.from('personal_events').delete().eq('id', id)
    setPersonalEvents(p => p.filter(e => e.id !== id))
  }

  // Fetch user role + dues status
  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase.rpc('get_my_role').then(({ data }) => {
      if (data) setMyRole(data as 'member'|'board'|'admin')
    })
    supabase.from('profiles').select('dues_paid, board_title').eq('id', user.id).single().then(({ data }) => {
      if (data) { setDuesPaid(data.dues_paid); setBoardTitle(data.board_title || '') }
    })
  }, [user])

  const isTreasurer = boardTitle === 'Treasurer'

  // Fetch all members for admin dues panel
  useEffect(() => {
    if (!isAdmin && !isTreasurer) return
    const supabase = createClient()
    supabase.from('profiles').select('id, full_name, email, dues_paid').order('full_name').then(({ data }) => {
      if (data) setAllMembers(data)
    })
  }, [isAdmin, isTreasurer])

  const toggleDues = async (userId: string, current: boolean) => {
    setDuesToggling(userId)
    const res = await fetch('/api/admin/dues', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, dues_paid: !current }),
    })
    if (res.ok) {
      setAllMembers(m => m.map(member => member.id === userId ? { ...member, dues_paid: !current } : member))
      if (userId === user?.id) setDuesPaid(!current)
    }
    setDuesToggling(null)
  }

  // Fetch org events
  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from('org_events')
      .select('id, title, date_key, date_label, time, location, type, created_by')
      .then(({ data }) => {
        if (!data) return
        setOrgEvents(data.map((r: { id: string; title: string; date_key: string; date_label: string; time: string; location: string; type: string; created_by: string | null }) => ({
          id: r.id,
          title: r.title,
          dateKey: r.date_key,
          date: r.date_label,
          time: r.time || '',
          location: r.location || '',
          type: r.type,
          createdBy: r.created_by ?? undefined,
        })))
      })
  }, [user])

  // Fetch RSVPs
  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase
      .from('event_rsvps')
      .select('id, event_id, user_id, status, profiles(full_name)')
      .then(({ data }) => {
        if (!data) return
        type RsvpRow = { id: string; event_id: string; user_id: string; status: string; profiles: { full_name: string }[] | { full_name: string } | null }
        const records: RsvpRecord[] = (data as RsvpRow[]).map(r => {
          const prof = r.profiles
          const fullName = Array.isArray(prof) ? (prof[0]?.full_name || 'Member') : (prof?.full_name || 'Member')
          return { id: r.id, eventId: r.event_id, userId: r.user_id, status: r.status as 'yes' | 'no', fullName }
        })
        setAllRsvps(records)
        const myMap: Record<string,'yes'|'no'> = {}
        records.filter(r => r.userId === user.id).forEach(r => { myMap[r.eventId] = r.status })
        setRsvpMap(myMap)
      })
  }, [user])

  // RSVP handlers
  const upsertRsvp = async (eventId: string, status: 'yes' | 'no') => {
    if (!user) return
    const supabase = createClient()
    const { data } = await supabase
      .from('event_rsvps')
      .upsert({ event_id: eventId, user_id: user.id, status }, { onConflict: 'event_id,user_id' })
      .select('id, event_id, user_id, status')
      .single()
    if (!data) return
    // Get the user's display name from profile state or fallback
    const fullName = profile.name !== 'Member Name' ? profile.name : (user.user_metadata?.full_name as string | undefined) || 'Member'
    const record: RsvpRecord = { id: data.id, eventId: data.event_id, userId: data.user_id, status: data.status as 'yes' | 'no', fullName }
    setRsvpMap(p => ({ ...p, [eventId]: status }))
    setAllRsvps(p => [...p.filter(r => !(r.eventId === eventId && r.userId === user.id)), record])
  }

  const deleteRsvp = async (eventId: string) => {
    if (!user) return
    const supabase = createClient()
    await supabase.from('event_rsvps').delete().eq('event_id', eventId).eq('user_id', user.id)
    setRsvpMap(p => { const n = { ...p }; delete n[eventId]; return n })
    setAllRsvps(p => p.filter(r => !(r.eventId === eventId && r.userId === user.id)))
  }

  // Org event form handlers
  const openOrgEventForm = (ev?: CalEvent) => {
    if (ev) {
      setEditingEventId(ev.id)
      setEventForm({ title: ev.title, dateKey: ev.dateKey, time: ev.time, location: ev.location, type: ev.type })
    } else {
      setEditingEventId(null)
      setEventForm({ title: '', dateKey: selectedDay || todayKey, time: '', location: '', type: 'Meeting' })
    }
    setEventFormOpen(true)
  }

  const saveOrgEvent = async () => {
    if (!user || !eventForm.title.trim() || !eventForm.dateKey) return
    setEventSaving(true)
    const supabase = createClient()
    if (editingEventId) {
      const { data, error } = await supabase
        .from('org_events')
        .update({
          title: eventForm.title.trim(),
          date_key: eventForm.dateKey,
          date_label: new Date(eventForm.dateKey + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          time: eventForm.time.trim() || '',
          location: eventForm.location.trim() || '',
          type: eventForm.type,
        })
        .eq('id', editingEventId)
        .select('id, title, date_key, date_label, time, location, type, created_by')
        .single()
      setEventSaving(false)
      if (error || !data) return
      const updated: CalEvent = { id: data.id, title: data.title, dateKey: data.date_key, date: data.date_label, time: data.time, location: data.location, type: data.type, createdBy: data.created_by ?? undefined }
      setOrgEvents(p => p.map(e => e.id === editingEventId ? updated : e))
    } else {
      const dateLabel = new Date(eventForm.dateKey + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      const { data, error } = await supabase
        .from('org_events')
        .insert({
          title: eventForm.title.trim(),
          date_key: eventForm.dateKey,
          date_label: dateLabel,
          time: eventForm.time.trim() || '',
          location: eventForm.location.trim() || '',
          type: eventForm.type,
          created_by: user.id,
        })
        .select('id, title, date_key, date_label, time, location, type, created_by')
        .single()
      setEventSaving(false)
      if (error || !data) return
      const newEv: CalEvent = { id: data.id, title: data.title, dateKey: data.date_key, date: data.date_label, time: data.time, location: data.location, type: data.type, createdBy: data.created_by ?? undefined }
      setOrgEvents(p => [...p, newEv])
      setSelectedDay(data.date_key)
    }
    setEventFormOpen(false)
  }

  const deleteOrgEvent = async (id: string) => {
    const supabase = createClient()
    await supabase.from('org_events').delete().eq('id', id)
    setOrgEvents(p => p.filter(e => e.id !== id))
  }

  const upcomingEvents = [...orgEvents].sort((a, b) => a.dateKey.localeCompare(b.dateKey))
  const combinedEvents = [...orgEvents, ...personalEvents]
  const eventsOnDay = (day:number) => { const k=`${calYear}-${pad(calMonth+1)}-${pad(day)}`; return combinedEvents.filter(e=>e.dateKey===k) }
  const selectedEvents = selectedDay ? combinedEvents.filter(e=>e.dateKey===selectedDay) : []

  // Profile — seed name from Supabase user metadata if available
  const [profile, setProfile]           = useState<Profile>({...defaultProfile})
  const [profileDraft, setProfileDraft] = useState<Profile>({...defaultProfile})
  const [editingProfile, setEditingProfile] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  // Sync name from Supabase user metadata once user loads
  useEffect(() => {
    if (!user) return
    const name = (user.user_metadata?.full_name as string | undefined) || ''
    if (!name) return
    setProfile(p => p.name === defaultProfile.name ? {...p, name} : p)
    setProfileDraft(p => p.name === defaultProfile.name ? {...p, name} : p)
  }, [user])

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if(!file) return
    const reader = new FileReader()
    reader.onload = ev => setProfileDraft(p => ({...p, avatar: ev.target?.result as string}))
    reader.readAsDataURL(file)
  }
  const profileInitials = profile.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || 'ME'
  const draftInitials   = profileDraft.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() || 'ME'

  const profileFields = [
    profile.bio, profile.jobTitle, profile.company, profile.college,
    profile.degree, profile.neighborhood, profile.linkedin, profile.instagram,
    profile.whyJoined, profile.funFact,
  ]
  const profileComplete = Math.round(
    (profileFields.filter(Boolean).length + (profile.interests.length ? 1 : 0) + (profile.avatar ? 1 : 0) + (profile.pronouns ? 1 : 0)) /
    (profileFields.length + 3) * 100
  )

  const saveProfile = () => { setProfile(profileDraft); setEditingProfile(false) }
  const cancelEdit  = () => { setProfileDraft(profile); setEditingProfile(false) }

  // Feed
  const [posts, setPosts]               = useState<Post[]>(seedPosts)
  const [postText, setPostText]         = useState('')
  const [postImage, setPostImage]       = useState<string|null>(null)
  const [showPoll, setShowPoll]         = useState(false)
  const [pollOptions, setPollOptions]   = useState(['',''])
  const [commentInputs, setCommentInputs] = useState<Record<number,string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if(!file) return
    const reader = new FileReader()
    reader.onload = ev => setPostImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmitPost = () => {
    if (!postText.trim() && !postImage && !showPoll) return
    const validPollOptions = pollOptions.filter(o => o.trim())
    const newPost: Post = {
      id: Date.now(), author:'You', initials:'ME', time:'Just now',
      text: postText.trim(), image: postImage ?? undefined,
      likes:0, liked:false, comments:[], showComments:false,
      ...(showPoll && validPollOptions.length >= 2 ? {
        poll: validPollOptions.map((text,i) => ({ id:i+1, text, votes:0 }))
      } : {}),
    }
    setPosts([newPost, ...posts])
    setPostText(''); setPostImage(null); setShowPoll(false); setPollOptions(['',''])
    if (fileInputRef.current) fileInputRef.current.value=''
  }

  const handleLike = (id:number) => setPosts(p => p.map(post =>
    post.id===id ? {...post, liked:!post.liked, likes: post.liked ? post.likes-1 : post.likes+1} : post
  ))
  const handleToggleComments = (id:number) => setPosts(p => p.map(post =>
    post.id===id ? {...post, showComments:!post.showComments} : post
  ))
  const handleAddComment = (postId:number) => {
    const text = commentInputs[postId]?.trim(); if(!text) return
    setPosts(p => p.map(post => post.id===postId
      ? {...post, comments:[...post.comments,{id:Date.now(),author:'You',text,time:'Just now'}]}
      : post
    ))
    setCommentInputs(p => ({...p,[postId]:''}))
  }
  const handleVote = (postId:number, optionId:number) => setPosts(p => p.map(post =>
    post.id===postId && !post.votedOption
      ? {...post, votedOption:optionId, poll:post.poll?.map(o => o.id===optionId ? {...o,votes:o.votes+1} : o)}
      : post
  ))
  const handleDeletePost = (id:number) => setPosts(p => p.filter(post => post.id!==id))

  const tabs = [
    { key:'dashboard' as Tab, label:'Dashboard',      icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { key:'calendar'  as Tab, label:'Calendar & Events', icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { key:'impact'    as Tab, label:'Impact Tracker', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { key:'resources' as Tab, label:'Resources',      icon:'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z' },
  ]

  return (
    <div className="min-h-screen bg-jc-gray">

      {/* Portal nav */}
      <nav className="bg-jc-black border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="bg-white px-3 py-1 border-[6px] border-jc-red">
            <Image src="/jc-logo.png" alt="Junior Council" width={120} height={30} className="h-6 w-auto" priority />
          </div>
        </Link>
        {/* Avatar dropdown */}
        <div className="relative pr-14">
          <button
            onClick={() => setNavMenuOpen(o => !o)}
            className="flex items-center gap-2.5 group"
            aria-haspopup="true"
            aria-expanded={navMenuOpen}
          >
            {/* Avatar */}
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar} alt="Profile" className="w-9 h-9 object-cover border-2 border-white/20 group-hover:border-jc-red transition-colors"/>
            ) : (
              <div className="w-9 h-9 bg-jc-red flex items-center justify-center text-white text-xs font-black border-2 border-jc-red group-hover:border-white/40 transition-colors">
                {profileInitials}
              </div>
            )}
            <span className="text-white/70 group-hover:text-white text-xs font-bold hidden sm:block transition-colors">
              {profile.name === 'Member Name' ? 'Member' : profile.name.split(' ')[0]}
            </span>
            <svg className={`w-3 h-3 text-white/50 group-hover:text-white transition-all ${navMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          {/* Dropdown */}
          {navMenuOpen && (
            <div className="absolute top-full right-0 mt-3 w-48 bg-jc-black border border-white/10 shadow-2xl shadow-black/50 z-50">
              <div className="h-0.5 w-full bg-jc-red"/>
              {/* Profile info header */}
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-white font-black text-sm truncate">{profile.name === 'Member Name' ? 'Member' : profile.name}</p>
                <p className="text-white/40 text-xs truncate">{profile.jobTitle || 'JC Member 2026'}</p>
              </div>
              <button
                onClick={() => { setActiveTab('profile'); setNavMenuOpen(false) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wide transition-colors border-b border-white/5"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                My Profile
              </button>
              <Link
                href="/portal/account"
                onClick={() => setNavMenuOpen(false)}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wide transition-colors border-b border-white/5"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Account & Password
              </Link>
              {isAdmin && (
                <>
                  <button
                    onClick={() => { setInviteModalOpen(true); setNavMenuOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-jc-red hover:text-white hover:bg-jc-red/20 text-xs font-bold uppercase tracking-wide transition-colors border-b border-white/5"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    Invite Member
                  </button>
                  <Link
                    href="/portal/admin/roles"
                    onClick={() => setNavMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-jc-red hover:text-white hover:bg-jc-red/20 text-xs font-bold uppercase tracking-wide transition-colors border-b border-white/5"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Manage Roles
                  </Link>
                </>
              )}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wide transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Tab bar */}
      <div className="bg-jc-charcoal border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex bg-black/40 p-1 gap-1 rounded-sm flex-wrap">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab===tab.key ? 'bg-jc-red text-white shadow-sm' : 'text-white/40 hover:text-white/80'
                }`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── DASHBOARD ─────────────────────────────────────────────────────── */}
        {activeTab==='dashboard' && (()=>{
          const hour       = today.getHours()
          const greeting   = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
          const firstName  = profile.name === 'Member Name' ? 'Member' : profile.name.split(' ')[0]
          const todayStr   = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`
          const nextEvent  = upcomingEvents.find(e => e.dateKey >= todayStr) ?? null
          const daysUntil  = nextEvent ? Math.ceil((new Date(nextEvent.dateKey+'T00:00:00').getTime() - new Date(todayStr+'T00:00:00').getTime()) / 86400000) : null
          const raisedAmt  = 242000; const goalAmt = 250000
          const raisedPct  = Math.min(Math.round(raisedAmt / goalAmt * 100), 100)
          const ringR      = 36; const ringC = 2 * Math.PI * ringR
          const ringOffset = ringC * (1 - completedCount / TOTAL_GOALS)
          return (
            <div className="space-y-5">

              {/* ── Hero ── */}
              <div className="bg-jc-black">
                <div className="h-0.5 w-full bg-jc-red"/>
                <div className="px-8 sm:px-12 py-7 sm:py-9">
                  <p className="text-jc-red text-xs font-bold tracking-[0.3em] uppercase mb-3">{greeting}</p>
                  <h1 className="text-white font-black text-5xl sm:text-6xl tracking-tight leading-none mb-4">{firstName}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white/60 text-xs tracking-[0.2em] uppercase">Junior Council</span>
                    <div className="w-1 h-1 bg-white/40 rounded-full"/>
                    <span className="text-white/60 text-xs tracking-[0.2em] uppercase">2026 / 2027 Season</span>
                    <div className="w-1 h-1 bg-white/40 rounded-full"/>
                    <span className="text-white/60 text-xs tracking-[0.2em] uppercase">
                      {today.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
                    </span>
                  </div>
                </div>
                {/* Fundraising strip */}
                <div className="border-t border-white/10 px-8 sm:px-12 py-4 flex items-center gap-6 flex-wrap">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">2026 Fundraising Goal</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-white font-black text-2xl">${raisedAmt.toLocaleString()}</span>
                      <span className="text-white/60 text-xs">of ${goalAmt.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex-grow flex items-center gap-4 min-w-[160px]">
                    <div className="flex-grow h-px bg-white/20 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-jc-red transition-all" style={{width:`${raisedPct}%`}}/>
                    </div>
                    <span className="text-jc-red font-black text-sm flex-shrink-0">{raisedPct}%</span>
                  </div>
                  <span className="text-white/60 text-xs">${(goalAmt-raisedAmt).toLocaleString()} to go</span>
                </div>
              </div>

              {/* ── Next event ── */}
              <div className="bg-white border border-jc-gray-mid">
                <div className="px-6 py-3 border-b border-jc-gray-mid flex items-center justify-between">
                  <span className="text-jc-red text-xs font-black uppercase tracking-[0.2em]">Next Up</span>
                  <button onClick={()=>setActiveTab('calendar')} className="text-jc-gray-dark text-xs font-bold hover:text-jc-red transition-colors">Full calendar →</button>
                </div>
                {nextEvent ? (
                  <div className="flex flex-col sm:flex-row">
                    {/* Date block */}
                    <div className="bg-jc-black sm:w-40 px-6 py-7 flex flex-col items-center justify-center flex-shrink-0 text-center">
                      <p className="text-jc-red text-xs font-black uppercase tracking-[0.2em] mb-2">
                        {nextEvent.date.split(' ')[0].toUpperCase()}
                      </p>
                      <p className="text-white font-black leading-none mb-2" style={{fontSize:'4rem'}}>
                        {parseInt(nextEvent.dateKey.slice(8,10))}
                      </p>
                      <p className="text-white/70 text-xs tracking-widest uppercase mb-3">{nextEvent.date.split(',')[1]?.trim()}</p>
                      {daysUntil !== null && (
                        <div className="px-3 py-1 bg-white/5 border border-white/20">
                          <span className="text-white/80 text-xs font-bold tracking-wide">
                            {daysUntil === 0 ? 'Today' : `${daysUntil}d away`}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Details */}
                    <div className="flex-grow px-6 py-7 flex flex-col justify-between">
                      <div>
                        <span className={`inline-block text-xs font-bold px-2 py-0.5 mb-3 ${eventTypeColors[nextEvent.type]}`}>{nextEvent.type}</span>
                        <h2 className="text-jc-black font-black text-2xl sm:text-3xl leading-tight tracking-tight mb-4">{nextEvent.title}</h2>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-jc-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <p className="text-jc-gray-dark text-sm">{nextEvent.time}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-jc-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <p className="text-jc-gray-dark text-sm">{nextEvent.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-5 flex-wrap">
                        {rsvpMap[nextEvent.id] ? (
                          <>
                            <span className={`text-xs font-bold px-4 py-2.5 ${rsvpMap[nextEvent.id]==='yes'?'bg-green-100 text-green-700':'bg-jc-gray text-jc-gray-dark'}`}>
                              {rsvpMap[nextEvent.id]==='yes'?'You\'re Attending':'Not Attending'}
                            </span>
                            <button onClick={()=>deleteRsvp(nextEvent.id)} className="text-jc-gray-dark text-xs hover:text-jc-red transition-colors">Change</button>
                          </>
                        ) : (
                          <>
                            <button onClick={()=>upsertRsvp(nextEvent.id,'yes')} className="bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs uppercase tracking-widest px-6 py-3 transition-colors">RSVP Yes</button>
                            <button onClick={()=>upsertRsvp(nextEvent.id,'no')} className="border-2 border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red font-bold text-xs uppercase px-4 py-3 transition-colors">Can&apos;t Go</button>
                          </>
                        )}
                        {(()=>{ const att=allRsvps.filter(r=>r.eventId===nextEvent.id&&r.status==='yes'); return att.length>0&&(<p className="w-full text-jc-gray-dark text-xs mt-1">{att.length} attending: {att.map(a=>a.fullName).join(', ')}</p>) })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-20">
                    <p className="text-jc-gray-dark text-sm">No upcoming events.</p>
                  </div>
                )}
              </div>

              {/* ── Goals + Dues ── */}
              <div className="grid sm:grid-cols-3 gap-5">

                {/* Goals */}
                <div className="sm:col-span-2 bg-white border border-jc-gray-mid p-5 flex items-center gap-5 cursor-pointer hover:border-jc-red transition-colors group"
                  onClick={()=>setActiveTab('impact')} role="button" aria-label="View Impact Tracker">
                  <div className="relative flex-shrink-0 w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 88 88" aria-hidden="true">
                      <circle cx="44" cy="44" r={ringR} fill="none" stroke="#e8e8e8" strokeWidth="7"/>
                      <circle cx="44" cy="44" r={ringR} fill="none" stroke="#C8102E" strokeWidth="7"
                        strokeDasharray={ringC} strokeDashoffset={ringOffset}
                        className="transition-all duration-700"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-jc-black font-black text-lg leading-none">{completedCount}</span>
                      <span className="text-jc-gray-dark text-xs">of {TOTAL_GOALS}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-jc-gray-dark text-xs uppercase tracking-widest mb-1">Season Goals</p>
                    <p className="text-jc-black font-black text-lg leading-tight mb-3">
                      {completedCount === TOTAL_GOALS ? 'All Complete!' : completedCount === 0 ? 'Get Started' : `${completedCount} of ${TOTAL_GOALS} Done`}
                    </p>
                    <span className="text-jc-red text-xs font-bold group-hover:underline">View Impact Tracker →</span>
                  </div>
                </div>

                {/* Dues */}
                <div className="bg-jc-black p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1.5">2026–2027 Dues</p>
                    <p className={`font-black text-3xl leading-none mb-2 ${duesPaid ? 'text-green-400' : 'text-jc-red'}`}>
                      {duesPaid ? 'Paid' : 'Unpaid'}
                    </p>
                    <p className="text-white/70 text-xs leading-relaxed">Annual dues keep your membership active.</p>
                  </div>
                  {duesPaid ? (
                    <div className="mt-5 w-full bg-green-500/20 border border-green-500/40 text-green-400 font-black text-xs tracking-widest uppercase py-3 text-center">
                      Dues Paid
                    </div>
                  ) : (
                    <button onClick={()=>setDuesModalOpen(true)} className="mt-5 w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase py-3 transition-colors">
                      Pay Dues Now
                    </button>
                  )}
                </div>

              </div>
            </div>
          )
        })()}

        {/* ── CALENDAR & EVENTS ────────────────────────────────────────────── */}
        {activeTab==='calendar' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-jc-black font-black text-2xl tracking-tight">
                  JC <span className="text-jc-red">Calendar</span>
                </h2>
                <p className="text-jc-gray-dark text-sm mt-1">All Junior Council events, meetings, and socials in one place.</p>
              </div>
              <a
                href="https://calendar.google.com/calendar/r?cid=juniorcouncil.org_tiul9akldge6a8vu014dhmlrt0%40group.calendar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-5 py-3 transition-colors self-start"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to My Google Calendar
              </a>
            </div>

            {/* Google Calendar Embed */}
            <div className="bg-white border border-jc-gray-mid overflow-hidden">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=juniorcouncil.org_tiul9akldge6a8vu014dhmlrt0%40group.calendar.google.com&ctz=America%2FChicago&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&mode=MONTH&color=%23C1121F"
                style={{ border: 0 }}
                width="100%"
                height="650"
                frameBorder="0"
                scrolling="no"
                title="Junior Council Calendar"
              />
            </div>

            <p className="text-jc-gray-dark text-xs text-center">
              Events are managed by the JC board. Questions? Contact{' '}
              <a href="mailto:secretary@juniorcouncil.org" className="text-jc-red font-bold hover:underline">
                secretary@juniorcouncil.org
              </a>
            </p>
          </div>
        )}

        {/* ── IMPACT TRACKER ────────────────────────────────────────────────── */}
        {activeTab==='impact' && (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left — goals checklist */}
            <div className="lg:col-span-2 space-y-6">

              {/* Overall JC progress */}
              <div className="bg-white border border-jc-gray-mid p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true"/>
                  <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Organization</span>
                </div>
                <h2 className="text-jc-black font-black text-xl mb-5">2026 Fundraising Goal</h2>
                {(()=>{
                  const raised=242000; const goal=250000
                  const pct=Math.min(Math.round((raised/goal)*100),100)
                  const fmt=(n:number)=>'$'+n.toLocaleString()
                  return (
                    <>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-jc-black font-black text-3xl">{fmt(raised)}</span>
                        <span className="text-jc-gray-dark text-sm">of {fmt(goal)} · {pct}%</span>
                      </div>
                      <div className="w-full bg-jc-gray h-4 overflow-hidden mb-2">
                        <div className="h-full bg-jc-red transition-all" style={{width:`${pct}%`}} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}/>
                      </div>
                      <p className="text-jc-gray-dark text-xs">We are <strong className="text-jc-black">${(goal-raised).toLocaleString()}</strong> away from our goal. Every contribution counts!</p>
                    </>
                  )
                })()}
              </div>

              {/* Member checklist */}
              <div className="bg-white border border-jc-gray-mid">
                <div className="px-6 py-4 border-b border-jc-gray-mid flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-6 h-0.5 bg-jc-red" aria-hidden="true"/>
                      <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Personal</span>
                    </div>
                    <h2 className="text-jc-black font-black text-xl">My Member Goals</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-jc-black font-black text-2xl">{completedCount}<span className="text-jc-gray-dark font-normal text-base">/{TOTAL_GOALS}</span></div>
                    <div className="text-jc-gray-dark text-xs">completed</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-6 pt-4">
                  <div className="w-full bg-jc-gray h-2 overflow-hidden">
                    <div className="h-full bg-jc-red transition-all duration-500" style={{width:`${(completedCount/TOTAL_GOALS)*100}%`}}/>
                  </div>
                </div>

                <div className="divide-y divide-jc-gray-mid px-6">

                  {/* Goal 1 — OneCause */}
                  <div className="py-4 flex items-center gap-4">
                    <button onClick={()=>toggleGoal('oncause')}
                      className={`w-6 h-6 flex-shrink-0 border-2 flex items-center justify-center transition-all ${checked['oncause']?'bg-jc-red border-jc-red':'border-jc-gray-mid hover:border-jc-red'}`}
                      aria-label={checked['oncause']?'Mark incomplete':'Mark complete'}>
                      {checked['oncause']&&<svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                    </button>
                    <div className="flex-grow">
                      <span className={`text-sm font-bold transition-colors ${checked['oncause']?'text-jc-gray-dark line-through':'text-jc-black'}`}>
                        1. Raised $100+ on OneCause
                      </span>
                    </div>
                    <a href="https://www.onecause.com/juniorcouncil" target="_blank" rel="noopener noreferrer"
                      className="flex-shrink-0 text-jc-red text-xs font-bold hover:underline">View My Page →</a>
                  </div>

                  {/* Goal 2 — Donation group (any one type counts) */}
                  <div className="py-4">
                    <div className="flex items-start gap-4 mb-3">
                      {/* Auto-indicator — filled when any sub-goal is checked */}
                      <div className={`w-6 h-6 flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all ${isDonationComplete?'bg-jc-red border-jc-red':'border-jc-gray-mid'}`}>
                        {isDonationComplete&&<svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <div>
                        <span className={`text-sm font-bold transition-colors ${isDonationComplete?'text-jc-gray-dark line-through':'text-jc-black'}`}>
                          2. Secured at least one donation
                        </span>
                        <p className="text-jc-gray-dark text-xs mt-0.5">Check all that apply — any one type completes this goal</p>
                      </div>
                    </div>
                    {/* Sub-checkboxes */}
                    <div className="ml-10 grid grid-cols-2 gap-2">
                      {donationSubGoals.map(opt=>(
                        <button key={opt.id} onClick={()=>toggleGoal(opt.id)}
                          className={`flex items-center gap-2 text-xs font-bold px-3 py-2 border-2 transition-all text-left ${
                            checked[opt.id]?'border-jc-red bg-jc-red/5 text-jc-red':'border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-black'
                          }`}>
                          <div className={`w-4 h-4 flex-shrink-0 border-2 flex items-center justify-center transition-all ${checked[opt.id]?'border-jc-red bg-jc-red':'border-current'}`}>
                            {checked[opt.id]&&<svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                          </div>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal 3 — Attended 3+ events */}
                  <div className="py-4 flex items-center gap-4">
                    <button onClick={()=>toggleGoal('attended3')}
                      className={`w-6 h-6 flex-shrink-0 border-2 flex items-center justify-center transition-all ${checked['attended3']?'bg-jc-red border-jc-red':'border-jc-gray-mid hover:border-jc-red'}`}
                      aria-label={checked['attended3']?'Mark incomplete':'Mark complete'}>
                      {checked['attended3']&&<svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                    </button>
                    <span className={`text-sm font-bold transition-colors flex-grow ${checked['attended3']?'text-jc-gray-dark line-through':'text-jc-black'}`}>
                      3. Attended 3+ events this season
                    </span>
                  </div>

                </div>

                <div className="px-6 py-4 border-t border-jc-gray-mid bg-jc-gray/30">
                  <p className="text-jc-gray-dark text-xs">Click any goal to mark it complete. Progress is saved for your session.</p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">

              {/* Donor submission form */}
              <div className="bg-white border border-jc-gray-mid">
                <div className="px-5 py-4 border-b border-jc-gray-mid">
                  <div className="flex items-center gap-3 mb-0.5">
                    <div className="w-5 h-0.5 bg-jc-red" aria-hidden="true"/>
                    <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Log a Win</span>
                  </div>
                  <h3 className="text-jc-black font-black text-base">Submit a Secured Donor</h3>
                </div>

                {donorSubmitted ? (
                  <div className="p-5 text-center">
                    <div className="w-12 h-12 bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <p className="text-jc-black font-black text-sm mb-1">Submitted!</p>
                    <p className="text-jc-gray-dark text-xs leading-relaxed">
                      {donorForm.type && DONATION_ROUTES[donorForm.type]
                        ? <><strong>{DONATION_ROUTES[donorForm.type]}</strong> has been notified and will follow up.</>
                        : 'The appropriate chair has been notified.'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="p-5 space-y-3">
                    {/* Donation type */}
                    <div>
                      <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Type <span className="text-jc-red">*</span></label>
                      <select value={donorForm.type} onChange={e=>setDonorForm(p=>({...p,type:e.target.value}))}
                        className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none bg-white">
                        <option value="">Select type…</option>
                        <option value="corporate">Corporate Sponsor</option>
                        <option value="auction">Silent Auction Item</option>
                        <option value="hospitality">Hospitality Partner</option>
                        <option value="inkind">In-Kind Donation</option>
                      </select>
                      {donorForm.type && (
                        <p className="text-jc-gray-dark text-xs mt-1">
                          Will be sent to <span className="font-bold text-jc-black">{DONATION_ROUTES[donorForm.type]}</span>
                        </p>
                      )}
                    </div>

                    {/* Donor name */}
                    <div>
                      <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Donor / Company Name <span className="text-jc-red">*</span></label>
                      <input value={donorForm.donorName} onChange={e=>setDonorForm(p=>({...p,donorName:e.target.value}))}
                        placeholder="e.g. Acme Corp" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                    </div>

                    {/* Contact name */}
                    <div>
                      <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Contact Name</label>
                      <input value={donorForm.contactName} onChange={e=>setDonorForm(p=>({...p,contactName:e.target.value}))}
                        placeholder="e.g. Jane Smith" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                    </div>

                    {/* Contact email */}
                    <div>
                      <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Contact Email</label>
                      <input type="email" value={donorForm.contactEmail} onChange={e=>setDonorForm(p=>({...p,contactEmail:e.target.value}))}
                        placeholder="jane@company.com" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Notes</label>
                      <textarea value={donorForm.notes} onChange={e=>setDonorForm(p=>({...p,notes:e.target.value}))}
                        placeholder="What did they commit to? Any next steps?" rows={3}
                        className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none resize-none"/>
                    </div>

                    <button onClick={handleDonorSubmit}
                      disabled={!donorForm.type || !donorForm.donorName.trim()}
                      className="w-full bg-jc-red hover:bg-jc-red-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-xs tracking-widest uppercase py-3 transition-colors">
                      Submit to Chair
                    </button>
                  </div>
                )}
              </div>

              {/* OneCause quick link */}
              <div className="bg-white border border-jc-gray-mid p-5">
                <h3 className="text-jc-black font-black text-sm mb-3">My OneCause Page</h3>
                <p className="text-jc-gray-dark text-xs mb-4 leading-relaxed">
                  Share your personal fundraising page to help reach the $100 individual goal.
                </p>
                <a href="https://www.onecause.com/juniorcouncil" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase py-3 text-center transition-colors">
                  View My Page
                </a>
              </div>

              {/* Tips */}
              <div className="bg-jc-black p-5">
                <h3 className="text-white font-black text-sm mb-3">Tips for Success</h3>
                <div className="space-y-3">
                  {[
                    'Share your OneCause link on LinkedIn and Instagram',
                    'Reach out to 3 potential sponsors this month',
                    'Bring a guest to the next happy hour',
                    'Ask a local restaurant about hospitality sponsorship',
                  ].map((tip,i)=>(
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-jc-red flex-shrink-0 mt-1.5"/>
                      <p className="text-white/60 text-xs leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RESOURCES ─────────────────────────────────────────────────────── */}
        {activeTab==='resources' && (
          <div className="space-y-8">

            {/* Admin/Treasurer Dues Panel */}
            {(isAdmin || isTreasurer) && (
              <div className="bg-white border border-jc-gray-mid">
                <div className="px-6 py-4 border-b border-jc-gray-mid flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-6 h-0.5 bg-jc-red" aria-hidden="true"/>
                      <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Admin</span>
                    </div>
                    <h3 className="text-jc-black font-black text-xl">Dues Tracker</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-jc-red font-black text-2xl">{allMembers.filter(m=>m.dues_paid).length}/{allMembers.length}</div>
                    <div className="text-jc-gray-dark text-xs uppercase tracking-widest">Paid</div>
                  </div>
                </div>
                <div className="divide-y divide-jc-gray-mid">
                  {allMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="text-jc-black font-bold text-sm">{member.full_name || member.email}</div>
                        <div className="text-jc-gray-dark text-xs">{member.email}</div>
                      </div>
                      <button
                        onClick={() => toggleDues(member.id, member.dues_paid)}
                        disabled={duesToggling === member.id}
                        className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors disabled:opacity-50 ${
                          member.dues_paid
                            ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600'
                            : 'bg-jc-gray text-jc-gray-dark hover:bg-jc-red hover:text-white'
                        }`}
                      >
                        {duesToggling === member.id ? '...' : member.dues_paid ? 'Paid' : 'Mark Paid'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true"/>
                <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Member Resources</span>
              </div>
              <h2 className="text-jc-black font-black text-3xl tracking-tight">Documents &amp; Links</h2>
              <p className="text-jc-gray-dark mt-2">Everything you need to represent and grow Junior Council.</p>
            </div>

            {/* Resource cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resources.map(res=>(
                <a key={res.title} href={res.link} target="_blank" rel="noopener noreferrer"
                  className="bg-white border border-jc-gray-mid hover:border-jc-red transition-colors p-6 group flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-jc-red/10 flex items-center justify-center group-hover:bg-jc-red/20 transition-colors">
                      <svg className="w-5 h-5 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={res.icon}/>
                      </svg>
                    </div>
                    <span className="text-jc-gray-dark text-xs font-bold uppercase tracking-widest bg-jc-gray px-2 py-1">{res.tag}</span>
                  </div>
                  <h3 className="text-jc-black font-black text-base mb-2 group-hover:text-jc-red transition-colors">{res.title}</h3>
                  <p className="text-jc-gray-dark text-sm leading-relaxed flex-grow">{res.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-jc-red text-xs font-bold">
                    Open
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Outreach tracker — coming soon */}
            <div className="bg-white border border-jc-gray-mid p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-6 h-0.5 bg-jc-red" aria-hidden="true"/>
                    <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Coming Soon</span>
                  </div>
                  <h3 className="text-jc-black font-black text-xl">Outreach Tracker</h3>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest bg-jc-gray text-jc-gray-dark px-3 py-1.5">In Development</span>
              </div>
              <p className="text-jc-gray-dark leading-relaxed mb-4">
                Track your corporate, hospitality, and silent auction outreaches — see what&apos;s in progress, what&apos;s been secured, and what still needs follow-up.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {['Corporate Outreach','Hospitality Outreach','Silent Auction Outreach'].map(item=>(
                  <div key={item} className="bg-jc-gray border border-jc-gray-mid p-4 text-center opacity-60">
                    <div className="text-jc-black font-bold text-sm">{item}</div>
                    <div className="text-jc-gray-dark text-xs mt-1">Tracker coming soon</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── COMMUNITY FEED ────────────────────────────────────────────────── */}
        {activeTab==='profile' && (
          <div className="max-w-4xl mx-auto">

            {/* Header bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true"/>
                  <span className="text-jc-red text-xs font-bold tracking-widest uppercase">Member Portal</span>
                </div>
                <h1 className="text-jc-black font-black text-3xl tracking-tight">My Profile</h1>
              </div>
              {!editingProfile && (
                <button onClick={()=>setEditingProfile(true)}
                  className="flex items-center gap-2 bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                  Edit Profile
                </button>
              )}
              {editingProfile && (
                <div className="flex items-center gap-3">
                  <button onClick={cancelEdit} className="border-2 border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red font-black text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
                    Cancel
                  </button>
                  <button onClick={saveProfile} className="bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Profile completeness bar */}
            {!editingProfile && (
              <div className="bg-white border border-jc-gray-mid px-6 py-4 mb-6 flex items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-jc-black text-xs font-bold uppercase tracking-widest">Profile Completeness</span>
                    <span className={`text-xs font-black ${profileComplete===100?'text-green-600':profileComplete>=60?'text-jc-red':'text-jc-gray-dark'}`}>{profileComplete}%</span>
                  </div>
                  <div className="w-full bg-jc-gray h-2">
                    <div className={`h-full transition-all duration-500 ${profileComplete===100?'bg-green-500':'bg-jc-red'}`} style={{width:`${profileComplete}%`}}/>
                  </div>
                </div>
                {profileComplete<100&&(
                  <button onClick={()=>setEditingProfile(true)} className="flex-shrink-0 text-jc-red text-xs font-bold hover:underline">Complete profile →</button>
                )}
                {profileComplete===100&&<span className="flex-shrink-0 text-green-600 text-xs font-black">Complete!</span>}
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">

              {/* Left — avatar + identity */}
              <div className="space-y-5">

                {/* Avatar card */}
                <div className="bg-white border border-jc-gray-mid p-6 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    {(editingProfile ? profileDraft.avatar : profile.avatar) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={(editingProfile ? profileDraft.avatar : profile.avatar)!} alt="Profile" className="w-28 h-28 object-cover border-4 border-jc-red"/>
                    ) : (
                      <div className="w-28 h-28 bg-jc-black border-4 border-jc-red flex items-center justify-center">
                        <span className="text-white font-black text-3xl">{editingProfile ? draftInitials : profileInitials}</span>
                      </div>
                    )}
                    {editingProfile && (
                      <button onClick={()=>avatarInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-jc-red hover:bg-jc-red-dark flex items-center justify-center transition-colors" aria-label="Upload photo">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </button>
                    )}
                    <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarSelect}/>
                  </div>

                  {/* Name */}
                  {editingProfile ? (
                    <input value={profileDraft.name} onChange={e=>setProfileDraft(p=>({...p,name:e.target.value}))}
                      className="w-full text-center border border-jc-gray-mid focus:border-jc-red px-3 py-2 font-black text-jc-black outline-none mb-2"/>
                  ) : (
                    <h2 className="font-black text-jc-black text-xl mb-1">{profile.name}</h2>
                  )}

                  {/* Pronouns */}
                  {editingProfile ? (
                    <select value={profileDraft.pronouns} onChange={e=>setProfileDraft(p=>({...p,pronouns:e.target.value}))}
                      className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-gray-dark outline-none mb-2 bg-white">
                      <option value="">Pronouns (optional)</option>
                      {PRONOUNS_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : profile.pronouns ? (
                    <p className="text-jc-gray-dark text-sm mb-2">{profile.pronouns}</p>
                  ) : null}

                  {/* Member badge */}
                  <div className="mt-2 px-3 py-1 bg-jc-red/10 border border-jc-red/20">
                    <span className="text-jc-red text-xs font-bold uppercase tracking-widest">JC Member 2026</span>
                  </div>

                  {/* LinkedIn */}
                  {editingProfile ? (
                    <input value={profileDraft.linkedin} onChange={e=>setProfileDraft(p=>({...p,linkedin:e.target.value}))}
                      placeholder="LinkedIn URL" className="w-full mt-3 border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                  ) : profile.linkedin ? (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1.5 text-jc-red text-xs font-bold hover:underline">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn Profile
                    </a>
                  ) : null}

                  {/* Instagram */}
                  {editingProfile ? (
                    <input value={profileDraft.instagram} onChange={e=>setProfileDraft(p=>({...p,instagram:e.target.value}))}
                      placeholder="Instagram URL" className="w-full mt-2 border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                  ) : profile.instagram ? (
                    <a href={profile.instagram} target="_blank" rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-1.5 text-jc-red text-xs font-bold hover:underline">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>
                  ) : null}
                </div>

                {/* Neighborhood */}
                <div className="bg-white border border-jc-gray-mid p-5">
                  <h3 className="text-jc-black font-black text-xs uppercase tracking-widest mb-3">Based In</h3>
                  {editingProfile ? (
                    <input value={profileDraft.neighborhood} onChange={e=>setProfileDraft(p=>({...p,neighborhood:e.target.value}))}
                      placeholder="e.g. Lincoln Park, Chicago" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                  ) : profile.neighborhood ? (
                    <div className="flex items-center gap-2 text-jc-gray-dark text-sm">
                      <svg className="w-4 h-4 text-jc-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {profile.neighborhood}
                    </div>
                  ) : (
                    <p className="text-jc-gray-mid text-sm italic">Not set</p>
                  )}
                </div>
              </div>

              {/* Right — details */}
              <div className="lg:col-span-2 space-y-5">

                {/* Bio */}
                <div className="bg-white border border-jc-gray-mid p-6">
                  <h3 className="text-jc-black font-black text-xs uppercase tracking-widest mb-3">About Me</h3>
                  {editingProfile ? (
                    <div>
                      <textarea value={profileDraft.bio} onChange={e=>setProfileDraft(p=>({...p,bio:e.target.value.slice(0,280)}))}
                        placeholder="Write a short bio — who you are, what you do, what drives you..." rows={4}
                        className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none resize-none"/>
                      <p className="text-jc-gray-mid text-xs mt-1 text-right">{profileDraft.bio.length}/280</p>
                    </div>
                  ) : profile.bio ? (
                    <p className="text-jc-gray-dark text-sm leading-relaxed">{profile.bio}</p>
                  ) : (
                    <p className="text-jc-gray-mid text-sm italic">No bio yet — click Edit Profile to add one.</p>
                  )}
                </div>

                {/* Work */}
                <div className="bg-white border border-jc-gray-mid p-6">
                  <h3 className="text-jc-black font-black text-xs uppercase tracking-widest mb-4">Work</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {editingProfile ? (
                      <>
                        <div>
                          <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Job Title</label>
                          <input value={profileDraft.jobTitle} onChange={e=>setProfileDraft(p=>({...p,jobTitle:e.target.value}))}
                            placeholder="e.g. Marketing Manager" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                        </div>
                        <div>
                          <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Company</label>
                          <input value={profileDraft.company} onChange={e=>setProfileDraft(p=>({...p,company:e.target.value}))}
                            placeholder="e.g. Acme Corp" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                        </div>
                      </>
                    ) : (profile.jobTitle || profile.company) ? (
                      <div className="sm:col-span-2 flex items-start gap-3">
                        <div className="w-9 h-9 bg-jc-gray flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-jc-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <div>
                          {profile.jobTitle&&<p className="text-jc-black font-bold text-sm">{profile.jobTitle}</p>}
                          {profile.company&&<p className="text-jc-gray-dark text-sm">{profile.company}</p>}
                        </div>
                      </div>
                    ) : (
                      <p className="sm:col-span-2 text-jc-gray-mid text-sm italic">Not set</p>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white border border-jc-gray-mid p-6">
                  <h3 className="text-jc-black font-black text-xs uppercase tracking-widest mb-4">Education</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {editingProfile ? (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">College / University</label>
                          <input value={profileDraft.college} onChange={e=>setProfileDraft(p=>({...p,college:e.target.value}))}
                            placeholder="e.g. University of Illinois" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                        </div>
                        <div>
                          <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Grad Year</label>
                          <input value={profileDraft.gradYear} onChange={e=>setProfileDraft(p=>({...p,gradYear:e.target.value}))}
                            placeholder="e.g. 2019" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-jc-gray-dark text-xs font-bold uppercase tracking-wide mb-1">Degree &amp; Major</label>
                          <input value={profileDraft.degree} onChange={e=>setProfileDraft(p=>({...p,degree:e.target.value}))}
                            placeholder="e.g. B.S. Marketing" className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none"/>
                        </div>
                      </>
                    ) : (profile.college || profile.degree) ? (
                      <div className="sm:col-span-3 flex items-start gap-3">
                        <div className="w-9 h-9 bg-jc-gray flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-jc-gray-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                          </svg>
                        </div>
                        <div>
                          {profile.college&&<p className="text-jc-black font-bold text-sm">{profile.college}{profile.gradYear&&<span className="text-jc-gray-dark font-normal"> &apos;{profile.gradYear.slice(-2)}</span>}</p>}
                          {profile.degree&&<p className="text-jc-gray-dark text-sm">{profile.degree}</p>}
                        </div>
                      </div>
                    ) : (
                      <p className="sm:col-span-3 text-jc-gray-mid text-sm italic">Not set</p>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-white border border-jc-gray-mid p-6">
                  <h3 className="text-jc-black font-black text-xs uppercase tracking-widest mb-4">Interests</h3>
                  {editingProfile ? (
                    <>
                      <p className="text-jc-gray-dark text-xs mb-3">Select all that apply</p>
                      <div className="flex flex-wrap gap-2">
                        {INTEREST_TAGS.map(tag=>{
                          const sel = profileDraft.interests.includes(tag)
                          return (
                            <button key={tag} onClick={()=>setProfileDraft(p=>({
                              ...p, interests: sel ? p.interests.filter(i=>i!==tag) : [...p.interests,tag]
                            }))}
                              className={`px-3 py-1.5 text-xs font-bold border-2 transition-all ${sel?'bg-jc-red border-jc-red text-white':'border-jc-gray-mid text-jc-gray-dark hover:border-jc-red hover:text-jc-red'}`}>
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  ) : profile.interests.length ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map(tag=>(
                        <span key={tag} className="px-3 py-1.5 text-xs font-bold bg-jc-gray border border-jc-gray-mid text-jc-black">{tag}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-jc-gray-mid text-sm italic">No interests added yet</p>
                  )}
                </div>

                {/* Why I joined + Fun fact */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="bg-white border border-jc-gray-mid p-6">
                    <h3 className="text-jc-black font-black text-xs uppercase tracking-widest mb-3">Why I Joined JC</h3>
                    {editingProfile ? (
                      <textarea value={profileDraft.whyJoined} onChange={e=>setProfileDraft(p=>({...p,whyJoined:e.target.value.slice(0,200)}))}
                        placeholder="Share what drew you to Junior Council..." rows={3}
                        className="w-full border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none resize-none"/>
                    ) : profile.whyJoined ? (
                      <blockquote className="border-l-2 border-jc-red pl-3">
                        <p className="text-jc-gray-dark text-sm leading-relaxed italic">&ldquo;{profile.whyJoined}&rdquo;</p>
                      </blockquote>
                    ) : (
                      <p className="text-jc-gray-mid text-sm italic">Not set</p>
                    )}
                  </div>

                  <div className="bg-jc-black p-6">
                    <h3 className="text-white font-black text-xs uppercase tracking-widest mb-3">Fun Fact</h3>
                    {editingProfile ? (
                      <textarea value={profileDraft.funFact} onChange={e=>setProfileDraft(p=>({...p,funFact:e.target.value.slice(0,150)}))}
                        placeholder="Something surprising or fun about you..." rows={3}
                        className="w-full bg-white/10 border border-white/20 focus:border-jc-red px-3 py-2 text-sm text-white outline-none resize-none placeholder:text-white/40"/>
                    ) : profile.funFact ? (
                      <p className="text-white/80 text-sm leading-relaxed">{profile.funFact}</p>
                    ) : (
                      <p className="text-white/60 text-sm italic">Not set</p>
                    )}
                  </div>
                </div>

                {/* Save button (bottom shortcut in edit mode) */}
                {editingProfile && (
                  <div className="flex justify-end gap-3 pt-2">
                    <button onClick={cancelEdit} className="border-2 border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red font-black text-xs tracking-widest uppercase px-6 py-3 transition-colors">Cancel</button>
                    <button onClick={saveProfile} className="bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-6 py-3 transition-colors">Save Changes</button>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>

      {/* Dues modal */}
      {duesModalOpen&&(
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={()=>setDuesModalOpen(false)}>
          <div className="bg-white max-w-md w-full p-8" onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">Member Portal</p>
                <h2 className="text-jc-black font-black text-2xl tracking-tight">Pay Your Dues</h2>
              </div>
              <button onClick={()=>setDuesModalOpen(false)} className="text-jc-gray-mid hover:text-jc-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="bg-jc-gray p-4 mb-6 border-l-4 border-jc-red">
              <div className="flex items-center justify-between">
                <span className="text-jc-black font-bold text-sm">2026–2027 Annual Dues</span>
                <span className="text-jc-red font-black text-xl">$100</span>
              </div>
              <p className="text-jc-gray-dark text-xs mt-2">Please include your full name in the payment note.</p>
            </div>
            <div className="space-y-3 mb-2">
              <a
                href="https://venmo.com/u/juniorcouncil?txn=pay&amount=100&note=2026-2027+JC+Dues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-[#008CFF] hover:bg-[#0070CC] text-white font-black text-sm tracking-wide px-5 py-4 transition-colors"
              >
                <span>Pay with Venmo</span>
                <span className="text-white/80 text-xs font-bold">@juniorcouncil</span>
              </a>
              <div className="flex items-center justify-between w-full bg-jc-gray border border-jc-gray-mid px-5 py-4">
                <span className="text-jc-gray-dark font-black text-sm">Zelle</span>
                <span className="text-jc-gray-dark text-xs font-bold italic">Coming Soon</span>
              </div>
            </div>
            <button onClick={()=>setDuesModalOpen(false)} className="w-full mt-4 border-2 border-jc-gray-mid hover:border-jc-red text-jc-black hover:text-jc-red font-black text-xs tracking-widest uppercase py-3 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Admin — Invite member modal */}
      {inviteModalOpen && isAdmin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={resetInviteModal}>
          <div className="bg-jc-charcoal border border-white/10 max-w-md w-full p-8" onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">Admin</p>
                <h2 className="text-white font-black text-2xl tracking-tight">Invite New Member</h2>
              </div>
              <button onClick={resetInviteModal} className="text-white/40 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <p className="text-white/50 text-xs mb-5">They&rsquo;ll receive a branded invitation email and land directly on our sign-up page.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">First name</label>
                  <input
                    value={inviteForm.firstName}
                    onChange={e=>setInviteForm(p=>({...p,firstName:e.target.value}))}
                    placeholder="Jane"
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red px-3 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Last name</label>
                  <input
                    value={inviteForm.lastName}
                    onChange={e=>setInviteForm(p=>({...p,lastName:e.target.value}))}
                    placeholder="Doe"
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red px-3 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={e=>setInviteForm(p=>({...p,email:e.target.value}))}
                  placeholder="member@example.com"
                  className="w-full bg-jc-black border border-white/20 focus:border-jc-red px-3 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                />
              </div>

              {inviteStatus.type === 'ok' && (
                <div className="bg-green-900/30 border border-green-500/40 px-4 py-3">
                  <p className="text-green-400 text-xs font-bold">{inviteStatus.msg}</p>
                </div>
              )}
              {inviteStatus.type === 'error' && (
                <div className="bg-red-900/30 border border-red-500/40 px-4 py-3">
                  <p className="text-red-400 text-xs font-bold">{inviteStatus.msg}</p>
                </div>
              )}

              <button
                onClick={sendInvite}
                disabled={inviteStatus.type === 'sending' || !inviteForm.email.trim()}
                className="w-full bg-jc-red hover:bg-jc-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm tracking-widest uppercase py-3 transition-colors"
              >
                {inviteStatus.type === 'sending' ? 'Sending…' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
