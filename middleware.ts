import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isPortalRoute = createRouteMatcher(['/portal(.*)'])
const isSignUpRoute = createRouteMatcher(['/sign-up(.*)'])

export default clerkMiddleware((auth, req: NextRequest) => {
  // Protect the portal — must be signed in
  if (isPortalRoute(req)) {
    auth().protect()
  }

  // Protect sign-up — must have the invite cookie set by /join
  if (isSignUpRoute(req)) {
    const invite = req.cookies.get('jc_invite')
    if (!invite || invite.value !== '1') {
      return NextResponse.redirect(new URL('/join', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
