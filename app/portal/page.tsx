'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Types ───────────────────────────────────────────────────────────────────

type Comment    = { id: number; author: string; text: string; time: string }
type PollOption = { id: number; text: string; votes: number }
type Post = {
  id: number; author: string; initials: string; time: string
  text: string; image?: string; likes: number; liked: boolean
  comments: Comment[]; showComments: boolean
  poll?: PollOption[]; votedOption?: number
}
type Tab = 'dashboard' | 'calendar' | 'impact' | 'resources' | 'feed'

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

const memberGoals = [
  { id:'oncause',     label:'Raised $100+ on OneCause',           link:'https://www.onecause.com/juniorcouncil', linkLabel:'View My Page' },
  { id:'corporate',   label:'Secured a corporate donor',           link: null, linkLabel: null },
  { id:'auction',     label:'Secured a silent auction item',       link: null, linkLabel: null },
  { id:'inkind',      label:'Secured an in-kind donation',         link: null, linkLabel: null },
  { id:'hospitality', label:'Secured a hospitality partner',       link: null, linkLabel: null },
  { id:'attended3',   label:'Attended 3+ events this season',      link: null, linkLabel: null },
  { id:'rsvp',        label:'RSVPd to next member meeting',        link: null, linkLabel: null },
]

// ─── Resources ────────────────────────────────────────────────────────────────

const resources = [
  { title:'JC Google Drive',          desc:'Access shared documents, assets, and files.',                         icon:'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', link:'https://drive.google.com', tag:'Drive'      },
  { title:'Corporate Packet PDF',     desc:'Share with potential corporate sponsors.',                            icon:'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', link:'/JC-Corporate-Packet.pdf', tag:'PDF'        },
  { title:'Brand Guidelines',         desc:'Logos, colors, fonts, and usage rules.',                             icon:'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', link:'#', tag:'Design'     },
  { title:'Member Handbook',          desc:'Everything you need to know as a JC member.',                        icon:'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', link:'#', tag:'Handbook'   },
  { title:'Social Media Kit',         desc:'Pre-made graphics and captions for posting about JC.',               icon:'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', link:'#', tag:'Social'     },
  { title:'Donation Outreach Email Templates', desc:'Ready-to-send email templates for sponsor outreach.',       icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', link:'#', tag:'Templates'  },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [rsvps, setRsvps]         = useState<Record<number,'yes'|'no'>>({})
  const [duesModalOpen, setDuesModalOpen] = useState(false)

  // Goals
  const [checked, setChecked] = useState<Record<string,boolean>>({})
  const toggleGoal = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }))
  const completedCount = memberGoals.filter(g => checked[g.id]).length

  // Calendar
  const today = new Date()
  const [calYear,  setCalYear]    = useState(2026)
  const [calMonth, setCalMonth]   = useState(0)
  const [selectedDay, setSelectedDay] = useState<string|null>(null)
  const prevMonth = () => { if (calMonth===0){setCalMonth(11);setCalYear(y=>y-1)}else setCalMonth(m=>m-1); setSelectedDay(null) }
  const nextMonth = () => { if (calMonth===11){setCalMonth(0);setCalYear(y=>y+1)}else setCalMonth(m=>m+1); setSelectedDay(null) }
  const daysInMonth    = new Date(calYear, calMonth+1, 0).getDate()
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay()
  const pad = (n:number) => String(n).padStart(2,'0')
  const eventsOnDay = (day:number) => { const k=`${calYear}-${pad(calMonth+1)}-${pad(day)}`; return allEvents.filter(e=>e.dateKey===k) }
  const selectedEvents = selectedDay ? allEvents.filter(e=>e.dateKey===selectedDay) : []

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
    { key:'calendar'  as Tab, label:'Calendar',       icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
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
        <div className="flex items-center gap-4 pr-14">
          <span className="text-white/50 text-sm hidden sm:block">
            Welcome back, <span className="text-white font-bold">Member</span>
          </span>
          <Link href="/" className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors border border-white/20 hover:border-white/50 px-3 py-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </Link>
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
        {activeTab==='dashboard' && (
          <>
            <div className="bg-jc-black border-l-4 border-jc-red p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">Member Dashboard</p>
                <h1 className="text-white font-black text-2xl sm:text-3xl tracking-tight">Welcome back!</h1>
                <p className="text-white/50 text-sm mt-1">Junior Council 2026 / 2027</p>
              </div>
              <button onClick={()=>setDuesModalOpen(true)} className="flex-shrink-0 bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-6 py-3 transition-colors">
                Pay My Dues
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label:'Dues Status',     value:'Pending', sub:'2026–2027',      highlight:true  },
                { label:'Events Attended', value:'4',       sub:'This season'                     },
                { label:'My Committee',    value:'Events',  sub:'Active member'                   },
                { label:'Goals Completed', value:`${completedCount}/${memberGoals.length}`, sub:'View Impact Tracker' },
              ].map(stat => (
                <div key={stat.label}
                  className={`bg-white border border-jc-gray-mid p-5 ${stat.label==='Goals Completed'?'cursor-pointer hover:border-jc-red transition-colors':''}`}
                  onClick={stat.label==='Goals Completed'?()=>setActiveTab('impact'):undefined}
                >
                  <div className="text-jc-gray-dark text-xs uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`font-black text-xl mb-0.5 ${stat.highlight?'text-jc-red':'text-jc-black'}`}>{stat.value}</div>
                  <div className="text-jc-gray-dark text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-jc-gray-mid">
                <div className="px-6 py-4 border-b border-jc-gray-mid flex items-center justify-between">
                  <h2 className="text-jc-black font-black text-lg">Upcoming Events</h2>
                  <span className="text-jc-gray-dark text-xs">{upcomingEvents.length} events</span>
                </div>
                <div className="divide-y divide-jc-gray-mid">
                  {upcomingEvents.slice(0,5).map(event => (
                    <div key={event.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-grow">
                        <span className={`text-xs font-bold px-2 py-0.5 ${eventTypeColors[event.type]}`}>{event.type}</span>
                        <h3 className="text-jc-black font-black text-sm mt-1">{event.title}</h3>
                        <p className="text-jc-gray-dark text-xs mt-0.5">{event.date} · {event.time} · {event.location}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {rsvps[event.id] ? (
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-3 py-1.5 ${rsvps[event.id]==='yes'?'bg-green-100 text-green-700':'bg-jc-gray text-jc-gray-dark'}`}>
                              {rsvps[event.id]==='yes'?'Attending':'Not Attending'}
                            </span>
                            <button onClick={()=>setRsvps(p=>{const n={...p};delete n[event.id];return n})} className="text-jc-gray-dark text-xs hover:text-jc-red">Change</button>
                          </div>
                        ) : (
                          <>
                            <button onClick={()=>setRsvps(p=>({...p,[event.id]:'yes'}))} className="bg-jc-red hover:bg-jc-red-dark text-white text-xs font-bold uppercase px-3 py-1.5 transition-colors">RSVP Yes</button>
                            <button onClick={()=>setRsvps(p=>({...p,[event.id]:'no'}))}  className="border border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red text-xs font-bold uppercase px-3 py-1.5 transition-colors">Can&apos;t Go</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 border-t border-jc-gray-mid">
                  <button onClick={()=>setActiveTab('calendar')} className="text-jc-red text-xs font-bold hover:underline">View full calendar →</button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white border border-jc-gray-mid">
                  <div className="px-6 py-4 border-b border-jc-gray-mid"><h2 className="text-jc-black font-black text-lg">My Dues</h2></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-jc-gray-dark text-sm">2026–2027 Dues</span>
                      <span className="text-jc-red font-black">Unpaid</span>
                    </div>
                    <div className="bg-jc-red/10 border border-jc-red/20 px-4 py-3 mb-4">
                      <p className="text-jc-red text-xs font-medium leading-snug">Annual dues keep your membership active.</p>
                    </div>
                    <button onClick={()=>setDuesModalOpen(true)} className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase py-3 transition-colors">Pay Dues Now</button>
                  </div>
                </div>
                <div className="bg-white border border-jc-gray-mid">
                  <div className="px-6 py-4 border-b border-jc-gray-mid"><h2 className="text-jc-black font-black text-lg">Quick Links</h2></div>
                  <div className="divide-y divide-jc-gray-mid">
                    {[
                      {label:'My OneCause Fundraiser', href:'https://www.onecause.com/juniorcouncil', external:true},
                      {label:'Member Directory',        href:'/members'},
                      {label:'Board of Directors',      href:'/board'},
                      {label:'Contact the Board',       href:'/contact'},
                    ].map(link => (
                      <a key={link.label} href={link.href} target={'external' in link&&link.external?'_blank':undefined} rel={'external' in link&&link.external?'noopener noreferrer':undefined}
                        className="flex items-center justify-between px-6 py-3 hover:bg-jc-gray transition-colors group">
                        <span className="text-jc-black text-sm group-hover:text-jc-red transition-colors">{link.label}</span>
                        <svg className="w-4 h-4 text-jc-gray-mid group-hover:text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── CALENDAR ──────────────────────────────────────────────────────── */}
        {activeTab==='calendar' && (
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
                    <div className="text-jc-black font-black text-2xl">{completedCount}<span className="text-jc-gray-dark font-normal text-base">/{memberGoals.length}</span></div>
                    <div className="text-jc-gray-dark text-xs">completed</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-6 pt-4">
                  <div className="w-full bg-jc-gray h-2 overflow-hidden">
                    <div className="h-full bg-jc-red transition-all duration-500" style={{width:`${(completedCount/memberGoals.length)*100}%`}}/>
                  </div>
                </div>

                <div className="divide-y divide-jc-gray-mid px-6">
                  {memberGoals.map((goal,i)=>(
                    <div key={goal.id} className="py-4 flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={()=>toggleGoal(goal.id)}
                        className={`w-6 h-6 flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                          checked[goal.id] ? 'bg-jc-red border-jc-red' : 'border-jc-gray-mid hover:border-jc-red'
                        }`}
                        aria-label={checked[goal.id]?'Mark incomplete':'Mark complete'}
                      >
                        {checked[goal.id]&&(
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                          </svg>
                        )}
                      </button>

                      <div className="flex-grow">
                        <span className={`text-sm font-bold transition-colors ${checked[goal.id]?'text-jc-gray-dark line-through':'text-jc-black'}`}>
                          {i+1}. {goal.label}
                        </span>
                      </div>

                      {goal.link&&(
                        <a href={goal.link} target="_blank" rel="noopener noreferrer"
                          className="flex-shrink-0 text-jc-red text-xs font-bold hover:underline">
                          {goal.linkLabel} →
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-jc-gray-mid bg-jc-gray/30">
                  <p className="text-jc-gray-dark text-xs">Click any goal to mark it complete. Progress is saved for your session.</p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">
              {/* Completion badge */}
              <div className={`p-6 text-center border-2 ${completedCount===memberGoals.length?'bg-jc-red border-jc-red':'bg-white border-jc-gray-mid'}`}>
                <div className={`text-5xl font-black mb-2 ${completedCount===memberGoals.length?'text-white':'text-jc-black'}`}>
                  {completedCount===memberGoals.length?'🏆':'⭐'}
                </div>
                <div className={`font-black text-lg mb-1 ${completedCount===memberGoals.length?'text-white':'text-jc-black'}`}>
                  {completedCount===memberGoals.length?'All Goals Complete!':'Keep Going!'}
                </div>
                <div className={`text-xs ${completedCount===memberGoals.length?'text-white/80':'text-jc-gray-dark'}`}>
                  {completedCount===memberGoals.length
                    ?'You are a JC superstar. Thank you!'
                    :`${memberGoals.length-completedCount} goal${memberGoals.length-completedCount!==1?'s':''} remaining`}
                </div>
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
    </div>
  )
}
