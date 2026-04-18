'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Types ───────────────────────────────────────────────────────────────────

type Comment = { id: number; author: string; text: string; time: string }
type Post = {
  id: number
  author: string
  initials: string
  time: string
  text: string
  image?: string
  likes: number
  liked: boolean
  comments: Comment[]
  showComments: boolean
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedPosts: Post[] = [
  {
    id: 1,
    author: 'Eve Voci',
    initials: 'EV',
    time: '2h ago',
    text: 'So proud of everything this team accomplished at Snowball 2026. $242,000 raised — you all are incredible. Cannot wait to top it next year!',
    likes: 14,
    liked: false,
    comments: [
      { id: 1, author: 'Hailie Schroll', text: 'Best night of the year, every year. Let\'s go 2027!', time: '1h ago' },
      { id: 2, author: 'Catie Hinton', text: 'So grateful to be part of this team.', time: '45m ago' },
    ],
    showComments: false,
  },
  {
    id: 2,
    author: 'Hailie Schroll',
    initials: 'HS',
    time: '1d ago',
    text: 'Reminder: monthly member meeting is May 14th at the Drake Hotel, 6:30 PM. See you all there! RSVP in the dashboard if you haven\'t already.',
    likes: 8,
    liked: false,
    comments: [],
    showComments: false,
  },
  {
    id: 3,
    author: 'Brooklyn Mychalowych',
    initials: 'BM',
    time: '3d ago',
    text: 'Just finished the new JC branding assets — really excited about where the creative direction is going this year. Sneak peek coming soon!',
    likes: 21,
    liked: false,
    comments: [
      { id: 1, author: 'Jessica Linley', text: 'Cannot wait to see it!', time: '2d ago' },
    ],
    showComments: false,
  },
]

// ─── Events (for Dashboard tab) ──────────────────────────────────────────────

const upcomingEvents = [
  { id: 1, title: 'Monthly Member Meeting', date: 'May 14, 2026', time: '6:30 PM – 8:00 PM', location: 'The Drake Hotel, Chicago', type: 'Meeting' },
  { id: 2, title: 'Snowball 2026 Kick-Off Party', date: 'January 17, 2026', time: '7:00 PM – 10:00 PM', location: 'TBD, Chicago', type: 'Event' },
  { id: 3, title: 'Cruising for a Cause', date: 'July 12, 2026', time: '5:00 PM – 9:00 PM', location: 'Navy Pier, Chicago', type: 'Fundraiser' },
  { id: 4, title: 'Happy Hour — Summer Edition', date: 'August 6, 2026', time: '6:00 PM – 9:00 PM', location: 'Venteux, Chicago', type: 'Social' },
  { id: 5, title: 'Annual Golf Outing', date: 'September 19, 2026', time: '8:00 AM – 4:00 PM', location: 'Cog Hill Golf & Country Club', type: 'Fundraiser' },
]

const eventTypeColors: Record<string, string> = {
  Meeting:    'bg-blue-100 text-blue-700',
  Event:      'bg-purple-100 text-purple-700',
  Fundraiser: 'bg-green-100 text-green-700',
  Social:     'bg-yellow-100 text-yellow-700',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'feed'>('dashboard')
  const [rsvps, setRsvps] = useState<Record<number, 'yes' | 'no'>>({})
  const [duesModalOpen, setDuesModalOpen] = useState(false)

  // Feed state
  const [posts, setPosts] = useState<Post[]>(seedPosts)
  const [postText, setPostText] = useState('')
  const [postImage, setPostImage] = useState<string | null>(null)
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRsvp = (id: number, answer: 'yes' | 'no') =>
    setRsvps((prev) => ({ ...prev, [id]: answer }))

  // Feed handlers
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPostImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmitPost = () => {
    if (!postText.trim() && !postImage) return
    const newPost: Post = {
      id: Date.now(),
      author: 'You',
      initials: 'ME',
      time: 'Just now',
      text: postText.trim(),
      image: postImage ?? undefined,
      likes: 0,
      liked: false,
      comments: [],
      showComments: false,
    }
    setPosts([newPost, ...posts])
    setPostText('')
    setPostImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    )
  }

  const handleToggleComments = (postId: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, showComments: !p.showComments } : p))
    )
  }

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId]?.trim()
    if (!text) return
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: Date.now(), author: 'You', text, time: 'Just now' },
              ],
            }
          : p
      )
    )
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }))
  }

  const handleDeletePost = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }

  return (
    <div className="min-h-screen bg-jc-gray">
      {/* Portal nav */}
      <nav className="bg-jc-black border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="bg-white px-3 py-1 border-[6px] border-jc-red">
            <Image src="/jc-logo.png" alt="Junior Council" width={120} height={30} className="h-6 w-auto" priority />
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-white/50 text-sm hidden sm:block">
            Welcome back, <span className="text-white font-bold">Member</span>
          </span>
          <Link href="/" className="text-white/50 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors">
            Sign Out
          </Link>
        </div>
      </nav>

      {/* Tab bar */}
      <div className="bg-jc-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1">
          {([
            { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { key: 'feed',      label: 'Community Feed', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' },
          ] as { key: 'dashboard' | 'feed'; label: string; icon: string }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-jc-red text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── DASHBOARD TAB ─────────────────────────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <>
            {/* Welcome banner */}
            <div className="bg-jc-black border-l-4 border-jc-red p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">Member Dashboard</p>
                <h1 className="text-white font-black text-2xl sm:text-3xl tracking-tight">Welcome back!</h1>
                <p className="text-white/50 text-sm mt-1">Junior Council 2026 / 2027</p>
              </div>
              <button
                onClick={() => setDuesModalOpen(true)}
                className="flex-shrink-0 bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-6 py-3 transition-colors"
              >
                Pay My Dues
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Dues Status', value: 'Pending', sub: '2026–2027', highlight: true },
                { label: 'Events Attended', value: '4', sub: 'This season' },
                { label: 'My Committee', value: 'Events', sub: 'Active member' },
                { label: 'OneCause Page', value: 'Active', sub: 'Fundraising live' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-jc-gray-mid p-5">
                  <div className="text-jc-gray-dark text-xs uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`font-black text-xl mb-0.5 ${stat.highlight ? 'text-jc-red' : 'text-jc-black'}`}>{stat.value}</div>
                  <div className="text-jc-gray-dark text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Events */}
              <div className="lg:col-span-2 bg-white border border-jc-gray-mid">
                <div className="px-6 py-4 border-b border-jc-gray-mid flex items-center justify-between">
                  <h2 className="text-jc-black font-black text-lg">Upcoming Events</h2>
                  <span className="text-jc-gray-dark text-xs">{upcomingEvents.length} events</span>
                </div>
                <div className="divide-y divide-jc-gray-mid">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 ${eventTypeColors[event.type]}`}>{event.type}</span>
                        </div>
                        <h3 className="text-jc-black font-black text-sm">{event.title}</h3>
                        <div className="flex flex-wrap gap-x-4 mt-1">
                          <span className="text-jc-gray-dark text-xs">{event.date} · {event.time}</span>
                          <span className="text-jc-gray-dark text-xs">{event.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {rsvps[event.id] ? (
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold px-3 py-1.5 ${rsvps[event.id] === 'yes' ? 'bg-green-100 text-green-700' : 'bg-jc-gray text-jc-gray-dark'}`}>
                              {rsvps[event.id] === 'yes' ? 'Attending' : 'Not Attending'}
                            </span>
                            <button onClick={() => setRsvps((p) => { const n = { ...p }; delete n[event.id]; return n })} className="text-jc-gray-dark text-xs hover:text-jc-red transition-colors">Change</button>
                          </div>
                        ) : (
                          <>
                            <button onClick={() => handleRsvp(event.id, 'yes')} className="bg-jc-red hover:bg-jc-red-dark text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 transition-colors">RSVP Yes</button>
                            <button onClick={() => handleRsvp(event.id, 'no')} className="border border-jc-gray-mid hover:border-jc-red text-jc-gray-dark hover:text-jc-red text-xs font-bold uppercase tracking-wide px-3 py-1.5 transition-colors">Can&apos;t Go</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Dues */}
                <div className="bg-white border border-jc-gray-mid">
                  <div className="px-6 py-4 border-b border-jc-gray-mid">
                    <h2 className="text-jc-black font-black text-lg">My Dues</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-jc-gray-dark text-sm">2026–2027 Dues</span>
                      <span className="text-jc-red font-black">Unpaid</span>
                    </div>
                    <div className="bg-jc-red/10 border border-jc-red/20 px-4 py-3 mb-4">
                      <p className="text-jc-red text-xs font-medium leading-snug">Annual dues keep your membership and benefits active.</p>
                    </div>
                    <button onClick={() => setDuesModalOpen(true)} className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase py-3 transition-colors">
                      Pay Dues Now
                    </button>
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-white border border-jc-gray-mid">
                  <div className="px-6 py-4 border-b border-jc-gray-mid">
                    <h2 className="text-jc-black font-black text-lg">Quick Links</h2>
                  </div>
                  <div className="divide-y divide-jc-gray-mid">
                    {[
                      { label: 'My OneCause Fundraiser', href: 'https://www.onecause.com/juniorcouncil', external: true },
                      { label: 'Member Directory', href: '/members' },
                      { label: 'Board of Directors', href: '/board' },
                      { label: 'Contact the Board', href: '/contact' },
                      { label: 'Become a Sponsor', href: '/support' },
                    ].map((link) => (
                      <a key={link.label} href={link.href} target={'external' in link && link.external ? '_blank' : undefined} rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between px-6 py-3 hover:bg-jc-gray transition-colors group">
                        <span className="text-jc-black text-sm group-hover:text-jc-red transition-colors">{link.label}</span>
                        <svg className="w-4 h-4 text-jc-gray-mid group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

        {/* ── COMMUNITY FEED TAB ────────────────────────────────────────────── */}
        {activeTab === 'feed' && (
          <div className="max-w-2xl mx-auto">

            {/* Composer */}
            <div className="bg-white border border-jc-gray-mid mb-6">
              <div className="px-5 py-4 border-b border-jc-gray-mid">
                <h2 className="text-jc-black font-black text-base">Create a Post</h2>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  {/* Avatar */}
                  <div className="w-9 h-9 bg-jc-red flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                    ME
                  </div>
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="Share an update with the JC community..."
                    rows={3}
                    className="flex-grow border border-jc-gray-mid focus:border-jc-red px-3 py-2 text-sm text-jc-black outline-none resize-none transition-colors placeholder:text-jc-gray-mid"
                  />
                </div>

                {/* Image preview */}
                {postImage && (
                  <div className="relative mb-4 ml-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={postImage} alt="Post preview" className="max-h-48 object-cover w-full" />
                    <button
                      onClick={() => { setPostImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                      className="absolute top-2 right-2 bg-jc-black/70 text-white w-6 h-6 flex items-center justify-center hover:bg-jc-black transition-colors"
                      aria-label="Remove image"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between ml-12">
                  <div className="flex items-center gap-3">
                    {/* Image upload */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 text-jc-gray-dark hover:text-jc-red text-xs font-bold uppercase tracking-wide transition-colors"
                      aria-label="Add image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Photo
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                  </div>
                  <button
                    onClick={handleSubmitPost}
                    disabled={!postText.trim() && !postImage}
                    className="bg-jc-red hover:bg-jc-red-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-xs tracking-widest uppercase px-5 py-2 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="space-y-5">
              {posts.map((post) => (
                <div key={post.id} className="bg-white border border-jc-gray-mid">
                  {/* Post header */}
                  <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-jc-black flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                        {post.initials}
                      </div>
                      <div>
                        <div className="text-jc-black font-black text-sm">{post.author}</div>
                        <div className="text-jc-gray-dark text-xs">{post.time}</div>
                      </div>
                    </div>
                    {post.author === 'You' && (
                      <button onClick={() => handleDeletePost(post.id)} className="text-jc-gray-mid hover:text-jc-red transition-colors" aria-label="Delete post">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Post body */}
                  {post.text && (
                    <div className="px-5 pb-3">
                      <p className="text-jc-black text-sm leading-relaxed">{post.text}</p>
                    </div>
                  )}
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt="Post image" className="w-full max-h-80 object-cover" />
                  )}

                  {/* Actions */}
                  <div className="px-5 py-3 border-t border-jc-gray-mid flex items-center gap-5">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${post.liked ? 'text-jc-red' : 'text-jc-gray-dark hover:text-jc-red'}`}
                    >
                      <svg className="w-4 h-4" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                    </button>
                    <button
                      onClick={() => handleToggleComments(post.id)}
                      className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-jc-gray-dark hover:text-jc-red transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
                    </button>
                  </div>

                  {/* Comments section */}
                  {post.showComments && (
                    <div className="border-t border-jc-gray-mid px-5 py-4 bg-jc-gray/40">
                      {post.comments.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start gap-2.5">
                              <div className="w-7 h-7 bg-jc-black flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                                {comment.author === 'You' ? 'ME' : comment.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </div>
                              <div className="bg-white border border-jc-gray-mid px-3 py-2 flex-grow">
                                <div className="text-jc-black font-bold text-xs mb-0.5">{comment.author}</div>
                                <p className="text-jc-gray-dark text-xs leading-relaxed">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Add comment */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-jc-red flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                          ME
                        </div>
                        <input
                          type="text"
                          value={commentInputs[post.id] ?? ''}
                          onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id) }}
                          placeholder="Write a comment..."
                          className="flex-grow border border-jc-gray-mid focus:border-jc-red px-3 py-1.5 text-xs text-jc-black outline-none transition-colors bg-white placeholder:text-jc-gray-mid"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="bg-jc-red hover:bg-jc-red-dark text-white text-xs font-bold px-3 py-1.5 transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dues modal */}
      {duesModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={() => setDuesModalOpen(false)}>
          <div className="bg-white max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">Member Portal</p>
                <h2 className="text-jc-black font-black text-2xl tracking-tight">Pay Your Dues</h2>
              </div>
              <button onClick={() => setDuesModalOpen(false)} className="text-jc-gray-mid hover:text-jc-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-jc-gray-dark text-sm font-medium mb-1">Payment processor coming soon</p>
              <p className="text-jc-gray-dark text-xs">
                Contact{' '}
                <a href="mailto:info@juniorcouncil.org" className="text-jc-red font-bold hover:underline">info@juniorcouncil.org</a>
                {' '}to arrange payment.
              </p>
            </div>
            <button onClick={() => setDuesModalOpen(false)} className="w-full mt-4 border-2 border-jc-gray-mid hover:border-jc-red text-jc-black hover:text-jc-red font-black text-xs tracking-widest uppercase py-3 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
