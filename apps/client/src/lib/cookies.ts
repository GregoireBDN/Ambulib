// Cookie utilities for client-side authentication

const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'ambulib_access_token',
  REFRESH_TOKEN: 'ambulib_refresh_token',
  USER_DATA: 'ambulib_user_data',
  SESSION: 'ambulib_session', // Ajout du cookie session requis par le middleware
} as const

export function setCookie(name: string, value: string, maxAge?: number) {
  if (typeof window === 'undefined') return
  
  let cookieString = `${name}=${encodeURIComponent(value)}; Path=${COOKIE_OPTIONS.path}; SameSite=${COOKIE_OPTIONS.sameSite}`
  
  if (COOKIE_OPTIONS.secure) {
    cookieString += '; Secure'
  }
  
  if (maxAge) {
    cookieString += `; Max-Age=${maxAge}`
  }
  
  document.cookie = cookieString
}

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    return cookieValue ? decodeURIComponent(cookieValue) : null
  }
  
  return null
}

export function deleteCookie(name: string) {
  if (typeof window === 'undefined') return
  
  setCookie(name, '', -1)
}

// Helper functions for auth-specific cookies
export function setAuthCookies(accessToken: string, refreshToken: string, userData?: any) {
  console.log('🍪 Setting auth cookies:', {
    accessToken: accessToken.substring(0, 20) + '...',
    refreshToken: refreshToken.substring(0, 20) + '...',
    userData: userData ? JSON.stringify(userData).substring(0, 50) + '...' : null
  })
  
  // Set tokens with 7 days expiration (7 * 24 * 60 * 60 = 604800 seconds)
  setCookie(AUTH_COOKIES.ACCESS_TOKEN, accessToken, 604800)
  setCookie(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, 604800)
  // Set session cookie (same as access token for middleware compatibility)
  setCookie(AUTH_COOKIES.SESSION, accessToken, 604800)
  
  if (userData) {
    setCookie(AUTH_COOKIES.USER_DATA, JSON.stringify(userData), 604800)
  }
  
  // Vérification immédiate que les cookies sont bien définis
  setTimeout(() => {
    const cookies = getAuthCookies()
    console.log('🔍 Cookies après définition:', {
      hasAccessToken: !!cookies.accessToken,
      hasRefreshToken: !!cookies.refreshToken,
      hasUserData: !!cookies.userData
    })
  }, 100)
}

export function clearAuthCookies() {
  deleteCookie(AUTH_COOKIES.ACCESS_TOKEN)
  deleteCookie(AUTH_COOKIES.REFRESH_TOKEN)
  deleteCookie(AUTH_COOKIES.USER_DATA)
  deleteCookie(AUTH_COOKIES.SESSION)
}

export function getAuthCookies() {
  return {
    accessToken: getCookie(AUTH_COOKIES.ACCESS_TOKEN),
    refreshToken: getCookie(AUTH_COOKIES.REFRESH_TOKEN),
    session: getCookie(AUTH_COOKIES.SESSION),
    userData: (() => {
      const userData = getCookie(AUTH_COOKIES.USER_DATA)
      try {
        return userData ? JSON.parse(userData) : null
      } catch {
        return null
      }
    })(),
  }
}

// Version for middleware (server-side)
export function getAuthCookiesFromRequest(request: { cookies: { get: (name: string) => { value?: string } | undefined } }) {
  const getServerCookie = (name: string): string | null => {
    const cookie = request.cookies.get(name)
    return cookie?.value || null
  }

  return {
    accessToken: getServerCookie(AUTH_COOKIES.ACCESS_TOKEN),
    refreshToken: getServerCookie(AUTH_COOKIES.REFRESH_TOKEN),
    session: getServerCookie(AUTH_COOKIES.SESSION),
    userData: (() => {
      const userData = getServerCookie(AUTH_COOKIES.USER_DATA)
      try {
        return userData ? JSON.parse(userData) : null
      } catch {
        return null
      }
    })(),
  }
}