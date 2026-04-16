import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog & News | Junior Council',
  description: 'Latest news, stories, and updates from Junior Council.',
}

const placeholderPosts = [
  {
    category: 'Event Recap',
    title: 'Snowball Gala 2024 Raises Record Funds for Lurie Children\'s',
    excerpt:
      'This year\'s Annual Snowball Gala was our most successful event yet, raising critical funds for the Adolescent HIV program at Lurie Children\'s Hospital.',
    date: 'January 15, 2025',
    readTime: '3 min read',
  },
  {
    category: 'Community',
    title: 'Meet Our Newest Board Members',
    excerpt:
      'Junior Council is proud to welcome several outstanding Chicago professionals to our Board of Directors.',
    date: 'December 2, 2024',
    readTime: '2 min read',
  },
  {
    category: 'Impact',
    title: 'A Year in Review: 2024 Impact Report',
    excerpt:
      'A look back at everything Junior Council accomplished in 2024, by the numbers and in the words of those we serve.',
    date: 'November 18, 2024',
    readTime: '5 min read',
  },
  {
    category: 'Partnership',
    title: 'Junior Council Welcomes New Corporate Partners',
    excerpt:
      'We\'re thrilled to announce new corporate partnerships that will amplify our mission and deepen our impact.',
    date: 'October 30, 2024',
    readTime: '2 min read',
  },
  {
    category: 'Advocacy',
    title: 'The Importance of Youth HIV Care: A Conversation with Lurie\'s Medical Team',
    excerpt:
      'We sat down with the Adolescent HIV care team at Lurie Children\'s to discuss the unique challenges facing young patients.',
    date: 'September 10, 2024',
    readTime: '6 min read',
  },
  {
    category: 'Membership',
    title: 'Why I Joined Junior Council',
    excerpt:
      'Hear from current JC members about what drew them to the organization and what keeps them coming back.',
    date: 'August 5, 2024',
    readTime: '4 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              News &amp; Stories
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Blog
          </h1>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post, i) => (
              <article
                key={i}
                className="border border-jc-gray-mid hover:border-jc-red transition-colors group"
              >
                {/* Image placeholder */}
                <div className="bg-jc-gray h-48 flex items-center justify-center border-b border-jc-gray-mid">
                  <svg className="w-12 h-12 text-jc-gray-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-jc-red text-xs font-bold tracking-widest uppercase">
                      {post.category}
                    </span>
                    <span className="text-jc-gray-dark text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="text-jc-black font-black text-xl mb-3 leading-tight group-hover:text-jc-red transition-colors">
                    <Link href="#" className="hover:text-jc-red">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-jc-gray-dark text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-jc-gray-dark text-xs">{post.date}</span>
                    <Link
                      href="#"
                      className="text-jc-red text-xs font-bold uppercase tracking-wide hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="text-jc-gray-dark text-center text-sm mt-12">
            More posts coming soon. Follow us on social media for the latest
            updates.
          </p>
        </div>
      </section>
    </div>
  )
}
