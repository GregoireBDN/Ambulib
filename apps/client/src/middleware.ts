import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // 1. Définir les routes protégées et publiques selon Next.js 15 patterns
  const protectedRoutes = ['/dashboard', '/reservation', '/dossier-medical', '/mes-trajets', '/contact']
  const publicRoutes = ['/auth/connexion', '/auth/inscription', '/']

  // 2. Vérifier le type de route
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path) || path.startsWith('/auth/')

  // 3. Récupérer la session depuis les cookies (pattern Next.js 15)
  const sessionCookie = request.cookies.get('ambulib-session')
  let session = null
  
  if (sessionCookie?.value) {
    try {
      const sessionData = JSON.parse(sessionCookie.value)
      // Vérifier l'expiration
      if (new Date(sessionData.expires) > new Date()) {
        session = sessionData
      }
    } catch {
      // Cookie malformé, ignorer
    }
  }

  // 4. Rediriger vers la connexion si non authentifié sur route protégée
  if (isProtectedRoute && !session) {
    console.log(`🔒 Redirecting unauthenticated user from ${path} to /auth/connexion`)
    return NextResponse.redirect(new URL('/auth/connexion', request.url))
  }

  // 5. Rediriger vers le dashboard si authentifié sur routes d'auth publiques
  if (
    isPublicRoute &&
    session &&
    (path === '/auth/connexion' || path === '/auth/inscription')
  ) {
    console.log(`✅ Redirecting authenticated user from ${path} to /dashboard`)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configuration selon les meilleures pratiques Next.js 15
export const config = {
  matcher: [
    /*
     * Matcher tous les chemins sauf:
     * - api (API routes)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico, sitemap.xml, robots.txt (métadonnées)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}