// Types synchronisés avec l'API NestJS Ambulib

export type Role = 'CLIENT' | 'ADMIN' | 'FLEET_MANAGER' | 'AMBULANCE_DRIVER' | 'SUPER_ADMIN'

export type AuthProviderType = 'CREDENTIALS' | 'GOOGLE'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: Role
  companyId?: number
  isProfileComplete: boolean
  authProvider?: AuthProviderType
  createdAt?: Date
  updatedAt?: Date
}

export interface AuthResponse {
  id: number
  firstName: string
  lastName: string
  email?: string
  role: Role
  companyId?: number
  isProfileComplete: boolean
  accessToken: string
  refreshToken: string
}

export interface SessionData {
  user: User
  accessToken: string
  refreshToken: string
  expiresAt: Date
  issuedAt: Date
}

export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

// Types pour les permissions basées sur les rôles
export type Permission = 
  | 'booking:create'
  | 'booking:read' 
  | 'booking:update'
  | 'booking:delete'
  | 'user:create'
  | 'user:read'
  | 'user:update'
  | 'user:delete'
  | 'vehicle:create'
  | 'vehicle:read'
  | 'vehicle:update'
  | 'vehicle:delete'
  | 'admin:all'

export interface RolePermissions {
  [role: string]: Permission[]
}

export const ROLE_PERMISSIONS: RolePermissions = {
  CLIENT: ['booking:create', 'booking:read', 'booking:update'],
  AMBULANCE_DRIVER: ['booking:read', 'booking:update', 'vehicle:read'],
  FLEET_MANAGER: [
    'booking:create',
    'booking:read', 
    'booking:update',
    'booking:delete',
    'vehicle:create',
    'vehicle:read',
    'vehicle:update',
    'user:read'
  ],
  ADMIN: [
    'booking:create',
    'booking:read',
    'booking:update', 
    'booking:delete',
    'user:create',
    'user:read',
    'user:update',
    'user:delete',
    'vehicle:create',
    'vehicle:read',
    'vehicle:update',
    'vehicle:delete'
  ],
  SUPER_ADMIN: ['admin:all']
}