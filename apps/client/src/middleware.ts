import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/reservation', '/dossier-medical', '/mes-trajets', '/contact']
  
  // Auth routes that authenticated users should not access
  const authPaths = ['/auth/connexion', '/auth/inscription']
  
  const { pathname } = request.nextUrl
  
  // Check if current path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))
  
  // Get access token from cookies or localStorage (we'll use cookies for SSR safety)
  const accessToken = request.cookies.get('ambulib_access_token')?.value
  const isAuthenticated = !!accessToken && accessToken.length > 0
  
  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/auth/connexion', request.url)
    // Add redirect parameter to return user to original destination after login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Redirect authenticated users trying to access auth pages
  if (isAuthPath && isAuthenticated) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - public folder (public static files)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}