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
type Tab = 'dashboard' | 'calendar' | 'impact' | 'resources' | 'feed' | 'profile'

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

type CalEvent = { id: number; title: string; dateKey: string; date: string; time: string; location: string; type: string }

const allEvents: CalEvent[] = [
  { id:1,  title:'Monthly Member Meeting',      dateKey:'2026-01-14', date:'January 14, 2026',   time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:2,  title:'Snowball Kick-Off Party',      dateKey:'2026-01-17', date:'January 17, 2026',   time:'7:00 PM – 10:00 PM', location:'TBD, Chicago',                 type:'Event'      },
  { id:3,  title:'Monthly Member Meeting',       dateKey:'2026-02-11', date:'February 11, 2026',  time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:4,  title:'Monthly Member Meeting',       dateKey:'2026-03-11', date:'March 11, 2026',     time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:5,  title:'Derby Party',                  dateKey:'2026-04-25', date:'April 25, 2026',     time:'4:00 PM – 8:00 PM',  location:'TBD, Chicago',                 type:'Fundraiser' },
  { id:6,  title:'Monthly Member Meeting',       dateKey:'2026-04-08', date:'April 8, 2026',      time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:7,  title:'Monthly Member Meeting',       dateKey:'2026-05-13', date:'May 13, 2026',       time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:8,  title:'Monthly Member Meeting',       dateKey:'2026-06-10', date:'June 10, 2026',      time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:9,  title:'Happy Hour',                   dateKey:'2026-06-18', date:'June 18, 2026',      time:'6:00 PM – 9:00 PM',  location:'TBD, Chicago',                 type:'Social'     },
  { id:10, title:'Cruising for a Cause',         dateKey:'2026-07-12', date:'July 12, 2026',      time:'5:00 PM – 9:00 PM',  location:'Navy Pier, Chicago',           type:'Fundraiser' },
  { id:11, title:'Happy Hour — Summer Edition',  dateKey:'2026-08-06', date:'August 6, 2026',     time:'6:00 PM – 9:00 PM',  location:'Venteux, Chicago',             type:'Social'     },
  { id:12, title:'Monthly Member Meeting',       dateKey:'2026-09-09', date:'September 9, 2026',  time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:13, title:'Annual Golf Outing',           dateKey:'2026-09-19', date:'September 19, 2026', time:'8:00 AM – 4:00 PM',  location:'Cog Hill Golf & Country Club', type:'Fundraiser' },
  { id:14, title:'Monthly Member Meeting',       dateKey:'2026-10-14', date:'October 14, 2026',   time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:15, title:'Monthly Member Meeting',       dateKey:'2026-11-04', date:'November 4, 2026',   time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
  { id:16, title:'Holiday Happy Hour',           dateKey:'2026-12-10', date:'December 10, 2026',  time:'6:00 PM – 9:00 PM',  location:'TBD, Chicago',                 type:'Social'     },
  { id:17, title:'Monthly Member Meeting',       dateKey:'2026-12-09', date:'December 9, 2026',   time:'6:30 PM – 8:00 PM',  location:'The Drake Hotel, Chicago',     type:'Meeting'    },
]

const upcomingEvents = [...allEvents].sort((a, b) => a.dateKey.localeCompare(b.dateKey))

const eventTypeColors: Record<string,string> = {
  Meeting:'bg-blue-100 text-blue-700', Event:'bg-purple-100 text-purple-700',
  Fundraiser:'bg-green-100 text-green-700', Social:'bg-yellow-100 text-yellow-700',
}
const eventTypeDots: Record<string,string> = {
  Meeting:'bg-blue-500', Event:'bg-purple-500', Fundraiser:'bg-green-500', Social:'bg-yellow-500',
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
  const [rsvps, setRsvps]         = useState<Record<number,'yes'|'no'>>({})
  const [duesModalOpen, setDuesModalOpen] = useState(false)
  const [navMenuOpen, setNavMenuOpen] = useState(false)

  // Admin invite modal
  const ADMIN_EMAILS = ['dianawolfchicago@gmail.com']
  const userEmail = user?.email?.toLowerCase() || ''
  const isAdmin = ADMIN_EMAILS.includes(userEmail)
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
  const eventsOnDay = (day:number) => { const k=`${calYear}-${pad(calMonth+1)}-${pad(day)}`; return allEvents.filter(e=>e.dateKey===k) }
  const selectedEvents = selectedDay ? allEvents.filter(e=>e.dateKey===selectedDay) : []

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
    { key:'feed'      as Tab, label:'Community',      icon:'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
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
              <button
                onClick={() => { setActiveTab('profile'); setNavMenuOpen(false) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-wide transition-colors border-b border-white/5"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Account & Password
              </button>
              {isAdmin && (
                <button
                  onClick={() => { setInviteModalOpen(true); setNavMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-jc-red hover:text-white hover:bg-jc-red/20 text-xs font-bold uppercase tracking-wide transition-colors border-b border-white/5"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                  Invite Member
                </button>
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
                      <div className="flex items-center gap-3 mt-5">
                        {rsvps[nextEvent.id] ? (
                          <>
                            <span className={`text-xs font-bold px-4 py-2.5 ${rsvps[nextEvent.id]==='yes'?'bg-green-100 text-green-700':'bg-jc-gray text-jc-gray-dark'}`}>
                              {rsvps[nextEvent.id]==='yes'?'You\'re Attending':'Not Attending'}
                            </span>
                            <button onClick={()=>setRsvps(p=>{const n={...p};delete n[nextEvent.id];return n})} className="text-jc-gray-dark text-xs hover:text-jc-red transition-colors">Change</button>
                          </>
                        ) : (
                          <>
                            <button onClick={()=>setRsvps(p=>({...p,[nextEvent.id]:'yes'}))} className="bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs uppercase tracking-widest px-6 py-3 transition-colors">RSVP Yes</button>
                            <button onClick={()=>setRsvps(p=>({...p,[nextEvent.id]:'no'}))} className="border-2 border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red font-bold text-xs uppercase px-4 py-3 transition-colors">Can&apos;t Go</button>
                          </>
                        )}
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
                    <p className="text-jc-red font-black text-3xl leading-none mb-2">Unpaid</p>
                    <p className="text-white/70 text-xs leading-relaxed">Annual dues keep your membership active.</p>
                  </div>
                  <button onClick={()=>setDuesModalOpen(true)} className="mt-5 w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase py-3 transition-colors">
                    Pay Dues Now
                  </button>
                </div>

              </div>
            </div>
          )
        })()}

        {/* ── CALENDAR & EVENTS ────────────────────────────────────────────── */}
        {activeTab==='calendar' && (
          <>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-jc-gray-mid">
              <div className="flex items-center justify-between px-6 py-4 border-b border-jc-gray-mid">
                <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-jc-gray transition-colors" aria-label="Previous month">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-jc-black font-black text-lg">{MONTHS[calMonth]} <span className="text-jc-red">{calYear}</span></h2>
                <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-jc-gray transition-colors" aria-label="Next month">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-7 border-b border-jc-gray-mid">
                {DAYS.map(d=><div key={d} className="py-2 text-center text-xs font-bold uppercase tracking-widest text-jc-gray-dark">{d}</div>)}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({length:firstDayOfWeek}).map((_,i)=><div key={`e${i}`} className="border-r border-b border-jc-gray-mid min-h-[80px] bg-jc-gray/30"/>)}
                {Array.from({length:daysInMonth}).map((_,i)=>{
                  const day=i+1
                  const key=`${calYear}-${pad(calMonth+1)}-${pad(day)}`
                  const dayEvents=eventsOnDay(day)
                  const isToday=today.getFullYear()===calYear&&today.getMonth()===calMonth&&today.getDate()===day
                  const isSelected=selectedDay===key
                  const col=(firstDayOfWeek+i)%7
                  return (
                    <div key={day} onClick={()=>setSelectedDay(isSelected?null:key)}
                      className={`border-b border-jc-gray-mid min-h-[80px] p-2 cursor-pointer transition-colors ${col<6?'border-r':''} ${isSelected?'bg-jc-red/5':' hover:bg-jc-gray/40'}`}>
                      <div className={`w-7 h-7 flex items-center justify-center text-sm font-bold mb-1 ${isToday?'bg-jc-red text-white':isSelected?'text-jc-red':'text-jc-black'}`}>{day}</div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0,2).map(ev=>(
                          <div key={ev.id} className="flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${eventTypeDots[ev.type]}`}/>
                            <span className="text-jc-black text-xs truncate hidden sm:block">{ev.title}</span>
                          </div>
                        ))}
                        {dayEvents.length>2&&<div className="text-jc-gray-dark text-xs">+{dayEvents.length-2} more</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-white border border-jc-gray-mid p-5">
                <h3 className="text-jc-black font-black text-sm mb-3 uppercase tracking-widest">Legend</h3>
                <div className="space-y-2">
                  {Object.entries(eventTypeDots).map(([type,dot])=>(
                    <div key={type} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${dot}`}/><span className="text-jc-gray-dark text-sm">{type}</span></div>
                  ))}
                </div>
              </div>
              {selectedDay&&(
                <div className="bg-white border border-jc-red">
                  <div className="px-5 py-3 border-b border-jc-red bg-jc-red/5">
                    <p className="text-jc-red text-xs font-bold uppercase tracking-widest">
                      {new Date(selectedDay+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
                    </p>
                  </div>
                  {selectedEvents.length===0
                    ? <div className="px-5 py-6 text-center"><p className="text-jc-gray-dark text-sm">No events on this day.</p></div>
                    : <div className="divide-y divide-jc-gray-mid">
                        {selectedEvents.map(ev=>(
                          <div key={ev.id} className="px-5 py-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold px-2 py-0.5 ${eventTypeColors[ev.type]}`}>{ev.type}</span>
                            </div>
                            <h4 className="text-jc-black font-black text-sm mb-1">{ev.title}</h4>
                            <p className="text-jc-gray-dark text-xs">{ev.time}</p>
                            <p className="text-jc-gray-dark text-xs">{ev.location}</p>
                            <div className="flex gap-2 mt-3">
                              {rsvps[ev.id]?(
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-bold px-2 py-1 ${rsvps[ev.id]==='yes'?'bg-green-100 text-green-700':'bg-jc-gray text-jc-gray-dark'}`}>
                                    {rsvps[ev.id]==='yes'?'Attending':'Not Attending'}
                                  </span>
                                  <button onClick={()=>setRsvps(p=>{const n={...p};delete n[ev.id];return n})} className="text-jc-gray-dark text-xs hover:text-jc-red">Change</button>
                                </div>
                              ):(
                                <>
                                  <button onClick={()=>setRsvps(p=>({...p,[ev.id]:'yes'}))} className="bg-jc-red hover:bg-jc-red-dark text-white text-xs font-bold uppercase px-3 py-1 transition-colors">RSVP Yes</button>
                                  <button onClick={()=>setRsvps(p=>({...p,[ev.id]:'no'}))}  className="border border-jc-gray-mid hover:border-jc-red text-jc-gray-dark text-xs font-bold uppercase px-3 py-1 transition-colors">Can&apos;t Go</button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                  }
                </div>
              )}
              <div className="bg-white border border-jc-gray-mid">
                <div className="px-5 py-3 border-b border-jc-gray-mid"><h3 className="text-jc-black font-black text-sm">Events This Month</h3></div>
                {allEvents.filter(e=>e.dateKey.startsWith(`${calYear}-${pad(calMonth+1)}`)).length===0
                  ? <div className="px-5 py-6 text-center"><p className="text-jc-gray-dark text-sm">No events this month.</p></div>
                  : <div className="divide-y divide-jc-gray-mid">
                      {allEvents.filter(e=>e.dateKey.startsWith(`${calYear}-${pad(calMonth+1)}`))
                        .sort((a,b)=>a.dateKey.localeCompare(b.dateKey))
                        .map(ev=>(
                          <button key={ev.id} onClick={()=>setSelectedDay(ev.dateKey)} className="w-full text-left px-5 py-3 hover:bg-jc-gray transition-colors group">
                            <div className="flex items-center gap-2 mb-0.5">
                              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${eventTypeDots[ev.type]}`}/>
                              <span className="text-jc-black text-sm font-bold group-hover:text-jc-red transition-colors truncate">{ev.title}</span>
                            </div>
                            <p className="text-jc-gray-dark text-xs pl-4">{ev.date} · {ev.time}</p>
                          </button>
                        ))}
                    </div>
                }
              </div>
            </div>
          </div>

          {/* ── Full year schedule ── */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true"/>
              <span className="text-jc-red text-xs font-bold tracking-widest uppercase">2026 Season</span>
            </div>
            <h2 className="text-jc-black font-black text-3xl tracking-tight mb-8">Full Year Events</h2>

            {(()=>{
              // Group events by month
              const groups: Record<string, CalEvent[]> = {}
              upcomingEvents.forEach(ev => {
                const monthKey = ev.dateKey.slice(0,7)
                if (!groups[monthKey]) groups[monthKey] = []
                groups[monthKey].push(ev)
              })
              return Object.entries(groups).map(([key, evs]) => {
                const monthName = MONTHS[parseInt(key.slice(5,7))-1]
                return (
                  <div key={key} className="mb-10">
                    {/* Month header */}
                    <div className="flex items-center gap-4 mb-5">
                      <h3 className="text-jc-black font-black text-xl flex-shrink-0">{monthName}</h3>
                      <div className="flex-grow h-px bg-jc-gray-mid"/>
                      <span className="text-jc-gray-dark text-xs flex-shrink-0">{evs.length} event{evs.length!==1?'s':''}</span>
                    </div>

                    <div className="space-y-3">
                      {evs.map(ev => (
                        <div key={ev.id} className="bg-white border border-jc-gray-mid flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 hover:border-jc-red/40 transition-colors">
                          {/* Date block */}
                          <div className="flex-shrink-0 w-14 text-center hidden sm:block">
                            <div className="text-jc-red font-black text-xl leading-none">{parseInt(ev.dateKey.slice(8,10))}</div>
                            <div className="text-jc-gray-dark text-xs uppercase tracking-wide">{ev.date.split(' ')[0].slice(0,3)}</div>
                          </div>
                          <div className="w-px h-10 bg-jc-gray-mid flex-shrink-0 hidden sm:block"/>

                          {/* Info */}
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-xs font-bold px-2 py-0.5 flex-shrink-0 ${eventTypeColors[ev.type]}`}>{ev.type}</span>
                              <h4 className="text-jc-black font-black text-sm">{ev.title}</h4>
                            </div>
                            <p className="text-jc-gray-dark text-xs">
                              <span className="sm:hidden">{ev.date} · </span>{ev.time} · {ev.location}
                            </p>
                          </div>

                          {/* RSVP */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {rsvps[ev.id] ? (
                              <>
                                <span className={`text-xs font-bold px-3 py-1.5 ${rsvps[ev.id]==='yes'?'bg-green-100 text-green-700':'bg-jc-gray text-jc-gray-dark'}`}>
                                  {rsvps[ev.id]==='yes'?'Attending':'Not Attending'}
                                </span>
                                <button onClick={()=>setRsvps(p=>{const n={...p};delete n[ev.id];return n})} className="text-jc-gray-dark text-xs hover:text-jc-red transition-colors">Change</button>
                              </>
                            ) : (
                              <>
                                <button onClick={()=>setRsvps(p=>({...p,[ev.id]:'yes'}))} className="bg-jc-red hover:bg-jc-red-dark text-white text-xs font-bold uppercase px-3 py-1.5 transition-colors">RSVP Yes</button>
                                <button onClick={()=>setRsvps(p=>({...p,[ev.id]:'no'}))} className="border border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red text-xs font-bold uppercase px-3 py-1.5 transition-colors">Can&apos;t Go</button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            })()}
          </div>
          </>
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
        {activeTab==='feed' && (
          <div className="max-w-2xl mx-auto">

            {/* Composer */}
            <div className="bg-white border border-jc-gray-mid mb-6">
              <div className="px-5 py-4 border-b border-jc-gray-mid">
                <h2 className="text-jc-black font-black text-base">Create a Post</h2>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 bg-jc-red flex items-center justify-center flex-shrink-0 text-white text-xs font-black">ME</div>
                  <textarea value={postText} onChange={e=>setPostText(e.target.value)}
                    placeholder={showPoll?"Ask your question...":"Share an update with the JC community..."}
                    rows={3} className="flex-grow border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none resize-none transition-colors placeholder:text-jc-gray-mid"/>
                </div>

                {/* Image preview */}
                {postImage&&(
                  <div className="relative mb-4 ml-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={postImage} alt="Preview" className="max-h-48 object-cover w-full"/>
                    <button onClick={()=>{setPostImage(null);if(fileInputRef.current)fileInputRef.current.value=''}}
                      className="absolute top-2 right-2 bg-jc-black/70 text-white w-6 h-6 flex items-center justify-center hover:bg-jc-black" aria-label="Remove image">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Poll options */}
                {showPoll&&(
                  <div className="mb-4 ml-12 space-y-2">
                    {pollOptions.map((opt,i)=>(
                      <div key={i} className="flex items-center gap-2">
                        <input type="text" value={opt} onChange={e=>setPollOptions(p=>{const n=[...p];n[i]=e.target.value;return n})}
                          placeholder={`Option ${i+1}`}
                          className="flex-grow border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm outline-none transition-colors"/>
                        {pollOptions.length>2&&(
                          <button onClick={()=>setPollOptions(p=>p.filter((_,j)=>j!==i))} className="text-jc-gray-mid hover:text-jc-red transition-colors" aria-label="Remove option">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length<4&&(
                      <button onClick={()=>setPollOptions(p=>[...p,''])} className="text-jc-red text-xs font-bold hover:underline">+ Add option</button>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between ml-12">
                  <div className="flex items-center gap-3">
                    {/* Image */}
                    {!showPoll&&(
                      <button onClick={()=>fileInputRef.current?.click()} className="flex items-center gap-1.5 text-jc-gray-dark hover:text-jc-red text-xs font-bold uppercase tracking-wide transition-colors" aria-label="Add image">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        Photo
                      </button>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect}/>
                    {/* Poll toggle */}
                    {!postImage&&(
                      <button onClick={()=>{setShowPoll(!showPoll);if(showPoll)setPollOptions(['',''])}}
                        className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${showPoll?'text-jc-red':'text-jc-gray-dark hover:text-jc-red'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                        {showPoll?'Remove Poll':'Add Poll'}
                      </button>
                    )}
                  </div>
                  <button onClick={handleSubmitPost}
                    disabled={!postText.trim()&&!postImage&&!(showPoll&&pollOptions.filter(o=>o.trim()).length>=2)}
                    className="bg-jc-red hover:bg-jc-red-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-xs tracking-widest uppercase px-5 py-2 transition-colors">
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="space-y-5">
              {posts.map(post=>{
                const totalVotes = post.poll?.reduce((s,o)=>s+o.votes,0)??0
                return (
                  <div key={post.id} className="bg-white border border-jc-gray-mid">
                    {/* Header */}
                    <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-jc-black flex items-center justify-center flex-shrink-0 text-white text-xs font-black">{post.initials}</div>
                        <div>
                          <div className="text-jc-black font-black text-sm">{post.author}</div>
                          <div className="text-jc-gray-dark text-xs">{post.time}</div>
                        </div>
                      </div>
                      {post.author==='You'&&(
                        <button onClick={()=>handleDeletePost(post.id)} className="text-jc-gray-mid hover:text-jc-red transition-colors" aria-label="Delete post">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Body */}
                    {post.text&&<div className="px-5 pb-3"><p className="text-jc-black text-sm leading-relaxed">{post.text}</p></div>}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {post.image&&<img src={post.image} alt="Post" className="w-full max-h-80 object-cover"/>}

                    {/* Poll */}
                    {post.poll&&(
                      <div className="px-5 pb-4 space-y-2">
                        {post.poll.map(option=>{
                          const pct = totalVotes>0 ? Math.round((option.votes/totalVotes)*100) : 0
                          const isVoted = post.votedOption===option.id
                          return (
                            <button key={option.id} onClick={()=>handleVote(post.id,option.id)} disabled={!!post.votedOption}
                              className={`w-full text-left border-2 transition-all overflow-hidden ${isVoted?'border-jc-red':'border-jc-gray-mid hover:border-jc-red/50'} ${post.votedOption?'cursor-default':''}`}>
                              <div className="relative px-4 py-2.5">
                                {/* Background bar */}
                                {post.votedOption&&(
                                  <div className={`absolute inset-0 transition-all ${isVoted?'bg-jc-red/10':'bg-jc-gray/60'}`} style={{width:`${pct}%`}}/>
                                )}
                                <div className="relative flex items-center justify-between">
                                  <span className={`text-sm font-bold ${isVoted?'text-jc-red':'text-jc-black'}`}>{option.text}</span>
                                  {post.votedOption&&<span className={`text-xs font-black ${isVoted?'text-jc-red':'text-jc-gray-dark'}`}>{pct}%</span>}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                        <p className="text-jc-gray-dark text-xs">
                          {totalVotes} vote{totalVotes!==1?'s':''}{post.votedOption?' · You voted':' · Click to vote'}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="px-5 py-3 border-t border-jc-gray-mid flex items-center gap-5">
                      <button onClick={()=>handleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${post.liked?'text-jc-red':'text-jc-gray-dark hover:text-jc-red'}`}>
                        <svg className="w-4 h-4" fill={post.liked?'currentColor':'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                        {post.likes} {post.likes===1?'Like':'Likes'}
                      </button>
                      <button onClick={()=>handleToggleComments(post.id)}
                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-jc-gray-dark hover:text-jc-red transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        {post.comments.length} {post.comments.length===1?'Comment':'Comments'}
                      </button>
                    </div>

                    {/* Comments */}
                    {post.showComments&&(
                      <div className="border-t border-jc-gray-mid px-5 py-4 bg-jc-gray/40">
                        {post.comments.length>0&&(
                          <div className="space-y-3 mb-4">
                            {post.comments.map(comment=>(
                              <div key={comment.id} className="flex items-start gap-2.5">
                                <div className="w-7 h-7 bg-jc-black flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                                  {comment.author==='You'?'ME':comment.author.split(' ').map(n=>n[0]).join('').slice(0,2)}
                                </div>
                                <div className="bg-white border border-jc-gray-mid px-3 py-2 flex-grow">
                                  <div className="text-jc-black font-bold text-xs mb-0.5">{comment.author}</div>
                                  <p className="text-jc-gray-dark text-xs leading-relaxed">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-jc-red flex items-center justify-center flex-shrink-0 text-white text-xs font-black">ME</div>
                          <input type="text" value={commentInputs[post.id]??''} onChange={e=>setCommentInputs(p=>({...p,[post.id]:e.target.value}))}
                            onKeyDown={e=>{if(e.key==='Enter')handleAddComment(post.id)}}
                            placeholder="Write a comment..." className="flex-grow border border-jc-gray-mid focus:border-jc-red px-3 py-1.5 text-xs text-jc-black outline-none transition-colors bg-white placeholder:text-jc-gray-mid"/>
                          <button onClick={()=>handleAddComment(post.id)} className="bg-jc-red hover:bg-jc-red-dark text-white text-xs font-bold px-3 py-1.5 transition-colors">Post</button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── PROFILE ───────────────────────────────────────────────────────── */}
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
                <span className="text-jc-red font-black text-xl">$[Amount]</span>
              </div>
              <p className="text-jc-gray-dark text-xs mt-2">Tax-deductible to the extent permitted by law.</p>
            </div>
            <div className="bg-jc-gray/50 border border-jc-gray-mid p-6 text-center">
              <svg className="w-8 h-8 text-jc-gray-mid mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              <p className="text-jc-gray-dark text-sm font-medium mb-1">Payment processor coming soon</p>
              <p className="text-jc-gray-dark text-xs">
                Contact <a href="mailto:info@juniorcouncil.org" className="text-jc-red font-bold hover:underline">info@juniorcouncil.org</a> to arrange payment.
              </p>
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
