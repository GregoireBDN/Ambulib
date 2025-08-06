import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { type User, type Role } from '../types'

// Configuration par défaut du middleware
interface AuthMiddlewareConfig {
  secretKey: string
  publicRoutes?: string[]
  protectedRoutes?: string[]
  roleBasedRoutes?: Record<string, Role[]>
  redirectTo?: string
  companyIsolation?: boolean
}

// Utilitaire pour extraire le token depuis les cookies
function extractTokenFromCookies(request: NextRequest): string | null {
  const token = request.cookies.get('ambulib_access_token')?.value
  return token || null
}

// Utilitaire pour extraire le token depuis l'en-tête Authorization
function extractTokenFromHeader(request: NextRequest): string | null {
  const authorization = request.headers.get('authorization')
  if (!authorization?.startsWith('Bearer ')) return null
  
  return authorization.substring(7)
}

// Fonction pour vérifier et décoder le JWT
async function verifyToken(token: string, secretKey: string): Promise<User | null> {
  try {
    const secret = new TextEncoder().encode(secretKey)
    const { payload } = await jwtVerify(token, secret)
    
    return {
      id: Number(payload.sub),
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      email: payload.email as string,
      role: payload.role as Role,
      companyId: payload.companyId ? Number(payload.companyId) : undefined,
      isProfileComplete: payload.isProfileComplete as boolean
    }
  } catch {
    return null
  }
}

// Vérifier si une route est publique
function isPublicRoute(pathname: string, publicRoutes: string[]): boolean {
  return publicRoutes.some(route => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.slice(0, -1))
    }
    return pathname === route || pathname.startsWith(route + '/')
  })
}

// Vérifier si l'utilisateur a les permissions nécessaires pour une route
function hasRoutePermission(
  pathname: string, 
  userRole: Role, 
  roleBasedRoutes: Record<string, Role[]>
): boolean {
  for (const [routePattern, allowedRoles] of Object.entries(roleBasedRoutes)) {
    const isMatch = routePattern.endsWith('*') 
      ? pathname.startsWith(routePattern.slice(0, -1))
      : pathname === routePattern || pathname.startsWith(routePattern + '/')
    
    if (isMatch) {
      return allowedRoles.includes(userRole)
    }
  }
  
  return true // Pas de restriction spécifique trouvée
}

// Middleware principal d'authentification
export function createAuthMiddleware(config: AuthMiddlewareConfig) {
  const {
    secretKey,
    publicRoutes = ['/auth/*', '/', '/api/auth/*'],
    protectedRoutes = [],
    roleBasedRoutes = {},
    redirectTo = '/auth/signin',
    companyIsolation = false
  } = config

  return async function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    
    // Vérifier si la route est publique
    if (isPublicRoute(pathname, publicRoutes)) {
      return NextResponse.next()
    }
    
    // Extraire le token (cookies en priorité, puis header)
    let token = extractTokenFromCookies(request)
    if (!token) {
      token = extractTokenFromHeader(request)
    }
    
    // Pas de token, rediriger vers la page de connexion
    if (!token) {
      const url = new URL(redirectTo, request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    
    // Vérifier et décoder le token
    const user = await verifyToken(token, secretKey)
    if (!user) {
      const url = new URL(redirectTo, request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    
    // Vérifier les permissions basées sur les rôles
    if (!hasRoutePermission(pathname, user.role, roleBasedRoutes)) {
      return new NextResponse('Forbidden', { status: 403 })
    }
    
    // Vérifier l'isolation par entreprise si activée
    if (companyIsolation && user.companyId) {
      const companyId = request.nextUrl.searchParams.get('companyId')
      if (companyId && parseInt(companyId) !== user.companyId) {
        return new NextResponse('Forbidden', { status: 403 })
      }
    }
    
    // Ajouter les informations utilisateur aux en-têtes pour les API routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', user.id.toString())
    requestHeaders.set('x-user-role', user.role)
    if (user.companyId) {
      requestHeaders.set('x-user-company', user.companyId.toString())
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }
}

// Configurations pré-définies pour chaque app
export const createClientAuthMiddleware = (secretKey: string) =>
  createAuthMiddleware({
    secretKey,
    publicRoutes: [
      '/',
      '/auth/*',
      '/api/auth/*',
      '/about',
      '/contact',
      '/accessibility'
    ],
    roleBasedRoutes: {
      '/dashboard/*': ['CLIENT'],
      '/bookings/*': ['CLIENT'],
      '/profile/*': ['CLIENT'],
      '/medical/*': ['CLIENT']
    },
    redirectTo: '/auth/signin',
    companyIsolation: false // Les clients peuvent changer d'entreprise
  })

export const createFleetAuthMiddleware = (secretKey: string) =>
  createAuthMiddleware({
    secretKey,
    publicRoutes: ['/auth/*', '/api/auth/*'],
    roleBasedRoutes: {
      '/fleet/*': ['FLEET_MANAGER', 'AMBULANCE_DRIVER'],
      '/management/*': ['FLEET_MANAGER'],
      '/driver/*': ['AMBULANCE_DRIVER'],
      '/reports/*': ['FLEET_MANAGER']
    },
    redirectTo: '/auth/signin',
    companyIsolation: true
  })

export const createAdminAuthMiddleware = (secretKey: string) =>
  createAuthMiddleware({
    secretKey,
    publicRoutes: ['/auth/*', '/api/auth/*'],
    roleBasedRoutes: {
      '/admin/*': ['ADMIN'],
      '/users/*': ['ADMIN'],
      '/companies/*': ['ADMIN'],
      '/system/*': ['ADMIN']
    },
    redirectTo: '/auth/signin',
    companyIsolation: false
  })

// Utilitaire pour extraire les informations utilisateur depuis les en-têtes (côté serveur)
export function getUserFromHeaders(headers: Headers): User | null {
  const userId = headers.get('x-user-id')
  const userRole = headers.get('x-user-role')
  const userCompany = headers.get('x-user-company')
  
  if (!userId || !userRole) return null
  
  return {
    id: parseInt(userId),
    firstName: '', // Non disponible depuis les en-têtes
    lastName: '',
    email: '',
    role: userRole as Role,
    companyId: userCompany ? parseInt(userCompany) : undefined,
    isProfileComplete: true // Assumé vrai si l'utilisateur est passé par le middleware
  }
}

// Types pour l'export
export type { AuthMiddlewareConfig }